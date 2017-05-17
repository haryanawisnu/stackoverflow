<template>
<div class="comment">
  <ul class="comments-list">
    <li v-for="(data,index) in answer" class="comment">
      <hr>
      <div class="comment-body text-left">
        <div class="alert alert-warning" id="warn" role="alert" style="display:none;">
          <button type=" button " class="close " data-dismiss="alert " aria-label="Close "><span aria-hidden="true ">&times;</span></button>
          <strong>WARNING!</strong>{{message}}
        </div>
        <div class="comment-heading ">
          <button @click="deletecoment(data.id) " type="button " class="close " aria-label="Close "><span aria-hidden="true ">&times;</span></button>
          <h4 class="user ">{{data.author.username}}</h4>
          <h5 class="time ">{{data.created}}</h5>
        </div>
        <p>{{data.description}}</p>
        <a @click="vote(true,data.id)" class="btn btn-default stat-item">
                      <i class="fa fa-thumbs-up icon"></i>{{up[index]}}
                  </a>
        <a @click="vote(false,data.id)" class="btn btn-default stat-item">
                              <i class="fa fa-thumbs-down icon"></i>{{down[index]}}
                          </a>
      </div>
      <hr>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'comment',
  data() {
    return {
      id: '',
      answer: [],
      database: '',
      action: '',
      user: '',
      message: '',
      down: [],
      up: []
    }
  },
  methods: {
    vote(params, id) {
      let self = this;
      axios.post('http://localhost:3000/vote', {
          id_obj: id,
          author: self.user._id,
          action: params
        })
        .then(function(response) {
          if (response.data.result) {
            console.log(self.id);
            self.database.ref('question/' + self.id).set({
              status: Math.floor((Math.random() * 999999999) + 1)
            });
          } else {
            console.log(response.data.result);
            alert('Anda sudah vote!');
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    seedData(params) {
      let self = this;
      axios.get('http://localhost:3000/question/' + params)
        .then(function(response) {
          self.answer = response.data.answer;
          self.answer.forEach(data => {
            axios.get('http://localhost:3000/vote/' + data.id)
              .then(function(response) {
                self.up.push(response.data.up);
                self.down.push(response.data.down);
              })
              .catch(function(error) {
                console.log(error);
              });
          })
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deletecoment(params) {
      let self = this;
      console.log(self.id + ',' + params + ',' + self.user._id);
      axios.delete('http://localhost:3000/question/sub/' + self.id + '/' + params + '/' + self.user._id)
        .then(function(response) {
          console.log(response);
          if (response.data.err) {
            self.message = response.data.message;
            $("#warn").fadeIn();
          } else {
            self.database.ref('question/' + self.id).set({
              status: Math.floor((Math.random() * 999999999) + 1)
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    let temp = localStorage.getItem('data');
    temp = JSON.parse(temp);
    this.user = temp;
    this.id = this.$store.state.params.detail._id;
    this.seedData(this.id);
    this.database = firebase.database();
    this.action = this.database.ref('question/' + this.id);
    var self = this
    this.action.on('value', function(snapshot) {
      self.seedData(self.id);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
}
</style>
