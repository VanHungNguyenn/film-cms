"use strict";


// Class definition
var KTDatatableRemoteAjaxDemo = function() {
    // Private functions

    // basic demo
    var demo = function() {
        var datatable = $('#kt_datatable_folder').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: `/${dashboard}/folder/ajax/`,
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
                        <div class="symbol symbol-60 symbol-2by3 flex-shrink-0 mr-4">
                            <div class="symbol-label" style="background-image: url('${row.TaskFilm.thumb}')"></div>
                        </div>
                        <div class="ml-4">
                            <a href="${row.TaskFilm.url}" target="_blank">${row.TaskFilm.name}</a>
                        </div>
                    </div>`;
                },
            }, {
                field: 'folderId',
                title: 'Folder',
                template: function(row) {
                    return `<a href="https://drive.google.com/drive/folders/${row.folderId}">${row.folderId}</a>`;
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
