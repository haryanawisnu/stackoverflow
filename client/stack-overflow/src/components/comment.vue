<template>
<div class="comment">
  <ul class="comments-list">
    <li v-for="data in answer" class="comment">
      <div class="comment-body text-left">
        <div class="comment-heading">
          <h4 class="user">{{data.author.username}}</h4>
          <h5 class="time">{{data.created}}</h5>
        </div>
        <p>{{data.description}}</p>
        <!-- <a href="#" class="btn btn-default stat-item">
                    <i class="fa fa-thumbs-up icon"></i>2
                </a>
        <a href="#" class="btn btn-default stat-item">
                            <i class="fa fa-thumbs-down icon"></i>2
                        </a> -->
      </div>
    </li>
    <hr>
  </ul>
</div>
</template>

<script>
export default {
  name: 'comment',
  data() {
    return {
      answer: []
    }
  },
  methods: {

  },
  created() {
    this.answer = this.$store.state.params.detail.answer;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
}
</style>
