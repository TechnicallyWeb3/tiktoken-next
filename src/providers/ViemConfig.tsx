import { createPublicClient, createWalletClient, http, custom } from 'viem'
import { polygon } from 'viem/chains'

// declare global {
//   interface Window {
//     ethereum: any; // 👈️ turn off type checking
//   }
// }

export const publicClient = createPublicClient({
    batch: {
        multicall: true,
    },
    chain: polygon,
    transport: http(),
})

// export const walletClient = createWalletClient({
//     chain: polygon,
//     transport: custom(window.ethereum),
//   })

export const ViemConfig = ({children}:{children:React.ReactNode}) => {
  return (
    <div>{children}</div>
  )
}
