import { createPublicClient, createWalletClient, http, custom } from 'viem'
import { polygon } from 'viem/chains'

export const publicClient = createPublicClient({
    batch: {
        multicall: true,
    },
    chain: polygon,
    transport: http(),
})

export const walletClient = createWalletClient({
    chain: polygon,
    transport: http(),
  })

export const ViemConfig = ({children}:{children:React.ReactNode}) => {
  return (
    <div>{children}</div>
  )
}
