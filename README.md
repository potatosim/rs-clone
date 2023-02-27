
# PRO-Boards

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Installing

1. Clone this repo.

```
git clone https://github.com/potatosim/rs-clone.git
```

2. Go to `rs-clone` folder.
3. Switch baranch.

```
git checkout development
```

4. Install npm modules.

```
npm install
```

5. Rename file `.env.example` to `.env` at src folder.

## Firebase

1. Create your firebase web project.

- [Firebase](https://firebase.google.com/).

2. Click on 'Get Started' button.
3. Login into firebase.
4. Click on 'add project' button and enter your project name.
5. Wait until your project will be created.
6. Create a **Web Application**
7. Copy your application keys into **.env** file

```
const firebaseConfig =  {
	apiKey:  "apiKey",
	authDomain:  "authDomain",
	projectId:  "projectId",
	storageBucket:  "storageBucket",
	messagingSenderId:  "messagingSenderId",
	appId:  "appId"
};

REACT_APP_FIREBASE_API_KEY=apiKey
REACT_APP_FIREBASE_AUTH_DOMAIN=authDomain
REACT_APP_FIREBASE_PROJECT_ID=projectId
REACT_APP_FIREBASE_STORAGE_BUCKET=storageBucket
REACT_APP_FIREBASE_MESSAGING_SENDER_TO=messagingSenderId
REACT_APP_FIREBASE_APP_ID=appId
```

8. Open Firebase console.
9. Open Build tab in the left section and choose Authentication.
10. Click on 'Get Started' button.
11. Choose Email/Password and Google as a Authentication providers.
12. On Authentication Provider tab enable this providers.
13. Turn on Firestore, Storage, Authentication.
14. Open Build tab in the left section and choose Storage.
15. Click on 'Get Started' button.
16. In the modal window choose 'Start in **Test mode**' and click 'Next' button.
17. In second tab of the modal choose the server location you prefer and click 'Next' button. Wait until it setup.
18. In the top of page choose 'Rules' tab. And paste code below. And click 'Publish' button.

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write, delete: if true
    }
  }
}
```

20. Open Build tab in the left section and choose Firestore Database.
21. Click on 'Get Started' button.
22. In the modal window choose 'Start in **Test mode**' and click 'Next' button.
23. In second tab of the modal choose the server location you prefer and click 'Next' button. Wait until it setup.
24. In the top of page choose 'Rules' tab. And paste code below. And click 'Publish' button.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write, delete: if true;
    }
  }
}
```

## Running application as is

1. Start application.

```
npm start
```
