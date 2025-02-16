import PropTypes from 'prop-types';
import moment from 'moment';
import './task.css';
import { useContext, useState } from 'react';
import axios from '../../Axios/axios';
import TaskContext from '../../context/TaskContext';
import { useWeb3 } from '../../context/Web3Context';
import DeleteIcon from '@mui/icons-material/Delete';
import StorageIcon from '@mui/icons-material/Storage';

function Task({ task, id, userToken }) {
    const { dispatch } = useContext(TaskContext);
    const { connected, storeTaskOnChain } = useWeb3();
    const [isStoring, setIsStoring] = useState(false);

    const handleRemove = async () => {
        try {
            await axios.delete(`/task/removeTask/${id}`, {
                headers: { Authorization: `Bearer ${userToken}` }
            });
            dispatch({ type: 'REMOVE_TASK', id });
        } catch (error) {
            console.error('Error removing task:', error);
        }
    };

    const handleMarkDone = async () => {
        try {
            await axios.put(`/task/markDone/${id}`, {}, {
                headers: { Authorization: `Bearer ${userToken}` }
            });
            dispatch({ type: 'MARK_DONE', id });
        } catch (error) {
            console.error('Error marking task as done:', error);
        }
    };

    const handleStoreOnChain = async () => {
        if (!connected) return;
        
        setIsStoring(true);
        try {
            const success = await storeTaskOnChain({
                _id: id,
                title: task.title,
                description: task.description,
                status: task.completed ? 'completed' : 'active'
            });
            
            if (success) {
                // You could add a toast notification here
                console.log('Task stored on blockchain successfully');
            }
        } catch (error) {
            console.error('Error storing task on blockchain:', error);
        } finally {
            setIsStoring(false);
        }
    };

    return (
        <div className='bg-slate-300 py-4 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3'>
            <div className="mark-done">
                <input type="checkbox" className="checkbox" onChange={handleMarkDone} checked={task.completed} />
            </div>
            <div className="task-info text-slate-900 text-sm w-10/12">
                <h4 className="task-title text-lg capitalize">{task.title}</h4>
                <p className="task-description">{task.description}</p>
                <div className='italic opacity-60'>
                    {task.createdAt ? (
                        <p>{moment(task.createdAt).fromNow()}</p>
                    ) : (
                        <p>just now</p>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {connected && (
                    <StorageIcon
                        style={{ 
                            fontSize: 30, 
                            cursor: isStoring ? 'wait' : 'pointer',
                            opacity: isStoring ? 0.7 : 1
                        }}
                        size="large"
                        onClick={!isStoring ? handleStoreOnChain : undefined}
                        className={`store-task-btn bg-green-600 rounded-full border-2 shadow-2xl border-white p-1 text-white 
                            ${isStoring ? 'animate-pulse' : 'hover:bg-green-700'}`}
                    />
                )}
                <DeleteIcon
                    style={{ fontSize: 30, cursor: 'pointer' }}
                    size="large"
                    onClick={handleRemove}
                    className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1 text-white"
                />
            </div>
        </div>
    );
}

Task.propTypes = {
    task: PropTypes.shape({
        completed: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        createdAt: PropTypes.string,
    }).isRequired,
    id: PropTypes.string.isRequired,
    userToken: PropTypes.string.isRequired,
};

export default Task;