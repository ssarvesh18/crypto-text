import { Link } from "react-router-dom";
const PageNotfound= ()=>{

    return (
        <div className="card m-5 w-50 mx-auto">
        <ul className='list-group m-5'>
            <div className="s18 text-light h3 m-2 p-3"> 🚷 Oops...the page you are looking for does not exist! </div>
            <Link to='/' className="list-group-item btn-dark bg-dark m-2"> Return to home page. 🌐 </Link>
        </ul>
        </div>
    )
}
export { PageNotfound};