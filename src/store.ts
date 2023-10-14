import { combineReducers, createStore } from 'redux';
import { User } from './interfaces/User';
import userReducer from './reducers/user';
import socketsReducer, { Sockets } from './reducers/sockets';

const combined = combineReducers({
    user: userReducer,
    sockets: socketsReducer,
});

export interface CombinedReducer {
    user: User,
    sockets: Sockets,
}

export default createStore(combined);