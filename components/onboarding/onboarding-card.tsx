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
    <Card className="crypto-glass shadow-lg hover:shadow-xl dark:shadow-primary/5 transition-all duration-300 ease-out cursor-pointer group">
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 ease-out crypto-glass-static">
          {icon}
        </div>
        <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">{title}</CardTitle>
        <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-200">
          {description}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <GlassButton 
          onClick={onClick}
          variant="primary"
          className="mt-6 group-hover:scale-105 transition-transform duration-200"
        >
          {buttonText}
        </GlassButton>
      </CardContent>
    </Card>
  )
}