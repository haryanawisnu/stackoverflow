<template>
<div class="groupquestion">
  <div v-for="question in list_question">
    <div class="post-preview text-left">
      <a @click="setparam(question)">
        <h2 class="post-title">{{question.title}}</h2>
      </a>
      <h3 class="post-subtitle">{{question.description}}</h3>
      <p class="post-meta">Posted by <b>{{question.author.username}}</b> on <b>{{converDate(question.created)}}</b></p>
    </div>
    <hr>
  </div>
</div>
</template>

<script>
export default {
  name: 'groupquestion',
  data() {
    return {
      list_question: []
    }
  },
  methods: {
    seedData() {
      let self = this;
      axios.get('http://localhost:3000/question')
        .then(function(response) {
          self.list_question = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    converDate(params) {
      var mydate = new Date(params);
      var month = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ][mydate.getMonth()];
      var str = mydate.getDate() + ' ' + month + ' ' + mydate.getFullYear();
      return str;
    },
    setparam(params) {
      this.$store.state.params.detail = params;
      this.$router.push('/question')
    }
  },
  created() {
    this.seedData();
    let self = this;
    self.database = firebase.database();
    var question = self.database.ref('question/');
    question.on('value', function(snapshot) {
      self.seedData();
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.post-preview>a {
  color: #333333;
}

.post-preview>a:hover,
.post-preview>a:focus {
  text-decoration: none;
  color: #0085A1;
}

.post-preview>a>.post-title {
  font-size: 30px;
  margin-top: 30px;
  margin-bottom: 10px;
}

.post-preview>a>.post-subtitle {
  margin: 0;
  font-weight: 300;
  margin-bottom: 10px;
}

.post-preview>.post-meta {
  color: #777777;
  font-size: 18px;
  font-style: italic;
  margin-top: 0;
}

.post-preview>.post-meta>a {
  text-decoration: none;
  color: #333333;
}

.post-preview>.post-meta>a:hover,
.post-preview>.post-meta>a:focus {
  color: #0085A1;
  text-decoration: underline;
}

@media only screen and (min-width: 768px) {
  .post-preview>a>.post-title {
    font-size: 36px;
  }
}
</style>
