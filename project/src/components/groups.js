import axios from 'axios';
import { useState , useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {Groupview} from './groupview';


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

const Groups = (props)=>{
    
    if(!localStorage.getItem("token"))
        props.history.push("/login");

    const [groupdata,setGroupdata] = useState(null);
    useEffect(()=>{
        axios.get("/dashboard/groups",{headers:{
            'Authorization': `Bearer ${localStorage.getItem("token")}` 
          }}).then((response)=>{
            setGroupdata(response.data.groups);
            const empty_groups = groupdata.filter((obj)=>{
                return obj.users.length == 0;
            })
            const display_groups = groupdata.filter((obj)=>{
                return obj.users.length!=0;
            })
            setGroupdata(display_groups);
        }).catch((err)=>{
            err && err.response && err.response.data && err.response.data.message && toastSuccess(err.response.data.message);
        })
       
    },[])
    return (
        <div className=' container bg-dark pt-3 y-3 '> 
            <div className=' pt-3 y-3 p-3 text-light s18 text-center font-weight-bold h2'>Groups</div>
           {groupdata && <Groupview history={props.history}  GroupData={groupdata} />}
            <ToastContainer/>
        </div>
    )
}

export {Groups} ;
