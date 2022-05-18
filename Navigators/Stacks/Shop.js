import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Categorias from "../../Screens/Categorias";
import Detalle from "../../Screens/Detalle";
import Productos from "../../Screens/Productos";
import { Colors } from '../../Styles/Colors';
const ShopNavigator = () => {
    const Stack = createNativeStackNavigator(); {/**Es la ruta inicial */ }

    return (
        <Stack.Navigator
            initialRouteName="Categorias"
            screenOptions={{ headerStyle: { backgroundColor: Colors.primaryColor }, 
            headerTintColor: Colors.primaryTextHintColor }}
        >
            <Stack.Screen name="Categorias" component={Categorias} options={{ title: "Categorias", headerShown: true }} />{/** aunque se llame component, lo ubicamos en la carpeta de Screen. */}
            <Stack.Screen
                name="Productos"
                component={Productos}
                options={({ route }) => ({ title: route.params.category })}></Stack.Screen>
            <Stack.Screen
                name="Detalle"
                component={Detalle}
                options={({ route }) => ({ title: route.params.title })}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default ShopNavigator