
import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Sidenav from '../Components/SideNav';
import sharedContext from '../context/SharedContext';
import { useContext } from "react";

import { Drawer, List, ListItem, ListItemText, IconButton, Button } from '@mui/material';
// const roles = {
   
//     'SUPERADMIN': ['Dashboard', 'Approvals', 'Receipts', 'Payroll'],
//     'MANAGER': ['Dashboard', 'Receipts'],
//     'SALES': ['Dashboard', 'OnBoard Form'],
//   };
import roles from '../data/roles'
import SideBar from '../Components/SideBar';
function Approvals() {
    const {userRole,token,isSidenavOpen,setUserRole,setToken,setIsSidenavOpen}=useContext(sharedContext);
    const [approvalsList,setApprovalsList]=useState([]);
    // const [isSidenavOpen, setIsSidenavOpen] = useState(false);
    // const userRole = 'superadmin'; // Set the user's role here
    // const [userRole,setUserRole]=useState('superadmin');
    const toggleSidenav = () => {
      setIsSidenavOpen(!isSidenavOpen);
    };
    useEffect(()=>{
        if(token){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch("https://vrcbackend.onrender.com/admin/getUsersList", requestOptions)
          .then(response => response.json())
          .then(result => {
            if(result.status==401 || result.message=='Token Invalid/Expired'){
              handleLogout();
            }
            else{
              console.log(result)
              setApprovalsList(result.data)
  
            }
            
        })
          .catch(error => console.log('error', error));
    }},[token])
    const handleLogout=()=>{
      sessionStorage.clear();
      setToken(null);
    }
    const handleApproveOrReject=(item,status)=>{
      var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${token}`);

var raw = JSON.stringify({
  "emailId": item.emailId,
  "status": status
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://vrcbackend.onrender.com/admin/validateUser", requestOptions)
  .then(response => response.json())
  .then(result =>{
     console.log(result)

    })
  .catch(error => console.log('error', error));
    }
  return (
    <div className="md:flex h-screen w-screen">
    
   {/* Sidenav (desktop mode) */}
   <div
     className={`hidden md:block md:w-1/5 bg-[#FFFFFF] mt-20`}
   >
     <Sidenav
       role={userRole}
       navigation={roles[userRole]}
       isSidenavOpen={isSidenavOpen}
       toggleSidenav={toggleSidenav}        />

{/* <List>
     {roles[userRole]?.map((item, index) => (
       <ListItem  key={index}>
         <ListItemText primary={item} />
       </ListItem>
     ))}
   </List> */}
   <SideBar/>
   </div>

   {/* Content Container */}
   <div className="md:w-4/5">
     {/* Header */}
     <Header
       toggleSidenav={toggleSidenav}
   
     />

     {/* Main Content */}
     {/* <Main /> */}
     <div class='bg-slate-300 h-full p-4 overflow-scroll mt-20'>
     
      <table className='w-full text-left   border-separate border-spacing-y-2.5'>
        
        <tbody>   {approvalsList?.map((item,index)=>(
     
        <tr key={index} className='bg-white rounded-md'>
         
                <td className='p-4'>{index+1}</td> 
               <td className='p-4'>{item.name}</td> 
               <td className='p-4'>{item.emailId}</td> 
               <td className='p-4'>{item.role_type}</td> 
               <td className='p-4'>{item.status}</td> 

            <div className='flex justify-end'>
              <Button variant='outlined' color='success' onClick={()=>handleApproveOrReject(item,'V')}>Approve</Button>
              <Button color='error' onClick={()=>handleApproveOrReject(item,'R')}>Reject</Button>
              </div>
            
            
                </tr>

       ) )}</tbody>
       </table>
     
     </div>
   </div>

   {/* Mobile Sidenav Toggle Button */}
   {/* <IconButton
     edge="end"
     aria-label="menu"
     onClick={toggleSidenav}
     sx={{
       textAlign: "end",
     }}
     className="inline md:hidden"
   >
     <Menu fontSize="large" />
   </IconButton> */}

 </div>
  )
}

export default Approvals