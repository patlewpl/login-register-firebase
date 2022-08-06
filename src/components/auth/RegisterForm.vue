<template>
  <section>
    <h1>Register</h1>
    <form @submit.prevent="submitForm">
      <input type="email" placeholder="E-mail" v-model="formData.email" />
      <input
        type="password"
        placeholder="Password"
        v-model="formData.password"
      />
      <input type="submit" value="Register" />
    </form>
  </section>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const formData = ref({});
    const error = null;

    function submitForm() {
      try {
        store.dispatch("register", formData.value);
      } catch (err) {
        error.value = err.message || "Failed to authenticate.";
      }
    }

    return {
      error,
      formData,
      submitForm,
    };
  },
};
</script>
