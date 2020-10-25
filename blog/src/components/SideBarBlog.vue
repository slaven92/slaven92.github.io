<template>
    <div class="col-md-4">
      <!-- Search Widget -->
      <div class="card mb-4">
        <h5 class="card-header">Search</h5>
        <div class="card-body">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Search for..."
            />
            <span class="input-group-append">
              <button class="btn btn-secondary disabled" type="button">
                Go!
              </button>
            </span>
          </div>
        </div>
      </div>

      <!-- Categories Widget -->
      <div class="card my-4">
        <h5 class="card-header">Categories</h5>
        <div class="card-body">
          <div class="row">
            <div class="col-lg-6" v-for="(list,index) in split" :key="index">
              <ul class="list-unstyled mb-0">
                <li v-for="(item,index2) in list" :key="index2" >
                  <g-link :to="item.node.path">{{ item.node.title }}</g-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Side Widget -->
      <div class="card my-4">
        <h5 class="card-header">Side Widget</h5>
        <div class="card-body">
          You can put anything you want inside of these side widgets. They are
          easy to use, and feature the new Bootstrap 4 card containers!
        </div>
      </div>
    </div>
</template>


<static-query>
query{
  allTag{
    totalCount
    edges{
      node{
        title
        path
      }
    }
  }
}
</static-query>

<script>
export default {
  data() {
    return{
      columns: 2,
    }
  },
  computed:{
    split: function(){
      var all = this.$static.allTag.edges
      var result = []
      for (let index = 0; index < this.columns; index++) {
        var chunks=all.length/this.columns
        var temp = all.slice(index*chunks,(index+1)*chunks)
        result.unshift(temp)
      }
      return result
    }
  }
}
</script>