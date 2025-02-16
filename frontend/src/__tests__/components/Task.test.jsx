import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Task from '../../components/Task';
import TaskContext from '../../context/TaskContext';
import Web3Context from '../../context/Web3Context';

const mockTask = {
  _id: '1',
  title: 'Test Task',
  description: 'Test Description',
  status: 'active'
};

const mockWeb3State = {
  web3: null,
  account: null,
  networkId: null,
  connected: false
};

const mockDispatch = jest.fn();
const mockWeb3Dispatch = jest.fn();

describe('Task Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders task correctly', () => {
    render(
      <Web3Context.Provider value={{ web3State: mockWeb3State, web3Dispatch: mockWeb3Dispatch }}>
        <TaskContext.Provider value={{ dispatch: mockDispatch }}>
          <Task task={mockTask} />
        </TaskContext.Provider>
      </Web3Context.Provider>
    );

    expect(screen.getByText(mockTask.title)).toBeInTheDocument();
    expect(screen.getByText(mockTask.description)).toBeInTheDocument();
  });

  test('handles task status toggle', () => {
    render(
      <Web3Context.Provider value={{ web3State: mockWeb3State, web3Dispatch: mockWeb3Dispatch }}>
        <TaskContext.Provider value={{ dispatch: mockDispatch }}>
          <Task task={mockTask} />
        </TaskContext.Provider>
      </Web3Context.Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_TASK',
      payload: { ...mockTask, status: 'completed' }
    });
  });
});