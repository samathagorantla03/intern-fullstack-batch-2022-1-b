import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { LoginAsync } from '../store/userslice'

const Login =()=>{
    const dispatch = useDispatch()
    const nav = useNavigate()
    const user = useSelector((state)=>{
        return state.user.user
    })
    useEffect(()=>{
        if (user.isLogged) {
            nav('/');
        }
    },[user,nav])
    const handleSubmit = (e)=>{
        e.preventDefault();
        var requser={
            email:e.target.email.value,
            password:e.target.password.value
        }
        dispatch(LoginAsync(requser));
    }
    return(<div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="form-group">
            Email: <input type="email" name="email" required /> <br />
            Password: <input type="password" name="password" required /> <br />
            <button className='btn btn-primary'>Login</button>
        </form>
        Not a Registered User?<Link to="/register">Register</Link> <br />
        <Link to="/fp">ForgotPassword</Link>
    </div>)
}

export default Login