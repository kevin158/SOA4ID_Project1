
import React from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput,
  TouchableOpacity 
} from "react-native";

import App2 from './App2';

export default class App1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      usuarioServer: '',
      passwordServer: '',
      usuarios: [],
      bandera: false
    };
  }

  signUp() {
    fetch('http://172.18.204.2:3000/user')
      .then(res => res.json())
      .then(usuarios => this.setState({usuarios}));  
  }

  getCredentials() {
    this.state.usuarioServer  = 
      this.state.usuarios.map(
        function(item){
          return item.userName;
        }
      );
      this.state.passwordServer  = 
      this.state.usuarios.map(
        function(item){
          return item.password;
        }
      );
      if (
          this.state.usuarioServer == this.state.userName &&
          this.state.passwordServer == this.state.password
      ) {console.log("aqui"); this.setState({bandera: true})}
  }

  render() {
    const { bandera } = this.state;
    if (!bandera) { 
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>SignUp</Text>
          <TextInput 
            style={styles.input}
            onChangeText={(userName) => this.setState({userName})}
            // value={this.state.userName}
            placeholder="Username"
          />
          <TextInput 
            style={styles.input}
            onChangeText={(password) => this.setState({password})}
            placeholder="Password"
            secureTextEntry
          />
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.userBtn}
              onPress={() => {
                this.signUp();
                this.getCredentials();
                console.log(this.state.usuarioServer);
                // alert("Signup Works");
              }}  
            >
              <Text style={styles.btnTxt}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } 
    else {
      return ( 
          <App2/>
      ); 
    }  
  }
}

const styles = StyleSheet.create({
  containerApp: {
    flex: 1,
    backgroundColor: "#fff"
  },  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0000'
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: '#fff'
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%"
  },
  userBtn: {
    backgroundColor: "#C0C0C0",
    padding: 15,
    width: "45%"
  },
  btnTxt: {
    fontSize: 18,
    textAlign: "center"
  }
});
