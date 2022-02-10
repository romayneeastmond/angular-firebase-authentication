import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, query, collection, getDocs, where } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    constructor(private auth: Auth, private db: Firestore) {
    }

    async login(emailAddress: string, password: string) {
        let verified: boolean = false;
        let user: any = {};
        let validationErrors: any[] = [];

        await signInWithEmailAndPassword(this.auth, emailAddress, password)
            .then(async (res) => {
                const q = query(collection(this.db, 'users'), where('uid', '==', res.user.uid));

                const doc = await getDocs(q);
                const data = doc.docs[0].data();

                user = {
                    id: res.user.uid,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    emailAddress: res.user.email
                }

                if (res.user.emailVerified === true) {
                    verified = true;
                } else {
                    validationErrors = await this.sendVerification();
                }
            })
            .catch((error) => {
                validationErrors.push(error.message.replace('Firebase: ', ''));
            })

        return { verified, user, validationErrors }
    }

    logout() {
        this.auth.signOut();

        window.localStorage.removeItem('firebaseAuthenticationDemonstration_user');
    }

    async register(firstName: string, lastName: string, emailAddress: string, password: string) {
        let validationErrors: any[] = [];

        await createUserWithEmailAndPassword(this.auth, emailAddress.trim().toLowerCase(), password)
            .then(async (res) => {
                sendEmailVerification(this.auth.currentUser!, { url: environment.links.verifyUrl })

                await addDoc(collection(this.db, 'users'), {
                    uid: res.user.uid,
                    firstName,
                    lastName,
                    emailAddress: emailAddress.trim().toLowerCase(),
                    method: 'registration'
                }).then(() => {

                }).catch((error) => {
                    validationErrors.push(error.message.replace('Firebase: ', ''));
                })
            })
            .catch((error) => {
                validationErrors.push(error.message.replace('Firebase: ', ''));
            })

        return validationErrors;
    }

    async sendVerification() {
        let validationErrors: any[] = [];

        await sendEmailVerification(this.auth.currentUser!, { url: environment.links.loginUrl })
            .then(() => {

            })
            .catch((error) => {
                validationErrors.push(error.message.replace('Firebase: ', ''));
            })

        return validationErrors;
    }

    forgetMe() {
        window.localStorage.removeItem('firebaseAuthenticationDemonstration_rememberMe');
        window.localStorage.removeItem('firebaseAuthenticationDemonstration_rememberMeEmail');
    }

    getLoginValues() {
        let result = {
            rememberMe: false,
            emailAddress: ''
        };

        if (window.localStorage.getItem('firebaseAuthenticationDemonstration_rememberMe') === 'true') {
            result.rememberMe = true;

            if (window.localStorage.getItem('firebaseAuthenticationDemonstration_rememberMeEmail') !== null) {
                result.emailAddress = window.localStorage.getItem('firebaseAuthenticationDemonstration_rememberMeEmail') as string;
            }
        }

        return result;
    }

    getLoggedInUser(): any | null {
        if (window.localStorage.getItem('firebaseAuthenticationDemonstration_user') !== null) {
            return JSON.parse(window.localStorage.getItem('firebaseAuthenticationDemonstration_user') as string);
        }

        return null;
    }

    getVerificationEmail(): string {
        return window.localStorage.getItem('firebaseAuthenticationDemonstration_email') as string
    }

    rememberMe(emailAddress: string) {
        window.localStorage.setItem('firebaseAuthenticationDemonstration_rememberMe', 'true');
        window.localStorage.setItem('firebaseAuthenticationDemonstration_rememberMeEmail', emailAddress.trim().toLowerCase());
    }

    setLoggedInValues(user: any) {
        window.localStorage.setItem('firebaseAuthenticationDemonstration_user', JSON.stringify(user));
        window.localStorage.removeItem('firebaseAuthenticationDemonstration_email');
    }

    setVerificationEmail(emailAddress: string) {
        window.localStorage.setItem('firebaseAuthenticationDemonstration_email', emailAddress.trim().toLowerCase());
    }
}