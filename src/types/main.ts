export interface MainState {
    loader: boolean;
    notification: string;
    showOK: boolean;
}

export enum MainActionTypes {
    SET_LOADER = 'SET_LOADER',
    SET_NOTIFICATION = 'SET_NOTIFICATION',
    SET_SHOW_OK = 'SET_SHOW_OK',
} 
interface SetLoaderAction {
    type: MainActionTypes.SET_LOADER;
    payload: boolean;
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
    SetNotificationAction |
    SetShowOkAction;
    