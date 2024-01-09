import React from "react-native";
import { View,Text} from "react-native";
import { style } from "../controller/functionComponent/ExternalStyle";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { Home } from "./Home";
import { Update } from "./Update";
const Stack =createNativeStackNavigator()
export const MainApp = ()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator
            initialRouteName="Login"
            >
                <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerTitleAlign:"center",
                    headerShown:false
                }}
                />
                <Stack.Screen
                name="Signup"
                component={Signup}
                />
                <Stack.Screen
                options={{
                    headerShown:false
                }}
                name="Home"
                component={Home}
                />
                <Stack.Screen
                name="Update"
                component={Update}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}