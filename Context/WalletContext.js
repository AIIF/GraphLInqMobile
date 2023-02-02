import React, {createContext, useContext, useState} from 'react';
import PropTypes from 'prop-types';

export const walletContext = createContext(null);

const WalletContextProvider = ({
    children
}) => {
    const [walletInfo, setWalletInfo] = useState({
        accountInfo : [''],
        EthBalance : "",
    });

    return <walletContext.Provider value={{ walletInfo, setWalletInfo }}>
         {children}
    </walletContext.Provider>
};

export default WalletContextProvider;

export const useWalletContext = () => useContext(walletContext);