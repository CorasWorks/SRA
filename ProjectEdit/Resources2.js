var SRAmonths = [1,2,3,4,5,6,7,8,9,10,11,12];
$(document).ready(function () {
	InitNumberFormat();
	$('#TabbedCostsForm .YearExpenseTargetTotal, #TabbedCostsForm .YearExpenseActualTotal, #TabbedCostsForm .YearCapitalTargetTotal, #TabbedCostsForm .YearCapitalActualTotal').autoNumeric('init', {aSign: '$', pSign: 'p', aPad: false, vMin: '-999999999'});
	$('#TabbedCostsForm').tabs();
	$("#ProCostsYear").tablesorter({
		headers: {
	      1: { sorter: "inputs" },
	      2: { sorter: "inputs" },
	      3: { sorter: "inputs" },
	      4: { sorter: "inputs" },
	      5: { sorter: "inputs" },
	      6: { sorter: "inputs" },
	      7: { sorter: "inputs" },
	      8: { sorter: "inputs" },
	      9: { sorter: "inputs" }
	    },
		sortList: [[1,0]],
		widthFixed: true,
		//widgets: ["filter"],
	});
	$("#ProCostsMonth").tablesorter({
		headers: {
	      1: { sorter: "inputs" },
	      2: { sorter: "inputs" },
	      3: { sorter: "inputs" },
	      4: { sorter: "inputs" },
	      5: { sorter: "inputs" },
	      6: { sorter: "inputs" },
	      7: { sorter: "inputs" },
	      8: { sorter: "inputs" }
	    },
		sortList: [[1,0],[2,0]],
		widthFixed: true,
		//widgets: ["filter"]
	});//.bind('filterEnd', function(e, filter){
	//	SetTotals();
	//});
	$( ".YearAdd" ).unbind();	
	$( ".YearAdd" ).button().click(function(event ) {
		event.preventDefault();
			var html = '';
			html = '<tr data-id="New" data-column="ExpenseTarget" Pending="true">';
			html += '<td style="vertical-align:middle"><img data-url="" title="Remove Year" class="PCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="'+removeimage +'"/></td>';
			html += '<td>'+$('#YearSelectDummy').html()+'</td>';			
			html += '<td class="ComfirmButton"><button class="YearDone" disabled="disabled">Confirm</button></td>';				    
			html += '<td></td>';
			html += '<td></td>';
			html += '<td></td>';
			//html += '<td><input disabled="disabled" class="FinanceNumber" type="text" data-column="CapitalActual" value="" /></td>';	
			html += '</tr>';		       
			$("#ProCostsYearBody").append(html);
			$('.YearDone').button();
			$( ".YearSelect" ).focus();
			$('html, body').animate({
			        scrollTop: $(document).height()
			    }, 'fast');
	});
	$( ".MonthAdd" ).unbind();	
	$( ".MonthAdd" ).button().click(function(event ) {
		event.preventDefault();
				var Mhtml = '';
				Mhtml += '<tr data-id="New" data-column="ExpenseTarget" Pending="true">';
				Mhtml += '<td style="vertical-align:middle"><img data-url="" title="Remove Month" class="MonthPCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="'+removeimage +'"/></td>';
				Mhtml += '<td class="YearSelectMain">'+$('#MonthYearSelectDummy').html()+'</td>';
				Mhtml += '<td>'+$('#MonthSelectDummy').html()+'</td>';
				Mhtml += '<td class="ComfirmButton"><button class="MonthDone" disabled="disabled">Confirm</button></td>';							    				
				Mhtml += '<td></td>';
				Mhtml += '<td></td>';
				Mhtml += '<td></td>';
				Mhtml += '</tr>';
				$("#ProCostsMonthBody").append(Mhtml);
				$('.MonthDone').button();				
				$( ".MonthYearSelect" ).focus();
				$('html, body').animate({
				        scrollTop: $(document).height()
				    }, 'fast');
	});	
	$( ".ProCostsSave" ).button({icons: {secondary: "ui-icon-circle-check"}}).click(function(event ) {
		event.preventDefault();
		$('#ResourcesReload').show();
		$('#ResourcesData').hide();	
	  	DataWriteStart();
	});
	$('#ProCostsMonthBody').on('change','.MonthYearSelect',function(){
		if($(this).parent().parent().find('.MonthSelect').val() != null){
			$(this).parent().parent().find('.MonthDone').button( "option", "disabled", false );
		}
	});
	$('#ProCostsMonthBody').on('change','.MonthSelect',function(){
		if($(this).parent().parent().find('.MonthYearSelect').val() != null){
			$(this).parent().parent().find('.MonthDone').button( "option", "disabled", false );
		}
	});	
	$('#ProCostsMonthBody').on('click','.MonthDone',function(event){
		event.preventDefault();
			//event.preventDefault();
			//var MonthCell = $(this).parent();
			//var YearCell = $(this).parent().parent().find('.YearSelectMain');
			var YearRowsCurrent =  $('#ProCostsMonthBody input[data-column="Year"]');
			var YearSelectCurrent = $(this).parent().parent().find('.MonthYearSelect').val();
			var MonthSelectCurrent = $(this).parent().parent().find('.MonthSelect').val();
			var InDisplayAlready = false;
			var YearRowsCurrent = $('#ProCostsMonthBody input[data-column="Year"][value="'+YearSelectCurrent+'"]').parent().parent();
			var MonthRowsCurrent = YearRowsCurrent.filter(function(index ) {
				return $(this).find('input[data-column="Month"]').val() == MonthSelectCurrent; 
				});
			if (MonthRowsCurrent.length != 0){
				InDisplayAlready = true;
			}
			if(!InDisplayAlready){
				//var Row =$(this).parent().siblings().find('input');
				//Row.each(function(index, item) {
				//	$(this).removeAttr('disabled');
				//});
				$(this).parent().parent().attr( 'Pending', false );
				var Mhtml = '';
				Mhtml += '<td style="vertical-align:middle"><img data-url="" title="Remove Month" class="MonthPCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="'+removeimage +'"/></td>';
				Mhtml += '<td><input class="FinanceNumber" type="text" data-column="Year" value="'+YearSelectCurrent +'" disabled="disabled" /></td>';
				Mhtml += '<td><input class="FinanceNumber" type="text" data-column="Month" value="'+MonthSelectCurrent +'" disabled="disabled" /></td>';
				Mhtml += '<td><input class="FinanceNumber" type="text" data-column="ExpenseTarget" value="" /></td>';
				Mhtml += '<td><input class="FinanceNumber" type="text" data-column="ExpenseActual" value="" /></td>';
				Mhtml += '<td><input class="FinanceNumber" type="text" data-column="CapitalTarget" value="" /></td>';
				Mhtml += '<td><input class="FinanceNumber" type="text" data-column="CapitalActual" value="" /></td>';
				$(this).parent().parent().html(Mhtml);
				//MonthCell.html('<input class="FinanceNumber" type="text" data-column="Month" value="'+MonthSelectCurrent +'" disabled="disabled" />');
				//YearCell.html('<input class="FinanceNumber" type="text" data-column="Year" value="'+YearSelectCurrent +'" disabled="disabled" />');
				if(YearRowsCurrent.length == 0){
					var html = '';
					html = '<tr data-id="New" data-column="ExpenseTarget">';
					html += '<td style="vertical-align:middle"><img data-url="" title="Remove Year" class="PCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="'+removeimage +'"/></td>';
					html += '<td><input class="FinanceNumber" type="text" data-column="Year" value="'+YearSelectCurrent +'" disabled="disabled" /></td>';					    
					html += '<td><input class="FinanceNumber" type="text" data-column="ExpenseTarget" value="" /></td>';
					html += '<td><input class="FinanceNumber" type="text" data-column="ExpenseActual" value="" /></td>';
					html += '<td><input class="FinanceNumber" type="text" data-column="CapitalTarget" value="" /></td>';
					html += '<td><input class="FinanceNumber" type="text" data-column="CapitalActual" value="" /></td>';	
					html += '</tr>';		       
					$("#ProCostsYearBody").append(html);
				}
				InitNumberFormat();
			UpdateTSTables();		
			}
			else{
				$("#StandardAlert").html('Month already in use!');
				$("#StandardAlert").dialog("open");			
			}
	});
		
	$('#ProCostsYearBody').on('change','.YearSelect',function(){
		$(this).parent().parent().find('.YearDone').button( "option", "disabled", false );
	});	
	$('#ProCostsYearBody').on('click','.YearDone',function(event){
		event.preventDefault();
			//event.preventDefault();
			var YearRowsCurrent =  $('#ProCostsYearBody input[data-column="Year"]');
			var YearSelectCurrent = $(this).parent().parent().find('.YearSelect').val();
			var InDisplayAlready = false;
			YearRowsCurrent.each(function(index, item) {
				if($(this).val() == YearSelectCurrent){InDisplayAlready = true;}
			});
			if(!InDisplayAlready){
				//var Row =$(this).parent().siblings().find('input');
				//Row.each(function(index, item) {
				//	$(this).removeAttr('disabled');
				//});
				//$(this).parent().html('<input class="FinanceNumber" type="text" data-column="Year" value="'+$(this).parent().find('.YearSelect').val()+'" disabled="disabled" />');
				$(this).parent().parent().attr( 'Pending', false );
				var html = '';
				html += '<td style="vertical-align:middle"><img data-url="" title="Remove Year" class="PCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="'+removeimage +'"/></td>';
				html += '<td><input class="FinanceNumber" type="text" data-column="Year" value="'+YearSelectCurrent +'" disabled="disabled" /></td>';					    
				html += '<td><input class="FinanceNumber" type="text" data-column="ExpenseTarget" value="" /></td>';
				html += '<td><input class="FinanceNumber" type="text" data-column="ExpenseActual" value="" /></td>';
				html += '<td><input class="FinanceNumber" type="text" data-column="CapitalTarget" value="" /></td>';
				html += '<td><input class="FinanceNumber" type="text" data-column="CapitalActual" value="" /></td>';	
				$(this).parent().parent().html(html);
				var Mhtml = '';
				$.each(SRAmonths ,function(Mindex, Mitem) {
					Mhtml += '<tr data-id="New" data-column="ExpenseTarget">';
					Mhtml += '<td style="vertical-align:middle"><img data-url="" title="Remove Month" class="MonthPCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="'+removeimage +'"/></td>';					
					Mhtml += '<td><input class="FinanceNumber" type="text" data-column="Year" value="'+YearSelectCurrent+'" disabled="disabled" /></td>';					    
					Mhtml += '<td><input class="FinanceNumber" type="text" data-column="Month" value="'+Mitem+'" disabled="disabled" /></td>';	
					Mhtml += '<td><input class="FinanceNumber" type="text" data-column="ExpenseTarget" value="" /></td>';
					Mhtml += '<td><input class="FinanceNumber" type="text" data-column="ExpenseActual" value="" /></td>';
					Mhtml += '<td><input class="FinanceNumber" type="text" data-column="CapitalTarget" value="" /></td>';
					Mhtml += '<td><input class="FinanceNumber" type="text" data-column="CapitalActual" value="" /></td>';
					Mhtml += '</tr>';		
				});
				$("#ProCostsMonthBody").append(Mhtml);
				InitNumberFormat();
			UpdateTSTables();		
			}
			else{
				$("#StandardAlert").html('Year already in use!');
				$("#StandardAlert").dialog("open");			
			}
	});	
	$('#ProCostsYear').on('keyup change','input',function(){
		if ($.isNumeric($(this).autoNumeric('get')) || $(this).autoNumeric('get')==''){
			var year = $(this).parent().siblings().find('input[data-column="Year"]').val();
			var YearRow = $('#ProCostsYear input[data-column="Year"][value="'+year+'"]').parent().parent();
			var CurrentChanges = $('#ProCostsMonth input[data-column="Year"][value="'+year+'"]').parent().parent();
			
			var ExpenseTargetRem = YearRow.find('input[data-column="ExpenseTarget"]').autoNumeric('get')%CurrentChanges.length;
			var ExpenseTarget = ((YearRow.find('input[data-column="ExpenseTarget"]').autoNumeric('get')/1)-ExpenseTargetRem)/CurrentChanges.length;
			var ExpenseActualRem = YearRow.find('input[data-column="ExpenseActual"]').autoNumeric('get')%CurrentChanges.length;
			var ExpenseActual = ((YearRow.find('input[data-column="ExpenseActual"]').autoNumeric('get')/1)-ExpenseActualRem)/CurrentChanges.length;
			var CapitalTargetRem = YearRow.find('input[data-column="CapitalTarget"]').autoNumeric('get')%CurrentChanges.length;
			var CapitalTarget = ((YearRow.find('input[data-column="CapitalTarget"]').autoNumeric('get')/1)-CapitalTargetRem)/CurrentChanges.length;		
			var CapitalActualRem = YearRow.find('input[data-column="CapitalActual"]').autoNumeric('get')%CurrentChanges.length;
			var CapitalActual = ((YearRow.find('input[data-column="CapitalActual"]').autoNumeric('get')/1)-CapitalActualRem)/CurrentChanges.length;
			CurrentChanges.each(function(index, item) {
				if(CurrentChanges.length == index + 1){
					$(this).find('input[data-column="ExpenseTarget"]').val(ExpenseTarget + ExpenseTargetRem);
					$(this).find('input[data-column="ExpenseActual"]').val(ExpenseActual + ExpenseActualRem);
					$(this).find('input[data-column="CapitalTarget"]').val(CapitalTarget + CapitalTargetRem);
					$(this).find('input[data-column="CapitalActual"]').val(CapitalActual + CapitalActualRem);
					}
				else{
					$(this).find('input[data-column="ExpenseTarget"]').val(ExpenseTarget);
					$(this).find('input[data-column="ExpenseActual"]').val(ExpenseActual);
					$(this).find('input[data-column="CapitalTarget"]').val(CapitalTarget);
					$(this).find('input[data-column="CapitalActual"]').val(CapitalActual);				
					}		
			});			
			$('.ProCostsSave').button( "option", "disabled", false );
			NotSavedCheck = true;
			SetTotals();
			}
		else{
		$(this).val('');
			$("#StandardAlert").html('Only numbers allowed!');
			$("#StandardAlert").dialog("open");	
		//alert('Only numbers allowed');
		}
	});
	$('#ProCostsMonth').on('keyup change','input',function(){
		if ($.isNumeric($(this).autoNumeric('get')) || $(this).autoNumeric('get')==''){
			var year = $(this).parent().siblings().find('input[data-column="Year"]').val();
			var YearRow = $('#ProCostsYear input[data-column="Year"][value="'+year+'"]').parent().parent();
			var CurrentChanges = $('#ProCostsMonth input[data-column="Year"][value="'+year+'"]').parent().parent();
			var ExpenseTarget = 0;
			var ExpenseActual = 0;
			var CapitalTarget = 0;
			var CapitalActual = 0;
			CurrentChanges.each(function(index, item) {
				ExpenseTarget += $(this).find('input[data-column="ExpenseTarget"]').autoNumeric('get')/1;
				ExpenseActual += $(this).find('input[data-column="ExpenseActual"]').autoNumeric('get')/1;
				CapitalTarget += $(this).find('input[data-column="CapitalTarget"]').autoNumeric('get')/1;
				CapitalActual += $(this).find('input[data-column="CapitalActual"]').autoNumeric('get')/1;		
			});
			YearRow.find('input[data-column="ExpenseTarget"]').val(ExpenseTarget);
			YearRow.find('input[data-column="ExpenseActual"]').val(ExpenseActual);
			YearRow.find('input[data-column="CapitalTarget"]').val(CapitalTarget);
			YearRow.find('input[data-column="CapitalActual"]').val(CapitalActual);
			
			$('.ProCostsSave').button( "option", "disabled", false );
			NotSavedCheck = true;
			SetTotals();
			}
		else{
		$(this).val('');
			$("#StandardAlert").html('Only numbers allowed!');
			$("#StandardAlert").dialog("open");
		//alert('Only numbers allowed');
		}	
	})

	$('#ProCostsYear').on('click','img.PCDeleteIcon',function(){
		var year = $(this).parent().siblings().find('input[data-column="Year"]').val();
		var MonthRows = $('#ProCostsMonthBody input[data-column="Year"][value="'+year+'"]').parent().parent();
		MonthRows.each(function(index, item) {
			$(this).remove();		
		});	
		$(this).parent().parent().remove();
		SetTotals();
		$('.ProCostsSave').button( "option", "disabled", false );
		NotSavedCheck = true;
		UpdateTSTables();
	})
	$('#ProCostsMonthBody').on('click','img.MonthPCDeleteIcon',function(){
		var year = $(this).parent().siblings().find('input[data-column="Year"]').val();
		var YearRow = $('#ProCostsYearBody input[data-column="Year"][value="'+year+'"]').parent().parent();
		var MonthRows = $('#ProCostsMonthBody input[data-column="Year"][value="'+year+'"]').parent().parent();
		if (MonthRows.length == 1){
			YearRow.remove();
		}
		$(this).parent().parent().remove();
		var MonthRowsAfterRemove = $('#ProCostsMonthBody input[data-column="Year"][value="'+year+'"]').parent().parent();
		var ExpenseTarget = 0;
		var ExpenseActual = 0;
		var CapitalTarget = 0;
		var CapitalActual = 0;
		MonthRowsAfterRemove.each(function(index, item) {
			ExpenseTarget += $(this).find('input[data-column="ExpenseTarget"]').autoNumeric('get')/1;
			ExpenseActual += $(this).find('input[data-column="ExpenseActual"]').autoNumeric('get')/1;
			CapitalTarget += $(this).find('input[data-column="CapitalTarget"]').autoNumeric('get')/1;
			CapitalActual += $(this).find('input[data-column="CapitalActual"]').autoNumeric('get')/1;		
		});
		YearRow.find('input[data-column="ExpenseTarget"]').val(ExpenseTarget);
		YearRow.find('input[data-column="ExpenseActual"]').val(ExpenseActual);
		YearRow.find('input[data-column="CapitalTarget"]').val(CapitalTarget);
		YearRow.find('input[data-column="CapitalActual"]').val(CapitalActual);
		
		SetTotals();		
		$('.ProCostsSave').button( "option", "disabled", false );
		NotSavedCheck = true;
		UpdateTSTables();
	});
	
});
function DataWriteStart()
{
	$.ajax({
		 type:'POST',
	     dataType:'json',
	     url:ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'GetListItems',
			ListTitle: 'Project Costs',
			TableName: 'ProjectCostLocal',
			OutputType : 'json'
		},
		success: function(json){
			if (json.NewDataSet.ProjectCostLocal.listitems['rs:data'].ItemCount == 0)
				{
					saveLocalData();
				}
			else if (json.NewDataSet.ProjectCostLocal.listitems['rs:data'].ItemCount == 1)
				{
					var batch = '<ows:Batch OnError="Return">';
					batch += '<Method ID="A1"><SetList>%Project Costs%</SetList><SetVar Name="ID">'+json.NewDataSet.ProjectCostLocal.listitems['rs:data']['z:row'].ows_ID+'</SetVar><SetVar Name="Cmd">Delete</SetVar>';
					batch +='</Method>';
					batch +='</ows:Batch>';
					ClearData(batch);
				}
			else{
					var batch = '<ows:Batch OnError="Return">';			
					$.each(json.NewDataSet.ProjectCostLocal.listitems['rs:data']['z:row'],function(index,item) {
						batch += '<Method ID="A'+index+'"><SetList>%Project Costs%</SetList><SetVar Name="ID">'+item.ows_ID+'</SetVar><SetVar Name="Cmd">Delete</SetVar>';
						batch +='</Method>';
					});
					batch +='</ows:Batch>';
					ClearData(batch);
				}				
		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}
	
	});
}
function ClearData(batch)
{		
	$.ajax({
		type: 'POST',
		url: ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'ProcessBatchData',
		 		ListTitle: 'Project Costs',
		 		SiteUrl: '%ISiteURL%',
				Batch: batch,
				OutputType: 'json' 
				},
		dataType: 'json',
		cache: false,
		async: true,
		success:function(json){
			saveLocalData();				
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	});

}

function saveLocalData()
{
	var batch = '<ows:Batch OnError="Return">';
	
	var NewYears = $('#ProCostsMonthBody tr[data-id="New"][Pending!=true]');
	 NewYears.each(function(index, item) {
	 		//batch += '<Method ID="'+index+Mindex+'"><SetList>%Project Costs%</SetList><SetVar Name="ID">'+RowThis.data('id')+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
			batch += '<Method ID="A'+index+'"><SetList>%Project Costs%</SetList><SetVar Name="ID">New</SetVar><SetVar Name="Cmd">Save</SetVar>';
			batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Title">'+$(this).find('input[data-column="Year"]').val()+'</SetVar>';
			batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Month">'+$(this).find('input[data-column="Month"]').val()+'</SetVar>';	
			batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#ExpenseTarget">'+$(this).find('input[data-column="ExpenseTarget"]').autoNumeric('get')+'</SetVar>';	
			batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#ExpenseActual">'+$(this).find('input[data-column="ExpenseActual"]').autoNumeric('get')+'</SetVar>';	
			batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#CapitalTarget">'+$(this).find('input[data-column="CapitalTarget"]').autoNumeric('get')+'</SetVar>';	
			batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#CapitalActual">'+$(this).find('input[data-column="CapitalActual"]').autoNumeric('get')+'</SetVar>';		
			batch +='</Method>';
	 	
	 });	
	batch +='</ows:Batch>';
	
//alert(batch);	
	$.ajax({
		type: 'POST',
		url: ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'ProcessBatchData',
		 		ListTitle: 'Project Costs',
		 		SiteUrl: '%ISiteURL%',
				Batch: batch,
				OutputType: 'json' 
				},
		dataType: 'json',
		cache: false,
		async: true,
		success:function(json){
			saveMainData();				
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	});
}

function saveMainData()
{
	var ExpenseTarget = 0;
	var ExpenseActual = 0;
	var CapitalTarget = 0;
	var CapitalActual = 0;
	var RootNewYears = $('#ProCostsYearBody tr[data-id="New"][Pending!=true]');
	RootNewYears.each(function(index, item) {
		ExpenseTarget += $(this).find('input[data-column="ExpenseTarget"]').autoNumeric('get')/1;
		ExpenseActual += $(this).find('input[data-column="ExpenseActual"]').autoNumeric('get')/1;
		CapitalTarget += $(this).find('input[data-column="CapitalTarget"]').autoNumeric('get')/1;
		CapitalActual += $(this).find('input[data-column="CapitalActual"]').autoNumeric('get')/1;	
	});
	var Rootbatch = '<ows:Batch OnError="Return">';
	Rootbatch += '<Method ID="A1"><SetList>%Projects%</SetList><SetVar Name="ID">'+ProjectID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
	//Rootbatch += '<SetVar Name="urn:schemas-microsoft-com:office:office#PCFinancialEntryType">'+$('#PCFinancialEntryTypeSelecttBox').val()+'</SetVar>';	
	Rootbatch += '<SetVar Name="urn:schemas-microsoft-com:office:office#ResourcesExpenseTargeted">'+ExpenseTarget+'</SetVar>';	
	Rootbatch += '<SetVar Name="urn:schemas-microsoft-com:office:office#ResourcesExpenseActual">'+ExpenseActual+'</SetVar>';	
	Rootbatch += '<SetVar Name="urn:schemas-microsoft-com:office:office#ResourcesCapitalTargeted">'+CapitalTarget+'</SetVar>';	
	Rootbatch += '<SetVar Name="urn:schemas-microsoft-com:office:office#ResourcesCapitalActual">'+CapitalActual+'</SetVar>';		
	Rootbatch +='</Method>';
	Rootbatch +='</ows:Batch>';
	
//alert(Rootbatch);
	$.ajax({
		type: 'POST',
		url: ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'ProcessBatchData',
		 		ListTitle: 'Projects',
		 		SiteUrl: '[SRA Root]',
				Batch: Rootbatch,
				OutputType: 'json' 
				},
		dataType: 'json',
		cache: false,
		async: true,
		success:function(json){
			NotSavedCheck = false;
			$('#Resources').html(LoaderHTML);
			if(NotSavedCloseCheck){CloseEditMain();}
			ResourcesRender();				
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	});
}
function SetTotals(){
			var YearExpenseTargetTotal= 0;
			$('#ProCostsMonthBody input[data-column="ExpenseTarget"]').each(function(index, item) {
				YearExpenseTargetTotal+= $(this).autoNumeric('get')/1;		
			});
			var YearExpenseActualTotal= 0;
			$('#ProCostsMonthBody input[data-column="ExpenseActual"]').each(function(index, item) {
				YearExpenseActualTotal+= $(this).autoNumeric('get')/1;		
			});
			var YearCapitalTargetTotal= 0;
			$('#ProCostsMonthBody input[data-column="CapitalTarget"]').each(function(index, item) {
				YearCapitalTargetTotal+= $(this).autoNumeric('get')/1;		
			});
			var YearCapitalActualTotal= 0;
			$('#ProCostsMonthBody input[data-column="CapitalActual"]').each(function(index, item) {
				YearCapitalActualTotal+= $(this).autoNumeric('get')/1;		
			});
			$('.YearExpenseTargetTotal').html(YearExpenseTargetTotal);			
			$('.YearCapitalActualTotal').html(YearCapitalActualTotal);			
			$('.YearCapitalTargetTotal').html(YearCapitalTargetTotal);
			$('.YearExpenseActualTotal').html(YearExpenseActualTotal);
			UpdateNumberFormat();
}
function UpdateTSTables(){
			$("#ProCostsYear").trigger("update");
			$("#ProCostsMonth").trigger("update");	
}
function InitNumberFormat(){
	$('#TabbedCostsForm input[data-column="ExpenseTarget"], #TabbedCostsForm input[data-column="ExpenseActual"], #TabbedCostsForm input[data-column="CapitalTarget"], #TabbedCostsForm input[data-column="CapitalActual"]').autoNumeric('init', {aSign: '$', pSign: 'p', aPad: false, mDec:0, vMin: '-999999999'});
}
function UpdateNumberFormat(){
$('#TabbedCostsForm input[data-column="ExpenseTarget"], #TabbedCostsForm input[data-column="ExpenseActual"], #TabbedCostsForm input[data-column="CapitalTarget"], #TabbedCostsForm input[data-column="CapitalActual"]').autoNumeric('update');
$('#TabbedCostsForm .YearExpenseTargetTotal, #TabbedCostsForm .YearExpenseActualTotal, #TabbedCostsForm .YearCapitalTargetTotal, #TabbedCostsForm .YearCapitalActualTotal').autoNumeric('update'); 

}
