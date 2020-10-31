<template>
  <div>
    <table class="table table-bordered table-sm">
      <tr v-for="index in num_of_fields" :key="index">
        <td
          v-for="index2 in num_of_fields"
          :key="index2 * (index + 2) * 1651"
          @dragover="$emit('drag-over', index, index2)"
          :style="background(index, index2)"
        >
          s
        </td>
      </tr>
    </table>
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
    boats: Array,
  },
  methods: {
    background(row, column) {
      var color = "";
      this.tempColor.forEach((element) => {
        if (element[0] === row && element[1] === column) {
          color = "background:green";
        }
      });
      this.boats.forEach((element) => {
        element.positions.forEach((pos) => {
          if (pos[0] === row && pos[1] === column) {
            color = "background:green";
          }
        });
      });
      return color;
    },
  },
};
</script>

