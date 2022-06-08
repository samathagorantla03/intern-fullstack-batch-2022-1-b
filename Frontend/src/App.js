import logo from './logo.svg';
import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Logout } from './store/userslice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const l = 'https://i.pinimg.com/originals/62/41/2e/62412e81bd5b3971a2b43ece97f6a24a.jpg'
  const a = 'https://i.pinimg.com/474x/8e/5f/a6/8e5fa6f223b0329493d4b218c0e6c3f9.jpg'
  const user = useSelector((state)=>{
    return state.user.user
  })
  return (
    <div className="App">
      <div>
            <div className='navbar navbar-expand-lg  navbar-dark bg-dark sticky-top'>
                &nbsp;&nbsp;
                <Link to='/' className='navbar-brand'>
                    <img src={a} alt='logo' width='30' height='30' /> &nbsp;
                    <span className='d-none d-sm-inline-block' style={{color:'#F9CEEE'}}>Shoppe</span>
                </Link>
                <div className='collapse navbar-collapse'>
                    <ul className='navbar-nav  mr-auto mt-2 mt-lg-0'>
                        {/* <li className='nav-item active'>
                            <Link to='/home' className='nav-link'>
                                Home
                            </Link>
                        </li> */}
                    </ul>
                </div>
                <div className='navbar-nav ml-auto p-2'>
                    {user.isLogged? (
                        user.isAdmin ? (
                            <>
                                {/* <li className='nav-item'>
                                    <Link to='/admin' className='nav-link'>
                                        Admin
                                    </Link> 
                                </li> */}
                                <li className='nav-item'>
                                    <Link to="/addCategory" className='nav-link' style={{color:'#FAD4D4'}}>Add Category</Link> 
                                </li>
                                <li className='nav-item'>
                                    <Link to="/addProduct" className='nav-link' style={{color:'#FAD4D4'}}>Add Product</Link> 
                                </li>
                                <li className='nav-item'>
                                    <Link to="/addDriver" className='nav-link' style={{color:'#FAD4D4'}}>Add Driver</Link>
                                </li>                              
                            </>
                        ) : (
                            <>
                                {/* <li className='nav-item'>
                                    <Link to='/profile' className='nav-link'>
                                        Profile
                                    </Link>
                                </li> */}
                            </>
                        )
                    ) : (
                        <></>
                    )}
                    {user.isLogged? (
                        <>
                            {user.isAdmin ? (
                                <>
                                    {/* <li className='nav-item'>
                                        <Link
                                            to='/receivedorders'
                                            className='nav-link'>
                                            Received Orders
                                        </Link>
                                    </li> */}
                                </>
                            ) : (
                                  <></>
                                // <li className='nav-item'>
                                //     <Link to='/cart' className='nav-link'>
                                //         Cart
                                //     </Link>
                                // </li>
                            )}
                            <li className='nav-item'>
                                <button
                                    className='btn btn-danger'
                                    onClick={() => {
                                        dispatch(Logout());
                                        navigate('/login');
                                    }}>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='nav-item'>
                                <Link to='/login' className='nav-link'>
                                    Login
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/register' className='nav-link'>
                                    Register
                                </Link>
                            </li>
                        </>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
