import React, { useEffect, useState } from "react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import Option from "./Button/Option";

import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

import { useDispatch, useSelector } from "react-redux";
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  ACCOUNT_UPDATE,
} from "../redux/actions/index";

import { SUPPORTED_WALLETS } from "../constants/index";
import usePrevious from "../hooks/usePrevious";
import WalletService from "../services/walletService";
import Web3 from "web3";

const WALLET_VIEWS = {
  OPTIONS: "options",
  OPTIONS_SECONDARY: "options_secondary",
  ACCOUNT: "account",
  PENDING: "pending",
}; 

const WalletManager = (props: any) => {

    const dispatch = useDispatch();

    const { active, account, connector, activate, error, library } = useWeb3React();

    let verify = false;

    useEffect(() => {
        if (!account) { return }
        if (WalletService.verifySessionIntegrity(account)) {
          verify = true;
        }
          (async () => {
            console.log(activate)
            let web3: any = undefined
            let signature: string = ""
            const firstChain = (connector as any).supportedChainIds[0]
            if ((window as any).ethereum !== undefined) {
              web3 = new Web3((window as any).ethereum)
              try {
                signature = await web3.eth.personal.sign("I agree to connect my wallet to the GraphLinq Interface.", account, "")
              } catch (e) { console.error(e) }
            }
            
            const result = await WalletService.authWallet(account, signature)
            
            if (result) {
              dispatch({
                name: "walletManager",
                type: ACCOUNT_UPDATE,
                payload: {
                  account,
                },
              });
              console.log("result: ",result);
            }
            if(verify === true){
              {props.onPageChanged('Home')}
            }
        })()
    }, [account])

  const tryActivation = async (connector: any) => {
    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === (SUPPORTED_WALLETS as any)[key].connector) {
        return (SUPPORTED_WALLETS as any)[key].name;
      }
      return true;
    });

    connector &&
      activate(connector, undefined, true).catch((error) => {
        if (error instanceof UnsupportedChainIdError) {
          activate(connector); // a little janky...can't use setError because the connector isn't set
        }
      });
  };

  // get wallets user can switch too, depending on device/browser
  function getOptions() {
    const isMetamask =
      (window as any).ethereum && (window as any).ethereum.isMetaMask;
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = (SUPPORTED_WALLETS as any)[key];
        if (
          !(window as any).web3 &&
          !(window as any).ethereum &&
          option.mobile
        ) {
          return (
            <Option
              onClick={() => {
                option.connector !== connector &&
                  !option.href &&
                  tryActivation(option.connector);
              }}
              id={`connect-${key}`}
              key={key}
              active={option.connector && option.connector === connector}
              link={option.href}
              header={option.name}
              icon={option.iconName}
            />
          );
        }
      });
  }

  function getContent() {
    return (
      <>
        {getOptions()}
      </>
    );
  }

  return <>{getContent()}</>;
}

export default WalletManager;