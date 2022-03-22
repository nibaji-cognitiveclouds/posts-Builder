/** @format */

import "react-native";
import renderer, { act } from "react-test-renderer";
import Home from "../src/screens/Home";

const mockedNavigation = jest.fn();

jest.mock("@react-navigation/native", () => {
	return {
		useNavigation: () => ({
			navigate: mockedNavigation,
		}),
	};
});

describe("<App />", () => {
	jest.useFakeTimers();

	it(" <Home/> has 1 child", () => {
		const tree = renderer.create(<Home />).toJSON();
		//@ts-ignore
		expect(tree.children.length).toBe(1);
	});
});
