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
          :searchIndex="searchIndex"
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
      boats:{}, //new final boats list
      searchIndex:{}, //searchindex for boats

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
    // calculate the vector on the table for the current boat
    //TODO make it red if they overlap
    putColor(row, column) {
      var tempArray = [];
      for (let index = 0; index < this.sizes[this.sizeIndex]; index++) {
        if (this.orientation === "horizontal") {
          var temp = [row, column - this.startPosition[1] + 1 + index];
          tempArray.push(JSON.stringify(temp));
        } else if (this.orientation === "vertical") {
          var temp = [row - this.startPosition[0] + 1 + index, column];
          tempArray.push(JSON.stringify(temp));
        }
      }
      this.dragColorList = tempArray;
    },
    startShape(row, column, orientation) {
      this.startPosition = [row, column];
      this.orientation = orientation;
    },

    //on relese populate the boats and the searchIndex state
    //and clear the temp vector
    drop() {

      this.boats[`${this.sizeIndex}`] = {
        positions: this.dragColorList,
        size: this.sizes[this.sizeIndex],
      }

      for (let i = 0; i < this.dragColorList.length; i++) {
        const pos = this.dragColorList[i];
        this.searchIndex[pos] = this.sizeIndex
      }



      this.dragColorList = [];
      this.sizeIndex += 1;

      if (this.sizeIndex === this.sizes.length) {
        this.playerReady = true;
        this.waitForOtherPlayer();
      }
    },

    //functions to sync up players after they have finished their choices
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

    //emit that everything is ready
    syncd() {
      this.$emit("boats-choosen", this.boats, this.searchIndex);
      this.ws.onmessage = null;
    },
  },
  mounted() {
    this.ws.onmessage = this.recieveMessage;
  },
};
</script>