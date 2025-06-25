import { describe, it, expect } from 'vitest'
import { Keypair } from '@solana/web3.js'

export const BASE_URL = 'http://localhost:3000'

describe('Merchant', () => {
    it('should create a merchant', async () => {
        const publicKey = Keypair.generate().publicKey.toBase58()
        const loyaltyTokenMintAddress = Keypair.generate().publicKey.toBase58()

        const fetchResponse = await fetch(`${BASE_URL}/api/merchant/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Helium',
                publicKey: publicKey,
                loyaltyTokenMintAddress: loyaltyTokenMintAddress,
                discountRate: 0.1,
            }),
        });

        const data = await fetchResponse.json();

        expect(fetchResponse.status).toBe(201)
        expect(data.merchant).toBeDefined()
        expect(data.merchant.name).toBe('Helium')
        expect(data.merchant.publicKey).toBe(publicKey)
        expect(data.merchant.loyaltyTokenMintAddress).toBe(loyaltyTokenMintAddress)
        expect(data.merchant.discountRate).toBe(0.1)
    })

    it("should not create a merchant with an invalid public key", async () => {
        const loyaltyTokenMintAddress = Keypair.generate().publicKey.toBase58()
        const fetchResponse = await fetch(`${BASE_URL}/api/merchant/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Helium',
                publicKey: 'invalid',
                loyaltyTokenMintAddress: loyaltyTokenMintAddress,
                discountRate: 0.1,
            }),
        });


        expect(fetchResponse.status).toBe(400)
    })

    it("should not create a merchant with an existing public key", async () => {
        const publicKey = Keypair.generate().publicKey.toBase58()
        const loyaltyTokenMintAddress = Keypair.generate().publicKey.toBase58()
   
        const fetchResponse = await fetch(`${BASE_URL}/api/merchant/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'XYZ',
                publicKey: publicKey,
                loyaltyTokenMintAddress: loyaltyTokenMintAddress,
                discountRate: 0.1,
            }),
        });

        const data = await fetchResponse.json();

        expect(fetchResponse.status).toBe(201)
        expect(data.message).toBe('Merchant created successfully')

        const fetchResponse2 = await fetch(`${BASE_URL}/api/merchant/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Helium',
                publicKey: publicKey,
                loyaltyTokenMintAddress: loyaltyTokenMintAddress,
                discountRate: 0.1,
            }),
        });

        const data2 = await fetchResponse2.json();

        expect(fetchResponse2.status).toBe(400)
        expect(data2.error).toBe('Merchant already exists')
    })
})