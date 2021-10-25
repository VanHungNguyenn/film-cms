$(document).ready(function() {
    var data = {
        server: [],
        status: []
    };
    data.server.push(charts.server.animehay);
    data.server.push(charts.server.fptplay);
    data.server.push(charts.server.hdviet);
    var chartServer = new ApexCharts(
        document.querySelector("#kt_charts_server"),
        {
            chart: {
                height: 345,
                type: 'pie',
            }, 
            series: data.server,
            labels: ["Animehay", "Fptplay", "Hdviet"],
            colors: ["#b13f3f", "#ff6500","#f5cc2a"],
            legend: {
                show: true,
                position: 'bottom',
                horizontalAlign: 'center',
                verticalAlign: 'middle',
                floating: false,
                fontSize: '14px',
                offsetX: 0,
                offsetY: -10
            },
            responsive: [{
                breakpoint: 600,
                options: {
                    chart: {
                        height: 240
                    },
                    legend: {
                        show: false
                    },
                }
            }]
        }
    );
    chartServer.render();

    data.status.push(charts.status.pending);
    data.status.push(charts.status.processing);
    data.status.push(charts.status.ready);
    data.status.push(charts.status.notfound);

    var chartStatus = new ApexCharts(
        document.querySelector("#kt_charts_status"),
        {
            chart: {
                height: 345,
                type: 'pie',
            }, 
            series: data.status,
            labels: ["Pending", "Processing", "Ready", "Notfound"],
            colors: ["#4ac7ec", "#4d79f6","#1ecab8", "#f1646c"],
            legend: {
                show: true,
                position: 'bottom',
                horizontalAlign: 'center',
                verticalAlign: 'middle',
                floating: false,
                fontSize: '14px',
                offsetX: 0,
                offsetY: -10
            },
            responsive: [{
                breakpoint: 600,
                options: {
                    chart: {
                        height: 240
                    },
                    legend: {
                        show: false
                    },
                }
            }]
        }
    );
    chartStatus.render();
});