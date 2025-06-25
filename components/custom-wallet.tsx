'use client'

import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';

export default function CustomWallet() {
    const { publicKey, disconnect, connected } = useWallet();
    const { setVisible } = useWalletModal();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleConnect = () => {
        setVisible(true);
    };

    const handleDisconnect = async () => {
        await disconnect();
        setIsDropdownOpen(false);
    };

    const copyAddress = () => {
        if (publicKey) {
            navigator.clipboard.writeText(publicKey.toBase58());
            // You can add a toast notification here
        }
    };

    const formatAddress = (address: string) => {
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    };

    if (!connected) {
        return (
            <button
                onClick={handleConnect}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.5 6H17v1.5h3.5c.8 0 1.5.7 1.5 1.5v8c0 .8-.7 1.5-1.5 1.5h-17C2.7 18.5 2 17.8 2 17V9c0-.8.7-1.5 1.5-1.5H7V6H3.5C1.6 6 0 7.6 0 9.5v8C0 19.4 1.6 21 3.5 21h17c1.9 0 3.5-1.6 3.5-3.5v-8C24 7.6 22.4 6 20.5 6z"/>
                    <path d="M12 2c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                </svg>
                Connect Wallet
            </button>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                {formatAddress(publicKey!.toBase58())}
                <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>

            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                        <p className="text-sm text-gray-500 mb-1">Connected Wallet</p>
                        <p className="text-sm font-mono text-gray-900 break-all">
                            {publicKey!.toBase58()}
                        </p>
                    </div>
                    
                    <div className="p-2">
                        <button
                            onClick={copyAddress}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                            </svg>
                            Copy Address
                        </button>
                        
                        <button
                            onClick={handleDisconnect}
                            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"/>
                            </svg>
                            Disconnect
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
} 