import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { getAuthUser, signOut } from "../features/auth/authenticationSlice";
import CustomLink from "./CustomLink";
import Input from "./Input";
import { useState } from "react";
import { fetchPosts, setSearchParam } from "../features/posts/postSlice";
import Button from "./Button";
import { ButtonStyle } from "./types";

const Header: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();

  let user = useAppSelector(getAuthUser);

  const onSignOut = () => {
    dispatch(signOut());
  };

  const onSearch = () => {
    dispatch(setSearchParam(search));
    dispatch(fetchPosts({ page: 1, limit: 5 }));
  };

  return (
    <div>
      <header className="flex justify-between bg-gray-800">
        <CustomLink to="/" message="Home" linkStyle="cyan" />

        <div className="flex">
          <Input
            type="text"
            placeholder="Input username"
            inputStyle="bottom"
            value={search}
            onChange={setSearch}
          />
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
