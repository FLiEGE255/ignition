export class SessionService {

    constructor() {
        this.session = null;
    }

    async login(handle, password) {

        if (!handle || !password) {
            return {
                success: false,
                message: "HANDLE AND PASSWORD REQUIRED"
            };
        }

        /*
         * Später:
         *
         * Hier erfolgt die echte Authentifizierung
         * gegen unser Backend.
         *
         * NIEMALS echte Passwörter im Frontend hinterlegen.
         */

        this.session = {
            handle: handle,
            authenticated: true,
            node: "NODE0",
            loginTime: new Date()
        };

        return {
            success: true,
            message: "ACCESS GRANTED",
            session: this.session
        };
    }

    logout() {
        this.session = null;
    }

    isAuthenticated() {
        return this.session !== null &&
               this.session.authenticated === true;
    }

    getSession() {
        return this.session;
    }

}