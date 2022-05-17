import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Spinner from "../../../components/Spinner";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { getAuthStatus, signUp } from "../authenticationSlice";


const SignUp: React.FC = () => {

    const dispatch = useAppDispatch();
    let navigate = useNavigate();

    const signUpStatus = useAppSelector(getAuthStatus);

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isDisabled, setIsDisabled] = useState(true);

    // https://www.bezkoder.com/react-form-validation-hooks/

    let content;

    useEffect(() => {
        validate();
    }, [email, username])

    function validate(){
        if ((email.length === 0
            && username.length === 0)
            || email.indexOf("@") === -1
            || (email.indexOf(".com") === -1 && email.indexOf(".rs") === -1)
            )
            setIsDisabled(true);
        else
            setIsDisabled(false);
    }


    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(signUpStatus === "idle" || signUpStatus === "failed")
        {
            const request = {
                username,
                email,
                password
            }
    
            dispatch(signUp(request));
        }
    }

    if (signUpStatus === "succeeded")
        navigate("/");
    else if (signUpStatus === "failed") {
        console.log(signUpStatus);
        content = <p className="border border-red-300">User already exist or your password is too short.<br /> Please check your input and try again.</p>;
    }
    else if (signUpStatus === "loading")
        content = <Spinner type="gray" />;


    return (
        <div className="flex justify-center text-center pt-20">
            <form onSubmit={onSubmit}>
                <Input inputStyle="rounded" value={username} type="text" placeholder="Username" onChange={setUsername}></Input>
                <Input inputStyle="rounded" value={email} type="text" placeholder="Email" onChange={setEmail}></Input>
                <Input inputStyle="rounded" value={password} type="password" placeholder="Password" onChange={setPassword}></Input>
                {content}
                <div>
                    {
                        isDisabled 
                        ? <Button type="submit" buttonStyle="disable" message="SignUp" disabled={isDisabled} />
                        : <Button type="submit" buttonStyle="light" message="SignUp" disabled={isDisabled} />
                    }
                    
                </div>
            
            </form>
        </div>);
}

export default SignUp;