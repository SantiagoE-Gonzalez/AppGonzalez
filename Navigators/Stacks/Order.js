import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Colors } from '../../Styles/Colors';
import OrdenesRealizadas from '../../Screens/OrderScreen/OrdenesRealizadas';
import DetalleDeCompra from '../../Screens/OrderScreen/DetalleDeCompra';
const OrdersNavigator = () => {
  const Stack = createNativeStackNavigator(); {/**Es la ruta inicial */ }

  return (
    <Stack.Navigator
      initialRouteName="Carrito"
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primaryColor },
        headerTintColor: Colors.primaryTextHintColor
      }}
    >
      <Stack.Screen name="OrdenesRealizadas" component={OrdenesRealizadas} options={{ title: "Ordenes realizadas", headerShown: true }} />{/** aunque se llame component, lo ubicamos en la carpeta de Screen. */}
      <Stack.Screen name="DetalleDeCompra" component={DetalleDeCompra} options={{ title: "Detalle de compra", headerShown: true }} />{/** aunque se llame component, lo ubicamos en la carpeta de Screen. */}
    </Stack.Navigator>
  )
}

export default OrdersNavigator