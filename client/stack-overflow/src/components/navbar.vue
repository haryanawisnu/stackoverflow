<template>
<div class="navbar">
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a @click="tohome" class="navbar-brand" style="color:#ffffff;"><b>Tweet Overflow</b></a>
      </div>
      <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="nav navbar-nav navbar-right">
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <div v-if="status" class="navbar-form navbar-right" role="form">
              <div class="input-group">
                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                <input id="username" type="text" class="form-control" name="username" v-model="username" value="" placeholder="Username">
              </div>
              <div class="input-group">
                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                <input id="password" type="password" class="form-control" name="password" v-model="password" value="" placeholder="Password">
              </div>
              <button type="submit" class="btn btn-primary" @click="login">Login</button>
            </div>
            <div v-else class="navbar-form navbar-right" role="form">
              <a style="color:#ffffff;">I'm<b> {{messaage}}   &nbsp&nbsp</b></a>
              <button type="submit" class="btn btn-warning" @click="logout">Logout</button>
            </div>
          </div>
        </ul>
      </div>
    </div>
  </nav>
  <div class="alert alert-danger" id="loginfailed" role="alert" style="display:none;">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <strong>Login Failed!</strong> {{messaage}}.
  </div>
  <div class="alert alert-success" id="loginsuccess" role="alert" style="display:none;">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <strong>Welcome!</strong> {{messaage}}.
  </div>
  <div class="alert alert-success" id="logoutsuccess" role="alert" style="display:none;">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <strong>Bye!</strong> {{messaage}}.
  </div>
</div>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      username: '',
      password: '',
      messaage: '',
      status: true
    }
  },
  methods: {
    login() {
      if (this.validdata()) {
        var self = this;
        axios.post('http://localhost:3000/signin', {
            username: self.username,
            password: self.password
          })
          .then(function(response) {
            if (response.data.success) {
              localStorage.setItem('data', JSON.stringify(response.data.data));
              localStorage.setItem('token', response.data.token);
              self.messaage = response.data.data.username;
              $("#loginsuccess").fadeIn();
              self.status = false;
              self.reset();
              self.$router.push('/home')
            } else {
              self.messaage = response.data.message;
              $("#loginfailed").fadeIn();
              self.reset();
            }
          })
          .catch(function(error) {
            self.messaage = 'Try again.';
            $("#loginfailed").fadeIn();
            self.reset();
          });
      } else {
        this.messaage = 'input field.';
        $("#loginfailed").fadeIn();
        self.reset();
      }

    },
    logout() {
      // let temp = localStorage.getItem('data');
      // console.log(JSON.parse(temp));
      // this.messaage = temp.username;
      $("#logoutsuccess").fadeIn();
      this.status = true;
      localStorage.removeItem('data');
      localStorage.removeItem('token');
      this.$router.push('/')
    },
    reset() {
      this.username = '';
      this.password = '';
      setTimeout(function() {
        $("#loginfailed").hide();
      }, 2000);
      setTimeout(function() {
        $("#loginsuccess").hide();
      }, 2000);
      setTimeout(function() {
        $("#logoutsuccess").hide();
      }, 2000);
    },
    validdata() {
      if (this.username == '' || this.password == '') {
        return false;
      } else {
        return true;
      }
    },
    tohome() {
      this.$router.push('/home')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
