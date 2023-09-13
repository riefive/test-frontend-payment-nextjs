export const apiGetLogin = async (data: any) => {
  if (!data) return null
  try {
    const result = await fetch(process.env.FAKE_REST_URL + '/auth/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data?.email,
        password: data?.password,
      }),
    })
    return await result.json()
  } catch (error) {
    return error
  }
}

export const apiGetProfile = async (data: any) => {
  if (!data) return null
  try {
    const result = await fetch(process.env.FAKE_REST_URL + '/auth/profile', {
      method: 'get',
      headers: { Authorization: `Bearer ${data.access_token}` },
    })
    return await result.json()
  } catch (error) {
    return error
  }
}
