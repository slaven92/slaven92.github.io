<template>
  <div class="row justify-content-center">
    <div class="col col-sm-8">
      <h1>Chat</h1>
      <div class="chat">
        <p v-for="(text, index) in textList" :key="index">{{ text }}</p>
      </div>

      <div class="input-group">
        <input
          id="search"
          type="text"
          v-model="msgText"
          class="form-control"
          placeholder="Enter text..."
        />
      </div>
      <button class="btn btn-primary" @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textList: [],
      msgText: "",
      ws: null,
    };
  },
  props: ["name"],
  methods: {
    sendMessage() {
      this.ws.send(this.msgText);
      this.textList.push("You: " + this.msgText);
      this.msgText = "";
    },
    recieveMessage(event) {
      this.textList.push(event.data);
    },
  },
  async mounted() {
    // this.ws = new WebSocket(`ws://localhost:8000/ws/chat/slaven`);
    this.ws =  new WebSocket(`ws://localhost:8000/ws/chat/${this.name}`);
    this.ws.onmessage = this.recieveMessage;
  },
};
</script>