import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "../stores/hooks";
import { getAuthUser, signOut } from "../features/auth/authenticationSlice";


const Header: React.FC = () => {

    //onChange={(e) => searchPosts(e.target.value)} 

    const dispatch = useDispatch();
    let user = useAppSelector(getAuthUser);

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
                        className="border-b-2 text-sky-100 mb-3 leading-tight focus:border-transparent bg-gray-900">
                    </input>
                </div>

                <div className="flex justify-between text-white ">
                    {
                        user &&
                        <>
                            <Link
                                to="createPost">
                                Create Post
                            </Link>
                            <a
                                onClick={onClick}>
                                SignOut
                            </a>
                        </>

                    }

                    {
                        !user &&
                        <>
                            <Link
                                to="signIn">
                                SignIn
                            </Link>
                            <Link
                                to="signUp">
                                SignUp
                            </Link>
                        </>
                    }
                   
                </div>
            </header>
            <Outlet/>
        </div>
        
    );
}

export default Header;