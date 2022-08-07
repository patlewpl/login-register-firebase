<template>
  <section>
    <h1>User Profile</h1>
    <div class="user">
      <div class="user-avatar">
        <img :src="this.userData.user_photo" alt="User Avatar" width="115" />
      </div>
      <div class="user-details">
        <div class="account-info">
          <p>
            E-mail: <span>{{ this.userData.email }}</span>
          </p>
          <p>
            Password: <span>{{ this.userData.password }}</span>
          </p>
          <span class="btn">Change password</span>
        </div>
        <div class="user-info">
          <p>
            Name: <span>{{ this.userData.name }}</span>
          </p>
          <p>
            Weight: <span>{{ this.userData.weight }}</span>
          </p>
          <p>
            Height: <span> {{ this.userData.height }}</span>
          </p>
        </div>
      </div>
    </div>
    <!-- <form @submit.prevent="submitForm">
      <input type="submit" value="Save" />
    </form> -->
  </section>
</template>

<script>
import { getDatabase, ref, onValue } from "firebase/database";

export default {
  data() {
    return {
      userData: {},
    };
  },
  methods: {
    setUserData() {
      const db = getDatabase();
      const uid = localStorage.getItem("UserId");
      console.log(uid);
      const user = ref(db, "users/" + uid);
      console.log(user);
      onValue(user, (data) => {
        const userDataDb = {
          email: (data.val() && data.val().email) || "Load data failed.",
          password: "*******",
          user_photo:
            (data.val() && data.val().user_photo) || "/src/assets/user.png",
          name: (data.val() && data.val().name) || "Load data failed.",
          weight: (data.val() && data.val().weight) || "Load data failed.",
          height: (data.val() && data.val().height) || "Load data failed.",
        };

        this.userData = userDataDb;
      });
    },
  },
  created() {
    this.setUserData();
  },
};
</script>
<style scoped>
h1 {
  margin-bottom: 20px;
}
.user,
.user-details {
  display: flex;
}
.account-info {
  margin: 0 80px;
}
</style>
