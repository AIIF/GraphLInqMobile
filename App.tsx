import React, { useState } from "react";
import { NativeBaseProvider } from "native-base";
import Auth from './pages/Auth.js';
import Main from './pages/Main';

const AppWrapper = () => {
  const [pageType, setPageType] = useState('Auth');
  
  const onPageChanged = (type: any) => {
    setPageType(type);
  }

  return (
    <NativeBaseProvider >
      {pageType=='Auth'?
      <Auth onPageChanged={onPageChanged}/>
      : pageType=='Main'?
      <Main onPageChanged={onPageChanged}/>
      : null
      }
     
    </NativeBaseProvider>
  );
};

export default AppWrapper;
