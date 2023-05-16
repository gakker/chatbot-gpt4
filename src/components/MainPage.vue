<template>
  <div>
    <MainSidebar @new-chat="createNewChat"/>
    <div class="content-container">
      <Navigation />
      <ChatBox :key="chatBoxKey"/>
    </div>
  </div>
</template>

<script>
import MainSidebar from "./MainSidebar.vue";
import ChatBox from "./ChatBox.vue";
import {fetchUserToken} from '../apis/apis';

export default {
  name: "MainPage",
  components: {
    MainSidebar,
    ChatBox,
  },
  data() {
    return {
      chatBoxKey: 0,
    };
  },
  async created() {
    // Check if objectId exists in local storage
    let token = localStorage.getItem("user_token");
    if (!token) {
      // Generate a new objectId
      const user_token = await fetchUserToken(token);
      localStorage.setItem("user_token", user_token);
    }
  },
  methods: {
    createNewChat() {
      this.chatBoxKey += 1;
    }
  }
};
</script>

<style>
.content-container {
  margin-left: 250px;
}

.main-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  background-color: #1c1c1c;
  z-index: 3;
}
</style>
