import {
  getDatabase,
  ref,
  get,
  set,
  child,
  push,
  remove,
} from 'firebase/database';
import { auth } from './auth';
import app from './config';

const db = getDatabase(app);

export function addUser(userId, username, email) {
  set(ref(db, 'users/' + userId), {
    username,
    email,
  });
}

export function insertData(movieId, type) {
  const postListRef = ref(db, 'users/' + auth.currentUser.uid + `/${type}`);
  const newPostRef = push(postListRef);

  return set(newPostRef, movieId);
  // .then(() => {
  //   // alert('Data added successfully');
  // })
  // .catch(error => {
  //   alert(error);
  // });
}

export function readData(type) {
  let array = [];
  const uid = auth.currentUser.uid;

  const dbRef = ref(db);
  return get(child(dbRef, 'users/' + uid + `/${type}`)).then(snapshot => {
    if (snapshot.exists()) {
      snapshot.forEach(childSnapshot => {
        array.push({ key: childSnapshot.key, val: childSnapshot.val() });
      });
    } else {
    }
    return array;
  });
}

export function readDataArray(type) {
  let array = [];
  const uid = auth.currentUser.uid;

  const dbRef = ref(db);
  return get(child(dbRef, 'users/' + uid + `/${type}`)).then(snapshot => {
    if (snapshot.exists()) {
      snapshot.forEach(childSnapshot => {
        array.push(childSnapshot.val());
      });
    } else {
    }
    return array;
  });
}

export function deleteData(key, type) {
  const postListRef = ref(
    db,
    'users/' + auth.currentUser.uid + `/${type}` + `/${key}`
  );

  return remove(postListRef);
  // .then(() => {
  //   // alert('Data added successfully');
  // })
  // .catch(error => {
  //   alert(error);
  // });
}

export function readNameFromBase() {
  const uid = auth.currentUser.uid;
  const dbRef = ref(db);

  return get(child(dbRef, 'users/' + uid + `/username`)).then(snapshot => {
    if (snapshot.exists()) {
      return snapshot.val();
      // } else {
      //   alert('No data found');
    }
  });
}
