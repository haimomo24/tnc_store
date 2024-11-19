import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './component/user/Layout'
import HomePage from './component/user/HomePage'
import Login from './component/user/auth/Login'
import DashBoard from './component/admin/DashBoard'
import LayoutAdmin from './component/admin/Layout'
import ProductAdmin from './component/admin/ProductAdmin'
import UsserAdmin from './component/admin/UsserAdmin'
import AddProduct from './component/admin/AddProduct'
import EditProduct from './component/admin/EditProduct'
import Register from './component/user/auth/Register'
import ProductDetail from './component/user/ProductDetail'
import Products from './component/user/Products'
import CardShoping from './component/user/CardShoping'
import Pay from './component/user/Pay'
import OderAdmin from './component/admin/OderAdmin'
import EditUser from './component/admin/common/EditUser'
import EditProfile from './component/user/auth/EditProfile'

const App = () => {
  return (
 <BrowserRouter>

    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/product' element={<Products/>}/>
        <Route path='/product/:id' element={<ProductDetail/>}/>
        <Route path='/cartshoping' element={<CardShoping/>}/>
        <Route path='/pay' element={<Pay/>}/>
        <Route path='/editprofile' element={<EditProfile/>}/>
        
      
      </Route>

      <Route path='/dashboard' element={<LayoutAdmin/>}>
        <Route index element={<DashBoard/>}/>
        <Route path='/dashboard/productadmin' element={<ProductAdmin/>}/>
        <Route path='/dashboard/useradmin' element={<UsserAdmin/>}/>
        <Route path='/dashboard/addproduct' element={<AddProduct/>}/>
        <Route path="/dashboard/productadmin/editproduct/:id" element={<EditProduct />} />
        <Route path='/dashboard/oderadmin' element={<OderAdmin/>}/>
        <Route path='/dashboard/edituser/:id' element={<EditUser/>}/>
        
        </Route>
      
    </Routes>
       
 
 </BrowserRouter>
  )
}

export default App