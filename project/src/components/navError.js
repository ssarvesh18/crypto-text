import { Link } from "react-router-dom";
const NavError = () =>{
    return (
        <div className="card m-5 w-50 mx-auto">
        <ul className='list-group m-5'>
            <div className="s18 text-light h3 m-2 p-3"> 🚷 Oops...the page content cannot be loaded on direct access </div>
            <Link to='/dashboard' className="list-group-item btn-dark bg-dark m-2"> Return to dashboard. 📖</Link>
            <Link to='/' className="list-group-item btn-dark bg-dark m-2"> Return to home page. 🌐 </Link>
        </ul>
        </div>
    )
}
export {NavError};