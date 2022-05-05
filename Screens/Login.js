import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/config';

const Login = () => {
    const [existeUsuario, setExisteUsuario] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const changeExisteUsuarioStatus = () => {
        setExisteUsuario(!existeUsuario);
    }

    const loginSingupAction = () => {
        if (existeUsuario) {
            if (email !== "" && password != "") {
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        console.log(user);
                        // ...
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode, errorMessage);
                    })
                    .finally(() => {
                        setEmail("");
                        setPassword("");
                    })
            }
        } else {
            if (email !== "" && password != "") {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in 
                        console.log(userCredential)
                        const user = userCredential.user;
                        // ...
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode, errorMessage);
                        // ..
                    })
                    .finally(() => {
                        setEmail("");
                        setPassword("");
                    })
            }
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>
                {existeUsuario ? 'Iniciar sesión' : 'Registrarse'}
            </Text>
            <View style={styles.viewImagen}>
                <Image
                    style={styles.stretch}
                    source={require('../assets/login.png')}
                />
            </View>
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
                        {existeUsuario ? 'Iniciar sesión' : 'Registrarme'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton}
                    onPress={changeExisteUsuarioStatus}>
                    <Text style={styles.textoBotones}>
                        {existeUsuario ? 'No tengo usuario' : 'Ya tengo usuario'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e7e7e7',
        width: '100%',
        height: '100%',
        padding: 25,
        flex: 1,
        alignContent: 'center'
    },
    textInput: {
        backgroundColor: '#fff',
        margin: 10,
        padding: 10,
        borderRadius: 25
    },
    boton: {
        backgroundColor: '#ffb703',
        width: '40%',
        margin: 10,
        padding: 10,
        borderRadius: 25,

    },
    textoBotones: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        color: '#fff'
    },
    viewBotones: {
        alignItems: 'center',
        flexDirection: 'row',
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
    }
})