/** @format */

import axios from "axios";

export const http = axios.create({
	baseURL: "https://hn.algolia.com/api/",
});
