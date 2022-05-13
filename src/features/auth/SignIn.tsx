import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAuthUser, signIn } from "./authenticationSlice";


const SignIn: React.FC = () => {

    const dispatch = useAppDispatch();

    const user = useAppSelector(getAuthUser);
    // const status = useAppSelector(getAuthStatus);
    // const error = useAppSelector(getAuthError);
    
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    let navigate = useNavigate();
    
    
   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const request = {
            email,
            password
        }

        dispatch(signIn(request));

        navigate("/");
   }

//    let content;

//     if (status === 'loading') {
//         content = <p>"Loading..."</p>;
//     } else if (status === 'failed') {
//         content = <p>{error}</p>;
//     } else if (status === 'succeeded') {
//         content = "router /profile";
//     }

return (
    <div className="flex justify-center text-center mt-20">

        <form onSubmit={onSubmit}>
            <div className="mb-6">
                <input
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Email address"
                />
            </div>
            <div className="mb-6">
                <input
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Password"
                />
            </div>
            <div>
                <button 
                    className="bg-white hover:bg-gray-100 text-gray-800  px-4 border border-gray-400 rounded shadow">
                    SignIn
                </button>
            </div>
            
        </form>
    </div>);
}

export default SignIn;