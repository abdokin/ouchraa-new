"use strict";$(document).ready(function(){new LineChart($(".ct-chart-purple"),[5,4,3,7,5,10,5,4,5,3,7,5,10,5,4,3,7,5,10],{height:"100px",width:"100%",circle_fill:"#000000",stroke_color:"#999999"}).build()}),$(document).ready(function(){jQuery("#map-8").vectorMap({map:"germany_en",backgroundColor:null,color:"#393b51",hoverColor:"#000000",selectedColor:"#000000",enableZoom:!0,showTooltip:!0})}),$(document).ready(function(){$(".slider-sync").slick({slidesToShow:1,slidesToScroll:1,arrows:!1,fade:!0,asNavFor:".slider-nav"}),$(".slider-nav").slick({slidesToShow:1,slidesToScroll:1,asNavFor:".slider-sync",dots:!1,arrows:!1,centerMode:!0,focusOnSelect:!0})}),$(document).ready(function(){$("span.bar-2").peity("bar",{height:"20px",width:"80px",fill:["#fab72b"]})});