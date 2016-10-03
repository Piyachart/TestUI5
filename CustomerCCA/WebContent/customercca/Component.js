sap.ui.define([ "sap/ui/core/UIComponent",
		"sap/ui/model/resource/ResourceModel", "sap/ui/model/json/JSONModel",
		"sap/ui/Device" ], function(UIComponent, ResourceModel, JSONModel,
		Device) {
	"use strict";

	return UIComponent.extend("sap.pts.customercca.Component", {

		metadata : {
			rootView : "sap.pts.customercca.view.App",
			routing : {

				config : {
					routerClass : "sap.m.routing.Router",
					viewType : "XML",
					viewPath : "sap.pts.customercca.view",
					controlId : "app",
					controlAggregation : "pages",
				},
				routes : [ {
					pattern : "",
					name : "CustomerList",
					target : "CustomerList"
				}, {
					pattern : "CustomerDetail/{ID}/:Customer:",
					name : "CustomerDetail",
					target : "CustomerDetail"
				} ],
				targets : {
					CustomerList : {
						viewName : "CustomerList",
						viewLevel : "1"
					},
					CustomerDetail : {
						viewName : "CustomerDetail",
						viewLevel : "2"
					}
				}

			}
		},

		init : function() {

			UIComponent.prototype.init.apply(this, arguments);

			var oi18n = new ResourceModel({
				bundleName : "sap.pts.customercca.i18n.i18n"
			});

			this.setModel(oi18n, "i18n");

			var oDevice = new JSONModel(Device);
			oDevice.setDefaultBindingMode("OneWay");

			this.setModel(oDevice, "Device");

			var that = this;
			sap.ui.core.BusyIndicator.show(0);

			var oModel = new JSONModel("http://ptsides.phoenix-works.com:8000/customercca/handler?sap-client=800");
			//var oModel = new JSONModel("customercca/model/data.json");

			oModel.attachRequestCompleted(function() {
				sap.ui.core.BusyIndicator.hide();
				that.setModel(oModel);
				that.refresh();
			});
			
			//Test Updaate

			/*
			 * jQuery.ajax({ url:
			 * "http://ptsides.phoenix-works.com:8000/customercca/handler?sap-client=800",
			 * type: "POST", success: function(response){
			 * that._loadSuccess(response); }, error: function(){
			 * sap.ui.core.BusyIndicator.hide(); alert("Error when Requesting
			 * Data from SAP"); } });
			 */

			this.getRouter().initialize();
		},
		_loadSuccess : function(response) {
			sap.ui.core.BusyIndicator.hide();
			var oModel = new JSONModel();
			oModel.setJSON(response);
			this.setModel(oModel);
		}

	});

});