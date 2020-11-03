<template>
    <footer class="py-3 bg-dark mt-5">
        <div class="container">
            <p class="m-0 text-center text-white norris">{{ fact }}</p>
        </div>
        <div class="container">
            <p class="m-0 text-center text-white">Copyright &copy; Slaven Tepsic 2020</p>
        </div>
  </footer>
</template>


<script>

import axios from 'axios'

export default {
  data () {
    return {
      fact: null
    }
  },
  async mounted () {
    try {
      const results = await axios.get(
        "https://api.chucknorris.io/jokes/random"
      )

      this.fact = results.data.value
    } catch (error) {
      console.log(error)
    }
  }
}
</script>