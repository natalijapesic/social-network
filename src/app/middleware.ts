import { Middleware } from '@reduxjs/toolkit';
import { RootState } from './store';


const storeUser: Middleware = store => next => action =>
{
    if(action.type === "user/signUpUser/fulfilled" || action.type === "user/signInUser/fulfilled"){
        //localStorage.setItem("user", JSON.stringify(response.data));
    }
    
    let result = next(action);
}

export default storeUser;