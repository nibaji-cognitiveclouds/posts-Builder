/** @format */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Details from "../screens/Details";
import Home from "../screens/Home";

const AppNav: React.FC = () => {
	const Stack = createNativeStackNavigator();
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name={"Home"} component={Home} />
				<Stack.Screen name={"Details"} component={Details} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNav;
