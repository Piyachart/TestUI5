sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/Filter",
   "sap/ui/model/FilterOperator",
   "sap/ui/model/Sorter"
], function (Controller, Filter, FilterOperator, Sorter) {
	"use strict";
	
	return Controller.extend("sap.pts.customercca.controller.CustomerList",{
		
		onInit : function(){
			
			this._negativeFilter = new Filter({
				path: "outstanding",
				operator: FilterOperator.LT,
				value1: "0"
			});
			
			this._currencyGroup = new Sorter("currency",false,true);
			
		},
		
		onPress : function(oControlEvent){
			
			var oContext  = oControlEvent.getSource().getBindingContext();
			var oModel    = this.getOwnerComponent().getModel();
			var sPath     = oContext.getPath().substr(11);
			var sCustomer = oContext.getProperty("customer");
			var oRouter   = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("CustomerDetail",{
				ID: sPath,
				Customer: sCustomer
			});
		},
		
		onFilterNegative : function(oEvent){
			
			var oTable  = this.getView().byId("CustomerTable");
			if (oEvent.getParameter("selected")){
				oTable.getBinding("items").filter(this._negativeFilter);
			}else{
				oTable.getBinding("items").filter(null);
			}
			
		},
		onSortGroupCurrency : function(oEvent){
			
			var oTable  = this.getView().byId("CustomerTable");
			if (oEvent.getParameter("pressed")){
				oTable.getBinding("items").sort(this._currencyGroup);
			}else{
				oTable.getBinding("items").sort(null);
			}
			
		}
		
	});

});