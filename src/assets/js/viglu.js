/*
=========================================================
* viglu - Dashboard
=========================================================
* Custom modifications by Luc Vigato (2025) - https://github.com/viglu/viglu-dashboard
* Based on Volt Free Bootstrap 5 Dashboard
* Original Product Page: https://themesberg.com/product/admin-dashboard/volt-bootstrap-5-dashboard
* Original Copyright 2021 Themesberg (https://www.themesberg.com)
* License: MIT (https://themesberg.com/licensing)
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. Please contact us to request a removal. Contact us if you want to remove it.
*/

"use strict";
const d = document;
d.addEventListener("DOMContentLoaded", function(event) {

// options
    const breakpoints = {
        sm: 540,
        md: 720,
        lg: 960,
        xl: 1140
    };

    var sidebar = document.getElementById('sidebarMenu');
    if(sidebar && d.body.clientWidth < breakpoints.lg) {
        sidebar.addEventListener('shown.bs.collapse', function () {
            document.querySelector('body').style.position = 'fixed';
        });
        sidebar.addEventListener('hidden.bs.collapse', function () {
            document.querySelector('body').style.position = 'relative';
        });
    }

    var iconNotifications = d.querySelector('.notification-bell');
    if (iconNotifications) {
        iconNotifications.addEventListener('shown.bs.dropdown', function () {
            iconNotifications.classList.remove('unread');
        });
    }

    [].slice.call(d.querySelectorAll('[data-background]')).map(function(el) {
        el.style.background = 'url(' + el.getAttribute('data-background') + ')';
    });

    [].slice.call(d.querySelectorAll('[data-background-lg]')).map(function(el) {
        if(document.body.clientWidth > breakpoints.lg) {
            el.style.background = 'url(' + el.getAttribute('data-background-lg') + ')';
        }
    });

    [].slice.call(d.querySelectorAll('[data-background-color]')).map(function(el) {
        el.style.background = 'url(' + el.getAttribute('data-background-color') + ')';
    });

    [].slice.call(d.querySelectorAll('[data-color]')).map(function(el) {
        el.style.color = 'url(' + el.getAttribute('data-color') + ')';
    });

//Tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

// Popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    })

// Datepicker
    var datepickers = [].slice.call(d.querySelectorAll('[data-datepicker]'))
    var datepickersList = datepickers.map(function (el) {
        return new Datepicker(el, {
            buttonClass: 'btn'
        });
    })

    if(d.querySelector('.input-slider-container')) {
        [].slice.call(d.querySelectorAll('.input-slider-container')).map(function(el) {
            var slider = el.querySelector(':scope .input-slider');
            var sliderId = slider.getAttribute('id');
            var minValue = slider.getAttribute('data-range-value-min');
            var maxValue = slider.getAttribute('data-range-value-max');

            var sliderValue = el.querySelector(':scope .range-slider-value');
            var sliderValueId = sliderValue.getAttribute('id');
            var startValue = sliderValue.getAttribute('data-range-value-low');

            var c = d.getElementById(sliderId),
                id = d.getElementById(sliderValueId);

            noUiSlider.create(c, {
                start: [parseInt(startValue)],
                connect: [true, false],
                range: {
                    'min': [parseInt(minValue)],
                    'max': [parseInt(maxValue)]
                }
            });
        });
    }

    if (d.getElementById('input-slider-range')) {
        var c = d.getElementById("input-slider-range"),
            low = d.getElementById("input-slider-range-value-low"),
            e = d.getElementById("input-slider-range-value-high"),
            f = [d, e];

        noUiSlider.create(c, {
            start: [parseInt(low.getAttribute('data-range-value-low')), parseInt(e.getAttribute('data-range-value-high'))],
            connect: !0,
            tooltips: true,
            range: {
                min: parseInt(c.getAttribute('data-range-value-min')),
                max: parseInt(c.getAttribute('data-range-value-max'))
            }
        }), c.noUiSlider.on("update", function (a, b) {
            f[b].textContent = a[b]
        });
    }

// ApexCharts

// Sales Value Chart
    if(d.querySelector('#salesValueChart')) {
        var salesValueOptions = {
            series: [{
                name: 'Sales',
                data: [0, 10, 30, 40, 80, 60, 100]
            }],
            chart: {
                type: 'area',
                height: 250,
                toolbar: {
                    show: false
                },
                sparkline: {
                    enabled: false
                }
            },
            colors: ['#31316A'],
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: 'vertical',
                    shadeIntensity: 0.3,
                    opacityFrom: 0.7,
                    opacityTo: 0.3,
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 3
            },
            xaxis: {
                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                labels: {
                    style: {
                        colors: '#262B40',
                        fontSize: '12px'
                    }
                },
                axisBorder: {
                    show: true
                }
            },
            yaxis: {
                show: false
            },
            grid: {
                show: true,
                borderColor: '#F8BD7A',
                strokeDashArray: 2,
                xaxis: {
                    lines: {
                        show: true
                    }
                }
            },
            tooltip: {
                enabled: true,
                y: {
                    formatter: function(value) {
                        return '$' + value + 'k';
                    }
                }
            }
        };

        var salesValueChart = new ApexCharts(document.querySelector("#salesValueChart"), salesValueOptions);
        salesValueChart.render();
    }

// Ranking Chart
    if(d.querySelector('#rankingChart')) {
        var rankingOptions = {
            series: [{
                name: 'Rank 1',
                data: [1, 5, 2, 5, 4, 3]
            }, {
                name: 'Rank 2',
                data: [2, 3, 4, 8, 1, 2]
            }],
            chart: {
                type: 'bar',
                height: 300,
                toolbar: {
                    show: false
                },
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800,
                    animateGradually: {
                        enabled: true,
                        delay: 150
                    }
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    borderRadius: 2
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                labels: {
                    style: {
                        colors: '#262B40',
                        fontSize: '12px',
                        fontWeight: 600
                    }
                }
            },
            yaxis: {
                show: false
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val
                    }
                }
            },
            colors: ['#31316A', '#6366F1'],
            grid: {
                show: false
            }
        };

        var rankingChart = new ApexCharts(document.querySelector("#rankingChart"), rankingOptions);
        rankingChart.render();
    }

// Traffic Share Chart (Donut)
    if(d.querySelector('#trafficShareChart')) {
        var trafficShareOptions = {
            series: [70, 20, 10],
            chart: {
                type: 'donut',
                height: 300,
            },
            labels: ['Desktop', 'Mobile', 'Tablet'],
            colors: ['#31316A', '#6366F1', '#F8BD7A'],
            plotOptions: {
                pie: {
                    donut: {
                        size: '70%',
                        labels: {
                            show: true,
                            total: {
                                show: true,
                                label: 'Total',
                                formatter: function (w) {
                                    return w.globals.seriesTotals.reduce((a, b) => a + b, 0) + '%'
                                }
                            }
                        }
                    }
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function(val) {
                    return Math.round(val) + "%"
                },
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    colors: ['#fff']
                },
                dropShadow: {
                    enabled: false
                }
            },
            stroke: {
                width: 3,
                colors: ['#fff']
            },
            legend: {
                show: true,
                position: 'bottom'
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "%"
                    }
                }
            }
        };

        var trafficShareChart = new ApexCharts(document.querySelector("#trafficShareChart"), trafficShareOptions);
        trafficShareChart.render();
    }

    if (d.getElementById('loadOnClick')) {
        d.getElementById('loadOnClick').addEventListener('click', function () {
            var button = this;
            var loadContent = d.getElementById('extraContent');
            var allLoaded = d.getElementById('allLoadedText');

            button.classList.add('btn-loading');
            button.setAttribute('disabled', 'true');

            setTimeout(function () {
                loadContent.style.display = 'block';
                button.style.display = 'none';
                allLoaded.style.display = 'block';
            }, 1500);
        });
    }

    var scroll = new SmoothScroll('a[href*="#"]', {
        speed: 500,
        speedAsDuration: true
    });

    if(d.querySelector('.current-year')){
        d.querySelector('.current-year').textContent = new Date().getFullYear();
    }

});