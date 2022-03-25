/** @format */

import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import {
	FlatList,
	View,
	Text,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native";

const Home: FC = () => {
	const [page, setPage] = useState<number>(0);
	const [data, setData] = useState<any[]>([]);

	const [loading, setLoading] = useState<boolean>(false);

	const navigation = useNavigation();

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
		<View testID="home" style={{ padding: 10 }}>
			<FlatList
				testID="home-list"
				data={data}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity
							style={{
								flexDirection: "row",
								justifyContent: "space-evenly",
								alignItems: "center",
								marginVertical: 10,
								height: 150,
								width: "100%",
								flexWrap: "wrap",
							}}
							onPress={() => {
								navigation.navigate("Details", {
									item: JSON.stringify(item, null, 4),
								});
							}}
						>
							<Text
								style={{
									width: "20%",
									borderWidth: 1,
									borderColor: "black",
									padding: 5,
									height: 100,
									flex: 1,
								}}
							>
								{item.created_at}
							</Text>
							<Text
								style={{
									width: "50%",
									borderWidth: 1,
									borderColor: "black",
									padding: 5,
									height: 100,
									flex: 1,
									flexWrap: "wrap",
								}}
							>
								{item.url}
							</Text>
							<Text
								style={{
									width: "20%",
									borderWidth: 1,
									borderColor: "black",
									padding: 5,
									height: 100,
									flex: 1,
								}}
							>
								{item.author}
							</Text>
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
