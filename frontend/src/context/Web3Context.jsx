// context/Web3Context.js
import { createContext, useContext, useReducer, useCallback } from 'react';
import Web3 from 'web3';

const Web3Context = createContext();

const web3Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_WEB3':
      return { ...state, web3: action.payload };
    case 'SET_ACCOUNT':
      return { ...state, account: action.payload };
    case 'SET_NETWORK':
      return { ...state, networkId: action.payload };
    case 'SET_CONNECTED':
      return { ...state, connected: action.payload };
    default:
      return state;
  }
};

export function Web3Provider({ children }) {
  const [state, dispatch] = useReducer(web3Reducer, {
    web3: null,
    account: null,
    networkId: null,
    connected: false
  });

  const connectWallet = useCallback(async () => {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        
        // Get account
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        
        dispatch({ type: 'SET_WEB3', payload: web3 });
        dispatch({ type: 'SET_ACCOUNT', payload: accounts[0] });
        dispatch({ type: 'SET_NETWORK', payload: networkId });
        dispatch({ type: 'SET_CONNECTED', payload: true });
        
        return true;
      } catch (error) {
        console.error('Error connecting to wallet:', error);
        return false;
      }
    } else {
      console.log('Please install MetaMask!');
      return false;
    }
  }, []);

  const storeTaskOnChain = useCallback(async (task) => {
    if (!state.web3 || !state.account) return false;

    try {
      // Create a simple contract instance to store task data
      const taskData = state.web3.eth.abi.encodeParameters(
        ['string', 'string', 'string', 'address'],
        [task._id, task.title, task.status, state.account]
      );

      // You could store this data using a smart contract
      // For now, we'll just return the encoded data
      console.log('Task data encoded for blockchain:', taskData);
      return true;
    } catch (error) {
      console.error('Error preparing task for blockchain:', error);
      return false;
    }
  }, [state.web3, state.account]);

  return (
    <Web3Context.Provider value={{
      ...state,
      connectWallet,
      storeTaskOnChain
    }}>
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => useContext(Web3Context);

export default Web3Context;