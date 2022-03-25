/** @format */

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import {
	FlatList,
	View,
	Text,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native";
import { ScreenStyles } from "../styles/screens";
import { routeProp } from "../types/navigation";

const Home: FC = () => {
	const [page, setPage] = useState<number>(0);
	const [data, setData] = useState<any[]>([]);

	const [loading, setLoading] = useState<boolean>(false);

	const navigation = useNavigation<NativeStackNavigationProp<routeProp>>();

	useEffect(() => {
		!loading && getData();
		const interval = setInterval(() => {
			incrementPage();
		}, 10000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		getData();
	}, [page]);

	function incrementPage() {
		!loading && setPage(page + 1);
	}

	function getData() {
		setLoading(true);
		axios
			.get(
				`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
			)
			.then((res) => {
				setData(Array.from(new Set([...data, ...res.data.hits])));
			})
			.finally(() => {
				setLoading(false);
			});
	}

	return (
		<View testID="home" style={ScreenStyles.screen}>
			<FlatList
				testID="home-list"
				data={data}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity
							style={ScreenStyles.item}
							onPress={() => {
								navigation.navigate("Details", {
									item: JSON.stringify(item, null, 4),
								});
							}}
						>
							<Text style={ScreenStyles.itemText1}>{item.created_at}</Text>
							<Text style={ScreenStyles.itemText2}>{item.url}</Text>
							<Text style={ScreenStyles.itemText1}>{item.author}</Text>
						</TouchableOpacity>
					);
				}}
				onEndReachedThreshold={0.5}
				onEndReached={incrementPage}
				ListFooterComponent={() => {
					if (loading) {
						return <ActivityIndicator />;
					} else return <View />;
				}}
			/>
		</View>
	);
};

export default Home;
