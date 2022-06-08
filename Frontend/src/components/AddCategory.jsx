import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CategoryAddAsync } from "../store/productslice";

const AddCategory = ()=>{
    const dispatch = useDispatch();
    const [category,setcategory] = useState('')
    const handleSubmit = ()=>{
        console.log(category)
        dispatch(CategoryAddAsync(category))
    }
    return(
        <div>
            <h1>Add Category</h1>
            <input type="text" name="category_name" value={category} onChange={(e)=>{setcategory(e.target.value)}} />
            <button className='btn btn-primary' onClick={handleSubmit}>Add Category</button>
        </div>
    )
}

export default AddCategory