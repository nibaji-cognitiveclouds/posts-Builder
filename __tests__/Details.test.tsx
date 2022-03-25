/** @format */

import { render } from "@testing-library/react-native";
import React from "react";
import Details from "../src/screens/details";

jest.mock("@react-navigation/native", () => {
	return {
		useNavigation: () => ({
			navigate: jest.fn(),
		}),
	};
});

describe("Details", () => {
	jest.useFakeTimers();

	const routeParamTest = {
		params: { item: "ok" },
	};

	it("renders without crashing", () => {
		render(<Details route={routeParamTest} />);
	});

	it("matches snapshot", () => {
		const tree = render(<Details route={routeParamTest} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("has 1 child", () => {
		const tree = render(<Details route={routeParamTest} />).toJSON();
		//@ts-ignore
		expect(tree?.children?.length).toBe(1);
	});

	it("has component with req testID", () => {
		const tree = render(<Details route={routeParamTest} />);
		//@ts-ignore
		expect(tree.getByTestId("details")).toBeTruthy();
	});
});
