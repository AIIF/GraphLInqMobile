import React from "react";
import { NativeBaseProvider } from "native-base";
import Auth from './pages/Auth.js';
import Staking from './pages/Staking';

const AppWrapper = () => {

  return (
    <NativeBaseProvider >
      <Auth />
    </NativeBaseProvider>
  );
};

export default AppWrapper;
