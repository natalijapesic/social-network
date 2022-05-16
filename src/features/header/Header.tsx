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
            <header className="flex justify-between">
                <div></div>
                <div>
                    <input 
                        type="text" 
                        placeholder="Input username" 
                        className="border-b-2 text-sky-100 py-2 px-4 mb-3 leading-tight focus:border-transparent bg-gray-900">
                    </input>
                </div>

                <div className="flex justify-between text-white ">
                    <Link
                        className="mx-5 hover:text-cyan-500"
                        to="createPost">
                        Create Post
                    </Link>
                    <Link
                        className="mx-5 hover:text-cyan-500"
                        to="signIn">
                        SignIn
                    </Link>
                    <Link
                        className="mx-5 hover:text-cyan-500"
                        to="signUp">
                        SignUp
                    </Link>
                    <a
                        className="mx-5 hover:text-cyan-500"
                        onClick={onClick}>
                        SignOut
                    </a>
                   
                </div>
            </header>
            <Outlet/>
        </div>
        
    );
}

export default Header;