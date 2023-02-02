import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

import { NetworkConnector } from './networkConnector';

import { BscConnector } from '@binance-chain/bsc-connector'

//import {REACT_APP_CHAIN_ID, REACT_APP_NETWORK_URL} from '@env'


const NETWORK_URL = "https://mainnet.infura.io/v3/72c0f8ce8f1b47f3811e5a9fab0b7666";

export const NETWORK_CHAIN_ID = parseInt('1')

if (typeof NETWORK_URL === 'undefined') {
  throw new Error(`REACT_APP_NETWORK_URL must be a defined environment variable`)
}

export const network = new NetworkConnector({
  urls: { ["1"]: NETWORK_URL }
})

let networkLibrary: any
export function getNetworkLibrary() {
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider))
}

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 1337]
})

export const bsc = new BscConnector({
  supportedChainIds: [56, 97] // later on 1 ethereum mainnet and 3 ethereum ropsten will be supported
})