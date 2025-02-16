import './App.css';
// eslint-disable-next-line no-unused-vars
import { useEffect, useReducer } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Active from './components/Active';
import Completed from './components/Completed';
import AllTask from './components/AllTask';
import Layout from './components/Layout';
import TaskContext from './context/TaskContext';
import TokenContext from './context/TokenContext';
import { Web3Provider } from './context/Web3Context';
import taskReducer from './reducer/taskReducer';
import tokenReducer from './reducer/tokenReducer';
import userReducer from './reducer/userReducer';
import Header from './components/Header/Header';
import Login from './components/Login';
import Register from './components/Register';
// eslint-disable-next-line no-unused-vars
import axios from './Axios/axios.jsx';

function App() {
  const token = JSON.parse(localStorage.getItem("authToken"));
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [userToken, tokenDispatch] = useReducer(tokenReducer, token);
  const [user, userDispatch] = useReducer(userReducer, {});

  // ... rest of your existing useEffect hooks ...

  return (
    <BrowserRouter>
      <TokenContext.Provider value={{ userToken, tokenDispatch, user, userDispatch }}>
        <Web3Provider>
          <TaskContext.Provider value={{ tasks, dispatch }}>
            <Routes>
              <Route path="/" element={<Header />}>
                <Route path='/' element={token ? <Layout /> : <Login />}>
                  <Route index element={<AllTask />} />
                  <Route path="active" element={<Active />} />
                  <Route path="completed" element={<Completed />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
            </Routes>
          </TaskContext.Provider>
        </Web3Provider>
      </TokenContext.Provider>
    </BrowserRouter>
  );
}

export default App;