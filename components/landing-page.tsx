'use client'
import CustomWallet from "./custom-wallet";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-900">Soloyal</h1>
                        </div>
                        <CustomWallet />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                        Welcome to Soloyal
                    </h2>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                        A decentralized loyalty program built on Solana. Connect your wallet to get started.
                    </p>
                    
                    <div className="mt-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">For Merchants</h3>
                                <p className="text-gray-600">Create and manage your loyalty program with customizable rewards.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">For Customers</h3>
                                <p className="text-gray-600">Earn loyalty tokens and redeem rewards across participating merchants.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Decentralized</h3>
                                <p className="text-gray-600">Built on Solana for fast, secure, and transparent transactions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}