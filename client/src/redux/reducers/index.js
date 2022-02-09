import {combineReducers} from "redux";

import saveUserReducer from "./user";
import saveContactReducer from "./contact";

const rootReducer = () =>
	combineReducers({
		user: saveUserReducer,
		contact: saveContactReducer,
	});

export default rootReducer;
