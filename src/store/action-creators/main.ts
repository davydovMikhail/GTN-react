import { MainAction, MainActionTypes } from "../../types/main";

export function SetLoader(loader: boolean): MainAction {
    return {type: MainActionTypes.SET_LOADER, payload: loader}
}
export function SetIsConnected(isConnected: boolean): MainAction {
    return {type: MainActionTypes.SET_IS_CONNECTED, payload: isConnected}
}
export function SetMessage(message: string): MainAction {
    return {type: MainActionTypes.SET_MESSAGE, payload: message}
}
export function SetNotification(notification: string): MainAction {
    return {type: MainActionTypes.SET_NOTIFICATION, payload: notification}
}
export function SetShowOk(showOk: boolean): MainAction {
    return {type: MainActionTypes.SET_SHOW_OK, payload: showOk}
}