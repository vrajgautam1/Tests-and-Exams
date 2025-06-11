import React from "react";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function ClientLayout() {
  return (
    <div className="animsition">
      <Helmet>
        <title>Client Site</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Favicon */}
        <link rel="icon" type="image/png" href="/client/images/icons/favicon.png" />

        {/* Client-side CSS files */}
        <link rel="stylesheet" href="/client/vendor/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/client/fonts/font-awesome-4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/client/fonts/iconic/css/material-design-iconic-font.min.css" />
        <link rel="stylesheet" href="/client/fonts/linearicons-v1.0.0/icon-font.min.css" />
        <link rel="stylesheet" href="/client/vendor/animate/animate.css" />
        <link rel="stylesheet" href="/client/vendor/css-hamburgers/hamburgers.min.css" />
        <link rel="stylesheet" href="/client/vendor/animsition/css/animsition.min.css" />
        <link rel="stylesheet" href="/client/vendor/select2/select2.min.css" />
        <link rel="stylesheet" href="/client/vendor/daterangepicker/daterangepicker.css" />
        <link rel="stylesheet" href="/client/vendor/slick/slick.css" />
        <link rel="stylesheet" href="/client/vendor/MagnificPopup/magnific-popup.css" />
        <link rel="stylesheet" href="/client/vendor/perfect-scrollbar/perfect-scrollbar.css" />
        <link rel="stylesheet" href="/client/css/util.css" />
        <link rel="stylesheet" href="/client/css/main.css" />
      </Helmet>

      <Outlet />
    </div>
  );
}

export default ClientLayout;
