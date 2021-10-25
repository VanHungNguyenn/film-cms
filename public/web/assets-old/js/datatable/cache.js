"use strict";


// Class definition
var KTDatatableRemoteAjaxDemo = function() {
    // Private functions
    let type = "cache";
    // basic demo
    var demo = function() {
        var datatable = $(`#kt_datatable_${type}`).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: `/${dashboard}/${type}/ajax/`,
                    },
                },
                pageSize: 10,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: false,
            },
            // layout definition
            layout: {
                scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                footer: false // display/hide footer
            },
            // column sorting
            sortable: false,
            pagination: true,
            search: {
                input: $('#kt_datatable_search_query'),
                key: 'key'
            },
            // columns definition
            columns: [{
                field: 'key',
                title: 'Key',
                template: function(row) {
                    return `<input class="form-control" value="${row.key}" readonly>`;
                },
            }, {
                field: 'value',
                title: 'Value',
                template: function(row) {
                    return `<textarea class="form-control" rows="5" readonly>${row.value}</textarea>`;
                },
            }, {
                field: 'updatedAt',
                title: 'Hành Động',
                sortable: false,
                overflow: 'visible',
                template: function(row) {
                    // return `<a data-type="${type}" data-id="${row.key}" class="btn btn-icon btn-light btn-hover-primary btn-sm mr-1 btn-view" title="Xem Cache">
                    //             <span class="svg-icon svg-icon-primary svg-icon-2x">
                    //                 <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                    //                     <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    //                         <rect x="0" y="0" width="24" height="24"/>
                    //                         <path d="M17.2718029,8.68536757 C16.8932864,8.28319382 16.9124644,7.65031935 17.3146382,7.27180288 C17.7168119,6.89328641 18.3496864,6.91246442 18.7282029,7.31463817 L22.7282029,11.5646382 C23.0906029,11.9496882 23.0906029,12.5503176 22.7282029,12.9353676 L18.7282029,17.1853676 C18.3496864,17.5875413 17.7168119,17.6067193 17.3146382,17.2282029 C16.9124644,16.8496864 16.8932864,16.2168119 17.2718029,15.8146382 L20.6267538,12.2500029 L17.2718029,8.68536757 Z M6.72819712,8.6853647 L3.37324625,12.25 L6.72819712,15.8146353 C7.10671359,16.2168091 7.08753558,16.8496835 6.68536183,17.2282 C6.28318808,17.6067165 5.65031361,17.5875384 5.27179713,17.1853647 L1.27179713,12.9353647 C0.909397125,12.5503147 0.909397125,11.9496853 1.27179713,11.5646353 L5.27179713,7.3146353 C5.65031361,6.91246155 6.28318808,6.89328354 6.68536183,7.27180001 C7.08753558,7.65031648 7.10671359,8.28319095 6.72819712,8.6853647 Z" fill="#000000" fill-rule="nonzero"/>
                    //                         <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-345.000000) translate(-12.000000, -12.000000) " x="11" y="4" width="2" height="16" rx="1"/>
                    //                     </g>
                    //                 </svg>
                    //             </span>
                    //         </a>
                    //         <a data-type="${type}" data-id="${row.key}" class="btn btn-icon btn-light btn-hover-primary btn-sm btn-delete" title="Xóa cache">
                    //             <span class="svg-icon svg-icon-primary svg-icon-2x">
                    //                 <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                    //                     <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    //                         <rect x="0" y="0" width="24" height="24"/>
                    //                         <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"/>
                    //                         <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"/>
                    //                     </g>
                    //                 </svg>
                    //             </span>
                    //         </a>`;
                    return `<a data-type="${type}" data-id="${row.key}" class="btn btn-icon btn-light btn-hover-primary btn-sm btn-delete" title="Xóa cache">
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

        $('#kt_datatable_search_type').selectpicker();
        
        $('#kt_datatable_search_type').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'key');
        });

        $(document).on("click", ".btn-reload", function() {
            $('.datatable').KTDatatable('reload');
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
