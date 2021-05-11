import firebase from 'firebase'
import 'firebase/auth'

import { firebaseCredentials } from '../secret/firebase-client-credentials'

if (!firebase.apps.length) 
  firebase.initializeApp(firebaseCredentials)

export default firebase
