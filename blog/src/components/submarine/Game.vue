<template>
  <div>
    <!-- helpfull message -->
    <p v-show="this.isPlaying" class="text-center h1">
      Your turn! Choose a field
    </p>
    <p v-show="!this.isPlaying" class="text-center h1">
      {{ opponentName }} is playing now
    </p>

    <!-- tables for playing -->
    <div class="row justify-content-center">
      <div v-show="this.isPlaying" class="col-md-6">
        <OpponentTable
          :miss="this.myMiss"
          :hits="this.myHits"
          @i-choose="this.doIChoose"
        />
      </div>

      <div v-show="!this.isPlaying" class="col-md-6">
        <MyTable :boats="this.fullBoats" :miss="this.miss" />
      </div>
    </div>


    <GameOver ref="go"/>
    <button @click="$refs.go.turnOn()">click me</button>

  </div>
</template>

<script>
import MyTable from "~/components/submarine/MyTable.vue";
import OpponentTable from "~/components/submarine/OpponentTable.vue";
import GameOver from "~/components/submarine/GameOver.vue";

export default {
  data() {
    return {
      isEndOfGame: false,
      isWinner: false,

      isPlaying: null,
      fullBoats: [
        //   {
        //       hit:[[8,7]],
        //       positions:[[8,7]],
        //   }
      ], //including hits
      miss: [
        //   [1,1]
      ], // array of miss positions

      //my tries
      myMiss: [
        // [1,1]
      ],
      myHits: {
        //   a:{
        //       positions:[[1,1],[1,2]],
        //       hit:"full",
        //   }
      },
    };
  },
  components: {
    MyTable,
    OpponentTable,
    GameOver,
  },
  props: {
    boats: Array,
    first: Boolean,
    playerName: String,
    opponentName: String,
    ws: WebSocket,
  },
  mounted() {
    this.ws.onmessage = this.recieveMessage;
    this.isPlaying = this.first;
    this.boats.forEach((boat) => {
      this.fullBoats.push({
        positions: boat.positions,
        hit: [],
      });
    });
  },
  methods: {
    recieveMessage(event) {
      var msg = JSON.parse(event.data);
      // console.log(msg);
      //check if guess made by opponent is good
      //massage in this case is just [row, column]
      if (this.isPlaying === false) {
        // verify that is is hit and return response in following format
        //{status:hit|miss, pos:[x,y], id:t, mode:"full|partial"}
        var result = this.checkIfHit(msg[0], msg[1]);
        this.ws.send(result);
      } else {
        //in this case i incorporate the results made by me
        if (msg.status === "miss") {
          this.myMiss.push(msg.pos);
          this.isPlaying = false;
        } else {
          //in case i have made hit
          if (msg.mode === "end") {
            //end of the game
            //TODO mark the end of the game
            console.log("kraj igreeeeee");
          }

          //in case i have hit it prevously
          else if (msg.id in this.myHits) {
            var tmp = { ...this.myHits[msg.id] };

            tmp.positions.push(msg.pos);
            tmp.hit = msg.mode;

            this.$set(this.myHits, `${msg.id}`, tmp);
          } else {
            //in case this is a new hit
            var tmp = {
              positions: [msg.pos],
              hit: msg.mode,
            };
            this.$set(this.myHits, `${msg.id}`, tmp);
          }
        }
      }
    },
    doIChoose(row, column) {
      //TODO put status is waiting to disable the input while waiting
      //send guess that i made and wait for response
      this.ws.send(JSON.stringify([row, column]));
    },
    checkIfHit(row, column) {
      for (let i = 0; i < this.fullBoats.length; i++) {
        const boat = this.fullBoats[i];
        for (let j = 0; j < boat.positions.length; j++) {
          const pos = boat.positions[j];
          if (row === pos[0] && column === pos[1]) {
            //register hit
            this.fullBoats[i].hit.push([[row, column]]);
            //check if it is full or partiral
            if (
              this.fullBoats[i].hit.length ===
              this.fullBoats[i].positions.length
            ) {
              // check if ed of the game
              if (this.isFinnished()) {
                //TODO finsih this
                console.log("kraaaaaaj");
                return JSON.stringify({
                  status: "hit",
                  mode: "end",
                });
              }
              return JSON.stringify({
                status: "hit",
                pos: [row, column],
                id: i,
                mode: "full",
              });
            } else {
              return JSON.stringify({
                status: "hit",
                pos: [row, column],
                id: i,
                mode: "partial",
              });
            }
          }
        }
      }

      this.miss.push([row, column]);
      this.isPlaying = true;
      return JSON.stringify({
        status: "miss",
        pos: [row, column],
      });
    },
    isFinnished() {
      for (let j = 0; j < this.fullBoats.length; j++) {
        const boat = this.fullBoats[j]; //select only object, i dont care about id
        if (boat.hit.length < boat.positions.length) return false;
      }
      return true;
    },
  },
};
</script>