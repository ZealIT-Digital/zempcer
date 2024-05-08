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
	'sap/ui/core/util/ExportTypeCSV'
], function(BaseController, MessageBox, Utilities, History, JSONModel, ODataModel, MessageToast, Filter, FilterOperator, formatter,
	Export, ExportTypeCSV) {
	"use strict";

	return BaseController.extend("ZCER_EMPLOYEE.controller.Main", {
		formatter: formatter,
		onRouteMatched1: function(oevent) {

			this._onlyOpenCers();
		},
		_onlyOpenCers: function() {

			var data_cerstatus = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
			// OPEN CERs
			var datamodel_opencer = new ODataModel(data_cerstatus);
			var jsonmodel_opencer = new JSONModel();
			var jsonmodel_opencercount = new JSONModel();
			var filteropencerstatus1 = new Filter("ZCerStatus", FilterOperator.EQ, "1");
			var filteropencerstatus2 = new Filter("ZCerStatus", FilterOperator.EQ, "2");
			var filteropencerstatus4 = new Filter("ZCerStatus", FilterOperator.EQ, "4");
			var filteropencerstatus6 = new Filter("ZCerStatus", FilterOperator.EQ, "6");
			var opencers_count = {};
			this.byId("table_opencer").setBusy(true);

			datamodel_opencer.read("/CER_MASTERSet", {
				filters: [new Filter([filteropencerstatus1, filteropencerstatus2, filteropencerstatus4, filteropencerstatus6], false)],
				success: function(odata, response) {
					/*	if (odata.results.length === 0) {
							this.byId("downloadOpenCerbutton").setEnabled(false);
						}
						if (odata.results.length !== 0) {
							this.byId("downloadOpenCerbutton").setEnabled(true);
						}*/
					opencers_count = {
						"count": odata.results.length
					};

					this.byId("table_opencer").setBusy(false);
					jsonmodel_opencer.setData(odata.results);
					jsonmodel_opencercount.setData(opencers_count);
					this.getView().byId("idopencers_icontab").setModel(jsonmodel_opencercount, "occount");
					this.getView().byId("table_opencer").setModel(jsonmodel_opencer, "opencers");

				}.bind(this),
				error: function(msg) {
					this.byId("table_opencer").setBusy(false);
					MessageToast.show("Failed:2000:" + msg);
				}
			});

		}, // end of _onlyOpenCers
		onInit: function() {
			this.byId("downloadOpenCerbutton").setVisible(true);
this.byId("downloadAppCerbutton").setVisible(false);
this.byId("downloadRejCerbutton").setVisible(false);
			var data_finuser = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
			var datamodel_loggedinuser = new ODataModel(data_finuser);
			var filterfinteam = new Filter("DropDown", FilterOperator.EQ, "Z_CER_FIN_TEAM");
			datamodel_loggedinuser.read("/CER_DROP_DOWNSet", {
				filters: [filterfinteam],
				success: function(odata, response) {
					this.loggeduser = sap.ui.getCore().getModel("user").getProperty("/UserName");
					//	var userinfo = sap.ushell.Container.getService("UserInfo");
					for (var i = 0; i < odata.results.length; ++i) {
						if (this.loggeduser === odata.results[i].DispValue) {
							this.byId("idfinrep").setVisible(true);
						} else {
							this.byId("idfinrep").setVisible(false);
						}

					}

				}.bind(this),
				error: function(msg) {
					MessageToast.show("Failed:0001" + msg);
				}
			});

			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.attachRoutePatternMatched(this._onlyOpenCers, this);

			// OPEN CERs

			var data_cerstatus = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
			var datamodel_opencer = new ODataModel(data_cerstatus);
			var jsonmodel_opencer = new JSONModel();
			var jsonmodel_opencercount = new JSONModel();
			var filteropencerstatus1 = new Filter("ZCerStatus", FilterOperator.EQ, "1");
			var filteropencerstatus2 = new Filter("ZCerStatus", FilterOperator.EQ, "2");
			var filteropencerstatus4 = new Filter("ZCerStatus", FilterOperator.EQ, "4");
			var filteropencerstatus6 = new Filter("ZCerStatus", FilterOperator.EQ, "6");
			var opencers_count = {};
			this.byId("table_opencer").setBusy(true);

			datamodel_opencer.read("/CER_MASTERSet", {
				filters: [new Filter([filteropencerstatus1, filteropencerstatus2, filteropencerstatus4, filteropencerstatus6], false)],
				success: function(odata, response) {
					/*	if (odata.results.length === 0) {
							this.byId("downloadOpenCerbutton").setEnabled(false);
						}
						if (odata.results.length !== 0) {
							this.byId("downloadOpenCerbutton").setEnabled(true);
						}*/
					opencers_count = {
						"count": odata.results.length
					};

					this.byId("table_opencer").setBusy(false);
					jsonmodel_opencer.setData(odata.results);
					jsonmodel_opencercount.setData(opencers_count);
					this.getView().byId("idopencers_icontab").setModel(jsonmodel_opencercount, "occount");
					this.getView().byId("table_opencer").setModel(jsonmodel_opencer, "opencers");
				}.bind(this),
				error: function(msg) {

					MessageToast.show("Failed:2000:" + msg);
					this.byId("table_opencer").setBusy(false);
				}
			});

			// APPROVED
			var datamodel_approvedcer = new ODataModel(data_cerstatus);
			//var jsonmodel_approvedcer = new JSONModel();
			var jsonmodel_approvedcercount = new JSONModel();
			var filterapprovedcerstatus1 = new Filter("ZCerStatus", FilterOperator.EQ, "8");
			var approvedcers_count = {};
			this.byId("icontabmain").setBusy(true);
			datamodel_approvedcer.read("/CER_MASTERSet", {
				filters: [new Filter([filterapprovedcerstatus1], false)],
				success: function(odata, response) {
					approvedcers_count = {
						"count": odata.results.length
					};
					//	jsonmodel_approvedcer.setData(odata.results);
					jsonmodel_approvedcercount.setData(approvedcers_count);

					this.getView().byId("idapprovedcers_icontab").setModel(jsonmodel_approvedcercount, "aprcercount");
					//		this.getView().byId("table_approvedcer").setModel(jsonmodel_approvedcer, "aprdcers");
					this.byId("icontabmain").setBusy(false);
				}.bind(this),
				error: function(msg) {
					MessageToast.show("Failed:2001:" + msg);
				}
			});

			// REJECTED
			var datamodel_rejectedcer = new ODataModel(data_cerstatus);
			//	var jsonmodel_rejectedcer = new JSONModel();
			var jsonmodel_rejectedcount = new JSONModel();
			var filterrejectedcerstatus3 = new Filter("ZCerStatus", FilterOperator.EQ, "3");
			var filterrejectedcerstatus5 = new Filter("ZCerStatus", FilterOperator.EQ, "5");
			var filterrejectedcerstatus7 = new Filter("ZCerStatus", FilterOperator.EQ, "7");
			var rejectedcers_count = {};
			this.byId("icontabmain").setBusy(true);
			datamodel_rejectedcer.read("/CER_MASTERSet", {
				filters: [new Filter([filterrejectedcerstatus3, filterrejectedcerstatus5, filterrejectedcerstatus7], false)],
				success: function(odata, response) {
					rejectedcers_count = {
						"count": odata.results.length
					};
					//			jsonmodel_rejectedcer.setData(odata.results);
					jsonmodel_rejectedcount.setData(rejectedcers_count);

					this.getView().byId("idrejectedcers_icontab").setModel(jsonmodel_rejectedcount, "rejcercount");
					//			this.getView().byId("table_rejectedcer").setModel(jsonmodel_rejectedcer, "rejdcers");
					this.byId("icontabmain").setBusy(false);
				}.bind(this),
				error: function(msg) {
					MessageToast.show("Failed:2002:" + msg);
				}
			});

		}, // end of onInit
		_onFilterSelect: function(oevent) {
			var sKey = oevent.getParameter("key");
			var data_cerstatus = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
			if (sKey === "opencers") {
				// OPEN CERs
			//	this.byId("downloadOpenCerbutton").setEnabled(true);
			this.byId("downloadOpenCerbutton").setVisible(true);
this.byId("downloadAppCerbutton").setVisible(false);
this.byId("downloadRejCerbutton").setVisible(false);
				var datamodel_opencer = new ODataModel(data_cerstatus);
				var jsonmodel_opencer = new JSONModel();
				var jsonmodel_opencercount = new JSONModel();
				var filteropencerstatus1 = new Filter("ZCerStatus", FilterOperator.EQ, "1");
				var filteropencerstatus2 = new Filter("ZCerStatus", FilterOperator.EQ, "2");
				var filteropencerstatus4 = new Filter("ZCerStatus", FilterOperator.EQ, "4");
				var filteropencerstatus6 = new Filter("ZCerStatus", FilterOperator.EQ, "6");
				var opencers_count = {};
				this.byId("table_opencer").setBusy(true);

				datamodel_opencer.read("/CER_MASTERSet", {
					filters: [new Filter([filteropencerstatus1, filteropencerstatus2, filteropencerstatus4, filteropencerstatus6], false)],
					success: function(odata, response) {

						opencers_count = {
							"count": odata.results.length
						};

						this.byId("table_opencer").setBusy(false);
						jsonmodel_opencer.setData(odata.results);
						jsonmodel_opencercount.setData(opencers_count);
						this.getView().byId("idopencers_icontab").setModel(jsonmodel_opencercount, "occount");
						this.getView().byId("table_opencer").setModel(jsonmodel_opencer, "opencers");
					}.bind(this),
					error: function(msg) {

						MessageToast.show("Failed:2000:" + msg);
						this.byId("table_opencer").setBusy(false);
					}
				});

			}
			if (sKey === "approvedcers") {
				// APPROVED
				this.byId("downloadOpenCerbutton").setVisible(false);
this.byId("downloadAppCerbutton").setVisible(true);
this.byId("downloadRejCerbutton").setVisible(false);
				//this.byId("downloadOpenCerbutton").setEnabled(false);
				var datamodel_approvedcer = new ODataModel(data_cerstatus);
				var jsonmodel_approvedcer = new JSONModel();
				var jsonmodel_approvedcercount = new JSONModel();
				var filterapprovedcerstatus1 = new Filter("ZCerStatus", FilterOperator.EQ, "8");
				var approvedcers_count = {};
				datamodel_approvedcer.read("/CER_MASTERSet", {
					filters: [new Filter([filterapprovedcerstatus1], false)],
					success: function(odata, response) {
						approvedcers_count = {
							"count": odata.results.length
						};
						jsonmodel_approvedcer.setData(odata.results);
						jsonmodel_approvedcercount.setData(approvedcers_count);

						this.getView().byId("idapprovedcers_icontab").setModel(jsonmodel_approvedcercount, "aprcercount");
						this.getView().byId("table_approvedcer").setModel(jsonmodel_approvedcer, "aprdcers");

					}.bind(this),
					error: function(msg) {
						MessageToast.show("Failed:2001:" + msg);
					}
				});
			}
			if (sKey === "rejectedcers") {
				// REJECTED
				this.byId("downloadOpenCerbutton").setVisible(false);
this.byId("downloadAppCerbutton").setVisible(false);
this.byId("downloadRejCerbutton").setVisible(true);
			//	this.byId("downloadOpenCerbutton").setEnabled(false);
				var datamodel_rejectedcer = new ODataModel(data_cerstatus);
				var jsonmodel_rejectedcer = new JSONModel();
				var jsonmodel_rejectedcount = new JSONModel();
				var filterrejectedcerstatus3 = new Filter("ZCerStatus", FilterOperator.EQ, "3");
				var filterrejectedcerstatus5 = new Filter("ZCerStatus", FilterOperator.EQ, "5");
				var filterrejectedcerstatus7 = new Filter("ZCerStatus", FilterOperator.EQ, "7");
				var rejectedcers_count = {};
				datamodel_rejectedcer.read("/CER_MASTERSet", {
					filters: [new Filter([filterrejectedcerstatus3, filterrejectedcerstatus5, filterrejectedcerstatus7], false)],
					success: function(odata, response) {
						rejectedcers_count = {
							"count": odata.results.length
						};
						jsonmodel_rejectedcer.setData(odata.results);
						jsonmodel_rejectedcount.setData(rejectedcers_count);

						this.getView().byId("idrejectedcers_icontab").setModel(jsonmodel_rejectedcount, "rejcercount");
						this.getView().byId("table_rejectedcer").setModel(jsonmodel_rejectedcer, "rejdcers");
					}.bind(this),
					error: function(msg) {
						MessageToast.show("Failed:2002:" + msg);
					}
				});
			}

		}, // end of _onFilterSelect

		handleRouteMatched: function(oEvent) {
			var sAppId = "App5f7cf6c7d5dbc32eadbb1d4c";

			var oParams = {};

			if (oEvent.mParameters.data.context) {
				this.sContext = oEvent.mParameters.data.context;

			} else {
				if (this.getOwnerComponent().getComponentData()) {
					var patternConvert = function(oParam) {
						if (Object.keys(oParam).length !== 0) {
							for (var prop in oParam) {
								if (prop !== "sourcePrototype" && prop.includes("Set")) {
									return prop + "(" + oParam[prop][0] + ")";
								}
							}
						}
					};

					this.sContext = patternConvert(this.getOwnerComponent().getComponentData().startupParameters);

				}
			}

			var oPath;

			if (this.sContext) {
				oPath = {
					path: "/" + this.sContext,
					parameters: oParams
				};
				this.getView().bindObject(oPath);
			}

		}, // end of handleRouteMatched

		_onPageNavButtonPress: function() {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			var oQueryParams = this.getQueryParameters(window.location);

			if (sPreviousHash !== undefined || oQueryParams.navBackToLaunchpad) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("default", true);
			}

		}, // end of _onPageNavButtonPress

	/*	getQueryParameters: function(oLocation) {
			var oQuery = {};
			var aParams = oLocation.search.substring(1).split("&");
			for (var i = 0; i < aParams.length; i++) {
				var aPair = aParams[i].split("=");
				oQuery[aPair[0]] = decodeURIComponent(aPair[1]);
			}
			return oQuery;

		}, */// end of getQueryParameters
		_onCreateCerNewPress: function(oEvent) {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.navTo("CreateCer", {
				ZCerId: "0",
				from: "Main",
				to: "CreateCer"
			}, true);
			/*	var oBindingContext = oEvent.getSource().getBindingContext();

				return new Promise(function(fnResolve) {

					this.doNavigate("CreateCer", oBindingContext, fnResolve, "");
				}.bind(this)).catch(function(err) {
					if (err !== undefined) {
						MessageBox.error(err.message);
					}
				});*/

		}, // end of _onCreateCerNewPress
		doNavigate: function(sRouteName, oBindingContext, fnPromiseResolve, sViaRelation) {
			var sPath = (oBindingContext) ? oBindingContext.getPath() : null;
			var oModel = (oBindingContext) ? oBindingContext.getModel() : null;

			var sEntityNameSet;
			if (sPath !== null && sPath !== "") {
				if (sPath.substring(0, 1) === "/") {
					sPath = sPath.substring(1);
				}
				sEntityNameSet = sPath.split("(")[0];
			}
			var sNavigationPropertyName;
			var sMasterContext = this.sMasterContext ? this.sMasterContext : sPath;

			/*	if (sEntityNameSet !== null) {
					sNavigationPropertyName = sViaRelation || this.getOwnerComponent().getNavigationPropertyForNavigationWithContext(sEntityNameSet, sRouteName);
				}*/
			if (sNavigationPropertyName !== null && sNavigationPropertyName !== undefined) {
				if (sNavigationPropertyName === "") {
					this.oRouter.navTo(sRouteName, {
						context: sPath,
						masterContext: sMasterContext
					}, false);
				} else {
					oModel.createBindingContext(sNavigationPropertyName, oBindingContext, null, function(bindingContext) {
						if (bindingContext) {
							sPath = bindingContext.getPath();
							if (sPath.substring(0, 1) === "/") {
								sPath = sPath.substring(1);
							}
						} else {
							sPath = "undefined";
						}

						// If the navigation is a 1-n, sPath would be "undefined" as this is not supported in Build
						if (sPath === "undefined") {
							this.oRouter.navTo(sRouteName);
						} else {
							this.oRouter.navTo(sRouteName, {
								context: sPath,
								masterContext: sMasterContext
							}, false);
						}
					}.bind(this));
				}
			} else {
				this.oRouter.navTo(sRouteName);
			}

			if (typeof fnPromiseResolve === "function") {
				fnPromiseResolve();
			}

		}, // end of doNavigate
		_onFinanceReportsPress: function(oEvent) {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.navTo("FinanceReports", {
				from: "Main",
				to: "FinanceReports"
			}, true);

			/*	var oBindingContext = oEvent.getSource().getBindingContext();

				return new Promise(function(fnResolve) {

					this.doNavigate("FinanceReports", oBindingContext, fnResolve, "");
				}.bind(this)).catch(function(err) {
					if (err !== undefined) {
						MessageBox.error(err.message);
					}
				});*/

		}, // end of _onFinanceReportsPress
		_onRetriveDraft: function(oEvent) {

			var ZCerId = oEvent.getSource().getBindingContext("opencers").getProperty("ZCerId");
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.navTo("CreateCer", {
				ZCerId: ZCerId,
				from: "Main",
				to: "CreateCer"
			}, true);

			/*	var oBindingContext = oEvent.getSource().getBindingContext("opencers");
				//var oBindingContext = oEvent.getSource().getBindingContext("opencers").getProperty("ZCerId");

				return new Promise(function(fnResolve) {

					this.doNavigate("CreateCer", oBindingContext, fnResolve, "");
				}.bind(this)).catch(function(err) {
					if (err !== undefined) {
						MessageBox.error(err.message);
					}
				});*/

		}, // end of _onRetriveDraft
		_onDeleteDraft: function(oevent) {
			var ZCerID = oevent.getSource().getBindingContext("opencers").getProperty("ZCerId");
			
				sap.m.MessageBox.confirm("Please confirm to delete the draft. Once deleted, it cannot be retrieved.", {
						
							onClose: function(oAction) {
							if(oAction === MessageBox.Action.OK){
				var data_del = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
				var odatamodel_del = new ODataModel(data_del);
					var eset = "/CER_MASTERSet('" + ZCerID + "')";
				odatamodel_del.remove(eset, null,
					function() {
						
						this.onInit();
					//	MessageToast.show("Delete success");
					}.bind(this),
					function() {
					//	MessageToast.show("Delete failed");
					}

				);
							}
							}.bind(this)
						});
					
			
			

		}, // end of _onDeleteDraft
		_ceriddetails: function(oevent) {
			var bc = oevent.getSource().getBindingContext("opencers");

			if (!this.ceriddet) {
				this.ceriddet = sap.ui.xmlfragment(this.getView().getId(), "ZCER_EMPLOYEE.fragments.CeridDetails", this);
				this.getView().addDependent(this.ceriddet);
			}
			this.ceriddet.openBy(oevent.getSource());
			var jsonmodel_cerdetails = new JSONModel();

			var data = {
				zcerid: bc.getProperty("ZCerId"),
				zccenter: bc.getProperty("ZCostCenter"),
				zcompcode: bc.getProperty("ZCompanyCode"),
				zbudgamnt: parseInt(bc.getProperty("ZBudgetedAmount"))
			};

			jsonmodel_cerdetails.setData(data);

			this.getView().byId("popovercerid").setModel(jsonmodel_cerdetails, "cer1");
			this.getView().byId("popovercostcntr").setModel(jsonmodel_cerdetails, "cer2");
			this.getView().byId("popovercompcode").setModel(jsonmodel_cerdetails, "cer3");
			this.getView().byId("popoverbudgamnt").setModel(jsonmodel_cerdetails, "cer4");

		}, // end of _ceriddetails
		_ceriddetailsappr: function(oevent) {
			var bc_appr = oevent.getSource().getBindingContext("aprdcers");
			if (!this.ceriddet) {
				this.ceriddet = sap.ui.xmlfragment(this.getView().getId(), "ZCER_EMPLOYEE.fragments.CeridDetails", this);
				this.getView().addDependent(this.ceriddet);
			}
			this.ceriddet.openBy(oevent.getSource());
			var jsonmodel_cerdetails_appr = new JSONModel();
			var dataappr = {
				zcerid: bc_appr.getProperty("ZCerId"),
				zccenter: bc_appr.getProperty("ZCostCenter"),
				zcompcode: bc_appr.getProperty("ZCompanyCode"),
				zbudgamnt: parseInt(bc_appr.getProperty("ZBudgetedAmount"))
			};
			jsonmodel_cerdetails_appr.setData(dataappr);
			this.getView().byId("popovercerid").setModel(jsonmodel_cerdetails_appr, "cer1");
			this.getView().byId("popovercostcntr").setModel(jsonmodel_cerdetails_appr, "cer2");
			this.getView().byId("popovercompcode").setModel(jsonmodel_cerdetails_appr, "cer3");
			this.getView().byId("popoverbudgamnt").setModel(jsonmodel_cerdetails_appr, "cer4");
		}, // end of _ceriddetailsappr
		_ceriddetailsrej: function(oevent) {
			var bc_rej = oevent.getSource().getBindingContext("rejdcers");
			if (!this.ceriddet) {
				this.ceriddet = sap.ui.xmlfragment(this.getView().getId(), "ZCER_EMPLOYEE.fragments.CeridDetails", this);
				this.getView().addDependent(this.ceriddet);
			}
			this.ceriddet.openBy(oevent.getSource());
			var jsonmodel_cerdetails_rej = new JSONModel();
			var datarej = {
				zcerid: bc_rej.getProperty("ZCerId"),
				zccenter: bc_rej.getProperty("ZCostCenter"),
				zcompcode: bc_rej.getProperty("ZCompanyCode"),
				zbudgamnt: parseInt(bc_rej.getProperty("ZBudgetedAmount"))
			};
			jsonmodel_cerdetails_rej.setData(datarej);
			this.getView().byId("popovercerid").setModel(jsonmodel_cerdetails_rej, "cer1");
			this.getView().byId("popovercostcntr").setModel(jsonmodel_cerdetails_rej, "cer2");
			this.getView().byId("popovercompcode").setModel(jsonmodel_cerdetails_rej, "cer3");
			this.getView().byId("popoverbudgamnt").setModel(jsonmodel_cerdetails_rej, "cer4");

		}, // end of _ceriddetailsrej
		_downloadOpenCerlist: function(oEvent) {

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
					models: this.getView().byId("table_opencer").oModels.opencers,

					// binding information for the rows aggregation
					rows: {
						path: "/"
					},
					// column definitions with column name and binding info for the content

					columns: [{
							name: "CerID",
							template: {
								content: "{ZCerId}"
							}
						}, {
							name: "Project Description",
							template: {
								content: "{ZProjectDescription}"
							}
						}, {
							name: "Application Date",
							template: {
								content: {
									
								parts: ["ZDateSubmitted"],
								formatter: function(date) {
									
										if (date !== undefined) {

				var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
					scale: "medium",

					pattern: "yyyy-MM-dd"
				});
				var subFromDate = oDateFormat.format(new Date(date));

				return subFromDate+ "";
			} else {
				return "";
			}
								}
							
								}
							}
						}, {
							name: "Approver 1",
							template: {
								content: "{ZApprover1}"
							}
						}, {
							name: "Approver 2",
							template: {
								content: "{ZApprover2}"
							}
						}, {
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
						}

					]
				});

				// download exported file
				oExport.saveFile().catch(function(oError) {
					MessageBox.error("Error when downloading data. Please try again!\n\n" + oError);
				}).then(function() {
					oExport.destroy();
				});

			}, // end of _downloadOpenCerlist
			_downloadAppCerlist : function(){
				//MessageToast.show("Approved Cer List");
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
					models: this.getView().byId("table_approvedcer").oModels.aprdcers,

					// binding information for the rows aggregation
					rows: {
						path: "/"
					},
					// column definitions with column name and binding info for the content

					columns: [{
							name: "CerID",
							template: {
								content: "{ZCerId}"
							}
						},
						{
							name: "Project",
							template: {
								content: "{ZProjectDescription}"
							}
						},
						{
							name: "Internal Order",
							template: {
								content: "{ZInternalOrder}"
							}
						}

					]
				});

				// download exported file
				oExport.saveFile().catch(function(oError) {
					MessageBox.error("Error when downloading data. Please try again!\n\n" + oError);
				}).then(function() {
					oExport.destroy();
				});

			},//end of _downloadAppCerlist
			_downloadRejCerlist: function(){
			//	MessageToast.show("Rej Cer List");
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
					models: this.getView().byId("table_rejectedcer").oModels.rejdcers,

					// binding information for the rows aggregation
					rows: {
						path: "/"
					},
					// column definitions with column name and binding info for the content

					columns: [{
							name: "CerID",
							template: {
								content: "{ZCerId}"
							}
						},
						{
							name: "Project",
							template: {
								content: "{ZProjectDescription}"
							}
						},
						{
							name: "Reason",
							template: {
								content: "{ZReasonForReject}"
							}
						}

					]
				});

				// download exported file
				oExport.saveFile().catch(function(oError) {
					MessageBox.error("Error when downloading data. Please try again!\n\n" + oError);
				}).then(function() {
					oExport.destroy();
				});

			},//end of _downloadRejCerlist

	});
}, /* bExport= */ true);