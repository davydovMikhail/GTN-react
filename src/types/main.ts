export interface MainState {
    loader: boolean;
    isConnected: boolean;
    message: string;
    notification: string;
    showOK: boolean;
}

export enum MainActionTypes {
    SET_LOADER = 'SET_LOADER',
    SET_IS_CONNECTED = 'SET_IS_CONNECTED',
    SET_MESSAGE = 'SET_MESSAGE',
    SET_NOTIFICATION = 'SET_NOTIFICATION',
    SET_SHOW_OK = 'SET_SHOW_OK',
} 
interface SetLoaderAction {
    type: MainActionTypes.SET_LOADER;
    payload: boolean;
}
interface SetIsConnectedAction {
    type: MainActionTypes.SET_IS_CONNECTED;
    payload: boolean;
}
interface SetMessageAction {
    type: MainActionTypes.SET_MESSAGE;
    payload: string;
}
interface SetNotificationAction {
    type: MainActionTypes.SET_NOTIFICATION;
    payload: string;
}
interface SetShowOkAction {
    type: MainActionTypes.SET_SHOW_OK;
    payload: boolean;
}


export type MainAction = 
    SetLoaderAction |
    SetIsConnectedAction |
    SetMessageAction |
    SetNotificationAction |
    SetShowOkAction;
    