import axios from "axios";
import { useEffect,useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";

const toastSuccess= (data)=>{
    toast.dark(data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
}
const Displayusers = (props)=>{
    let history = useHistory();
    const [groups_data,setgroups_data] = useState(props.groups_data);
    const [changeddata,setChangeddata] = useState(0);
    const [currentUser,setCurrentuser] = useState();
  if(!groups_data._id == null)
    {
        history.push('/dashboard');
    }
    const group_id = groups_data._id;
    
    useEffect(()=>{
        axios.get('/dashboard/message/authorize',{headers:{
            'Authorization': `Bearer ${localStorage.getItem("token")}` 
          }}).then((response)=>{
            setCurrentuser(response.data.user.username);
        }).catch((err)=>{
            console.log(err.response.data.message);
        });
        axios.get(`/dashboard/groups/details/${group_id}`,{headers:{
            'Authorization':`Bearer ${localStorage.getItem("token")}` 
          }}).then((response)=>{
            
            setgroups_data(response.data.details);
        }).catch((err)=>{
            err && err.response && err.response.data && err.response.data.message && toastSuccess(err.response.data.message);
            console.log(err);
        })
    },[changeddata])
    
    let people = groups_data.users;
    let admins = groups_data.admins;
    let isadmin = false;
    isadmin = admins.includes(currentUser);
    admins = people.filter(value => admins.includes(value));
    people = people.filter(value=> !admins.includes(value));
    const removefromGroup=(data)=>{
        const username = data;
     
        if(isadmin || username==currentUser){

        axios.post('/chatroom/groups/remove',{username,group_id},{headers:{
            'Authorization': `Bearer ${localStorage.getItem("token")}` 
          }}).then((response)=>{
            setChangeddata(!changeddata);
            history.push('/dashboard');
        }).catch((err)=>{
            toastSuccess(err.response.data.message);
        });
    }else
     {
        toastSuccess('Only admins can remove.');
     }  
    }
    const makeAdmin=(data)=>{
        const username = data;
        if(isadmin){

        axios.post('/chatroom/groups/makeadmin',{username,group_id},{headers:{
            'Authorization': `Bearer ${localStorage.getItem("token")}` 
          }}).then((response)=>{
            setChangeddata(!changeddata);
        }).catch((err)=>{
            toastSuccess(err.response.data.message);
        });
    }else{
        toastSuccess('Only admins can give admin access.');
    }
      
    }
    const removeAdmin=(data)=>{
        const username = data;
        if(isadmin)
        {
        axios.post('/chatroom/groups/removeadmin',{username,group_id},{headers:{
            'Authorization': `Bearer ${localStorage.getItem("token")}` 
          }}).then((response)=>{
            setChangeddata(!changeddata);
        }).catch((err)=>{
            toastSuccess(err.response.data.message);
        });
    }else{
        toastSuccess('Only admins can remove admin access.');
    }
        
    }
    return (
            <>
            <div className='container w-50'>

                <ul className='list-group mt-3' >
                <div className='list-group-item bg-dark text-light text-center'>Admins</div>
               
                {
                    admins.map((data)=>{ 
                        return (
                            <div className='list-group-item ' key={data}>
                                <div> {data}</div> 
                                <button className="m-3 btn btn-sm btn-dark" onClick={()=>removeAdmin(data)}> Remove Admin </button>
                                <button className="m-3 btn btn-sm btn-dark" onClick={()=>removefromGroup(data)}> Remove </button>
                            </div>
                        )
                })
                }
                </ul>

                <ul className='list-group mt-3'>
                <div className='list-group-item bg-dark text-light text-center '>Users</div>
                    {
                        people.map((data)=>{ 
                            return (
                                <div className='list-group-item ' key={data}>
                                    <div> {data}</div> 
                                    <button className="m-3 btn btn-sm btn-dark" onClick={()=>removefromGroup(data)}> Remove </button>
                                    <button className="m-3 btn btn-sm btn-dark" onClick={()=>makeAdmin(data)}> Make Admin </button>
                                </div>
                            )
                        })
                    }
                </ul>

            </div>
            </>
    )
}

export {Displayusers}