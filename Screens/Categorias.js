import { View, TouchableOpacity, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import React from 'react'
import { useEffect, useState } from 'react';

const Categorias = ({ navigation }) => {
    const [categorias, setCategorias] = useState([]);

    const irACategoria = (categoria) => {
        console.log(categoria);
        navigation.navigate('Productos', {
            category: categoria
        })
    }


    const renderItem = ({ item }) => (
        <Item title={item} />
    );
    const Item = ({ title }) => (
        <View>
            <TouchableOpacity style={styles.item}
                onPress={() => {
                    irACategoria(title)
                }}>
                <Text>{title}</Text>
            </TouchableOpacity>
        </View>

    );

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products/categories');
                const data = await response.json();
                setCategorias(data);
                console.log(categorias);
            } catch (error) {
                console.log(error);
            }
        })()
    }, []);
    return (
        <View>
            <FlatList
                data={categorias}
                renderItem={renderItem}
                keyExtractor={item => item}
            />
        </View>
    )
}

export default Categorias


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10
    },
    title: {
        fontSize: 32,
    },
    wrapperCustom: {
        borderRadius: 8,
        padding: 6
    }
});