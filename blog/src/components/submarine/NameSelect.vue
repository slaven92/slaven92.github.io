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
      channel: "",
      joinButtonTitle: "Join Game",
    };
  },
  methods: {
    getRandomString() {
      return Math.random().toString(36).substr(4);
    },
    createGame() {
      this.channel = this.getRandomString();
      this.$emit("send-id", this.playerName, this.channel);
      this.status = "create";
    },
    joinGame() {
      if (this.status === "init") {
        this.status = "join";
        this.joinButtonTitle = "Start Game";
      } else if (this.status === "join") {
          this.status = 'start'
          this.$emit("send-id", this.playerName, this.channel);
      }
    }
  },
};
</script>

