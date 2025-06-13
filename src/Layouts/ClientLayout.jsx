import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function ClientLayout() {
  useEffect(() => {
    const scriptPaths = [
      "/client/vendor/jquery/jquery-3.2.1.min.js",
      "/client/vendor/animsition/js/animsition.min.js",
      "/client/vendor/bootstrap/js/popper.js",
      "/client/vendor/bootstrap/js/bootstrap.min.js",
      "/client/vendor/select2/select2.min.js",
      "/client/vendor/daterangepicker/moment.min.js",
      "/client/vendor/daterangepicker/daterangepicker.js",
      "/client/vendor/slick/slick.min.js",
      "/client/js/slick-custom.js",
      "/client/vendor/parallax100/parallax100.js",
      "/client/vendor/MagnificPopup/jquery.magnific-popup.min.js",
      "/client/vendor/isotope/isotope.pkgd.min.js",
      "/client/vendor/sweetalert/sweetalert.min.js",
      "/client/vendor/perfect-scrollbar/perfect-scrollbar.min.js",
      "/client/js/main.js",
    ];

    const scriptElements = [];

    // Append each script to body (sequentially important)
    scriptPaths.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      document.body.appendChild(script);
      scriptElements.push(script);
    });

    // Inline scripts using jQuery (run after libs are loaded)
    const inlineScripts = () => {
      if (!window.$) return;

      // select2
      $(".js-select2").each(function () {
        $(this).select2({
          minimumResultsForSearch: 20,
          dropdownParent: $(this).next(".dropDownSelect2"),
        });
      });

      // parallax
      $(".parallax100").parallax100();

      // MagnificPopup
      $(".gallery-lb").each(function () {
        $(this).magnificPopup({
          delegate: "a",
          type: "image",
          gallery: { enabled: true },
          mainClass: "mfp-fade",
        });
      });

      // SweetAlert - wishlist/cart
      $(".js-addwish-b2").on("click", function (e) {
        e.preventDefault();
      });

      $(".js-addwish-b2").each(function () {
        const nameProduct = $(this).parent().parent().find(".js-name-b2").html();
        $(this).on("click", function () {
          swal(nameProduct, "is added to wishlist !", "success");
          $(this).addClass("js-addedwish-b2");
          $(this).off("click");
        });
      });

      $(".js-addwish-detail").each(function () {
        const nameProduct = $(this).parent().parent().parent().find(".js-name-detail").html();
        $(this).on("click", function () {
          swal(nameProduct, "is added to wishlist !", "success");
          $(this).addClass("js-addedwish-detail");
          $(this).off("click");
        });
      });

      $(".js-addcart-detail").each(function () {
        const nameProduct = $(this).parent().parent().parent().parent().find(".js-name-detail").html();
        $(this).on("click", function () {
          swal(nameProduct, "is added to cart !", "success");
        });
      });

      // perfect-scrollbar
      $(".js-pscroll").each(function () {
        $(this).css("position", "relative");
        $(this).css("overflow", "hidden");
        const ps = new PerfectScrollbar(this, {
          wheelSpeed: 1,
          scrollingThreshold: 1000,
          wheelPropagation: false,
        });

        $(window).on("resize", function () {
          ps.update();
        });
      });
    };

    // Wait a bit before running inline scripts (let libs load)
    const timeoutId = setTimeout(() => {
      inlineScripts();
    }, 1000);

    // Cleanup on unmount
    return () => {
      scriptElements.forEach((script) => document.body.removeChild(script));
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="animsition">
      <Helmet>
        <title>Client Site</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/client/images/icons/favicon.png" />
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
