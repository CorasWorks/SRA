var SRAmonths = [1,2,3,4,5,6,7,8,9,10,11,12];
$(document).ready(function () {
	/*
	$("#BenefitsYear").tablesorter({
        textExtraction: function(node) { 
            return $(node).find('input').val();
        }, 	
		sortList: [[0,0]],
		widgets: ["filter"]
	});
	*/
	$("#BenefitsMonth").tablesorter({
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
		//sortList: [[1,0]],
		widgets: ["filter"],
	});
	$("#BenefitsYear").tablesorter({
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
		//sortList: [[1,0]],
		widgets: ["filter"]
	}).bind('filterEnd', function(e, filter){
		SetTotals();
	});
	
	
	$( "#AddBenefit" ).accordion({
		collapsible: true,
		active: false
	});
	$( ".PCFinancialEntryType" ).button().click(function(event ) {
		event.preventDefault();
		$('#BenefitsReload').show();
		$('#BenefitsData').hide();
		DataWriteStart();
	});	
	$('select#DivisionSelectBox').change(function (event) {
		DivisionChange($("option:selected", this).data('id'));
    });
	$('select#FinancialCategoriesSelectBox').change(function (event) {
		FinancialChange($("option:selected", this).val());
    });
	$('select#AddTypeSelectBox').change(function (event) {
		if($("option:selected", this).val() == 'Month'){
			$('#MonthAddSelectBox').prop('disabled', false);
		}
		else if($("option:selected", this).val() == 'Year'){
			$('#MonthAddSelectBox').prop('disabled', 'disabled');
		}

    })    
	$( ".YearAdd" ).button().click(function(event ) {
		event.preventDefault();
		var YearSet = false;
		var LocSet = false;
		var CateSet = false;
		var SubCateSet = false;
		var MonthAdd = true;
		
		if($('#YearSelectBox').val() != null) {YearSet = true;}
		if($('#LocationSelectBox').val() != null) {LocSet = true;}
		if($('#FinancialCategoriesSelectBox').val() != null) {
			CateSet = true;
			if($('#FinancialSubcategoriesSelectBox option').length > 1 && $('#FinancialSubcategoriesSelectBox').val() != null){
				SubCateSet = true;
				}			
			else if($('#FinancialSubcategoriesSelectBox option').length == 1){
				SubCateSet = true;
				}			
			}
		if($('#AddTypeSelectBox').val() == 'Month' && $('#MonthAddSelectBox').val() == null){
			MonthAdd = false;
			}
		else if($('#AddTypeSelectBox').val() == 'Month' && $('#MonthAddSelectBox').val() != null){
			MonthAdd = true;
			}			
		if (YearSet && LocSet && CateSet && SubCateSet && MonthAdd){
			var Mhtml = '';
			var html = '';
			var FinancialSubcategory = '';
				if($('#FinancialSubcategoriesSelectBox').val()!= '' && $('#FinancialSubcategoriesSelectBox').val()!= null){FinancialSubcategory = $('#FinancialSubcategoriesSelectBox').val();}
			
			if ($('#AddTypeSelectBox').val() == 'Year'){
				
				if (ProjectEntryType == 'Year'){ 
						html = '<tr data-id="New">';
						html += '<td style="vertical-align:middle"><img data-url="" title="Remove Year" class="PCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="'+removeimage +'"/></td>';
						html += '<td><input type="text" class="FinanceNumber" data-column="Year" value="'+$('#YearSelectBox').val()+'" disabled="disabled" /></td>';					    
						html += '<td><input type="text" data-column="Division" value="'+$('#DivisionSelectBox').val()+'" disabled="disabled" /></td>';					    
						html += '<td><input type="text" data-column="Region" value="'+$('#RegionSelectBox').val()+'" disabled="disabled" /></td>';					    
						html += '<td><input type="text" data-column="Location" value="'+$('#LocationSelectBox').val()+'" disabled="disabled" /></td>';					    
						html += '<td><input type="text" data-column="FinancialCategory" value="'+$('#FinancialCategoriesSelectBox').val()+'" disabled="disabled" /></td>';					    
						html += '<td><input type="text" data-column="FinancialSubcategory" value="'+FinancialSubcategory +'" disabled="disabled" /></td>';
						html += '<td><input type="text" class="FinanceNumber" data-column="Target" value="" /></td>';
						html += '<td><input type="text" class="FinanceNumber" data-column="Actual" value="" /></td>';
						}
				else{
						html = '<tr data-id="New">';
						html += '<td style="vertical-align:middle"><img data-url="" title="Remove Year" class="PCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="'+removeimage +'"/></td>';
						html += '<td><input type="text" class="FinanceNumber" data-column="Year" value="'+$('#YearSelectBox').val()+'" disabled="disabled" /></td>';					    
						html += '<td><input type="text" data-column="Division" value="'+$('#DivisionSelectBox').val()+'" disabled="disabled" /></td>';					    
						html += '<td><input type="text" data-column="Region" value="'+$('#RegionSelectBox').val()+'" disabled="disabled" /></td>';					    
						html += '<td><input type="text" data-column="Location" value="'+$('#LocationSelectBox').val()+'" disabled="disabled" /></td>';					    
						html += '<td><input type="text" data-column="FinancialCategory" value="'+$('#FinancialCategoriesSelectBox').val()+'" disabled="disabled" /></td>';					    
						html += '<td><input type="text" data-column="FinancialSubcategory" value="'+FinancialSubcategory +'" disabled="disabled" /></td>';
						html += '<td><input type="text" class="FinanceNumber" data-column="Target" value="" disabled="disabled"/></td>';
						html += '<td><input type="text" class="FinanceNumber" data-column="Actual" value="" disabled="disabled"/></td>';				
					}		
				html += '</tr>';		       
				$("#BenefitsYearBody").append(html);
				$.each(SRAmonths ,function(Mindex, Mitem) {
					Mhtml += '<tr data-id="New">';
					Mhtml += '<td style="vertical-align:middle"><img data-url="" title="Remove Month" class="MonthPCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="'+removeimage +'"/></td>';					
					Mhtml += '<td><input type="text" class="FinanceNumber" data-column="Year" value="'+$('#YearSelectBox').val()+'" disabled="disabled" /></td>';					    
					Mhtml += '<td><input type="text" class="FinanceNumber" data-column="Month" value="'+Mitem+'" disabled="disabled" /></td>';
					Mhtml += '<td><input type="text" data-id="'+$("option:selected", $('#DivisionSelectBox')).data('id')+'" data-column="Division" value="'+$('#DivisionSelectBox').val()+'" disabled="disabled" /></td>';					    
					Mhtml += '<td><input type="text" data-id="'+$("option:selected", $('#RegionSelectBox')).data('id')+'" data-column="Region" value="'+$('#RegionSelectBox').val()+'" disabled="disabled" /></td>';					    
					Mhtml += '<td><input type="text" data-id="'+$("option:selected", $('#LocationSelectBox')).data('id')+'" data-column="Location" value="'+$('#LocationSelectBox').val()+'" disabled="disabled" /></td>';					    
					Mhtml += '<td><input type="text" data-column="FinancialCategory" value="'+$('#FinancialCategoriesSelectBox').val()+'" disabled="disabled" /></td>';					    
					Mhtml += '<td><input type="text" data-column="FinancialSubcategory" value="'+FinancialSubcategory +'" disabled="disabled" /></td>';
					Mhtml += '<td><input type="text" class="FinanceNumber" data-column="Target" value=""/></td>';
					Mhtml += '<td><input type="text" class="FinanceNumber" data-column="Actual" value=""/></td>';				
					Mhtml += '</tr>';		
				});
				$("#BenefitsMonthBody").append(Mhtml);
				}
				else if($('#AddTypeSelectBox').val() == 'Month'){
				
					var year = $('#YearSelectBox').val();
					var Division = $('#DivisionSelectBox').val();
					var Region = $('#RegionSelectBox').val();
					var Location = $('#LocationSelectBox').val();
					var FinancialCategory = $('#FinancialCategoriesSelectBox').val();
					var FinancialSubcategoryCheck = $('#FinancialSubcategoriesSelectBox').val();
					
					var YearRow = $('#BenefitsYear input[data-column="Year"][value="'+year+'"]').parent().parent().filter(function(index ) {
						return $(this).find('input[data-column="Division"]').val() == Division
								&& $(this).find('input[data-column="Region"]').val() == Region
								&& $(this).find('input[data-column="Location"]').val() == Location 
								&& $(this).find('input[data-column="FinancialCategory"]').val() == FinancialCategory
								&& $(this).find('input[data-column="FinancialSubcategory"]').val() == FinancialSubcategoryCheck;
						});
						
					if(YearRow.length == 0){
					html = '<tr data-id="New">';
					html += '<td style="vertical-align:middle"><img data-url="" title="Remove Year" class="PCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="'+removeimage +'"/></td>';
					html += '<td><input type="text" class="FinanceNumber" data-column="Year" value="'+$('#YearSelectBox').val()+'" disabled="disabled" /></td>';					    
					html += '<td><input type="text" data-column="Division" value="'+$('#DivisionSelectBox').val()+'" disabled="disabled" /></td>';					    
					html += '<td><input type="text" data-column="Region" value="'+$('#RegionSelectBox').val()+'" disabled="disabled" /></td>';					    
					html += '<td><input type="text" data-column="Location" value="'+$('#LocationSelectBox').val()+'" disabled="disabled" /></td>';					    
					html += '<td><input type="text" data-column="FinancialCategory" value="'+$('#FinancialCategoriesSelectBox').val()+'" disabled="disabled" /></td>';					    
					html += '<td><input type="text" data-column="FinancialSubcategory" value="'+FinancialSubcategory +'" disabled="disabled" /></td>';
					html += '<td><input type="text" class="FinanceNumber" data-column="Target" value="" disabled="disabled"/></td>';
					html += '<td><input type="text" class="FinanceNumber" data-column="Actual" value="" disabled="disabled"/></td>';
					$("#BenefitsYearBody").append(html);	
					}
				
				
					Mhtml += '<tr data-id="New">';
					Mhtml += '<td style="vertical-align:middle"><img data-url="" title="Remove Month" class="MonthPCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="'+removeimage +'"/></td>';					
					Mhtml += '<td><input type="text" class="FinanceNumber" data-column="Year" value="'+$('#YearSelectBox').val()+'" disabled="disabled" /></td>';					    
					Mhtml += '<td><input type="text" data-column="Month" value="'+$('#MonthAddSelectBox').val()+'" disabled="disabled" /></td>';
					Mhtml += '<td><input type="text" data-id="'+$("option:selected", $('#DivisionSelectBox')).data('id')+'" data-column="Division" value="'+$('#DivisionSelectBox').val()+'" disabled="disabled" /></td>';					    
					Mhtml += '<td><input type="text" data-id="'+$("option:selected", $('#RegionSelectBox')).data('id')+'" data-column="Region" value="'+$('#RegionSelectBox').val()+'" disabled="disabled" /></td>';					    
					Mhtml += '<td><input type="text" data-id="'+$("option:selected", $('#LocationSelectBox')).data('id')+'" data-column="Location" value="'+$('#LocationSelectBox').val()+'" disabled="disabled" /></td>';					    
					Mhtml += '<td><input type="text" data-column="FinancialCategory" value="'+$('#FinancialCategoriesSelectBox').val()+'" disabled="disabled" /></td>';					    
					Mhtml += '<td><input type="text" data-column="FinancialSubcategory" value="'+FinancialSubcategory +'" disabled="disabled" /></td>';
					Mhtml += '<td><input type="text" class="FinanceNumber" data-column="Target" value=""/></td>';
					Mhtml += '<td><input type="text" class="FinanceNumber" data-column="Actual" value=""/></td>';				
					Mhtml += '</tr>';		
				$("#BenefitsMonthBody").append(Mhtml);
				
				}
			$("#BenefitsYearBody").trigger("update");
			$("#BenefitsMonthBody").trigger("update");					
		}
		else{
		//alert('Your selection is not complete');
		$("#StandardAlert").html('Your selection is not complete!');
		$("#StandardAlert").dialog("open");
		}
  
	});
	$( ".BenefitsSave" ).button({icons: {secondary: "ui-icon-circle-check"}}).click(function(event ) {
	//$( ".BenefitsSave" ).button().click(function(event ) {
		event.preventDefault();
		$('#BenefitsReload').show();
		$('#BenefitsData').hide();	
	  	DataWriteStart();
	});
	$('#BenefitsYearBody').on('keyup','input',function(){
	
		if ($.isNumeric($(this).val()) || $(this).val()==''){
			var year = $(this).parent().siblings().find('input[data-column="Year"]').val();
			var Division = $(this).parent().siblings().find('input[data-column="Division"]').val();
			var Region = $(this).parent().siblings().find('input[data-column="Region"]').val();
			var Location = $(this).parent().siblings().find('input[data-column="Location"]').val();
			var FinancialCategory = $(this).parent().siblings().find('input[data-column="FinancialCategory"]').val();
			var FinancialSubcategory = $(this).parent().siblings().find('input[data-column="FinancialSubcategory"]').val();
			
			var YearRow = $('#BenefitsYear input[data-column="Year"][value="'+year+'"]').parent().parent().filter(function(index ) {
				return $(this).find('input[data-column="Division"]').val() == Division
						&& $(this).find('input[data-column="Region"]').val() == Region
						&& $(this).find('input[data-column="Location"]').val() == Location 
						&& $(this).find('input[data-column="FinancialCategory"]').val() == FinancialCategory
						&& $(this).find('input[data-column="FinancialSubcategory"]').val() == FinancialSubcategory;

				});
			var CurrentChanges = $('#BenefitsMonth input[data-column="Year"][value="'+year+'"]').parent().parent().filter(function(index ) {
				return $(this).find('input[data-column="Division"]').val() == Division
						&& $(this).find('input[data-column="Region"]').val() == Region
						&& $(this).find('input[data-column="Location"]').val() == Location 
						&& $(this).find('input[data-column="FinancialCategory"]').val() == FinancialCategory
						&& $(this).find('input[data-column="FinancialSubcategory"]').val() == FinancialSubcategory;

				});
			//debugger;
			var TargetRem = YearRow.find('input[data-column="Target"]').val()%CurrentChanges.length;
			var Target = ((YearRow.find('input[data-column="Target"]').val()/1)-TargetRem)/CurrentChanges.length;
			var ActualRem = YearRow.find('input[data-column="Actual"]').val()%CurrentChanges.length;
			var Actual = ((YearRow.find('input[data-column="Actual"]').val()/1)-ActualRem)/CurrentChanges.length;
			CurrentChanges.each(function(index, item) {
				if($(this).find('input[data-column="Month"]').val() == '12'){
					$(this).find('input[data-column="Target"]').val(Target + TargetRem);
					$(this).find('input[data-column="Actual"]').val(Actual + ActualRem);
					}
				else{
					$(this).find('input[data-column="Target"]').val(Target);
					$(this).find('input[data-column="Actual"]').val(Actual);
					}		
			});			
			$('.BenefitsSave').button( "option", "disabled", false );
			NotSavedCheck = true;
			SetTotals();
			}
		else{
		$(this).val('');
		//alert('Only numbers allowed');
		$("#StandardAlert").html('Only numbers allowed!');
		$("#StandardAlert").dialog("open");		
		}
	});
	$('#BenefitsMonthBody').on('keyup','input',function(){
		if ($.isNumeric($(this).val()) || $(this).val()==''){
			var year = $(this).parent().siblings().find('input[data-column="Year"]').val();
			var Division = $(this).parent().siblings().find('input[data-column="Division"]').val();
			var Region = $(this).parent().siblings().find('input[data-column="Region"]').val();
			var Location = $(this).parent().siblings().find('input[data-column="Location"]').val();
			var FinancialCategory = $(this).parent().siblings().find('input[data-column="FinancialCategory"]').val();
			var FinancialSubcategory = $(this).parent().siblings().find('input[data-column="FinancialSubcategory"]').val();
			
			var YearRow = $('#BenefitsYear input[data-column="Year"][value="'+year+'"]').parent().parent().filter(function(index ) {
				return $(this).find('input[data-column="Division"]').val() == Division
						&& $(this).find('input[data-column="Region"]').val() == Region
						&& $(this).find('input[data-column="Location"]').val() == Location 
						&& $(this).find('input[data-column="FinancialCategory"]').val() == FinancialCategory
						&& $(this).find('input[data-column="FinancialSubcategory"]').val() == FinancialSubcategory;

				});
			var CurrentChanges = $('#BenefitsMonth input[data-column="Year"][value="'+year+'"]').parent().parent().filter(function(index ) {
				return $(this).find('input[data-column="Division"]').val() == Division
						&& $(this).find('input[data-column="Region"]').val() == Region
						&& $(this).find('input[data-column="Location"]').val() == Location 
						&& $(this).find('input[data-column="FinancialCategory"]').val() == FinancialCategory
						&& $(this).find('input[data-column="FinancialSubcategory"]').val() == FinancialSubcategory;

				});
			
			var Target = 0;
			var Actual = 0;
			CurrentChanges.each(function(index, item) {
				Target += $(this).find('input[data-column="Target"]').val()/1;
				Actual += $(this).find('input[data-column="Actual"]').val()/1;
			});
			YearRow.find('input[data-column="Target"]').val(Target);
			YearRow.find('input[data-column="Actual"]').val(Actual);
			
			$('.BenefitsSave').button( "option", "disabled", false );
			NotSavedCheck = true;
			SetTotals();
			}
		else{
		$(this).val('');
		//alert('Only numbers allowed');
		$("#StandardAlert").html('Only numbers allowed!');
		$("#StandardAlert").dialog("open");
		}	
	});	
	$('#BenefitsYear').on('click','img.PCDeleteIcon',function(){
		var year = $(this).parent().siblings().find('input[data-column="Year"]').val();
		var Division = $(this).parent().siblings().find('input[data-column="Division"]').val();
		var Region = $(this).parent().siblings().find('input[data-column="Region"]').val();
		var Location = $(this).parent().siblings().find('input[data-column="Location"]').val();
		var FinancialCategory = $(this).parent().siblings().find('input[data-column="FinancialCategory"]').val();
		var FinancialSubcategory = $(this).parent().siblings().find('input[data-column="FinancialSubcategory"]').val();
		var CurrentChanges = $('#BenefitsMonth input[data-column="Year"][value="'+year+'"]').parent().parent().filter(function(index ) {
			return $(this).find('input[data-column="Division"]').val() == Division
					&& $(this).find('input[data-column="Region"]').val() == Region
					&& $(this).find('input[data-column="Location"]').val() == Location 
					&& $(this).find('input[data-column="FinancialCategory"]').val() == FinancialCategory
					&& $(this).find('input[data-column="FinancialSubcategory"]').val() == FinancialSubcategory;
			});

		CurrentChanges.each(function(index, item) {
			$(this).remove()		
		});	
		$(this).parent().parent().remove();
		$('.BenefitsSave').button( "option", "disabled", false );
		NotSavedCheck = true;
		SetTotals();
	});
	$('#BenefitsMonthBody').on('click','img.MonthPCDeleteIcon',function(){
		var year = $(this).parent().siblings().find('input[data-column="Year"]').val();
		var Division = $(this).parent().siblings().find('input[data-column="Division"]').val();
		var Region = $(this).parent().siblings().find('input[data-column="Region"]').val();
		var Location = $(this).parent().siblings().find('input[data-column="Location"]').val();
		var FinancialCategory = $(this).parent().siblings().find('input[data-column="FinancialCategory"]').val();
		var FinancialSubcategory = $(this).parent().siblings().find('input[data-column="FinancialSubcategory"]').val();
		$(this).parent().parent().remove();
		var YearRow = $('#BenefitsYear input[data-column="Year"][value="'+year+'"]').parent().parent().filter(function(index ) {
			return $(this).find('input[data-column="Division"]').val() == Division
					&& $(this).find('input[data-column="Region"]').val() == Region
					&& $(this).find('input[data-column="Location"]').val() == Location 
					&& $(this).find('input[data-column="FinancialCategory"]').val() == FinancialCategory
					&& $(this).find('input[data-column="FinancialSubcategory"]').val() == FinancialSubcategory;
	
			});
		var CurrentChanges = $('#BenefitsMonth input[data-column="Year"][value="'+year+'"]').parent().parent().filter(function(index ) {
			return $(this).find('input[data-column="Division"]').val() == Division
					&& $(this).find('input[data-column="Region"]').val() == Region
					&& $(this).find('input[data-column="Location"]').val() == Location 
					&& $(this).find('input[data-column="FinancialCategory"]').val() == FinancialCategory
					&& $(this).find('input[data-column="FinancialSubcategory"]').val() == FinancialSubcategory;
	
			});
		
		var Target = 0;
		var Actual = 0;
		CurrentChanges.each(function(index, item) {
			Target += $(this).find('input[data-column="Target"]').val()/1;
			Actual += $(this).find('input[data-column="Actual"]').val()/1;
		});
		YearRow.find('input[data-column="Target"]').val(Target);
		YearRow.find('input[data-column="Actual"]').val(Actual);
	
		
		$('.BenefitsSave').button( "option", "disabled", false );
		NotSavedCheck = true;
		SetTotals();
	});
});
function DataWriteStart()
{
	$.ajax({
		 type:'POST',
	     dataType:'json',
	     url:'../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'GetListItems',
			ListTitle: 'Project Benefits',
			TableName: 'ProjectBenefitsLocal',
			OutputType : 'json'
		},
		success: function(json){
			if (json.NewDataSet.ProjectBenefitsLocal.listitems['rs:data'].ItemCount == 0)
				{
					saveLocalData();
				}
			else if (json.NewDataSet.ProjectBenefitsLocal.listitems['rs:data'].ItemCount == 1)
				{
					var batch = '<ows:Batch OnError="Return">';
					batch += '<Method ID="A1"><SetList>%Project Benefits%</SetList><SetVar Name="ID">'+json.NewDataSet.ProjectBenefitsLocal.listitems['rs:data']['z:row'].ows_ID+'</SetVar><SetVar Name="Cmd">Delete</SetVar>';
					batch +='</Method>';
					batch +='</ows:Batch>';
					ClearData(batch);
				}
			else{
					var batch = '<ows:Batch OnError="Return">';			
					$.each(json.NewDataSet.ProjectBenefitsLocal.listitems['rs:data']['z:row'],function(index,item) {
						batch += '<Method ID="A'+index+'"><SetList>%Project Benefits%</SetList><SetVar Name="ID">'+item.ows_ID+'</SetVar><SetVar Name="Cmd">Delete</SetVar>';
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
		 		ListTitle: 'Project Benefits',
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
	
	var NewYears = $('#BenefitsMonthBody tr[data-id="New"]');
	 NewYears.each(function(index, item) {
	 		var FinancialSubcategory = '';
	 		if($(this).find('input[data-column="FinancialSubcategory"]').val() != null && $(this).find('input[data-column="FinancialSubcategory"]').val() != ''){
	 			FinancialSubcategory = $(this).find('input[data-column="FinancialSubcategory"]').val();
	 			}
	 		//batch += '<Method ID="'+index+Mindex+'"><SetList>%Project Costs%</SetList><SetVar Name="ID">'+RowThis.data('id')+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
			batch += '<Method ID="A'+index+'"><SetList>%Project Benefits%</SetList><SetVar Name="ID">New</SetVar><SetVar Name="Cmd">Save</SetVar>';
			batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Month">'+$(this).find('input[data-column="Month"]').val()+'</SetVar>';
			batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Title">'+$(this).find('input[data-column="Year"]').val()+'</SetVar>';
			batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Division">'+$(this).find('input[data-column="Division"]').val()+'</SetVar>';
			batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#DivisionID">'+$(this).find('input[data-column="Division"]').data('id')+'</SetVar>';	
			batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Region">'+$(this).find('input[data-column="Region"]').val()+'</SetVar>';
			batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#RegionID">'+$(this).find('input[data-column="Region"]').data('id')+'</SetVar>';	
			batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Location">'+$(this).find('input[data-column="Location"]').val()+'</SetVar>';
			batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#LocationID">'+$(this).find('input[data-column="Location"]').data('id')+'</SetVar>';	
			batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#FinancialCategory">'+$(this).find('input[data-column="FinancialCategory"]').val()+'</SetVar>';	
			batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#FinancialSubcategory">'+FinancialSubcategory +'</SetVar>';		
			batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Target">'+$(this).find('input[data-column="Target"]').val()+'</SetVar>';	
			batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Actual">'+$(this).find('input[data-column="Actual"]').val()+'</SetVar>';	
			batch +='</Method>'; 	
	 });	
	batch +='</ows:Batch>';
	
//alert(batch);	
	$.ajax({
		type: 'POST',
		url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'ProcessBatchData',
		 		ListTitle: 'Project Benefits',
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

function saveMainData(){

	var BenefitsActual = 0;
	var BenefitsTarget = 0;
	var RootNewYears = $('#BenefitsMonthBody tr[data-id="New"]');
	RootNewYears.each(function(index, item) {
		BenefitsActual += $(this).find('input[data-column="Actual"]').val()/1;
		BenefitsTarget += $(this).find('input[data-column="Target"]').val()/1;
	});

	var Rootbatch = '<ows:Batch OnError="Return">';
	Rootbatch += '<Method ID="A1"><SetList>%Projects%</SetList><SetVar Name="ID">'+ProjectID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';	
	Rootbatch += '<SetVar Name="urn:schemas-microsoft-com:office:office#BenefitsFinancialEntryType">'+$('#PCFinancialEntryTypeSelecttBox').val()+'</SetVar>';		
	Rootbatch += '<SetVar Name="urn:schemas-microsoft-com:office:office#BenefitsActual">'+BenefitsActual+'</SetVar>';	
	Rootbatch += '<SetVar Name="urn:schemas-microsoft-com:office:office#BenefitsTarget">'+BenefitsTarget+'</SetVar>';	
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
			$('#Resources').html(LoaderHTML);
			NotSavedCheck = false;
			BenefitsRender();				
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	});
}

function DivisionChange(ID) {
    $("select#LocationSelectBox").html('<option selected="selected" disabled="disabled">Select a Location</option>');
    $('select#LocationSelectBox').prop('disabled', 'disabled');
    				
	   $.ajax({
	        url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		    data: { RequestType: 'BatchRequest', 
		    		ConfigFileLocation: '[SRA Root]/Resources/ProjectEdit/Benefits-ProjectRegion.xml',
		    		PSelectValue: ID, 
	    			OutputType:'JSON'
	    			},
	        dataType: 'json',
	        async: true,
	        cache: false,
	        type: 'POST',
	        success: function (json) {
		        var RegionItems="";
					if (json.NewDataSet.Region.listitems["rs:data"].ItemCount == 0){
						RegionItems+='<option selected="selected" disabled="disabled">No Regions Loaded</option>'; 
					}
					else if (json.NewDataSet.Region.listitems["rs:data"].ItemCount == 1){
						RegionItems+='<option selected="selected" disabled="disabled">Select a Region</option>';
						RegionItems+='<option data-id="'+json.NewDataSet.Region.listitems["rs:data"]["z:row"].ows_ID+'" value="'+json.NewDataSet.Region.listitems["rs:data"]["z:row"].ows_Region+'">'+json.NewDataSet.Region.listitems["rs:data"]["z:row"].ows_Region+'</option>'; 
					}					
					else{
						RegionItems+='<option selected="selected" disabled="disabled">Select a Region</option>';
						$.each(json.NewDataSet.Region.listitems["rs:data"]["z:row"],function(index,item){
			        		RegionItems+='<option data-id="'+item.ows_ID+'" value="'+item.ows_Region+'">'+item.ows_Region+'</option>';      	
			        	});
					}
				$("select#RegionSelectBox").html(RegionItems);
				$('select#RegionSelectBox').prop('disabled', false);
				$('select#RegionSelectBox').change(function (event) {
					RegionChange($("option:selected", this).data('id'));
			    });
					
				        	       	
	        },
	        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	    });	

    
    }
function RegionChange(ID) {				
	   $.ajax({
	        url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		    data: { RequestType: 'BatchRequest', 
		    		ConfigFileLocation: '[SRA Root]/Resources/ProjectEdit/Benefits-ProjectLocation.xml',
		    		PSelectValue: ID, 
	    			OutputType:'JSON'
	    			},
	        dataType: 'json',
	        async: true,
	        cache: false,
	        type: 'POST',
	        success: function (json) {
		        var LocationItems="";
					if (json.NewDataSet.Location.listitems["rs:data"].ItemCount == 0){
						LocationItems+='<option selected="selected" disabled="disabled">No Locations Loaded</option>'; 
					}
					else if (json.NewDataSet.Location.listitems["rs:data"].ItemCount == 1){
						LocationItems+='<option selected="selected" disabled="disabled">Select a Location</option>';
						LocationItems+='<option data-id="'+json.NewDataSet.Location.listitems["rs:data"]["z:row"].ows_ID+'" value="'+json.NewDataSet.Location.listitems["rs:data"]["z:row"].ows_Title+'">'+json.NewDataSet.Location.listitems["rs:data"]["z:row"].ows_Title+'</option>'; 
					}					
					else{
						LocationItems+='<option selected="selected" disabled="disabled">Select a Location</option>';
						$.each(json.NewDataSet.Location.listitems["rs:data"]["z:row"],function(index,item){
			        		LocationItems+='<option data-id="'+item.ows_ID+'" value="'+item.ows_Title+'">'+item.ows_Title+'</option>';      	
			        	});
					}
				$("select#LocationSelectBox").html(LocationItems);
				$('select#LocationSelectBox').prop('disabled', false);					
				        	       	
	        },
	        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	    });	

    
    }
function FinancialChange(name) {				
	   $.ajax({
	        url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		    data: { RequestType: 'BatchRequest', 
		    		ConfigFileLocation: '[SRA Root]/Resources/ProjectEdit/Benefits-ProjectSubCategory.xml',
		    		PSelectValue: name, 
	    			OutputType:'JSON'
	    			},
	        dataType: 'json',
	        async: true,
	        cache: false,
	        type: 'POST',
	        success: function (json) {
		        var LocationItems="";
					if (json.NewDataSet.Subcategories.listitems["rs:data"].ItemCount == 0){
						LocationItems+='<option selected="selected" disabled="disabled">No Financial Subcategory Loaded</option>'; 
					}
					else if (json.NewDataSet.Subcategories.listitems["rs:data"].ItemCount == 1){
						LocationItems+='<option selected="selected" disabled="disabled">Select a Financial Subcategory</option>';
						LocationItems+='<option value="'+json.NewDataSet.Subcategories.listitems["rs:data"]["z:row"].ows_Title+'">'+json.NewDataSet.Subcategories.listitems["rs:data"]["z:row"].ows_Title+'</option>'; 
					}					
					else{
						LocationItems+='<option selected="selected" disabled="disabled">Select a Financial Subcategory</option>';
						$.each(json.NewDataSet.Subcategories.listitems["rs:data"]["z:row"],function(index,item){
			        		LocationItems+='<option data-id="'+item.ows_ID+'" value="'+item.ows_Title+'">'+item.ows_Title+'</option>';      	
			        	});
					}
				$("select#FinancialSubcategoriesSelectBox").html(LocationItems);
				$('select#FinancialSubcategoriesSelectBox').prop('disabled', false);					
				        	       	
	        },
	        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	    });	

    
    }
    /*
function SetTotals(){
			var YearTargetTotal = 0;
			$('#BenefitsYearBody input[data-column="Target"]').each(function(index, item) {
				YearTargetTotal += $(this).val()/1;		
			});
			var YearActualTotal = 0;
			$('#BenefitsYearBody input[data-column="Actual"]').each(function(index, item) {
				YearActualTotal += $(this).val()/1;		
			});
			$('#YearTargetTotal').html(YearTargetTotal);
			$('#YearActualTotal').html(YearActualTotal);
}
*/
function SetTotals(){
			var YearTargetTotal = 0;
			$('#BenefitsYearBody input[data-column="Target"]:visible').each(function(index, item) {
				YearTargetTotal += $(this).val()/1;		
			});
			var YearActualTotal = 0;
			$('#BenefitsYearBody input[data-column="Actual"]:visible').each(function(index, item) {
				YearActualTotal += $(this).val()/1;		
			});
			$('#YearTargetTotal').html(YearTargetTotal);
			$('#YearActualTotal').html(YearActualTotal);
}
