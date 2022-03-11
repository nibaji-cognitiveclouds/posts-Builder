/** @format */

import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { http } from "../const/https";

const Home = () => {
	const [data, setData] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [showHeaderLoader, setShowHeaderLoader] = React.useState(false);
	const [showFooterLoader, setShowFooterLoader] = React.useState(false);

	React.useEffect(() => {
		getData();
		theTimer(true);
	}, []);

	function getData(toTop: Boolean = false) {
		http
			.get(`v1/search_by_date?tags=story&page=${page}`)
			.then((res) => {
				const theArray = toTop
					? Array.from(new Set([...res.data.hits, ...data]))
					: Array.from(new Set([...data, ...res.data.hits]));
				setData(theArray);
			})
			.finally(() => {
				setShowHeaderLoader(false);
				setShowFooterLoader(false);
			});
	}

	function incrementPage() {
		setPage(page + 1);
	}

	function theTimer(toTop: Boolean = false) {
		setInterval(() => {
			setShowHeaderLoader(true);
			incrementPage();
			getData(toTop);
		}, 10000);
	}
	return (
		<View>
			<FlatList
				data={data}
				ListHeaderComponent={() => {
					if (showHeaderLoader) {
						return <ActivityIndicator />;
					} else {
						return null;
					}
				}}
				renderItem={({ item }) => (
					<Text
						style={{ margin: 5, padding: 5, backgroundColor: "rgba(0,0,0,.2)" }}
					>
						{item?.title}
					</Text>
				)}
				onEndReached={() => {
					incrementPage();
					setShowFooterLoader(true);
					getData();
				}}
				ListFooterComponent={() => {
					if (showFooterLoader) {
						return <ActivityIndicator />;
					} else {
						return null;
					}
				}}
			/>
		</View>
	);
};

export default Home;
