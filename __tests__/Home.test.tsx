/** @format */

import { render } from "@testing-library/react-native";
import React from "react";
import Home from "../src/screens/home";

jest.mock("@react-navigation/native", () => {
	return {
		useNavigation: () => ({
			navigate: jest.fn(),
		}),
	};
});

describe("Home", () => {
	jest.useFakeTimers();

	it("renders without crashing", () => {
		render(<Home />);
	});

	it("matches snapshot", () => {
		const tree = render(<Home />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("has 1 child", () => {
		const tree = render(<Home />).toJSON();
		//@ts-ignore
		expect(tree?.children?.length).toBe(1);
	});

	it("has component with req testID", () => {
		const tree = render(<Home />);
		//@ts-ignore
		expect(tree.getByTestId("home")).toBeTruthy();
	});
});
