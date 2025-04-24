'use client'

import { useAuthRedirect } from "@/hooks/useAuthRedirect"


export const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  useAuthRedirect();

  return(
    <>
      { children }
    </>
  )
}
