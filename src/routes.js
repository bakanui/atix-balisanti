import React from 'react';
const HomeContainer = React.lazy(() => import("./views/base/Home"));
const Booking = React.lazy(() => import("./views/base/Booking"));
const Order = React.lazy(() => import("./views/base/Order"));
const Confirmation = React.lazy(() => import("./views/base/Confirmation"));
const Transaction = React.lazy(() => import("./views/base/Transaction"));



const routes = [
    { path: "/", exact: true, name: "Home" },
    { path: "/home", exact: true, name: "Home-container", component: HomeContainer },
    { path: "/booking/:id_from/:id_to/:date_book", exact: true, name: "Booking", component: Booking },
    { path: "/order/:id_jadwal/:total_kap/:date_book", exact: true, name: "Order", component: Order },
    { path: "/confirmation-payments/:invoice_id/:payment_method", exact: true, name: "Confirmation", component: Confirmation },
    { path: "/transaction/:invoice_id/status-payment", exact: true, name: "Confirmation Transaction", component: Transaction },

]

export default routes;
