import { useContext } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import TokenContext from '../../context/TokenContext.jsx';
import { useWeb3 } from '../../context/Web3Context';
import "./header.css"

function Header() {
    const token = localStorage.getItem("authToken");
    const { user } = useContext(TokenContext);
    const { connected, connectWallet, account } = useWeb3();

    const logout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
    }

    return (
        <div>
            <nav className='header bg-slate-200 flex justify-between items-center'>
                <div className="logo w-1/4 text-center">
                    <NavLink to="/">Todo App</NavLink>
                </div>
                <div className='flex justify-between items-center'>
                    {token ? (
                        <div className='flex items-center justify-center'>
                            <p className='mr-5'>welcome, <span className='text-xl text-blue-800 capitalize'>{user.name}</span></p>
                            {!connected ? (
                                <button 
                                    onClick={connectWallet}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md mr-4 hover:bg-blue-700 transition-colors"
                                >
                                    Connect Wallet
                                </button>
                            ) : (
                                <div className="flex items-center mr-4">
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm">
                                        {account?.slice(0, 6)}...{account?.slice(-4)}
                                    </span>
                                </div>
                            )}
                            <button onClick={logout} className="logout mr-4">Logout</button>
                        </div>
                    ) : (
                        <ul className='flex justify-end gap-3 w-3/4 pr-6'>
                            <li>
                                <NavLink to="/login">Login</NavLink>
                            </li>
                            <li>
                                <NavLink to="/register">Register</NavLink>
                            </li>
                        </ul>
                    )}
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default Header;