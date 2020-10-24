<template>
  <Layout>
    <div class="container">

      <h1 class="mt-4 mb-3">
        {{ $page.blogPost.title }}
        <small
          >by
          <g-link to="/">Slaven</g-link>
        </small>
      </h1>

      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <g-link to="/">Home</g-link>
        </li>
        <li class="breadcrumb-item">
          <g-link to="/blog">Blog</g-link>
        </li>
        <li class="breadcrumb-item active">Blog Post</li>
      </ol>


      <div class="row">
        <div class="col-lg-8">
          <g-image class="img-fluid rounded" src="~/assets/images/light-bulb.jpg" alt="Light Bulb" height="750"/>
          <hr>

            <!-- Date/Time -->
            <p>Posted on January 1, 2017 at 12:00 PM</p>
          <hr>
        </div>
        
        <SideBarBlog/>

      </div>

      <div v-html="$page.blogPost.content" />
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  blogPost(id: $id) {
    content
    title
  }
}
</page-query>

<script>
import SideBarBlog from "~/components/SideBarBlog.vue"

export default {
  components: {
    SideBarBlog,
  }
}
</script>