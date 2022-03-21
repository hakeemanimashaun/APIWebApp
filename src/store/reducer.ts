import {actionType} from "./actionType"
import { CollectLogin } from "./action"

const initialState =  "Quisque cursus, metus vitae pharetra Nam libero tempore, cum soluta nobis est eligendi"

const reducer = (
    state: string = initialState,
    action: CollectLogin
  ) => {
    switch (action.type) {
      case actionType.LOGIN:
        return action.payload;
      default: 
        return state
    }
  }
  
  export default reducer