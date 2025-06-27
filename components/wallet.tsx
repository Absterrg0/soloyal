'use client'
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { 
    PhantomWalletAdapter,
    SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';

export default function Wallet({children}: {children: React.ReactNode}) {
    const endpoint = clusterApiUrl('devnet')
    
    const wallets = [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
    ];

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                {children}
            </WalletProvider>
        </ConnectionProvider>
    )
}