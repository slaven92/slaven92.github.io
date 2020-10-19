<template>
  <Layout>
    <div v-html="$page.blogPost.content" />
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  blogPost(id: $id) {
    content
  }
}
</page-query>