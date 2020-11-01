<template>
  <Layout>
    <div class="container">

      <!-- choose name and connect part of the game -->
      <div v-if="status === 'start'">
        <NameSelect @send-id="getId" />
      </div>

      <!-- select part of the game -->
      <div v-else-if="status === 'select'">
        <ChooseBoats @boats-choosen="doBoatsChoosen"/>
      </div>

      <!-- play part of the game -->
      <div v-else-if="status === 'play'">slaven</div>

      <!-- chat is availabe as soon as you provide the name and connect -->
      <div v-if="status !== 'start'">
        <Chat :name="this.name" />
      </div>
    </div>
  </Layout>
</template>

<script>
import Chat from "~/components/submarine/Chat.vue";
import NameSelect from "~/components/submarine/NameSelect.vue";
import ChooseBoats from "~/components/submarine/ChooseBoats.vue";

export default {
  data() {
    return {
      // important state
      status: "select", //start, select, play
      ws: null,
      channel: "",
      name: "",
      oponentName: "",
      boats: [], //final boats list
    };
  },
  components: {
    Chat,
    NameSelect,
    ChooseBoats,
  },
  methods: {
    getId(name, channel) {
      this.name = name;
      this.channel = channel;
      this.ws = new WebSocket(`ws://localhost:8000/ws/${channel}`);
      this.ws.onmessage = this.recieveMessage;
      var msg = JSON.stringify({
        playerName: this.name,
      });
      setTimeout(this.sendMessage, 1000, msg);
    },
    recieveMessage(event) {
      var msg = JSON.parse(event.data);
      if ("oponent" in msg) {
        this.oponentName = msg.oponent;
        this.status = "select";
      } else {
        this.oponentName = msg.playerName;
        msg.oponent = this.name;
        this.ws.send(JSON.stringify(msg));
        this.status = "select";
      }
    },
    sendMessage(msg) {
      this.ws.send(msg);
    },
    doBoatsChoosen(boats){
      this.boats=boats,
      this.status = "play"
    }
  },
};
</script>

<style scoped>
.container {
  margin-top: 50px;
}
</style>