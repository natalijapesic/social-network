import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { getAuthUser, signOut } from "../auth/authenticationSlice";


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
                                className="mx-5 hover:text-cyan-500 py-2 px-4"
                                to="createPost">
                                Create Post
                            </Link>
                            <a
                                className="mx-5 hover:text-cyan-500 py-2 px-4"
                                onClick={onClick}>
                                SignOut
                            </a>
                        </>

                    }

                    {
                        !user &&
                        <>
                            <Link
                                className="mx-5 hover:text-cyan-500 py-2 px-4"
                                to="signIn">
                                SignIn
                            </Link>
                            <Link
                                className="mx-5 hover:text-cyan-500 py-2 px-4"
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