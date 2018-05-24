<template>
  <div class="bookDetail">
    <div class="bookBody">
      <img :src="detailBook.image">
      <label class="ml-5"><strong>Like: {{detailBook.likes.length}}</strong></label>
      <button class="btn btn-outline-primary ml-5" @click="likeBook">Like</button>
      <button class="btn btn-outline-danger ml-2" @click="unlikeBook">Unlike</button>
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th scope="row">Title</th>
            <td>{{detailBook.title}}</td>
          </tr>
          <tr>
            <th scope="row">Author</th>
            <td>{{detailBook.author}}</td>
          </tr>
          <tr>
            <th scope="row">Publisher</th>
            <td>{{detailBook.publisher}}</td>
          </tr>
          <tr>
            <th scope="row">Description</th>
            <td>{{detailBook.description}}</td>
          </tr>
        </tbody>
      </table>
      <button v-if="username === detailBook.user.username" class="btn btn-dark" @click="deleteBook">Delete Book</button>
      <h3 class="commentHeader mt-5">Comments:</h3>
      <div class="comments row" v-for="(comment, index) in detailBook.comments" :key="index">
        <div class="mt-3 commentBody">
            <p>{{comment.comment}}</p>
            <div class="detail pt-2">
              <p style="font-size: 12px">Posted by: <strong>{{comment.user.firstname}} {{comment.user.lastname}}</strong></p>
              <p style="font-size: 12px">At: <strong>{{comment.createdAt.getFullYear()}}-{{comment.createdAt.getMonth()}}-{{comment.createdAt.getDate()}} {{comment.createdAt.getHours()}}:{{comment.createdAt.getMinutes()}}:{{comment.createdAt.getSeconds()}}</strong></p>
              <button v-if="username === comment.username" style="font-size: 12px" class="btn btn-link" @click="deleteComment(comment._id)">Remove</button>
            </div>
          </div>
      </div>
      <textarea class="form-control mb-3" cols="20" rows="10" v-model="comment"></textarea>
      <button class="btn btn-outline-primary" @click="addComment">Add Comments</button>
      <table class="">

      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      username: localStorage.getItem('username'),
      comment: ''
    }
  },
  computed: {
    ...mapState(['detailBook', 'isLogin']),
  },
  beforeCreate () {
    this.$store.dispatch('getOneBook', this.$route.params.id)
  },
  methods: {
    likeBook () {
      let payload = {
        bookId: this.$route.params.id,
        token: localStorage.getItem('token')
      }
      this.$store.dispatch('likeBook', payload)
    },
    unlikeBook () {
      let payload = {
        bookId: this.$route.params.id,
        token: localStorage.getItem('token')
      }
      this.$store.dispatch('unlikeBook', payload)
    },
    addComment () {
      let commentPayload = {
        comment: this.comment,
        bookId: this.$route.params.id,
        token: localStorage.getItem('token')
      }
      this.$store.dispatch('addComment', commentPayload)
      this.comment = ''
    },
    deleteBook () {
      let deletePayload = {
        bookId: this.$route.params.id,
        token: localStorage.getItem('token')
      }
      this.$store.dispatch('deleteBook', deletePayload)
    }
  }
}
</script>

<style scoped>
table.table.table-bordered {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3%
}
textarea.form-control {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3%;
  resize: none
}
.commentBody {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3%;
  border: 1px solid grey
}
</style>
