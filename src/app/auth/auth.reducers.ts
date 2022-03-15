import { Action } from "@ngrx/store";
import { AUTHActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "./auth.actions";

export interface State{
    isauthenticated:boolean;
}

const initialState:State ={
    isauthenticated:false
}

export function authReducer(state =initialState,action:AUTHActions)
{
    switch(action.type){
        case SET_AUTHENTICATED:
            return {isauthenticated:true};
        case SET_UNAUTHENTICATED:
            return {isauthenticated:false};
        default:
            return state;
    }
}

export const getIsauthenticated = (state:State)=>state.isauthenticated;