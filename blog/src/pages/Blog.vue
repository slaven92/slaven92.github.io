<template>
  <Layout>

    <div class="container">

      <!-- Page Heading/Breadcrumbs -->
      <h1 class="mt-4 mb-3">Blog Home
        <small>Most recent</small>
      </h1>

      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <g-link to="/">Home</g-link>
        </li>
        <li class="breadcrumb-item active">Blog Home</li>
      </ol>

      <BlogList :postList="$page.allBlogPost.edges"/>

      <div  class="row">
        <div class="col-md-8">
          <Pager :info="$page.allBlogPost.pageInfo" linkClass="page-link" class="pagination justify-content-center mb-4"/>
        </div>
      </div>
    
    </div>
  </Layout>
</template>


<page-query>
query ($page: Int){
  allBlogPost(perPage:10, page: $page) @paginate{
    pageInfo {
      totalPages
      currentPage
    }
    edges{
      node{
        title
        path
        date
      }
    }
  }
}
</page-query>



<script>
import BlogList from '~/components/BlogList.vue'
import { Pager } from 'gridsome'

export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  components: {
    BlogList,
    Pager,
  },
}
</script>