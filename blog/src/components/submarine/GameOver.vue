<template>
  <div>
    <button
      v-show="false"
      id="overButton"
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#exampleModal"
    >
      Launch demo modal
    </button>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      data-backdrop="static"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Game Over</h5>
          </div>
          <div class="modal-body">{{ name }} won!</div>
          <div class="modal-footer">
            <button
              @click="$emit('user-game-over')"
              type="button"
              class="btn btn-primary"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['name'],
  methods: {
    turnOn() {
      document.getElementById("overButton").click();
    },
  },
};
</script>