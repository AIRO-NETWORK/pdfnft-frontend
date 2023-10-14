import { Socket } from 'socket.io-client';

enum SocketActionTypes {
    LOAD_USER_SOCKET = 'LOAD_USER_SOCKET',
}

interface LoadUserSocketAction {
    type: SocketActionTypes.LOAD_USER_SOCKET,
    payload: Socket
}

type SocketsAction = LoadUserSocketAction;
export type Sockets = { 'user'?: Socket };

const defaultSockets = { 'user': undefined };

export default (state: Sockets = defaultSockets, action: SocketsAction): Sockets => {
    switch (action.type) {
        case SocketActionTypes.LOAD_USER_SOCKET: {
            return { ...state, 'user': action.payload };
        }
        default:
            return state;
    }
};