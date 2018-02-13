//declare & set global script variables	 
var RIGHTNOW = new Date();
var URL4CAPS = '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx';

// Global variable to set display format for all task board dates.	
//Exploring way to tie this directly to Site's regional settings and possibly user's regional settings.
var REGIONALSHORTDATEFORMAT = "MM-dd-yyyy";
var DATEFORMAT4JQUERYUI = "mm-dd-yy";

//declare arrays
var boardColumns = new Array();
var boardRows = new Array();
var boardItems = new Array();
var itemTitles = new Array();
var CWVariables = new Array();
var siteUsers = new Array();

//using good ole jQuery to populate the board's columns and items.
$(document).ready(function()
{		    
	buildTheBoard();
});
function buildTheBoard()
{
	var data = {RequestType: 'BatchRequest', ConfigFileLocation: '%SiteURL%/board/batchrequest.xml', XsltLocation: '%SiteURL%/board/batchrequest.xslt', OutputType: 'json'};
	capsCall(data, function(){
		boardColumns = this.NewDataSet.Columns;
		boardItems = this.NewDataSet.Items;
  		CWVariables = this.NewDataSet.CWVariables;
		addColumns(boardColumns); 
		$("#boardData").show();	
	});
}
function addColumns(columns)
{
  var colHTML="";
  
	for (var i = 0; i < boardColumns.Column.length; i++) {
		items = addItems(boardColumns.Column[i].ID);		    
		$("#boardData").append("<div class='boardColumn' id='col"+boardColumns.Column[i].ID+"'> \
								<div class='colTitle' id='colTitle"+boardColumns.Column[i].ID+"'>"+boardColumns.Column[i].Title+"</div> \
								<div class='colItems' id='colData"+boardColumns.Column[i].ID+"'>"+items+"</div> \
							<div>");
	}
	$("div.boardColumn").css({width:(100/boardColumns.Column.length)-3+'%'});
}
function addItems(column)
{
	var itemHTML = "";
	for (var i = 0; i < boardItems.Item.length; i++)
	{
		if(column == 	boardItems.Item[i].Status.ID){			    
			itemTitles.push(boardItems.Item[i].Title);
			itemHTML+=	"<div id='item"+boardItems.Item[i].ID+"' class='boardItem priority"+boardItems.Item[i].Priority.value+"'> \
							<div class='title'>"+boardItems.Item[i].Title+"</div> \
							<div class='assignedTo'>"+boardItems.Item[i].AssignedTo.value+"</div> \
						</div>"
		}
	}
	return itemHTML;
}
function capsCall(data, callback)
{
	$.ajax({url: URL4CAPS, data: data, dataType: 'json', cache: false,
	    success: function (json) {
	      callback.call(json);
	    }
	});	
}