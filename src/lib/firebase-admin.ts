import * as admin from 'firebase-admin'

if (!admin.apps.length) {

  const serviceAccount = require('../secret/next-test-auth-firebase-adminsdk-j7390-7b2f3eb387.json')

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

const adminAuth = admin.auth()

export { adminAuth as auth }