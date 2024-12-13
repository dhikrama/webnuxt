import { useRuntimeConfig } from '#imports'

export async function refreshAccessToken(refreshToken: string, clientId: string, clientSecret: string): Promise<string> {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    })
  })

  if (response.ok) {
    const data = await response.json()
    const accessToken = data.access_token
    console.log('New access token acquired:', accessToken)
    return accessToken
  } else {
    const errorData = await response.json()
    console.error('Failed to refresh access token:', errorData)
    throw new Error(`Failed to refresh access token: ${errorData.error} - ${errorData.error_description}`)
  }
}
