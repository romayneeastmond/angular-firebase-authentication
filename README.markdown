# Angular Forms with Firebase Authentication and Firestore Storage Demonstration

An Angular 12 project that uses Firebase for authentication and an accompanying Firestore database to store user registration details.

## How to Use

Follow the instructions on https://developers.google.com/codelabs/building-a-web-app-with-angular-and-firebase#9 which should configure all the necessary settings within the Angular application. The /src/environments/environment.ts should look similiar to

```
export const environment = {
    firebase: {
        projectId: '7aaa02c9-390f-4767-b1c1-b7ecc6a05814',
        appId: 'd8448402-0fa7-4cc5-8a4c-4155a1dd574e',
        storageBucket: '8371ca54-6a66-4b66-b8c6-87d55923cd8d',
        locationId: '55cbd269-530c-4807-abf9-2c850cb807fd',
        apiKey: '071886fa-3ad7-4e7c-8bb1-f83750c81adb',
        authDomain: '7ad75e15-5717-435c-b935-7e77eb40b465',
        messagingSenderId: '5e057b21-fee6-4fac-a16f-330b2ef9e84f',
    },
    links: {
        verifyUrl: 'http://localhost:4200/verify',
        loginUrl: 'http://localhost:4200/login'
    },
    production: true
};
```

Change the verifyUrl or loginUrl to match the current environment.

Then log into Firebase Authentication and enable the Email/Password provider. Add any necessary authorized domains that will need access to authentication.

Inside the Firestore database settings add a rule that allows authenticated users to make collection changes.

Run an npm install or update

```
npm i
```

Starting the project will run it on the default Angular location http://localhost:4200

```
ng -o serve
```

## Copyright and Ownership

All terms used are copyright to their original authors.
