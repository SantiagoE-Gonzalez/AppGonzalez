import { StyleSheet, Text, View, SafeAreaView, FlatList , TouchableOpacity} from 'react-native'
import React, { useContext } from 'react'
import { Shop } from '../../Context/ShopProvider'
import { Colors } from '../../Styles/Colors'

const OrdenesRealizadas = ({navigation}) => {
    const { ordenesRealizadas } = useContext(Shop)

    const irADetalleDeCompra = (item) => {
        navigation.navigate('DetalleDeCompra', {
            item: item
        })
    }

    const renderItem = ({ item }) => (
        <Item item={item} />
    );
    const Item = ({ item }) => (
        <View style={styles.item}>
            <Text>Compra nro: {item.id}</Text>
            <Text>Fecha de compra: {item.createdAt}</Text>
            <Text>Comprador: {item.buyer.nombre} {item.buyer.apellido}</Text>
            <TouchableOpacity style={styles.boton}
            onPress={() => irADetalleDeCompra(item)}>
                <Text style={styles.textoBoton}>Ver más detalles</Text>
            </TouchableOpacity>
        </View>
    );


   

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={ordenesRealizadas}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default OrdenesRealizadas

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowRadius: 10,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    description: {
        fontSize: 10,
        textAlign: 'left',
        fontWeight: '100'
    },
    boton: {
        backgroundColor: '#ffb703',
        margin: 10,
        padding: 10,
        borderRadius: 10
    },
    textoBoton: {
        textAlign: 'center',
        fontWeight: '500',
        color: '#fff'
    }

})