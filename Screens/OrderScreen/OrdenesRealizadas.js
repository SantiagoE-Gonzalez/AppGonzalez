import { StyleSheet, Text, View, SafeAreaView, FlatList , TouchableOpacity,} from 'react-native'
import React, {useContext} from 'react'
import { Shop } from '../../Context/ShopProvider'
import { Colors } from '../../Styles/Colors'

const OrdenesRealizadas = ({navigation}) => {
    //const [ordenesRealizadas, setOrdenesRealizadas] = useState([])
    const {ordenesRealizadas} = useContext (Shop)
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
                <Text style={styles.textoBoton}>VER MÁS DETALLES</Text>
            </TouchableOpacity>
        </View>
    );


   

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {ordenesRealizadas.length === 0 ? 
            <Text style={styles.title}>Aún no hay ordenes. Si realizás una compra la visualizarás acá.</Text>:
            <FlatList
                data={ordenesRealizadas}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />}
        </SafeAreaView>
    )
}

export default OrdenesRealizadas

const styles = StyleSheet.create({
    item: {
        backgroundColor: Colors.backgroundCardColor,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
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

})