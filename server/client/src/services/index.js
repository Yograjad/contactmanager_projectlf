import axios from "axios";

import {BASE_URL, API_VERSION} from "../constants";

class ApiService {
	sendGetRequest(url) {
		let config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		};
		return new Promise((resolve, reject) => {
			console.log("get", `${BASE_URL}/${API_VERSION}/${url}`, config);
			axios
				.get(`${BASE_URL}/${API_VERSION}/${url}`, config)
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
					console.log("err", err.response.status);
					if (!err?.response) {
						alert("No server response");
					}

					if (err.response.status === 403 || err.response.status === 401) {
						alert(`${err.response.data.message}`);
						window.location = "/";
					}
				});
		});
	}
	sendPostRequest(url, data) {
		let config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		};
		console.log(`${BASE_URL}/${API_VERSION}/${url}`, data, config);
		return new Promise((resolve, reject) => {
			axios
				.post(`${BASE_URL}/${API_VERSION}/${url}`, data, config)
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
					if (!err?.response) {
						alert("No server response");
					}
					if (err.response.status === 403 || err.response.status === 401) {
						alert(`${err.response.data.message}`);
						window.location = "/";
					}
				});
		});
	}
	sendDeleteRequest(url) {
		let config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		};
		console.log(`${BASE_URL}/${API_VERSION}/${url}`);
		return new Promise((resolve, reject) => {
			axios
				.delete(`${BASE_URL}/${API_VERSION}/${url}`, config)
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
					if (!err?.response) {
						alert("No server response");
					}
					if (err.response.status === 403 || err.response.status === 401) {
						alert(`${err.response.data.message}`);
						window.location = "/";
					}
				});
		});
	}
	sendPutRequest(url, data) {
		let config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		};
		console.log(`${BASE_URL}/${API_VERSION}/${url}`, "data", data);
		return new Promise((resolve, reject) => {
			axios
				.put(`${BASE_URL}/${API_VERSION}/${url}`, data, config)

				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
					if (!err?.response) {
						alert("No server response");
					}
					if (err.response.status === 403 || err.response.status === 401) {
						alert(`${err.response.data.message}`);
						window.location = "/";
					}
				});
		});
	}
}

export default new ApiService();
