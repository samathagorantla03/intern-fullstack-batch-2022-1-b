import React from 'react'
import {useDispatch} from 'react-redux'
import { RegisterAsync } from '../store/userslice'
import { useNavigate } from 'react-router-dom'
const SignUp=()=>{
    const dispatch = useDispatch()
    const nav = useNavigate()
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(e.target.password.value!=e.target.cnfpassword.value)
        {
            alert("password doesnot match")
        }
        else
        {
            const user={
                username:e.target.username.value,
                email:e.target.email.value,
                phone_no:e.target.phoneno.value,
                password:e.target.password.value,
                role_id:1
            }
            dispatch(RegisterAsync(user))
            nav("/")
        }
    }
    return(<div>
        <h1>SignUp form</h1>
        <form onSubmit={handleSubmit}>
            Username:<input type="text" name="username" required /><br/>
            Email: <input type="email" name="email" required /> <br />
            PhoneNumber: <input type="text" name="phoneno" required  /> <br />
            password: <input type="password" name="password" required /> <br />
            Confirm Password: <input type="password" name="cnfpassword" required /> <br />
            <button className='btn btn-primary'>SignUp</button>
        </form>
    </div>)
}

export default SignUp