import { View, TouchableOpacity, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import React from 'react'
import { useEffect, useState } from 'react';
import { collection, getDocs, query } from "firebase/firestore";
import { db } from '../Firebase/config';
const Categorias = ({ navigation }) => {
    const [categorias, setCategorias] = useState([]);

    const irACategoria = (categoria) => {
        console.log(categoria);
        navigation.navigate('Productos', {
            category: categoria
        })
    }

    useEffect(() => {
        (async () => {
            try {
                try {
                    let queryConsultaCategorias = query(collection(db, "categorias"));
                    collection(db, "categorias")
                    const querySnapshot = await getDocs(queryConsultaCategorias);
                    const items = [];
                    querySnapshot.forEach((doc) => {
                        console.log(doc.id, " => ", doc.data());
                        items.push({ id: doc.id, ...doc.data() });
                    });
                    console.log(items);
                    setCategorias(items);
                } catch (error) {
                    console.log(error);
                }
            } catch (error) {
                console.log(error);
            }
        })()
    }, []);
    return (
        <View>
            <FlatList
                data={categorias}
                renderItem={({ item }) => {
                    return <View><TouchableOpacity style={styles.item}
                        onPress={() => irACategoria(item.title)}
                    >
                        <Text>
                            {item.title}
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