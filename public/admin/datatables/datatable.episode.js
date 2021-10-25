"use strict";
jQuery(document).ready(function() {
    var table = $('#datatable-sside');
    table.DataTable({
        responsive: false,
        searchDelay: 1000,
        processing: true,
        serverSide: true,
        dom: '<"top">t<"bottom"lp><"clear">',
        ajax: `/${dashboard}/episode/${film.id}/datatable`,
        columns: [{ 
                data: function(data, type, dataToSet) {
                    if(data.roledel == true){
                        return '<input type="checkbox" name="id[]" value="' + $('<div/>').text(data.id).html() + '">';
                    }
                    return "";
                }
            },           
            {
                data: function(data, type, dataToSet) {
                    var domRoleHtml = '';
                    if(data.roleedit == true){
                        domRoleHtml += `<a class="btnDTR btn-load-modal-edit" data-id="${data.id}" href="javascript:void(0);">Edit</a>`;
                    }
                    if(data.roledel == true){
                        domRoleHtml += `<a class="btnDTR btnDTRDanger btnDTRDelete" data-id="${data.id}" href="/${dashboard}/episode/delete/${data.id}">Delete</a>`;
                    }
                    return `<div class="row-name">${data.name}</div>
                            <div class="row-actions">${domRoleHtml}</div>`;
                }
            },
            { data: 'url' },
            {
                data: function(data, type, dataToSet) {
                    return (data.server && data.server.name) ? data.server.name : "";
                }
            },
            { data: 'description' },
            { 
                data: function(data, type, dataToSet) {
                    return createDataColumnToggleAajx(data.id, !data.isblock, "isblock", "Enable", "Disable", true);
                }
            },            
        ],
        columnDefs: [{
            'targets': 0,
            'searchable': false,
            'orderable': false,
            'className': 'dt-body-center'
        }, {
            targets: 3,
            orderable: false            
        }, {
            targets: 5,
            orderable: false            
        }],
        order: [
            [0, "desc"]
        ]
    });
});