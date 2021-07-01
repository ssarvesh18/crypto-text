import axios from 'axios';
import {useEffect, useState  } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {Displayusers} from './displayUsers';
import 'react-toastify/dist/ReactToastify.css';
import { NavError } from './navError';

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

const Editgroup = (props)=>{
    if(!localStorage.getItem("token"))
        props.history.push('/login');
    
    
   const [usernames,setUsernames]= useState("");
   const [results,setResults] = useState([]);
    const [ changeddata,setChangeddata] = useState(0);
    useEffect(()=>{
        
        usernames!="" && axios.get("/search/users",{headers:{
            'Authorization':`Bearer ${localStorage.getItem("token")}` 
          },params:{usernames}}).then((response)=>{
            setResults(response.data.result);
            
        }).catch((err)=>{
            err && err.response && err.response.data && err.response.data.message && toastSuccess(err.response.data.message);
        })
        
    },[usernames,changeddata])

    const handleInput = (e)=>{
        if(e.target.value=="")
        {
            setResults([]);
            
        }
        setUsernames(e.target.value);

    }
    const addUserto = ()=>{
        if( props.history && props.history.location && props.location.state && props.location.state.groupdata)
        {
            const group_data =  props.history.location.state.groupdata;  
            const addData  ={
                username : usernames,
                group_id : group_data._id
            }
            axios.post('/chatroom/groups/add',addData, {headers:{
                'Authorization': `Bearer ${localStorage.getItem("token")}` 
            }}).then((response)=>{
                setChangeddata(!changeddata);
                // toastSuccess(response.data.message);
            }).catch((err)=>{
                toastSuccess(err.response.data.message);
            })
        }
    } 

    if( props.history && props.history.location && props.location.state && props.location.state.groupdata)
    {
            return (
        
                <>
                <div className='container mt-3 mx-auto'>
                    <input autoComplete="off" list='search-suggest' type="search" name="username" id="username" className="w-50 m-2 p-2 form-select"  value={usernames} onChange={handleInput}/>
                    <datalist id='search-suggest' className="w-50 m-2">
                            {   
                                results.map((user)=>{
                                return (
                                    <option className="dropdown-item" value={user} key={user} onClick={()=>addUserto(user,props.group._id)}> {user} </option>
                                )
                            })
                            }
                    </datalist>
                    <button className='btn btn-dark ' onClick={addUserto}> add to group</button>
                </div>
                <Displayusers groups_data = {props.history.location.state.groupdata} />
                <ToastContainer/>
                </>
        )
    }else{
        return (
             <NavError />
            )
    }
}

export {Editgroup}