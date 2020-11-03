<template>
  <div>
    <p class="text-center h1">Your opponet is {{ opponent }}</p>

    <div v-if="this.opponentReady">
      <p class="text-center h3">{{ opponent }} is ready.</p>
    </div>
    <div v-else>
      <p class="text-center h3">{{ opponent }} is choosing positions.</p>
    </div>

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
</template>


<script>
import Moveable from "~/components/submarine/Moveable.vue";
import Table from "~/components/submarine/Table.vue";

export default {
  data() {
    return {
      boats: [], //final boats list

      // needed for the placing part of the game
      dragColorList: [],
      startPosition: [],
      orientation: "",
      sizes: [4, 3, 3, 2, 2, 2, 1, 1, 1, 1],
      sizeIndex: 0,

      //needed for final sync with other player
      opponentReady: false,
      playerReady: false,
    };
  },
  components: {
    Moveable,
    Table,
  },
  props: {
    ws: WebSocket,
    opponent: String,
  },
  methods: {
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
      this.sizeIndex += 1;

      if (this.sizeIndex === this.sizes.length) {
        this.playerReady = true;
        this.waitForOtherPlayer();
      }
    },
    waitForOtherPlayer() {
      if (this.opponentReady) {
        this.sendMessage("ready");
        this.syncd();
      } else {
        this.sendMessage("ready");
      }
    },
    recieveMessage(event) {
      var msg = event.data;
      if (msg === "ready") {
        this.opponentReady = true;
      }
      if (this.playerReady) {
        this.syncd();
      }
    },
    sendMessage(msg) {
      this.ws.send(msg);
    },
    syncd() {
      this.$emit("boats-choosen", this.boats);
      this.ws.onmessage = null;
    },
  },
  mounted() {
    this.ws.onmessage = this.recieveMessage;
  },
};
</script>