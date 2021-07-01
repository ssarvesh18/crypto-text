import axios from 'axios';
import {useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {Groups} from './groups';

import 'react-toastify/dist/ReactToastify.css';

const toastSuccess= (data)=>{
    toast.dark(data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
}

const Dashboard = (props)=>{
    
    if(!localStorage.getItem("token"))
        props.history.push("/login");
   
    const [chatroomName,setChatroomName] = useState({name:""});
    
    const logoutUser = ()=>{
        
        localStorage.removeItem("token");

        if(!localStorage.getItem("token"))
            props.history.push("/login");
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post('/chatroom/create',chatroomName,{headers:{
            'Authorization': `Bearer ${localStorage.getItem("token")}` 
          }}).then((response)=>{
            toastSuccess(response.data.message);
            setChatroomName({
                name:""
            });
        }).catch((err)=>{
            toastSuccess(err.response.data.message);
        });
        
    }
    const handleInput = (e)=>{
        const value = e.target.value;
        const name = e.target.name;
        setChatroomName({...chatroomName, [name] :value});
    }
    return (
    <>
        <div className='btn-danger p-3 mx-auto my-2 w-50' onClick={logoutUser}> Log out</div>
        
        <form className="container p-3 my-3 bg-dark text-white w-50"  action="" onSubmit={handleSubmit}>
            <input className="p-1 m-2 w-50" type="text" autoComplete="off" name="name" id="name" placeholder="Enter Chat-room name" onChange={handleInput} value={chatroomName.name}/>
            <button className="btn btn-danger" type="submit"> Create Chatroom </button>
        </form>
        <div className='container p-3 my-3 bg-dark w-50'>
            <Groups history={props.history} className='col'/>
        </div>
        
        <ToastContainer/> 
    </>
    )
}

export { Dashboard };