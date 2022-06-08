import React from 'react'
import {useDispatch} from 'react-redux'
import { RegisterAsync } from '../store/userslice'
import { useNavigate } from 'react-router-dom'
const AddDriver=()=>{
    const dispatch = useDispatch()
    const nav = useNavigate()
    const handleSubmit = (e)=>{
        e.preventDefault();
        const user={
                username:e.target.username.value,
                email:e.target.email.value,
                phone_no:e.target.phoneno.value,
                password:e.target.password.value,
                role_id:3
            }
            dispatch(RegisterAsync(user))
            nav("/")
    }
    return(<div>
        <h1>Add Driver</h1>
        <form onSubmit={handleSubmit}>
            Name:<input type="text" name="username" required  /><br/>
            Email: <input type="email" name="email" required /> <br />
            PhoneNumber: <input type="text" name="phoneno" required  /> <br />
            Password: <input type="password" name="password" required /> <br />
            <button className='btn btn-primary'>Add</button>
        </form>
    </div>)
}

export default AddDriver