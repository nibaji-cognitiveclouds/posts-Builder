/** @format */

import { StyleSheet } from "react-native";

export const ScreenStyles = StyleSheet.create({
	screen: {
		padding: 10,
		backgroundColor: "white",
	},
	item: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		marginVertical: 10,
		height: 150,
		width: "100%",
		flexWrap: "wrap",
	},
	itemText1: {
		width: "20%",
		borderWidth: 1,
		borderColor: "black",
		padding: 5,
		height: 100,
		flex: 1,
	},
	itemText2: {
		width: "50%",
		borderWidth: 1,
		borderColor: "black",
		padding: 5,
		height: 100,
		flex: 1,
		flexWrap: "wrap",
	},
});
