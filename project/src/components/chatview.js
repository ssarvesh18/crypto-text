
const Chatview = (props)=>{
    const Chatdata = props.ChatData;
    return (
        <div >
        {Chatdata.map((chat)=>{
            return (
                <div className='' key={chat._id}>
                </div>
            )
           
       })}
        </div>
    )
}

export {
    Chatview
}