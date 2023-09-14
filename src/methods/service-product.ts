export const apiGetProduct = async (data: any) => {
  try {
    let pathUrl = process.env.NEXT_PUBLIC_API_URL + '/products'
    if (data) pathUrl = pathUrl + '?' + (typeof data === 'object' ? new URLSearchParams(data).toString() : data.toString())
    const result = await fetch(pathUrl, {
      method: 'get',
    })
    return await result.json()
  } catch (error) {
    return error
  }
}
