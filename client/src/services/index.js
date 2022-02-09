import axios from "axios";

import {BASE_URL, API_VERSION} from "../constants";

// const token =
// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDE0MjBmZjA3OGFlZjEyYTJkZjQxZCIsImVtYWlsIjoidGVzdDFAZ21haWwuY29tIiwiaWF0IjoxNjQ0MzQ1Mzk4LCJleHAiOjE2NDQ0MzE3OTh9.tJcPN3PdK3yOFhOl-KNeXPGsnd3q31JTGpDm-Vo2j8M";

class ApiService {
	sendGetRequest(url) {
		return new Promise((resolve, reject) => {
			let config = {
				headers: {
					// Authorization: `Bearer ${token}`,
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			};

			console.log("get", `${BASE_URL}/${API_VERSION}/${url}`, config);
			axios
				.get(`${BASE_URL}/${API_VERSION}/${url}`, config)
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
	sendPostRequest(url, data) {
		let config = {
			headers: {
				// Authorization: `Bearer ${token}`,
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
				});
		});
	}
	sendDeleteRequest(url) {
		let config = {
			headers: {
				// Authorization: `Bearer ${token}`,
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
				});
		});
	}
	sendPutRequest(url, data) {
		let config = {
			headers: {
				// Authorization: `Bearer ${token}`,
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
				});
		});
	}
}

export default new ApiService();
