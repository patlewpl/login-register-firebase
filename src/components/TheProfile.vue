<template>
  <section>
    <h1>User Profile</h1>
    <div class="user">
      <div class="user-avatar">
        <img src="../assets/user.png" alt="User Avatar" width="115" />
      </div>
      <div class="user-details">
        <div class="account-info">
          <p>
            E-mail: <span>{{ email }}</span>
          </p>
          <p>Password: <span>********</span></p>
          <span class="btn">Change password</span>
        </div>
        <!-- <div class="user-info">
          <p>
            Name: <span>{{ displayName }}</span>
          </p>
          <p>
            Weight: <span>{{ weight }}</span>
          </p>
          <p>
            Height: <span> {{ height }}</span>
          </p>
        </div> -->
      </div>
    </div>
    <!-- <form @submit.prevent="submitForm">
      <input type="submit" value="Save" />
    </form> -->
  </section>
</template>

<script>
import { auth } from "../firebase/index.js";
import { ref, computed, onBeforeMount, onMounted, reactive } from "vue";
import { useStore } from "vuex";
// wyciagnac dane z db
export default {
  setup() {
    const store = useStore();
    const email = sessionStorage.getItem("email");
    return {
      email,
    };
  },

  // props: ["email"],
  // setup() {
  //
  // const email = store.state.email;
  // function show() {
  //   console.log(email);
  // }
  // onBeforeMount(() => {
  //   show();
  // });
  // console.log(email.value);
  // const email = computed(() => store.state.email);
  // function submitForm() {
  // console.log(user);
  // console.log(auth.currentUser);
  //   uid: null,
  //   email: null,
  //   displayName: null,
  //   photoURL: null,
  //   weight: null,
  //   height: null,
  // }
  // onMounted(() => {
  //   store.dispatch("setUserInfo");
  // });
  // return {
  // submitForm,
  // email,
  // };
  // },
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
