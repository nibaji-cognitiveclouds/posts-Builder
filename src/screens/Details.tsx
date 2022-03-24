/** @format */

import React from "react";
import { View, Text } from "react-native";

const Details: React.FC = (props: any) => {
	return (
		<View testID="detail">
			<Text>{props.route.params.item}</Text>
		</View>
	);
};

export default Details;
