"use strict";


// Class definition
var KTDatatableRemoteAjaxDemo = function() {
    // Private functions

    // basic demo
    var demo = function() {
        var datatable = $('#kt_datatable_google').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: `/${dashboard}/google/ajax/`,
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
                field: 'email',
                title: 'Email',
                template: function(row) {
                    return `<input value="${row.email}" class="form-control" readonly>`;
                },
            }, {
                field: 'password',
                title: 'Password',
                template: function(row) {
                    return `<input value="${row.password}" class="form-control" readonly>`;
                },
            }, {
                field: 'status',
                title: 'Trạng Thái',
                template: function(row) {
                    if(row.status == "live") return `<button class="btn btn-outline-success">Live</button>`;
                    else return `<button class="btn btn-outline-danger">Die</button>`;
                },
            }, {
                field: 'updatedAt',
                title: 'Hành Động',
                sortable: false,
                overflow: 'visible',
                template: function(row) {
                    return `<a data-email="${row.email}" class="btn btn-icon btn-light btn-hover-primary btn-sm btn-check" data-clipboard="true" title="Check">
                                <span class="svg-icon svg-icon-primary svg-icon-2x">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <rect x="0" y="0" width="24" height="24"/>
                                            <path d="M1,12 L1,14 L6,14 L6,12 L1,12 Z M0,10 L20,10 C20.5522847,10 21,10.4477153 21,11 L21,15 C21,15.5522847 20.5522847,16 20,16 L0,16 C-0.55228475,16 -1,15.5522847 -1,15 L-1,11 C-1,10.4477153 -0.55228475,10 0,10 Z" fill="#000000" fill-rule="nonzero" transform="translate(10.000000, 13.000000) rotate(-225.000000) translate(-10.000000, -13.000000) "/>
                                            <path d="M17.5,12 L18.5,12 C18.7761424,12 19,12.2238576 19,12.5 L19,13.5 C19,13.7761424 18.7761424,14 18.5,14 L17.5,14 C17.2238576,14 17,13.7761424 17,13.5 L17,12.5 C17,12.2238576 17.2238576,12 17.5,12 Z M20.5,9 L21.5,9 C21.7761424,9 22,9.22385763 22,9.5 L22,10.5 C22,10.7761424 21.7761424,11 21.5,11 L20.5,11 C20.2238576,11 20,10.7761424 20,10.5 L20,9.5 C20,9.22385763 20.2238576,9 20.5,9 Z M21.5,13 L22.5,13 C22.7761424,13 23,13.2238576 23,13.5 L23,14.5 C23,14.7761424 22.7761424,15 22.5,15 L21.5,15 C21.2238576,15 21,14.7761424 21,14.5 L21,13.5 C21,13.2238576 21.2238576,13 21.5,13 Z" fill="#000000" opacity="0.3"/>
                                        </g>
                                    </svg>
                                </span>
                            </a><a data-type="google" data-id="${row.id}" class="btn btn-icon btn-light btn-hover-primary btn-sm btn-edit" title="Sửa">
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
                            <a data-type="google" data-id="${row.id}" class="btn btn-icon btn-light btn-hover-primary btn-sm btn-delete" title="Xóa">
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

		$('#kt_datatable_search_status').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'status');
        });

        $('#kt_datatable_search_status').selectpicker();

        $(document).on("click", ".btn-reload", function() {
            $('.datatable').KTDatatable('reload');
        });

        $('#kt_modal_add, #kt_modal_edit').on('shown.bs.modal', function () {
            $('#kt_modal_add #status, #kt_modal_edit #status').selectpicker();
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