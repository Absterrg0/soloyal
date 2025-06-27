'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Store, CreditCard, Settings, BarChart3 } from "lucide-react"

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Badge className="mb-4 border-0 shadow-lg">
            <Store className="w-3 h-3 mr-2" />
            Merchant Dashboard
          </Badge>
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Welcome to Playground
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your business, accept payments, and create loyalty programs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="crypto-glass border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Accept Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Generate payment links and QR codes for customers
              </p>
              <div className="h-32 bg-muted/20 rounded-lg flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Payment tools coming soon</p>
              </div>
            </CardContent>
          </Card>

          <Card className="crypto-glass border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Loyalty Program
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Configure rewards, discounts, and loyalty tokens
              </p>
              <div className="h-32 bg-muted/20 rounded-lg flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Loyalty settings coming soon</p>
              </div>
            </CardContent>
          </Card>

          <Card className="crypto-glass border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Track sales, customer engagement, and token usage
              </p>
              <div className="h-32 bg-muted/20 rounded-lg flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Analytics dashboard coming soon</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 