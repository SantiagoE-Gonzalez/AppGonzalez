import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Categorias from "../Screens/Categorias.js";
import Detalle from "../Screens/Detalle";
import Productos from "../Screens/Productos";

/**
 * Es similar al Routing en React web
 * @returns 
 */
const MainNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
    <NavigationContainer>{/**Es la ruta inicial */  }
        <Stack.Navigator 
        initialRouteName="Categorias" 
        screenOptions={{ headerStyle: { backgroundColor: '#00b4d8' } }}
        >
            <Stack.Screen name = "Categorias" component={Categorias} options={{title: "Categorias"}}/>{/** aunque se llame component, lo ubicamos en la carpeta de Screen. */}
            <Stack.Screen name = "Productos" component={Productos} options={{title: "Productos"}}/>
            <Stack.Screen name = "Detalles" component = {Detalle} options={{title: "Detalle"}}/>
        </Stack.Navigator>
    </NavigationContainer>
    )
}

export default MainNavigator