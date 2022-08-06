import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "../../../firebase/index.js";
import { getDatabase, ref, set, onValue } from "firebase/database";

import router from "../../../router/index.js";

export default {
  state() {
    return {
      uid: null,
      token: null,
      expirationTime: null,
      email: null,
      displayName: null,
      photoURL: null,
    };
  },
  getters: {
    uid(state) {
      return state.uid;
    },
    token(state) {
      return state.token;
    },
    expirationTime(state) {
      return state.expirationTime;
    },
    email(state) {
      return state.email;
    },
    displayName(state) {
      return state.displayName;
    },
    photoURL(state) {
      return state.photoURL;
    },
  },
  mutations: {
    setUser(state, payload) {
      state.uid = payload.uid;
      state.token = payload.stsTokenManager.accessToken;
      state.expirationTime = payload.stsTokenManager.expirationTime;
    },
    clearUser(state) {
      state.uid = null;
      state.token = null;
      state.expirationTime = null;
    },
    setUserDetails(state, payload) {
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
    },
  },
  actions: {
    register(context, payload) {
      createUserWithEmailAndPassword(auth, payload.email, payload.password)
        .then((userCredential) => {
          context.commit("setUser", userCredential.user);
          context.commit("setUserDetails", userCredential.user);

          sessionStorage.setItem("uid", context.getters.uid);
          sessionStorage.setItem("email", context.getters.email);
          sessionStorage.setItem("displayName", context.getters.displayName);
          sessionStorage.setItem("photoURL", context.getters.photoURL);

          context.dispatch("writeUserData");
          router.replace("/login");
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    },
    writeUserData() {
      const db = getDatabase();
      const uid = sessionStorage.getItem("uid");
      const email = sessionStorage.getItem("email");
      const name = sessionStorage.getItem("displayName");
      const photoURL = sessionStorage.getItem("photoURL");

      set(ref(db, "users/" + uid), {
        email: email,
        user_photo: photoURL,
        name: name,
        weight: 0,
        height: 0,
        permission: "user",
      });
    },
    readUserData() {
      const db = getDatabase();
      const starCountRef = ref(db, "posts/" + postId + "/starCount");
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        updateStarCount(postElement, data);
      });
    },
    login(context, payload) {
      signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then((userCredential) => {
          context.commit("setUser", userCredential.user);

          localStorage.setItem("Authenticated", true);
          localStorage.setItem("UserId", context.getters.uid);
          localStorage.setItem("Token", context.getters.token);
          localStorage.setItem(
            "ExpirationTime",
            context.getters.expirationTime
          );

          router.replace("/welcome");
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    },
    logout(context) {
      signOut(auth);
      context.commit("clearUser");

      localStorage.setItem("Authenticated", false);
      localStorage.setItem("UserId", context.getters.uid);
      localStorage.setItem("Token", context.getters.token);
      localStorage.setItem("ExpirationTime", context.getters.expirationTime);
      sessionStorage.clear();

      router.push("/login");
    },
    autoLogout(context) {
      context.dispatch("logout");
    },
    fetchUser(context) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          context.commit("setUser", user);

          localStorage.setItem("Authenticated", true);
          localStorage.setItem("UserId", context.getters.uid);
          localStorage.setItem("Token", context.getters.token);
          localStorage.setItem(
            "ExpirationTime",
            context.getters.expirationTime
          );

          const expirationTime = +localStorage.getItem("ExpirationTime");
          const today = new Date().getTime();
          const expiresIn = expirationTime - today;

          if (expiresIn < 0) {
            context.dispatch("autoLogout");
          }
        } else {
          localStorage.setItem("Authenticated", false);
          context.commit("clearUser");
        }
      });
    },
  },
};
