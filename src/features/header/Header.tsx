import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { signOut } from "../auth/authenticationSlice";


const Header: React.FC = () => {

    //onChange={(e) => searchPosts(e.target.value)} 

    const dispatch = useDispatch();

    const onClick = ()=>
    {
        dispatch(signOut());
    }

    return (
        <div>
            <header>
                <div>Logo</div>
                <div className="flex justify-center">
                    <input 
                        type="text" 
                        placeholder="Input username" 
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"></input>
                    {/* <button 
                        className="bg-white hover:bg-gray-100 text-gray-800  px-4 border border-gray-400 rounded shadow">
                        search
                    </button> */}
                </div>

                <div>
                    <button className= "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                        <Link to="createPost">Create Post</Link>
                    </button>
                    <button className= "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                        <Link to="signIn">SignIn</Link>
                    </button>
                    <button className= "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                        <Link to="signUp">SignUp</Link>
                    </button>
                    <button 
                        className= "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                        onClick ={onClick}>
                        SignOut
                    </button>
                    
                </div>
            </header>
            <Outlet/>
        </div>
        
    );
}

export default Header;