import React, {useContext} from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Categorias from "../../Screens/ShopScreen/Categorias";
import Detalle from "../../Screens/ShopScreen/Detalle";
import Productos from "../../Screens/ShopScreen/Productos";
import { Colors } from '../../Styles/Colors';
import { Button } from 'react-native';
import { Shop } from '../../Context/ShopProvider';
const ShopNavigator = () => {
    const Stack = createNativeStackNavigator(); {/**Es la ruta inicial */ }
    const {cerrarSesion} = useContext(Shop)
    return (
        <Stack.Navigator
            initialRouteName="Categorias"
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primaryColor },
                headerTintColor: Colors.primaryTextHintColor
            }}
        >
            <Stack.Screen name="Categorias" component={Categorias}
                options={{ title: "Categorias", headerShown: true,
                headerRight: () => (
                    <Button
                      onPress={cerrarSesion}
                      title="Cerrar Sesión"
                      color={Colors.primaryColor}
                    />
                  ), }} />{/** aunque se llame component, lo ubicamos en la carpeta de Screen. */}
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