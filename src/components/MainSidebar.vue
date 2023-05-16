<template>
  <div class="main-sidebar">
    <nav class="sidebar-queries">
      <nav class="sidebar-menu">
        <ul>
          <li><a href="#" @click="createNewChat">+ New chat</a></li>
        </ul>
        <ul class="queries">
          fetch all the queries from an array
        </ul>
      </nav>
    </nav>
    <div class="sidebar-divider"></div>
    <nav class="sidebar-menu">
      <ul>
        <li><a href="#">Upgrade to Plus</a></li>
        <li><a href="#">Light mode/Dark mode</a></li>
        <li><a href="#">Updates & FAQ</a></li>
        <li>
          <a href="#" @click="logout">
            <i class="fas fa-sign-out-alt"></i>&nbsp;Logout
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  name: "MainSidebar",
  methods: {
    toggleMode() {
      this.isDarkMode = !this.isDarkMode;
      this.mode = this.isDarkMode ? "Dark" : "Light";
    },
    logout() {
      // Navigate to the login page
      this.$router.push("/login");
    },
    async createNewChat() {
      localStorage.removeItem("user_token");
      await this.$nextTick();
      this.$emit("new-chat");
    },
  },
};
</script>
<style scoped>
.sidebar-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  background-color: #343a40;
  color: #fff;
}

.sidebar-header h3 {
  margin: 0;
  background-color: #222;
}

.sidebar-divider {
  height: 1px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  margin-top: 10px;
  margin-bottom: 10px;
}

.main-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  background-color: #222;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.sidebar-menu {
  padding: 20px;
}

.sidebar-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu ul li {
  margin-bottom: 10px;
}

.sidebar-menu ul li a {
  display: block;
  padding: 10px;
  background-color: #333;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.sidebar-menu ul li a:hover {
  background-color: #555;
}

.sidebar-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background-color: #222;
  border-top: 1px solid #333;
  text-align: center;
}

.sidebar-footer p {
  margin: 0;
  color: #fff;
}

/* new styles */

.sidebar-queries {
  display: flex;
  justify-content: center;
  height: 50%;
  background-color: #222;
}

.new-chat-button {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 45px;
  background-color: #222;
  color: #fff;
  font-size: 16px;
  border: 1px solid #555;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 30px;
  padding: 0 20px;
  transition: background-color 0.3s ease;
  box-sizing: border-box;
  text-align: left;
}

.new-chat-button:hover {
  background-color: #555;
}

.new-chat-button i {
  margin-right: 10px;
}
</style>
