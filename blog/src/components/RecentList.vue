<template>
    <div>
    

      <div v-for="(list,indexr) in split" :key="indexr" class="row">
        <div v-for="item in list" :key="item.node.id" class="col-lg-4 col-sm-6 portfolio-item">
          <div class="card h-100">
            <g-link :to="item.node.path"><g-image class="card-img-top" src="~/assets/images/pier.jpg" alt=""/></g-link>
            <div class="card-body">
              <h4 class="card-title">
                <g-link :to="item.node.path">{{item.node.title}}</g-link>
              </h4>
              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur eum quasi sapiente nesciunt? Voluptatibus sit, repellat sequi itaque deserunt, dolores in, nesciunt, illum tempora ex quae? Nihil, dolorem!</p>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>


<static-query>
query {
  allBlogPost(limit:6){
    edges{
      node{
        id
        title
        path
      }
    }
  }
}
</static-query>


<script>
export default {
    data () {
    return {
      columns: 3,
      rows: 2,
    }
  },
  computed:{
    split: function(){
      var all = this.$static.allBlogPost.edges
      var result = []
      for (let index = 0; index < this.rows; index++) {
        var chunks=this.columns
        var temp = all.slice(index*chunks,(index+1)*chunks)
        result.push(temp)
      }
      return result
    }
  }
}
</script>


<style scoped>
.portfolio-item {
  margin-bottom: 30px;
}
</style>