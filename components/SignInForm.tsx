'use client'
import { Session } from "next-auth"
import { Button } from "@mantine/core"
import { signIn, signOut } from "next-auth/react"
 
export default function SignInForm(session : {session : Session}) {
  return (
    <div>
      {session.session ? 
        (<Button onClick={() => signOut()}>
            Logout
        </Button>) : 
        (<Button onClick={() => signIn()}>
            Sign In
        </Button>)}
    </div>
  )
} 