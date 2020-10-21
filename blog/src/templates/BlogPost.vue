<template>
  <Layout>
    <div class="container">
      <div v-html="$page.blogPost.content" />
    </div>
    
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  blogPost(id: $id) {
    content
  }
}
</page-query>