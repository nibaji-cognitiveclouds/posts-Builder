/**
 * @format
 */

import "react-native";
import React from "react";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import Home from "../src/screens/Home";

describe("Home", () => {
	it("renders <Home /> correctly", () => {
		jest.useFakeTimers();
		renderer.create(<Home />);
	});

	it("rendered <Home /> matches snapshot", () => {
		jest.useFakeTimers();
		const render = renderer.create(<Home />);
		expect(render).toMatchSnapshot();
	});
});
