import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import {BrowserRouter as Router} from "react-router-dom";
import {ToastProvider} from "react-toast-notifications";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {store, persistor} from "./redux/store";

ReactDOM.render(
	<React.StrictMode>
		<ToastProvider placement="top-center">
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Router>
						<App />
					</Router>
				</PersistGate>
			</Provider>
		</ToastProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
