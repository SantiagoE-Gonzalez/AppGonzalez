import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'

const DetalleDeCompra = ({ route }) => {

  const { item } = route.params;
  console.log(item)

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
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item item={item} />
  );
  return (
    <SafeAreaView>
      <Text style={styles.title}>Datos del comprador</Text>
      <View style={styles.item}>
        <Text>Fecha: {item.createdAt}</Text>
        <Text>Nombre: {item.buyer.nombre}</Text>
        <Text>Apellido: {item.buyer.apellido}</Text>
        <Text>EMail: {item.buyer.email}</Text>
        <Text>Dirección: {item.buyer.direccion}</Text>
      </View>
      <Text style={styles.title}>Productos comprados</Text>
      <FlatList
        data={item.items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  )
}

export default DetalleDeCompra

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