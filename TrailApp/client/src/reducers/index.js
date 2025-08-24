import { combineReducers } from "redux";

import auth from './auth';
import users from './user';

export default combineReducers({ auth, users });
