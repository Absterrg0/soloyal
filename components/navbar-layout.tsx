import { ModeToggle } from "./mode-toggle-button";
import Image from "next/image";
import CustomWallet from "./custom-wallet-ui/custom-wallet";

export default function NavbarLayout() {
  return (
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
    <div className="flex items-center space-x-3">
    <CustomWallet />
    <ModeToggle />
  </div>
  </header>
  ) 
}