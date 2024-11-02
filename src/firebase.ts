import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { configs } from './configs/configs';


const app = initializeApp(configs.FIREBASE);
const firestore = getFirestore(app);

export { firestore };

