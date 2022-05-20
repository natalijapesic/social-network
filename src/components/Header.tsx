import { Outlet, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { getAuthUser, signOut } from "../features/auth/authenticationSlice";
import CustomLink from "./CustomLink";
import { fetchPosts } from "../features/posts/postSlice";
import Button from "./Button";
import { ButtonStyle } from "./types";

const Header: React.FC = () => {
  let [searchParam, setSearchParam] = useSearchParams();
  const dispatch = useAppDispatch();

  let user = useAppSelector(getAuthUser);

  const onSignOut = () => {
    dispatch(signOut());
  };

  const onSearch = () => {
    dispatch(fetchPosts({ page: 1, limit: 5, searchParam: searchParam.get("authorName") }));
  };

  return (
    <div>
      <header className="flex justify-between bg-gray-800">
        <CustomLink to="/" message="Home" linkStyle="cyan" />

        <div className="flex">
          <input
          value={searchParam.get("authorName") || ""}
          onChange={(event) => {
            let authorName = event.target.value;
            if (authorName) {
              setSearchParam({ authorName });
            } else {
              setSearchParam({});
            }
          }} />
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
