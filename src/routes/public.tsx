import { useRoutes } from "react-router-dom";
import App from "../App";
import Header from "../components/Header";
import SignIn from "../features/auth/components/SignIn";
import SignUp from "../features/auth/components/SignUp";
import CreatePost from "../features/posts/components/CreatePost";
import Posts from "../features/posts/components/Posts";


export const publicRoutes = [
    {
        element: <App />,
        children: [
            { path: "/", element: <Header /> },
            { path: "/", element: <Posts /> },
            { path: "signIn", element: <SignIn /> },
            { path: "signUp", element: <SignUp /> },
        ]
    }
]

// export default function Router(){
//     let element = useRoutes([
//     {
//         element: <App />,
//         children: [
//             { path: "/", element: <Header /> },
//             { path: "/", element: <Posts /> },
//             { path: "signIn", element: <SignIn /> },
//             { path: "signUp", element: <SignUp /> },
//         ]
//     },
//     {
//         element: <App />,
//         children: [
//             { path: "createPost", element: <CreatePost /> },
//             { path: "signup", element: <SignUp /> },
//         ]
//     }
//     ]);
// }