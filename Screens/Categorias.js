import React, { useState } from 'react';
import { StyleSheet, Button, Text, View, Modal, TouchableOpacity, Image } from 'react-native';
const Categorias = ({ navigation }) => { //recibir con destructuring la "navigation"
  const [modalVisible, setModalVisible] = useState(false);
  
  const a = () => {
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
  }

  const goToCategoria = () => {
    navigation.navigate('Productos', {
      category: 'categoryID'
    });
  }
  return (
    <>
      <View style={styles.view}>
        <TouchableOpacity onPress={goToCategoria} style={styles.appButtonContainer}>
          <Image source={require('../assets/pantalon.jpg')} style={styles.imagenBoton} />
          <Text style={styles.textoBoton}>Pantalones</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={a} style={styles.appButtonContainer}>
          <Image source={require('../assets/camisa.jpg')} style={styles.imagenBoton} />
          <Text style={styles.textoBoton}>Camisas</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.view}>
        <TouchableOpacity onPress={a} style={styles.appButtonContainer}>
          <Image source={require('../assets/remera.png')} style={styles.imagenBoton} />
          <Text style={styles.textoBoton}>Remeras</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={a} style={styles.appButtonContainer}>
          <Image source={require('../assets/zapatos.jpg')} style={styles.imagenBoton} />
          <Text style={styles.textoBoton}>Zapatos</Text>
        </TouchableOpacity>
       
      </View>
      <Modal
          animationType="fade"
          transparent={true}
          presentationStyle='overFullScreen'
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Button title="Soy un boton" onPress={closeModal}></Button>
            </View>
          </View>
        </Modal>
     
    </>
  )
}

export default Categorias

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
  },
  textoBoton: {
    color: "#000",
    fontWeight: "bold",
    alignSelf: "flex-end",
    marginTop: 25,
    textTransform: "uppercase",
    width: 100,
  },
  view: {
    width: 100,
    padding: 10,
    flexDirection: 'row'
  },
  imagenBoton: {
    height: 50,
    width: 50,
    alignSelf: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});