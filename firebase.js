import firebase from 'firebase'
const config = {
  apiKey: 'AIzaSyDvbEniF8LTd2RyKM5zyo0Dz2xp_15qc1c',
  authDomain: 'time-kines.firebaseapp.com',
  databaseURL: 'https://time-kines.firebaseio.com',
  projectId: 'time-kines',
  storageBucket: 'time-kines.appspot.com',
  messagingSenderId: '531045921082'
}
if (!firebase.apps.length) {
  firebase.initializeApp(config)
  const firestore = firebase.firestore()
  const settings = { timestampsInSnapshots: true }
  firestore.settings(settings)
}

export const db = firebase.firestore()
export const provider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export default firebase
