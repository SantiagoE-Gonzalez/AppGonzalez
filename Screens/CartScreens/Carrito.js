import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext } from 'react'

const Carrito = () => {

    return (
        <View>
            
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
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '500'
    },
})