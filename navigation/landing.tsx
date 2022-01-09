// react
import React from "react";

// react-native
import { View } from "react-native";

// third-party
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from "@react-navigation/native";

// components
import { LandingScreen } from "../screens/landing";

export type Routes = {
    landing: undefined;
};

export type AuthNavigationProps<T extends keyof Routes> = {
    navigation: NativeStackNavigationProp<Routes, T>;
    route: RouteProp<Routes, T>;
};

const Stack = createNativeStackNavigator<Routes>();

const LandingNavigator = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="landing"
                component={LandingScreen}
                options={{
                    title: 'Todo List',
                }}
            />
        </Stack.Navigator>
    )
}

export default LandingNavigator;