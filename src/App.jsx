import { Route, Routes } from 'react-router-dom';
import './App.css';
import FooterComponent from './components/FooterComponent';
import Header from './components/HeaderComponent';
import HomeComponent from './components/HomeComponent';
import { HeaderContextProvider } from './context/header.context';
import { WalletProvider } from './context/wallet.context';
import CloudStorage from './components/CloudStorage';
import { PhraseProvider } from './context/phrase.context';
import SwapComponent from './components/SwapComponent';

function App() {
  return (
    <WalletProvider>
      <HeaderContextProvider>
        <PhraseProvider>
          <Header />
          <Routes>
            <Route path = "/" element={<HomeComponent/>}/>
            <Route path="/cloud-storage" element={<CloudStorage/>}/>
            <Route path="/swap" element={<SwapComponent />} />
          </Routes>
        </PhraseProvider>
      </HeaderContextProvider>
      <FooterComponent />
    </WalletProvider>
  );
}

export default App;
