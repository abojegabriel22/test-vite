
// TonProvider.js
import { TonConnectUIProvider } from '@tonconnect/ui-react'

export const TonProvider = ({ children }) => (
  <TonConnectUIProvider manifestUrl={`${window.location.origin}/tonconnect-manifest.json`}>
    {children}
  </TonConnectUIProvider>

)
