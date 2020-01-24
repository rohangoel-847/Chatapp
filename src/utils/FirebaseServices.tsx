import firebase, {Firebase, auth} from 'react-native-firebase';
import {Database, DatabaseStatics} from 'react-native-firebase/database';
import {Platform} from 'react-native';

let Ref = firebase.database().ref('AllUsers/');
let chatref = firebase.database().ref('Msgs/');
let roomchat = firebase.database();
let inbox = firebase.database();
//import Store from '../Store/Store';
class Firebaseservices {
  constructor() {
    this.initializeFireBase();
  }

  initializeFireBase = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(
        {
          apiKey: 'AIzaSyDcaIGCnagjv9qNWHnAu-BzFShjZK9S7Iw',
          appId:
            Platform.OS === 'ios'
              ? '1:120970505723:ios:66b87f751411ce9d7eaf5e'
              : '1:120970505723:android:9ea038a72e182e167eaf5e',
          databaseURL: 'https://chatapplication-56657.firebaseio.com',
          messagingSenderId: '120970505723',
          projectId: 'chatapplication-56657',
          storageBucket: 'chatapplication-56657.appspot.com',
        },
        'chatapplication',
      );
    }
  };

  writeUserData(email: string, fname: string, lname: string) {
    chatref
      .set({
        email,
        fname,
        lname,
      })
      .then(data => {
        console.log('data ', data);
      })
      .catch(error => {
        // console.warn('error ', error);
      });
  }

  readUserData(callback: Function) {
    chatref.once('value', function(snapshot: any) {
      callback(snapshot.val());
    });
  }

  login = (user: any, success_callback: any, failure_callback: any) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success_callback)
      .catch(failure_callback);
  };

  signUp = (user: any, success_callback: any, failure_callback: any) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(success_callback, failure_callback);
  };

  addingUser = (user: any) => {
    const users = {
      key: user.uid,
      displayName: user.name,
      email: user.email,
      photoURL: user.avatar,
    };
    Ref.push(users);
  };

  fetchList = (callback: Function) => {
    Ref.on('child_added', (snapshot: any) => {
      // console.warn(snapshot)
      callback(snapshot.val());
    });
  };

  loadMsgs = (callback: Function) => {
    chatref.once('value', function(snapshot: any) {
      console.log(snapshot.val());
      callback(snapshot.val());
    });
  };

  send = (messages: Array<any>) => {
    for (let i = 0; i < messages.length; i++) {
      const {text, user} = messages[i];
      const message = {text, user, createdAt: new Date().getTime()};
      console.log('msg sended ', message);

      inbox
        .ref('Inbox/' + user._id)
        .child(user.roomID)
        .set({
          lastMsg: message.text,
          createdAt: message.createdAt,
          user: message.user,
        });

      inbox
        .ref('Inbox/' + user.id)
        .child(user.roomID)
        .set({
          lastMsg: message.text,
          createdAt: message.createdAt,
          user: message.user,
        });

      roomchat.ref('chatRoom/' + user.roomID).push(message);
    }
  };

  refOn = (id: string, callback: Function) => {
    roomchat
      .ref('chatRoom/' + id)

      .on('child_added', (snapshot: any) => {
        callback(this.parse(snapshot));
      });
  };

  parse = (snapshot: any) => {
    const {createdAt: numberStamp, text, user} = snapshot.val();
    const {key: id} = snapshot;
    const {key: _id} = snapshot;
    const createdAt = new Date(numberStamp);
    const message = {id, _id, createdAt, text, user};

    return message;
  };

  inboxList = (uid: string, callback: Function) => {
    // console.warn('uid -> ',uid)
    inbox.ref('Inbox/' + uid).on('value', function(snapshot: any) {
      // console.warn('in  ', snapshot);
      callback(snapshot.val());
    });
  };

  uploadImage = (uid: string, path: any, callback: Function) => {
    const imageRef = firebase
      .storage()
      .ref('profilePic')
      .child(uid);

    return imageRef
      .putFile(path, {contentType: 'jpg'})
      .then(() => {
        return imageRef.getDownloadURL();
      })
      .then(url => {
        console.log(url);
        callback(url);
      })
      .catch(error => {
        // console.warn('Error uploading image: ', error);
      });
  };
}

export default new Firebaseservices();
