'use client'
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Building2, Coins } from "lucide-react"
import { toast } from "sonner"
import axios from "axios"
import GlassButton from "../glass-button"

interface MerchantOnboardingProps {
  onComplete: () => void;
  onBack: () => void;
}

type MerchantStep = 'organization' | 'token-creation';

interface OrganizationData {
  name: string;
}

interface TokenData {
  publicKey: string;
  loyaltyTokenMintAddress: string;
  discountRate: number;
}

export default function MerchantOnboarding({ onComplete, onBack }: MerchantOnboardingProps) {
  const [currentStep, setCurrentStep] = useState<MerchantStep>('organization')
  const [isLoading, setIsLoading] = useState(false)
  const [organizationData, setOrganizationData] = useState<OrganizationData>({
    name: ''
  })
  const [tokenData, setTokenData] = useState<TokenData>({
    publicKey: '',
    loyaltyTokenMintAddress: '',
    discountRate: 0
  })

  const handleOrganizationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!organizationData.name.trim()) {
      toast.error('Please enter your organization name')
      return
    }

    // Update user type to MERCHANT first
    try {
      setIsLoading(true)
      await axios.post('/api/user/update-type', 
        { userType: 'MERCHANT' },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      
      toast.success('Organization registered successfully!')
      setCurrentStep('token-creation')
    } catch (error) {
      console.error('Error setting user type:', error)
      toast.error('Failed to register organization. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTokenCreation = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!tokenData.publicKey.trim() || !tokenData.loyaltyTokenMintAddress.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    if (tokenData.discountRate < 0 || tokenData.discountRate > 100) {
      toast.error('Discount rate must be between 0 and 100')
      return
    }

    try {
      setIsLoading(true)
      
      // Create merchant profile with token data
      await axios.post('/api/merchant/create', {
        name: organizationData.name,
        publicKey: tokenData.publicKey,
        loyaltyTokenMintAddress: tokenData.loyaltyTokenMintAddress,
        discountRate: tokenData.discountRate / 100 // Convert percentage to decimal
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      })

      onComplete()
    } catch (error) {
      console.error('Error creating merchant:', error)
      toast.error('Failed to create merchant profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    if (currentStep === 'organization') {
      onBack()
    } else {
      setCurrentStep('organization')
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="mr-4 p-2 hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {currentStep === 'organization' ? 'Organization Setup' : 'Create Your Loyalty Token'}
            </h1>
            <p className="text-muted-foreground">
              {currentStep === 'organization' 
                ? 'Tell us about your business' 
                : 'Configure your custom loyalty token'
              }
            </p>
          </div>
        </div>

        <Card className="crypto-glass border border-primary/20 shadow-xl">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/15 to-purple-600/15 dark:from-purple-400/25 dark:to-purple-500/25 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-500/20">
              {currentStep === 'organization' ? (
                <Building2 className="w-8 h-8 text-purple-500 dark:text-purple-400" />
              ) : (
                <Coins className="w-8 h-8 text-purple-500 dark:text-purple-400" />
              )}
            </div>
            <CardTitle className="text-2xl">
              {currentStep === 'organization' ? 'Organization Details' : 'Token Configuration'}
            </CardTitle>
          </CardHeader>

          <CardContent>
            {currentStep === 'organization' ? (
              <form onSubmit={handleOrganizationSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="orgName" className="text-sm font-medium text-foreground">
                    Organization Name *
                  </Label>
                  <Input
                    id="orgName"
                    type="text"
                    placeholder="Enter your business or organization name"
                    value={organizationData.name}
                    onChange={(e) => setOrganizationData({
                      ...organizationData,
                      name: e.target.value
                    })}
                    className="crypto-glass border-primary/30 focus:border-primary/50"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    This will be used to identify your business on the platform
                  </p>
                </div>

                <GlassButton
                  onClick={() => handleOrganizationSubmit()}
                  variant="primary"
                  className={`mt-8 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Setting up...' : 'Continue to Token Setup'}
                </GlassButton>
              </form>
            ) : (
              <form onSubmit={handleTokenCreation} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="publicKey" className="text-sm font-medium text-foreground">
                    Wallet Public Key *
                  </Label>
                  <Input
                    id="publicKey"
                    type="text"
                    placeholder="Enter your Solana wallet public key (44 characters)"
                    value={tokenData.publicKey}
                    onChange={(e) => setTokenData({
                      ...tokenData,
                      publicKey: e.target.value
                    })}
                    className="crypto-glass border-primary/30 focus:border-primary/50 font-mono text-sm"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tokenMint" className="text-sm font-medium text-foreground">
                    Loyalty Token Mint Address *
                  </Label>
                  <Input
                    id="tokenMint"
                    type="text"
                    placeholder="Enter your custom token mint address"
                    value={tokenData.loyaltyTokenMintAddress}
                    onChange={(e) => setTokenData({
                      ...tokenData,
                      loyaltyTokenMintAddress: e.target.value
                    })}
                    className="crypto-glass border-primary/30 focus:border-primary/50 font-mono text-sm"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discountRate" className="text-sm font-medium text-foreground">
                    Discount Rate (%)
                  </Label>
                  <Input
                    id="discountRate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    placeholder="e.g., 5.0"
                    value={tokenData.discountRate}
                    onChange={(e) => setTokenData({
                      ...tokenData,
                      discountRate: parseFloat(e.target.value) || 0
                    })}
                    className="crypto-glass border-primary/30 focus:border-primary/50"
                  />
                  <p className="text-xs text-muted-foreground">
                    Percentage discount customers get when paying with your loyalty tokens
                  </p>
                </div>

                <GlassButton
                  onClick={() => handleTokenCreation()}
                  variant="primary"
                  className={`mt-8 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Creating Account...' : 'Complete Setup'}
                </GlassButton>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 