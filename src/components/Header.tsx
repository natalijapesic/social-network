import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "../stores/hooks";
import { getAuthUser, signOut } from "../features/auth/authenticationSlice";
import CustomLink from "./CustomLink";


const Header: React.FC = () => {

    //onChange={(e) => searchPosts(e.target.value)} 

    const dispatch = useDispatch();
    let user = useAppSelector(getAuthUser);

    const onClick = () => {
        dispatch(signOut());
    }

    return (
        <div>
            <header className="flex justify-between bg-gray-800">
                <div></div>
                <div>
                    <input 
                        type="text" 
                        placeholder="Input username" 
                        className="border-b-2 text-sky-100 my-3 leading-tight focus:border-transparent bg-gray-800">
                    </input>
                </div>

                <div className="flex justify-between text-white ">
                    {
                        user &&
                        <>
                            <CustomLink to="createPost" message="Create Post" linkStyle="cyan" />
                            <CustomLink to="" message="SignOut" onClick={onClick} linkStyle="cyan" />
                        </>

                    }

                    {
                        !user &&
                        <>
                            <CustomLink to="signIn" message="SignIn" linkStyle="cyan" />
                            <CustomLink to="signUp" message="SignUp" linkStyle="cyan" />
                        </>
                    }
                   
                </div>
            </header>
            <Outlet/>
        </div>
        
    );
}

export default Header;