var SRAmonths = [1,2,3,4,5,6,7,8,9,10,11,12];
$(document).ready(function () {
	/*
	$("#ProCostsYear").tablesorter({
        textExtraction: function(node) { 
            return $(node).find('input').val();
        }, 
		sortList: [[1,0]],
	});
	
	$("#ProCostsMonth").tablesorter({
        textExtraction: function(node) { 
            return $(node).find('input').val();
        }, 	
		sortList: [[0,0]],
		widgets: ["filter"]
	});
	*/
	$( ".PCFinancialEntryType" ).button().click(function(event ) {
		event.preventDefault();
		$('#ResourcesReload').show();
		$('#ResourcesData').hide();
		DataWriteStart();
	});
	$( ".YearAdd" ).button().click(function(event ) {
		event.preventDefault();
		if ($('#YearSelecttBox').val() != ''){
			var YearRowsCurrent = $('#ProCostsYear input[data-column="Year"]');
			var InDisplayAlready = false;
			YearRowsCurrent.each(function(index, item) {
				if($(this).val() == $('#YearSelecttBox').val()){InDisplayAlready = true;}
			});
			if(!InDisplayAlready){
				var html = '';
				if (ProjectEntryType == 'Year'){ 
						html = '<tr data-id="New" data-column="ExpenseTarget">';
						html += '<td style="vertical-align:middle"><img data-url="" title="Remove Year" class="PCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="'+removeimage +'"/></td>';
						html += '<td><input class="FinanceNumber" type="text" data-column="Year" value="'+$('#YearSelecttBox').val()+'" disabled="disabled" /></td>';					    
						html += '<td><input class="FinanceNumber" type="text" data-column="ExpenseTarget" value="" /></td>';
						html += '<td><input class="FinanceNumber" type="text" data-column="ExpenseActual" value="" /></td>';
						html += '<td><input class="FinanceNumber" type="text" data-column="CapitalTarget" value="" /></td>';
						html += '<td><input class="FinanceNumber" type="text" data-column="CapitalActual" value="" /></td>';
						}
				else{
						html = '<tr data-id="New" data-column="ExpenseTarget">';
						html += '<td style="vertical-align:middle"><img data-url="" title="Remove Year" class="PCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="'+removeimage +'"/></td>';
						html += '<td><input class="FinanceNumber" type="text" data-column="Year" value="'+$('#YearSelecttBox').val()+'" disabled="disabled" /></td>';					    
						html += '<td><input class="FinanceNumber" type="text" data-column="ExpenseTarget" value="" disabled="disabled"/></td>';
						html += '<td><input class="FinanceNumber" type="text" data-column="ExpenseActual" value="" disabled="disabled"/></td>';
						html += '<td><input class="FinanceNumber" type="text" data-column="CapitalTarget" value="" disabled="disabled"/></td>';
						html += '<td><input class="FinanceNumber" type="text" data-column="CapitalActual" value="" disabled="disabled"/></td>';				
					}		
			html += '</tr>';		       
			$("#ProCostsYearBody").append(html);
			var Mhtml = '';
			$.each(SRAmonths ,function(Mindex, Mitem) {
				Mhtml += '<tr data-id="New" data-column="ExpenseTarget">';
				Mhtml += '<td><input class="FinanceNumber" type="text" data-column="Year" value="'+$('#YearSelecttBox').val()+'" disabled="disabled" /></td>';					    
				Mhtml += '<td><input class="FinanceNumber" type="text" data-column="Month" value="'+Mitem+'" disabled="disabled" /></td>';	
				Mhtml += '<td><input class="FinanceNumber" type="text" data-column="ExpenseTarget" value="" /></td>';
				Mhtml += '<td><input class="FinanceNumber" type="text" data-column="ExpenseActual" value="" /></td>';
				Mhtml += '<td><input class="FinanceNumber" type="text" data-column="CapitalTarget" value="" /></td>';
				Mhtml += '<td><input class="FinanceNumber" type="text" data-column="CapitalActual" value="" /></td>';
				Mhtml += '</tr>';		
			});
			$("#ProCostsMonthBody").append(Mhtml);
			}
			else{
			//alert('Year already in use');
			$("#StandardAlert").html('Year already in use!');
			$("#StandardAlert").dialog("open");			
			}
		}
		else{
			//alert('No Year Selected');
			$("#StandardAlert").html('No Year Selected!');
			$("#StandardAlert").dialog("open");			
		}    
	});
	$( ".ProCostsSave" ).button({icons: {secondary: "ui-icon-circle-check"}}).click(function(event ) {
		event.preventDefault();
		$('#ResourcesReload').show();
		$('#ResourcesData').hide();	
	  	DataWriteStart();
	});
	$('#ProCostsYear').on('keyup','input',function(){
		if ($.isNumeric($(this).val()) || $(this).val()==''){
			var year = $(this).parent().siblings().find('input[data-column="Year"]').val();
			var YearRow = $('#ProCostsYear input[data-column="Year"][value="'+year+'"]').parent().parent();
			var CurrentChanges = $('#ProCostsMonth input[data-column="Year"][value="'+year+'"]').parent().parent();
			var ExpenseTargetRem = YearRow.find('input[data-column="ExpenseTarget"]').val()%12;
			var ExpenseTarget = ((YearRow.find('input[data-column="ExpenseTarget"]').val()/1)-ExpenseTargetRem)/12;
			var ExpenseActualRem = YearRow.find('input[data-column="ExpenseActual"]').val()%12;
			var ExpenseActual = ((YearRow.find('input[data-column="ExpenseActual"]').val()/1)-ExpenseActualRem)/12;
			var CapitalTargetRem = YearRow.find('input[data-column="CapitalTarget"]').val()%12;
			var CapitalTarget = ((YearRow.find('input[data-column="CapitalTarget"]').val()/1)-CapitalTargetRem)/12;		
			var CapitalActualRem = YearRow.find('input[data-column="CapitalActual"]').val()%12;
			var CapitalActual = ((YearRow.find('input[data-column="CapitalActual"]').val()/1)-CapitalActualRem)/12;
			CurrentChanges.each(function(index, item) {
				if($(this).find('input[data-column="Month"]').val() == '12'){
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
	$('#ProCostsMonth').on('keyup','input',function(){
		if ($.isNumeric($(this).val()) || $(this).val()==''){
			var year = $(this).parent().siblings().find('input[data-column="Year"]').val();
			var YearRow = $('#ProCostsYear input[data-column="Year"][value="'+year+'"]').parent().parent();
			var CurrentChanges = $('#ProCostsMonth input[data-column="Year"][value="'+year+'"]').parent().parent();
			var ExpenseTarget = 0;
			var ExpenseActual = 0;
			var CapitalTarget = 0;
			var CapitalActual = 0;
			CurrentChanges.each(function(index, item) {
				ExpenseTarget += $(this).find('input[data-column="ExpenseTarget"]').val()/1;
				ExpenseActual += $(this).find('input[data-column="ExpenseActual"]').val()/1;
				CapitalTarget += $(this).find('input[data-column="CapitalTarget"]').val()/1;
				CapitalActual += $(this).find('input[data-column="CapitalActual"]').val()/1;		
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
		var CurrentChanges = $('#ProCostsMonth input[data-column="Year"][value="'+year+'"]').parent().parent();
		CurrentChanges.each(function(index, item) {
			$(this).remove()		
		});	
		$(this).parent().parent().remove();
		SetTotals();
		$('.ProCostsSave').button( "option", "disabled", false );
		NotSavedCheck = true;
	})
	
});
function DataWriteStart()
{
	$.ajax({
		 type:'POST',
	     dataType:'json',
	     url:'../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
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
		url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
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
	
	var NewYears = $('#ProCostsMonthBody tr[data-id="New"]');
	 NewYears.each(function(index, item) {
	 		//batch += '<Method ID="'+index+Mindex+'"><SetList>%Project Costs%</SetList><SetVar Name="ID">'+RowThis.data('id')+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
			batch += '<Method ID="A'+index+'"><SetList>%Project Costs%</SetList><SetVar Name="ID">New</SetVar><SetVar Name="Cmd">Save</SetVar>';
			batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Title">'+$(this).find('input[data-column="Year"]').val()+'</SetVar>';
			batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Month">'+$(this).find('input[data-column="Month"]').val()+'</SetVar>';	
			batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#ExpenseTarget">'+$(this).find('input[data-column="ExpenseTarget"]').val()+'</SetVar>';	
			batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#ExpenseActual">'+$(this).find('input[data-column="ExpenseActual"]').val()+'</SetVar>';	
			batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#CapitalTarget">'+$(this).find('input[data-column="CapitalTarget"]').val()+'</SetVar>';	
			batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#CapitalActual">'+$(this).find('input[data-column="CapitalActual"]').val()+'</SetVar>';		
			batch +='</Method>';
	 	
	 });	
	batch +='</ows:Batch>';
	
//alert(batch);	
	$.ajax({
		type: 'POST',
		url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
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
	var RootNewYears = $('#ProCostsYearBody tr[data-id="New"]');
	RootNewYears.each(function(index, item) {
		ExpenseTarget += $(this).find('input[data-column="ExpenseTarget"]').val()/1;
		ExpenseActual += $(this).find('input[data-column="ExpenseActual"]').val()/1;
		CapitalTarget += $(this).find('input[data-column="CapitalTarget"]').val()/1;
		CapitalActual += $(this).find('input[data-column="CapitalActual"]').val()/1;	
	});
	var Rootbatch = '<ows:Batch OnError="Return">';
	Rootbatch += '<Method ID="A1"><SetList>%Projects%</SetList><SetVar Name="ID">'+ProjectID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
	Rootbatch += '<SetVar Name="urn:schemas-microsoft-com:office:office#PCFinancialEntryType">'+$('#PCFinancialEntryTypeSelecttBox').val()+'</SetVar>';	
	Rootbatch += '<SetVar Name="urn:schemas-microsoft-com:office:office#ResourcesExpenseTargeted">'+ExpenseTarget+'</SetVar>';	
	Rootbatch += '<SetVar Name="urn:schemas-microsoft-com:office:office#ResourcesExpenseActual">'+ExpenseActual+'</SetVar>';	
	Rootbatch += '<SetVar Name="urn:schemas-microsoft-com:office:office#ResourcesCapitalTargeted">'+CapitalTarget+'</SetVar>';	
	Rootbatch += '<SetVar Name="urn:schemas-microsoft-com:office:office#ResourcesCapitalActual">'+CapitalActual+'</SetVar>';		
	Rootbatch +='</Method>';
	Rootbatch +='</ows:Batch>';
	
//alert(Rootbatch);
	$.ajax({
		type: 'POST',
		url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
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
			ResourcesRender();				
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	});
}
function SetTotals(){
			var YearExpenseTargetTotal= 0;
			$('#ProCostsYearBody input[data-column="ExpenseTarget"]:visible').each(function(index, item) {
				YearExpenseTargetTotal+= $(this).val()/1;		
			});
			var YearExpenseActualTotal= 0;
			$('#ProCostsYearBody input[data-column="ExpenseActual"]:visible').each(function(index, item) {
				YearExpenseActualTotal+= $(this).val()/1;		
			});
			var YearCapitalTargetTotal= 0;
			$('#ProCostsYearBody input[data-column="CapitalTarget"]:visible').each(function(index, item) {
				YearCapitalTargetTotal+= $(this).val()/1;		
			});
			var YearCapitalActualTotal= 0;
			$('#ProCostsYearBody input[data-column="CapitalActual"]:visible').each(function(index, item) {
				YearCapitalActualTotal+= $(this).val()/1;		
			});
			$('#YearExpenseTargetTotal').html(YearExpenseTargetTotal);			
			$('#YearCapitalActualTotal').html(YearCapitalActualTotal);			
			$('#YearCapitalTargetTotal').html(YearCapitalTargetTotal);
			$('#YearExpenseActualTotal').html(YearExpenseActualTotal);
}

