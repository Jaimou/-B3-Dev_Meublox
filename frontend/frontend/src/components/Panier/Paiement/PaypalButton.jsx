// import React from "react";
// import ReactDOM from "react-dom"
// const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

// const PaypalButtonComponent = (props) => {

//     const data = props.data;


//     const createOrder = (data) => {
//         return fetch("/my-server/create-paypal-order", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },

//             body: JSON.stringify({
//                 cart: [
//                     {
//                         sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
//                         quantity: "YOUR_PRODUCT_QUANTITY",
//                     },
//                 ],
//             }),
//         })
//             .then((response) => response.json())
//             .then((order) => order.id);
//     }
//     const onApprove = (data) => {
//         return fetch("/my-server/capture-paypal-order", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 orderID: data.orderID
//             })
//         })
//             .then((response) => response.json());
//     }

//     createOrder(data)
//     onApprove(data)

//     return (
//         <PayPalButton
//             createOrder={(data, actions) => this.createOrder(data)}
//             onApprove={(data, actions) => this.onApprove(data)}
//         />
//     );
// }

// export default PaypalButtonComponent;