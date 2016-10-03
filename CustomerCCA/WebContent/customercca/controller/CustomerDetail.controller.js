sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";
	
	return Controller.extend("sap.pts.customercca.controller.CustomerDetail",{
		
		onInit: function(){
			
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("CustomerDetail").attachPatternMatched(this._onDetailMatched, this);
			
		},
		_onDetailMatched: function(oEvent){
			
			var sObjectPath= "/customers/" + oEvent.getParameter("arguments").ID;
			var oView = this.getView();
			oView.bindElement(sObjectPath);
			
		},
		onNavPress: function(){
			
			var oHistory=History.getInstance();
			var sPreviousHash=oHistory.getPreviousHash();
			
			if (sPreviousHash!==undefined){
				window.history.go(-1);
			} 
			else {
				this._oRouter.navTo("CustomerList");
			}
			
		},
		
	});

});