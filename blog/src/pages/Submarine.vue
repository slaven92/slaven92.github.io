<template>
  <Layout>
    <div class="container">
      <!-- choose name and connect part of the game -->
      <div v-if="status === 'start'">
        <NameSelect @player-connected="doPlayerConnected" />
      </div>

      <!-- select part of the game -->
      <div v-else-if="status === 'select'">
        <ChooseBoats
          @boats-choosen="doBoatsChoosen"
          :ws="this.ws"
          :opponent="this.opponentName"
        />
      </div>

      <!-- play part of the game -->
      <div v-else-if="status === 'play'">
        <Game
          @user-game-over="doGameOver"
          :first="this.playsFirst"
          :boats="this.boats"
          :playerName="this.name"
          :opponentName="this.opponentName"
          :ws="this.ws"
          :searchIndex="this.searchIndex"
        />
      </div>

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
import Game from "~/components/submarine/Game.vue";

export default {
  data() {
    return {
      // important states
      status: "start", //start, select, play
      ws: null,
      name: "",
      opponentName: "",
      playsFirst: false,

      boats:{},
      searchIndex: {},
    };
  },
  components: {
    Chat,
    NameSelect,
    ChooseBoats,
    Game,
  },
  methods: {
    doBoatsChoosen(boats, searchIndex) {
      this.boats = boats;
      this.searchIndex = searchIndex;
      this.status = "play";
    },

    doPlayerConnected(ws, playerName, opponentName, playsFirst) {
      this.name = playerName;
      this.opponentName = opponentName;
      this.ws = ws;
      this.playsFirst = playsFirst;
      this.status = "select";
    },
    doGameOver(){
      location.reload(); 
    }
  },
};
</script>

<style scoped>
.container {
  margin-top: 50px;
}
</style>