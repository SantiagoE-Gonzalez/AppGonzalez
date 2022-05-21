import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useContext } from 'react'
import { Shop } from '../../Context/ShopProvider'

const Carrito = ({navigation}) => {
    const { cart, totalAPagar, cantidadItems, removeItem, clear } = useContext(Shop);
    
    const eliminarProducto = (item) => {
        removeItem(item)
    }

    const finalizarCompra = () => {
        navigation.navigate('FinalizarCompra')
    }

    const Item = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>

            <View>
                <Text>
                    Cantidad: {item.cantidad}
                </Text>
                <Text>
                    Precio unitario: ${item.price.toFixed(2)}
                </Text>
                <Text>
                    Precio total: ${(item.price * item.cantidad).toFixed(2)}
                </Text>
                <TouchableOpacity
                    onPress={() => eliminarProducto(item)}
                    style={styles.botonEliminarCompra}>
                    <Text style={styles.textoBotonEliminarCompra}>Eliminar producto</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item item={item} />
    );
    return (
        <SafeAreaView>
            {cantidadItems > 0 ?
                <View style={styles.item}>
                    <Text style={styles.title}>Resumen de compra</Text>
                    <Text>Total a pagar: ${totalAPagar.toFixed(2)}</Text>
                    <Text>Cantidad de artículos: {cantidadItems}</Text>
                </View> : 
                <Text style={styles.title}> Todavía no agregaste ningún producto</Text>
            }

            <FlatList
                data={cart}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            {cantidadItems > 0 ?
            <View>
                <TouchableOpacity
                    onPress={clear}
                    style={styles.botonEliminarCompra}>
                    <Text style={styles.textoBotonEliminarCompra}>Limpiar carrito</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={finalizarCompra}
                    style={styles.botonFinalizarCompra}>
                    <Text style={styles.textoBotonFinalizarCompra}>Finalizar compra</Text>
                </TouchableOpacity>
            </View>: <Text></Text>
            }
        </SafeAreaView>
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
        fontWeight: 'bold'
    },
    description: {
        fontSize: 10,
        textAlign: 'left',
        fontWeight: '100'
    },
    botonFinalizarCompra: {
        backgroundColor: '#ffb703',
        margin: 10,
        padding: 10,
        borderRadius: 10
    }, botonEliminarCompra: {
        backgroundColor: '#d90429',
        margin: 10,
        padding: 10,
        borderRadius: 10
    },
    textoBotonFinalizarCompra: {
        textAlign: 'center',
        fontWeight: '500',
        color: '#fff'
    },
    textoBotonEliminarCompra: {
        textAlign: 'center',
        fontWeight: '500',
        color: '#fff'
    }

})