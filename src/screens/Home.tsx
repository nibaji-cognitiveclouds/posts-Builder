/** @format */

import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React from "react";
import {
	SafeAreaView,
	FlatList,
	View,
	Text,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native";

const Home: React.FC = () => {
	const [data, setData] = React.useState<{ title: string; author: string }[]>(
		[]
	);
	const [page, setPage] = React.useState<number>(0);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [bottomLoading, setBottomLoading] = React.useState<boolean>(false);

	const navigation = useNavigation();

	React.useEffect(() => {
		!loading && getData();
		const interval = setInterval(() => {
			!loading &&
				setPage((page) => {
					return page + 1;
				});
		}, 10000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	React.useEffect(() => {
		!loading && getData();
	}, [page]);

	function getData() {
		setLoading(true);
		axios
			.get(
				`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
			)
			.then((res) => {
				const theArray = Array.from(new Set([...data, ...res.data.hits]));
				setData(theArray);
			})
			.finally(() => {
				setLoading(false);
				setBottomLoading(false);
			});
	}

	function incrementPage() {
		setPage(page + 1);
	}

	return (
		<SafeAreaView>
			<FlatList
				data={data}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("Details", {
								item: JSON.stringify(item),
							});
						}}
						style={{ margin: 5, padding: 10 }}
					>
						<Text>{item.title}</Text>
						<Text> - {item.author}</Text>
					</TouchableOpacity>
				)}
				ListFooterComponent={() => {
					if (bottomLoading) {
						return <ActivityIndicator />;
					} else {
						return <View />;
					}
				}}
				onEndReachedThreshold={0.1}
				onEndReached={() => {
					!loading && incrementPage();
					setBottomLoading(true);
				}}
			/>
		</SafeAreaView>
	);
};

export default Home;
