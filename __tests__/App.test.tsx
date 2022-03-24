/** @format */

import "react-native";
import renderer, { act } from "react-test-renderer";
import { render } from "@testing-library/react-native";
import Home from "../src/screens/Home";
import Details from "../src/screens/Details";

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

	it("find flatlist by testID", (done) => {
		const tree = render(<Home />);
		expect(tree.findByTestId("home-list")).toBeTruthy();
		done();
	});

	it("renders details", () => {
		const tree = render(
			<Details route={{ params: { item: JSON.stringify({ OK: "ok" }) } }} />
		);
	});
});
