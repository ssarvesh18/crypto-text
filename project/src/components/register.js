import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
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


const Register =(props)=>{

    
    const [userRegistration,setUserRegistration] = useState({

        name:"",
        username:"",
        email:"",
        password:""
    })
    const handleSubmit = (e)=>{
        
       
        e.preventDefault();
        console.log(userRegistration);
        axios.post('/register',userRegistration).then((response)=>{
            toastSuccess(response.data.message);
            props.history.push("/login");
            setUserRegistration({

                name:"",
                username:"",
                email:"",
                password:""
            })
            
        }).catch((err)=>{
            toastSuccess(err.response.data.message);
        });
        
    }
    const handleInput = (e)=>{
        const value = e.target.value;
        const name = e.target.name;
        setUserRegistration({...userRegistration , [name] :value});
    }
    return (
    <>
        <form className="container p-3 my-4 mx-auto bg-dark text-white w-50"  action="" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name" className="m-3">Name: </label>
                <input type="text" name="name" id="name" onChange={handleInput} value={userRegistration.name}/>
            </div>  
            <div className="form-group">
                <label htmlFor="username" className="m-3">Username: </label>
                <input type="text" name="username" id="username" onChange={handleInput} value={userRegistration.username}/>
            </div>  
            <div className="form-group">
                <label htmlFor="email" className="m-3">Email: </label>
                <input type="text" name="email" id="email" onChange={handleInput} value={userRegistration.email}/>
            </div>  
            <div className="form-group">
                <label htmlFor="password" className="m-3">Password: </label>
                <input type="password" name="password" id="password" onChange={handleInput} value={userRegistration.password}/>
            </div>  
                <button className="btn btn-danger my-auto" type="submit"> Register </button>
        </form>
        <ToastContainer />
    </>
    )
}

export { Register };