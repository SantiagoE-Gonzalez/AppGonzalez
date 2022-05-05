import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react';

const Productos = ({ navigation, route }) => {
    const { category } = route.params;
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products/category/' + category);
                const data = await response.json();
                setProductos(data);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [category]);

    const irADetalle = (item) => {
        navigation.navigate('Detalle', {
            id: item.id,
            title: item.title,
            item: item,
        })
    }

    return (
        <View>
            <FlatList
                data={productos}
                renderItem={({ item }) => {
                    return <View><TouchableOpacity style={styles.item}
                        onPress={() => irADetalle(item)}
                    >
                        <Text>
                            {item.title}
                        </Text>
                        <Text>
                            ${item.price}
                        </Text>
                    </TouchableOpacity>
                    </View>
                }
                }
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )
}

export default Productos

const styles = StyleSheet.create({
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