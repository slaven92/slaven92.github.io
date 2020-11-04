<template>
  <div>
    <div class="row justify-content-center">
      <div class="col col-sm-6">
        <!-- This is name input field -->
        <div class="input-group" v-show="status === 'init'">
          <input
            type="text"
            v-model="playerName"
            class="form-control"
            placeholder="Your name"
          />
        </div>

        <!-- This is new channel name -->
        <div v-show="status === 'create'">
          Send this to your teammate: <strong>{{ channel }}</strong>
        </div>

        <!-- This is join channel input -->
        <div class="input-group" v-show="status === 'join'">
          <input
            type="text"
            v-model="channel"
            class="form-control"
            placeholder="Enter channel name"
          />
        </div>

        <!-- This is loding screen -->
        <div v-show="status === 'create' || status === 'start'">
          Hello {{ playerName }}, waiting for other player!
        </div>

        <!-- Buttons for interaction TODO fix the logix of this component -->
        <div>
          <button
            class="btn btn-primary"
            :disabled="playerName === '' || status !== 'init'"
            @click="createGame"
          >
            Create Game
          </button>
          <button
            class="btn btn-primary"
            :disabled="
              playerName === '' ||
              status === 'create' ||
              status === 'start' ||
              (status === 'join' && channel === '')
            "
            @click="joinGame"
          >
            {{ joinButtonTitle }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: "init", //init, create, join, start
      playerName: "",
      opponentName: "",
      mode: "",
      channel: "",
      joinButtonTitle: "Join Game",
      ws: null,
    };
  },
  methods: {
    getRandomString() {
      return Math.random().toString(36).substr(4);
    },
    createGame() {
      this.channel = this.getRandomString();
      // this.$emit("send-id", this.playerName, this.channel);
      this.status = "create";
      this.mode = "create";
      this.connect();
    },
    joinGame() {
      if (this.status === "init") {
        this.status = "join";
        this.joinButtonTitle = "Start Game";
      } else if (this.status === "join") {
        this.status = "start";
        this.mode = "join";
        // this.$emit("send-id", this.playerName, this.channel);
        this.connect();
      }
    },
    connect() {
      // this.ws = new WebSocket(`ws://localhost:8000/ws/${this.channel}`);
      this.ws = new WebSocket(`wss://reley.slaven92.tk/ws/${this.channel}`);
      this.ws.onmessage = this.recieveMessage;
      if (this.mode === "join") {
        setTimeout(this.sendMessage, 1000, this.playerName);
      }
    },
    recieveMessage(event) {
      var msg = event.data;
      this.opponentName = msg;
      if (this.mode === "create") {
        this.ws.send(this.playerName);
      }
      this.onmessage = null
      var playsFirst = this.mode==='create' ? true : false
      this.$emit('player-connected', this.ws, this.playerName, this.opponentName, playsFirst)
    },
    sendMessage(msg){
      this.ws.send(msg)
    }
  },
};
</script>

