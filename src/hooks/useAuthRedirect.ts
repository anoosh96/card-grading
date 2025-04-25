import { USER_ROLES } from "@/app/(user)/lib/utils/constants"
import { useUserStore } from "@/stores/userStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export const useAuthRedirect = () => {
  const { user, isAuthenticated } = useUserStore()
  const router = useRouter()

  const loginBasedonRole = () => {
    if (user?.emailVerified) {
      const path = user.role == USER_ROLES.ADMIN ? '/dashboard' : '/user-dashboard'
      router.push(path);
    } else {
      router.push('/verification-code');
    }
  }

  useEffect(() => {
    if (user && isAuthenticated) {
      loginBasedonRole()
    }
  }, [user])
}