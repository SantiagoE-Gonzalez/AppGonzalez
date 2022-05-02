import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Categorias from "../../Screens/Categorias";
import Detalle from "../../Screens/Detalle";
import Productos from "../../Screens/Productos";

/**
 * Es similar al Routing en React web
 * @returns 
 */
const ShopNavigator = () => {
    const Stack = createNativeStackNavigator(); {/**Es la ruta inicial */  }
    return (
        <Stack.Navigator    
        initialRouteName="Categorias"
        screenOptions={{ headerStyle: { backgroundColor: '#ffb703' } ,headerTintColor: '#fff'}}
        >
            <Stack.Screen name = "Categorias" component={Categorias} options={{title: "Categorias", headerShown:true}}/>{/** aunque se llame component, lo ubicamos en la carpeta de Screen. */}
            <Stack.Screen name = "Productos" component={Productos} options={{title: "Productos", headerShown:true}}/>
            <Stack.Screen name = "Detalles" component = {Detalle} options={{title: "Detalle", headerShown:true}}/>
        </Stack.Navigator>
    )
}

export default ShopNavigator