import React from 'react'
import RegisterForm from '../RegisterForm/RegisterForm'
import PublicLayout from '../PublicLayout'

const SignUp = () => {
  return (
      <PublicLayout>
          <RegisterForm title='Sign up form' role='user' />
    </PublicLayout>
  )
}

export default SignUp