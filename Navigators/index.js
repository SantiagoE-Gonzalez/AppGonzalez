import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import ShopNavigator from '../Navigators/Stacks/Shop';
import OrdersNavigator from '../Navigators/Stacks/Order';
import CartNavigator from '../Navigators/Stacks/Cart';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../Screens/Login';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../Firebase/config';
const TabNavigator = () => {
    const [user, setUser] = useState(null);
    const Tab = createBottomTabNavigator();

    //Verificar usuario con useEffects.
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                // ...
            } else {
                setUser(null)
                // User is signed out
                // ...
            }
        });
    }, []);


    return (
        <NavigationContainer>
            {user ?
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={ShopNavigator} options={{ headerShown: false }} />
                    <Tab.Screen name="Ordenes" component={OrdersNavigator} options={{ headerShown: true }} />
                    <Tab.Screen name="Carrito" component={CartNavigator} options={{ headerShown: true }} />
                </Tab.Navigator>
                : <Login></Login>}
        </NavigationContainer>
    )
}

export default TabNavigator