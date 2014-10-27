/*
 * File: app/controller/VmManagementController.js
 *
 * This file was generated by Sencha Architect version 3.0.4.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('spider.controller.VmManagementController', {
    extend: 'Ext.app.Controller',

    onVmListCycleBtnClick: function(item, e, eOpts) {
        Ext.getCmp("vmListCycleBtn").setText(item.text);

        this.getInstanceDashboard(item.code);
    },

    onNetworkInstanceTabPanelTabChange: function(tabPanel, newCard, oldCard, eOpts) {
        //if(newCard.title)

        if(oldCard.title == "") {
            clearInterval(GlobalData.intervalId2);
        }

        //this.changeNetworkInstanceTab()
    },

    initVmManagement: function(record, tabIndex) {
        vmConstants.selectVmId = record.get("id");

        Ext.getCmp("mgmtVmHostName").setValue(record.get("vmhostName"));
        Ext.getCmp("mgmtVmName").setValue(record.get("text"));

        if(tabIndex) {

            Ext.getCmp("networkInstanceTabPanel").setActiveTab(tabIndex);

        } else {

            Ext.getCmp("networkInstanceTabPanel").setActiveTab(0);

        }
    },

    init: function(application) {
                var vmMgmt = this;

                //VM Menu Constants
                Ext.define('vmConstants', {
                    singleton: true,
                    me : vmMgmt,

                    selectVmId : null,

                    vmCombo : null

                });

        this.control({
            "#vmListCycleBtn menuitem": {
                click: this.onVmListCycleBtnClick
            },
            "#networkInstanceTabPanel": {
                tabchange: this.onNetworkInstanceTabPanelTabChange
            }
        });
    },

    getUtilzation: function(index) {

        // Case 3
        var currentDate = new Date();

        // milli second 값을 지운다.
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDay(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());

        // chart에 표시될 x축 개수
        var length = 10;

        // x축의 시간 차(초)
        // length가 20이고 step이 3일 경우 1분간의 데이터가 3초 단위로 20번 표시된다.
        // length가 30이고 step이 2일 경우 1분간의 데이터가 2초 단위로 30번 표시된다.
        var step = 1;

        // CPU, Memory, Network Chart를 위한 변수 설정
        var cpuChart, memoryChart, networkChart;
        var chartData = [];

        //var store = Ext.getStore('ChartDataStore');
        var store = Ext.create('Ext.data.Store', {
            fields: ['date', 'cpu', 'memory', 'network']
        });
        /*
        Ext.ComponentManager.unregister(Ext.getCmp('cpuChart'));
        Ext.ComponentManager.unregister(Ext.getCmp('memoryChart'));
        Ext.ComponentManager.unregister(Ext.getCmp('networkChart'));

        // CPU Chart 생성 후 cpuPanel에 draw 한다.
        var cpuChartItem = Ext.create('Ext.chart.Chart', {
            width: 250,
            height: 170,
            style: 'background:#fff',
            id: 'cpuChart',
            store: store,
            shadow: true,
            animate: true,
            //margins: '15 0 0 0',
            legend: {
                visible: false,
                position: 'bottom'
            },
            axes: [{
                type: 'Numeric',
                minimum: 0,
                maximum: 100,
                position: 'left',
                grid: {
                    odd: {
                        fill: '#dedede',
                        stroke: '#ddd',
                        'stroke-width': 0.5
                    }
                }
            }, {
                type: 'Time',
                position: 'bottom',
                fields: 'date',
                dateFormat: 'H:i:s',
                title: 'AVG CPU Utilization',
                constrain: true,
                fromDate: Ext.Date.add(currentDate, Ext.Date.SECOND, 0),
                toDate: Ext.Date.add(currentDate, Ext.Date.SECOND, (length * step)),
                grid: true,
                step: [
                    's',
                    step
                ],
                label: {
                    rotate: {
                        degrees: 315
                    }
                }
            }],
            series: [{
                type: 'line',
                smooth: false,
                fill: true,
                axis: ['left', 'bottom'],
                xField: 'date',
                yField: 'cpu',
                title: 'AVG CPU Utilization',
                label: {
                    display: '',
                    field: 'cpu',
                    renderer: function(v) { return v >> 0; },
                    'text-anchor': 'middle'
                },
                markerConfig: {
                    radius: 2,
                    size: 2
                }
            }]
        });

        // Memory Chart 생성 후 memoryPanel에 draw 한다.
        var memoryChartItem = Ext.create('Ext.chart.Chart', {
            width: 250,
            height: 170,
            style: 'background:#fff',
            id: 'memoryChart',
            store: store,
            shadow: true,
            animate: true,
            //margins: '15 0 0 0',
            legend: {
                visible: false,
                position: 'bottom'
            },
            axes: [{
                type: 'Numeric',
                minimum: 0,
                maximum: 100,
                position: 'left',
                grid: {
                    odd: {
                        fill: '#dedede',
                        stroke: '#ddd',
                        'stroke-width': 0.5
                    }
                }
            }, {
                type: 'Time',
                position: 'bottom',
                fields: 'date',
                dateFormat: 'H:i:s',
                title: 'AVG Memory Utilization',
                constrain: true,
                fromDate: Ext.Date.add(currentDate, Ext.Date.SECOND, 0),
                toDate: Ext.Date.add(currentDate, Ext.Date.SECOND, (length * step)),
                grid: true,
                step: [
                    's',
                    step
                ],
                label: {
                    rotate: {
                        degrees: 315
                    }
                }
            }],
            series: [{
                type: 'line',
                smooth: false,
                fill: true,
                axis: ['left', 'bottom'],
                xField: 'date',
                yField: 'memory',
                title: 'AVG Memory Utilization',
                label: {
                    display: '',
                    field: 'memory',
                    renderer: function(v) { return v >> 0; },
                    'text-anchor': 'middle'
                },
                markerConfig: {
                    radius: 2,
                    size: 2
                }
            }]
        });

        // Network Chart 생성 후 networkPanel에 draw 한다.
        var networkChartItem = Ext.create('Ext.chart.Chart', {
            width: 250,
            height: 170,
            style: 'background:#fff',
            id: 'networkChart',
            store: store,
            shadow: true,
            animate: true,
            //margins: '15 0 0 0',
            legend: {
                visible: false,
                position: 'bottom'
            },
            axes: [{
                type: 'Numeric',
                minimum: 0,
                maximum: 100,
                position: 'left',
                grid: {
                    odd: {
                        fill: '#dedede',
                        stroke: '#ddd',
                        'stroke-width': 0.5
                    }
                }
            }, {
                type: 'Time',
                position: 'bottom',
                fields: 'date',
                dateFormat: 'H:i:s',
                title: 'AVG Network Utilization',
                constrain: true,
                fromDate: Ext.Date.add(currentDate, Ext.Date.SECOND, 0),
                toDate: Ext.Date.add(currentDate, Ext.Date.SECOND, (length * step)),
                grid: true,
                step: [
                    's',
                    step
                ],
                label: {
                    rotate: {
                        degrees: 315
                    }
                }
            }],
            series: [{
                type: 'line',
                smooth: false,
                fill: true,
                axis: ['left', 'bottom'],
                xField: 'date',
                yField: 'network',
                title: 'AVG Network Utilization',
                label: {
                    display: '',
                    field: 'network',
                    renderer: function(v) { return v >> 0; },
                    'text-anchor': 'middle'
                },
                markerConfig: {
                    radius: 2,
                    size: 2
                }
            }]
        });

        Ext.getCmp('cpuChartPanel').removeAll();
        Ext.getCmp('memoryChartPanel').removeAll();
        Ext.getCmp('networkChartPanel').removeAll();

        Ext.getCmp('cpuChartPanel').add(cpuChartItem);
        Ext.getCmp('memoryChartPanel').add(memoryChartItem);
        Ext.getCmp('networkChartPanel').add(networkChartItem);
        */
        cpuChart = Ext.getCmp('cpuChart');
        memoryChart = Ext.getCmp('memoryChart');
        networkChart = Ext.getCmp('networkChart');

        // Real-Time Chart를 위해 주기적으로 상태정보 조회 호출하도록 설정한다.
        clearInterval(GlobalData.intervalId1);
        GlobalData.intervalId1 = setInterval(function() {
            loadStat();
        }, step * 1000);

        // Utilization 상태 정보를 조회하기 위한 function
        loadStat = function() {
            var last = false, date = new Date();
            chartData = chartData.slice();

            last = chartData[chartData.length -1];

            chartData.push({
                date: new Date(date.getFullYear(), date.getMonth(), date.getDay(), date.getHours(), date.getMinutes(), date.getSeconds()),
                cpu: Math.min(100, Math.max(last? last.cpu + (Math.random() - 0.5) * 10 : 5, 5)),
                memory: Math.min(100, Math.max(last? last.memory + (Math.random() - 0.5) * 25 : 40, 40)),
                network: Math.min(100, Math.max(last? last.network + (Math.random() - 0.5) * 15 : 20, 20))
            });

            if (chartData.length > length + 1) {
                chartData.splice(0, 1);
            }

            cpuAxis = cpuChart.axes.get(1);
            memoryAxis = memoryChart.axes.get(1);
            networkAxis = networkChart.axes.get(1);

            var toDate = cpuAxis.toDate,
                lastDate = chartData[chartData.length - 1].date;

            if (+toDate < +lastDate) {
                cpuAxis.fromDate = chartData[0].date;
                cpuAxis.toDate = chartData[chartData.length -1].date;
                memoryAxis.fromDate = chartData[0].date;
                memoryAxis.toDate = chartData[chartData.length -1].date;
                networkAxis.fromDate = chartData[0].date;
                networkAxis.toDate = chartData[chartData.length -1].date;

                cpuChart.markerIndex = 1;
                networkChart.markerIndex = 1;
                memoryChart.markerIndex = 1;
            } else {
                cpuAxis.fromDate = chartData[0].date;
                cpuAxis.toDate = Ext.Date.add(chartData[0].date, Ext.Date.SECOND, (length * step));
                memoryAxis.fromDate = chartData[0].date;
                memoryAxis.toDate = Ext.Date.add(chartData[0].date, Ext.Date.SECOND, (length * step));
                networkAxis.fromDate = chartData[0].date;
                networkAxis.toDate = Ext.Date.add(chartData[0].date, Ext.Date.SECOND, (length * step));
            }

            store.loadData(chartData);
        };
    },

    getInstanceDashboard: function(no) {

        var vmStore = Ext.getStore("HostListStore");
        var r = vmStore.findRecord("no", no);
        var idx = vmStore.indexOf(r);

        //console.log("Host Index : " + idx + ", Instance Index : " + index);

        //Ext.getCmp('instanceDashboardBtn').fireEvent('click');

        var data = Ext.getStore('HostListStore').proxy.data[idx].instances[0];

        var gridStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'description', 'ip', 'status', 'in', 'out'],
            data: data.interfaces
        });

        Ext.getCmp('cpuBar').updateProgress(data.usage.cpu.percentage / 100, data.usage.cpu.percentage + "%");
        Ext.getCmp('memoryBar').updateProgress(data.usage.memory.percentage / 100, data.usage.memory.percentage + "% of " + data.usage.memory.total);
        Ext.getCmp('diskBar').updateProgress(data.usage.disk.percentage / 100, data.usage.disk.percentage + "% of " + data.usage.disk.total);

        Ext.getCmp('domainNameLabel').update(data.information.domain);
        Ext.getCmp('dnsServersLabel').update(data.information.dns);
        Ext.getCmp('bootViaLabel').update(data.information.boot);
        Ext.getCmp('imagesLabel').update(data.information.images);
        Ext.getCmp('entitlementLabel').update(data.information.entitlement);

        Ext.getCmp('interfacesGridPanel').reconfigure(gridStore, gridStore.fields);

        Ext.getCmp('interfacesCombo').bindStore(gridStore);
        Ext.getCmp('interfacesCombo').setValue(gridStore.proxy.data[0].name);
        Ext.getCmp('interfacesCombo').fireEvent('select');

        var cpu = data.usage.cpu.percentage,
            memory = data.usage.memory.percentage,
            disk = data.usage.disk.percentage;

        //Resource Usage를 위해 주기적으로 상태정보 조회 호출하도록 설정한다.
        clearInterval(GlobalData.intervalId2);
        GlobalData.intervalId2 = setInterval(function() {
            loadResourceUsage();
        }, 2000);

        loadResourceUsage = function() {
            cpu = Math.min(100, Math.max(+cpu + (Math.random() - 0.5), 0));
            memory = Math.min(100, Math.max(+memory + (Math.random() - 0.5) * 2, 0));
            disk = Math.min(100, Math.max(+disk + (Math.random() - 0.5) / 2, 0));

            Ext.getCmp('cpuBar').updateProgress(cpu / 100, cpu.toFixed(2) + "%");
            Ext.getCmp('memoryBar').updateProgress(memory / 100, memory.toFixed(2) + "% of " + data.usage.memory.total);
            Ext.getCmp('diskBar').updateProgress(disk / 100, disk.toFixed(2) + "% of " + data.usage.disk.total);

        };

        this.interfacesSelect(0);
    },

    interfacesSelect: function(index) {
        var currentDate = new Date();

        // milli second 값을 지운다.
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDay(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());

        // chart에 표시될 x축 개수
        var length = 60;

        // x축의 시간 차(초)
        // length가 20이고 step이 3일 경우 1분간의 데이터가 3초 단위로 20번 표시된다.
        // length가 30이고 step이 2일 경우 1분간의 데이터가 2초 단위로 30번 표시된다.
        var step = 1;

        var interfaceChart;
        var ifChartData = [];

        var ifChartStore = Ext.create('Ext.data.Store', {
            fields: ['date', 'cur_in', 'cur_out']
        });

        Ext.ComponentManager.unregister(Ext.getCmp('interfaceChart'));

        var curIn = 0, curOut = 0, avgIn = 0, avgOut = 0, peakIn = 0, peakOut = 0;
        var cnt = 0;

        var curInLabel = Ext.getCmp('curInLabel'),
            curOutLabel = Ext.getCmp('curOutLabel'),
            avgInLabel = Ext.getCmp('avgInLabel'),
            avgOutLabel = Ext.getCmp('avgOutLabel'),
            peakInLabel = Ext.getCmp('peakInLabel'),
            peakOutLabel = Ext.getCmp('peakOutLabel');

        // interfaceChart 생성 후 ifChartPanel에 draw 한다.
        var interfaceChartItem = Ext.create('Ext.chart.Chart', {
            width: 250,
            height: 400,
            style: 'background:#fff',
            id: 'interfaceChart',
            store: ifChartStore,
            shadow: true,
            animate: true,
            //margins: '15 0 0 0',
            //autoSize: true, // true로 변경하면 Error: Invalid value for <svg> attribute width="-Infinity" 에러 발생
            //insetPadding: 20,
            legend: {
                visible: true,
                position: 'bottom'
            },
            axes: [{
                type: 'Numeric',
                //minimum: 0,
                //maximum: 100,
                position: 'left',
                title: 'Usage (kbps)',
                grid: {
                    odd: {
                        fill: '#dedede',
                        stroke: '#ddd',
                        'stroke-width': 0.5
                    }
                }
            }, {
                type: 'Time',
                position: 'bottom',
                fields: 'date',
                dateFormat: 'H:i:s',
                constrain: true,
                fromDate: Ext.Date.add(currentDate, Ext.Date.SECOND, 0),
                toDate: Ext.Date.add(currentDate, Ext.Date.SECOND, (length * step)),
                grid: true,
                step: [
                    's',
                    step
                ],
                label: {
                    rotate: {
                        degrees: 315
                    }
                }
            }],
            series: [{
                type: 'line',
                smooth: false,
                fill: false,
                axis: ['left', 'bottom'],
                xField: 'date',
                yField: 'cur_in',
                title: 'Network In',
                label: {
                    display: 'none',
                    field: 'cur_in',
                    renderer: function(v) { return v >> 0; },
                    'text-anchor': 'middle'
                },
                markerConfig: {
                    radius: 3,
                    size: 3
                }
            },{
                type: 'line',
                smooth: false,
                fill: false,
                axis: ['left', 'bottom'],
                xField: 'date',
                yField: 'cur_out',
                title: 'Network Out',
                label: {
                    display: 'none',
                    field: 'cur_out',
                    renderer: function(v) { return v >> 0; },
                    'text-anchor': 'middle'
                },
                markerConfig: {
                    radius: 3,
                    size: 3
                }
            }]
        });

        Ext.getCmp('ifChartPanel').removeAll();
        Ext.getCmp('ifChartPanel').add(interfaceChartItem);

        interfaceChart = Ext.getCmp('interfaceChart');

        // Real-Time Chart를 위해 주기적으로 상태정보 조회 호출하도록 설정한다.
        clearInterval(GlobalData.intervalId3);
        GlobalData.intervalId3 = setInterval(function() {
            loadNetworkRealtime();
        }, step * 2000);

        // 실시간 네트워크 인터페이스 상태 정보를 조회하기 위한 function
        loadNetworkRealtime = function() {
            var last = false, date = new Date();
            ifChartData = ifChartData.slice();

            last = ifChartData[ifChartData.length -1];

            curIn = Math.min(200, Math.max(last? last.cur_in + ((Math.random() - 0.5) * 2345) / 1000 : 15.27, 1.52));
            curOut = Math.min(200, Math.max(last? last.cur_out + ((Math.random() - 0.5) * 1234) / 1000 : 8.96, 1.52));

            ifChartData.push({
                date: new Date(date.getFullYear(), date.getMonth(), date.getDay(), date.getHours(), date.getMinutes(), date.getSeconds()),
                cur_in: curIn,
                cur_out: curOut
            });

            if (ifChartData.length > length + 1) {
                ifChartData.splice(0, 1);
            }

            ifAxis = interfaceChart.axes.get(1);

            var toDate = ifAxis.toDate,
                lastDate = ifChartData[ifChartData.length - 1].date;

            if (+toDate < +lastDate) {
                ifAxis.fromDate = ifChartData[0].date;
                ifAxis.toDate = ifChartData[ifChartData.length -1].date;

                interfaceChart.markerIndex = 1;
            } else {
                ifAxis.fromDate = ifChartData[0].date;
                ifAxis.toDate = Ext.Date.add(ifChartData[0].date, Ext.Date.SECOND, (length * step));
            }

            if (peakIn < curIn) {
                peakIn = curIn;
            }
            if (peakOut < curOut) {
                peakOut = curOut;
            }

            if (cnt === 0) {
                avgIn = curIn;
                avgOut = curOut;
            } else {
                if (cnt > 1000000) {
                    cnt = 1000000;
                }
                avgIn = ((avgIn * cnt) + curIn) / (cnt + 1);
                avgOut = ((avgOut * cnt) + curOut) / (cnt + 1);
            }

            cnt++;

            curInLabel.setText(curIn.toFixed(2) + " kbps");
            curOutLabel.setText(curOut.toFixed(2) + " kbps");
            avgInLabel.setText(avgIn.toFixed(2) + " kbps");
            avgOutLabel.setText(avgOut.toFixed(2) + " kbps");
            peakInLabel.setText(peakIn.toFixed(2) + " kbps");
            peakOutLabel.setText(peakOut.toFixed(2) + " kbps");

            ifChartStore.loadData(ifChartData);
        };
    }

});
