import React from 'react'
import SiderBarAdmin from './common/SiderBarAdmin'
import HeaderAdmin from './common/HeaderAdmin'
import { Outlet } from 'react-router-dom'

const LayoutAdmin = () => {
  return (
  
<div className="grid grid-cols-5 grid-rows-5 gap-0  bg-[#111827]">  
    {/* Sidebar */}  
    <div className="row-span-5 col-span-1"><SiderBarAdmin /></div>  
    {/* Header */}  
    <div className="col-span-4 row-span-1 h-[100px] border-t-0"><HeaderAdmin /></div>  
    
    <div className="col-span-4 row-span-4 "> <Outlet/> 
      
    </div>  
</div>
    
  )
}

export default LayoutAdmin