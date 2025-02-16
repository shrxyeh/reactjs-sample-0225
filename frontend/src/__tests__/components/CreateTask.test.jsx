import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CreateTask from '../../components/createTask/CreateTask.jsx';

const mockDispatch = jest.fn();
jest.mock('../../context/TaskContext', () => ({
  useTaskContext: () => ({
    dispatch: mockDispatch
  })
}));

describe('CreateTask Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('creates new task on form submission', async () => {
    render(<CreateTask />);
    
    fireEvent.change(screen.getByPlaceholderText(/title/i), {
      target: { value: 'New Task' }
    });
    
    fireEvent.change(screen.getByPlaceholderText(/description/i), {
      target: { value: 'Task Description' }
    });
    
    fireEvent.click(screen.getByText(/create/i));
    
    expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'ADD_TASK',
      payload: expect.objectContaining({
        title: 'New Task',
        description: 'Task Description'
      })
    }));
  });
});