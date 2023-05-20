import Web3 from 'web3';
import LiquidityPoolContract from './contracts/LiquidityPool.json';

class AMM {
  constructor() {
    this.web3 = null;
    this.contract = null;
    this.contractAddress = 'YOUR_CONTRACT_ADDRESS';
  }

  async init() {
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();

      const networkId = await this.web3.eth.net.getId();
      const networkData = LiquidityPoolContract.networks[networkId];

      if (networkData) {
        this.contract = new this.web3.eth.Contract(
          LiquidityPoolContract.abi,
          this.contractAddress
        );
      } else {
        throw new Error('Contract not deployed on the current network');
      }
    } else {
      throw new Error('Web3 provider not found');
    }
  }

  async getReserve1() {
    return this.contract.methods.reserve1().call();
  }

  async getReserve2() {
    return this.contract.methods.reserve2().call();
  }

  async addLiquidity(amount1, amount2) {
    const accounts = await this.web3.eth.getAccounts();
    await this.contract.methods.addLiquidity(amount1, amount2).send({
      from: accounts[0],
    });
  }

  async removeLiquidity(liquidity) {
    const accounts = await this.web3.eth.getAccounts();
    await this.contract.methods.removeLiquidity(liquidity).send({
      from: accounts[0],
    });
  }

  async swap(fromAsset, toAsset, amount) {
    const accounts = await this.web3.eth.getAccounts();
    await this.contract.methods.swap(fromAsset, toAsset, amount).send({
      from: accounts[0],
    });
  }
}

export default AMM;
