
jQuery(function(){
	//declare & set global script variables	 
	var RIGHTNOW = new Date();
	var URL4CAPS = '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx';
	
	// Global variable to set display format for all task board dates.	
	//Exploring way to tie this directly to Site's regional settings and possibly user's regional settings.
	var REGIONALSHORTDATEFORMAT = "MM-dd-yyyy";
	var DATEFORMAT4JQUERYUI = "mm-dd-yy";
	
	function capsCall(data, async, callback)
	{
		$.ajax({url: URL4CAPS, data: data, dataType: 'json', async: async, cache: false,
		    success: function (json) {
		      callback.call(json);
		    }
		});	
	} 
	
	var BoardViewModel = function(config){
		var self=this;
		
		self.boardColumns = ko.observableArray(config.boardColumns);
		self.boardItems = ko.observableArray(config.boardItems);
	};
	
	
	//Load Data from Server
	var boardConfig = { boardColumns: [], boardItems: [], cwVariables: [] };
	var boardData = {RequestType: 'BatchRequest', ConfigFileLocation: '%SiteURL%/board/batchrequest.xml', XsltLocation: '%SiteURL%/board/batchrequest.xslt', OutputType: 'json'};
	capsCall(boardData, true, function(){
		
		$.each( this.NewDataSet.Columns.Column, function( key, val ) {
    		boardConfig.boardColumns.push(val);
  		});
  		
		$.each( this.NewDataSet.Items.Item, function( key, val ) {
  		boardConfig.boardItems.push({ title: val.Title, item: val });
		});
 		

		$.each( this.NewDataSet.CWVariables, function( key, val ) {
    		boardConfig.cwVariables.push({variable: key, value: val});
  		});
		//console.log(boardConfig);	
		ko.applyBindings(new BoardViewModel(boardConfig));
		$("div#boardData").show();
	});	
				
	
		

});


