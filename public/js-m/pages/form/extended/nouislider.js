"use strict";$(document).ready(function(){$(".nouislider").each(function(e){noUiSlider.create(this,{start:[10],connect:!0,range:{min:-20,max:40}})}),$(".nouislider-pipe").each(function(e){noUiSlider.create(this,{range:{min:0,max:100},start:[50],pips:{mode:"count",values:5}});var t=this;function i(){var e=Number(this.getAttribute("data-value"));t.noUiSlider.set(e)}for(var n=t.querySelectorAll(".noUi-value"),r=0;r<n.length;r++)n[r].style.cursor="pointer",n[r].addEventListener("click",i)}),$(".nouislider-tooltips").each(function(e){noUiSlider.create(this,{start:[10],connect:!0,tooltips:[!0],range:{min:-20,max:40}})}),$(".nouislider-vertical").each(function(e){noUiSlider.create(this,{start:50,orientation:"vertical",range:{min:0,max:100}})}),$(".nouislider-vertical-pipe").each(function(e){noUiSlider.create(this,{range:{min:0,max:100},orientation:"vertical",start:50,pips:{mode:"count",values:5}});var t=this;function i(){var e=Number(this.getAttribute("data-value"));t.noUiSlider.set(e)}for(var n=t.querySelectorAll(".noUi-value"),r=0;r<n.length;r++)n[r].style.cursor="pointer",n[r].addEventListener("click",i)}),$(".nouislider-vertical-tooltips").each(function(e){noUiSlider.create(this,{orientation:"vertical",start:50,connect:!0,tooltips:!0,range:{min:0,max:100}})}),$(function(){var e=document.getElementById("steps");noUiSlider.create(e,{start:[10],connect:!0,step:5,range:{min:-20,max:40}})}),$(function(){var e=document.getElementById("range");noUiSlider.create(e,{start:[10,25],connect:!0,range:{min:-20,max:40}})})});