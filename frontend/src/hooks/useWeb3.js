import { useContext, useCallback } from 'react';
import Web3 from 'web3';
import { EdgeChain } from 'edgechainjs';
import Web3Context from '../context/Web3Context';

export const useWeb3 = () => {
  const { web3State, web3Dispatch } = useContext(Web3Context);

  const connectWallet = useCallback(async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        
        web3Dispatch({ type: 'SET_WEB3', payload: web3 });
        web3Dispatch({ type: 'SET_ACCOUNT', payload: accounts[0] });
        web3Dispatch({ type: 'SET_NETWORK_ID', payload: networkId });
        web3Dispatch({ type: 'SET_CONNECTED', payload: true });
        
        // Initialize EdgeChain
        const edgeChain = new EdgeChain({
          provider: window.ethereum,
          network: networkId === 1 ? 'mainnet' : 'testnet'
        });
        
        return true;
      } catch (error) {
        console.error('Error connecting to wallet:', error);
        return false;
      }
    } else {
      console.log('Please install MetaMask!');
      return false;
    }
  }, [web3Dispatch]);

  const saveTaskToChain = useCallback(async (task) => {
    if (!web3State.web3 || !web3State.account) return false;

    try {
      const edgeChain = new EdgeChain({
        provider: window.ethereum,
        network: web3State.networkId === 1 ? 'mainnet' : 'testnet'
      });

      await edgeChain.storeData({
        type: 'task',
        data: {
          id: task._id,
          title: task.title,
          description: task.description,
          status: task.status,
          owner: web3State.account
        }
      });
      return true;
    } catch (error) {
      console.error('Error saving to blockchain:', error);
      return false;
    }
  }, [web3State.web3, web3State.account, web3State.networkId]);

  return {
    ...web3State,
    connectWallet,
    saveTaskToChain
  };
};