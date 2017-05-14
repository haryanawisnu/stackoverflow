<template>
<div class="question">
  <div class="container">
    <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
      <div class="panel panel-white post panel-shadow">
        <div class="post-description text-left">
          <h2><b>{{detail.title}}</b></h2>
          <p>{{detail.description}}</p>
          <div class="title h5">
            <a href="#"><b>{{detail.author.username}}</b></a> made a post.
          </div>
          <!-- <div class="stats">
            <a href="#" class="btn btn-default stat-item">
                        <i class="fa fa-thumbs-up icon"></i>2
                    </a>
            <a href="#" class="btn btn-default stat-item">
                                <i class="fa fa-thumbs-down icon"></i>2
                            </a>
          </div> -->
        </div>
        <div class="post-footer">
          <div class="input-group">
            <input class="form-control" placeholder="Add a comment" type="text">
            <span class="input-group-addon">
                        <a href="#"><i class="fa fa-paper-plane"></i></a>
                    </span>
          </div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'question',
  data() {
    return {
      detail: {}
    }
  },
  methods: {},
  created() {
    this.detail = this.$store.state.params.detail;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel-shadow {
  box-shadow: rgba(0, 0, 0, 0.3) 7px 7px 7px;
}

.panel-white {
  border: 1px solid #dddddd;
}

.panel-white .panel-heading {
  color: #333;
  background-color: #fff;
  border-color: #ddd;
}

.panel-white .panel-footer {
  background-color: #fff;
  border-color: #ddd;
}

.post .post-heading {
  height: 95px;
  padding: 20px 15px;
}

.post .post-heading .avatar {
  width: 60px;
  height: 60px;
  display: block;
  margin-right: 15px;
}

.post .post-heading .meta .title {
  margin-bottom: 0;
}

.post .post-heading .meta .title a {
  color: black;
}

.post .post-heading .meta .title a:hover {
  color: #aaaaaa;
}

.post .post-heading .meta .time {
  margin-top: 8px;
  color: #999;
}

.post .post-image .image {
  width: 100%;
  height: auto;
}

.post .post-description {
  padding: 15px;
}

.post .post-description p {
  font-size: 14px;
}

.post .post-description .stats {
  margin-top: 20px;
}

.post .post-description .stats .stat-item {
  display: inline-block;
  margin-right: 15px;
}

.post .post-description .stats .stat-item .icon {
  margin-right: 8px;
}

.post .post-footer {
  border-top: 1px solid #ddd;
  padding: 15px;
}

.post .post-footer .input-group-addon a {
  color: #454545;
}
</style>
