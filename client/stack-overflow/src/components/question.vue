<template>
<div class="question">
  <div class="container">
    <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
      <div id="confirm" class="modal in" style="display: none;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">CONFIRM</h4>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete question?</p>
              <div class="row">
                <div class="col-12-xs text-center">
                  <button @click="deleteQuestion" class="btn btn-success btn-md">Yes</button>
                  <button class="btn btn-danger btn-md" data-dismiss="modal">No</button>
                </div>
              </div>
            </div>

          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
      <!-- /.modal -->
      <div class="panel panel-white post panel-shadow">
        <div class="post-description text-left">
          <h2><b>{{detail.title}}</b></h2>
          <input v-model="editvalue" v-if="editstatus" type="text" id="edit"><i @click="updatedesc" v-if="editstatus" class="btn btn-default fa fa-check-square" aria-hidden="true"></i>
          <p v-else="editstatus">{{editvalue}}</p>
          <div class="title h5">
            <a href="#"><b>{{detail.author.username}}</b></a> made a post.
          </div>
          <div class="stats">
            <a @click="vote(true)" class="btn btn-default stat-item">
                        <i class="fa fa-thumbs-up icon"></i>{{up}}
                    </a>
            <a @click="vote(false)" class="btn btn-default stat-item">
                                <i class="fa fa-thumbs-down icon"></i>{{down}}
                            </a>
            <a @click="editon" v-if="user._id==detail.author._id" class="btn btn-default">
                                                                  <i  class="fa fa-pencil-square-o icon"></i>
                                                              </a>
            <a v-if="user._id==detail.author._id" class="btn btn-default" data-toggle="modal" data-target="#confirm">
                                                  <i  class="fa fa-trash icon"></i>
                                              </a>
          </div>
        </div>
        <div class="post-footer">
          <div class="input-group">
            <input v-model="commentvalue" class="form-control" placeholder="Add a comment" type="text">
            <span class="input-group-addon">
                        <a @click="addComment" ><i class="fa fa-paper-plane"></i></a>
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
      detail: {},
      user: {},
      editstatus: false,
      editvalue: '',
      database: '',
      commentvalue: '',
      down: 0,
      up: 0
    }
  },
  methods: {
    vote(params) {
      let self = this;
      axios.post('http://localhost:3000/vote', {
          id_obj: self.detail._id,
          author: self.user._id,
          action: params
        })
        .then(function(response) {
          if (response.data.result) {
            self.database.ref('question/' + self.detail._id).set({
              status: Math.floor((Math.random() * 999999999) + 1)
            });
          } else {
            alert('Anda sudah vote!');
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteQuestion() {
      let self = this;
      axios.delete('http://localhost:3000/question/' + this.detail._id + '/' + this.user._id)
        .then(function(response) {
          console.log(response);
          $('#confirm').modal('toggle');
          self.$router.push('/home')
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    editon() {
      this.editstatus = true;
    },
    updatedesc() {
      let self = this;
      // console.log(self.detail._id + '/' + self.user._id);
      axios.put('http://localhost:3000/question/' + self.detail._id + '/' + self.user._id, {
          description: self.editvalue
        })
        .then(function(response) {
          self.database.ref('question/' + self.detail._id).set({
            status: Math.floor((Math.random() * 999999999) + 1)
          });
          self.editstatus = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    addComment() {
      if (this.validdata()) {
        let self = this;
        axios.post('http://localhost:3000/question/sub', {
            id: self.detail._id,
            userid: self.user._id,
            description: self.commentvalue
          })
          .then(function(response) {
            self.commentvalue = '';
            self.database.ref('question/' + self.detail._id).set({
              status: Math.floor((Math.random() * 999999999) + 1)
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        console.log('jangan kosong');
      }
    },
    validdata() {
      if (this.commentvalue == '') {
        return false;
      } else {
        return true;
      }
    },
    seedvote(params) {
      let self = this;
      axios.get('http://localhost:3000/vote/' + params)
        .then(function(response) {
          self.up = response.data.up;
          self.down = response.data.down;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cektoken(params) {
      if (!params) {
        this.$router.push('/')
      }
    }
  },
  created() {
    let token = localStorage.getItem('token');
    this.cektoken(token);
    let temp = localStorage.getItem('data');
    temp = JSON.parse(temp);
    this.user = temp;
    let self = this;
    self.detail = self.$store.state.params.detail;
    self.seedvote(self.detail._id);
    self.editvalue = self.detail.description;
    self.database = firebase.database();
    self.action = self.database.ref('question/' + self.detail._id);
    self.action.on('value', function(snapshot) {
      self.seedvote(self.detail._id);
    });
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
