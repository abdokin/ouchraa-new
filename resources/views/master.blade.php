<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="apple-touch-icon" href="assets/apple-touch-icon.png">

    <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>

    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js" defer></script>

    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
    <!-- Fontawesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" />
    <!-- Dosis & Poppins Fonts -->
    <link
        href="https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400;500;523;600;700;800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">

    <!-- Nucleo Icons -->
    <link href="/css/nucleo-icons.css" rel="stylesheet" />
    <link href="/css/nucleo-svg.css" rel="stylesheet" />
    <!-- Font Awesome Icons -->
    <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>
    <link
        href="{{ asset('/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" rel="stylesheet">
                                                                            <link href="/css/nucleo-svg.css" rel="stylesheet') }}" />
    <link rel="stylesheet" href="{{ asset('css-m/vendor.css') }}">

    <link rel="stylesheet" href="{{ asset('vendor/ari_d/js-list-manager/js-list-manager.css') }}">

    <link rel="stylesheet" href="{{ asset('/layouts/layout-1/css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('/css-m/auth.css') }}">
    <link rel="stylesheet" href="{{ asset('layouts/layout-3/css/app.css') }}">

    <!-- Latest compiled and minified JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js"></script>

    <!-- (Optional) Latest compiled and minified JavaScript translation files -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.18/js/bootstrap-select.min.js"
        integrity="sha512-yDlE7vpGDP7o2eftkCiPZ+yuUyEcaBwoJoIhdXv71KZWugFqEphIS3PU60lEkFaz8RxaVsMpSvQxMBaKVwA5xg=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>



    @routes

    <script src="{{ mix('/js/app.js') }}" defer></script>
    <style>
        .item-renderer>input {
            display: none;
        }

        li>.selected {
            background: #0a53be !important;
            color: white;
        }
    </style>
</head>

<body class="g-sidenav-show   bg-gray-100">
    @inertia
    {{-- <script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" /> --}}
    <!--   Core JS Files   -->
    <script src="/js/core/popper.min.js"></script>
    {{-- <script src="/js/core/bootstrap.min.js"></script> --}}
    <script src="/js/plugins/perfect-scrollbar.min.js"></script>
    <script src="/js/plugins/smooth-scrollbar.min.js"></script>

    <!-- Github buttons -->
    {{-- <script async defer src="https://buttons.github.io/buttons.js"></script> --}}
    <!-- Control Center for Soft Dashboard: parallax effects, scripts for the example pages etc -->
    <script src="/js/argon-dashboard.min.js?v=2.0.0"></script>
    {{-- my script --}}
    <script src=" {{ asset('js-m/vendor.js') }}"></script>


    <script src=" {{ asset('vendor/apexcharts/apexcharts.min.js') }}"></script>
    <script src=" {{ asset('vendor/amcharts/amcharts.js') }}"></script>
    <script src=" {{ asset('vendor/raphael/raphael.min.js') }}"></script>
    <script src=" {{ asset('vendor/morrisjs/morris.min.js') }}"></script>
    <script src=" {{ asset('vendor/ari_d/js-list-manager/js-list-manager.js') }}"></script>
    <script src=" {{ asset('vendor/peity/jquery.peity.min.js') }}"></script>

    <script src=" {{ asset('layouts/layout-1/js/app.js') }}"></script>

    <script src=" {{ asset('js-m/pages/index.js') }}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Dropify/0.1.3/js/dropify.min.js"
        integrity="sha512-wxJL2RnxGAn2d92YTYdRLjrgIW5fAlhVnnq35EAU7Mmkg4v93cOiPxX/RpG1CCHpoSr6VNcx++6CgQ3B3FoD9Q=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Dropify/0.1.3/css/dropify.css"
        integrity="sha512-oMsdL1v4K/O/v0/00AZQX96cA1T7roVTjBYD5UW4/uPvngz1JGqC9ZZaIKK15DnvrAOSWpLnxCc1Gcj7TfmJ7g=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Dropify/0.1.3/css/dropify.min.css"
        integrity="sha512-XS4z2x4/njM0ACHTf0QRI/mgWzv2/B4wxD/7JDoUeBvHDhdhFiE7Z3hzevia3pbyr16ufKB6/NUyQ/hBGEAMDw=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/switchery/0.8.2/switchery.min.css"
        integrity="sha512-uyGg6dZr3cE1PxtKOCGqKGTiZybe5iSq3LsqOolABqAWlIRLo/HKyrMMD8drX+gls3twJdpYX0gDKEdtf2dpmw=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/switchery/0.8.2/switchery.min.js"
        integrity="sha512-lC8vSUSlXWqh7A/F+EUS3l77bdlj+rGMN4NB5XFAHnTR3jQtg4ibZccWpuSSIdPoPUlUxtnGktLyrWcDhG8RvA=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/switchery/0.8.2/switchery.js"
        integrity="sha512-LwO3mEUbbtCr1WHCTeo13CpQfw6JWKv9s8rKX/O0IFr4EDuwTgtnV8bXgQsZ7OR2Dqa7+AuwZ9Mka5SRMUS0EQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/switchery/0.8.2/switchery.css"
        integrity="sha512-zKvhCkM8b3JMULax/MlTkNk4gQwMbY8CqpDQC74/n7H6UK3HOZA/mO/fvjhVlh0V/E6PCrp4U6Lw6pnueS9HCQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />


    <script>
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })
        var win = navigator.platform.indexOf('Win') > -1;
        if (win && document.querySelector('#sidenav-scrollbar')) {
            var options = {
                damping: '0.5'
            }
            Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
        }
    </script>
</body>

</html>
