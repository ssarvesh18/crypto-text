import { Link } from "react-router-dom";

const Homepage = ()=>{

    return (
        <div className="card m-5 w-50 mx-auto">
        <ul className='list-group m-5'>
            <div className="s18 text-light h3 m-2 p-3"> 💻 crypto-text... <br/> <br/> A secure way to communicate </div>
            <Link to='/login' className="list-group-item btn-primary bg-dark m-2"> Login </Link>
            <Link to='/register' className="list-group-item btn-primary bg-dark m-2"> Register </Link>
        </ul>
        </div>
    )
}

export {Homepage};