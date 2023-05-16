<template>
  <div class="chatbox-messages" ref="chatContainer">
    <div
      v-for="(message, index) in chatMessages"
      :key="index"
      :class="
        message.isUser ? 'chatbox-message user-message' : 'chatbox-message bot-message'
      "
    >
      <div class="chatbox-message-icon">
        <img :src="message.isUser ? getUserAvatar() : getBotAvatar(message.sender)" />
      </div>
      <div class="chatbox-message-text">
        <p v-html="addLineBreaks(message.message)"></p>
      </div>
    </div>
    <div class="chatbox-clearfix"></div>
  </div>
</template>

<script>
export default {
  name: "ChatMessages",
  props: {
    chatMessages: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.scrollToBottom();
  },
  updated() {
    this.scrollToBottom();
  },
  methods: {
    addLineBreaks(message) {
      return message.replace(/\n/g, "<br>");
    },
    getInitials(name) {
      const names = name.split(" ");
      let initials = "";
      names.forEach((n) => {
        initials += n.charAt(0);
      });
      return initials.toUpperCase();
    },
    getUserAvatar() {
      const name = "Uzair"; // Set user name here
      const initials = this.getInitials(name);
      const bgColor = "#007aff"; // Set background color for user avatar
      const textColor = "#fff"; // Set text color for user avatar
      const canvas = document.createElement("canvas");
      canvas.width = 35;
      canvas.height = 35;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = textColor;
      ctx.font = "18px Arial";
      ctx.textAlign = "center";
      ctx.fillText(initials, canvas.width / 2, canvas.height / 2 + 6);
      return canvas.toDataURL();
    },
    getBotAvatar(sender) {
      sender = "Bot";
      const initials = sender.charAt(0).toUpperCase();
      const bgColor = "#bdbdbd"; // Set background color for bot avatar
      const textColor = "#333"; // Set text color for bot avatar
      const canvas = document.createElement("canvas");
      canvas.width = 35;
      canvas.height = 35;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = textColor;
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillText(initials, canvas.width / 2, canvas.height / 2 + 6);
      return canvas.toDataURL();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.chatContainer.scrollTo({
          top: this.$refs.chatContainer.scrollHeight,
          behavior: "smooth",
        });
      });
    },
  },
};
</script>

<style scoped>
.chatbox-messages {
  overflow-y: scroll;
  height: 100%;
}

.chatbox-message {
  display: flex;
  margin-bottom: 15px;
  justify-content: flex-start;
  align-items: flex-start;
}

.chatbox-message.user-message,
.chatbox-message.bot-message {
  padding-left: 6rem;
}

.chatbox-message-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  font-size: 18px;
  margin-top: 12px;
  /* background-color: #007aff; */
}

.chatbox-message-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 80%;
  margin-top: 5px;
}

.chatbox-message-text p {
  margin: 0;
  padding: 8px;
  border-radius: 20px;
  font-size: 16px;
  line-height: 20px;
  color: #fff;
  line-height: 2;
}

.chatbox-message.user-message .chatbox-message-text p {
  /* background-color: #007aff; */
  color: #fff;
}

.chatbox-clearfix {
  clear: both;
}
</style>
