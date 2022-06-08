import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductAddAsync } from "../store/productslice";
import { getCategories } from "../store/productslice";

const AddProduct = ()=>{
    const dispatch = useDispatch();
    const handleSubmit = (e)=>{
        e.preventDefault()
        var product={
            name:e.target.name.value,
            price:e.target.price.value,
            description:e.target.description.value,
            category_id:e.target.category.value,
            disable:false
        }
        dispatch(ProductAddAsync(product))
    }

    const categories=useSelector((state)=>{
        return state.products.categories
    })

    useEffect(()=>{
        dispatch(getCategories())
    },[dispatch])
    return(
        <div>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit} >
                Name: <input type="text" name="name" required /> <br />
                Price: <input type="text" name="price" required /> <br />
                Description: <input type="text" name="description" required /> <br />
                Category: <select name="category">
                {
                    categories && categories.map((c)=>{
                        return <option value={c.id} >{c.category_name}</option>
                    })
                }
                </select>
                <br />
                <button className='btn btn-primary'>Add Product</button>
            </form>
        </div>
    )
}

export default AddProduct