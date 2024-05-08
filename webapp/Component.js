sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"ZCER_EMPLOYEE/model/models",
	"./model/errorHandling",
	"sap/ui/model/json/JSONModel",
		"sap/ui/model/odata/ODataModel",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(UIComponent, Device, models, errorHandling,JSONModel,ODataModel,MessageToast,Filter,FilterOperator) {
	"use strict";

	var navigationWithContext = {

	};

	return UIComponent.extend("ZCER_EMPLOYEE.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			
			var loggedinuser ="/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
			var globalodatamodel = new ODataModel(loggedinuser);
		
			var userjsonmodel = new JSONModel();
			globalodatamodel.read("/CER_USERSet('US')",{
				success : function(odata,resp){
				userjsonmodel.setData(odata);
					sap.ui.getCore().setModel(userjsonmodel,"user");
				},
				error : function(msg){
					MessageToast.show("Failed:" + msg);
				}
			});
	
			
			// set the device model
			//this.setModel(models.createDeviceModel(), "device");
			// set the FLP model
			//this.setModel(models.createFLPModel(), "FLP");

			// set the dataSource model
			//this.setModel(new sap.ui.model.json.JSONModel({}), "dataSource");

			// set application model
			//var oApplicationModel = new sap.ui.model.json.JSONModel({});
			//this.setModel(oApplicationModel, "applicationModel");

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
			this.setModel(models.createDeviceModel(), "device");
			// delegate error handling
			//errorHandling.register(this);
	sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel(), "errorModel");
			// create the views based on the url/hash
			//this.getRouter().initialize();
		}
			/**
			 * The component is destroyed by UI5 automatically.
			 * In this method, the ErrorHandler is destroyed.
			 * @public
			 * @override
			 */
		/*	destroy : function () {
				this._oErrorHandler.destroy();
				// call the base component's destroy function
				UIComponent.prototype.destroy.apply(this, arguments);
			}*/
		
		//,

		// createContent: function() {
		// 	var app = new sap.m.App({
		// 		id: "App"
		// 	});
		// 	var appType = "App";
		// 	var appBackgroundColor = "#FFFFFF";
		// 	if (appType === "App" && appBackgroundColor) {
		// 		app.setBackgroundColor(appBackgroundColor);
		// 	}

		// 	return app;
		// },

		// getNavigationPropertyForNavigationWithContext: function(sEntityNameSet, targetPageName) {
		// 	var entityNavigations = navigationWithContext[sEntityNameSet];
		// 	return entityNavigations == null ? null : entityNavigations[targetPageName];
		// }

	});

});