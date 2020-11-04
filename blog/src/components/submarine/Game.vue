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
          :searchIndex="this.mySearchIndex"
          @i-choose="this.doIChoose"
        />
      </div>

      <div v-show="!this.isPlaying" class="col-md-6">
        <MyTable
          :miss="this.miss"
          :boats="this.boats"
          :searchIndex="this.searchIndex"
          :hits="this.hits"
        />
      </div>
    </div>

    <GameOver :name="this.calculatedName" ref="go" @user-game-over="$emit('user-game-over')" />
  </div>
</template>

<script>
import MyTable from "~/components/submarine/MyTable.vue";
import OpponentTable from "~/components/submarine/OpponentTable.vue";
import GameOver from "~/components/submarine/GameOver.vue";

export default {
  data() {
    return {
      isWinner: false,

      isPlaying: null,

      //guesses by opponent
      hits: {},
      miss: [],

      //guessed made by me
      mySearchIndex: {},
      myMiss: [],
      myHits: {},
    };
  },
  components: {
    MyTable,
    OpponentTable,
    GameOver,
  },
  props: {
    first: Boolean,
    playerName: String,
    opponentName: String,
    ws: WebSocket,
    boats: Object,
    searchIndex: Object,
  },
  computed:{
    calculatedName() {
      if(this.isWinner) return this.playerName
      return this.opponentName
    }
  },
  mounted() {
    this.ws.onmessage = this.recieveMessage;
    this.isPlaying = this.first;
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
        const tempResult = JSON.parse(result)
        if (tempResult.mode === "end") {
          this.isWinner = false;
          this.$refs.go.turnOn();
        }
      } else {
        //in this case i incorporate the results made by me
        if (msg.status === "miss") {
          this.myMiss.push(JSON.stringify(msg.pos));
          this.isPlaying = false;
        } else {
          //hit branch or end branch
          //add this point to the search index
          this.$set(this.mySearchIndex, JSON.stringify(msg.pos), `${msg.id}`);

          //in case i have made hit
          if (msg.mode === "end") {
            //end of the game
            //TODO mark the end of the game
            this.isWinner = true;
            this.$refs.go.turnOn();
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
      let posString = JSON.stringify([row, column]);

      //this is a hit
      if (posString in this.searchIndex) {
        let boatId = this.searchIndex[posString];

        //initialize
        let temp = [];
        if (boatId in this.hits) temp = this.hits[boatId].positions;

        temp.push(JSON.stringify([row, column]));
        this.$set(this.hits, `${boatId}`, {
          positions: temp,
        });

        //default is partial, but it could be full or end
        let mode = "partial";
        if (
          this.hits[boatId].positions.length ===
          this.boats[boatId].positions.length
        ) {
          mode = "end";
          //check if it is the end of the game
          for (const id in this.boats) {
            if (this.boats.hasOwnProperty(id)) {
              const boatPositionLength = this.boats[id].positions.length;

              if (!this.hits.hasOwnProperty(id)) {
                mode = "full";
                break;
              }

              if (boatPositionLength !== this.hits[id].positions.length) {
                mode = "full";
                break;
              }
            }
          }
        }

        return JSON.stringify({
          status: "hit",
          pos: [row, column],
          id: boatId,
          mode: mode,
        });
      }

      // finally it is a miss
      this.miss.push(JSON.stringify([row, column]));
      this.isPlaying = true;
      return JSON.stringify({
        status: "miss",
        pos: [row, column],
      });
    },
  },
};
</script>