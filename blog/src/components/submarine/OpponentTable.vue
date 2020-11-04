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
        @click="doClickedField(index, index2)"
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
    color(row, column) {
      let posString = JSON.stringify([row, column]);

      //test if position in in miss list and leave early
      if (this.miss.includes(posString)) return "grey";

      if (posString in this.searchIndex) {        
        const boatId = this.searchIndex[posString]
        const boatStatus = this.hits[boatId].hit

        if (boatStatus==="full") return "red"

        if(boatStatus==="partial") return "yellow"
      }

      return "";
    },
    doClickedField(row, column) {
      this.$emit("i-choose", row, column);
    },
  },
  props: {
    hits: Object,
    miss: Array,
    searchIndex: Object,
  },
};
</script>