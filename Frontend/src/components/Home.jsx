import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CheckAuthAsync, logout } from "../store/userslice";
import { Logout } from "../store/userslice";
import { getCategories,getProducts } from "../store/productslice";
const Home=()=>{
    const dispatch = useDispatch()
    const nav = useNavigate()
    const user = useSelector((state)=>{
        return state.user.user
    })
    const categories = useSelector((state)=>{
        return state.products.categories
    })
    const products = useSelector((state)=>{
        return state.products.products
    })
    useEffect(() => {
        dispatch(CheckAuthAsync());
        if (!user.isLogged) {
            nav('/login');
        }
        dispatch(getCategories())
    }, [dispatch]);
    return(
        <div>
            {/* <h1>Home Page</h1> <br />
            <button onClick={()=>{
                dispatch(Logout())}}>Logout</button> <br />
            {
                user.isAdmin?(
                    <>
                    <Link to="/addCategory">Add Category</Link> <br />
                    <Link to="/addProduct">Add Product</Link> <br />
                    <Link to="/addDriver">Add Driver</Link> <br />
                    </>
                ):(
                    <></>
                )
            } */}
            {/* <button onClick={()=>{
                
                }}>GetCategories</button> */}
            {/* <button onClick={()=>{
                dispatch(getProducts())
                }}>GetProducts</button> */}
            <div>
                <h1>Categories</h1>
                <div className='container mt-5'>
                    <div className='card-deck'>
                        <div className='card-group'>
                            { categories && categories.map((category, index) => (
                                <div
                                    className='card p-2 w-25 ml-2 mt-3 mb-3'
                                    key={index}>
                                    <img
                                        className='card-img-top'
                                        src='data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1813cff57e1%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1813cff57e1%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.1953125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
                                        alt='Card cap'></img>
                                    <div className='card-body'>
                                        <h5 className='card-title'>
                                            {category.category_name}
                                        </h5>
                                        <p className='card-text'>
                                            {category.description}
                                        </p>
                                       <div className='card-footer bg-white'>
                                       <Link to={`/products/${category.id}/${category.category_name}`}>
                                            <button className='btn btn-primary'>
                                                View Products
                                            </button>
                                        </Link>
                                       </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div>
                <h1>Products</h1>
                {
                    products && products.map((p)=>{
                        return <li>{p.name}</li>
                    })
                }
            </div> */}
        </div>
    )
}

export default Home