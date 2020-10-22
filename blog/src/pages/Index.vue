<template>
  <Layout>

    <Carousel/>

    <div class="container">

      <h1 class="my-4">Recent posts</h1>

      <RecentList/>

    
      <!-- Learn how to use images here: https://gridsome.org/docs/images -->
      <g-image alt="Example image" src="~/favicon.png" width="135" />

      <h1>Hello, world!</h1>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur excepturi labore tempore expedita, et iste tenetur suscipit explicabo! Dolores, aperiam non officia eos quod asperiores
    </p>

    <p class="home-links">
      <a href="https://gridsome.org/docs/" target="_blank" rel="noopener">Gridsome Docs</a>
      <a href="https://github.com/gridsome/gridsome" target="_blank" rel="noopener">GitHub</a>
    </p>
    
    
    </div>
  </Layout>
</template>


<page-query>
query {
  allBlogPost{
    edges{
      node{
        title
        path
      }
    }
  }
}
</page-query>



<script>
import Carousel from '~/components/Carousel.vue'
import RecentList from '~/components/RecentList.vue'

export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  components: {
    Carousel,
    RecentList,
  }
}
</script>

<style scoped>
.home-links a {
  margin-right: 1rem;
}
</style>
