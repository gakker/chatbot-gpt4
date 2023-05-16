<template>
  <div class="home-page">
    <div class="chat-container" ref="chatContainer">
      <div class="message" v-for="message in messages" :key="message.query_id">
        <div class="message-left">
          <p class="message-text chatgpt">{{ message.query_text }}</p>
        </div>
        <div class="message-right">
          <p
            :class="{ 'message-text': true, user: true, code: message.has_code }"
            v-html="message.answer_text"
          ></p>
        </div>
      </div>
    </div>
    <div class="input-container">
      <input
        class="input-field"
        type="text"
        placeholder="Type a message..."
        v-model="newQuery"
        @keyup.enter="sendQuery"
      />
      <button class="send-button" @click="sendQuery">
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
    <button class="logout-button" @click="logout">Logout</button>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      messages: [],
      answer: null,
      newQuery: "",
      token: "",
    };
  },
  created() {
    this.$nextTick(() => {
      this.$refs.chatContainer.scrollTo({
        top: this.$refs.chatContainer.scrollHeight,
        // behavior: "smooth",
      });
    });

    // Retrieve the bearer token from local storage
    // this.token = localStorage.getItem("token");
    this.token = localStorage.getItem("token");

    // Make a GET request to the API and fetch the messages
    axios
      .get("http://localhost:3000/query", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.messages = response.data.data;
        this.$nextTick(() => {
          this.$refs.chatContainer.scrollTo({
            top: this.$refs.chatContainer.scrollHeight,
            behavior: "smooth",
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    logout() {
      // Perform logout logic here
      // For example, redirect to the login page
      localStorage.setItem("token", null);
      this.$router.push({ name: "LoginPage" });
    },
    sendQuery() {
      // Make a POST request to the API and send the new query
      this.messages.push({
        answer_id: "",
        answer_text: "",
        query_createdAt: new Date(),
        query_id: "",
        query_text: this.newQuery,
      });
      this.$nextTick(() => {
        this.$refs.chatContainer.scrollTo({
          top: this.$refs.chatContainer.scrollHeight,
          behavior: "smooth",
        });
      });
      this.messages[this.messages.length - 1].answer_text = "Typing...";
      let localText = this.newQuery;
      this.newQuery = "";
      axios
        .post(
          "http://localhost:3000/query",
          {
            text: localText,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          // Simulate typing animation
          this.messages[this.messages.length - 1].answer_text = "Typing...";
          let i = 0;
          const typingInterval = setInterval(() => {
            if (i < response.data.data.answer_text.length) {
              if (
                response.data.data.answer_text[i] === "<" &&
                response.data.data.answer_text[i + 1] === "c" &&
                response.data.data.answer_text[i + 2] === "o" &&
                response.data.data.answer_text[i + 3] === "d" &&
                response.data.data.answer_text[i + 4] === "e" &&
                response.data.data.answer_text[i + 5] === ">"
              ) {
                this.messages[this.messages.length - 1].answer_text += "<pre><code>";
                i += 6;
                while (
                  response.data.data.answer_text[i] !== "<" ||
                  response.data.data.answer_text[i + 1] !== "/" ||
                  response.data.data.answer_text[i + 2] !== "c" ||
                  response.data.data.answer_text[i + 3] !== "o" ||
                  response.data.data.answer_text[i + 4] !== "d" ||
                  response.data.data.answer_text[i + 5] !== "e" ||
                  response.data.data.answer_text[i + 6] !== ">"
                ) {
                  if (response.data.data.answer_text[i] === "\n") {
                    this.messages[this.messages.length - 1].answer_text += "<br>";
                  } else if (response.data.data.answer_text[i] === "\t") {
                    this.messages[this.messages.length - 1].answer_text +=
                      "&nbsp;&nbsp;&nbsp;&nbsp;";
                  } else {
                    this.messages[this.messages.length - 1].answer_text +=
                      response.data.data.answer_text[i];
                  }
                  i++;
                }
                this.messages[this.messages.length - 1].answer_text += "</code></pre>";
                i += 7;
              } else {
                this.messages[
                  this.messages.length - 1
                ].answer_text += response.data.data.answer_text.charAt(i);
                i++;
              }
              this.$nextTick(() => {
                this.$refs.chatContainer.scrollTo({
                  top: this.$refs.chatContainer.scrollHeight,
                  behavior: "smooth",
                });
              });
            } else {
              clearInterval(typingInterval);
            }
          }, 50);
          this.$nextTick(() => {
            this.$refs.chatContainer.scrollTo({
              top: this.$refs.chatContainer.scrollHeight,
              behavior: "smooth",
            });
          });
          this.messages[this.messages.length - 1].answer_text =
            response.data.data.answer_text;
        })
        .catch((error) => {
          this.messages[this.messages.length - 1].answer_text = error.message;
        });
    },
    formatTime(time) {
      // Format the time in HH:mm format
      const date = new Date(time);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    },
  },
};
</script>
<style scoped>
@import url("https://use.fontawesome.com/releases/v5.15.2/css/all.css");

.home-page {
  background-color: #252525;
  color: #ffffff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.chat-container {
  width: 80%;
  max-width: 700px;
  height: 70%;
  max-height: 500px;
  overflow-y: auto;
  margin-bottom: 20px;
  background-color: #333333;
  border-radius: 5px;
  padding: 20px;
  font-family: "Montserrat", sans-serif;
}

.message {
  margin-bottom: 10px;
  font-size: 16px;
}

.message-text {
  background-color: #6b5d5d;
  padding: 10px;
  border-radius: 5px;
  display: inline-block;
  max-width: 70%;
  word-wrap: break-word;
  font-family: "Montserrat", sans-serif;
}

.message-right .message-text {
  background-color: #299776;
  color: #ffffff;
}

.input-container {
  width: 80%;
  max-width: 700px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.input-field {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
}

.send-button {
  background-color: #299776;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin-left: 10px;
  font-size: 16px;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
}

.send-button:hover {
  background-color: #299776;
}

.logout-button {
  background-color: #299776;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  font-family: "Montserrat", sans-serif;
}

.logout-button:hover {
  background-color: #3dbb8e;
}

.logout-icon {
  margin-right: 5px;
}
</style>


