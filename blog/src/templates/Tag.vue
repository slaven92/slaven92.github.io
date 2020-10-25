<template>
  <Layout>

    <div class="container">

      <!-- Page Heading/Breadcrumbs -->
      <h1 class="mt-4 mb-3">Blog Home
        <small>Most recent</small>
      </h1>

      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <g-link to="/index">Home</g-link>
        </li>
        <li class="breadcrumb-item">
          <g-link to="/blog">Blog</g-link>
        </li>
        <li class="breadcrumb-item active">Category - {{ $page.tag.title }}</li>
      </ol>

      <BlogList :postList="$page.tag.belongsTo.edges"/>
    
    
    </div>
  </Layout>
</template>


<page-query>
query Tag($id: ID!) {
  tag(id: $id) {
    title
    belongsTo {
      edges {
        node {
          ... on BlogPost {
            id
            title
            path
            content
          }
        }
      }
    }
  }
}

</page-query>



<script>
import BlogList from '~/components/BlogList.vue'

export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  components: {
    BlogList,
  }
}
</script>