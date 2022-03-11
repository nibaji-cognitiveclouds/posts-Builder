/** @format */

import React from "react";
import { FlatList, Text, View } from "react-native";
import { http } from "../const/https";

const Home = () => {
	const [data, setData] = React.useState([]);

	React.useEffect(() => {
		getData();
	}, []);

	function getData() {
		http
			.get(`v1/search_by_date?tags=story&page=0`)
			.then((res) => setData(res.data?.hits));
	}

	return (
		<View>
			<FlatList
				data={data}
				renderItem={({ item }) => (
					<Text
						style={{ margin: 5, padding: 5, backgroundColor: "rgba(0,0,0,.2)" }}
					>
						{item?.title}
					</Text>
				)}
			/>
		</View>
	);
};

export default Home;
