export const apiGetHistory = async (data: any) => {
  try {
    let pathUrl = process.env.NEXT_PUBLIC_API_URL + '/transactions/history'
    if (data) pathUrl = pathUrl + '?' + (typeof data === 'object' ? new URLSearchParams(data).toString() : data.toString())
    const result = await fetch(pathUrl, {
      method: 'get',
    })
    return await result.json()
  } catch (error) {
    return error
  }
}

export const apiPostBuy = async (token: string, data: any) => {
  try {
    const result = await fetch(process.env.NEXT_PUBLIC_API_URL + '/transactions/buying', {
      method: 'post',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return await result.json()
  } catch (error) {
    return error
  }
}

export const apiPostPayment = async (token: string, data: any) => {
  try {
    const result = await fetch(process.env.NEXT_PUBLIC_API_URL + '/transactions/payment', {
      method: 'post',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return await result.json()
  } catch (error) {
    return error
  }
}
