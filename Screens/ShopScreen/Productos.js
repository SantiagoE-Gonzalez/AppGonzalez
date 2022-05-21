import { View, Text, FlatList, TouchableOpacity, StyleSheet,SafeAreaView } from 'react-native'
import { useEffect, useState } from 'react';
import { FontsSizes } from '../../Styles/fonts';
import { Colors } from '../../Styles/Colors';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../Firebase/config';

const Productos = ({ navigation, route }) => {
    const { category } = route.params;
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        (async () => {
          try {
            try {
              let queryConsultaProductos = query(collection(db, "productos"));
              if(category){
                queryConsultaProductos = query(collection(db, "productos"), where("category", "==", category));
              }
              collection(db, "productos")
              const querySnapshot = await getDocs(queryConsultaProductos);
              const items = [];
              querySnapshot.forEach((doc) => {
                items.push({id: doc.id, ...doc.data()});
              });
              setProductos(items);
            } catch (error) {
              console.log(error);
            }
          } catch (error) {
            console.log(error);
          }
        })()
      }, [category]) 

    const irADetalle = (item) => {
        navigation.navigate('Detalle', {
            id: item.id,
            title: item.title,
            item: item,
        })
    }

    return (
        <SafeAreaView>
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
        </SafeAreaView>
    )
}

export default Productos

const styles = StyleSheet.create({
    item: {
        backgroundColor: Colors.colorBlanco,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10
    },
    title: {
        fontSize: FontsSizes.titleSize,
    },
    wrapperCustom: {
        borderRadius: 8,
        padding: 6
    }
});