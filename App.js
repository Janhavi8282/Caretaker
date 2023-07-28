import React from "react";
import RootNavigator from "./src/navigations/RootNavigator";
import { Provider } from "react-redux";
import store from "./src/components/store";

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
