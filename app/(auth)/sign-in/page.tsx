import SignInForm from '@/components/SignInForm'
import React from 'react'
import { auth } from "@/auth"
import { redirect } from 'next/navigation'

const SignIn = async () => {
  const session = await auth()
  
  if (session) {
    redirect('/');
  }

  return (
    <SignInForm session={session!} />
  )
}

export default SignIn