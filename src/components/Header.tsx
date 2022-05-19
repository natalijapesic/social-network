import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "../stores/hooks";
import { getAuthUser, signOut } from "../features/auth/authenticationSlice";
import CustomLink from "./CustomLink";
import Input from "./Input";
import { useState } from "react";


const Header: React.FC = () => {

    const [search, setSearch] = useState<string>('');


    const dispatch = useDispatch();
    let user = useAppSelector(getAuthUser);

    const onSignOut = () => {
        dispatch(signOut());
    }

    // const onClick = () => {

    // }

    return (
        <div>
            <header className="flex justify-between bg-gray-800">

                <CustomLink to="/" message="Home" linkStyle="cyan" />

                <div>
                    <Input type="text" placeholder="Input username" inputStyle="bottom" value={search} onChange={setSearch}/>
                </div>

                <div className="flex justify-between text-white ">
                    {
                        user &&
                        <>
                            <CustomLink to="createPost" message="Create Post" linkStyle="cyan" />
                            <CustomLink to="" message="SignOut" onClick={onSignOut} linkStyle="cyan" />
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