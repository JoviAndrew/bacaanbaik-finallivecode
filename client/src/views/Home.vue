<template>
  <div class="home">
    <table-book msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import TableBook from '@/components/TableBook.vue'

export default {
  name: 'home',
  components: {
    TableBook
  }
}
</script>
