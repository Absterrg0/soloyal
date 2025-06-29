'use client'
import { Store, Wallet } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import axios from "axios"
import OnboardingCard from "./onboarding-card"
import MerchantOnboarding from "./merchant-onboarding"

type OnboardingStep = 'selection' | 'merchant-onboarding';

export default function OnboardingComponent() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('selection')
  const { mutate: updateUserType } = useMutation({
    mutationFn: (type: 'MERCHANT' | 'CUSTOMER') => axios.post('/api/user/update-type', { userType: type }).then(res => res.data)
  })    

    
  const handleAccountTypeSelection = async (type: 'MERCHANT' | 'CUSTOMER') => {
    try {
      if (type === 'MERCHANT') {
        // Start merchant onboarding flow
        setCurrentStep('merchant-onboarding')
        return
      }
      else{
        toast.loading(`Updating account type...`)
        updateUserType(type,
            {
            onSuccess: () => {
                toast.success(`Account successfully updated to ${type.toLowerCase()}`)
                router.push('/swap')
              },
              onError: () => {
                toast.error('Failed to set account type. Please try again.')
              } 
            }
        )
      }

      
    } catch (error) {
      console.error('Error updating user type:', error)
      toast.error('Failed to set account type. Please try again.')
    }
  }

  const handleMerchantOnboardingComplete = () => {
    toast.success('Merchant account created successfully!')
    router.push('/playground')
  }

  const handleBackToSelection = () => {
    setCurrentStep('selection')
  }

  if (currentStep === 'merchant-onboarding') {
    return (
      <MerchantOnboarding 
        onComplete={handleMerchantOnboardingComplete}
        onBack={handleBackToSelection}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Choose Your Account Type
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select how you'd like to use Soloyal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Merchant Card */}
          <OnboardingCard
            title="Merchant"
            description="Accept payments and manage loyalty rewards for your business"
            icon={<Store className="w-8 h-8 text-primary dark:text-primary" />}
            onClick={() => handleAccountTypeSelection('MERCHANT')}
            buttonText="I'm a Merchant"
          />

          {/* Customer Card */}
          <OnboardingCard
            title="Customer"
            description="Make payments and earn loyalty rewards from your favorite merchants"
            icon={<Wallet className="w-8 h-8 text-primary dark:text-primary" />}
            onClick={() => handleAccountTypeSelection('CUSTOMER')}
            buttonText="I'm a Customer"
          />
        </div>
      </div>
    </div>
  )
} 