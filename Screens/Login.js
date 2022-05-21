import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/config';
import { Colors } from '../Styles/Colors';

const Login = () => {
    const [tengoUsuario, setTengoUsuario] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mensajeDeError, setMensajeDeError] = useState("");

    const changeExisteUsuarioStatus = () => {
        setTengoUsuario(!tengoUsuario);
    }

    /**
     * Se llama a este metodo cuando se presiona el boton de iniciarSesion/Registrarse.
     * Ya que es un solo botón que cambia de texto.
     * Dependiendo el estado de existeUsuario
     */
    const loginSingupAction = () => {
        if (tengoUsuario) {
            loginAction()
        } else {
            singupAction()
        }
    }

    /**
     * Tiene la logica del login con firebase.
     */
    const loginAction = () => {
        if (email !== "" && password != "") {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    // ...
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    setMensajeDeError(errorMessage);
                    setEmail("");
                    setPassword("");
                })
        }
    }

    /**
     * Accion de registrarse con firebase.
     */
    const singupAction = () => {
        if (email !== "" && password != "") {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    console.log(userCredential)
                    const user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    setMensajeDeError(errorMessage);
                    setEmail("");
                    setPassword("");
                })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>
                {tengoUsuario ? 'Iniciar sesión' : 'Registrarse'}
            </Text>
            <View style={styles.viewImagen}>

            </View>
            <View style={styles.item}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Ingresar email'
                    value={email}
                    onChangeText={setEmail}
                ></TextInput>
                <TextInput
                    style={styles.textInput}
                    placeholder='Ingresar contraseña'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                ></TextInput>
                <View style={styles.viewBotones}>
                    <TouchableOpacity style={styles.boton}
                        onPress={loginSingupAction}
                    >
                        <Text style={styles.textoBotones}>
                            {tengoUsuario ? 'Iniciar sesión' : 'Registrarme'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boton}
                        onPress={changeExisteUsuarioStatus}>
                        <Text style={styles.textoBotones}>
                            {tengoUsuario ? 'No tengo usuario' : 'Ya tengo usuario'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {mensajeDeError ?
                <View style={styles.viewAlert}>
                    <Text
                        style={styles.viewAlertText}
                    >{mensajeDeError}</Text>
                </View> : <View></View>
            }
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#e7e7e7',
        flex: 1,
        alignContent: 'center'
    }, textInput: {
        borderColor: Colors.primaryColor,
        backgroundColor: Colors.backgroundCardColor,
        color: '#000',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        margin:10
    },
    boton: {
        backgroundColor: Colors.primaryColor,
        margin: 10,
        padding: 10,
        borderRadius: 10,

    },
    textoBotones: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        color: Colors.primaryTextHintColor
    },
    headerTitle: {
        fontSize: 25,
        margin: 20,
        textAlign: 'center'
    }, stretch: {
        width: 200,
        height: 200,
        resizeMode: 'stretch',
    },
    viewImagen: {
        alignItems: 'center',
        width: '100%'
    },
    viewAlert: {
        backgroundColor: '#7f0000',
        padding: 10,
        borderRadius: 10,
        margin:10,
        alignItems: 'center'
    },
    viewAlertText: {
        color: '#fff',
        fontSize: 15
    }, item: {
        backgroundColor: Colors.backgroundCardColor,
        padding: 20,
        margin: 10,
        borderRadius: 10
    },
})