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
        ajax: `/${dashboard}/type/datatable`,
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
                    if(data.roleedit == true){
                        domRoleHtml += `<a class="btnDTR btnDTREdit" href="/${dashboard}/type/edit/${data.id}">Edit</a>`;
                    }
                    if(data.roledel == true){
                        domRoleHtml += `<a class="btnDTR btnDTRDelete" href="/${dashboard}/type/delete/${data.id}">Delete</a>`;
                    }
                    return `<span>${data.name}</span>
                            <div class="row-actions">${domRoleHtml}</div>`;
                }
            },
            { data: 'description' },
            { data: 'roottext' },
            { data: 'exttext' },
            {
                data: function(data, type, dataToSet) {
                    switch(data.type){
                        case "post":
                            return "Bài viết";
                        default:
                            return "Danh mục"
                    }
                }
            },
            {
                data: function(data, type, dataToSet) {
                    switch(data.cateitemtype){
                        case "hierarchy":
                            return "Đa cấp";
                        case "multiple":
                            return "Chọn nhiều";
                        case "single":
                            return "Chỉ một";
                        default:
                            return "";
                    }
                }
            },
            {
                data: function(data, type, dataToSet) {
                    return createDataColumnToggleAajx(data.id, data.allowsearch, "allowsearch", "Bật tìm kiếm", "Tắt tìm kiếm", false);
                }
            },
            {
                data: function(data, type, dataToSet) {
                    return createDataColumnToggleAajx(data.id, data.allowindex, "allowindex", "Bật Google Index", "Tắt Google Index", false);
                }
            },
            {
                data: function(data, type, dataToSet) {
                    return createDataColumnToggleAajx(data.id, data.hassitemap, "hassitemap", "Có sitemap", "Không sitemap", false);
                }
            },
            {
                data: function(data, type, dataToSet) {
                    return createDataColumnToggleAajx(data.id, !data.isblock, "isblock", "Hoạt động", "Dừng", true);
                }
            }
        ],
        columnDefs: [{
            'targets': 0,
            'searchable': false,
            'orderable': false,
            'className': 'dt-body-center'
        }, {
            "targets": 2,
            "className": "row-name",
            render: function(data, type, full, meta) {
                return data;
            }
        }, {
            "targets": 6,
            'searchable': false,
            'orderable': false
        }, {
            "targets": 7,
            'searchable': false,
            'orderable': false
        }, {
            "targets": 8,
            'searchable': false,
            'orderable': false
        }, {
            "targets": 9,
            'searchable': false,
            'orderable': false
        }]
    });
    var oTable = $('#datatable-sside').DataTable();
});