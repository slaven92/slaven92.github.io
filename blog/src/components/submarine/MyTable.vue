<template>
  <div>
    <table class="table table-bordered table-sm">
      <tr v-for="index in num_of_fields" :key="index">
        <td
          v-for="index2 in num_of_fields"
          :key="index2 * (index + 2) * 1651"
          :style="'background:' + color(index, index2)"
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
      var col = "";
      for (let i = 0; i < this.boats.length; i++) {
        const boat = this.boats[i];
        for (let j = 0; j < boat.positions.length; j++) {
          const pos = boat.positions[j];
          //first find if the r,c is in the list of boats
          if (pos[0] === row && pos[1] === column) {
            //if yes it should be green
            col = "green";
            //if boat if fully sunk, that point should then be red
            if (this.areArraysSame(boat.positions, boat.hit)){
              col = "red";
            } else {//if it is only in the hit list it should be yellow
              for (let k = 0; k < boat.hit.length; k++) {
                const hitPos = boat.hit[k];
                if (hitPos[0][0] === row && hitPos[0][1] === column) {
                  col = "yellow";
                  break;
                }
              }
            }
            break; //break coz i found at least green
          }
        }
        //break if i found a position of wahtever color
        if (col !== "") break;
        //look through the miss array and put gray
        else{
            for (let p = 0; p < this.miss.length; p++) {
                const pos = this.miss[p];
                if (pos[0] === row && pos[1] === column) {
                    col='gray'
                    break
                }
            }
        }
      }
      return col;
    },
    areArraysSame(array1, array2){
      if (array1.length >= array2.length) return true
      return false
    }
  },
  props: {
    boats: Array,
    miss: Array
  },
};
</script>