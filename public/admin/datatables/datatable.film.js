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
                    var icon = (data.icon) ? data.icon : {};
                    var banner = (icon.url) ? icon.url : ((data.banner_old) ? data.banner_old : "");
                    return (banner.length>0) ? `<img src="${banner}" width="100px">` : "";
                }
            },
            { 
                data: function(data, type, dataToSet) {
                    var domRoleHtml = '';
                    if(data.roleedit == true || data.mine == data.author){
                        domRoleHtml += `<a class="btnDTR" href="/${dashboard}/post/${posttype}/edit/${data.id}">Edit</a>`;
                    }
                    return `<div class="row-name">${data.title}</div>
                            <div class="row-actions">
                                <a class="btnDTR" href="/phim/${data.slug}-${data.id}/">View</a>
                                <a class="btnDTR" href="/${dashboard}/post/${posttype}/${data.id}/episode">Tập</a>
                                ${domRoleHtml}
                            </div>`;
                }
            },
            {
                data: function(data, type, dataToSet) {
                    if (data.categories != null) {
                        var catename = '';
                        data.categories.forEach(category => {
                            if(category.catetype=="category-tl"){
                                catename += `<a href="javascript:void(0);" alt="${category.title}">${category.title}</a><span>, </span>`;
                            }
                        });
                        return catename.substring(0, catename.length - ('<span>, </span>').length);
                    }
                    return '';
                }
            }, 
            {
                data: function(data, type, dataToSet) {
                    if (data.categories != null) {
                        var catename = '';
                        data.categories.forEach(category => {
                            if(category.catetype=="category-qg"){
                                catename += `<a href="javascript:void(0);" alt="${category.title}">${category.title}</a><span>, </span>`;
                            }
                        });
                        return catename.substring(0, catename.length - ('<span>, </span>').length);
                    }
                    return '';
                }
            },
            {
                data: function(data, type, dataToSet) {
                    var filmTypeName = (data.filmtype) ? data.filmtype : "";
                    filmTypeName = (filmTypeName=="phim-le") ? "Phim lẻ" : filmTypeName;
                    filmTypeName = (filmTypeName=="phim-bo") ? "Phim bộ" : filmTypeName;
                    filmTypeName = (filmTypeName=="amine") ? "Amine" : filmTypeName;
                    return filmTypeName;
                }
            },
            { data: 'channelplay' },
            { data: 'filmtime' },
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
                    return createDataColumnToggleAajx(data.id, data.slider, "slider", "Hiển thị ở Slider", "Bỏ hiển thị ở Slider", false);
                }
            },
            {
                data: function(data, type, dataToSet) {
                    return createDataColumnToggleAajx(data.id, data.recommanded, "recommanded", "Hiển thị ở Đề xuất", "Bỏ hiển thị ở Đề xuất", false);
                }
            },
            {
                data: function(data, type, dataToSet) {
                    return createDataColumnToggleAajx(data.id, data.copyright, "copyright", "Bật bản quyền", "Tắt bản quyền", false);
                }
            },
            {
                data: function(data, type, dataToSet) {
                    return createDataColumnToggleAajx(data.id, data.allowindex, "allowindex", "Bật Google Index", "Tắt Google Index", false);
                }
            },
            {
                data: function(data, type, dataToSet) {
                    return createDataColumnToggleAajx(data.id, data.done, "done", "Đã hoàn thành", "Chưa hoàn thành", false);
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
            targets: 1,            
            orderable: false,
        }, {
            targets: 3,            
            orderable: false,
        }, {
            targets: 4,            
            orderable: false,
        }, {
            targets: 9,            
            orderable: false,
        }, {
            targets: 10,            
            orderable: false,
        }, {
            targets: 11,            
            orderable: false,
        }, {
            targets: 12,            
            orderable: false,
        }, {
            targets: 13,
            orderable: false,
        }, {
            targets: 14,
            orderable: false,
        }, {
            targets: 15,
            className: "text-right",
            render: function(data, type, full, meta) {
                var dateText = formart_datetime(data, "full");
                return dateText;
            },
        }],
        order: [
            [15, "desc"]
        ]
    });
    var oTable = $('#datatable-sside').DataTable();    
});