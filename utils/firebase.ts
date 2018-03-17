import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAFmmX2HlYLeMf_RHFuEC_72Fm7i2r9Tns',
  authDomain: 'lango-192611.firebaseapp.com',
  databaseURL: 'https://lango-192611.firebaseio.com',
}

!firebase.apps.length && firebase.initializeApp(config)

export const DB = firebase.database()