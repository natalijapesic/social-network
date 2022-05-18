import { ReactFragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Spinner from "../../../components/Spinner";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { getAuthStatus, signIn } from "../authenticationSlice";


const SignIn: React.FC = () => {

    const dispatch = useAppDispatch();
    let navigate = useNavigate();
    const signInStatus = useAppSelector(getAuthStatus);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        validate();
    },[email, password])
    
    useEffect(() => {
        if (signInStatus === "succeeded")
            navigate("/");
        
    },[dispatch, signInStatus])

    const validate = () => {
        if (password.length < 4) {
            setIsDisabled(true);
            return;
        } else {
            setIsDisabled(false);
        }
        if (email.length === 0) {
            setIsDisabled(true);
            return;
        }
        if (email.indexOf("@") === -1 || (email.indexOf(".com") === -1 && email.indexOf(".rs") === -1)) {
            setIsDisabled(true);
            return;
        }
    }

    let content;

    if (signInStatus === "failed") {
        content = <p className="border border-red-300">You have entered your password or email incorrenctly..<br /> Please check your input and try again.</p>;
    }
    else if (signInStatus === "loading")
        content = <Spinner type="gray" />;

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        if (signInStatus === "idle" || signInStatus === "failed") {

            const request = {
                email,
                password
            }
    
            dispatch(signIn(request));
            
        }
    }

    return (
        <div className="flex justify-center text-center pt-20">
            <form onSubmit={onSubmit}>

                <Input inputStyle="rounded" value={email} type="text" placeholder="Email" onChange={setEmail}></Input>
                <Input inputStyle="rounded" value={password} type="password" placeholder="Password" onChange={setPassword}></Input>
                {content}
                <div>
                    {
                        isDisabled
                            ? <Button type="submit" buttonStyle="disable" message="SignIn" disabled={isDisabled} />
                            : <Button type="submit" buttonStyle="light" message="SignIn" disabled={isDisabled} />
                    }
                </div>
            
            </form>
        </div>);
}

export default SignIn;