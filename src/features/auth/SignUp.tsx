import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAuthUser, signUp } from "./authenticationSlice";


const SignUp: React.FC = () => {

    const dispatch = useAppDispatch();

    // const user = useAppSelector(getAuthUser);
    // const status = useAppSelector(getAuthStatus);
    // const error = useAppSelector(getAuthError);
    
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    

   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const request = {
            username,
            email,
            password
        }

        dispatch(signUp(request));
   }

//    let content;

    // if (status === 'loading') {
    //     content = <p>"Loading..."</p>;
    // } else if (status === 'failed') {
    //     content = <p>{error}</p>;
    // } else if (status === 'succeeded') {
    //     content = "router /profile";
    // }

    return (
    <div>
        <form onSubmit={onSubmit}>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Input name" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Input e-mail" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Input password" />
            <button>SignUp</button>
        </form>
    </div>);
}

export default SignUp;