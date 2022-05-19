import { Outlet, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { getAuthUser, signOut } from "../features/auth/authenticationSlice";
import CustomLink from "./CustomLink";
import Input from "./Input";
import { useState } from "react";
import { fetchPosts, setSearchParam } from "../features/posts/postSlice";
import Button from "./Button";
import { ButtonStyle } from "./types";

const Header: React.FC = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  let user = useAppSelector(getAuthUser);

  const onSignOut = () => {
    dispatch(signOut());
  };

  // https://reactrouter.com/docs/en/v6/getting-started/tutorial#search-params
  // https://reactrouter.com/docs/en/v6/getting-started/tutorial#search-params
  const onSearch = () => {
    // dispatch(setSearchParam(search));
    dispatch(fetchPosts({ page: 1, limit: 5 }));
  };

  // const fun = (param: string) =>{
  //   if(param)
  //     setSearchParam({param})
  // }

  return (
    <div>
      <header className="flex justify-between bg-gray-800">
        <CustomLink to="/" message="Home" linkStyle="cyan" />

        <div className="flex">
          {/* <Input
            type="text"
            placeholder="Input username"
            inputStyle="bottom"
            value={searchParams.get("authorName") || ""}
            onChange={}
          /> */}
          <Button
            type="button"
            onClick={onSearch}
            buttonStyle={ButtonStyle.search}
            disabled={false}
            message=">"
          />
        </div>

        <div className="flex justify-between text-white ">
          {user && (
            <>
              <CustomLink
                to="createPost"
                message="Create Post"
                linkStyle="cyan"
              />
              <CustomLink
                to=""
                message="SignOut"
                onClick={onSignOut}
                linkStyle="cyan"
              />
              {
                user.isAdmin &&
                <CustomLink
                to="admin"
                message="Admin"
                linkStyle="cyan"
                />
              }
            </>
          )}
          {!user && (
            <>
              <CustomLink to="signIn" message="SignIn" linkStyle="cyan" />
              <CustomLink to="signUp" message="SignUp" linkStyle="cyan" />
            </>
          )}
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Header;
