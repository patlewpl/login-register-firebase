import { createStore } from "vuex";

import authModule from "./modules/auth/index.js";
import profileModule from "./modules/profile/index.js";

const store = createStore({
  modules: {
    auth: authModule,
    profile: profileModule,
  },
});

export default store;
