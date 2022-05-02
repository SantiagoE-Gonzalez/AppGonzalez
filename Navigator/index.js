import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ShopNavigator from '../Navigator/Stacks/shop'
import OrdersNavigator from '../Navigator/Stacks/orders'

const TabNavigator = () => {
    const Tab = createBottomTabNavigator();

    return (
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={ShopNavigator} options={{headerShown:false}}/>
                    <Tab.Screen name="Ordenes" component={OrdersNavigator} options={{headerShown:false}} />
                </Tab.Navigator>
            </NavigationContainer>
    )
}

export default TabNavigator