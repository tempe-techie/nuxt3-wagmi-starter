import { configureChains, createClient } from '@wagmi/core';
import { mainnet, optimism, polygon } from '@wagmi/core/chains';
import { publicProvider } from '@wagmi/core/providers/public';
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask';
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect';
import { Web3Modal } from "@web3modal/html";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

// Supported chains
const chains = [
  mainnet, optimism, polygon
];

// MetaMask
const mmConnector = new MetaMaskConnector({chains});

// WalletConnect
const wcConnector = new WalletConnectConnector({
  chains,
  options: {
    qrcode: true,
    rpc: {
      1: 'https://1rpc.io/eth',
      10: 'https://1rpc.io/op',
      137: 'https://1rpc.io/matic'
    },
  },
})

// connect chains and provider
const { provider, webSocketProvider } = configureChains(
  chains,
  [publicProvider()],
);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: [mmConnector, wcConnector],
  provider,
  webSocketProvider
});

// Web3Modal and Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);
const web3modal = new Web3Modal(
  { projectId: "" },
  ethereumClient
);

export default defineNuxtPlugin(() => {
  return {
    provide: {
      mmConnector, wagmiClient, wcConnector, web3modal
    }
  }
})
