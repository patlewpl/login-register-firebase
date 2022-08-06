import { auth } from "../../../firebase/index.js";

export default {
  state() {
    return {
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      weight: null,
      height: null,
    };
  },
  mutations: {
    setUserInfo(state, payload) {
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = null;
      state.photoURL = null;
      state.weight = null;
      state.height = null;
    },
  },
  actions: {
    setUserInfo(context) {
      const user = auth.currentUser;
      // console.log(user);
      context.commit("setUserInfo", user);
    },
  },
};
