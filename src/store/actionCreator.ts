import {actionType} from "./actionType"
import { Dispatch } from "redux"
import { CollectLogin } from "./action"

export const login  = (value: string) => {
    return (dispatch: Dispatch<CollectLogin>) => {
        console.log('action', value)
        dispatch({
            type: actionType.LOGIN,
            payload: value
        })
    } 
}