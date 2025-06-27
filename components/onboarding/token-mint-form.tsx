'use client'
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Coins, FileText, Image, Hash, Shield, Key, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import GlassButton from "../glass-button"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Keypair, LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js"
import {createAssociatedTokenAccountInstruction, createInitializeMetadataPointerInstruction, createInitializeMint2Instruction, createMintToInstruction, ExtensionType, getAssociatedTokenAddressSync, getMintLen, LENGTH_SIZE, TOKEN_2022_PROGRAM_ID, TYPE_SIZE} from "@solana/spl-token"
import { createInitializeInstruction, pack } from "@solana/spl-token-metadata"

interface TokenMintFormProps {
  orgName: string;
  onComplete: () => void;
  onBack: () => void;
}

export default function TokenMintForm({ orgName, onComplete, onBack }: TokenMintFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [tokenData, setTokenData] = useState({
    name: '',
    symbol: '',
    imageUrl: '',
    initialSupply: '',
    decimals: '9',
    freezeAuthority: true,  
  })
  const wallet = useWallet();
  const {connection} = useConnection();

  const {mutate: createToken} = useMutation({
    mutationFn: async (data: typeof tokenData & { orgName: string }) => {
      const response = await axios.post('/api/merchant/create-token', data)
      return response.data
    },
    onMutate: () => {
      toast.info('Launching token...')
    },
    onSuccess: () => {
      toast.success('Token created successfully!')
      onComplete()
    },
    onError: (error: any) => {
      console.error('Error creating token:', error)
      toast.error(error.response?.data?.error || 'Failed to create token. Please try again.')
    }
  })

  const {mutate: createTokenOnChain} = useMutation({
    mutationFn: async () => {
      await tokenOnChain();
    },
    onSuccess: () => {
      toast.success('Token created successfully!')
      createToken({
        ...tokenData,
        orgName
    })
    },
    onError: (error: any) => {
      toast.error(error.message)
    }
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setTokenData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const validateStep1 = () => {
    if (!tokenData.name.trim()) {
      toast.error('Please enter a token name')
      return false
    }

    if (!tokenData.symbol.trim()) {
      toast.error('Please enter a token symbol')
      return false
    }

    if (tokenData.symbol.length > 10) {
      toast.error('Token symbol must be 10 characters or less')
      return false
    }

    return true
  }

  const tokenOnChain = async () => {
    try{
        if(!wallet.publicKey) {
            throw new Error('Wallet not connected')
          }
      
          const mintKeyPair = Keypair.generate();
      
          const metadata = {
              mint: mintKeyPair.publicKey,
              name: tokenData.name,
              symbol: tokenData.symbol,
              uri: tokenData.imageUrl || '',
              sellerFeeBasisPoints: 0,
              decimals: parseInt(tokenData.decimals),
              initialSupply: parseFloat(tokenData.initialSupply),
              mintAuthority: wallet.publicKey,
              freezeAuthority: tokenData.freezeAuthority ? wallet.publicKey : null,
              updateAuthority: wallet.publicKey,
              additionalMetadata:[]
          }
      
          const mintLen = getMintLen([ExtensionType.MetadataPointer]);
          const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
      
          const lamports = await connection.getMinimumBalanceForRentExemption(mintLen+metadataLen);
      
      
          const freezeAuthority = tokenData.freezeAuthority ? wallet.publicKey : null; 
          const transaction = new Transaction().add(
              SystemProgram.createAccount({
                  fromPubkey:wallet.publicKey,
                  newAccountPubkey:mintKeyPair.publicKey,
                  lamports,
                  space:mintLen,
                  programId:TOKEN_2022_PROGRAM_ID
              }
              ),
              createInitializeMetadataPointerInstruction(mintKeyPair.publicKey,wallet.publicKey,mintKeyPair.publicKey,TOKEN_2022_PROGRAM_ID),
              createInitializeMint2Instruction(mintKeyPair.publicKey,parseInt(tokenData.decimals),wallet.publicKey,freezeAuthority,TOKEN_2022_PROGRAM_ID),
              createInitializeInstruction({
                  programId: TOKEN_2022_PROGRAM_ID,
                  mint: mintKeyPair.publicKey,
                  metadata: mintKeyPair.publicKey,
                  name: metadata.name,
                  symbol: metadata.symbol,
                  uri: metadata.uri,
                  mintAuthority: metadata.mintAuthority,
                  updateAuthority: metadata.mintAuthority,
      
              })
              
          )
      
          transaction.feePayer=wallet.publicKey;
          transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
          transaction.partialSign(mintKeyPair);
      
          const txId = await wallet.sendTransaction(transaction,connection);
      
          toast.info("Token created successfully");
      
      
      
          const associatedToken = getAssociatedTokenAddressSync(
              mintKeyPair.publicKey,
              wallet.publicKey,
              false,
              TOKEN_2022_PROGRAM_ID
          );
      
            const transaction2 = new Transaction().add(
              createAssociatedTokenAccountInstruction(
                wallet.publicKey,
                associatedToken,
                wallet.publicKey,
                mintKeyPair.publicKey,
                TOKEN_2022_PROGRAM_ID
              )
            );
      
            await wallet.sendTransaction(transaction2, connection);
      
            const transaction3 = new Transaction().add(
              createMintToInstruction(mintKeyPair.publicKey, associatedToken, wallet.publicKey, Number(metadata.initialSupply) * LAMPORTS_PER_SOL, [], TOKEN_2022_PROGRAM_ID)
            );
      
            await wallet.sendTransaction(transaction3, connection);
            toast.success(`${metadata.initialSupply} token minted successfully`)
    }
    catch(error){
      toast.error(error as string)
    }
  }

  const validateStep2 = () => {
    if (!tokenData.initialSupply.trim()) {
      toast.error('Please enter an initial supply')
      return false
    }

    const supply = parseFloat(tokenData.initialSupply)
    if (isNaN(supply) || supply <= 0) {
      toast.error('Initial supply must be a positive number')
      return false
    }

    const decimals = parseInt(tokenData.decimals)
    if (isNaN(decimals) || decimals < 0 || decimals > 18) {
      toast.error('Decimals must be between 0 and 18')
      return false
    }

    return true
  }

  const handleNextStep = () => {
    if (validateStep1()) {
      setCurrentStep(2)
    }
  }

  const handlePrevStep = () => {
    setCurrentStep(1)
  }

  const handleSubmit = async () => {
    if (!validateStep2()) {
      return
    }

    try {
        createTokenOnChain();
        

    } catch (error) {
      console.error('Error creating token:', error)
    }
  }

  const renderStep1 = () => (
    <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Token Identity
        </h3>
        
        <div className="space-y-2">
          <Label htmlFor="tokenName" className="text-sm font-medium">
            Token Name
          </Label>
          <Input
            id="tokenName"
            type="text"
            placeholder="e.g., CafePoints, ShopRewards"
            value={tokenData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="crypto-glass border-primary/30 focus:border-primary/50"
            required
          />
          <p className="text-xs text-muted-foreground">
            A friendly name for your loyalty token
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tokenSymbol" className="text-sm font-medium">
            Token Symbol
          </Label>
          <Input
            id="tokenSymbol"
            type="text"
            placeholder="e.g., CAFE, SHOP (max 10 chars)"
            value={tokenData.symbol}
            onChange={(e) => handleInputChange('symbol', e.target.value.toUpperCase())}
            className="crypto-glass border-primary/30 focus:border-primary/50"
            maxLength={10}
            required
          />
          <p className="text-xs text-muted-foreground">
            A short abbreviation for your token (like stock symbols)
          </p>
        </div>
      </div>

      {/* Token Image */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Image className="w-4 h-4" />
          Token Branding
        </h3>
        
        <div className="space-y-2">
          <Label htmlFor="imageUrl" className="text-sm font-medium">
            Token Logo URL (Optional)
          </Label>
          
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://example.com/token-logo.png"
              value={tokenData.imageUrl}
              onChange={(e) => handleInputChange('imageUrl', e.target.value)}
              className="crypto-glass border-primary/30 focus:border-primary/50 flex-1"
            />
          <p className="text-xs text-muted-foreground">
            Any image URL works (UploadThing, Cloudinary, etc.). Recommended: 512x512px PNG or JPG.
          </p>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <GlassButton
          onClick={onBack}
          variant="default"
          className="flex-1"
        >
          Back
        </GlassButton>
        <GlassButton
          onClick={handleNextStep}
          variant="default"
          className="flex-1 flex items-center justify-center gap-2"
        >
          Next Step
          <ArrowRight className="w-4 h-4" />
        </GlassButton>
      </div>
    </form>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Token Configuration */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Hash className="w-4 h-4" />
          Token Configuration
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="initialSupply" className="text-sm font-medium">
              Initial Supply
            </Label>
            <Input
              id="initialSupply"
              type="number"
              placeholder="1000000"
              value={tokenData.initialSupply}
              onChange={(e) => handleInputChange('initialSupply', e.target.value)}
              className="crypto-glass border-primary/30 focus:border-primary/50"
              min="1"
              required
            />
            <p className="text-xs text-muted-foreground">
              How many tokens to create initially
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="decimals" className="text-sm font-medium">
              Decimals
            </Label>
            <Input
              id="decimals"
              type="number"
              value={tokenData.decimals}
              onChange={(e) => handleInputChange('decimals', e.target.value)}
              className="crypto-glass border-primary/30 focus:border-primary/50"
              min="0"
              max="18"
              required
            />
            <p className="text-xs text-muted-foreground">
              Precision level (9 is standard)
            </p>
          </div>
        </div>
      </div>

      {/* Authority Settings */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Authority Settings
        </h3>
        <p className="text-xs text-muted-foreground">
          Control what actions can be performed on your token after creation
        </p>
        
        <div className="space-y-3">
      

          <div className="flex items-center justify-between p-3 rounded-lg crypto-glass border border-primary/20">
            <div className="flex items-center space-x-3">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Freeze Authority</p>
                <p className="text-xs text-muted-foreground">Freeze specific token accounts if needed</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={tokenData.freezeAuthority}
              onChange={(e) => handleInputChange('freezeAuthority', e.target.checked)}
              className="w-4 h-4 text-primary bg-transparent border-primary/30 rounded focus:ring-primary focus:ring-2"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <GlassButton
          onClick={handlePrevStep}
          variant="default"
          className="flex-1 flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </GlassButton>
        <GlassButton
          onClick={handleSubmit}
          variant="default"
          className={`flex-1`}
        >
          Launch Token
        </GlassButton>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={currentStep === 1 ? onBack : handlePrevStep}
            size="sm"
            className="mr-3 p-2 hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground">
              Create Token
            </h1>
          </div>
        </div>

        <Card className="crypto-glass border border-primary/20 shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500/15 to-green-600/15 dark:from-green-400/25 dark:to-green-500/25 rounded-full flex items-center justify-center mx-auto mb-3 border border-green-500/20">
              <Coins className="w-5 h-5 text-green-500 dark:text-green-400" />
            </div>
            <CardTitle className="text-lg">
              {currentStep === 1 ? 'Token Identity & Branding' : 'Technical Configuration'}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              {currentStep === 1 
                ? 'Define your token\'s name, symbol, and visual identity'
                : 'Configure technical settings and permissions'
              }
            </p>
          </CardHeader>
          <CardContent>
            {currentStep === 1 ? renderStep1() : renderStep2()}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 