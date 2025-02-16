// __tests__/context/Web3Context.test.js
import { render, act } from '@testing-library/react';
import { Web3Provider, useWeb3 } from '../../context/Web3Context';
import { renderHook } from '@testing-library/react-hooks';

// Mock window.ethereum
const mockEthereum = {
  request: jest.fn(),
  on: jest.fn()
};

describe('Web3Context', () => {
  beforeEach(() => {
    window.ethereum = mockEthereum;
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const wrapper = ({ children }) => <Web3Provider>{children}</Web3Provider>;
    const { result } = renderHook(() => useWeb3(), { wrapper });

    expect(result.current.web3).toBeNull();
    expect(result.current.account).toBeNull();
    expect(result.current.networkId).toBeNull();
    expect(result.current.connected).toBeFalsy();
  });

  it('should handle wallet connection', async () => {
    mockEthereum.request.mockResolvedValueOnce(['0x123']);
    
    const wrapper = ({ children }) => <Web3Provider>{children}</Web3Provider>;
    const { result } = renderHook(() => useWeb3(), { wrapper });

    await act(async () => {
      await result.current.connectWallet();
    });

    expect(mockEthereum.request).toHaveBeenCalledWith({
      method: 'eth_requestAccounts'
    });
  });
});