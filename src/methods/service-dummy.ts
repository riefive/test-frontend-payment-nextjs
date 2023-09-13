export const apiUserProfileDummy = (data: any) => {
  const { email, password }: any = data
  if (email !== 'john@gmail.com' || password !== '1234') {
    throw new Error('invalid credentials')
  }
  return {
    id: '1234',
    name: 'John Doe',
    email: 'john@gmail.com',
    role: 'admin',
  }
}
