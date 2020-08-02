<template>
  <div id="app">
      <Navbar />
    <div id="app-container">
      <router-view/>
    </div>
    <Footer />
  </div>
</template>


<script>
  import Navbar from './components/Navbar'
  import Footer from './components/Footer'
  
  export default {
    components: {
      Navbar,
      Footer
    },

    beforeCreate () {
      this.$store.dispatch('authenticate')
    }
  }  
</script>

<style>

</style>
