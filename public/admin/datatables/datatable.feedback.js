"use strict";
jQuery(document).ready(function() {
    var table = $('#datatable-sside');
    // begin first table
    table.DataTable({
        responsive: false,
        searchDelay: 1000,
        processing: true,
        serverSide: true,
        dom: '<"top">t<"bottom"lp><"clear">',
        ajax: `/${dashboard}/feedback/datatable`,
        columns: [
            { 
                data: function(data, type, dataToSet) {
                    if(data.roledel){
                        return '<input type="checkbox" name="id[]" value="' + $('<div/>').text(data.id).html() + '">';
                    }
                    return "";
                }
            },
            {
                data: function(data, type, dataToSet) {
                    return `<div>${data.name}</div>
                            <div>${data.email}</div>
                            <div>${data.ipaddress}</div>`;
                }
            },
            {
                data: function(data, type, dataToSet) {
                    var domRoleHtml = '';                    
                    if(data.roleview){
                        domRoleHtml += `<a class="btnDTR btn-load-modal-edit" data-id="${data.id}" href="javascript:void(0)">Read</a>`;
                    }
                    if(data.roledel){
                        domRoleHtml += `<a class="btnDTR btnDTRDelete" href="/${dashboard}/feedback/delete/${data.id}">Delete</a>`;
                    }
                    return `<div>${data.link}</div>
                            <div class="row-name">${data.subject}</div>
                            <div class="row-actions">
                                ${domRoleHtml}
                            </div>`;
                }
            },
            { data: 'content' },
            {
                data: function(data, type, dataToSet) {
                    return formart_datetime(data.createdAt, "full")
                }
            },
            {
                data: function(data, type, dataToSet) {
                    return createDataColumnToggleAajx(data.id, (data.fbstatus == "finished") ? true : false, "fbstatus", "Finished", "Pending", false);
                }
            }
        ],
        columnDefs: [{
            'targets': 0,
            'searchable': false,
            'orderable': false,
            'className': 'dt-body-center'
        }, {
            "targets": 4,
            "className": "text-right"
        }, {
            "targets": 5,
            'searchable': false,
            'orderable': false
        }],
        order: [
            0, "DESC"
        ]
    });
    var oTable = $('#datatable-sside').DataTable();
});