import { Image, View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'

const Detalle = ({ navigation, route }) => {

    const { item } = route.params;

    return (
        <View>
            <Text style={styles.title}>{item.title}</Text>
            <View
                style={styles.view}>
                <Image
                    resizeMethod='resize'
                    style={styles.stretch}
                    source={{
                        uri: item.image,
                    }}
                />
            </View>
            <View
                style={styles.view}>
                <Text>{item.description}</Text>
            </View>

            <View
                style={styles.view}>
                <Button title={'Agregar al carrito'}></Button>
            </View>

        </View>
    )
}

export default Detalle

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    stretch: {
        width: 100,
        height: 100,
    },
    view: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10
    },
    title: {
        fontSize: 15,
        fontStyle: 'italic',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    }
});