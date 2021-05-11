import * as admin from 'firebase-admin'

if (!admin.apps.length) {

  const serviceAccount = require('../../secret/next-test-auth-firebase-adminsdk-850y1-dd383e3b53.json')

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

const adminAuth = admin.auth()

export { adminAuth as auth }