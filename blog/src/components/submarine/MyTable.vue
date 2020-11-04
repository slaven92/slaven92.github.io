<template>
  <div>
    <div
      class="d-flex justify-content-center"
      v-for="index in num_of_fields"
      :key="index"
    >
      <div
        class="border p-1 p-sm-2 p-md-3"
        v-for="index2 in num_of_fields"
        :key="index2 * (index + 2) * 1651"
        :style="'background:' + color(index, index2)"
      ></div>
    </div>
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
    //order is important
    color(row, column) {
      let posString = JSON.stringify([row, column]);
      //check if it is partial or full

      //check all miss vector
      if (this.miss.includes(posString)) return "grey";

      //there is a boat at posString check if it is hit or not
      if (posString in this.searchIndex) {
        let boatId = this.searchIndex[posString];

        if (boatId in this.hits) {
          //this deals with total
          if (
            this.hits[boatId].positions.length ===
            this.boats[boatId].positions.length
          )
            return "red";
          //this checks if it is partial
          if (this.hits[boatId].positions.includes(posString)) return "yellow";
        }
        //finaly return green for the boat
        return "green";
      }

      return "";
    },
  },
  props: {
    miss: Array,
    boats: Object,
    searchIndex: Object,
    hits: Object,
  },
};
</script>