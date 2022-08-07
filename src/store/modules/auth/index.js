import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "../../../firebase/index.js";
import { getDatabase, ref, set } from "firebase/database";

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
          sessionStorage.setItem("photoURL", "/src/assets/user.png");
          sessionStorage.setItem("displayName", "not set");
          sessionStorage.setItem("weight", "not set");
          sessionStorage.setItem("height", "not set");

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
      const photoURL = sessionStorage.getItem("photoURL");
      const name = sessionStorage.getItem("displayName");
      const weight = sessionStorage.getItem("weight");
      const height = sessionStorage.getItem("height");

      set(ref(db, "users/" + uid), {
        email: email,
        user_photo: photoURL,
        name: name,
        weight: weight,
        height: height,
        permission: "user",
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
