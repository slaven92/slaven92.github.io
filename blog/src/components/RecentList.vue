<template>
    <div>
    

      <div v-for="(rowNum,indexr) in numberOfRows" :key="indexr*1000+1" class="row">
      <div v-for="(colNum,indexc) in numberOfColumns" :key="indexc*5000+1" class="col-lg-4 col-sm-6 portfolio-item">
        <div class="card h-100">
          <g-link :to="$static.allBlogPost.edges[indexc].node.path"><g-image class="card-img-top" src="~/assets/images/pier.jpg" alt=""/></g-link>
          <div class="card-body">
            <h4 class="card-title">
              <g-link :to="$static.allBlogPost.edges[indexc].node.path">{{$static.allBlogPost.edges[0].node.title}}</g-link>
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
      numberOfColumns: 2,
      numberOfRows: 1,
    }
  },
}
</script>


<style scoped>
.portfolio-item {
  margin-bottom: 30px;
}
</style>