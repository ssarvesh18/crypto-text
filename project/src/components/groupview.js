import axios from "axios";
import { useEffect,useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import {NavError} from './navError';
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

const Groupview = (props)=>{
    
    
    const [Groupdata,setGroupdata] = useState(props.GroupData);
  
    useEffect(()=>{
        
        axios.get("/dashboard/groups",{headers:{
            'Authorization':`Bearer ${localStorage.getItem("token")}` 
          }}).then((response)=>{
            setGroupdata(response.data.groups);
            
        }).catch((err)=>{
           console.log(err);
        })
    },[])
    const openGroup = (data)=>{
        props.history.push({
            pathname:'/group/edit',
            state : { groupdata : data }
          });
    }
    const openMessage = (data)=>{
        props.history.push({
            pathname:'/group/message',
            state : { groupdata : data }
          });
    }
    return (
        <div className='list-group scrollable '>
        {Groupdata.map((Group)=>{
            return (
                <div className='list-group-item bg-light p-3 m-3' key={Group._id} id={Group._id}>
                    <div className='text-dark text-center font-weight-bold h4'>{Group.group_name}</div> 
                    <button type='button' className='btn btn-block btn-dark' onClick={()=>openGroup(Group)}>Edit Group </button> 
                    <button type='button' className='btn btn-block btn-dark' onClick={()=>openMessage(Group)}>Send Message</button> 
                </div>
            )
           
       })}
        </div>
    )
}

export {
    Groupview
}