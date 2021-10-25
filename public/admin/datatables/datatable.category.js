"use strict";
jQuery(document).ready(function() {
    $('#datatable-sside').DataTable({
        responsive: false,
        searchDelay: 1000,
        processing: true,
        serverSide: true,
        dom: '<"top">t<"bottom"lp><"clear">', // off search box
        ajax: `/${dashboard}/category/${catetype}/datatable/`,
        columns: [
            { 
                data: function(data, type, dataToSet) {
                    if(data.roledel == true || data.mine == data.author){
                        return '<input type="checkbox" name="id[]" value="' + $('<div/>').text(data.id).html() + '">';
                    }
                    return "";
                }
            },
            {
                data: function(data, type, dataToSet) {                    
                    var domRoleHtml = '';
                    if(data.roleedit == true || data.mine == data.author){
                        domRoleHtml += `<a class="btnDTR" href="/${dashboard}/category/${catetype}/edit/${data.id}">Edit</a>`;
                    }
                    if(data.roledel == true || data.mine == data.author){
                        domRoleHtml += `<a class="btnDTR btnDTRDanger btnDTRDelete" href="/${dashboard}/category/${catetype}/delete/${data.id}">Delete</a>`;
                    }
                    return `<div class="row-name">${data.title}</div>
                            <div class="row-actions">
                                <a class="btnDTR" href="/${data.permalink}">View</a>
                                ${domRoleHtml}
                            </div>`;
                }
            },
            { data: 'slug' },
            { 
                data: function(data, type, dataToSet) {
                    if(data.Author){
                        return `<a href="javascript:void(0);">${data.Author.username}</a>`;
                    }
                    return "";
                }
            },           
            { data: 'postcount' },
            {
                data: function(data, type, dataToSet) {
                    return createDataColumnToggleAajx(data.id, data.allowindex, "allowindex", "Bật Google Index", "Tắt Google Index", false);
                }
            },
            {
                data: function(data, type, dataToSet) {
                    return createDataColumnToggleAajx(data.id, (data.catestatus == "published") ? true : false, "catestatus", "Xuất bản", "Chờ duyệt", false);
                }
            },
            { data: 'updatedAt' }
        ],
        columnDefs: [{
            'targets': 0,
            'searchable': false,
            'orderable': false,
            'className': 'dt-body-center'
        }, {
            targets: 4,
            className: "text-center",            
        }, {
            targets: 7,
            className: "text-right",
            render: function(data, type, full, meta) {
                var dateText = formart_datetime(data, "full");
                return dateText;
            },
        }],
        order: [
            [7, "DESC"]
        ]
    });
    var oTable = $('#datatable-sside').DataTable();    
});