<template>
  <div class="table-book">
    <div class="row mt-3">
      <div class="col-lg-3 col-xs-12">
      <button v-if="isLogin" class="btn btn-outline-danger" data-toggle="modal" data-target="#addBookModal">Add Books</button>
      <p v-else>If you want to contribute. Please <strong>Login</strong> or <strong>create an account</strong>!</p>
      </div>
      <div class="col-lg-9 col-xs-12">
        <h2>List of Books!</h2>
        <table class="table table-borderless">
          <tbody v-for="(book, index) in books" :key="index">
            <tr>
              <td>
                <router-link class="bookTitle btn btn-link" :to="{ name: 'book', params: { id: book._id} }">{{book.title}}</router-link>
              </td>
              <td><img :src="book.image" :alt="book.image"></td>
              <td>Written by: <strong>{{book.author}}</strong></td>
              <td>Published by: <strong>{{book.publisher}}</strong></td>
              <td>
                <div class="col-12">
                  <label>Likes</label>
                </div>
                <div class="col-12">
                  {{book.likes.length}}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Add Modal -->
    <div class="modal fade" id="addBookModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Book</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control mt-3" placeholder="Title" v-model="title">
            <input type="text" class="form-control mt-3" placeholder="Author" v-model="author">
            <input type="text" class="form-control mt-3" placeholder="Publisher" v-model="publisher">
            <textarea class="form-control mt-3" placeholder="Short description about the book..." id="" cols="30" rows="10" v-model="description"></textarea>
            <label class="mt-3">Image:</label>
            <input class="form-control" type="file" ref="file" @change="onFilePicked" accept="image/*">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" v-on:click="addBook" data-dismiss="modal">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default{
  name: 'table-book',
  data () {
    return {
      title: '',
      author: '',
      publisher: '',
      description: '',
      file: ''
    }
  },
  computed: {
    ...mapState(['books', 'isLogin'])
  },
  created () {
    this.$store.dispatch('getAllBooks')
    let token = localStorage.getItem('token')
    if (token == null) {
      this.$store.commit('changeStatusFalse')
    } else {
      this.$store.commit('changeStatusTrue')
    }
  },
  methods: {
    onFilePicked () {
      this.file = this.$refs.file.files[0]
    },
    addBook () {
      let formData = new FormData()
      formData.append('img', this.file)
      formData.append('title', this.title)
      formData.append('author', this.author)
      formData.append('description', this.description)
      formData.append('publisher', this.publisher)
      formData.append('username', localStorage.getItem('username'))
      let bookInput = {
        token: localStorage.getItem('token'),
        data: formData
      }
      this.$store.dispatch('addNewBook', bookInput)
      this.reset()
    },
    reset () {
      this.author = ''
      this.description = ''
      this.publisher = ''
      this.title = ''
      this.file = ''
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table {
  margin-top: 3%
}
.bookTitle {
  font-size: 150%;
  font-weight:bold;
  width: 50%;
}
img {
  border: 1px solid grey
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
