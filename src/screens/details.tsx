/** @format */

import React, { FC } from "react";
import { View, Text } from "react-native";
import { ScreenStyles } from "../styles/screens";

const Details: FC = (props: any) => {
	return (
		<View testID="details" style={ScreenStyles.screen}>
			<Text> {props.route.params.item}</Text>
		</View>
	);
};

export default Details;
