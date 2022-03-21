import {actionType} from "./actionType"


export interface CollectLogin {
  type: actionType.LOGIN
  payload: string
}