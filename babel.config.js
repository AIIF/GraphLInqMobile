module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo'
    ],
    plugins: [    
      '@babel/plugin-proposal-export-namespace-from',
      // ['module:react-native-dotenv', {
      //   "moduleName": "@env",
      //   "whitelist" : ["REACT_APP_PUBLIC_URL","REACT_APP_PROXY_API_URL","REACT_APP_NETWORK_URL","REACT_APP_METRICS_API_URL","REACT_APP_SUPPLY_API_URL","REACT_APP_MANAGER_URL","REACT_APP_LIVECOINWATCH_API_URL","REACT_APP_LIVECOINWATCH_API_KEY","REACT_APP_CHAIN_ID","REACT_APP_SIGN_KEY","REACT_APP_GRAPHLINQ_STAKING_CONTRACT","REACT_APP_GRAPHLINQ_TOKEN_CONTRACT","REACT_APP_GRAPHLINQ_BALANCE_CONTRACT"],
      //   "path": ".env",
      //   "verbose": false
      // }],
      'react-native-reanimated/plugin'
    ],
  };
};
