"use strict";


// Class definition
var KTDatatableRemoteAjaxDemo = function() {
    // Private functions

    // basic demo
    var demo = function() {
        var datatable = $('#kt_datatable_comic').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: `/${dashboard}/comic/ajax/`,
                    },
                },
                pageSize: 10,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },
            // layout definition
            layout: {
                scroll: false,
                footer: false,
            },
            // column sorting
            sortable: true,
            pagination: true,
            extensions: {
                checkbox: true,
            },
            search: {
                input: $('#kt_datatable_search_query'),
                key: 'keyword'
            },
            // columns definition
            columns: [{
                field: 'id',
                title: '#',
                sortable: "asc",
                textAlign: 'center',
                width: 100,
            }, {
                field: 'name',
                title: 'Phim',
                template: function(row) {
                    return `<div class="d-flex align-items-center">
                        <img src="${row.thumb}" class="img-thumbnail" style="max-height:120px">
                        <div class="ml-4">
                            <a href="javascript:void(0)">${row.name}</a>
                        </div>
                    </div>`;
                },
            }, {
                field: 'category',
                title: 'Thể Loại',
                sortable: false,
                template: function(row) {
                    let html = "";
                    row.Categories.forEach(item => {
                        html += `<a href="${domain}/the-loai/${item.slug}" target="_blank">${item.name}</a>, `;
                    });
                    return html;
                },
            }, {
                field: 'status',
                title: 'Loại',
                template: function(row) {
                    switch(row.status) {
                        case "none":
                            return `<span class="label label-dark label-inline">None</span>`;
                        case "done":
                            return `<span class="label label-success label-inline">Done</span>`;
                        case "processing":
                            return `<span class="label label-primary label-inline">Processing</span>`;
                    }
                },
            }, {
                field: 'status2',
                title: 'Trạng Thái',
                sortable: false,
                width: 250,
                template: function(row) {
                    const active = {
                        recommended: "",
                        slider: "",
                        adult: "",
                        active: ""
                    }
                    if(row.recommended === "true") active.recommended = "active";
                    if(row.slider === "true") active.slider = "active";
                    if(row.adult === "true") active.adult = "active";
                    if(row.active === "true") active.active = "active";
                    return `<a id="recommended-${row.id}" data-type="recommended" data-id="${row.id}" data-status="${row.recommended}" href="javascript:void(0)" class="btn btn-icon btn-outline-info btn-status-comic ${active.recommended}" title="Recommended">
                                <i class="far fa-bell"></i>
                            </a>
                            <a id="slider-${row.id}" data-type="slider" data-id="${row.id}" data-status="${row.slider}" href="javascript:void(0)" class="btn btn-icon btn-outline-warning btn-status-comic ${active.slider}" title="Slider">
                                <i class="fab fa-slideshare"></i>
                            </a>
                            <a id="adult-${row.id}" data-type="adult" data-id="${row.id}" data-status="${row.adult}" href="javascript:void(0)" class="btn btn-icon btn-outline-info btn-status-comic ${active.adult}" title="Adult">
                                <i class="far fa-bell"></i>
                            </a>
                            <a id="active-${row.id}" data-type="active" data-id="${row.id}" data-status="${row.active}" href="javascript:void(0)" class="btn btn-icon btn-outline-success btn-status-comic ${active.active}" title="Active">
                                <i class="fas fa-link"></i>
                            </a>`;
                },
            }, {
                field: 'updatedAt',
                title: 'Hành Động',
                sortable: false,
                overflow: 'visible',
                template: function(row) {
                    return `<a href="/${dashboard}/comic/chapter/${row.id}/" class="btn btn-icon btn-light btn-hover-primary btn-sm" title="Danh Sách Chapter">
                                <span class="svg-icon svg-icon-primary svg-icon-2x">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <rect x="0" y="0" width="24" height="24"/>
                                            <path d="M3.5,21 L20.5,21 C21.3284271,21 22,20.3284271 22,19.5 L22,8.5 C22,7.67157288 21.3284271,7 20.5,7 L10,7 L7.43933983,4.43933983 C7.15803526,4.15803526 6.77650439,4 6.37867966,4 L3.5,4 C2.67157288,4 2,4.67157288 2,5.5 L2,19.5 C2,20.3284271 2.67157288,21 3.5,21 Z" fill="#000000" opacity="0.3"/>
                                        </g>
                                    </svg>
                                </span>
                            </a>
                            <a href="/${dashboard}/comic/edit/${row.id}/" class="btn btn-icon btn-light btn-hover-primary btn-sm btn-edit" title="Sửa">
                                <span class="svg-icon svg-icon-primary svg-icon-2x">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <rect x="0" y="0" width="24" height="24"/>
                                            <path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953) "/>
                                            <path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/>
                                        </g>
                                    </svg>
                                </span>
                            </a>
                            <a data-type="comic" data-id="${row.id}" class="btn btn-icon btn-light btn-hover-primary btn-sm btn-delete" title="Xóa">
                                <span class="svg-icon svg-icon-primary svg-icon-2x">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <rect x="0" y="0" width="24" height="24"/>
                                            <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"/>
                                            <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"/>
                                        </g>
                                    </svg>
                                </span>
                            </a>`;
                },
            }],
        });

        $(document).on("click", ".btn-reload", function() {
            $('.datatable').KTDatatable('reload');
        });

        $('#kt_datatable_search_status').selectpicker();
        
        $('#kt_datatable_search_status').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'status');
        });

    };

    return {
        // public functions
        init: function() {
            demo();
        },
    };
}();

jQuery(document).ready(function() {
    KTDatatableRemoteAjaxDemo.init();
});
