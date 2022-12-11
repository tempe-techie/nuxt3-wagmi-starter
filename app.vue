<template>
  <div>
    <h1>Nuxt3 Wagmi Starter</h1>

    <button @click="connectMetaMask">Connect MetaMask</button>
    <button @click="disconnectWallet">Disconnect</button>
    <button @click="fetchUsdcBalancePolygon">Fetch USDC balance</button>

    <p>Chain: {{chainId}}</p>
    <p>Address: {{address}}</p>

  </div>
</template>

<script>
import { ethers } from 'ethers';
import { 
  connect, disconnect, erc20ABI, getAccount, getNetwork, getProvider, watchAccount, watchNetwork 
} from '@wagmi/core';

export default {
  methods: {
    async connectMetaMask() {
      console.log("connect");

      const result = await connect({connector: this.$mmConnector});

      console.log(result);
    },

    async disconnectWallet() {
      console.log("disconnect");

      await disconnect();
    },

    async fetchUsdcBalancePolygon() {
      const newProvider = this.getProvider();

      const contract = new ethers.Contract(
        "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",  // USDC contract on Polygon
        this.erc20ABI, 
        newProvider
      );

      const balance = await contract.balanceOf(this.address);

      console.log("balance: ");
      console.log(balance);
    },
  },

  setup() {
    const chainId = ref(0);
    const address = ref("");

    const account = getAccount();
    const { chain } = getNetwork();

    if (chain) {
      chainId.value = chain.id;
    }

    if (account) {
      address.value = account.address;
    }

    watchAccount(function(account) {
      if (account.address) {
        address.value = account.address;
      } else {
        address.value = "";
      }
    });

    watchNetwork(function(network) {
      if (network.chain) {
        chainId.value = network.chain.id;
      } else {
        chainId.value = 0;
      }
    });

    return { address, chainId, connect, disconnect, erc20ABI, getProvider }
  },
}
</script>
