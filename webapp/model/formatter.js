sap.ui.define([
	"sap/ui/core/format/DateFormat"
], function(DateFormat) {
	"use strict";

	return {
		
		numonly : function(n1){
			
			return n1.replace(/[^\d]/g, "");
		},
		cerstat : function(cs){
			if(cs === "1"){ 
				return "Draft";
			}
			if(cs === "2"){ 
				return "Submitted";
			}
			if(cs === "4"){ 
				return "Finance Approved";
			}
			if(cs === "6"){ 
				return "Approver1 Approved";
			}
			
			
		}, 
			dateTimebackend: function(date) {
			//2021-03-02
			if (date !== undefined) {
				
				var oDateFormat = DateFormat.getDateInstance({
					scale: "medium",
				
					pattern: "yyyy-MM-dd"
				});
				var subFromDate = oDateFormat.format(new Date(date));
			
				return subFromDate;
			} else {
				return "";
			}

		},
			dateTimebackend2: function(date) {
			//2021-03-02
			if (date !== undefined) {
				
				var oDateFormat = DateFormat.getDateInstance({
					scale: "medium",
				
					pattern: "yyyy-MM-dd"
				});
				var subFromDate = oDateFormat.format(new Date(date));
			
				return subFromDate+"T18:30:00.000";
			} else {
				return "";
			}

		},
		dateTime: function(date) {
			
			if (date !== undefined) {
				//	var oLocale = sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();
				var oDateFormat = DateFormat.getDateInstance({
					scale: "medium",
					//pattern: "dd-MMM-yyyy"
					pattern: "MMM dd, yyyy"
				});
				var subFromDate = oDateFormat.format(new Date(date));
				// var oTimeFormat = DateFormat.getTimeInstance({
				// 	scale: "medium",
				// 	pattern: "HH:mm:ss"
				// });
			//	var subFromTime = oTimeFormat.format(new Date(date));
				// return subFromDate + "T" + subFromTime;
				return subFromDate;
			} else {
				return "";
			}

		},
			date2Excel: function(date) {
			
			if (date !== undefined) {
				//	var oLocale = sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();
				var oDateFormat = DateFormat.getDateInstance({
					scale: "medium",
					pattern: "dd-MMM-yyyy"
				//	pattern: "MMM dd, yyyy"
				});
				var subFromDate = oDateFormat.format(new Date(date));
				// var oTimeFormat = DateFormat.getTimeInstance({
				// 	scale: "medium",
				// 	pattern: "HH:mm:ss"
				// });
			//	var subFromTime = oTimeFormat.format(new Date(date));
				// return subFromDate + "T" + subFromTime;
				return subFromDate;
			} else {
				return "";
			}

		},
		dateTime2: function(date) {
				if (new Date(date) == "Invalid Date") {
				var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
					pattern: "dd.MM.yyyy, HH:mm:ss"
				});
				var validDate = dateFormat.parse(date);
				if (validDate == "" || validDate == null || validDate == "Invalid Date") {
					return null;
				} else {
					date = validDate;
				}
			}
			if (date !== undefined && date !== null) {
				var oLocale = sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();
				
				
				var oDateFormat = DateFormat.getDateInstance({
					scale: "medium",
					pattern: "MMM dd, yyyy",
                    UTC: true
				}, oLocale);

				var subFromDate = oDateFormat.format(new Date(date));
				/*var oTimeFormat = DateFormat.getTimeInstance({
					scale: "medium",
					pattern: "HH:mm:ss"
				}, oLocale);
				var subFromTime = oTimeFormat.format(new Date(date));
				return subFromDate + " " + subFromTime;*/
				return subFromDate;
			} else {
				return "";
			}

		
		},
		
		//MTest-CreateApp-Issue#234
		dateTime2ValueState: function(date) {
			if(date !==""){
				if(new Date() < new Date(date) ){
					return "None";
				} else {
					return "Error";
				}
				}
		
		},
		// This is used for Audit Logs and Tracking
		dateTime2log : function(date) {
				if (new Date(date) == "Invalid Date") {
				var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
					pattern: "dd.MM.yyyy, HH:mm:ss"
				});
				var validDate = dateFormat.parse(date);
				if (validDate == "" || validDate == null || validDate == "Invalid Date") {
					return null;
				} else {
					date = validDate;
				}
			}
			if (date !== undefined && date !== null) {
				var oLocale = sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();
				
				
				var oDateFormat = DateFormat.getDateInstance({
					scale: "medium",
					pattern: "dd-MMM-yyyy",
                    UTC: true
				}, oLocale);

				var subFromDate = oDateFormat.format(new Date(date));
				var oTimeFormat = DateFormat.getTimeInstance({
					scale: "medium",
					pattern: "HH:mm:ss",
                    UTC: true
				}, oLocale);
				var subFromTime = oTimeFormat.format(new Date(date));
				return subFromDate + "T" + subFromTime;
					  
			} else {
				return "";
			}

		
		},
		dateTime5: function(date,time) {
                                                if (new Date(date) === "Invalid Date") {
                                                var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                                                                pattern: "dd.MM.yyyy, HH:mm:ss"
                                                });
                                                var validDate = dateFormat.parse(date);
                                                if (validDate == "" || validDate == null || validDate == "Invalid Date") {
                                                                return null;
                                                } else {
                                                                date = validDate;
                                                }
                                }
                                if (date !== undefined && date !== null) {
                                                var oLocale = sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();
                                                
                                                
                                                var oDateFormat = DateFormat.getDateInstance({
                                                                scale: "medium",
                                                                pattern : "dd-MMM-yyyy",
                                                                UTC: true
                                                }, oLocale);
													// time = time.replace(/^PT/, '').replace(/S$/, '');
    									// 			time = time.replace('H', ':').replace('M', ':');
    									
                                                var subFromDate = oDateFormat.format(new Date(date));
                                                var oTimeFormat = DateFormat.getTimeInstance({
                                                                scale: "medium",
                                                                pattern: "HH:mm:ss",
                                                                UTC: true
                                                }, oLocale);
                                                var subFromTime = oTimeFormat.format(new Date(time.ms));
                                                return subFromDate + "T" + subFromTime;
                                                // return subFromDate;
                                } else {
                                                return "";
                                }

                
                                },
		oDataDateTimeFormatter: function(oDate) {
			
			if (new Date(oDate) === "Invalid Date") {
				var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
					pattern: "dd.MM.yyyy"
				});
				var validDate = dateFormat.parse(oDate);
				if (validDate === "" || validDate === null || validDate === "Invalid Date") {
					return null;
				} else {
					oDate = validDate;
				}
			}

			//	oDate = new Date(new Date(oDate).setHours(0, 0, 0, 0));
			var parsedDate = null;
			var parsedTime = null;
			if (oDate !== "" && oDate !== null && oDate !== undefined) {
				dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
					pattern: "yyyy-MM-dd, HH:mm:ss"
				});
				/*var timeFormat = sap.ui.core.format.DateFormat.getTimeInstance({
					pattern: "KK:mm:ss a"
			 	});*/
				//	var timeStr = timeFormat.format(new Date(DepartureTime.ms + TZOffsetMs));
				var dateObject = new Date(oDate);
				var timeZoneOffsetMs = new Date(oDate).getTimezoneOffset() * 60 * 1000;
				var dateStr = dateFormat.format(new Date(dateObject.getTime() + timeZoneOffsetMs));
				//	var timeStr = timeFormat.format(new Date(oDate.getTime() + timeZoneOffsetMs));
				parsedDate = new Date(dateFormat.parse(dateStr).getTime());

				var oDateFormat = DateFormat.getDateInstance({
					scale: "medium",
					pattern: "yyyy-MM-dd"
				});
				var subFromDate = oDateFormat.format(new Date(parsedDate));
				var oTimeFormat = DateFormat.getTimeInstance({
					scale: "medium",
					pattern: "HH:mm:ss"
				});
				var subFromTime = oTimeFormat.format(new Date(parsedDate));
				return subFromDate + "T" + subFromTime;
			} else {
				return "";
			}

			//	parsedTime = new Date(timeFormat.parse(oDate).getTime() + timeZoneOffsetMs);

			//	return parsedDate;
		}

	};
});