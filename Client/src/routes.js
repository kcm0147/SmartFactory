import Dashboard from "views/Dashboard.js";
import Registration from "views/Registration.js";
import Setting from "views/Setting.js";
import ProcessLine1 from "line1/Lineboard1.js";
import ProcessLine2 from "line2/Lineboard2.js";
import ProcessLine3 from "line3/Lineboard3.js";
// import Notifications from "views/Notifications.js";
// import Rtl from "views/Rtl.js";
// import TableList from "views/TableList.js";
// import Typography from "views/Typography.js";
import Registerform from "views/Registerform.js";

var routes = [
  {
    path: "/dashboard",
    name: "DashBoard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/Processline1",
    name: "Processline1",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-align-center",
    component: ProcessLine1,
    layout: "/admin"
  },
  {
    path: "/Processline2",
    name: "Processline2",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-align-center",
    component: ProcessLine2,
    layout: "/admin"
  },
  {
    path: "/Processline3",
    name: "Processline3",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-align-center",
    component: ProcessLine3,
    layout: "/admin"
  },
  {
    path: "/Registration",
    name: "Registration",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: Registration,
    layout: "/admin"
  },
  {
    path: "/setting",
    name: "Setting",
    rtlName: "خرائط",
    icon: "tim-icons icon-pin",
    component: Setting,
    layout: "/admin"
  },
  // {
  //   path: "/notifications",
  //   name: "Log-out",
  //   rtlName: "إخطارات",
  //   icon: "tim-icons icon-bell-55",
  //   component: Notifications,
  //   layout: "/admin"
  // },
  {
    path: "/registerform",
    name: "RegisterForm",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: Registerform,
    layout: "/admin"
  }
];
export default routes;