<template>
  <div class="chatbox-container">
    <ChatMessages :chatMessages="chatMessages" ref="chatContainer" />
    <div class="chatbox-input">
      <form @submit.prevent="sendMessage">
        <div class="chatbox-input-field-container">
          <textarea
          ref="textArea"
            type="text"
            rows="1"
            class="chatbox-input-field"
            @keydown.enter="handleKeyDown"
            v-model="newMessage"
            @input="adjustTextareaHeight"
          />
          <button :disabled="sending" class="chatbox-send-button" @click="handleSubmit">
            <i class="fas fa-paper-plane chatbox-send-icon"></i>
          </button>
        </div>
        <p class="chatbox-input-paragraph">
          Chatbot Apr 13 Version. Free Research Preview. Our goal is to make AI systems
          more natural and safe to interact with. Your feedback will help us improve.
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { fetchMessages, sendQuery, fetchUserToken } from "@/apis/apis";
import ChatMessages from "@/components/ChatMessages.vue";

export default {
  name: "ChatBox",
  components: {
    ChatMessages,
  },
  data() {
    return {
      input: "",
      chatMessages: [],
      newMessage: "",
      sending: false,
    };
  },
  async created() {
    if (!localStorage.getItem("user_token")) {
      localStorage.setItem("user_token", await fetchUserToken());
    }
    let user_token = localStorage.getItem("user_token");
    const messages = await fetchMessages(user_token);
    console.log(messages);
    this.chatMessages = messages;
    this.$nextTick(() => {
      this.$refs.chatContainer.scrollTo({
        top: this.$refs.chatContainer.scrollHeight,
        behavior: "smooth",
      });
    });
  },
  methods: {
    async handleSubmit() {
      this.sending = true;
      const queryText = this.newMessage;
      this.chatMessages.push({
        message: queryText,
        isUser: true,
      });
      this.newMessage = "";
      this.$refs.textArea.rows = 1;
      const user_token = localStorage.getItem("user_token");
      this.chatMessages.push({ message: "Waiting for response...", isUser: false });
      this.scrollToBottom();
      const response = await sendQuery(queryText, user_token);
      this.chatMessages[this.chatMessages.length - 1].message = "";
      const messageArray = response.message.split(" ");
      let index = 0;
      const typingInterval = setInterval(() => {
        this.chatMessages[this.chatMessages.length - 1].message +=
          messageArray[index] + " ";
        this.scrollToBottom();
        index++;
        if (index >= messageArray.length) {
          clearInterval(typingInterval);
        }
      }, 100);
      this.sending = false;
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.chatContainer.scrollTo({
          top: this.$refs.chatContainer.scrollHeight,
          behavior: "smooth",
        });
      });
    },
    handleKeyDown(event) {
      event.preventDefault();
      if (event.key === "Enter" && event.shiftKey) {
        event.target.value += "\n";
        const textarea = event.target;
        textarea.rows += 1;
      } else if (event.key === "Enter") {
        this.handleSubmit();
        const textarea = event.target;
        textarea.rows = 1;
      }
    },
    adjustTextareaHeight(event) {
      const textarea = event.target;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    },
  },
};
</script>

<style>
.chatbox-container {
  background-color: #1c1c1c;
  font-size: 16px;
  color: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  z-index: 1;
}

.chatbox-messages {
  color: #fff;
  flex-grow: 1;
  overflow-y: scroll;
}

.chatbox-message {
  color: #fff;
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  scrollbar-color: #1c1c1c #8b8b8b;
}

.chatbox-messages::-webkit-scrollbar {
  width: 8px;
}

.chatbox-messages::-webkit-scrollbar-track {
  background: #1c1c1c;
}

.chatbox-messages::-webkit-scrollbar-thumb {
  background-color: #696464;
  border-radius: 3px;
}

.user-message {
  color: #fff;
  background-color: #1c1c1c;
}

.user-message .chatbox-message-text {
  position: relative;
  padding-left: 3.5rem;
}

.user-message::before {
  content: "U";
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background-color: #f7be16;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.bot-message {
  color: #fff;
  background-color: #383232;
}

.bot-message .chatbox-message-text {
  position: relative;
  padding-left: 3.5rem;
}

.bot-message::before {
  content: "";
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background-color: #383232;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.bot-message::after {
  content: "";
  position: absolute;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  border-top: 1rem solid #383232;
  border-right: 0.7rem solid transparent;
}

.chatbox-input {
  padding: 1rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  background-color: transparent;
}

.chatbox-input-field-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #383232;
  border-radius: 8px;
  padding: 0.3rem;
  margin-left: 4rem;
  margin-right: 4rem;
  margin-bottom: 1.5rem;
}

.chatbox-input-field {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  color: #fff;
  background-color: transparent;
}

.chatbox-send-button {
  width: 2.5rem;
  height: 2.5rem;
  margin-left: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: transparent;
}

.chatbox-input-field:focus {
  outline: none;
}

.chatbox-send-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.chatbox-send-button:active {
  background-color: rgba(255, 255, 255, 0.2);
}
.chatbox-send-button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.chatbox-input {
  /* position: fixed; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  bottom: 0;
  left: 0;
  width: 100%;
  background-image: linear-gradient(to top, rgba(56, 50, 50, 1), transparent);
  padding: 20px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
}

.chatbox-input-field-container {
  display: flex;
  align-items: center;
  margin-left: 8rem;
  margin-right: 8rem;
}

.chatbox-input-field {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  max-height: 10em;
}

.chatbox-send-button:hover {
  background-color: rgba(46, 46, 46, 1);
}

.chatbox-send-icon {
  margin-right: 5px;
  color: #fff;
  font-size: 1.4rem;
}

.chatbox-input-paragraph {
  margin: 0;
  text-align: center;
  color: #b1b1b1;
  font-size: 12px;
  line-height: 1;
}

.chatbox-input-field {
  width: 100%;
  resize: none;
  font-family: inherit;
  font-size: 16px;
  font-weight: 400;
  line-height: 2;
  transition: all 0.2s ease;
  overflow: auto;
}
</style>
