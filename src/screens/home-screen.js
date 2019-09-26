
import React, { Component } from 'react'
import { Text, View, StyleSheet, Button} from 'react-native';
import Dialog, {DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';

class HomeScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
       visible: false,
    }  
 }

  llegadaPost(){
    fetch('http://192.168.1.2:3000/llegada', {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        "id": 43534,
        "llegada": 1 
      })
    })
  }
  
  render() { 
      return (
        <View style={styles.container}>
          <Button
            title= "Ya llegué"
            onPress={() => {
              this.setState({ 
                visible: true, 
              });
              this.llegadaPost()
            }}
          />
          <Dialog
            visible={this.state.visible}
            onTouchOutside={() => {
              this.setState({ visible: false });
            }}
          >
            <DialogContent>  
              <Text style={styles.item}>
                Al entrar al establecimiento, siga el camino iluminado de color verde
              </Text>
            </DialogContent>
          </Dialog>
        </View>
      )
    }
  }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 60,
  },
})

export default HomeScreen;
