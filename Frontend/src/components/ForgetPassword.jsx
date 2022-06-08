import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { SetPassAsync } from '../store/userslice'

const ForgetPassword =()=>{
    const dispatch = useDispatch()
    const nav = useNavigate()
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(e.target.password.value!=e.target.cnfpassword.value)
        {
            alert('password and Confirm password should be same');
        }
        else{
            var requser={
                email:e.target.email.value,
                password:e.target.password.value
            }
            dispatch(SetPassAsync(requser));
        }
    }
    return(<div>
        <h1>Forget Password</h1>
        <form onSubmit={handleSubmit}>
            Email: <input type="email" name="email" /> <br />
            Password: <input type="password" name="password" /> <br />
            Confirm Password: <input type="password" name='cnfpassword' /> <br />
            <button>Update Password</button>
        </form>
    </div>)
}

export default ForgetPassword