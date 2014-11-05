/*
 * File: app.js
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

// @require @packageOverrides
Ext.Loader.setConfig({
    enabled: true
});


Ext.application({

    requires: [
        'Ext.window.MessageBox'
    ],
    models: [
        'HostListData',
        'SampleModel',
        'VmHostModel',
        'VmTemplateModel',
        'VmNicModel',
        'SessionModel'
    ],
    stores: [
        'ServerListStore',
        'HostListStore',
        'ChartDataStore',
        'SampleStore',
        'VmHostStore',
        'ComboVmTemplateStore',
        'VmHostInterfaceStore',
        'VmHostChartStore',
        'VmCpuChartStore',
        'VmMemoryChartStore',
        'VmNetworkChartStore',
        'VmNicStore',
        'VmInterfaceStore',
        'SessionStore'
    ],
    views: [
        'AthenaSpider',
        'MyContainer1',
        'VMHostInfoWindow',
        'MyPanel119',
        'DashBoardNodePanel',
        'AddVmHostWindow',
        'AddVmWindow',
        'AddBondingWindow',
        'LoginWindow'
    ],
    controllers: [
        'HeaderController',
        'GlobalController',
        'MenuController',
        'DashboardController',
        'VmManagementController',
        'VmHostController',
        'LoginController'
    ],
    name: 'spider',

    launch: function() {
        Ext.create('spider.view.AthenaSpider');
    }

});
