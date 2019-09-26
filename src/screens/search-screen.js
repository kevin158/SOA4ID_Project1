
import React, { Component } from 'react'
import { Text, View, StyleSheet, Button} from 'react-native';
import Dialog, {DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';

class SearchScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
       visible: false,
       reservada: "desocupada",
       mesaSeleccionada: 0, 
       estadoMesas: [],
       mesas: []  
    }  
 }
 
  componentDidMount() {
    fetch('http://172.18.204.2:3000/hello')
      .then(res => res.json())
      .then(mesas => this.setState({mesas}));    
  }

  reservarPost(mesaSeleccionada){
    fetch('http://172.18.204.2:3000/reservar', {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        "id": mesaSeleccionada,
        "estado": "ocupada" 
      })
    })
  }
  
  render() { 
      const { reservada } = this.state;
      this.state.estadoMesas  = this.state.mesas.map(function(item){return item.estado;});
      return (
        <View style={styles.container}>
          <Button
            title= "Mesa 1"
            onPress={() => {
              this.setState({ 
                visible: true, 
                mesaSeleccionada: 1, 
                reservada: this.state.estadoMesas[0]
              });
            }}
          />
          <Button
            title="Mesa 2"
            onPress={() => {
              this.setState({ 
                visible: true, 
                mesaSeleccionada: 2, 
                reservada: this.state.estadoMesas[1]
              });
            }}
          />
          {reservada == "desocupada" &&
            <Dialog
              visible={this.state.visible}
              onTouchOutside={() => {
                this.setState({ visible: false });
              }}
              footer={
                <DialogFooter>
                  <DialogButton
                    text="CANCEL"
                    onPress={() => {
                      this.setState({ visible: false });
                    }}
                  />
                  <DialogButton
                    text="OK"
                    onPress={() => {
                      this.reservarPost(this.state.mesaSeleccionada)
                    }}
                  />
                </DialogFooter>
              } 
            >
              <DialogContent>  
                <Text style={styles.item}>
                  ¿Está seguro(a) de reservar esta mesa?
                </Text>
              </DialogContent>
            </Dialog>
          }
          {reservada == "ocupada" &&
            <Dialog
              visible={this.state.visible}
              onTouchOutside={() => {
                this.setState({ visible: false });
              }}
            >
              <DialogContent>
                <Text style={styles.item}>
                  Esta mesa ya está reservada
                </Text>  
              </DialogContent>
            </Dialog>
          }
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
    height: 44,
  },
})

export default SearchScreen;
