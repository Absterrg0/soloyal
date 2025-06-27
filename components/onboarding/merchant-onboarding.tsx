'use client'
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Building2, Plus, Link, Sparkles } from "lucide-react"
import { toast } from "sonner"
import GlassButton from "../glass-button"
import TokenMintForm from "./token-mint-form"

interface MerchantOnboardingProps {
  onComplete: () => void;
  onBack: () => void;
}

// Choice selection component
function TokenChoiceForm({ 
  orgName, 
  onCreateToken, 
  onBack 
}: { 
  orgName: string; 
  onCreateToken: () => void; 
  onBack: () => void; 
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            size="sm"
            className="mr-3 p-2 hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">
            Token Setup
          </h1>
        </div>

        <Card className="crypto-glass border border-primary/20 shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500/15 to-purple-600/15 dark:from-purple-400/25 dark:to-purple-500/25 rounded-full flex items-center justify-center mx-auto mb-3 border border-purple-500/20">
              <Sparkles className="w-5 h-5 text-purple-500 dark:text-purple-400" />
            </div>
            <CardTitle className="text-lg">
              Choose Token Option for {orgName}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Select how you'd like to set up your loyalty tokens
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Create Custom Token Option */}
            <Card className="crypto-glass border border-green-500/20 hover:border-green-500/40 transition-colors cursor-pointer group" onClick={onCreateToken}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500/15 to-green-600/15 dark:from-green-400/25 dark:to-green-500/25 rounded-lg flex items-center justify-center border border-green-500/20 group-hover:border-green-500/40">
                    <Plus className="w-4 h-4 text-green-500 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-foreground mb-1">
                      Create Custom Token
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Launch a new Token2022 with metadata specifically for your business
                    </p>
                    <div className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
                      Recommended for new businesses
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Integrate Existing Token Option */}
            <Card className="crypto-glass border border-gray-500/20 opacity-60 cursor-not-allowed">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-500/15 to-gray-600/15 dark:from-gray-400/25 dark:to-gray-500/25 rounded-lg flex items-center justify-center border border-gray-500/20">
                    <Link className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-foreground mb-1">
                      Integrate Existing Token
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Connect an existing token for your loyalty program
                    </p>
                    <div className="mt-2 text-xs text-orange-500 font-medium">
                      Coming Soon
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function MerchantOnboarding({ onComplete, onBack }: MerchantOnboardingProps) {
  const [orgName, setOrgName] = useState('')
  const [showDetailsForm, setShowDetailsForm] = useState(false)
  const [showTokenMintForm, setShowTokenMintForm] = useState(false)

  const handleSubmit = async () => {
    if (!orgName.trim()) {
      toast.error('Please enter your organization name')
      return
    }

    try {
      setShowDetailsForm(true)
    } catch (error) {
      console.error('Error updating organization name:', error)
    }
  }

  const handleDetailsBack = () => {
    setShowDetailsForm(false)
  }

  const handleCreateToken = () => {
    setShowTokenMintForm(true)
  }

  const handleTokenMintBack = () => {
    setShowTokenMintForm(false)
  }

  // Show the token mint form if the user has chosen to create a custom token
  if (showTokenMintForm) {
    return (
      <TokenMintForm 
        orgName={orgName}
        onComplete={onComplete}
        onBack={handleTokenMintBack}
      />
    )
  }

  // Show the choice form if the user has completed the organization name step
  if (showDetailsForm) {
    return (
      <TokenChoiceForm 
        orgName={orgName}
        onCreateToken={handleCreateToken}
        onBack={handleDetailsBack}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            size="sm"
            className="mr-3 p-2 hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">
            Merchant Setup
          </h1>
        </div>

        <Card className="crypto-glass border border-primary/20 shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500/15 to-purple-600/15 dark:from-purple-400/25 dark:to-purple-500/25 rounded-full flex items-center justify-center mx-auto mb-3 border border-purple-500/20">
              <Building2 className="w-5 h-5 text-purple-500 dark:text-purple-400" />
            </div>
            <CardTitle className="text-lg">
              Business Setup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orgName" className="text-sm font-medium">
                  Organization Name
                </Label>
                <Input
                  id="orgName"
                  type="text"
                  placeholder="Your business name"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="crypto-glass border-primary/30 focus:border-primary/50"
                  required
                />
              </div>

              <GlassButton
                onClick={handleSubmit}
                variant="primary"
                className="w-full"
              >
                Continue
              </GlassButton>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}