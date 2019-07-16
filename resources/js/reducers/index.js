import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import loginReducer from "./loginReducer";
import dashboardReducer from "./dashboardReducer";
import mainDashboardReducer from "./mainDashboardReducer";

export default combineReducers({
  login: loginReducer,
  dashboard: dashboardReducer, 
  mainDashboard: mainDashboardReducer,
  form: formReducer,
});
