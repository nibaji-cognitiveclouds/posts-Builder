/** @format */

import React, { FC } from "react";
import { View, Text } from "react-native";

const Details: FC = (props: any) => {
	return (
		<View testID="details">
			<Text> {props.route.params.item}</Text>
		</View>
	);
};

export default Details;
