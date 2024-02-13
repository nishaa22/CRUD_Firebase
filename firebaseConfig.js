import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAneGJPEF2dqq6fDtQXI49TQlr8vpTc2pk',
	authDomain: 'crudfirebasestylex.firebaseapp.com',
	projectId: 'crudfirebasestylex',
	storageBucket: 'crudfirebasestylex.appspot.com',
	messagingSenderId: '493787211949',
	appId: '1:493787211949:web:c6e1a65098a55313e6be24',
	measurementId: 'G-W6XZHMMJXC',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { app, db, auth };
