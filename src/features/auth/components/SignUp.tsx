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
    const [isEmailGood, setIsEmailGood] = useState<boolean | null>(null);
    const [isNameGood, setIsNameGood] = useState<boolean | null>(null);

    // https://www.bezkoder.com/react-form-validation-hooks/
    
    function checkEmail(){
        if (email.indexOf("@") === -1 || (email.indexOf(".com") === -1 && email.indexOf(".rs") === -1))
            setIsEmailGood(false);
        else
            setIsEmailGood(true);
    }

    function checkName(){
        if (username.length === 0)
            setIsNameGood(false);
        else
            setIsNameGood(true);
    }
    let content;

    useEffect(() => {
        checkEmail();
        checkName();

        if(signUpStatus === "succeeded")
            navigate("/");
        else if(signUpStatus === "failed")
            content = <label>User already exist</label>;
        else if(signUpStatus === "loading")
            content = <Spinner type="gray" />

    },[isEmailGood, isNameGood])


    const onClick = () => {

        if(isNameGood && isEmailGood && signUpStatus === "idle")
        {
            const request = {
                username,
                email,
                password
            }
    
            dispatch(signUp(request));
        }
    }



    return (
    <div className="flex justify-center text-center pt-20">

        <div>
            <Input inputStyle="rounded" value={username} type="text" placeholder="Username" onChange={setUsername}></Input>
            {
                isNameGood === false?
                <label>Username</label>
                : null
            }
            <Input inputStyle="rounded" value={email} type="text" placeholder="Email" onChange={setEmail}></Input>
            {
                isEmailGood === false ?
                <label>Email must contain @ and .com or .rs</label>
                : null
            }
            <Input inputStyle="rounded" value={password} type="password" placeholder="Password" onChange={setPassword}></Input>
            {content}
        <div>
            <Button type="button" buttonStyle="light" message="SignUp" onClick={onClick}/>
        </div>
            
        </div>
    </div>);
}

export default SignUp;