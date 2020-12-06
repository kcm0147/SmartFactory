import Dashboard from "views/Dashboard.js";
import Registration from "views/Registration.js";
import Setting from "views/Setting.js";
import Registerform from "views/Registerform.js";
import Settingform from "views/Settingform.js"

var routes = [
  {
    path: "/dashboard",
    name: "DashBoard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/Registration",
    name: "Registration",
    icon: "tim-icons icon-atom",
    component: Registration,
    layout: "/admin"
  },
  {
    path: "/setting",
    name: "Setting",
    icon: "tim-icons icon-pin",
    component: Setting,
    layout: "/admin"
  },
  {
    path: "/registerform",
    name: "RegisterForm",
    icon: "tim-icons icon-single-02",
    component: Registerform,
    layout: "/admin"
  },
  {
    path: "/settingform",
    name: "SettingForm",
    icon: "tim-icons icon-single-02",
    component: Settingform,
    layout: "/admin"
  }
];
export default routes;