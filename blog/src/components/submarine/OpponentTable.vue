<template>
  <div>
    <table class="table table-bordered table-sm">
      <tr v-for="index in num_of_fields" :key="index">
        <td
          v-for="index2 in num_of_fields"
          :key="index2 * (index + 2) * 1651"
          :style="'background:' + color(index, index2)"
          @click="doClickedField(index, index2)"
        >
          s
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num_of_fields: 10,
    };
  },
  methods: {
    color(row, column) {
      //test if position in in miss list and leave early
      for (let i = 0; i < this.miss.length; i++) {
        const pos = this.miss[i];
        if (pos[0] === row && pos[1] === column) {
          return "gray";
        }
      }

      //test if it is in the hit list
      var list = Object.entries(this.hits);
      for (let j = 0; j < list.length; j++) {
        const boat = list[j][1]; //select only object, i dont care about id
        //check if it is in the positions list
        for (let k = 0; k < boat.positions.length; k++) {
          const pos = boat.positions[k];
          if (pos[0] === row && pos[1] === column) {
            //if it is total hit it is red
            if(boat.hit === 'full') return "red";
            //if it is partial hit it is yellow
            if(boat.hit === 'partial') return "yellow";
          }
        }
      }

      return "";
    },
    doClickedField(row, column){
      this.$emit("i-choose", row, column)
    }
  },
  props: {
    hits: Object,
    miss: Array,
  },
};
</script>