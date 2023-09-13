'use client'
import { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import { FormEventHandler, useState } from 'react'

interface Props {}

const SignIn: NextPage = (props): JSX.Element => {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    // validate your userinfo
    event.preventDefault()
    const res = await signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    })
    console.log(res)
  }

  return (
    <div className="sign-in-form">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          value={userInfo.email}
          type="email"
          placeholder="john@email.com"
          onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })}
        />
        <input
          value={userInfo.password}
          type="password"
          placeholder="********"
          onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  )
}

export default SignIn
