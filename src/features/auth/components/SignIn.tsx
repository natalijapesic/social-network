import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useAppDispatch } from "../../../stores/hooks";
import { signIn } from "../authenticationSlice";


const SignIn: React.FC = () => {

    const dispatch = useAppDispatch();

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

return (
    <div className="flex justify-center text-center pt-20">

        <form onSubmit={onSubmit}>

            <Input inputStyle="rounded" value={email} type="text" placeholder="Email" onChange={setEmail}></Input>
            <Input inputStyle="rounded" value={password} type="password" placeholder="Password" onChange={setPassword}></Input>
            
            <div>
                <Button type="submit" buttonStyle="light" message="SignIn" disabled={false}/>
            </div>
            
        </form>
    </div>);
}

export default SignIn;