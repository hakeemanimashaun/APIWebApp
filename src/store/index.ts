import { combineReducers } from "redux";
import reducer from "./reducer";

const reducers  = combineReducers({
    profile: reducer 
});

export default reducers

export type State = ReturnType<typeof reducers>