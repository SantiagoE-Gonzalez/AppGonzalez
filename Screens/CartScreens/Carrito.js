import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useContext } from 'react'
import { Shop } from '../../Context/ShopProvider'

const Carrito = () => {
    const { cart , totalAPagar, cantidadItems } = useContext(Shop);

    const Item = (item) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          
          <View>
            <Text>
                Cantidad: {item.cantidad}
            </Text>
            <Text>
                Precio unitario: {item.price}
            </Text>
            <Text>
                Precio total: {item.price*item.cantidad}
            </Text>
          </View>
        </View>
      );

    const renderItem = ({ item }) => (
        <Item title={item.title} cantidad={item.cantidad} />
      );
    return (
        <View>
            <View style={styles.item}>
                <Text style={styles.title}>Resumen de compra</Text>
                <Text>Total a pagar: ${totalAPagar}</Text>
                <Text>Cantidad de artículos: {cantidadItems}</Text>
            </View>
            <FlatList
                data={cart}
                renderItem={renderItem}
                keyExtractor={item => item.title}
            />
        </View>
    )
}

export default Carrito

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
        fontWeight: '500'
    },
    description: {
        fontSize: 10,
        textAlign: 'left',
        fontWeight: '100'
    },
})