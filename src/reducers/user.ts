import { User } from '../interfaces/User';

enum UserActions {
    LOAD_USER = 'LOAD_USER',
    UPDATE_USER_BALANCE = 'UPDATE_USER_BALANCE',
}

interface LoadUserAction {
    type: UserActions.LOAD_USER,
    payload: User
}

interface UpdateBalanceAction {
    type: UserActions.UPDATE_USER_BALANCE,
    payload: number
}

type UserAction = LoadUserAction | UpdateBalanceAction;

export default (state: User | null = null, action: UserAction): User | null => {

    switch (action.type) {
        case UserActions.LOAD_USER: {
            return action.payload;
        }
        case UserActions.UPDATE_USER_BALANCE: {
            return state && { ...state, usdcBalance: state.usdcBalance + action.payload };
        }
        default:
            return state;
    }
};