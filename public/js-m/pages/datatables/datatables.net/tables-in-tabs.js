"use strict";$(document).ready(function(){$('#nav-for-tables-tabs a[data-toggle="tab"]').on("shown.bs.tab",function(a){$.fn.dataTable.tables({visible:!0,api:!0}).columns.adjust()}),$("#tables-and-tabs table.table").DataTable({ajax:ROOT_URL+"/data/table-3.json",scrollY:200,scrollCollapse:!0,paging:!1}),$("#tables-and-tabs #myTable2").DataTable().search("New York").draw()});