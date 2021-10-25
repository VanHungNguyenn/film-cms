"use strict";
jQuery(document).ready(function() {
    // begin first table
    $('#datatable-sside').DataTable({
        responsive: false,
        searchDelay: 1000,
        processing: true,
        serverSide: true,
        dom: '<"top">t<"bottom"lp><"clear">', // off search box
        ajax: `/${dashboard}/post/${posttype}/datatable/`,
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
                    if(data.nolink == false){
                        domRoleHtml += `<a class="btnDTR" href="/${data.slug}">View</a>`;
                    }
                    if(data.roleedit == true || data.mine == data.author){
                        domRoleHtml += `<a class="btnDTR" href="/${dashboard}/post/${posttype}/edit/${data.id}">Edit</a>`;
                    }
                    return `<div class="row-name">${data.title}</div>
                            <div class="row-actions">                                
                                ${domRoleHtml}
                            </div>`;
                }
            },
            {
                data: function(data, type, dataToSet) {
                    if (data.Author != null) {
                        return `<a href="javascript:void(0);" alt="${data.Author.username}">${data.Author.username}</a>`;
                    }
                    return '';
                }
            },               
            {
                data: function(data, type, dataToSet) {
                    return createDataColumnToggleAajx(data.id, data.allowindex, "allowindex", "Bật Google Index", "Tắt Google Index", false);
                }
            },
            {
                data: function(data, type, dataToSet) {
                    return createDataColumnToggleAajx(data.id, (data.poststatus == "published") ? true : false, "poststatus", "Xuất bản", "Chờ duyệt", false);
                }
            },
            { data: 'modifiedat' }
        ],
        columnDefs: [{
            'targets': 0,
            'searchable': false,
            'orderable': false,
            'className': 'dt-body-center'
        }, {
            targets: 5,
            render: function(data, type, full, meta) {
                var dateText = formart_datetime(data, "full");
                return `<div class="text-right">${dateText}</div>`;
            },
        }],
        order: [
            [5, "desc"]
        ]
    });
    var oTable = $('#datatable-sside').DataTable();
});