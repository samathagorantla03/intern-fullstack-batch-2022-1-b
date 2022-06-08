import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import Login from './components/Login';
import { store } from './store';
import { BrowserRouter,Link,Routes,Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Home from './components/Home';
import AddCategory from './components/AddCategory';
import AddProduct from './components/AddProduct';
import AddDriver from './components/AddDriver';
import ForgetPassword from './components/ForgetPassword';
import Products from './components/Products';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App/>
        <Routes>
          <Route path="/products/:id" element={<Products/>} />
          <Route path="/fp" element={<ForgetPassword/>} />
          <Route path="/addDriver" element={<AddDriver/>} />
          <Route path="/addProduct" element={<AddProduct/>} />
          <Route path="/addCategory" element={<AddCategory/>} />
          <Route path="/register" element={<SignUp/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<Home/>} />
          <Route path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
