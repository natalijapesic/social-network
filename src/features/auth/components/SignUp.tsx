import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import { useAppDispatch } from "../../../stores/hooks";
import { signUp } from "../authenticationSlice";


const SignUp: React.FC = () => {

    const dispatch = useAppDispatch();
    let navigate = useNavigate();

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
        navigate("/");
   }

    return (
    <div className="flex justify-center text-center pt-20">

            <form onSubmit={onSubmit}>
                <Input inputStyle="rounded" value={username} type="text" placeholder="Username" onChange={setUsername}></Input>
                <Input inputStyle="rounded" value={email} type="text" placeholder="Email" onChange={setEmail}></Input>
                <Input inputStyle="rounded" value={password} type="password" placeholder="Password" onChange={setPassword}></Input>
            <div>
                <button  
                    className="bg-white hover:bg-gray-100 text-gray-800  px-4 border border-gray-400 rounded shadow">
                    SignUp
                </button>
            </div>
            
        </form>
    </div>);
}

export default SignUp;