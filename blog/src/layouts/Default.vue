<template>
  <div>

    <Header/>

    <slot/>

    <Footer/>
  
  </div>

</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style>
body {
  padding-top: 56px;
}
</style>