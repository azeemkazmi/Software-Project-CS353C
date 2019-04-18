import React, { Component } from 'react';

var firebase = require ('firebase');

var config = {
    apiKey: "AIzaSyC0LZPZrs0BRdZoPi0IPsWAi9S8XNxMjNc",
    authDomain: "my-project-1542623734498.firebaseapp.com",
    databaseURL: "https://my-project-1542623734498.firebaseio.com",
    projectId: "my-project-1542623734498",
    storageBucket: "my-project-1542623734498.appspot.com",
    messagingSenderId: "917427983539"
  };
  firebase.initializeApp(config);

class Authen extends Component{

login(event){
const email = this.refs.email.value;
const password = this.refs.password.value;
console.log(email,password);

const auth = firebase.auth();
const promise = auth.signInWithEmailAndPassword(email, password);

//write a wellcome message
promise.then(user =>{
    var lout = document.getElementById('logout');
    lout.classList.remove('hide');
});

promise.catch(e =>{
    var err = e.message;
    console.log(err);
    this.setState({err: err});
});
}

signup () {
    const email = this.refs.email.value
    const password = this.refs.password.value
    const auth = firebase.auth()
    const promise = auth.createUserWithEmailAndPassword(email, password)
    promise
    .then(user => {
      let err = `Welcome ${user.user.email}`
      console.log(user)
      console.log(user.user.uid)
      firebase.database().ref('users/'+user.user.uid).set({
        email: user.user.email
      })
      console.log(user)
      this.setState({err: err})
    })
    .catch( e => {
      let err = e.message
      console.log(err)
      this.setState({err: err})
    })
  }

  logout(){
    firebase.auth().signOut();
    //write thanks message
    var lout = document.getElementById('logout');
    lout.classList.add('hide');
  }

  google(){
      console.log("google sigin");

      var provider = new firebase.auth.GoogleAuthProvider();
      var promise = firebase.auth().signInWithPopup(provider);

      promise.then(result =>{
              var user = result.user;
              console.log(result);
              firebase.database().ref('users/'+user.uid).set({
                  email: user.email,
                  name: user.displayName
              });
          });
     promise.catch(e =>{
         var msg = e.message;
         console.log(msg);
     });
  }
    constructor(props){
        super(props);
        this.state = {
            err: ''
        };
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.logout = this.logout.bind(this);
        this.google = this.google.bind(this);
    }
    render(){
        return(
        <div>
            <input id="email" ref="email" type ="email" placeholder="Enter your email"/>
            <br/>
            <input id="pass" ref="password" type ="password" placeholder="Enter your password"/>
            <br/>
            <p>{this.state.err}</p>
            <button onClick={this.login}>Log In</button>
            <button onClick={this.signup}>Sign Up</button>
            <button onClick={this.logout} id = "logout" className="hide">Log Out</button>
            <button onClick={this.google} id = "google" className="google">Sign In With Google</button>
        </div>
        );
    }
}
export default Authen;