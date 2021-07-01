import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/backgroundcolor.css';

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

const Login = (props)=>{

 
    const [userLogin,setUserLogin] = useState({
        username:"",
        password:""
    })
    const handleSubmit = (e)=>{
        
        e.preventDefault();
        axios.post('/login',userLogin).then((response)=>{
            
            if(response.data.token)
            {
                toastSuccess(response.data.message);
                setUserLogin({
                    username:"",
                    password:""
                })
                localStorage.setItem("token",response.data.token);
                props.history.push("/dashboard");
            }
            else
                toastSuccess("user not logged in");
            
        }).catch((err)=>{
            toastSuccess(err.response.data.message);
        });
        
    }
    const handleInput = (e)=>{
        const value = e.target.value;
        const name = e.target.name;
        setUserLogin({...userLogin , [name] :value});
    }
    return (
    <>
        <form className="container p-3 my-5 mx-auto bg-dark text-white w-50"  action="" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username" className="m-3">Username: </label>
                <input type="text" name="username" id="username" onChange={handleInput} value={userLogin.username}/>
            </div>  
            <div className="form-group">
                <label htmlFor="password" className="m-3">Password: </label>
                <input type="password" name="password" id="password" onChange={handleInput} value={userLogin.password}/>
            </div>  
                <button className="btn btn-danger" type="submit"> Login </button>
        </form>
        <ToastContainer/> 
    </>
    )
}

export { Login };