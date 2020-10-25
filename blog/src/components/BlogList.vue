<template>
  <div class="row">
    <div class="col-md-8">
      <!-- Blog Post -->
      <div
        class="card mb-4"
        v-for="blog in postList"
        :key="blog.node.id"
      >
        <g-image
          class="card-img-top"
          src="~/assets/images/pier.jpg"
          alt="Card image cap"
          height="750"
        />
        <div class="card-body">
          <h2 class="card-title">{{ blog.node.title }}</h2>
          <p class="card-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis
            aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam. Dicta
            expedita corporis animi vero voluptate voluptatibus possimus, veniam
            magni quis!
          </p>
          <g-link :to="blog.node.path" class="btn btn-primary"
            >Read More &rarr;</g-link
          >
        </div>
        <div class="card-footer text-muted">
          Posted on January 1, 2017 by
          <g-link href="/">Start Bootstrap</g-link>
        </div>
      </div>
      
    </div>

    <!-- Sidebar Widgets Column -->
    <SideBarBlog/>

  </div>
</template>

<script>

import SideBarBlog from "~/components/SideBarBlog.vue"

export default {
  components: {
    SideBarBlog,
  },
  props: ['postList']
}
</script>