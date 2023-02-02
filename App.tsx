import React, { useState, useContext, createContext } from "react";
import { NativeBaseProvider } from "native-base";
import {Provider} from 'react-redux';
import { store } from "./redux/store";

import { useActiveWeb3React } from "./hooks";
import Web3ReactManager from "./web3/web3Manager";
import WalletContextProvider from './Context/WalletContext.js';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';

import { NetworkContextName } from './constants/index';
import getLibrary from './utils/getLibrary';

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);
import theme from './theme'
;
import Auth from "./pages/Auth";
import Home from "./pages/Home";

if ('ethereum' in window) {
  (window as any).ethereum.autoRefreshOnNetworkChange = false;
}

const AppWrapper = () => {

 // useActiveWeb3React();

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App= () => {

  const [pageType, setPageType] = useState('Auth');
  
  const onPageChanged = (type: any) => {
    setPageType(type);
  }

  return (
     <Web3ReactProvider getLibrary={getLibrary}>
       <Web3ProviderNetwork getLibrary={getLibrary}>
        <NativeBaseProvider theme={theme}>
          <WalletContextProvider>
            <Web3ReactManager>
              {pageType=='Auth'?
              <Auth onPageChanged={onPageChanged}/>
              : pageType=='Home'?
              <Home onPageChanged={onPageChanged}/>
              : null
              }
            </Web3ReactManager>
          </WalletContextProvider>
        </NativeBaseProvider>
       </Web3ProviderNetwork> 
     </Web3ReactProvider>
  );
};

export default AppWrapper;
