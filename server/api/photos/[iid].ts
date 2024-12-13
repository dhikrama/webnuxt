import { defineEventHandler } from 'h3'
import { useRuntimeConfig } from '#imports'
import type { GooglePhoto } from '~/types/googlePhotos'
import { refreshAccessToken } from '~/utils/refreshToken'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const photoId = event.context.params?.id
  if (!photoId) {
    return { status: 400, message: 'Photo ID is required' }
  }

  let accessToken = config.GOOGLE_PHOTOS_ACCESS_TOKEN
  const refreshToken = config.GOOGLE_PHOTOS_REFRESH_TOKEN
  const clientId = config.GOOGLE_PHOTOS_CLIENT_ID
  const clientSecret = config.GOOGLE_PHOTOS_CLIENT_SECRET

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing OAuth configuration')
  }

  try {
    const response = await fetch(`https://photoslibrary.googleapis.com/v1/mediaItems/${photoId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      return data as GooglePhoto
    } else if (response.status === 401) {
      console.warn('Access token expired, refreshing token...')
      accessToken = await refreshAccessToken(refreshToken, clientId, clientSecret)
      const retryResponse = await fetch(`https://photoslibrary.googleapis.com/v1/mediaItems/${photoId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      if (retryResponse.ok) {
        const data = await retryResponse.json()
        return data as GooglePhoto
      } else {
        throw new Error(`Error fetching photo after refreshing token: ${retryResponse.statusText}`)
      }
    } else {
      throw new Error(`Error fetching photo: ${response.status} ${response.statusText}`)
    }
  } catch (error) {
    return { status: 500, message: `Error fetching photo: ${(error as Error).message}` }
  }
})
