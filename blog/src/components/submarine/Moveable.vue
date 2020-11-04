<template>
  <div @click="switchOrientation" draggable @dragend="$emit('drop')">
    <div
      v-for="row in rows"
      :key="row * 5 + 1"
      class="d-flex justify-content-center"
    >
      <div
        class="border p-1 p-sm-2 p-md-3"
        v-for="column in columns"
        :key="column * 7 + 2"
        @mousedown="$emit('user-click', row, column, orientation)"
      ></div>
    </div>
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
    },
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

