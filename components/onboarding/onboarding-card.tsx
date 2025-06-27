'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import GlassButton from "../glass-button"

interface OnboardingCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  buttonText: string;
}

export default function OnboardingCard({
  title,
  description,
  icon,
  onClick,
  buttonText
}: OnboardingCardProps) {
  return (
    <Card className="crypto-glass border border-primary/20 shadow-lg hover:shadow-xl dark:shadow-primary/5 transition-all duration-200 ease-out cursor-pointer group">
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500/15 to-purple-600/15 dark:from-purple-400/25 dark:to-purple-500/25 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-200 ease-out border border-purple-500/20">
          {icon}
        </div>
        <CardTitle className="text-2xl font-bold text-foreground">{title}</CardTitle>
        <p className="text-muted-foreground">
          {description}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <GlassButton 
          onClick={onClick}
          variant="primary"
          className="mt-6"
        >
          {buttonText}
        </GlassButton>
      </CardContent>
    </Card>
  )
}