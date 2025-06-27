'use client'
import { useEffect } from 'react'
import { useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

export default function AuthRedirect() {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  useEffect(() => {
    const handleRedirect = async () => {
      // Wait for session to load
      if (isPending) return

      // If no session, redirect to signin
      if (!session?.user) {
        router.push('/signin')
        return
      }

      try {
        // Fetch user details including their type
        const response = await fetch('/api/user/profile', {
          credentials: 'include',
        })

        if (!response.ok) {
          throw new Error('Failed to fetch user profile')
        }

        const userData = await response.json()
        
        // Redirect based on user type and existing profiles
        if (userData.userType === 'CUSTOMER') {
          router.push('/swap')
        } else if (userData.userType === 'MERCHANT') {
          router.push('/playground')
        } else {
          // No userType set - check if they have existing profiles
          if (userData.hasProfile.merchant) {
            // User has merchant profile but no userType - set it and redirect
            await fetch('/api/user/update-type', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userType: 'MERCHANT' }),
              credentials: 'include',
            })
            router.push('/playground')
          } else if (userData.hasProfile.customer) {
            // User has customer profile but no userType - set it and redirect
            await fetch('/api/user/update-type', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userType: 'CUSTOMER' }),
              credentials: 'include',
            })
            router.push('/swap')
          } else {
            // No profile and no userType - redirect to onboarding
            router.push('/onboarding')
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
        // Fallback redirect to onboarding
        router.push('/onboarding')
      }
    }

    handleRedirect()
  }, [session, isPending, router])

  // Show loading state
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">
          {isPending ? 'Loading session...' : 'Redirecting you to the right place...'}
        </p>
      </div>
    </div>
  )
} 