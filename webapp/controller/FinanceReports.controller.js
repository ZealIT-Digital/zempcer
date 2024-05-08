sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/odata/ODataModel",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"ZCER_EMPLOYEE/model/formatter",
	'sap/ui/core/util/Export',
	'sap/ui/core/util/ExportTypeCSV',
	"sap/ui/core/format/DateFormat"
], function(BaseController, MessageBox, Utilities, History, JSONModel, ODataModel, MessageToast, Filter, FilterOperator, formatter,
	Export, ExportTypeCSV, DateFormat) {
	"use strict";

	return BaseController.extend("ZCER_EMPLOYEE.controller.FinanceReports", {
		// handleRouteMatched: function(oEvent) {
		// 	var sAppId = "App5f7cf6c7d5dbc32eadbb1d4c";

		// 	var oParams = {};

		// 	if (oEvent.mParameters.data.context) {
		// 		this.sContext = oEvent.mParameters.data.context;

		// 	} else {
		// 		if (this.getOwnerComponent().getComponentData()) {
		// 			var patternConvert = function(oParam) {
		// 				if (Object.keys(oParam).length !== 0) {
		// 					for (var prop in oParam) {
		// 						if (prop !== "sourcePrototype" && prop.includes("Set")) {
		// 							return prop + "(" + oParam[prop][0] + ")";
		// 						}
		// 					}
		// 				}
		// 			};

		// 			this.sContext = patternConvert(this.getOwnerComponent().getComponentData().startupParameters);

		// 		}
		// 	}

		// 	var oPath;

		// 	if (this.sContext) {
		// 		oPath = {
		// 			path: "/" + this.sContext,
		// 			parameters: oParams
		// 		};
		// 		this.getView().bindObject(oPath);
		// 	}

		// },
		_onPageNavButtonPress: function() {
			this.oRouter.navTo("Main", {}, true);
			/*	var oHistory = History.getInstance();
				var sPreviousHash = oHistory.getPreviousHash();
				var oQueryParams = this.getQueryParameters(window.location);

				if (sPreviousHash !== undefined || oQueryParams.navBackToLaunchpad) {
					window.history.go(-1);
				} else {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("default", true);
				}*/

		},
		// getQueryParameters: function(oLocation) {
		// 	var oQuery = {};
		// 	var aParams = oLocation.search.substring(1).split("&");
		// 	for (var i = 0; i < aParams.length; i++) {
		// 		var aPair = aParams[i].split("=");
		// 		oQuery[aPair[0]] = decodeURIComponent(aPair[1]);
		// 	}
		// 	return oQuery;

		// },
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			//this.oRouter.getTarget("FinanceReports").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

		}, // end of onInit
		_opencerexport: function() {
			var data_cerstatus = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
			var datamodel_opencer = new ODataModel(data_cerstatus);
			var jsonmodel_opencer = new JSONModel();

			var filteropencerstatus1 = new Filter("ZCerStatus", FilterOperator.EQ, "1");
			var filteropencerstatus2 = new Filter("ZCerStatus", FilterOperator.EQ, "2");
			var filteropencerstatus4 = new Filter("ZCerStatus", FilterOperator.EQ, "4");
			var filteropencerstatus6 = new Filter("ZCerStatus", FilterOperator.EQ, "6");

			datamodel_opencer.read("/CER_MASTERSet", {
				filters: [new Filter([filteropencerstatus1, filteropencerstatus2, filteropencerstatus4, filteropencerstatus6], false)],
				success: function(odata, response) {
					jsonmodel_opencer.setData(odata.results);
					this.getView().setModel(jsonmodel_opencer);

					var oExport = new Export({

						// Type that will be used to generate the content. Own ExportType's can be created to support other formats
						exportType: new ExportTypeCSV({
							separatorChar: "\t",

							mimeType: "application/vnd.ms-excel",

							charset: "utf-8",

							fileExtension: "xls"
						}),
						// Pass in the model created above

						//	models : this.getView().getModel(),
						//models: this.getView().byId("table_opencerexport").oModels.opencers,
						models: this.getView().getModel(),
						// binding information for the rows aggregation
						rows: {
							path: "/"
						},
						// column definitions with column name and binding info for the content

						columns: [{
								name: "Company",
								template: {
									content: "{ZCompanyCode}"
								}
							}, {
								name: "Submit with Budget",
								template: {
									content: "{ZBudgeted}"
								}
							}, {
								name: "Cost Center",
								template: {
									content: "{ZCostCenter}"
								}
							}, {
								name: "Project",
								template: {
									content: "{ZProjectId}"
								}
							}, {
								name: "Project Description",
								template: {
									content: "{ZProjectDescription}"
								}

							}, {
								name: "Est.Start Date",
								template: {
									content: {
										parts: ["ZEstimatedStartDate"],
										formatter: function(date) {

											if (date !== undefined) {

												var oDateFormat = DateFormat.getDateInstance({
													scale: "medium",
													pattern: "dd-MMM-yyyy"

												});
												var subFromDate = oDateFormat.format(new Date(date));

												return subFromDate;
											} else {
												return "";
											}

										}
									}

								}
							}, {
								name: "Est.Finish Date",
								template: {
									content: {
										parts: ["ZEstimatedFinishDate"],
										formatter: function(date) {

											if (date !== undefined) {

												var oDateFormat = DateFormat.getDateInstance({
													scale: "medium",
													pattern: "dd-MMM-yyyy"

												});
												var subFromDate = oDateFormat.format(new Date(date));

												return subFromDate;
											} else {
												return "";
											}

										}
									}

								}

							},

							{
								name: "Asset Class/Category",
								template: {
									content: "{ZAssetClass}"
								}
							}, {
								name: "Usefull Life",
								template: {
									content: "{ZUsefulLifeYear}"
								}
							}, {
								name: "ManufacturingEquipment",
								template: {
									content: "{ZManufacturingEquipment}"
								}
							}, {
								name: "Software",
								template: {
									content: "{ZSoftware}"
								}
							}, {
								name: "Requestor",
								template: {
									content: "{ZRequestor}"
								}
							}, {
								name: "Approver1",
								template: {
									content: "{ZApprover1Name}"
								}
							}, {
								name: "Approver2",
								template: {
									content: "{ZApprover2Name}"
								}
							}

							/*	{
									name: "Status",
									template: {
										content: {
											parts: ["ZCerStatus"],
											formatter: function(cs) {
												if (cs === "1") {
													return "Draft";
												}
												if (cs === "2") {
													return "Submitted";
												}
												if (cs === "4") {
													return "Finance Approved";
												}
												if (cs === "6") {
													return "Approver1 Approved";
												}
											}
										}

									}
								}*/

						]
					});

					// download exported file
					oExport.saveFile().catch(function(oError) {
						MessageBox.error("Error when downloading data. Please try again!\n\n" + oError);
					}).then(function() {
						oExport.destroy();
					});
				}.bind(this),
				error: function(msg) {

					MessageToast.show("Failed:2000:" + msg);

				}
			});

		}, // end of _opencerexport
		_apprvcerexport: function() {

			var data_cerstatus = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
			var datamodel_opencer = new ODataModel(data_cerstatus);
			var jsonmodel_opencer = new JSONModel();

			var filteropencerstatus8 = new Filter("ZCerStatus", FilterOperator.EQ, "8");
		

			datamodel_opencer.read("/CER_MASTERSet", {
				filters: [filteropencerstatus8],
				success: function(odata, response) {
					jsonmodel_opencer.setData(odata.results);
					this.getView().setModel(jsonmodel_opencer);

					var oExport = new Export({

						// Type that will be used to generate the content. Own ExportType's can be created to support other formats
						exportType: new ExportTypeCSV({
							separatorChar: "\t",

							mimeType: "application/vnd.ms-excel",

							charset: "utf-8",

							fileExtension: "xls"
						}),
						// Pass in the model created above

						//	models : this.getView().getModel(),
						//models: this.getView().byId("table_opencerexport").oModels.opencers,
						models: this.getView().getModel(),
						// binding information for the rows aggregation
						rows: {
							path: "/"
						},
						// column definitions with column name and binding info for the content

						columns: [{
								name: "Company",
								template: {
									content: "{ZCompanyCode}"
								}
							}, {
								name: "Submit with Budget",
								template: {
									content: "{ZBudgeted}"
								}
							}, {
								name: "Cost Center",
								template: {
									content: "{ZCostCenter}"
								}
							}, {
								name: "Project",
								template: {
									content: "{ZProjectId}"
								}
							}, {
								name: "Project Description",
								template: {
									content: "{ZProjectDescription}"
								}

							}, {
								name: "Est.Start Date",
								template: {
									content: {
										parts: ["ZEstimatedStartDate"],
										formatter: function(date) {

											if (date !== undefined) {

												var oDateFormat = DateFormat.getDateInstance({
													scale: "medium",
													pattern: "dd-MMM-yyyy"

												});
												var subFromDate = oDateFormat.format(new Date(date));

												return subFromDate;
											} else {
												return "";
											}

										}
									}

								}
							}, {
								name: "Est.Finish Date",
								template: {
									content: {
										parts: ["ZEstimatedFinishDate"],
										formatter: function(date) {

											if (date !== undefined) {

												var oDateFormat = DateFormat.getDateInstance({
													scale: "medium",
													pattern: "dd-MMM-yyyy"

												});
												var subFromDate = oDateFormat.format(new Date(date));

												return subFromDate;
											} else {
												return "";
											}

										}
									}

								}

							},

							{
								name: "Asset Class/Category",
								template: {
									content: "{ZAssetClass}"
								}
							}, {
								name: "Usefull Life",
								template: {
									content: "{ZUsefulLifeYear}"
								}
							}, {
								name: "ManufacturingEquipment",
								template: {
									content: "{ZManufacturingEquipment}"
								}
							}, {
								name: "Software",
								template: {
									content: "{ZSoftware}"
								}
							}, {
								name: "Requestor",
								template: {
									content: "{ZRequestor}"
								}
							}, {
								name: "Approver1",
								template: {
									content: "{ZApprover1Name}"
								}
							}, {
								name: "Approver2",
								template: {
									content: "{ZApprover2Name}"
								}
							}

							/*	{
									name: "Status",
									template: {
										content: {
											parts: ["ZCerStatus"],
											formatter: function(cs) {
												if (cs === "1") {
													return "Draft";
												}
												if (cs === "2") {
													return "Submitted";
												}
												if (cs === "4") {
													return "Finance Approved";
												}
												if (cs === "6") {
													return "Approver1 Approved";
												}
											}
										}

									}
								}*/

						]
					});

					// download exported file
					oExport.saveFile().catch(function(oError) {
						MessageBox.error("Error when downloading data. Please try again!\n\n" + oError);
					}).then(function() {
						oExport.destroy();
					});
				}.bind(this),
				error: function(msg) {

					MessageToast.show("Failed:2000:" + msg);

				}
			});

		
		}, // end of _apprvcerexport
		_rejctcerexport: function() {

			var data_cerstatus = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
			var datamodel_opencer = new ODataModel(data_cerstatus);
			var jsonmodel_opencer = new JSONModel();

			var filteropencerstatus3 = new Filter("ZCerStatus", FilterOperator.EQ, "3");
			var filteropencerstatus5 = new Filter("ZCerStatus", FilterOperator.EQ, "5");
			var filteropencerstatus7 = new Filter("ZCerStatus", FilterOperator.EQ, "7");
		

			datamodel_opencer.read("/CER_MASTERSet", {
				filters: [new Filter([filteropencerstatus3, filteropencerstatus5, filteropencerstatus7], false)],
				success: function(odata, response) {
					jsonmodel_opencer.setData(odata.results);
					this.getView().setModel(jsonmodel_opencer);

					var oExport = new Export({

						// Type that will be used to generate the content. Own ExportType's can be created to support other formats
						exportType: new ExportTypeCSV({
							separatorChar: "\t",

							mimeType: "application/vnd.ms-excel",

							charset: "utf-8",

							fileExtension: "xls"
						}),
						// Pass in the model created above

						//	models : this.getView().getModel(),
						//models: this.getView().byId("table_opencerexport").oModels.opencers,
						models: this.getView().getModel(),
						// binding information for the rows aggregation
						rows: {
							path: "/"
						},
						// column definitions with column name and binding info for the content

						columns: [{
								name: "Company",
								template: {
									content: "{ZCompanyCode}"
								}
							}, {
								name: "Submit with Budget",
								template: {
									content: "{ZBudgeted}"
								}
							}, {
								name: "Cost Center",
								template: {
									content: "{ZCostCenter}"
								}
							}, {
								name: "Project",
								template: {
									content: "{ZProjectId}"
								}
							}, {
								name: "Project Description",
								template: {
									content: "{ZProjectDescription}"
								}

							}, {
								name: "Est.Start Date",
								template: {
									content: {
										parts: ["ZEstimatedStartDate"],
										formatter: function(date) {

											if (date !== undefined) {

												var oDateFormat = DateFormat.getDateInstance({
													scale: "medium",
													pattern: "dd-MMM-yyyy"

												});
												var subFromDate = oDateFormat.format(new Date(date));

												return subFromDate;
											} else {
												return "";
											}

										}
									}

								}
							}, {
								name: "Est.Finish Date",
								template: {
									content: {
										parts: ["ZEstimatedFinishDate"],
										formatter: function(date) {

											if (date !== undefined) {

												var oDateFormat = DateFormat.getDateInstance({
													scale: "medium",
													pattern: "dd-MMM-yyyy"

												});
												var subFromDate = oDateFormat.format(new Date(date));

												return subFromDate;
											} else {
												return "";
											}

										}
									}

								}

							},

							{
								name: "Asset Class/Category",
								template: {
									content: "{ZAssetClass}"
								}
							}, {
								name: "Usefull Life",
								template: {
									content: "{ZUsefulLifeYear}"
								}
							}, {
								name: "ManufacturingEquipment",
								template: {
									content: "{ZManufacturingEquipment}"
								}
							}, {
								name: "Software",
								template: {
									content: "{ZSoftware}"
								}
							}, {
								name: "Requestor",
								template: {
									content: "{ZRequestor}"
								}
							}, {
								name: "Approver1",
								template: {
									content: "{ZApprover1Name}"
								}
							}, {
								name: "Approver2",
								template: {
									content: "{ZApprover2Name}"
								}
							},{
								name: "ReasonForReject",
								template: {
									content: "{ZReasonForReject}"
								}
							}

							/*	{
									name: "Status",
									template: {
										content: {
											parts: ["ZCerStatus"],
											formatter: function(cs) {
												if (cs === "1") {
													return "Draft";
												}
												if (cs === "2") {
													return "Submitted";
												}
												if (cs === "4") {
													return "Finance Approved";
												}
												if (cs === "6") {
													return "Approver1 Approved";
												}
											}
										}

									}
								}*/

						]
					});

					// download exported file
					oExport.saveFile().catch(function(oError) {
						MessageBox.error("Error when downloading data. Please try again!\n\n" + oError);
					}).then(function() {
						oExport.destroy();
					});
				}.bind(this),
				error: function(msg) {

					MessageToast.show("Failed:2000:" + msg);

				}
			});

		
			} // end of _rejctcerexport
	});
}, /* bExport= */ true);