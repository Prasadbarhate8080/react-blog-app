    import conf from '../conf/conf.js';
    import { Client, Account, ID } from "appwrite";

    
    export class AuthService {
        
        client = new Client();
        account;

        constructor() {
            this.client
                .setEndpoint(conf.appWriteUrl)
                .setProject(conf.appWriteProjectId);
            this.account = new Account(this.client);
        }

        async  createAccount({email, password, name}) {
            try {
                console.log("create mai hoon");
                const userAccount = await this.account.create(ID.unique(), email, password, name);
                if (userAccount) {
                    // call another method
                    console.log("Signup successful, now logging in...");
                     await  this.login({ email, password });
                } else {
                return  userAccount; 
                }
            } catch (error) {
                throw error;
            }
        }



        async  login({email, password}) {
            try {
                console.log("login mai hoon");
                return await this.account.createEmailPasswordSession(email, password);
            } catch (error) {
                console.log("Appwrite serive :: login :: error", error);
                throw error;
            }
        }

            async  getCurrentUser() {
                try {
                    console.log("current user mai hoon");
                    return await this.account.get();
                } catch (error) {
                    console.log("Appwrite serive :: getCurrentUser :: error", error);
                    return null;        
                }

            }

            async  logout() {

                try {
                    console.log("logout mai hoon");
                    await this.account.deleteSessions();
                    return true;
                } catch (error) {
                    console.log("Appwrite serive :: logout :: error", error);
                    throw error;
                }
            }
    }

    const authService = new AuthService();

    export default authService

