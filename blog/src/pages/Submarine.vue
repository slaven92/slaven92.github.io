<template>
  <Layout>
    <div class="container">
      <!-- choose name and connect part of the game -->
      <div v-if="status === 'start'">
        <NameSelect @send-id="getId" />
      </div>

      <!-- select part of the game -->
      <div v-else-if="status === 'select'">
        <div class="row justify-content-center">
          <div class="col-md-3">
            <Moveable
              @user-click="startShape"
              :size="sizes[sizeIndex]"
              @drop="drop"
            />
          </div>

          <div class="col-md-6">
            <Table
              class="tablee"
              @drag-over="putColor"
              :tempColor="dragColorList"
              :boats="boats"
            />
          </div>
        </div>
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
import Moveable from "~/components/submarine/Moveable.vue";
import Table from "~/components/submarine/Table.vue";
import Chat from "~/components/submarine/Chat.vue";
import NameSelect from "~/components/submarine/NameSelect.vue";

export default {
  data() {
    return {
      status: "select", //start, select, play
      ws: null,
      channel: "",
      name: "",
      oponentName: "",
      dragColorList: [],
      startPosition: [],
      orientation: "",
      boats: [], //all boats placed in the
      sizes: [4, 3, 3, 2, 2, 2, 1, 1, 1, 1],
      sizeIndex: 0,
    };
  },
  components: {
    Moveable,
    Table,
    Chat,
    NameSelect,
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
    putColor(row, column) {
      var tempArray = [];
      for (let index = 0; index < this.sizes[this.sizeIndex]; index++) {
        if (this.orientation === "horizontal") {
          var temp = [row, column - this.startPosition[1] + 1 + index];
          tempArray.push(temp);
        } else if (this.orientation === "vertical") {
          var temp = [row - this.startPosition[0] + 1 + index, column];
          tempArray.push(temp);
        }
      }
      this.dragColorList = tempArray;
    },
    startShape(row, column, orientation) {
      this.startPosition = [row, column];
      this.orientation = orientation;
    },
    drop() {
      this.boats.push({
        size: this.sizes[this.sizeIndex],
        positions: this.dragColorList,
      });
      this.dragColorList = [];
      this.sizeIndex += 1

      if (this.sizeIndex===this.sizes.length){
          this.status = 'play'
        //   TODO wait for the player to finnish setup
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 50px;
}
</style>