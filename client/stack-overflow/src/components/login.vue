<template>
<div class="index">
  <div>
    <div class="container">
      <div class="col-md-6">
        <div class="alert alert-success" id="signupsuccess" role="alert" style="display:none;">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <strong>Success Signup!</strong> next login.
        </div>
        <div class="alert alert-warning" id="signupwarning" role="alert" style="display:none;">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <strong>Warning!</strong> input field.
        </div>
        <div id="logbox">
          <h1>Create an Account</h1>
          <input v-model="username" name="username" type="text" placeholder="Username" required="required" class="input pass" />
          <input v-model="email" name="email" type="email" placeholder="Email address" required="required" class="input pass" />
          <input v-model="password" name="password" type="password" placeholder="Choose a password" required="required" class="input pass" />
          <input @click="signup" type="submit" value="Signup!" class="inputButton" />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signup() {
      if (this.validdata()) {
        var self = this;
        axios.post('http://localhost:3000/signup', {
            username: self.username,
            email: self.email,
            password: self.password
          })
          .then(function(response) {
            console.log(response);
            self.reset();
            $("#signupsuccess").fadeIn();
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.reset();
        $("#signupwarning").fadeIn();
      }

    },
    reset() {
      this.username = '';
      this.password = '';
      this.email = '';
      setTimeout(function() {
        $("#signupsuccess").hide();
      }, 2000);
      setTimeout(function() {
        $("#signupwarning").hide();
      }, 2000);
    },
    validdata() {
      if (this.username == '' || this.password == '' || this.email == '') {
        return false;
      } else {
        return true;
      }
    }

  },
  created() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
::selection {
  background-color: #b5e2e7;
}

 ::-moz-selection {
  background-color: #8ac7d8;
}

body {
  background: #3CC;
}

.container {
  display: -webkit-flex;
  display: flex;
  height: 100%;
}

#logbox {
  padding: 10px;
  margin: 50px auto;
  width: 340px;
  background-color: #fff;
  -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
}

h1 {
  text-align: center;
  font-size: 175%;
  color: #757575;
  font-weight: 300;
}

h1,
input {
  font-family: "Open Sans", Helvetica, sans-serif;
}

.input {
  width: 75%;
  height: 50px;
  display: block;
  margin: 0 auto 15px;
  padding: 0 15px;
  border: none;
  border-bottom: 2px solid #ebebeb;
}

.input:focus {
  outline: none;
  border-bottom-color: #3CC !important;
}

.input:hover {
  border-bottom-color: #dcdcdc;
}

.input:invalid {
  box-shadow: none;
}

.pass:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px white inset;
}

.inputButton {
  position: relative;
  width: 85%;
  height: 50px;
  display: block;
  margin: 30px auto 30px;
  color: white;
  background-color: #3CC;
  border: none;
  -webkit-box-shadow: 0 5px 0 #2CADAD;
  -moz-box-shadow: 0 5px 0 #2CADAD;
  box-shadow: 0 5px 0 #2CADAD;
}

.inputButton:hover {
  top: 2px;
  -webkit-box-shadow: 0 3px 0 #2CADAD;
  -moz-box-shadow: 0 3px 0 #2CADAD;
  box-shadow: 0 3px 0 #2CADAD;
}

.inputButton:active {
  top: 5px;
  box-shadow: none;
}

.inputButton:focus {
  outline: none;
}

.navbar-brand {
  font-size: xx-large;
  font-weight: bold;
  font-family: cursive;
}
</style>
