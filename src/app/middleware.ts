import { Middleware } from '@reduxjs/toolkit';
import { nextTick } from 'process';
import { RootState, store } from './store';


const storeUser: Middleware<{}, RootState> = store => next => action =>
{
    console.log(action.type);
    
    let result = next(action);
}