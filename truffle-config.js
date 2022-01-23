require('babel-register');
require('babel-polyfill');
//const HDWalletProvider = require("truffle-hdwallet-provider");
//const LoomTruffleProvider = require('loom-truffle-provider');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    // Configuration for Ethereum Mainnet
    mainnet: {
        provider: function() {
            return new HDWalletProvider(mnemonic, "https://mainnet.infura.io/v3/<YOUR_INFURA_API_KEY>")
        },
        network_id: "1" // Match any network id
    },
    // Configuration for Rinkeby Metwork
    rinkeby: {
        provider: function() {
            // Setting the provider with the Infura Rinkeby address and Token
            return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/<YOUR_INFURA_API_KEY>")
        },
        network_id: 4
    },
    // Configuration for Loom Testnet
    loom_testnet: {
      provider: function() {
                const privateKey = 'YOUR_PRIVATE_KEY';
                const chainId = 'extdev-plasma-us1';
                const writeUrl = 'wss://extdev-basechain-us1.dappchains.com/websocket';
                const readUrl = 'wss://extdev-basechain-us1.dappchains.com/queryws';
                // TODO: Replace the line below
                const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey);
                loomTruffleProvider.createExtraAccountsFromMnemonic(mnemonic, 10);
                return loomTruffleProvider;
              },
      network_id: '9545242630824'
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
