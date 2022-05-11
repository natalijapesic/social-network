import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAuthUser, signIn } from "./authenticationSlice";


const SignIn: React.FC = () => {

    const dispatch = useAppDispatch();

    const user = useAppSelector(getAuthUser);
    // const status = useAppSelector(getAuthStatus);
    // const error = useAppSelector(getAuthError);
    
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    

   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const request = {
            email,
            password
        }

        dispatch(signIn(request));
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
    <div>
        <form onSubmit={onSubmit}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Input e-mail" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Input password" />
            <button>SignIn</button>
        </form>
    </div>);
}

export default SignIn;