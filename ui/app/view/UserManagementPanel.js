/*
 * File: app/view/UserManagementPanel.js
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

Ext.define('spider.view.UserManagementPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.usermanagementpanel',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Spacer',
        'Ext.button.Button',
        'Ext.grid.column.Column'
    ],

    id: 'UserManagementPanel',
    itemId: 'UserManagementPanel',
    layout: 'border',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    region: 'center',
                    id: 'UserGrid',
                    itemId: 'UserGrid',
                    header: false,
                    title: 'My Grid Panel',
                    columnLines: true,
                    forceFit: true,
                    store: 'UserStore',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'tbspacer',
                                    flex: 1
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        userConstants.me.popAddUserWindow();
                                    },
                                    margin: '0 20 0 0',
                                    text: 'Add User'
                                }
                            ]
                        }
                    ],
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            minWidth: 100,
                            dataIndex: 'userId',
                            text: 'User ID'
                        },
                        {
                            xtype: 'gridcolumn',
                            minWidth: 150,
                            dataIndex: 'userName',
                            text: 'User Name'
                        },
                        {
                            xtype: 'gridcolumn',
                            minWidth: 250,
                            dataIndex: 'email',
                            text: 'Email'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});