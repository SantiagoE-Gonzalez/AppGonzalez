import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert} from 'react-native'
import React, { useContext, useState } from 'react'
import { Shop } from '../../Context/ShopProvider'
import { Colors } from '../../Styles/Colors';
import { db } from '../../Firebase/config'
import { addDoc, collection, writeBatch, getDoc, doc } from 'firebase/firestore'

const FinalizarCompra = ({ navigation }) => {
    const { uid, clear, setCompraRealizadaOK } = useContext(Shop)

    const { totalAPagar, cantidadItems, cart } = useContext(Shop);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [loadingCheckout, setLoadingCheckout] = useState(false)

    const finalizarCompra = () => {
        if (nombre === "" || apellido === ""
            || email === "" || telefono === "") {
            Alert.alert(
                "Faltan completar campos",
                "Debés completar los campos nombre, apellido, email y teléfono",
                [
                    { text: "Aceptar", onPress: () => console.log("OK Pressed") }
                ]
            );
            return
        }
        const orderGenerada = {
            buyer: {
                nombre: nombre,
                apellido: apellido,
                email: email,
                telefono: telefono,
                direccion: direccion
            },
            items: cart
            ,
            total: totalAPagar,
            createdAt: new Date().toLocaleString(),
            uid: uid
        }

        //Primer paso: abrir un batch
        const batch = writeBatch(db)//ver en qué level colocarlo
        const outOfStock = []

        //Chequear el stock del producto en nuestra db y restarlo a la cantidad, si corresponde
        cart.forEach((prod) => {
            setLoadingCheckout(true)
            getDoc(doc(db, 'productos', prod.id))
                .then((documentSnapshot) => {
                    if (documentSnapshot.data().stock >= prod.cantidad) {
                        batch.update(doc(db, 'productos', documentSnapshot.id), {
                            stock: documentSnapshot.data().stock - prod.cantidad
                        })
                    } else {
                        outOfStock.push({ id: documentSnapshot.id, ...documentSnapshot.data() })
                    }
                    console.log(outOfStock);

                    if (outOfStock.length === 0) {
                        addDoc(collection(db, 'orders'), orderGenerada).then(({ id }) => {
                            batch.commit().then(() => {
                                clear();
                                limpiarFormulario();
                                setCompraRealizadaOK(true);
                                Alert.alert(
                                    "Orden generada con éxito",
                                    `La orden se realizó con éxito con el id+ ${id}`,
                                    [
                                        {
                                            text: "Aceptar", onPress: () => navigation.navigate('Carrito')
                                        }
                                    ]
                                );
                            })
                        }).catch((err) => {
                            Alert.alert(
                                "No se pudo realizar la compra",
                                `Error: ${err.message}`,
                                [
                                    { text: "Aceptar" }
                                ]
                            );
                            console.log(`Error: ${err.message}`);
                        })
                    } else {
                        let mensaje = ''
                        for (const producto of outOfStock) {
                            mensaje += `${producto.title} `
                        }
                        Alert.alert(
                            "Productos fuera de stock",
                            `Productos fuera de stock: ${mensaje}`,
                            [
                                { text: "Aceptar" }
                            ]
                        );
                        setCheckoutText(`Productos fuera de stock: ${mensaje}`)
                    }

                    setLoadingCheckout(false)
                })
        })
    }


    const limpiarFormulario = () => {
        setApellido("");
        setDireccion("");
        setEmail("");
        setNombre("");
        setTelefono("");
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.item}>
                <Text style={styles.title}>Resumen de compra</Text>
                <Text>Total a pagar: ${totalAPagar.toFixed(2)}</Text>
                <Text>Cantidad de artículos: {cantidadItems}</Text>
            </View>
            <Text style={styles.title}>Completá el formulario</Text>
            <View style={styles.item}>
                <Text style={styles.titleInputForm}>Nombre</Text>
                <TextInput
                    value={nombre}
                    onChangeText={setNombre}
                    style={styles.textInput}
                    placeholder="Nombre"
                    keyboardType="default"
                />
                <Text style={styles.titleInputForm}>Apellido</Text>
                <TextInput
                    value={apellido}
                    onChangeText={setApellido}
                    style={styles.textInput}
                    placeholder="Apellido"
                    keyboardType="default"
                />
                <Text style={styles.titleInputForm}>Correo Electrónico</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={styles.textInput}
                    placeholder="correo@electronic.com"
                    keyboardType="email-address"
                />
                <Text style={styles.titleInputForm}>Teléfono</Text>
                <TextInput
                    value={telefono}
                    onChangeText={setTelefono}
                    style={styles.textInput}
                    placeholder="1144444444"
                    keyboardType="phone-pad"
                />
                <Text style={styles.titleInputForm}>Dirección</Text>
                <TextInput
                    value={direccion}
                    onChangeText={setDireccion}
                    style={styles.textInput}
                    placeholder="Dirección"
                    keyboardType="default"
                />
            </View>
            <TouchableOpacity
                onPress={finalizarCompra}
                style={styles.botonFinalizarCompra}>
                <Text style={styles.textoBotonFinalizarCompra}>Finalizar compra</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default FinalizarCompra

const styles = StyleSheet.create({
    item: {
        backgroundColor: Colors.backgroundCardColor,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10
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
        backgroundColor: Colors.primaryColor,
        margin: 10,
        padding: 10,
        borderRadius: 10
    },
    textoBotonFinalizarCompra: {
        textAlign: 'center',
        fontWeight: '500',
        color: Colors.primaryTextHintColor
    },
    textInput: {
        borderColor: Colors.primaryColor,
        color: '#000',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
    titleInputForm: {
        color: Colors.primaryColor,
        fontWeight: 'bold'
    }

})