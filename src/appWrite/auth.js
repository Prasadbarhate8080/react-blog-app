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
                console.log(conf)
                const userAccount = await this.account.create(ID.unique(), email, password, name);
                if (userAccount) {
                    // call another method
                     await  this.login({ email, password });
                     return  userAccount; 
                } 
                
            } catch (error) {
                throw error;
            }
        }



        async  login({email, password}) {
            try {
                return await this.account.createEmailPasswordSession(email, password);
            } catch (error) {
                console.log("Appwrite serive :: login :: error", error);
                throw error;
            }
        }

            async  getCurrentUser() {
                try {
                    return await this.account.get();
                } catch (error) {
                    console.log("Appwrite serive :: getCurrentUser :: error", error);
                    return null;        
                }

            }

            async  logout() {

                try {
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

