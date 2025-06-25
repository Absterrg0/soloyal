"use client"

import React from "react"
import { signIn } from "@/lib/auth-client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/mode-toggle-button"
import { ArrowRight, Chrome, Binary, Shield, Zap, Users, Fingerprint, Lock, Globe } from "lucide-react"
import Image from "next/image"

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      await signIn.social({
        provider: "google",
        callbackURL: "/home",
      })
    } catch (error) {
      console.error("Sign in error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Hexagonal elements with floating animation
  const HexElement = ({ size = 40, delay = 0, className = "" }) => (
    <div 
      className={`absolute opacity-8 animate-hex-float ${className}`} 
      style={{ animationDelay: `${delay}s` }}
      aria-hidden="true"
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M17.5 6.5L12 3L6.5 6.5V17.5L12 21L17.5 17.5V6.5Z"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary"
        />
      </svg>
    </div>
  )

  const features = [
    {
      icon: Shield,
      title: "Merchant Loyalty Tokens",
      description: "Launch custom tokens with rewards & discounts"
    },
    {
      icon: Zap,
      title: "Multi-Token Payments",
      description: "Accept SOL, USDC, USDT & loyalty tokens"
    },
    {
      icon: Globe,
      title: "Decentralized Rewards",
      description: "Earn 1% rewards on every SOL payment"
    }
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-secondary/2" aria-hidden="true" />

      {/* Floating Hexagons - With animation */}
      <HexElement size={80} delay={0} className="top-20 left-20 z-5" />
      <HexElement size={60} delay={2} className="top-40 right-32 z-5" />
      <HexElement size={70} delay={4} className="bottom-32 left-16 z-5" />
      <HexElement size={50} delay={1} className="bottom-20 right-20 z-5" />
      <HexElement size={40} delay={3} className="top-1/2 left-8 z-5" />
      <HexElement size={55} delay={5} className="top-1/4 right-16 z-5" />

      {/* Subtle Background Orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary/3 to-secondary/3 rounded-full blur-3xl animate-float z-1" aria-hidden="true" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-secondary/3 to-accent/3 rounded-full blur-3xl animate-float z-1" style={{ animationDelay: '3s' }} aria-hidden="true" />

      {/* Header */}
      <header className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
            <Image
              src="/logo.png"
              alt="Soloyal Logo"
              width={64}
              height={64}
              className="w-12 h-12"
            />
          </div>
          <span className="text-xl font-bold text-foreground">Soloyal</span>
        </div>
        <ModeToggle />
      </header>

      {/* Main Content - 2 Column Layout */}
      <div className="flex min-h-screen relative z-10">
        {/* Left Column - Branding & Features */}
        <div className="flex-1 flex items-center justify-center p-8 relative">
          <div className="max-w-lg">
            {/* Hero Section */}
            <div className="mb-12">
              <Badge className="mb-6 badge-secure border-0 shadow-lg">
                <Lock className="w-3 h-3 mr-2" aria-hidden="true" />
                Solana Loyalty Platform
              </Badge>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-foreground">
                Welcome to{" "}
                <span className="gradient-text-updated">Soloyal</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                The first decentralized loyalty payment platform on Solana. Pay with SOL, USDC, USDT, or merchant tokens and earn rewards with every transaction.
              </p>
            </div>

            {/* Features - Reduced interactions */}
            <div className="space-y-6" role="list" aria-label="Platform features">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-4 crypto-glass rounded-2xl p-4 transition-opacity duration-200" role="listitem">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Indicators - Static */}
            <div className="mt-12 grid grid-cols-3 gap-4" role="group" aria-label="Platform metrics">
              <div className="text-center crypto-glass rounded-xl p-4">
                <div className="text-2xl font-bold text-primary font-mono">SOL</div>
                <div className="text-xs text-muted-foreground">Native</div>
              </div>
              <div className="text-center crypto-glass rounded-xl p-4">
                <div className="text-2xl font-bold text-primary font-mono">1%</div>
                <div className="text-xs text-muted-foreground">Rewards</div>
              </div>
              <div className="text-center crypto-glass rounded-xl p-4">
                <div className="text-2xl font-bold text-primary font-mono">Token22</div>
                <div className="text-xs text-muted-foreground">Standard</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stylish Separator */}
        <div className="relative w-px">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent blur-sm"></div>
        </div>

        {/* Right Column - Signin Form */}
        <div className="flex-1 flex items-center justify-center p-8 relative">
          <div className="w-full max-w-md">
            <Card className="crypto-glass border-0 shadow-2xl relative overflow-hidden">
              {/* Card background - simplified */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/3 opacity-50" aria-hidden="true" />
              
              <CardHeader className="text-center pb-6 relative z-10">
                <div className="mx-auto mb-6">
                  <Image 
                    src="/logo.png" 
                    alt="Soloyal company logo" 
                    width={64}
                    height={48}
                  />
                </div>
                <CardTitle className="text-3xl font-bold mb-3 text-foreground">Sign In</CardTitle>
                <div className="space-y-2">
                  <p className="text-muted-foreground">Access your loyalty dashboard</p>
                  <p className="text-sm text-muted-foreground/80">
                    Manage payments, rewards, and merchant tokens in one place
                  </p>
                </div>
              </CardHeader>

              <CardContent className="pb-8 relative z-10">
                <Button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  size="lg"
                  className="w-full h-14 text-base font-medium crypto-glass hover:bg-white/5 text-foreground border border-white/20 shadow-xl transition-all duration-200 hover:shadow-2xl disabled:opacity-50 relative overflow-hidden"
                  aria-label={isLoading ? "Signing in with Google, please wait" : "Sign in with Google"}
                >
                  {isLoading ? (
                    <div className="flex items-center relative z-10">
                      <div 
                        className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin mr-3" 
                        aria-hidden="true"
                      />
                      <span>Authenticating...</span>
                      <span className="sr-only">Please wait while we authenticate your account</span>
                    </div>
                  ) : (
                    <div className="flex items-center relative z-10">
                      <Chrome className="w-5 h-5 mr-3" aria-hidden="true" />
                      Continue with Google
                      <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    </div>
                  )}
                </Button>

                {/* Security Indicators - Updated for Solana */}
                <div className="mt-6 grid grid-cols-3 gap-3" role="group" aria-label="Security features">
                  <div className="text-center">
                    <div className="w-10 h-10 crypto-glass rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Shield className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">Secure</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 crypto-glass rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Fingerprint className="w-4 h-4 text-blue-600" aria-hidden="true" />
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">Verified</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 crypto-glass rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Lock className="w-4 h-4 text-purple-600" aria-hidden="true" />
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">Decentralized</p>
                  </div>
                </div>

                {/* Security Note */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-muted-foreground/70 leading-relaxed">
                    Powered by Solana blockchain with Token-22 standard compliance
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Footer */}
            <footer className="text-center mt-8">
              <p className="text-xs text-muted-foreground/80">
                By signing in, you agree to our{" "}
                <a 
                  href="#" 
                  className="text-primary hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
                  aria-label="Read our Terms of Service"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a 
                  href="#" 
                  className="text-primary hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
                  aria-label="Read our Privacy Policy"
                >
                  Privacy Policy
                </a>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}
