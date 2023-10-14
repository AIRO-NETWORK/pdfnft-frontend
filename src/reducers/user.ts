import { User } from '../interfaces/User';

enum UserActions {
    LOAD_USER = 'LOAD_USER',
}

interface LoadUserAction {
    type: UserActions.LOAD_USER,
    payload: User
}

type UserAction = LoadUserAction;

export default (state: User | null = null, action: UserAction): User | null => {

    switch (action.type) {
        case UserActions.LOAD_USER: {
            return action.payload;
        }
        default:
            return state;
    }
};