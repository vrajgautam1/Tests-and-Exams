import React, { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function AdminLayout() {
  // Load custom Sparkline logic after layout mounts
  useEffect(() => {
  const scripts = [
    "/admin/assets/js/core/popper.min.js",
    "/admin/assets/js/core/bootstrap.min.js",
    "/admin/assets/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js",
    "/admin/assets/js/plugin/chart.js/chart.min.js",
    "/admin/assets/js/plugin/jquery.sparkline/jquery.sparkline.min.js",
    "/admin/assets/js/plugin/chart-circle/circles.min.js",
    "/admin/assets/js/plugin/datatables/datatables.min.js",
    "/admin/assets/js/plugin/bootstrap-notify/bootstrap-notify.min.js",
    "/admin/assets/js/plugin/jsvectormap/jsvectormap.min.js",
    "/admin/assets/js/plugin/jsvectormap/world.js",
    "/admin/assets/js/plugin/sweetalert/sweetalert.min.js",
    "/admin/assets/js/kaiadmin.min.js",
    "/admin/assets/js/setting-demo.js",
    "/admin/assets/js/demo.js",
  ];

  scripts.forEach((src) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = false; // Load in order
    document.body.appendChild(script);
  });

  return () => {
    scripts.forEach((src) => {
      const matching = [...document.querySelectorAll("script")].find(
        (s) => s.src.includes(src)
      );
      if (matching) document.body.removeChild(matching);
    });
  };
}, []);

  return (
    <div>
      <Helmet>
        {/* Meta + CSS */}
        <title>Admin Panel</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/admin/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/admin/assets/css/plugins.min.css" />
        <link rel="stylesheet" href="/admin/assets/css/kaiadmin.min.css" />
        <link rel="stylesheet" href="/admin/assets/css/demo.css" />
        <link rel="stylesheet" href="/admin/assets/css/fonts.min.css" />

        {/* Fonts */}
        <script src="/admin/assets/js/plugin/webfont/webfont.min.js" />
        <script>{`
          WebFont.load({
            google: { families: ["Public Sans:300,400,500,600,700"] },
            custom: {
              families: [
                "Font Awesome 5 Solid",
                "Font Awesome 5 Regular",
                "Font Awesome 5 Brands",
                "simple-line-icons"
              ],
              urls: ["/admin/assets/css/fonts.min.css"]
            },
            active: function () {
              sessionStorage.fonts = true;
            }
          });
        `}</script>
      </Helmet>

      {/* UI */}
      <div className="wrapper">
        <Sidebar />
        <div className="main-panel">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
