<template>
  <div>
    <table
      class="table table-bordered table-sm"
      @click="switchOrientation"
      draggable
      @dragend="$emit('drop')"
    >
      <tr v-for="row in rows" :key="row * 5 + 1">
        <td
          v-for="column in columns"
          :key="column * 7 + 2"
          @mousedown="$emit('user-click', row, column, orientation)"
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
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0,
        origX: undefined,
        origY: undefined,
      },
      orientation: "horizontal",
    };
  },
  props: {
    size: {
      default: 0,
    }
  },
  computed: {
    rows() {
      if (this.orientation === "horizontal") {
        return 1;
      } else {
        return this.size;
      }
    },
    columns() {
      if (this.orientation === "horizontal") {
        return this.size;
      } else {
        return 1;
      }
    },
  },
  methods: {
    switchOrientation() {
      this.orientation =
        this.orientation === "vertical" ? "horizontal" : "vertical";
    },
  },
};
</script>

