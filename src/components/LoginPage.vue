<template>
  <div class="login-page">
    <div class="form-wrapper">
      <h2 class="form-title">Login</h2>
      <form>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <button class="form-submit-button" @click.prevent="login()">Login</button>
        <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
      </form>
    </div>
    <div class="loading-modal" v-show="showModal">
      <div class="loading-overlay"></div>
      <div class="loading-content">
        <div class="loading-spinner" v-if="loading"></div>
        <div class="success-message" v-if="success">{{ successMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      loading: false,
      showModal: false,
      success: false,
      successMessage: "",
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.showModal = true;
      axios
        .post("http://localhost:3000/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          if (response.data.status === "success") {
            this.success = true;
            this.successMessage = "Login successful. Redirecting...";
            localStorage.setItem("token", response.data.token);
            setTimeout(() => {
              this.$router.push({ name: "Main" });
            }, 2000);
          } else {
            this.errorMessage = "Invalid credentials";
            this.loading = false;
            this.showModal = false;
          }
        })
        .catch(() => {
          this.errorMessage = "Unable to login";
          this.loading = false;
          this.showModal = false;
        });
    },
  },
};
</script>

<style scoped>
@import url("https://use.fontawesome.com/releases/v5.15.2/css/all.css");

.form-submit-button {
  margin: auto;
}

.form-title {
  text-align: center;
}
div {
  margin: 0;
  padding: 0;
}

.login-page {
  background-color: #252525;
  color: #ffffff;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Montserrat", sans-serif;
}

.form-wrapper {
  width: 360px;
  padding: 40px;
  background-color: #303030;
  border-radius: 20px;
  font-family: "Montserrat", sans-serif;
}

.form-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  font-family: "Montserrat", sans-serif;
}

.form-group {
  margin-bottom: 20px;
  font-family: "Montserrat", sans-serif;
}

label {
  display: block;
  font-size: 18px;
  margin-bottom: 5px;
  font-family: "Montserrat", sans-serif;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #454545;
  color: #ffffff;
  font-family: "Montserrat", sans-serif;
}

.form-submit-button {
  background-color: #454545;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin: auto;
}

.form-submit-button:hover {
  background-color: #ffffff;
  color: #454545;
}

.loading-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.loading-spinner {
  display: inline-block;
  width: 60px;
  height: 60px;
  border: 5px solid #ffffff;
  border-top-color: #454545;
  border-radius: 50%;
  animation: spin 1s ease-in-out infinite;
}

.loading-content {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-message {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  margin-left: 20px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
