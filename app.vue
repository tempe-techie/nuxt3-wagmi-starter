<template>
  <div>
    <h1>Nuxt3 Wagmi Starter</h1>

    <button @click="connectMetaMask">Connect MetaMask</button>
    <button @click="connectWalletConnect">Connect WalletConnect</button>
    <button @click="disconnectWallet">Disconnect</button>

    <p>Chain: {{chainId}}</p>

    
  </div>
</template>

<script>
import { connect, disconnect, getNetwork, watchNetwork } from '@wagmi/core';

export default {
  methods: {
    async connectMetaMask() {
      console.log("connect");

      const result = await connect({connector: this.$mmConnector});

      console.log(result);
    },

    async connectWalletConnect() {
      console.log("connect WalletConnect");

      const result = this.$web3modal.openModal({uri: "http://localhost:3000/"});

      console.log(result);
    },

    async disconnectWallet() {
      console.log("disconnect");

      await disconnect();
    }
  },

  setup() {
    const chainId = ref(0);

    const { chain } = getNetwork();

    if (chain) {
      chainId.value = chain.id;
    }

    watchNetwork(function(network) {
      console.log(network);

      if (network.chain) {
        chainId.value = network.chain.id;
      } else {
        chainId.value = 0;
      }
      
    });

    return { chainId, connect, disconnect }
  },
}
</script>
