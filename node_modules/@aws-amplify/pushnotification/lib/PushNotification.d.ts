export default class PushNotification {
    private _config;
    private _currentState;
    private _androidInitialized;
    private _iosInitialized;
    private _notificationOpenedHandlers;
    constructor(config: any);
    getModuleName(): string;
    configure(config: any): any;
    onNotification(handler: any): void;
    onNotificationOpened(handler: any): void;
    onRegister(handler: any): void;
    initializeAndroid(): Promise<void>;
    _registerTokenCached(): Promise<boolean>;
    requestIOSPermissions(options?: {
        alert: boolean;
        badge: boolean;
        sound: boolean;
    }): void;
    initializeIOS(): void;
    /**
     * This function handles the React Native AppState change event
     * And checks if the app was launched by a Push Notification
     * Note: Current AppState will be null or 'unknown' if the app is coming from killed state to active
     * @param nextAppState The next state the app is changing to as part of the event
     */
    _checkIfOpenedByNotification(nextAppState: any, handler: any): void;
    parseMessageData: (rawMessage: any) => {
        eventSource: any;
        eventSourceAttributes: {};
    };
    handleNotificationReceived(rawMessage: any): void;
    handleNotificationOpened(rawMessage: any): void;
    updateEndpoint(token: any): void;
    addEventListenerForAndroid(event: any, handler: any): void;
    addEventListenerForIOS(event: any, handler: any): void;
    parseMessagefromAndroid(message: any, from?: any): any;
    parseMessageFromIOS(message: any): any;
}
