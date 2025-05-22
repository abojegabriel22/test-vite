import './App.css';
import FooterComponent from './components/FooterComponent';
import Header from './components/HeaderComponent';
import HomeComponent from './components/HomeComponent';
import { HeaderContextProvider } from './context/header.context';
import { WalletProvider } from './context/wallet.context';

function App() {
  return (
    <WalletProvider>
      <HeaderContextProvider>
        <Header />
        <HomeComponent />
      </HeaderContextProvider>
      <FooterComponent />
    </WalletProvider>
  );
}

export default App;
