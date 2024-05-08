sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History",
	"ZCER_EMPLOYEE/model/formatter",
	"sap/ui/model/odata/ODataModel",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/m/MessageToast",
	"sap/ui/model/FilterOperator"
], function(BaseController, MessageBox, Utilities, History, formatter, ODataModel, JSONModel, Filter, MessageToast, FilterOperator) {
	"use strict";

	return BaseController.extend("ZCER_EMPLOYEE.controller.CreateCer", {
		formatter: formatter,
		_refresh: function() {
			// defaults goes here
			this.byId("idsubmittedbudget").setSelectedIndex(-1);
			this.byId("idsubmittedbudget").setEnabled(false);

			this.byId("ccenterdd").setSelectedKey("");
			this.byId("projectdd").setSelectedKey("");
			this.byId("projectdescform").setVisible(true);
			this.byId("projectdesc").setValue();
			this.byId("projectddform").setVisible(false);

			this.byId("astdesc").setValue();
			this.byId("astdescdd").setSelectedKey("");
			this.byId("bdgamnt").setValue();

			this.byId("usefullife").setValue();
			this.byId("usefullife").setEnabled(false);
			this.byId("idestdate1").setValue();
			this.byId("idfinishdate1").setValue();
			this.byId("idmanfacturingunitgrp").setSelectedIndex(-1);

			this.byId("idbusjust").setValue();
			this.byId("aecdd").setSelectedKey();

			this.byId("iddetails1").setValue();
			this.byId("iddetails2").setValue();
			this.byId("iddetails3").setValue();
			this.byId("iddetails4").setValue();
			this.byId("noncapexpdescdd3").setValue();
			this.byId("noncapexpdescdd4").setValue();
			this.byId("idexp1").setValue(0.00);
			this.byId("idexp2").setValue(0.00);
			this.byId("idexp3").setValue(0.00);
			this.byId("idexp4").setValue(0.00);
			this.byId("idexptotal").setText();

			this.byId("idinternalgrp1").setValue();
			this.byId("idinternalgrp2").setValue();
			this.byId("idinternalgrp3").setValue();
			this.byId("idinternalgrp4").setValue();
			this.byId("idinternaldtls1").setValue();
			this.byId("idinternaldtls2").setValue();
			this.byId("idinternaldtls3").setValue();
			this.byId("idinternaldtls4").setValue();
			this.byId("idintreshrs1").setValue(0.00);
			this.byId("idintreshrs2").setValue(0.00);
			this.byId("idintreshrs3").setValue(0.00);
			this.byId("idintreshrs4").setValue(0.00);
			this.byId("idintreshrstotal").setText();

			this.byId("idrepastdesc").setValue();
			this.byId("idrepastser").setValue();
			this.byId("idrepastcc").setValue();
			this.byId("idrepastcer").setValue();

			this.byId("idrepcurasst").setSelectedIndex(-1);
			this.byId("idrepastdesc").setEnabled(false);
			this.byId("idrepastser").setEnabled(false);
			this.byId("idrepastcc").setEnabled(false);
			this.byId("idrepastcer").setEnabled(false);

			this.byId("bdgamnt").setEnabled(false);

			this.byId("astdesc").setEnabled(false);
			this.byId("astclass").setVisible(false);

			//Company Dropdown
			var cernew_uri = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
			var cernew_company_odatamodel = new ODataModel(cernew_uri);
			var cernew_company_jsonmodel = new JSONModel();
			var filtercomp = new Filter("DropDown", FilterOperator.EQ, "Z_COMPANY_CODE");

			this.byId("ccenterdd").setEnabled(false);
			this.byId("projectdd").setEnabled(false);
			sap.ui.core.BusyIndicator.show(0);
			cernew_company_odatamodel.read("/CER_DROP_DOWNSet", {
				filters: [filtercomp],
				success: function(odata, resp) {
					sap.ui.core.BusyIndicator.hide();
					cernew_company_jsonmodel.setSizeLimit(1000);
					cernew_company_jsonmodel.setData(odata.results);
					this.getView().byId("compdd").setModel(cernew_company_jsonmodel, "cdd");

				}.bind(this),
				error: function(msg) {
					sap.ui.core.BusyIndicator.hide();

					MessageToast.show("Failed:1000:" + msg);

				}
			});

			// for General Ledger
			var cernew_gl_odatamodel = new ODataModel(cernew_uri);
			var cernew_gl_jsonmodel = new JSONModel();
			var filtergl = new Filter("DropDown", FilterOperator.EQ, "Z_GL_ACCOUNT");
			this.byId("idgenled").setEnabled(false);
			cernew_gl_odatamodel.read("/CER_DROP_DOWNSet", {
				filters: [filtergl],
				success: function(odata, resp) {
					cernew_gl_jsonmodel.setSizeLimit(1000);
					cernew_gl_jsonmodel.setData(odata.results[0].DispValue);
					this.getView().byId("idgenled").setModel(cernew_gl_jsonmodel, "genled");

				}.bind(this),
				error: function(msg) {
					this.byId("compdd").setBusy(false);
					MessageToast.show("Failed:1005:" + msg);

				}
			});

			// Non-Capital Expenses For This Project

			var cernew_nce_odatamodel = new ODataModel(cernew_uri);
			var cernew_nce1_jsonmodel = new JSONModel();
			var cernew_nce2_jsonmodel = new JSONModel();
			var filternce = new Filter("DropDown", FilterOperator.EQ, "Z_NON_CAPEX_DESCRIPTION");
			this.byId("idgenled").setEnabled(false);
			cernew_gl_odatamodel.read("/CER_DROP_DOWNSet", {
				filters: [filternce],
				success: function(odata, resp) {
					cernew_nce1_jsonmodel.setSizeLimit(1000);
					cernew_nce2_jsonmodel.setSizeLimit(1000);
					cernew_nce1_jsonmodel.setData(odata.results);
					cernew_nce2_jsonmodel.setData(odata.results);
					this.getView().byId("noncapexpdescdd1").setModel(cernew_nce1_jsonmodel, "nce1");
					this.getView().byId("noncapexpdescdd2").setModel(cernew_nce2_jsonmodel, "nce2");

				}.bind(this),
				error: function(msg) {
					this.byId("compdd").setBusy(false);
					MessageToast.show("Failed:1006:" + msg);

				}
			});

			// Asset Asset environmental consideration

			var cernew_assetenvcosid_odatamodel = new ODataModel(cernew_uri);
			var cernew_assetenvcosid_jsonmodel = new JSONModel();
			var filterasset = new Filter("DropDown", FilterOperator.EQ, "Z_ENVIRONMENT_CONSIDERATION");
			//	this.byId("aecdd").setBusy(true);
			cernew_assetenvcosid_odatamodel.read("/CER_DROP_DOWNSet", {
				filters: [filterasset],
				success: function(odata, resp) {
					cernew_assetenvcosid_jsonmodel.setSizeLimit(1000);
					cernew_assetenvcosid_jsonmodel.setData(odata.results);
					this.getView().byId("aecdd").setModel(cernew_assetenvcosid_jsonmodel, "aec");

				}.bind(this),
				error: function(msg) {
					MessageToast.show("Failed:1001:" + msg);

				}
			});
		}, // end of refresh
		_budgetYes: function() {

			this.byId("idsubmittedbudget").setSelectedIndex(0);
			this.byId("ccenterdd").setEnabled(true);
			this.byId("bdgamnt").setEnabled(true);
			var budgetyesno_uri = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
			var budgetyesno_odatamodel = new ODataModel(budgetyesno_uri);
			var budgetyesno_jsonmodel = new JSONModel();
			var filtercompcode = new Filter("ZCompanyCode", FilterOperator.EQ, this.compcode);
			var filterbudgetyesno = new Filter("ZSubmitFyBudget", FilterOperator.EQ, "YES");
			var finalarraycostcenter = [];
			sap.ui.core.BusyIndicator.show(0);
			budgetyesno_odatamodel.read("/CER_PROJECTSet", {
				filters: [filtercompcode, filterbudgetyesno],
				success: function(odata1, resp) {
					sap.ui.core.BusyIndicator.hide();

					for (var j = 0; j < odata1.results.length; ++j) {
						if (odata1.results[j].ZCostCenter !== "" && odata1.results[j].ZCostCenterDesc !== "") {
							finalarraycostcenter.push(odata1.results[j]);
						}
					}
					budgetyesno_jsonmodel.setSizeLimit(1000);
					budgetyesno_jsonmodel.setData(finalarraycostcenter);
					this.getView().byId("ccenterdd").setModel(budgetyesno_jsonmodel, "ccdd");

					this.byId("ccenterdd").setSelectedKey(this.costcenter);

					this.byId("ccenterdd").setEnabled(true);

				}.bind(this),
				error: function(msg) {
					sap.ui.core.BusyIndicator.hide();
					MessageToast.show("Failed:1004" + msg);
				}
			});
			this.byId("projectdd").setEnabled(true);
			this.byId("projectddform").setVisible(true);

			this.byId("projectdescform").setVisible(false);

			var cernew_uri = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
			var cernew_project_odatamodel = new ODataModel(cernew_uri);
			var cernew_project_jsonmodel = new JSONModel();
			var filtercompany = new Filter("ZCompanyCode", FilterOperator.EQ, this.compcode);
			var filtercostcenter = new Filter("ZCostCenter", FilterOperator.EQ, this.costcenter);

			cernew_project_odatamodel.read("/CER_PROJECTSet", {
				filters: [filtercompany, filtercostcenter],
				success: function(odata1, resp) {
					// sap.ui.core.BusyIndicator.hide();
					cernew_project_jsonmodel.setSizeLimit(1000);
					cernew_project_jsonmodel.setData(odata1.results);
					this.getView().byId("projectdd").setModel(cernew_project_jsonmodel, "pjctdd");

					this.byId("projectdd").setSelectedKey(this.projectid);

					this.byId("astdesc").setValue(this.assetclass+ " - " + this.assetdescrp);
					//this.byId("bdgamnt").setValue(this.budgetedamount);
					this.byId("bdgamnt").setValue(parseFloat(this.budgetedamount).toFixed(0));
					this.byId("usefullife").setValue(this.usefullifeyear);

				}.bind(this),
				error: function(msg) {
					//		this.byId("ccenterdd").setBusy(false);
					// sap.ui.core.BusyIndicator.hide();
					MessageToast.show("Failed:1003:" + msg);

				}
			});

		},
		_budgetNo: function() {

			this.byId("idsubmittedbudget").setSelectedIndex(1);
			this.byId("ccenterdd").setEnabled(true);

			//this.byId("ccenterdd").setSelectedKey(odata.ZCostCenter);
			//	var jsonarray = [];
			var finalarraycostcenter1 = [];
			var budgetyesno_uri1 = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
			var budgetyesno_odatamodel1 = new ODataModel(budgetyesno_uri1);
			var budgetyesno_jsonmodel1 = new JSONModel();
			//	var assetjsonmodel1 = new JSONModel();
			var filtercompcode1 = new Filter("ZCompanyCode", FilterOperator.EQ, this.compcode);
			var filterbudgetyesno1 = new Filter("ZSubmitFyBudget", FilterOperator.EQ, "NO");
			sap.ui.core.BusyIndicator.show(0);
			budgetyesno_odatamodel1.read("/CER_PROJECTSet", {
				filters: [filtercompcode1, filterbudgetyesno1],
				success: function(odata1, resp) {
					sap.ui.core.BusyIndicator.hide();

					for (var j = 0; j < odata1.results.length; ++j) {
						if (odata1.results[j].ZCostCenter !== "" && odata1.results[j].ZCostCenterDesc !== "") {
							finalarraycostcenter1.push(odata1.results[j]);
						}
					}
					budgetyesno_jsonmodel1.setSizeLimit(1000);
					budgetyesno_jsonmodel1.setData(finalarraycostcenter1);

					this.getView().byId("ccenterdd").setModel(budgetyesno_jsonmodel1, "ccdd");

					this.byId("ccenterdd").setSelectedKey(this.costcenter);

					this.byId("ccenterdd").setEnabled(true);

				}.bind(this),
				error: function(msg) {
					sap.ui.core.BusyIndicator.hide();
					MessageToast.show("Failed:1004" + msg);
				}
			});

			this.byId("projectddform").setVisible(false);
			this.byId("projectdescform").setVisible(true);

			this.byId("projectdesc").setValue(this.projectdescription);
			this.byId("astdescdd").setSelectedKey(this.assetclass);
			this.byId("assetcombo").setVisible(true);

			this.byId("assetinput").setVisible(false);
			this.byId("bdgamnt").setEnabled(true);
			this.byId("bdgamnt").setValue(parseInt(this.budgetedamount));
			this.byId("usefullife").setValue(this.usefullifeyear);

		},

		_handleZCerIdMatched: function(oevent) {
			//	

			this.ZCerId = oevent.getParameter("arguments").ZCerId;
			if (this.ZCerId === "0") {
				this._refresh();
				//MessageToast.show("Please wait...",{duration:200});

			} else {

				var data_retriveDraft = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
				var odatamodel_retriveDraft = new ODataModel(data_retriveDraft);
				var jsonmodel_retriveDraft = new JSONModel();
				//var filter_zcerid = new Filter("ZCerId",FilterOperator.EQ,ZCerId);

				var esetzcerid = "CER_MASTERSet('" + this.ZCerId + "')";
				odatamodel_retriveDraft.read(esetzcerid, {
					//	filters : [filter_zcerid],
					success: function(odata, response) {
						jsonmodel_retriveDraft.setData(odata);
						this.compcode = odata.ZCompanyCode;
						this.costcenter = odata.ZCostCenter;
						this.projectid = odata.ZProjectId;
						this.projectdescription = odata.ZProjectDescription;
						this.assetclass = odata.ZAssetClass;
						this.assetdescrp = odata.ZAssetDesc;
						this.budgetedamount = odata.ZBudgetedAmount;
						this.usefullifeyear = odata.ZUsefulLifeYear;

						this.byId("compdd").setSelectedKey(odata.ZCompanyCode);

						this.byId("idsubmittedbudget").setEnabled(true);
						if (odata.ZBudgeted === "Y") {
							this.YbudgetY = odata.ZBudgeted;
							this.byId("idsubmittedbudget").setSelectedIndex(0);
							
							this._budgetYes();
						}
						if (odata.ZBudgeted === "N") {
							this.NbudgetN = odata.ZBudgeted;
							this.byId("idsubmittedbudget").setSelectedIndex(1);
							this._budgetNo();
						}
						this.byId("idestdate1").setValue(this.formatter.dateTime(odata.ZEstimatedStartDate));
						this.byId("idfinishdate1").setValue(this.formatter.dateTime(odata.ZEstimatedFinishDate));

						if (odata.ZManufacturingEquipment === "Y") {
							this.byId("idmanfacturingunitgrp").setSelectedIndex(0);
						}
						if (odata.ZManufacturingEquipment === "N") {
							this.byId("idmanfacturingunitgrp").setSelectedIndex(1);
						}
						if (odata.ZManufacturingEquipment === "") {
							this.byId("idmanfacturingunitgrp").setSelectedIndex(-1);
						}

						this.byId("idbusjust").setValue(odata.ZBusinessJustification);
						this.byId("aecdd").setSelectedKey(odata.ZEnvironmentConsideration);

						this.byId("noncapexpdescdd1").setSelectedKey(odata.ZNonCapexDescription1);
						this.byId("noncapexpdescdd2").setSelectedKey(odata.ZNonCapexDescription2);
						this.byId("noncapexpdescdd3").setValue(odata.ZNonCapexDescription3);
						this.byId("noncapexpdescdd4").setValue(odata.ZNonCapexDescription4);
						this.byId("iddetails1").setValue(odata.ZNonCapexDetails1);
						this.byId("iddetails2").setValue(odata.ZNonCapexDetails2);
						this.byId("iddetails3").setValue(odata.ZNonCapexDetails3);
						this.byId("iddetails4").setValue(odata.ZNonCapexDetails4);
						this.byId("idexp1").setValue(parseInt(odata.ZNonCapexExpense1));
						this.byId("idexp2").setValue(parseInt(odata.ZNonCapexExpense2));
						this.byId("idexp3").setValue(parseInt(odata.ZNonCapexExpense3));
						this.byId("idexp4").setValue(parseInt(odata.ZNonCapexExpense4));

						this.byId("idinternalgrp1").setValue(odata.ZInternalResourcesGroup1);
						this.byId("idinternalgrp2").setValue(odata.ZInternalResourcesGroup2);
						this.byId("idinternalgrp3").setValue(odata.ZInternalResourcesGroup3);
						this.byId("idinternalgrp4").setValue(odata.ZInternalResourcesGroup4);
						this.byId("idinternaldtls1").setValue(odata.ZInternalResourcesDetails1);
						this.byId("idinternaldtls2").setValue(odata.ZInternalResourcesDetails2);
						this.byId("idinternaldtls3").setValue(odata.ZInternalResourcesDetails3);
						this.byId("idinternaldtls4").setValue(odata.ZInternalResourcesDetails4);
						this.byId("idintreshrs1").setValue(parseInt(odata.ZInternalResourcesHours1));
						this.byId("idintreshrs2").setValue(parseInt(odata.ZInternalResourcesHours2));
						this.byId("idintreshrs3").setValue(parseInt(odata.ZInternalResourcesHours3));
						this.byId("idintreshrs4").setValue(parseInt(odata.ZInternalResourcesHours4));

						this.byId("idexptotal").setText(
							Number(odata.ZNonCapexExpense1) + Number(odata.ZNonCapexExpense2) +
							Number(odata.ZNonCapexExpense3) + Number(odata.ZNonCapexExpense4)

						);

						this.byId("idintreshrstotal").setText(
							Number(odata.ZInternalResourcesHours1) + Number(odata.ZInternalResourcesHours2) +
							Number(odata.ZInternalResourcesHours3) + Number(odata.ZInternalResourcesHours4)

						);
						if (odata.ZReplacingAsset === "Y") {
							this.byId("idrepcurasst").setSelectedIndex(0);
							this.byId("idrepastdesc").setValue(odata.ZReplacingAssetDescription);
							this.byId("idrepastser").setValue(odata.ZReplacingAssetSerialNumb);
							this.byId("idrepastcc").setValue(odata.ZReplacingAssetCostCenter);
							this.byId("idrepastcer").setValue(odata.ZReplacingAssetCerNumber);
							this.byId("idrepastdesc").setEnabled(true);
							this.byId("idrepastser").setEnabled(true);
							this.byId("idrepastcc").setEnabled(true);
							this.byId("idrepastcer").setEnabled(true);
						}
						if (odata.ZReplacingAsset === "N") {
							this.byId("idrepcurasst").setSelectedIndex(1);

							this.byId("idrepastdesc").setEnabled(false);
							this.byId("idrepastser").setEnabled(false);
							this.byId("idrepastcc").setEnabled(false);
							this.byId("idrepastcer").setEnabled(false);
						}
						if (odata.ZReplacingAsset === "") {
							this.byId("idrepcurasst").setSelectedIndex(-1);
						}
					}.bind(this),
					error: function(msg) {
						//		this.byId("ccenterdd").setBusy(false);
						// sap.ui.core.BusyIndicator.hide();
						MessageToast.show("Failed:1003:" + msg);

					}
				});

			} //end of else

			/*		
				var data_retriveDraft = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
				var odatamodel_retriveDraft = new ODataModel(data_retriveDraft);
				var jsonmodel_retriveDraft = new JSONModel();
				//var filter_zcerid = new Filter("ZCerId",FilterOperator.EQ,ZCerId);

				var esetzcerid = "CER_MASTERSet('" + this.ZCerId + "')";
				odatamodel_retriveDraft.read(esetzcerid, {
					//	filters : [filter_zcerid],
					success: function(odata, response) {

						jsonmodel_retriveDraft.setData(odata);
						this.byId("compdd").setSelectedKey(odata.ZCompanyCode);
						this.byId("idsubmittedbudget").setEnabled(true);

						if (odata.ZBudgeted === "Y") {

							this.byId("idsubmittedbudget").setSelectedIndex(0);
							this.byId("ccenterdd").setEnabled(true);
							var budgetyesno_uri = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
							var budgetyesno_odatamodel = new ODataModel(budgetyesno_uri);
							var budgetyesno_jsonmodel = new JSONModel();
							var filtercompcode = new Filter("ZCompanyCode", FilterOperator.EQ, odata.ZCompanyCode);
							var filterbudgetyesno = new Filter("ZSubmitFyBudget", FilterOperator.EQ, "YES");
							var finalarraycostcenter = [];
							sap.ui.core.BusyIndicator.show(0);
							budgetyesno_odatamodel.read("/CER_PROJECTSet", {
								filters: [filtercompcode, filterbudgetyesno],
								success: function(odata1, resp) {
									sap.ui.core.BusyIndicator.hide();

									for (var j = 0; j < odata1.results.length; ++j) {
										if (odata1.results[j].ZCostCenter !== "" && odata1.results[j].ZCostCenterDesc !== "") {
											finalarraycostcenter.push(odata1.results[j]);
										}
									}
									budgetyesno_jsonmodel.setSizeLimit(1000);
									budgetyesno_jsonmodel.setData(finalarraycostcenter);
									this.getView().byId("ccenterdd").setModel(budgetyesno_jsonmodel, "ccdd");

									this.byId("ccenterdd").setSelectedKey(odata.ZCostCenter);

									this.byId("ccenterdd").setEnabled(true);

								}.bind(this),
								error: function(msg) {
									sap.ui.core.BusyIndicator.hide();
									MessageToast.show("Failed:1004" + msg);
								}
							});
							this.byId("projectdd").setEnabled(true);
							this.byId("projectddform").setVisible(true);

							this.byId("projectdescform").setVisible(false);

							var cernew_uri = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
							var cernew_project_odatamodel = new ODataModel(cernew_uri);
							var cernew_project_jsonmodel = new JSONModel();
							var filtercompany = new Filter("ZCompanyCode", FilterOperator.EQ, odata.ZCompanyCode);
							var filtercostcenter = new Filter("ZCostCenter", FilterOperator.EQ, odata.ZCostCenter);

							cernew_project_odatamodel.read("/CER_PROJECTSet", {
								filters: [filtercompany, filtercostcenter],
								success: function(odata1, resp) {
									// sap.ui.core.BusyIndicator.hide();
									cernew_project_jsonmodel.setSizeLimit(1000);
									cernew_project_jsonmodel.setData(odata1.results);
									this.getView().byId("projectdd").setModel(cernew_project_jsonmodel, "pjctdd");

									this.byId("projectdd").setSelectedKey(odata.ZProjectId);

									this.byId("astdesc").setValue(odata.ZAssetClass);
									this.byId("bdgamnt").setValue(odata.ZBudgetedAmount);
									this.byId("usefullife").setValue(odata.ZUsefulLifeYear);

								}.bind(this),
								error: function(msg) {
									//		this.byId("ccenterdd").setBusy(false);
									// sap.ui.core.BusyIndicator.hide();
									MessageToast.show("Failed:1003:" + msg);

								}
							});

						}
						if (odata.ZBudgeted === "N") {

							this.byId("idsubmittedbudget").setSelectedIndex(1);
							this.byId("ccenterdd").setEnabled(true);

							//this.byId("ccenterdd").setSelectedKey(odata.ZCostCenter);
							//	var jsonarray = [];
							var finalarraycostcenter1 = [];
							var budgetyesno_uri1 = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
							var budgetyesno_odatamodel1 = new ODataModel(budgetyesno_uri1);
							var budgetyesno_jsonmodel1 = new JSONModel();
							//	var assetjsonmodel1 = new JSONModel();
							var filtercompcode1 = new Filter("ZCompanyCode", FilterOperator.EQ, odata.ZCompanyCode);
							var filterbudgetyesno1 = new Filter("ZSubmitFyBudget", FilterOperator.EQ, "NO");
							sap.ui.core.BusyIndicator.show(0);
							budgetyesno_odatamodel1.read("/CER_PROJECTSet", {
								filters: [filtercompcode1, filterbudgetyesno1],
								success: function(odata1, resp) {
									sap.ui.core.BusyIndicator.hide();

									for (var j = 0; j < odata1.results.length; ++j) {
										if (odata1.results[j].ZCostCenter !== "" && odata1.results[j].ZCostCenterDesc !== "") {
											finalarraycostcenter1.push(odata1.results[j]);
										}
									}
									budgetyesno_jsonmodel1.setSizeLimit(1000);
									budgetyesno_jsonmodel1.setData(finalarraycostcenter1);

									this.getView().byId("ccenterdd").setModel(budgetyesno_jsonmodel1, "ccdd");

									this.byId("ccenterdd").setSelectedKey(odata.ZCostCenter);

									this.byId("ccenterdd").setEnabled(true);

								}.bind(this),
								error: function(msg) {
									sap.ui.core.BusyIndicator.hide();
									MessageToast.show("Failed:1004" + msg);
								}
							});

							this.byId("projectddform").setVisible(false);
							this.byId("projectdescform").setVisible(true);

							this.byId("projectdesc").setValue(odata.ZProjectDescription);
							this.byId("astdescdd").setSelectedKey(odata.ZAssetClass);
							this.byId("assetcombo").setVisible(true);

							this.byId("assetinput").setVisible(false);
							this.byId("bdgamnt").setEnabled(true);
							this.byId("bdgamnt").setValue(parseInt(odata.ZBudgetedAmount));
							this.byId("usefullife").setValue(odata.ZUsefulLifeYear);

						}

						this.byId("idestdate1").setValue(this.formatter.dateTime(odata.ZEstimatedStartDate));
						this.byId("idfinishdate1").setValue(this.formatter.dateTime(odata.ZEstimatedFinishDate));

						if (odata.ZManufacturingEquipment === "Y") {
							this.byId("idmanfacturingunitgrp").setSelectedIndex(0);
						}
						if (odata.ZManufacturingEquipment === "N") {
							this.byId("idmanfacturingunitgrp").setSelectedIndex(1);
						}
						if (odata.ZManufacturingEquipment === "") {
							this.byId("idmanfacturingunitgrp").setSelectedIndex(-1);
						}


						this.byId("idbusjust").setValue(odata.ZBusinessJustification);
						this.byId("aecdd").setSelectedKey(odata.ZEnvironmentConsideration);

						this.byId("noncapexpdescdd1").setSelectedKey(odata.ZNonCapexDescription1);
						this.byId("noncapexpdescdd2").setSelectedKey(odata.ZNonCapexDescription2);
						this.byId("noncapexpdescdd3").setValue(odata.ZNonCapexDescription3);
						this.byId("noncapexpdescdd4").setValue(odata.ZNonCapexDescription4);
						this.byId("iddetails1").setValue(odata.ZNonCapexDetails1);
						this.byId("iddetails2").setValue(odata.ZNonCapexDetails2);
						this.byId("iddetails3").setValue(odata.ZNonCapexDetails3);
						this.byId("iddetails4").setValue(odata.ZNonCapexDetails4);
						this.byId("idexp1").setValue(parseInt(odata.ZNonCapexExpense1));
						this.byId("idexp2").setValue(parseInt(odata.ZNonCapexExpense2));
						this.byId("idexp3").setValue(parseInt(odata.ZNonCapexExpense3));
						this.byId("idexp4").setValue(parseInt(odata.ZNonCapexExpense4));

						this.byId("idinternalgrp1").setValue(odata.ZInternalResourcesGroup1);
						this.byId("idinternalgrp2").setValue(odata.ZInternalResourcesGroup2);
						this.byId("idinternalgrp3").setValue(odata.ZInternalResourcesGroup3);
						this.byId("idinternalgrp4").setValue(odata.ZInternalResourcesGroup4);
						this.byId("idinternaldtls1").setValue(odata.ZInternalResourcesDetails1);
						this.byId("idinternaldtls2").setValue(odata.ZInternalResourcesDetails2);
						this.byId("idinternaldtls3").setValue(odata.ZInternalResourcesDetails3);
						this.byId("idinternaldtls4").setValue(odata.ZInternalResourcesDetails4);
						this.byId("idintreshrs1").setValue(parseInt(odata.ZInternalResourcesHours1));
						this.byId("idintreshrs2").setValue(parseInt(odata.ZInternalResourcesHours2));
						this.byId("idintreshrs3").setValue(parseInt(odata.ZInternalResourcesHours3));
						this.byId("idintreshrs4").setValue(parseInt(odata.ZInternalResourcesHours4));

						if (odata.ZReplacingAsset === "Y") {
							this.byId("idrepcurasst").setSelectedIndex(0);
							this.byId("idrepastdesc").setValue(odata.ZReplacingAssetDescription);
							this.byId("idrepastser").setValue(odata.ZReplacingAssetSerialNumb);
							this.byId("idrepastcc").setValue(odata.ZReplacingAssetCostCenter);
							this.byId("idrepastcer").setValue(odata.ZReplacingAssetCerNumber);
							this.byId("idrepastdesc").setEnabled(true);
							this.byId("idrepastser").setEnabled(true);
							this.byId("idrepastcc").setEnabled(true);
							this.byId("idrepastcer").setEnabled(true);
						}
						if (odata.ZReplacingAsset === "N") {
							this.byId("idrepcurasst").setSelectedIndex(1);
						
							this.byId("idrepastdesc").setEnabled(false);
							this.byId("idrepastser").setEnabled(false);
							this.byId("idrepastcc").setEnabled(false);
							this.byId("idrepastcer").setEnabled(false);
						}
						if (odata.ZReplacingAsset === "") {
							this.byId("idrepcurasst").setSelectedIndex(-1);
						}

					}.bind(this),
					error: function(msg) {
						MessageToast.show("Failed:4000:" + msg);
					}
				});

			} // end of else
*/
		}, // end of _handleZCerIdMatched
		/*	_data: {
				"number": ["00.00", ""]
			}, */ // _data
		onInit: function() {

			// UI5 Developer: Suman Venkatapuram
			// OData Developer: Grishmaben Patel
			/*	var oModel = new JSONModel(this._data);
				this.getView().setModel(oModel);*/

			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			//	this.oRouter.getTarget("CreateCer").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

			this.oRouter.getRoute("CreateCer").attachPatternMatched(this._handleZCerIdMatched, this);

			// defaults goes here
			this.byId("idsubmittedbudget").setSelectedIndex(-1);
			this.byId("idsubmittedbudget").setEnabled(false);
			this.byId("idmanfacturingunitgrp").setSelectedIndex(-1);
			//	this.byId("idsoft").setSelectedIndex(-1);
			this.byId("idrepcurasst").setSelectedIndex(-1);
			this.byId("idrepastdesc").setEnabled(false);
			this.byId("idrepastser").setEnabled(false);
			this.byId("idrepastcc").setEnabled(false);

			this.byId("idrepastcer").setEnabled(false);
			this.byId("usefullife").setEnabled(false);
			this.byId("projectdescform").setVisible(false);
			this.byId("bdgamnt").setEnabled(false);

			this.byId("astdesc").setEnabled(false);
			this.byId("astclass").setVisible(false);
			this.byId("idexp1").setValue(0.00);
			this.byId("idexp2").setValue(0.00);
			this.byId("idexp3").setValue(0.00);
			this.byId("idexp4").setValue(0.00);

			this.byId("idintreshrs1").setValue(0.00);
			this.byId("idintreshrs2").setValue(0.00);
			this.byId("idintreshrs3").setValue(0.00);
			this.byId("idintreshrs4").setValue(0.00);
			
			this.byId("bdgamnt").setEnabled(true);

			//Company Dropdown
			var cernew_uri = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
			var cernew_company_odatamodel = new ODataModel(cernew_uri);
			var cernew_company_jsonmodel = new JSONModel();
			var filtercomp = new Filter("DropDown", FilterOperator.EQ, "Z_COMPANY_CODE");

			this.byId("ccenterdd").setEnabled(false);
			this.byId("projectdd").setEnabled(false);
			sap.ui.core.BusyIndicator.show(0);
			cernew_company_odatamodel.read("/CER_DROP_DOWNSet", {
				filters: [filtercomp],
				success: function(odata, resp) {
					sap.ui.core.BusyIndicator.hide();
					cernew_company_jsonmodel.setSizeLimit(1000);
					cernew_company_jsonmodel.setData(odata.results);
					this.getView().byId("compdd").setModel(cernew_company_jsonmodel, "cdd");

				}.bind(this),
				error: function(msg) {
					sap.ui.core.BusyIndicator.hide();

					MessageToast.show("Failed:1000:" + msg);

				}
			});

			// for General Ledger
			var cernew_gl_odatamodel = new ODataModel(cernew_uri);
			var cernew_gl_jsonmodel = new JSONModel();
			var filtergl = new Filter("DropDown", FilterOperator.EQ, "Z_GL_ACCOUNT");
			this.byId("idgenled").setEnabled(false);
			cernew_gl_odatamodel.read("/CER_DROP_DOWNSet", {
				filters: [filtergl],
				success: function(odata, resp) {
					cernew_gl_jsonmodel.setSizeLimit(1000);
					cernew_gl_jsonmodel.setData(odata.results[0].DispValue);
					this.getView().byId("idgenled").setModel(cernew_gl_jsonmodel, "genled");

				}.bind(this),
				error: function(msg) {
					this.byId("compdd").setBusy(false);
					MessageToast.show("Failed:1005:" + msg);

				}
			});

			// Non-Capital Expenses For This Project

			//	var cernew_nce_odatamodel = new ODataModel(cernew_uri);
			var cernew_nce1_jsonmodel = new JSONModel();
			var cernew_nce2_jsonmodel = new JSONModel();
			var filternce = new Filter("DropDown", FilterOperator.EQ, "Z_NON_CAPEX_DESCRIPTION");
			this.byId("idgenled").setEnabled(false);
			cernew_gl_odatamodel.read("/CER_DROP_DOWNSet", {
				filters: [filternce],
				success: function(odata, resp) {

					cernew_nce1_jsonmodel.setData(odata.results);
					cernew_nce2_jsonmodel.setData(odata.results);
					this.getView().byId("noncapexpdescdd1").setModel(cernew_nce1_jsonmodel, "nce1");
					this.getView().byId("noncapexpdescdd2").setModel(cernew_nce2_jsonmodel, "nce2");

				}.bind(this),
				error: function(msg) {
					this.byId("compdd").setBusy(false);
					MessageToast.show("Failed:1006:" + msg);

				}
			});

			// Asset Asset environmental consideration

			var cernew_assetenvcosid_odatamodel = new ODataModel(cernew_uri);
			var cernew_assetenvcosid_jsonmodel = new JSONModel();
			var filterasset = new Filter("DropDown", FilterOperator.EQ, "Z_ENVIRONMENT_CONSIDERATION");

			cernew_assetenvcosid_odatamodel.read("/CER_DROP_DOWNSet", {
				filters: [filterasset],
				success: function(odata, resp) {
					cernew_assetenvcosid_jsonmodel.setSizeLimit(1000);
					cernew_assetenvcosid_jsonmodel.setData(odata.results);
					this.getView().byId("aecdd").setModel(cernew_assetenvcosid_jsonmodel, "aec");

				}.bind(this),
				error: function(msg) {
					MessageToast.show("Failed:1001:" + msg);

				}
			});

		}, // end of onInit

		_compddsel: function(oevent) {

			this.byId("idsubmittedbudget").setSelectedIndex(-1);
			this.byId("idsubmittedbudget").setEnabled(true);
			this.byId("ccenterdd").setSelectedKey();
			this.byId("ccenterdd").setEnabled(false);
			this.byId("projectdesc").setValue();
			this.byId("projectdd").setSelectedKey();
			this.byId("projectdd").setEnabled(false);
			this.byId("astdesc").setValue();
			this.byId("astdesc").setEnabled(false);
			this.byId("astdescdd").setSelectedKey();
			this.byId("bdgamnt").setValue();
			this.byId("idestdate1").setValue();
			this.byId("idfinishdate1").setValue();
			this.byId("usefullife").setValue();
			this.byId("idmanfacturingunitgrp").setSelectedIndex(-1);
		}, // end of _compddsel

		_ccenterddsel: function(oevent) {

			var ccentervalue = this.byId("ccenterdd").getSelectedKey();
			this.byId("astdesc").setEnabled(false);

			if (this.byId("idsubmittedbudget").getSelectedIndex() === 0) {
				this.byId("bdgamnt").setEnabled(false);

				this.byId("usefullife").setEnabled(false);

			}
			if (this.byId("idsubmittedbudget").getSelectedIndex() === 1) {
				this.byId("bdgamnt").setEnabled(true);

				//	this.byId("usefullife").setValue();
			}

			this.byId("usefullife").setEnabled(false);
			// CostCenter Dropdown
			var cernew_uri = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
			var cernew_project_odatamodel = new ODataModel(cernew_uri);
			var cernew_project_jsonmodel = new JSONModel();
			var filtercompany = new Filter("ZCompanyCode", FilterOperator.EQ, this.byId("compdd").getSelectedKey());
			var filtercostcenter = new Filter("ZCostCenter", FilterOperator.EQ, ccentervalue);

			this.byId("projectdd").setEnabled(false);
			sap.ui.core.BusyIndicator.show(0);
			cernew_project_odatamodel.read("/CER_PROJECTSet", {
				filters: [filtercompany, filtercostcenter],
				success: function(odata, resp) {
					sap.ui.core.BusyIndicator.hide();
					cernew_project_jsonmodel.setSizeLimit(1000);
					this.byId("astdescdd").setEnabled(true);
					cernew_project_jsonmodel.setData(odata.results);
					this.getView().byId("projectdd").setModel(cernew_project_jsonmodel, "pjctdd");
					this.byId("projectdd").setEnabled(true);

				}.bind(this),
				error: function(msg) {
					//		this.byId("ccenterdd").setBusy(false);
					sap.ui.core.BusyIndicator.hide();
					MessageToast.show("Failed:1003:" + msg);

				}
			});

		}, // end of _ccenterddsel
		_pjctddsel: function(oevent) {

			var compcode = this.byId("compdd").getSelectedKey();
			var ccentercode = this.byId("ccenterdd").getSelectedKey();
			var pid = this.byId("projectdd").getSelectedKey();
			// Project Dropdown
			var cernew_uri = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
			var cernew_pjctdesc_odatamodel = new ODataModel(cernew_uri);

			var esetcombi = "/CER_PROJECTSet" + "(ZCompanyCode='" + compcode + "',ZCostCenter='" + ccentercode + "',ZProjectId='" + pid + "')";
			var jsonmodel_forAll = new JSONModel();
			var jsonarray_ass = [];
			sap.ui.core.BusyIndicator.show(0);

			cernew_pjctdesc_odatamodel.read(esetcombi, {

				success: function(odata, resp) {
					sap.ui.core.BusyIndicator.hide();
					jsonarray_ass = {
						"assclass": odata.ZAssetClass,
						"assdesc": odata.ZAssetDesc,
						"budgamnt": parseFloat(odata.ZBudgetedAmount).toFixed(0),
						"usefullife": odata.ZUsefulLifeYear

					};
					
					jsonmodel_forAll.setData(jsonarray_ass);
					this.getView().setModel(jsonmodel_forAll, "allvalues");
					this.byId("bdgamnt").setEnabled(true);

				}.bind(this),
				error: function(msg) {

					sap.ui.core.BusyIndicator.hide();
					MessageToast.show("Failed..NoData:1004:" + msg);

				}
			});
		}, // end of _pjctddsel
		_assetenvconsiddd: function() {

		}, // end of _assetenvconsiddd

		_onRadioButtonGroupSelectbudget: function(oevent) {
			var indexofradiobuttons = oevent.getParameter("selectedIndex");
			// if radio is YES
			if (indexofradiobuttons === 0) {

				//this.onInit();
				if (this.byId("radiobudgetyes").getSelected()) {
					this.byId("projectdd").setEnabled(false);
					this.byId("assetcombo").setVisible(false);
					this.byId("assetinput").setVisible(true);
					this.byId("projectdesc").setValue();
					this.byId("astdescdd").setSelectedKey();
					this.byId("ccenterdd").setSelectedKey();
					this.byId("bdgamnt").setValue();
					this.byId("bdgamnt").setEnabled(false);

					this.byId("projectddform").setVisible(true);
					this.byId("projectdescform").setVisible(false);
					this.byId("usefullife").setValue();

					this.byId("idmanfacturingunitgrp").setSelectedIndex(-1);
					var storevalue = this.byId("compdd").getSelectedKey();
					this.byId("idestdate1").setValue();
					this.byId("idfinishdate1").setValue();

					// Cost Center Dropdown
					var cernew_uri = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
					var cernew_ccenter_odatamodel = new ODataModel(cernew_uri);
					var cernew_ccenter_jsonmodel = new JSONModel();
					var filtercompcode = new Filter("ZCompanyCode", FilterOperator.EQ, storevalue);
					//	var filterbudgetyesno = new Filter("ZSubmitFyBudget", FilterOperator.EQ, "YES");
					this.byId("ccenterdd").setEnabled(false);
					this.byId("projectdd").setEnabled(false);
					this.byId("projectdd").setSelectedKey("");
					var finalarraycostcenter = [];
					sap.ui.core.BusyIndicator.show(0);
					cernew_ccenter_odatamodel.read("/CER_PROJECTSet", {
						filters: [filtercompcode],
						success: function(odata, resp) {
							sap.ui.core.BusyIndicator.hide();
							for (var j = 0; j < odata.results.length; ++j) {
								if (odata.results[j].ZCostCenter !== "" && odata.results[j].ZCostCenterDesc !== "") {
									finalarraycostcenter.push(odata.results[j]);
								}
							}
							cernew_ccenter_jsonmodel.setData(finalarraycostcenter);
							this.getView().byId("ccenterdd").setModel(cernew_ccenter_jsonmodel, "ccdd");
							this.byId("ccenterdd").setEnabled(true);
							//	this.byId("projectdd").setEnabled(false);
						}.bind(this),
						error: function(msg) {

							MessageToast.show("Failed:1002:" + msg);

						}
					});

				}
			}
			// if radio is NO
			if (indexofradiobuttons === 1) {
				if (this.byId("radiobudgetno").getSelected()) {

					this.byId("projectdd").setEnabled(false);
					this.byId("projectdd").setSelectedKey();
					this.byId("projectdesc").setValue();
					this.byId("astdesc").setValue();
					this.byId("bdgamnt").setValue();
					this.byId("bdgamnt").setEnabled(true);

					this.byId("assetcombo").setVisible(true);
					this.byId("assetinput").setVisible(false);
					this.byId("projectddform").setVisible(false);
					this.byId("projectdescform").setVisible(true);
					this.byId("ccenterdd").setSelectedKey();
					this.byId("ccenterdd").setEnabled(false);
					this.byId("usefullife").setValue();
					this.byId("idestdate1").setValue();
					this.byId("idfinishdate1").setValue();
					this.byId("idmanfacturingunitgrp").setSelectedIndex(-1);
					var zcompcode = this.byId("compdd").getSelectedKey();

					var budgetyesno_uri = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
					var budgetyesno_odatamodel = new ODataModel(budgetyesno_uri);
					var budgetyesno_jsonmodel = new JSONModel();
					var assetjsonmodel = new JSONModel();
					var filtercompcode1 = new Filter("ZCompanyCode", FilterOperator.EQ, zcompcode);
					var filterbudgetyesno1 = new Filter("ZSubmitFyBudget", FilterOperator.EQ, "NO");

					var finalarrayasstclass = [];
					var finalarraycostcenter1 = [];

					sap.ui.core.BusyIndicator.show(0);
					budgetyesno_odatamodel.read("/CER_PROJECTSet", {
						filters: [filtercompcode1, filterbudgetyesno1],
						success: function(odata, resp) {
							sap.ui.core.BusyIndicator.hide();
							budgetyesno_jsonmodel.setSizeLimit(1000);
							assetjsonmodel.setSizeLimit(1000);

							for (var j = 0; j < odata.results.length; ++j) {
								if (odata.results[j].ZCostCenter !== "" && odata.results[j].ZCostCenterDesc !== "") {
									finalarraycostcenter1.push(odata.results[j]);
								}
							}
							budgetyesno_jsonmodel.setData(finalarraycostcenter1);

							this.getView().byId("ccenterdd").setModel(budgetyesno_jsonmodel, "ccdd");
							this.byId("ccenterdd").setEnabled(true);

							for (var i = 0; i < odata.results.length; ++i) {
								if (odata.results[i].ZAssetClass !== "" && odata.results[i].ZAssetDesc !== "") {
									finalarrayasstclass.push(odata.results[i]);
								}
							}
							assetjsonmodel.setData(finalarrayasstclass);
							this.getView().byId("astdescdd").setModel(assetjsonmodel, "bdtnoastclass");

						}.bind(this),
						error: function(msg) {
							sap.ui.core.BusyIndicator.hide();
							MessageToast.show("Failed:1004" + msg);
						}
					});

				}
			}
		}, // end of _onRadioButtonGroupSelect
		_onRadioButtonGroupSelect_man: function(oevent) {
			//	var indexofradiobuttons = oevent.getParameter("selectedIndex");

		}, // end of _onRadioButtonGroupSelect_man
		_onRadioButtonGroupSelect_soft: function(oevent) {

		}, // end of _onRadioButtonGroupSelect_sw

		_assetdd: function() {
			this.byId("usefullife").setEnabled(false);

			var budgetyesno_uri = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
			var budgetyesno_odatamodel = new ODataModel(budgetyesno_uri);
			var usefullifejsonmodel = new JSONModel();
			var filtercompcode = new Filter("ZCompanyCode", FilterOperator.EQ, this.byId("compdd").getSelectedKey());
			var filterbudgetyesno = new Filter("ZSubmitFyBudget", FilterOperator.EQ, "NO");
			var filterassetdd = new Filter("ZAssetClass", FilterOperator.EQ, this.byId("astdescdd").getSelectedKey());
			var jsonarray_ass = [];
			sap.ui.core.BusyIndicator.show(0);
			budgetyesno_odatamodel.read("/CER_PROJECTSet", {
				filters: [filtercompcode, filterbudgetyesno, filterassetdd],
				success: function(odata, resp) {
					sap.ui.core.BusyIndicator.hide();
					jsonarray_ass = {

						"usefullife": odata.results[0].ZUsefulLifeYear

					};

					usefullifejsonmodel.setData(jsonarray_ass);
					this.getView().byId("usefullife").setModel(usefullifejsonmodel, "allvalues");

				}.bind(this),
				error: function(msg) {
					sap.ui.core.BusyIndicator.hide();
					MessageToast.show("Failed:1004" + msg);
				}
			});

		}, // end of _assetdd
		__NumbersOnly: function(oevent) {
			var _oInput = oevent.getSource();
			var val = _oInput.getValue();
			val = val.replace(/[^\d]/g, '');
			_oInput.setValue(val);
		}, // end of 
		_expensessummate: function(oevent) {
			this.__NumbersOnly(oevent);
			var a = Number(this.byId("idexp1").getValue());
			var b = Number(this.byId("idexp2").getValue());
			var c = Number(this.byId("idexp3").getValue());
			var d = Number(this.byId("idexp4").getValue());
			this.expensetotal = a + b + c + d;

			this.byId("idexptotal").setText(this.expensetotal);
		}, // end of _expensessummate
		_internalreshours: function(oevent) {
			this.__NumbersOnly(oevent);
			var a = Number(this.byId("idintreshrs1").getValue());
			var b = Number(this.byId("idintreshrs2").getValue());
			var c = Number(this.byId("idintreshrs3").getValue());
			var d = Number(this.byId("idintreshrs4").getValue());
			this.hours = a + b + c + d;
			this.byId("idintreshrstotal").setText(this.hours);

		}, // end of _internalreshours

		_onPageNavButtonPress: function() {

			//	this._back2Main();
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

		_onRadioButtonGroupSelect2: function() {

			if (this.byId("idrepcurasst").getSelectedIndex() === 0) {
				this.byId("idrepastdesc").setEnabled(true);
				this.byId("idrepastser").setEnabled(true);
				this.byId("idrepastcc").setEnabled(true);
				this.byId("idrepastcer").setEnabled(true);
			}
			if (this.byId("idrepcurasst").getSelectedIndex() === 1) {

				this.byId("idrepastdesc").setEnabled(false);
				this.byId("idrepastser").setEnabled(false);
				this.byId("idrepastcc").setEnabled(false);
				this.byId("idrepastcer").setEnabled(false);

			}

		}, // end of _onRadioButtonGroupSelect2
		_savedraft: function() {
		debugger;
			var mandatoryvalues = {
				companycode: this.byId("compdd").getSelectedKey(),
				submittedbudget: this.byId("idsubmittedbudget").getSelectedIndex(),
				costcenter: this.byId("ccenterdd").getSelectedKey(),
				projectdd: this.byId("projectdd").getSelectedKey(),
				projectdesc: this.byId("projectdesc").getValue(),
				astdescrip: this.byId("astdesc").getValue(),
				assetdropdown: this.byId("astdescdd").getSelectedKey(),
				bdgamnt: this.byId("bdgamnt").getValue(0),
				ZEstimatedStartDate: this.byId("idestdate1").getValue(),
				ZEstimatedFinishDate: this.byId("idfinishdate1").getValue(),
				manfacturinggroup: this.byId("idmanfacturingunitgrp").getSelectedIndex()
				
					//software: this.byId("idsoft").getSelectedIndex()
			};
			if (mandatoryvalues.companycode === "") {
				MessageToast.show("Mandatory: Company Code.");
			} else if (mandatoryvalues.submittedbudget === -1) {
				MessageToast.show("Mandatory: Submitted with FY Budget");
			} else if (mandatoryvalues.submittedbudget === 0 && mandatoryvalues.costcenter === "") {
				MessageToast.show("Mandatory: Cost Center");
			} else if (mandatoryvalues.costcenter === "") {
				MessageToast.show("Mandatory: Cost Center");
			} else if (mandatoryvalues.submittedbudget === 0 && mandatoryvalues.projectdd === "") {
				MessageToast.show("Mandatory: Project");
			}else if (mandatoryvalues.submittedbudget === 0 && mandatoryvalues.bdgamnt === "") {
				MessageToast.show("Mandatory: Budget Amount");
			} else if (mandatoryvalues.submittedbudget === 1 && mandatoryvalues.projectdesc === "") {
				MessageToast.show("Mandatory: Project Description");
			} else if (mandatoryvalues.submittedbudget === 1 && mandatoryvalues.assetdropdown === "") {
				MessageToast.show("Mandatory: Asset Class");
			} else if (mandatoryvalues.submittedbudget === 1 && mandatoryvalues.bdgamnt === "") {
				MessageToast.show("Mandatory: Budget Amount");
			} else
			if (mandatoryvalues.ZEstimatedStartDate === "") {
				MessageToast.show("Mandatory: Start Date");
			} else if (mandatoryvalues.ZEstimatedFinishDate === "") {
				MessageToast.show("Mandatory: Finish Date");
			} else if (mandatoryvalues.manfacturinggroup === -1) {
				MessageToast.show("Mandatory: Manufacturing");
			} else if (mandatoryvalues.software === -1) {
				MessageToast.show("Mandatory: Software");
			}
			if (new Date(mandatoryvalues.ZEstimatedStartDate) > new Date(mandatoryvalues.ZEstimatedFinishDate)) {
				MessageToast.show("Finish Date should be Greater than Start Date");
			}
			if (this.byId("idsubmittedbudget").getSelectedIndex() === 0) {
				var ZBudgeted = "Y";
			}
			if (this.byId("idsubmittedbudget").getSelectedIndex() === 1) {
				ZBudgeted = "N";
			}

			if (this.byId("idmanfacturingunitgrp").getSelectedIndex() === 0) {
				var ZManufacturingEquipment = "Y";
			}
			if (this.byId("idmanfacturingunitgrp").getSelectedIndex() === 1) {
				ZManufacturingEquipment = "N";
			}

			if (this.byId("idrepcurasst").getSelectedIndex() === 0) {
				var ZReplacingAsset = "Y";
			}
			if (this.byId("idrepcurasst").getSelectedIndex() === 1) {
				ZReplacingAsset = "N";
				this.byId("idrepastdesc").setValue();
				this.byId("idrepastser").setValue();
				this.byId("idrepastcc").setValue();
				this.byId("idrepastcer").setValue();
			}

			/* START OF IF-ELSE FOR SUBMITTED BUDGET IS YES*/
			if (mandatoryvalues.submittedbudget === 0 && mandatoryvalues.costcenter !== "" && mandatoryvalues.projectdd !== "" &&
				mandatoryvalues.ZEstimatedStartDate !== "" && mandatoryvalues.ZEstimatedFinishDate !== "" && mandatoryvalues.bdgamnt !== "" &&
				mandatoryvalues.manfacturinggroup !== -1 && mandatoryvalues.software !== -1) {
					
					

				var _saveDraftwithyes = {
					ZCerId: this.ZCerId,
					ZCerStatus: "1",
					ZCompanyCode: this.byId("compdd").getSelectedKey(),
					ZBudgeted: ZBudgeted,
					ZCostCenter: this.byId("ccenterdd").getSelectedKey(),
					ZProjectId: this.byId("projectdd").getSelectedKey(),
					ZProjectDescription: this.byId("projectdd").getSelectedItem().getText().split(":")[1],
					ZAssetClass: this.byId("astdesc").getValue().split("-")[0].trim(),
					ZBudgetedAmount: this.byId("bdgamnt").getValue(),
					ZUsefulLifeYear: this.byId("usefullife").getValue(),
					//	ZEstimatedStartDate: new Date(this.byId("idestdate1").getValue()).toJSON().split("Z")[0],
					//  ZEstimatedFinishDate: new Date(this.byId("idfinishdate1").getValue()).toJSON().split("Z")[0],
					ZEstimatedStartDate: this.formatter.dateTimebackend2(this.byId("idestdate1").getValue()),
					ZEstimatedFinishDate: this.formatter.dateTimebackend2(this.byId("idfinishdate1").getValue()),
					ZManufacturingEquipment: ZManufacturingEquipment,
					//	ZSoftware: ZSoftware,
					ZBusinessJustification: this.byId("idbusjust").getValue(),
					ZEnvironmentConsideration: this.byId("aecdd").getSelectedKey(),
					ZNonCapexDescription1: this.byId("noncapexpdescdd1").getSelectedKey(),
					ZNonCapexDescription2: this.byId("noncapexpdescdd2").getSelectedKey(),
					ZNonCapexDescription3: this.byId("noncapexpdescdd3").getValue(),
					ZNonCapexDescription4: this.byId("noncapexpdescdd4").getValue(),
					ZNonCapexDetails1: this.byId("iddetails1").getValue(),
					ZNonCapexDetails2: this.byId("iddetails2").getValue(),
					ZNonCapexDetails3: this.byId("iddetails3").getValue(),
					ZNonCapexDetails4: this.byId("iddetails4").getValue(),
					ZNonCapexExpense1: this.byId("idexp1").getValue(),
					ZNonCapexExpense2: this.byId("idexp2").getValue(),
					ZNonCapexExpense3: this.byId("idexp3").getValue(),
					ZNonCapexExpense4: this.byId("idexp4").getValue(),
					ZInternalResourcesGroup1: this.byId("idinternalgrp1").getValue(),
					ZInternalResourcesGroup2: this.byId("idinternalgrp2").getValue(),
					ZInternalResourcesGroup3: this.byId("idinternalgrp3").getValue(),
					ZInternalResourcesGroup4: this.byId("idinternalgrp4").getValue(),
					ZInternalResourcesDetails1: this.byId("idinternaldtls1").getValue(),
					ZInternalResourcesDetails2: this.byId("idinternaldtls2").getValue(),
					ZInternalResourcesDetails3: this.byId("idinternaldtls3").getValue(),
					ZInternalResourcesDetails4: this.byId("idinternaldtls4").getValue(),
					ZInternalResourcesHours1: this.byId("idintreshrs1").getValue(),
					ZInternalResourcesHours2: this.byId("idintreshrs2").getValue(),
					ZInternalResourcesHours3: this.byId("idintreshrs3").getValue(),
					ZInternalResourcesHours4: this.byId("idintreshrs4").getValue(),
					ZReplacingAsset: ZReplacingAsset,
					ZReplacingAssetDescription: this.byId("idrepastdesc").getValue(),
					ZReplacingAssetSerialNumb: this.byId("idrepastser").getValue(),
					ZReplacingAssetCostCenter: this.byId("idrepastcc").getValue(),
					ZReplacingAssetCerNumber: this.byId("idrepastcer").getValue()
				};

				var data_savedraft = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
				var odatamodel_savedraft = new ODataModel(data_savedraft);

				if (this.ZCerId === "0") {
					// Create 
					//	var eset = "/CER_MASTERSet(ZCerId='"+this.ZCerId+"')";
					odatamodel_savedraft.create("/CER_MASTERSet", _saveDraftwithyes, {
						success: function(odata, resp) {
							this._refresh();
							MessageToast.show("CER Form: Draft Saved");

							this.oRouter.navTo("Main", {}, true);
						}.bind(this),
						error: function(msg) {

							MessageToast.show("Failed:SaveDraft 3000:" + msg);
						}

					}); // end of odatamodel.create
				} else {
					var eset = "/CER_MASTERSet(ZCerId='" + this.ZCerId + "')";
					odatamodel_savedraft.update(eset, _saveDraftwithyes, {
						success: function(odata, resp) {
							this._refresh();
							MessageToast.show("CER Form: Draft Saved");

							this.oRouter.navTo("Main", {}, true);
						}.bind(this),
						error: function(msg) {

							MessageToast.show("Failed:SaveDraft 3000:" + msg);
						}

					}); // end of odatamodel.create
				}
			} // end of if 

			/* START OF IF-ELSE FOR SUBMITTED BUDGET IS NO*/
			if (mandatoryvalues.submittedbudget === 1 && mandatoryvalues.costcenter !== "" && mandatoryvalues.assetdropdown !== "" &&
				mandatoryvalues.bdgamnt !== "" && mandatoryvalues.projectdesc !== "" && mandatoryvalues.ZEstimatedStartDate !== "" &&
				mandatoryvalues.ZEstimatedFinishDate !== "" && mandatoryvalues.manfacturinggroup !== -1 && mandatoryvalues.software !== -1) {

				var _saveDraftwithno = {
					ZCerId: this.ZCerId,
					ZCerStatus: "1",
					ZCompanyCode: this.byId("compdd").getSelectedKey(),
					ZBudgeted: ZBudgeted,
					ZCostCenter: this.byId("ccenterdd").getSelectedKey(),
					ZProjectDescription: this.byId("projectdesc").getValue(),
					//	ZAssetClass: this.byId("astdescdd").getSelectedKey().split("-")[0].trim(),
					ZAssetClass: this.byId("astdescdd").getSelectedKey(),
					ZBudgetedAmount: this.byId("bdgamnt").getValue(0),
					ZUsefulLifeYear: this.byId("usefullife").getValue(),
					//	ZEstimatedStartDate: new Date(this.byId("idestdate1").getValue()).toJSON().split("Z")[0],
					//	ZEstimatedFinishDate: new Date(this.byId("idfinishdate1").getValue()).toJSON().split("Z")[0],
					ZEstimatedStartDate: this.formatter.dateTimebackend2(this.byId("idestdate1").getValue()),
					ZEstimatedFinishDate: this.formatter.dateTimebackend2(this.byId("idfinishdate1").getValue()),
					ZManufacturingEquipment: ZManufacturingEquipment,
					//	ZSoftware: ZSoftware,
					ZBusinessJustification: this.byId("idbusjust").getValue(),
					ZEnvironmentConsideration: this.byId("aecdd").getSelectedKey(),
					ZNonCapexDescription1: this.byId("noncapexpdescdd1").getSelectedKey(),
					ZNonCapexDescription2: this.byId("noncapexpdescdd2").getSelectedKey(),
					ZNonCapexDescription3: this.byId("noncapexpdescdd3").getValue(),
					ZNonCapexDescription4: this.byId("noncapexpdescdd4").getValue(),
					ZNonCapexDetails1: this.byId("iddetails1").getValue(),
					ZNonCapexDetails2: this.byId("iddetails2").getValue(),
					ZNonCapexDetails3: this.byId("iddetails3").getValue(),
					ZNonCapexDetails4: this.byId("iddetails4").getValue(),
					ZNonCapexExpense1: this.byId("idexp1").getValue(),
					ZNonCapexExpense2: this.byId("idexp2").getValue(),
					ZNonCapexExpense3: this.byId("idexp3").getValue(),
					ZNonCapexExpense4: this.byId("idexp4").getValue(),
					ZInternalResourcesGroup1: this.byId("idinternalgrp1").getValue(),
					ZInternalResourcesGroup2: this.byId("idinternalgrp2").getValue(),
					ZInternalResourcesGroup3: this.byId("idinternalgrp3").getValue(),
					ZInternalResourcesGroup4: this.byId("idinternalgrp4").getValue(),
					ZInternalResourcesDetails1: this.byId("idinternaldtls1").getValue(),
					ZInternalResourcesDetails2: this.byId("idinternaldtls2").getValue(),
					ZInternalResourcesDetails3: this.byId("idinternaldtls3").getValue(),
					ZInternalResourcesDetails4: this.byId("idinternaldtls4").getValue(),
					ZInternalResourcesHours1: this.byId("idintreshrs1").getValue(),
					ZInternalResourcesHours2: this.byId("idintreshrs2").getValue(),
					ZInternalResourcesHours3: this.byId("idintreshrs3").getValue(),
					ZInternalResourcesHours4: this.byId("idintreshrs4").getValue(),
					ZReplacingAsset: ZReplacingAsset,
					ZReplacingAssetDescription: this.byId("idrepastdesc").getValue(),
					ZReplacingAssetSerialNumb: this.byId("idrepastser").getValue(),
					ZReplacingAssetCostCenter: this.byId("idrepastcc").getValue(),
					ZReplacingAssetCerNumber: this.byId("idrepastcer").getValue()
				};

				var data_savedraft_no = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
				var odatamodel1_savedraft_no = new ODataModel(data_savedraft_no);
				if (this.ZCerId === "0") {
					odatamodel1_savedraft_no.create("/CER_MASTERSet", _saveDraftwithno, {
						success: function(odata, resp) {
							this._refresh();
							MessageToast.show("CER Form: Draft Saved");

							this._back2Main();
						}.bind(this),
						error: function(msg) {

							MessageToast.show("Failed:SaveDraft 3001:" + msg);
						}

					}); // end of odatamodel.create
				} // end of if for submitted budget is NO
				else {
					var eset1 = "/CER_MASTERSet(ZCerId='" + this.ZCerId + "')";
					odatamodel1_savedraft_no.update(eset1, _saveDraftwithno, {
						success: function(odata, resp) {
							this._refresh();
							MessageToast.show("CER Form: Draft Saved");

							this.oRouter.navTo("Main", {}, true);
						}.bind(this),
						error: function(msg) {

							MessageToast.show("Failed:SaveDraft 3002:" + msg);
						}

					}); // end of odatamodel.create
				}
			}
		}, //end of _savedraft
		_back2Main: function() {

			this.oRouter.navTo("Main", {
				name: "r1",
				from: "CreateCer",
				to: "Main"
			}, true);
		}, // end of _back2Main

		_submitcer: function(oevent) {

			var mandatoryvalues = {
				companycode: this.byId("compdd").getSelectedKey(),
				submittedbudget: this.byId("idsubmittedbudget").getSelectedIndex(),
				costcenter: this.byId("ccenterdd").getSelectedKey(),
				projectdd: this.byId("projectdd").getSelectedKey(),
				projectdesc: this.byId("projectdesc").getValue(),
				astdescrip: this.byId("astdesc").getValue(),
				assetdropdown: this.byId("astdescdd").getSelectedKey(),
				bdgamnt: this.byId("bdgamnt").getValue(),
				//	bdgamntdec: this.byId("bdgamntdec").getValue(),
				ZEstimatedStartDate: this.byId("idestdate1").getValue(),
				ZEstimatedFinishDate: this.byId("idfinishdate1").getValue(),
				manfacturinggroup: this.byId("idmanfacturingunitgrp").getSelectedIndex(),
				//	software: this.byId("idsoft").getSelectedIndex(),
				busjust: this.byId("idbusjust").getValue(),
				assetenviron: this.byId("aecdd").getSelectedKey(),
				replcurast: this.byId("idrepcurasst").getSelectedIndex(),
				repldesc: this.byId("idrepastdesc").getValue(),
				replcc: this.byId("idrepastcc").getValue()
			};

			if (mandatoryvalues.companycode === "") {
				MessageToast.show("Mandatory: Company Code.");
			} else if (mandatoryvalues.submittedbudget === -1) {
				MessageToast.show("Mandatory: Submitted with FY Budget");
			} else if (mandatoryvalues.submittedbudget === 0 && mandatoryvalues.costcenter === "") {
				MessageToast.show("Mandatory: Cost Center");
			} else if (mandatoryvalues.costcenter === "") {
				MessageToast.show("Mandatory: Cost Center");
			} else if (mandatoryvalues.submittedbudget === 0 && mandatoryvalues.projectdd === "") {
				MessageToast.show("Mandatory: Project");
			} else if (mandatoryvalues.submittedbudget === 1 && mandatoryvalues.projectdesc === "") {
				MessageToast.show("Mandatory: Project Description");
			} else if (mandatoryvalues.submittedbudget === 1 && mandatoryvalues.assetdropdown === "") {
				MessageToast.show("Mandatory: Asset Class");
			} else if (mandatoryvalues.submittedbudget === 1 && mandatoryvalues.bdgamnt === "") {
				MessageToast.show("Mandatory: Budget Amount");
			} else
			if (mandatoryvalues.ZEstimatedStartDate === "") {
				MessageToast.show("Mandatory: Start Date");
			} else if (mandatoryvalues.ZEstimatedFinishDate === "") {
				MessageToast.show("Mandatory: Finish Date");
			} else
			if (new Date(mandatoryvalues.ZEstimatedStartDate) > new Date(mandatoryvalues.ZEstimatedFinishDate)) {
				MessageToast.show("Finish Date should be Greater than Start Date");
			} else
			if (mandatoryvalues.manfacturinggroup === -1) {
				MessageToast.show("Mandatory: Manufacturing");
			} else if (mandatoryvalues.software === -1) {
				MessageToast.show("Mandatory: Software");
			} else if (mandatoryvalues.busjust === "") {
				MessageToast.show("Mandatory: Business Justification");
			} else if (mandatoryvalues.assetenviron === "") {
				MessageToast.show("Mandatory: Asset Info");
			} else
			if (mandatoryvalues.replcurast === -1) {
				MessageToast.show("Mandatory: Replace a Current Asset");
			} else
			if (mandatoryvalues.replcurast === 0 && mandatoryvalues.repldesc === "") {
				MessageToast.show("Mandatory: Description/Location");
			} else
			if (mandatoryvalues.replcurast === 0 && mandatoryvalues.replcc === "") {
				MessageToast.show("Mandatory: Current Asset Cost Center");
			} else

			// if (new Date(mandatoryvalues.ZEstimatedStartDate) > new Date(mandatoryvalues.ZEstimatedFinishDate)) {
			// 	MessageToast.show("Finish Date should be Greater than Start Date");
			// } 
			if (this.byId("idsubmittedbudget").getSelectedIndex() === 0) {
				var ZBudgeted = "Y";
			} else
			if (this.byId("idsubmittedbudget").getSelectedIndex() === 1) {
				ZBudgeted = "N";
			}

			if (this.byId("idmanfacturingunitgrp").getSelectedIndex() === 0) {
				var ZManufacturingEquipment = "Y";
			} else
			if (this.byId("idmanfacturingunitgrp").getSelectedIndex() === 1) {
				ZManufacturingEquipment = "N";
			}

			if (this.byId("idrepcurasst").getSelectedIndex() === 0) {
				var ZReplacingAsset = "Y";
			} else
			if (this.byId("idrepcurasst").getSelectedIndex() === 1) {
				ZReplacingAsset = "N";
				this.byId("idrepastdesc").setValue();
				this.byId("idrepastser").setValue();
				this.byId("idrepastcc").setValue();
				this.byId("idrepastcer").setValue();
			}

			/* START OF IF-ELSE FOR SUBMITTED BUDGET IS YES*/
			if (mandatoryvalues.submittedbudget === 0 && mandatoryvalues.costcenter !== "" && mandatoryvalues.projectdd !== "" &&
				mandatoryvalues.ZEstimatedStartDate !== "" && mandatoryvalues.ZEstimatedFinishDate !== "" &&
				mandatoryvalues.manfacturinggroup !== -1 && mandatoryvalues.software !== -1 && mandatoryvalues.busjust !== "" && mandatoryvalues.assetenviron !==
				"" && mandatoryvalues.replcurast !== -1 && mandatoryvalues.repldesc !== "" && mandatoryvalues.replcc !== "") {

				var submitEntrywithbudgetyes = {
					ZCerId: this.ZCerId,
					ZCerStatus: "2",
					ZCompanyCode: this.byId("compdd").getSelectedKey(),
					ZBudgeted: ZBudgeted,
					ZCostCenter: this.byId("ccenterdd").getSelectedKey(),
					ZProjectId: this.byId("projectdd").getSelectedKey(),
					ZProjectDescription: this.byId("projectdd").getSelectedItem().getText().split(":")[1],

					ZAssetClass: this.byId("astdesc").getValue().split("-")[0].trim(),

					ZBudgetedAmount: this.byId("bdgamnt").getValue(),

					ZUsefulLifeYear: this.byId("usefullife").getValue(),
					//	ZEstimatedStartDate: new Date(this.byId("idestdate1").getValue()).toJSON().split("Z")[0],
					//	ZEstimatedFinishDate: new Date(this.byId("idfinishdate1").getValue()).toJSON().split("Z")[0],
					ZEstimatedStartDate: this.formatter.dateTimebackend2(this.byId("idestdate1").getValue()),
					ZEstimatedFinishDate: this.formatter.dateTimebackend2(this.byId("idfinishdate1").getValue()),
					ZManufacturingEquipment: ZManufacturingEquipment,
					//	ZSoftware: ZSoftware,
					ZBusinessJustification: this.byId("idbusjust").getValue(),
					ZEnvironmentConsideration: this.byId("aecdd").getSelectedKey(),
					ZNonCapexDescription1: this.byId("noncapexpdescdd1").getSelectedKey(),
					ZNonCapexDescription2: this.byId("noncapexpdescdd2").getSelectedKey(),
					ZNonCapexDescription3: this.byId("noncapexpdescdd3").getValue(),
					ZNonCapexDescription4: this.byId("noncapexpdescdd4").getValue(),
					ZNonCapexDetails1: this.byId("iddetails1").getValue(),
					ZNonCapexDetails2: this.byId("iddetails2").getValue(),
					ZNonCapexDetails3: this.byId("iddetails3").getValue(),
					ZNonCapexDetails4: this.byId("iddetails4").getValue(),
					ZNonCapexExpense1: this.byId("idexp1").getValue(),
					ZNonCapexExpense2: this.byId("idexp2").getValue(),
					ZNonCapexExpense3: this.byId("idexp3").getValue(),
					ZNonCapexExpense4: this.byId("idexp4").getValue(),
					ZInternalResourcesGroup1: this.byId("idinternalgrp1").getValue(),
					ZInternalResourcesGroup2: this.byId("idinternalgrp2").getValue(),
					ZInternalResourcesGroup3: this.byId("idinternalgrp3").getValue(),
					ZInternalResourcesGroup4: this.byId("idinternalgrp4").getValue(),
					ZInternalResourcesDetails1: this.byId("idinternaldtls1").getValue(),
					ZInternalResourcesDetails2: this.byId("idinternaldtls2").getValue(),
					ZInternalResourcesDetails3: this.byId("idinternaldtls3").getValue(),
					ZInternalResourcesDetails4: this.byId("idinternaldtls4").getValue(),
					ZInternalResourcesHours1: this.byId("idintreshrs1").getValue(),
					ZInternalResourcesHours2: this.byId("idintreshrs2").getValue(),
					ZInternalResourcesHours3: this.byId("idintreshrs3").getValue(),
					ZInternalResourcesHours4: this.byId("idintreshrs4").getValue(),
					ZReplacingAsset: ZReplacingAsset,
					ZReplacingAssetDescription: this.byId("idrepastdesc").getValue(),
					ZReplacingAssetSerialNumb: this.byId("idrepastser").getValue(),
					ZReplacingAssetCostCenter: this.byId("idrepastcc").getValue(),
					ZReplacingAssetCerNumber: this.byId("idrepastcer").getValue()
				};

				var data = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
				var odatamodel = new ODataModel(data);
				if (this.ZCerId === "0") {
					odatamodel.create("/CER_MASTERSet", submitEntrywithbudgetyes, {
						success: function(odata, resp) {
							this._refresh();
							MessageToast.show("CER Form Successfully Submitted");
							//master._opencers();
							this.oRouter.navTo("Main", {}, true);
						}.bind(this),
						error: function(msg) {

							MessageToast.show("Failed:Creation:" + msg);
						}
					}); // end of odatamodel.create

				} else {
					var eset1 = "/CER_MASTERSet(ZCerId='" + this.ZCerId + "')";
					odatamodel.update(eset1, submitEntrywithbudgetyes, {
						success: function(odata, resp) {
							this._refresh();
							MessageToast.show("CER Form Successfully Submitted");

							this.oRouter.navTo("Main", {}, true);
						}.bind(this),
						error: function(msg) {

							MessageToast.show("Failed:Creation:" + msg);
						}
					}); // end of odatamodel.create

				}

			} // end of if 

			/* START OF IF-ELSE FOR SUBMITTED BUDGET IS YES and REPLACE ASSET NO*/

			if (mandatoryvalues.submittedbudget === 0 && mandatoryvalues.costcenter !== "" && mandatoryvalues.projectdd !== "" &&
				mandatoryvalues.ZEstimatedStartDate !== "" && mandatoryvalues.ZEstimatedFinishDate !== "" &&
				mandatoryvalues.manfacturinggroup !== -1 && mandatoryvalues.software !== -1 && mandatoryvalues.busjust !== "" && mandatoryvalues.assetenviron !==
				"" && mandatoryvalues.replcurast === 1) {

				var submitEntrywithbudgetyesandreplaceassetno = {
					ZCerId: this.ZCerId,
					ZCerStatus: "2",
					ZCompanyCode: this.byId("compdd").getSelectedKey(),
					ZBudgeted: ZBudgeted,
					ZCostCenter: this.byId("ccenterdd").getSelectedKey(),
					ZProjectId: this.byId("projectdd").getSelectedKey(),
					ZProjectDescription: this.byId("projectdd").getSelectedItem().getText().split(":")[1],

					ZAssetClass: this.byId("astdesc").getValue().split("-")[0].trim(),

					ZBudgetedAmount: this.byId("bdgamnt").getValue(),

					ZUsefulLifeYear: this.byId("usefullife").getValue(),
					//	ZEstimatedStartDate: new Date(this.byId("idestdate1").getValue()).toJSON().split("Z")[0],
					//	ZEstimatedFinishDate: new Date(this.byId("idfinishdate1").getValue()).toJSON().split("Z")[0],
					ZEstimatedStartDate: this.formatter.dateTimebackend2(this.byId("idestdate1").getValue()),
					ZEstimatedFinishDate: this.formatter.dateTimebackend2(this.byId("idfinishdate1").getValue()),
					ZManufacturingEquipment: ZManufacturingEquipment,
					//		ZSoftware: ZSoftware,
					ZBusinessJustification: this.byId("idbusjust").getValue(),
					ZEnvironmentConsideration: this.byId("aecdd").getSelectedKey(),
					ZNonCapexDescription1: this.byId("noncapexpdescdd1").getSelectedKey(),
					ZNonCapexDescription2: this.byId("noncapexpdescdd2").getSelectedKey(),
					ZNonCapexDescription3: this.byId("noncapexpdescdd3").getValue(),
					ZNonCapexDescription4: this.byId("noncapexpdescdd4").getValue(),
					ZNonCapexDetails1: this.byId("iddetails1").getValue(),
					ZNonCapexDetails2: this.byId("iddetails2").getValue(),
					ZNonCapexDetails3: this.byId("iddetails3").getValue(),
					ZNonCapexDetails4: this.byId("iddetails4").getValue(),
					ZNonCapexExpense1: this.byId("idexp1").getValue(),
					ZNonCapexExpense2: this.byId("idexp2").getValue(),
					ZNonCapexExpense3: this.byId("idexp3").getValue(),
					ZNonCapexExpense4: this.byId("idexp4").getValue(),
					ZInternalResourcesGroup1: this.byId("idinternalgrp1").getValue(),
					ZInternalResourcesGroup2: this.byId("idinternalgrp2").getValue(),
					ZInternalResourcesGroup3: this.byId("idinternalgrp3").getValue(),
					ZInternalResourcesGroup4: this.byId("idinternalgrp4").getValue(),
					ZInternalResourcesDetails1: this.byId("idinternaldtls1").getValue(),
					ZInternalResourcesDetails2: this.byId("idinternaldtls2").getValue(),
					ZInternalResourcesDetails3: this.byId("idinternaldtls3").getValue(),
					ZInternalResourcesDetails4: this.byId("idinternaldtls4").getValue(),
					ZInternalResourcesHours1: this.byId("idintreshrs1").getValue(),
					ZInternalResourcesHours2: this.byId("idintreshrs2").getValue(),
					ZInternalResourcesHours3: this.byId("idintreshrs3").getValue(),
					ZInternalResourcesHours4: this.byId("idintreshrs4").getValue(),
					ZReplacingAsset: ZReplacingAsset,
					ZReplacingAssetDescription: this.byId("idrepastdesc").getValue(),
					ZReplacingAssetSerialNumb: this.byId("idrepastser").getValue(),
					ZReplacingAssetCostCenter: this.byId("idrepastcc").getValue(),
					ZReplacingAssetCerNumber: this.byId("idrepastcer").getValue()
				};

				var datawithbudgetyesandreplaceassetno = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
				var odatamodelwithbudgetyesandreplaceassetno = new ODataModel(datawithbudgetyesandreplaceassetno);
				if (this.ZCerId === "0") {
					odatamodelwithbudgetyesandreplaceassetno.create("/CER_MASTERSet", submitEntrywithbudgetyesandreplaceassetno, {
						success: function(odata, resp) {
							this._refresh();
							MessageToast.show("CER Form Successfully Submitted");

							this.oRouter.navTo("Main", {}, true);
						}.bind(this),
						error: function(msg) {

							MessageToast.show("Failed:Creation:" + msg);
						}

					}); // end of odatamodel.create

				} else {
					var eset2 = "/CER_MASTERSet(ZCerId='" + this.ZCerId + "')";
					odatamodelwithbudgetyesandreplaceassetno.update(eset2, submitEntrywithbudgetyesandreplaceassetno, {
						success: function(odata, resp) {
							this._refresh();
							MessageToast.show("CER Form Successfully Submitted");

							this.oRouter.navTo("Main", {}, true);
						}.bind(this),
						error: function(msg) {

							MessageToast.show("Failed:Creation:" + msg);
						}

					}); // end of odatamodel.create
				}
			} // end of if 

			/* START OF IF-ELSE FOR SUBMITTED BUDGET IS NO*/
			if (mandatoryvalues.submittedbudget === 1 && mandatoryvalues.costcenter !== "" && mandatoryvalues.assetdropdown !== "" &&
				mandatoryvalues.bdgamnt !== "" && mandatoryvalues.ZEstimatedStartDate !== "" &&
				mandatoryvalues.ZEstimatedFinishDate !== "" && mandatoryvalues.manfacturinggroup !== -1 && mandatoryvalues.software !== -1 &&
				mandatoryvalues.busjust !== "" && mandatoryvalues.assetenviron !==
				"" && mandatoryvalues.replcurast !== -1 && mandatoryvalues.repldesc !== "" && mandatoryvalues.replcc !== "") {

				var submitEntry = {
					ZCerId: this.ZCerId,
					ZCerStatus: "2",
					ZCompanyCode: this.byId("compdd").getSelectedKey(),
					ZBudgeted: ZBudgeted,
					ZCostCenter: this.byId("ccenterdd").getSelectedKey(),
					ZProjectDescription: this.byId("projectdesc").getValue(),

					//	ZAssetClass: this.byId("astdescdd").getSelectedKey().split("-")[0].trim(),
					ZAssetClass: this.byId("astdescdd").getSelectedKey(),
					ZBudgetedAmount: this.byId("bdgamnt").getValue(),
					ZUsefulLifeYear: this.byId("usefullife").getValue(),
					//	ZEstimatedStartDate: new Date(this.byId("idestdate1").getValue()).toJSON().split("Z")[0],
					//	ZEstimatedFinishDate: new Date(this.byId("idfinishdate1").getValue()).toJSON().split("Z")[0],
					ZEstimatedStartDate: this.formatter.dateTimebackend2(this.byId("idestdate1").getValue()),
					ZEstimatedFinishDate: this.formatter.dateTimebackend2(this.byId("idfinishdate1").getValue()),
					ZManufacturingEquipment: ZManufacturingEquipment,
					//		ZSoftware: ZSoftware,
					ZBusinessJustification: this.byId("idbusjust").getValue(),
					ZEnvironmentConsideration: this.byId("aecdd").getSelectedKey(),
					ZNonCapexDescription1: this.byId("noncapexpdescdd1").getSelectedKey(),
					ZNonCapexDescription2: this.byId("noncapexpdescdd2").getSelectedKey(),
					ZNonCapexDescription3: this.byId("noncapexpdescdd3").getValue(),
					ZNonCapexDescription4: this.byId("noncapexpdescdd4").getValue(),
					ZNonCapexDetails1: this.byId("iddetails1").getValue(),
					ZNonCapexDetails2: this.byId("iddetails2").getValue(),
					ZNonCapexDetails3: this.byId("iddetails3").getValue(),
					ZNonCapexDetails4: this.byId("iddetails4").getValue(),
					ZNonCapexExpense1: this.byId("idexp1").getValue(),
					ZNonCapexExpense2: this.byId("idexp2").getValue(),
					ZNonCapexExpense3: this.byId("idexp3").getValue(),
					ZNonCapexExpense4: this.byId("idexp4").getValue(),
					ZInternalResourcesGroup1: this.byId("idinternalgrp1").getValue(),
					ZInternalResourcesGroup2: this.byId("idinternalgrp2").getValue(),
					ZInternalResourcesGroup3: this.byId("idinternalgrp3").getValue(),
					ZInternalResourcesGroup4: this.byId("idinternalgrp4").getValue(),
					ZInternalResourcesDetails1: this.byId("idinternaldtls1").getValue(),
					ZInternalResourcesDetails2: this.byId("idinternaldtls2").getValue(),
					ZInternalResourcesDetails3: this.byId("idinternaldtls3").getValue(),
					ZInternalResourcesDetails4: this.byId("idinternaldtls4").getValue(),
					ZInternalResourcesHours1: this.byId("idintreshrs1").getValue(),
					ZInternalResourcesHours2: this.byId("idintreshrs2").getValue(),
					ZInternalResourcesHours3: this.byId("idintreshrs3").getValue(),
					ZInternalResourcesHours4: this.byId("idintreshrs4").getValue(),
					ZReplacingAsset: ZReplacingAsset,
					ZReplacingAssetDescription: this.byId("idrepastdesc").getValue(),
					ZReplacingAssetSerialNumb: this.byId("idrepastser").getValue(),
					ZReplacingAssetCostCenter: this.byId("idrepastcc").getValue(),
					ZReplacingAssetCerNumber: this.byId("idrepastcer").getValue()
				};

				var data1 = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
				var odatamodel1 = new ODataModel(data1);
				if (this.ZCerId === "0") {
					odatamodel1.create("/CER_MASTERSet", submitEntry, {
						success: function(odata, resp) {

							this._refresh();
							MessageToast.show("CER Form Successfully Submitted");

							this.oRouter.navTo("Main", {}, true);
						}.bind(this),
						error: function(msg) {

							MessageToast.show("Failed:Creation:" + msg);
						}

					}); // end of odatamodel.create
				} else {
					var eset3 = "/CER_MASTERSet(ZCerId='" + this.ZCerId + "')";
					odatamodel1.update(eset3, submitEntry, {
						success: function(odata, resp) {
							this._refresh();
							MessageToast.show("CER Form Successfully Submitted");

							this.oRouter.navTo("Main", {}, true);
						}.bind(this),
						error: function(msg) {

							MessageToast.show("Failed:Creation:" + msg);
						}

					}); // end of odatamodel.create
				}
			} // end of if 

			/* START OF IF-ELSE FOR SUBMITTED BUDGET IS NO*/
			if (mandatoryvalues.submittedbudget === 1 && mandatoryvalues.costcenter !== "" && mandatoryvalues.assetdropdown !== "" &&
				mandatoryvalues.bdgamnt !== "" && mandatoryvalues.ZEstimatedStartDate !== "" &&
				mandatoryvalues.ZEstimatedFinishDate !== "" && mandatoryvalues.manfacturinggroup !== -1 && mandatoryvalues.software !== -1 &&
				mandatoryvalues.busjust !== "" && mandatoryvalues.assetenviron !==
				"" && mandatoryvalues.replcurast === 1) {

				var submitEntrywithbudgetno = {
					ZCerId: this.ZCerId,
					ZCerStatus: "2",
					ZCompanyCode: this.byId("compdd").getSelectedKey(),
					ZBudgeted: ZBudgeted,
					ZCostCenter: this.byId("ccenterdd").getSelectedKey(),
					ZProjectDescription: this.byId("projectdesc").getValue(),

					ZAssetClass: this.byId("astdescdd").getSelectedKey().split("-")[0].trim(),
					ZBudgetedAmount: this.byId("bdgamnt").getValue(),
					ZUsefulLifeYear: this.byId("usefullife").getValue(),
					//	ZEstimatedStartDate: new Date(this.byId("idestdate1").getValue()).toJSON().split("Z")[0],
					//	ZEstimatedFinishDate: new Date(this.byId("idfinishdate1").getValue()).toJSON().split("Z")[0],
					ZEstimatedStartDate: this.formatter.dateTimebackend2(this.byId("idestdate1").getValue()),
					ZEstimatedFinishDate: this.formatter.dateTimebackend2(this.byId("idfinishdate1").getValue()),
					ZManufacturingEquipment: ZManufacturingEquipment,
					//	ZSoftware: ZSoftware,
					ZBusinessJustification: this.byId("idbusjust").getValue(),
					ZEnvironmentConsideration: this.byId("aecdd").getSelectedKey(),
					ZNonCapexDescription1: this.byId("noncapexpdescdd1").getSelectedKey(),
					ZNonCapexDescription2: this.byId("noncapexpdescdd2").getSelectedKey(),
					ZNonCapexDescription3: this.byId("noncapexpdescdd3").getValue(),
					ZNonCapexDescription4: this.byId("noncapexpdescdd4").getValue(),
					ZNonCapexDetails1: this.byId("iddetails1").getValue(),
					ZNonCapexDetails2: this.byId("iddetails2").getValue(),
					ZNonCapexDetails3: this.byId("iddetails3").getValue(),
					ZNonCapexDetails4: this.byId("iddetails4").getValue(),
					ZNonCapexExpense1: this.byId("idexp1").getValue(),
					ZNonCapexExpense2: this.byId("idexp2").getValue(),
					ZNonCapexExpense3: this.byId("idexp3").getValue(),
					ZNonCapexExpense4: this.byId("idexp4").getValue(),
					ZInternalResourcesGroup1: this.byId("idinternalgrp1").getValue(),
					ZInternalResourcesGroup2: this.byId("idinternalgrp2").getValue(),
					ZInternalResourcesGroup3: this.byId("idinternalgrp3").getValue(),
					ZInternalResourcesGroup4: this.byId("idinternalgrp4").getValue(),
					ZInternalResourcesDetails1: this.byId("idinternaldtls1").getValue(),
					ZInternalResourcesDetails2: this.byId("idinternaldtls2").getValue(),
					ZInternalResourcesDetails3: this.byId("idinternaldtls3").getValue(),
					ZInternalResourcesDetails4: this.byId("idinternaldtls4").getValue(),
					ZInternalResourcesHours1: this.byId("idintreshrs1").getValue(),
					ZInternalResourcesHours2: this.byId("idintreshrs2").getValue(),
					ZInternalResourcesHours3: this.byId("idintreshrs3").getValue(),
					ZInternalResourcesHours4: this.byId("idintreshrs4").getValue(),
					ZReplacingAsset: ZReplacingAsset,
					ZReplacingAssetDescription: this.byId("idrepastdesc").getValue(),
					ZReplacingAssetSerialNumb: this.byId("idrepastser").getValue(),
					ZReplacingAssetCostCenter: this.byId("idrepastcc").getValue(),
					ZReplacingAssetCerNumber: this.byId("idrepastcer").getValue()
				};

				var datasubmitEntrywithbudgetno = "/sap/opu/odata/sap/ZCER_PROJECT_SRV/";
				var odatamodelsubmitEntrywithbudgetno = new ODataModel(datasubmitEntrywithbudgetno);
				if (this.ZCerId === "0") {
					odatamodelsubmitEntrywithbudgetno.create("/CER_MASTERSet", submitEntrywithbudgetno, {
						success: function(odata, resp) {

							this._refresh();
							MessageToast.show("CER Form Successfully Submitted");

							this.oRouter.navTo("Main", {}, true);
						}.bind(this),
						error: function(msg) {

							MessageToast.show("Failed:Creation:" + msg);
						}

					}); // end of odatamodel.create
				} else {

					var eset4 = "/CER_MASTERSet(ZCerId='" + this.ZCerId + "')";
					odatamodelsubmitEntrywithbudgetno.update(eset4, submitEntrywithbudgetno, {
						success: function(odata, resp) {
							this._refresh();
							MessageToast.show("CER Form Successfully Submitted");

							this.oRouter.navTo("Main", {}, true);
						}.bind(this),
						error: function(msg) {

							MessageToast.show("Failed:Creation:" + msg);
						}

					}); // end of odatamodel.create

				}
			} // end of if 

		}, // end of _submitcer
		_onlynumbers: function(oevent) {

				oevent.getSource().setValue(oevent.getSource().getValue().replace(/[^\d]/g, ""));

			} // end of _onlynumbers

	});
}, /* bExport= */ true);