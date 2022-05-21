import { Image, View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React, {useContext} from 'react'
import { Shop } from '../../Context/ShopProvider';
import { Colors } from '../../Styles/Colors';


const Detalle = ({ navigation, route }) => {

    const { item } = route.params;
    const {addItem} = useContext(Shop);

    const agregarAlCarrito = () => {
        addItem(item, 1);
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

            <View
                style={styles.boton}>
                <TouchableOpacity
                onPress={agregarAlCarrito}
                ><Text style={styles.textoBoton}>AGREGAR AL CARRITO</Text></TouchableOpacity>
            </View>

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
        marginVertical: 8,
        marginHorizontal: 16,
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
    }
});