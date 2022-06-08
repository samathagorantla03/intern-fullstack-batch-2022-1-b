import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    category_name:null,
    categories:[],
    products:[],
    prodsbycat:[]
}

export const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{
        setCategory:(state,action)=>{
            state.category_name=action.payload
        },
        setProducts:(state,action)=>{
            state.products = action.payload
        },
        setCategories:(state,action)=>{
            state.categories = action.payload
        },
        setProdsByCat:(state,action)=>{
            state.prodsbycat = action.payload
        },
    }
})

export const getCategories = () =>{
    return async (dispatch)=>{
        const response = await fetch('http://localhost:8080/getCategories',{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const res = await response.json()
        if(res.success){
            dispatch(setCategories(res.categories))
        }
    }
}

export const getProducts = () =>{
    return async (dispatch)=>{
        const response = await fetch('http://localhost:8080/getProducts',{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const res = await response.json()
        if(res.success){
            dispatch(setProducts(res.products))
        }
    }
}

export const getProductsByCat = (id) =>{
    return async (dispatch)=>{
        const response = await fetch(`http://localhost:8080/getProducts/${id}`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const res = await response.json()
        if(res.success){
            dispatch(setProdsByCat(res.products))
        }
    }
}


export const CategoryAddAsync = (category_name) => {
    return async (dispatch) => {
        const response = await fetch(`http://localhost:8080/addCategory/${category_name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const res = await response.json()
        if(res.success)
        {
            alert(res.message)
        }
    };
};

export const disableProductAsync = (id,value) =>{
    return async (dispatch) => {
        const response = await fetch(`http://localhost:8080/disableProduct/${id}/${value}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const res = await response.json()
        if(res.success)
        {
            alert(res.message)
            dispatch(getProductsByCat(res.product.category_id))
        }
        else{
            alert(res.message)
        }
    };
}

export const ProductAddAsync = (product) => {
    return async (dispatch) => {
        const response = await fetch(`http://localhost:8080/addProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(product)
        });
        const res = await response.json()
        if(res.success)
        {
            alert(res.message)
        }
    };
};

export const AddProdToCart = (product) => {
    return async (dispatch) => {
        const response = await fetch(`http://localhost:8080/addProdToCart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(product)
        });
        const res = await response.json()
        if(res.success)
        {
            alert(res.message)
        }
    };
}

export const {setCategory,setProducts,setCategories,setProdsByCat} = productSlice.actions;
export default productSlice.reducer;