'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, ArrowRightLeft, Coins } from "lucide-react"

export default function SwapPage() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Badge className="mb-4 border-0 shadow-lg">
            <Wallet className="w-3 h-3 mr-2" />
            Customer Dashboard
          </Badge>
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Welcome to Swap
          </h1>
          <p className="text-lg text-muted-foreground">
            Make payments, earn rewards, and manage your loyalty tokens
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="crypto-glass border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ArrowRightLeft className="w-5 h-5 mr-2" />
                Make Payment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Pay merchants with SOL, USDC, USDT, or loyalty tokens
              </p>
              <div className="h-32 bg-muted/20 rounded-lg flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Payment interface coming soon</p>
              </div>
            </CardContent>
          </Card>

          <Card className="crypto-glass border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Coins className="w-5 h-5 mr-2" />
                Loyalty Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Track your loyalty tokens and reward balances
              </p>
              <div className="h-32 bg-muted/20 rounded-lg flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Rewards dashboard coming soon</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 