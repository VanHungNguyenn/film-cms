"use strict";


// Class definition
var KTDatatableRemoteAjaxDemo = function() {
    // Private functions

    // basic demo
    var demo = function() {
        var datatable = $('#kt_datatable_taskcomic').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: `/${dashboard}/taskcomic/ajax/`,
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
                title: 'Truyện',
                template: function(row) {
                    return `<div class="d-flex align-items-center">
                        <div class="symbol symbol-60 symbol-2by3 flex-shrink-0 mr-4">
                            <div class="symbol-label" style="background-image: url('${row.thumb}')"></div>
                        </div>
                        <div class="ml-4">
                            <a href="${row.url}" target="_blank">${row.name}</a>
                        </div>
                    </div>`;
                },
            }, {
                field: 'server',
                title: 'Server',
                template: function(row) {
                    return `<button class="btn btn-outline-primary">${row.server}</button>`;
                },
            }, {
                field: 'status',
                title: 'Trạng Thái',
                template: function(row) {
                    switch(row.status) {
                        case "pending":
                            return `<button class="btn btn-light">Pending</button>`;
                        case "processing":
                            return `<button class="btn btn-primary">Processing</button>`;
                        case "ready":
                            return `<button class="btn btn-success">Ready</button>`;
                        case "disabled":
                            return `<button class="btn btn-dark">Ready</button>`;
                        case "notfound":
                            return `<button class="btn btn-success">Not Found</button>`;
                    }
                },
            }, {
                field: 'count',
                title: 'Task',
                sortable: false,
                template: function(row) {
                    let count = 0;
                    if(row.TaskChapters.length > 0) count = row.TaskChapters.length;
                    return `<a href="/${dashboard}/taskchapter/?taskcomic=${row.url}" target="_blank" class="btn btn-outline-primary">${count}</a>`;
                },
            }, {
                field: 'updatedAt',
                title: 'Hành Động',
                sortable: false,
                overflow: 'visible',
                template: function(row) {
                    return `<a data-type="taskcomic" data-id="${row.id}" class="btn btn-icon btn-light btn-hover-primary btn-sm btn-edit" title="Sửa">
                                <span class="svg-icon svg-icon-primary svg-icon-2x">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <rect x="0" y="0" width="24" height="24"/>
                                            <path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953) "/>
                                            <path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/>
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

        $('#kt_datatable_search_server').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'server');
        });

        $('#kt_datatable_search_status').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'status');
        });

        $('#kt_datatable_search_used').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'used');
        });

        $('#kt_datatable_search_server, #kt_datatable_search_status, #kt_datatable_search_used').selectpicker();

        $('#kt_modal_edit').on('shown.bs.modal', function () {
            $('#kt_modal_edit #used').selectpicker();
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
