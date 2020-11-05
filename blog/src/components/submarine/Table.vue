<template>
  <div>
    <div
      v-for="index in num_of_fields"
      :key="index"
      class="d-flex justify-content-center"
    >
      <div
        class="border p-1 p-sm-2 p-md-3"
        v-for="index2 in num_of_fields"
        :key="index2 * (index + 2) * 1651"
        @dragenter="doDragEnter($event, index, index2)"
        :style="'background:' + color(index, index2)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      num_of_fields: 10,
    };
  },
  props: {
    tempColor: Array,
    searchIndex: Object,
  },
  methods: {
    color(row, column) {
      

      if (this.tempColor.includes(JSON.stringify([row, column]))){


        //out of the box elements
        for (let i = 0; i < this.tempColor.length; i++) {
          const element = JSON.parse(this.tempColor[i]);
          if(element[0]<1 || element[0] > this.num_of_fields) return "red"
          if(element[1]<1 || element[1] > this.num_of_fields) return "red"
        }

        //overlaping elements
        if (JSON.stringify([row, column]) in this.searchIndex) return "red"

        return "green";
      }

      //find all the boats
      if (JSON.stringify([row, column]) in this.searchIndex) return "green";

      return "";
    },
    doDragEnter(event, row, column) {
      this.$emit("drag-over", row, column);
      event.preventDefault();
    },
  },
};
</script>

