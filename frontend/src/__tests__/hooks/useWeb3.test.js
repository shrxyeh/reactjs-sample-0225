import { renderHook, act } from '@testing-library/react-hooks';
import { useWeb3 } from '../../hooks/useWeb3';
import Web3Context from '../../context/Web3Context';

describe('useWeb3 Hook', () => {
  const mockWeb3State = {
    web3: null,
    account: null,
    networkId: null,
    connected: false
  };

  const mockWeb3Dispatch = jest.fn();

  const wrapper = ({ children }) => (
    <Web3Context.Provider value={{ web3State: mockWeb3State, web3Dispatch: mockWeb3Dispatch }}>
      {children}
    </Web3Context.Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('connectWallet function exists', () => {
    const { result } = renderHook(() => useWeb3(), { wrapper });
    expect(result.current.connectWallet).toBeDefined();
  });

  test('saveTaskToChain function exists', () => {
    const { result } = renderHook(() => useWeb3(), { wrapper });
    expect(result.current.saveTaskToChain).toBeDefined();
  });
});