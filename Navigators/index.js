import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import ShopNavigator from '../Navigators/Stacks/Shop';
import OrdersNavigator from '../Navigators/Stacks/Order';
import CartNavigator from '../Navigators/Stacks/Cart';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const TabNavigator = () => {
    const Tab = createBottomTabNavigator();
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={ShopNavigator} options={{ headerShown: false }} />
                <Tab.Screen name="Ordenes" component={OrdersNavigator} options={{ headerShown: true }} />
                <Tab.Screen name="Carrito" component={CartNavigator} options={{ headerShown: true }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default TabNavigator