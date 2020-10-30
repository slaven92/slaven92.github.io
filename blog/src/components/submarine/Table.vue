<template>
    <div>
      <table class="table table-bordered table-sm">
        <tr v-for="index in num_of_fields" :key="index">
          <td v-for="index2 in num_of_fields" :key="index2*(index+2)*1651">
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
      num_of_fields: 10
    }
  }
}
</script>

<style scoped>
.square:before{
    content: "";
    display: block;
    padding-top: 100%;  /* initial ratio of 1:1*/
}
</style>

