import { Image, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { Shop } from '../../Context/ShopProvider';
import { Colors } from '../../Styles/Colors';


const Detalle = ({ navigation, route }) => {

    const { item } = route.params;
    const { addItem } = useContext(Shop);
    const [cantidadElegida, setCantidadElegida] = useState("1")
    const agregarAlCarrito = () => {
        if(parseInt(cantidadElegida)===0 || parseInt(cantidadElegida) > item.stock || 
            cantidadElegida < 1){
            Alert.alert(
                "La cantidad es erronea",
                "Verificá que la cantidad este entre los valores correctos.",
                [
                    { text: "Aceptar", onPress: () => console.log("OK Pressed") }
                ]
            );
        }else{
            addItem(item, parseInt(cantidadElegida));
            Alert.alert(
                "Se agregó con éxito",
                "Se agregó con éxito tu producto al carrito.",
                [
                    { text: "Aceptar", onPress: () => console.log("OK Pressed") }
                ]
            );
            navigation.navigate('Categorias')
        }
    }
    return (
        <View>
            <Text style={styles.title}>{item.title}</Text>
            <View
                style={styles.view}>
                <Image
                    resizeMethod='resize'
                    style={styles.stretch}
                    source={{
                        uri: item.image,
                    }}
                />
            </View>
            <View
                style={styles.view}>
                <Text>{item.description}</Text>
            </View>

            <View style={styles.view}>
                <Text style={styles.titleInputForm}>Ingresa cantidad (mínimo 1 - máximo {item.stock})</Text>
                <TextInput
                    value={cantidadElegida}
                    onChangeText={setCantidadElegida}
                    style={styles.textInput}
                    placeholder="Ingresar la cantidad"
                    keyboardType="number-pad"
                />
            </View>
            <TouchableOpacity
                style={styles.boton}
                onPress={agregarAlCarrito}
            ><Text style={styles.textoBoton}>AGREGAR AL CARRITO</Text></TouchableOpacity>

        </View>
    )
}

export default Detalle

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    stretch: {
        width: 100,
        height: 100,
    },
    view: {
        backgroundColor: Colors.backgroundCardColor,
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 10
    },
    title: {
        fontSize: 15,
        fontStyle: 'italic',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    boton: {
        backgroundColor: Colors.primaryColor,
        margin: 10,
        padding: 10,
        borderRadius: 10
    },
    textoBoton: {
        textAlign: 'center',
        fontWeight: '500',
        color: Colors.primaryTextHintColor
    },textInput: {
        borderColor: Colors.primaryColor,
        color: '#000',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
});