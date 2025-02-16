const web3Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_WEB3':
      return {
        ...state,
        web3: action.payload
      };
    case 'SET_ACCOUNT':
      return {
        ...state,
        account: action.payload
      };
    case 'SET_NETWORK_ID':
      return {
        ...state,
        networkId: action.payload
      };
    case 'SET_CONNECTED':
      return {
        ...state,
        connected: action.payload
      };
    default:
      return state;
  }
};

export default web3Reducer;