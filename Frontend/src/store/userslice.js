import {createSlice} from '@reduxjs/toolkit'

const nullUser = {
    id: null,
    username: null,
    email: null,
    isAdmin: false,
    isLogged: false,
};

const initialState ={
    user:{
        id:null,
        username:null,
        email:null,
        isAdmin:false,
        isLogged:false
    },
    token:null
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
        },
        setToken:(state,action)=>{
            state.token = action.payload
        }
    }
})

export const RegisterAsync = (user) => {
    return async (dispatch) => {
        const response = await fetch(' http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        const res = await response.json()
        if(res.success)
        {
            alert(res.message)
        }
    };
};

export const SetPassAsync = (details)=>{
    return async (dispatch) => {
        const response = await fetch(' http://localhost:8080/forgetpassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(details),
        });
        const res = await response.json()
        if(res)
        {
            alert(res.message)
        }
    };
}

export const LoginAsync = (user)=>{
    return async (dispatch) =>{
        const response = await fetch('http://localhost:8080/authenticate',{
            method:'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(user)
        });
        const res = await response.json();
        if(res.success){
            //console.log(res.loggeduser,'loggeduser')
            dispatch(setUser({
                id:res.loggeduser.id,
                username:res.loggeduser.username,
                email:res.loggeduser.email,
                isAdmin:res.loggeduser.role_id === 2,
                isLogged:true
            }))
            dispatch(setToken(res.token))
            localStorage.setItem('token',res.token);
            localStorage.setItem('user',JSON.stringify(res.loggeduser));
        }
        else{
            alert(res.message)
        }
    }
}

export const CheckAuthAsync = ()=>{
    const token = localStorage.getItem('token');
    return async (dispatch)=>{
        if (token) {
            const response = await fetch('http://localhost:8080/checkauth', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const user = await response.json();
                dispatch(
                    setUser({
                        id: user.data.id,
                        username: user.data.username,
                        email: user.data.email,
                        isAdmin: user.data.role_id === 2,
                        isLogged: true,
                    })
                );
            } else {
                localStorage.removeItem('token');
                setUser(nullUser);
            }
        } else {
            setUser(nullUser);
        }
    }
}

export const Logout = () => (dispatch) => {
    dispatch(setUser(nullUser));
    dispatch(setToken(null));
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const {setUser,setToken} = userSlice.actions;
export default userSlice.reducer;