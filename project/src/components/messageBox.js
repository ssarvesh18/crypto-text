import { useEffect,useState, useRef} from 'react';
import axios from 'axios';
import  { join, leave, sendChat,chat } from './socketConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavError } from './navError';
const CryptoJS = require("crypto-js");

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
const toastMessage = (data)=>{
    toast.info(data, {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
}
const MessageBox = (props)=>{
    
    
    let Groupdata ;
    if(props.history && props.history.location && props.location.state && props.location.state.groupdata)
        Groupdata =  props.history.location.state.groupdata;
    const [inputFields,setInputFields] = useState({message:"",key:""}); 
    const [messageUpdate,setMessageupdate] = useState(0);
    const message = useRef(null); 
    const key = useRef(null);
    const chatItems = useRef(null);
    const [chats,setChats]=useState([]);
    const [user,setUser] = useState({});
    const [decryptInput,setDecryptInput] = useState([]);
    useEffect(()=>{
    if(props.history && props.history.location && props.location.state && props.location.state.groupdata)
     {
            axios.get('/dashboard/message/authorize',{headers:{
            'Authorization': `Bearer ${localStorage.getItem("token")}` 
          }}).then((response)=>{
            setUser(response.data.user);
        }).catch((err)=>{
            console.log(err.response.data.message);
        });
        axios.get(`/dashboard/group/messages/${Groupdata._id}`,{headers:{
            'Authorization':`Bearer ${localStorage.getItem("token")}` 
          }}).then((response)=>{
            
            setChats(response.data.messages);
        }).catch((err)=>{
            err && err.response && err.response.data && err.response.data.message && toastSuccess(err.response.data.message);
            console.log(err);
        })
        join(Groupdata);
        
        return ()=>{
        leave(Groupdata);
        
        }
    }
    },[messageUpdate])
    chat((err, data) => {
        if(err) return;
        setMessageupdate(messageUpdate+1);
       console.log(data);
      });
   const handleDecryptInput = (e)=>{
       const value= e.target.value;
       const name = e.target.name;
       setDecryptInput({...decryptInput,[name]:value});
       
   }
   const messageDelete=(e,data)=>{
       if(data.username === user.username){
        axios.post('/chatroom/groups/deletemessage',{msg_id: data._id}, {headers:{
                'Authorization': `Bearer ${localStorage.getItem("token")}` 
            }}).then((response)=>{
                setMessageupdate(messageUpdate+1);
            }).catch((err)=>{
                toastSuccess(err.response.data.message);
            })
       }else{
            toastSuccess('only sender can delete message!');
        }
   }
   const handleDecryptSubmit=(e,data)=>{
       const current_message = e.target.name;
        if(decryptInput[current_message]===data.message_key)
        {   
            try{
            const bytes  = CryptoJS.AES.decrypt(data.message_body,data.message_key);
            const originalText = bytes.toString(CryptoJS.enc.Utf8);
            // setDecryptInput({current_message:""});
            toastMessage(originalText);
            }catch(err){
                toastSuccess(err.message);
            }
        }
        else
            toastSuccess('Wrong Key!');
   }
    const handleInput = (e)=>{
        const value = e.target.value;
        const name = e.target.name;
        setInputFields({...inputFields, [name] :value});
       
    }
    const handleSubmit =()=>{
        if(inputFields.message.length!=0 && inputFields.key!=0)
        {
            const encrypted = CryptoJS.AES.encrypt(inputFields.message,inputFields.key).toString();
            const encrypted_key = inputFields.key;
            const encrypted_data = {
                message : encrypted,
                key:encrypted_key
            }
            sendChat(Groupdata,user,encrypted_data);
            setInputFields({message:"",key:""});
            message.current.value='';
            key.current.value='';
            setMessageupdate(1+messageUpdate);
        }
       else{
        toastSuccess('message or key cannot be empty');
       }
    }
    if( props.history && props.history.location && props.location.state && props.location.state.groupdata)
    {
    return(
        <div className="container  bg-dark p-3 my-3 vertical-cente w-75">
            <div className=' s18 text-light text-center h4 p-2'>{Groupdata.group_name}</div>
            <ul className="list-group scrollable p-3" ref={chatItems}>
                
                    {
                    chats && chats.map((data)=>{
                            
                            return (
                                <li className='list-group-item m-1' key={data._id}>

                                    <div className=" btn p-2 float-right" onClick={(e)=>messageDelete(e,data)}> ❌ </div>
                                    <br/>
                                    <div key={data._id} className='text-break'>{data.username}  📧 : {data.message_body} </div>
                                    <br/>
                                    <div className="float-right h6">🕙 {data.sent_at}</div>
                                    <input className='m-3' type="password" autoComplete="off" id={data._id}  name={data._id} onChange={handleDecryptInput} />
                                    <button className="btn btn-dark" id='decrypt-button' onClick={(e)=>handleDecryptSubmit(e,data)} name={data._id}> Decrypt</button>
                                </li>
                                    )
                        })
                    }
                </ul>
                
                <input className='m-3 ' type="text" autoComplete="off" name="message" id="message" onChange={handleInput} value={inputFields.message} ref={message}/>
                <input className='m-3' type="text" autoComplete="off" name="key" id="key" onChange={handleInput} value={inputFields.key} ref={key}/>
                <button className="btn btn-danger" id='send-button' onClick={()=>handleSubmit()}> send</button>
                <ToastContainer className="text-break"/>
        </div>
    )
    }else{
        return (<NavError/>)
    }
}

export {MessageBox};