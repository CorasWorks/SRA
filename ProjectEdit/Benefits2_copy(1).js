var SRAmonths = [1,2,3,4,5,6,7,8,9,10,11,12];
var YearTotalNeeded = 6;
var MonthTotalNeeded = 7;
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
	InitNumberFormat();
	$('#TabbedBenefitsForm .YearTargetTotal, #TabbedBenefitsForm .YearActualTotal').autoNumeric('init', {aSign: '$', pSign: 'p', aPad: false });
	$('#TabbedBenefitsForm').tabs();
	$("#BenefitsYear").tablesorter({
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
		sortList: [[1,0],[2,0],[3,0],[4,0],[5,0],[6,0]],
		widthFixed: true,
		//widgets: ["filter"],
	});
	$("#BenefitsMonth").tablesorter({
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
		sortList: [[1,0],[3,0],[4,0],[5,0],[6,0],[7,0],[2,0]],
		widthFixed: true,
		//widgets: ["filter"]
	});//.bind('filterEnd', function(e, filter){
	//	SetTotals();
	//});
	$('#BenefitsYearBody').on('change','.DivisionSelectBox',function(){
		DivisionChange($("option:selected", this).data('id'), $(this), YearTotalNeeded );;
    });
	$('#BenefitsYearBody').on('change','.FinancialCategoriesSelectBox',function(){    
		FinancialChange($("option:selected", this).val(), $(this), YearTotalNeeded );
    });
	$('#BenefitsYearBody').on('change','.RegionSelectBox',function(){    
		RegionChange($("option:selected", this).data('id'),$(this), YearTotalNeeded );
    });
	$('#BenefitsYearBody').on('change','.LocationSelectBox, .FinancialSubcategoriesSelectBox, .YearSelect',function(){
		AddSelectCheck($(this), YearTotalNeeded );
    });
	$('#BenefitsMonthBody').on('change','.DivisionSelectBox',function(){
		DivisionChange($("option:selected", this).data('id'), $(this), MonthTotalNeeded );;
    });
	$('#BenefitsMonthBody').on('change','.FinancialCategoriesSelectBox',function(){    
		FinancialChange($("option:selected", this).val(), $(this), MonthTotalNeeded );
    });
	$('#BenefitsMonthBody').on('change','.RegionSelectBox',function(){    
		RegionChange($("option:selected", this).data('id'),$(this), MonthTotalNeeded );
    });
	$('#BenefitsMonthBody').on('change','.LocationSelectBox, .FinancialSubcategoriesSelectBox, .YearSelect, .MonthSelect',function(){
		AddSelectCheck($(this), MonthTotalNeeded );
    });
    $( ".MonthAdd" ).unbind();
	$( ".MonthAdd" ).button().click(function(event ) {
		event.preventDefault();
			var html = '';
			html = '<tr data-id="New">';
			html += '<td style="vertical-align:middle"><img data-url="" title="Remove Year" class="PCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="'+removeimage +'"/></td>';
			html += '<td>'+$('#YearSelectDummy').html()+'</td>';
			html += '<td>'+$('#MonthSelectDummy').html()+'</td>';				
			html += '<td>'+$('#DivisionSelectDummy').html()+'</td>';					    
			html += '<td>'+$('#RegionSelectDummy').html()+'</td>';					    
			html += '<td>'+$('#LocationSelectDummy').html()+'</td>';					    
			html += '<td>'+$('#FinancialCategoriesSelectDummy').html()+'</td>';					    
			html += '<td>'+$('#FinancialSubcategoriesSelectDummy').html()+'</td>';
			html += '<td colspan="2" class="ComfirmButton"><button class="YearDone" disabled="disabled">Confirm</button></td>';					    
			$("#BenefitsMonthBody").append(html);
			$('.YearDone').button();
			$( ".YearSelect" ).focus();
			$('html, body').animate({
			        scrollTop: $(document).height()
			    }, 'fast');
	});
	$('#BenefitsMonthBody').on('click','.YearDone',function(event){
		event.preventDefault();
			var Month = $(this).parent().parent().find('.MonthSelect').val();
			var year = $(this).parent().parent().find('.YearSelect').val();
			var Division = $(this).parent().parent().find('.DivisionSelectBox').val();
			var Region = $(this).parent().parent().find('.RegionSelectBox').val();
			var Location = $(this).parent().parent().find('.LocationSelectBox').val();
			var FinancialCategory = $(this).parent().parent().find('.FinancialCategoriesSelectBox').val();
			var FinancialSubcategoryCheck = $(this).parent().parent().find('.FinancialSubcategoriesSelectBox').val();
				if (FinancialSubcategoryCheck ==null){
					FinancialSubcategoryCheck ='';
					}
			var YearGridRow = $('#BenefitsYearBody input[data-column="Year"][value="'+year+'"]').parent().parent().filter(function(index ) {
				return $(this).find('input[data-column="Division"]').val() == Division
						&& $(this).find('input[data-column="Region"]').val() == Region
						&& $(this).find('input[data-column="Location"]').val() == Location 
						&& $(this).find('input[data-column="FinancialCategory"]').val() == FinancialCategory
						&& $(this).find('input[data-column="FinancialSubcategory"]').val() == FinancialSubcategoryCheck;
				});						
			var YearRow = $('#BenefitsMonthBody input[data-column="Year"][value="'+year+'"]').parent().parent().filter(function(index ) {
				return $(this).find('input[data-column="Division"]').val() == Division
						&& $(this).find('input[data-column="Region"]').val() == Region
						&& $(this).find('input[data-column="Location"]').val() == Location
						&& $(this).find('input[data-column="Month"]').val() == Month
						&& $(this).find('input[data-column="FinancialCategory"]').val() == FinancialCategory
						&& $(this).find('input[data-column="FinancialSubcategory"]').val() == FinancialSubcategoryCheck;
				});


			if(YearRow.length ==0){
				var Mhtml = '';
				Mhtml += '<td style="vertical-align:middle"><img data-url="" title="Remove Month" class="MonthPCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="'+removeimage +'"/></td>';					
				Mhtml += '<td><input type="text" class="FinanceNumber" data-column="Year" value="'+year +'" disabled="disabled" /></td>';					    
				Mhtml += '<td><input type="text" class="FinanceNumber" data-column="Month" value="'+Month +'" disabled="disabled" /></td>';
				Mhtml += '<td><input type="text" data-column="Division" value="'+Division +'" disabled="disabled" /></td>';					    
				Mhtml += '<td><input type="text" data-column="Region" value="'+Region +'" disabled="disabled" /></td>';					    
				Mhtml += '<td><input type="text" data-column="Location" value="'+Location +'" disabled="disabled" /></td>';		
				Mhtml += '<td><input type="text" data-column="FinancialCategory" value="'+FinancialCategory +'" disabled="disabled" /></td>';					    
				Mhtml += '<td><input type="text" data-column="FinancialSubcategory" value="'+FinancialSubcategoryCheck +'" disabled="disabled" /></td>';
				Mhtml += '<td><input type="text" class="FinanceNumber" data-column="Target" value=""/></td>';
				Mhtml += '<td><input type="text" class="FinanceNumber" data-column="Actual" value=""/></td>';				
				$(this).parent().parent().html(Mhtml);		
				
				if(YearGridRow.length == 0){
				var html = '';
					html = '<tr data-id="New">';
					html += '<td style="vertical-align:middle"><img data-url="" title="Remove Year" class="PCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="'+removeimage +'"/></td>';
					html += '<td><input type="text" class="FinanceNumber" data-column="Year" value="'+year +'" disabled="disabled" /></td>';					    
					html += '<td><input type="text" data-column="Division" value="'+Division +'" disabled="disabled" /></td>';					    
					html += '<td><input type="text" data-column="Region" value="'+Region +'" disabled="disabled" /></td>';					    
					html += '<td><input type="text" data-column="Location" value="'+Location +'" disabled="disabled" /></td>';					    
					html += '<td><input type="text" data-column="FinancialCategory" value="'+FinancialCategory +'" disabled="disabled" /></td>';					    
					html += '<td><input type="text" data-column="FinancialSubcategory" value="'+FinancialSubcategoryCheck +'" disabled="disabled" /></td>';
					html += '<td><input type="text" class="FinanceNumber" data-column="Target" value="" /></td>';
					html += '<td><input type="text" class="FinanceNumber" data-column="Actual" value="" /></td>';
					html += '</tr>';					    					
					$("#BenefitsYearBody").append(html);
				}
				InitNumberFormat();
				UpdateTSTables();
			}
			else{
				
				$("#StandardAlert").html('Duplicate item exsits!');
				$("#StandardAlert").dialog("open");			
			}			
					
	});
	$( ".YearAdd" ).unbind();	    	
	$( ".YearAdd" ).button().click(function(event) {
		event.preventDefault();
			var html = '';
			html = '<tr data-id="New">';
			html += '<td style="vertical-align:middle"><img data-url="" title="Remove Year" class="PCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="'+removeimage +'"/></td>';
			html += '<td>'+$('#YearSelectDummy').html()+'</td>';
			html += '<td>'+$('#DivisionSelectDummy').html()+'</td>';					    
			html += '<td>'+$('#RegionSelectDummy').html()+'</td>';					    
			html += '<td>'+$('#LocationSelectDummy').html()+'</td>';					    
			html += '<td>'+$('#FinancialCategoriesSelectDummy').html()+'</td>';					    
			html += '<td>'+$('#FinancialSubcategoriesSelectDummy').html()+'</td>';
			html += '<td colspan="2" class="ComfirmButton"><button class="YearDone" disabled="disabled">Confirm</button></td>';	
			html += '</tr>';					    
			//html += '<td colspan="2">'+$('#YearDoneDummy').html()+'</td>';
			$("#BenefitsYearBody").append(html);
			$('.YearDone').button();
			$( ".YearSelect" ).focus();
			$('html, body').animate({
			        scrollTop: $(document).height()
			    }, 'fast');
	});	
	$('#BenefitsYearBody').on('click','.YearDone',function(event){
		event.preventDefault();
			var year = $(this).parent().parent().find('.YearSelect').val();
			var Division = $(this).parent().parent().find('.DivisionSelectBox').val();
			var Region = $(this).parent().parent().find('.RegionSelectBox').val();
			var Location = $(this).parent().parent().find('.LocationSelectBox').val();
			var FinancialCategory = $(this).parent().parent().find('.FinancialCategoriesSelectBox').val();
			var FinancialSubcategoryCheck = $(this).parent().parent().find('.FinancialSubcategoriesSelectBox').val();
				if (FinancialSubcategoryCheck ==null){
					FinancialSubcategoryCheck ='';
					}	
			var YearRow = $('#BenefitsYearBody input[data-column="Year"][value="'+year+'"]').parent().parent().filter(function(index ) {
				return $(this).find('input[data-column="Division"]').val() == Division
						&& $(this).find('input[data-column="Region"]').val() == Region
						&& $(this).find('input[data-column="Location"]').val() == Location 
						&& $(this).find('input[data-column="FinancialCategory"]').val() == FinancialCategory
						&& $(this).find('input[data-column="FinancialSubcategory"]').val() == FinancialSubcategoryCheck;
				});

			//debugger;
			if(YearRow.length ==0){
				var html = '';
				html += '<td style="vertical-align:middle"><img data-url="" title="Remove Year" class="PCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="'+removeimage +'"/></td>';
				html += '<td><input type="text" class="FinanceNumber" data-column="Year" value="'+year +'" disabled="disabled" /></td>';					    
				html += '<td><input type="text" data-column="Division" value="'+Division +'" disabled="disabled" /></td>';					    
				html += '<td><input type="text" data-column="Region" value="'+Region +'" disabled="disabled" /></td>';					    
				html += '<td><input type="text" data-column="Location" value="'+Location +'" disabled="disabled" /></td>';					    
				html += '<td><input type="text" data-column="FinancialCategory" value="'+FinancialCategory +'" disabled="disabled" /></td>';					    
				html += '<td><input type="text" data-column="FinancialSubcategory" value="'+FinancialSubcategoryCheck +'" disabled="disabled" /></td>';
				html += '<td><input type="text" class="FinanceNumber" data-column="Target" value="" /></td>';
				html += '<td><input type="text" class="FinanceNumber" data-column="Actual" value="" /></td>';
				$(this).parent().parent().html(html);
				
				var Mhtml = '';
				$.each(SRAmonths ,function(Mindex, Mitem) {
					Mhtml += '<tr data-id="New">';
					Mhtml += '<td style="vertical-align:middle"><img data-url="" title="Remove Month" class="MonthPCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="'+removeimage +'"/></td>';					
					Mhtml += '<td><input type="text" class="FinanceNumber" data-column="Year" value="'+year +'" disabled="disabled" /></td>';					    
					Mhtml += '<td><input type="text" class="FinanceNumber" data-column="Month" value="'+Mitem+'" disabled="disabled" /></td>';
					Mhtml += '<td><input type="text" data-column="Division" value="'+Division +'" disabled="disabled" /></td>';					    
					Mhtml += '<td><input type="text" data-column="Region" value="'+Region +'" disabled="disabled" /></td>';					    
					Mhtml += '<td><input type="text" data-column="Location" value="'+Location +'" disabled="disabled" /></td>';					    
					Mhtml += '<td><input type="text" data-column="FinancialCategory" value="'+FinancialCategory +'" disabled="disabled" /></td>';					    
					Mhtml += '<td><input type="text" data-column="FinancialSubcategory" value="'+FinancialSubcategoryCheck +'" disabled="disabled" /></td>';
					Mhtml += '<td><input type="text" class="FinanceNumber" data-column="Target" value=""/></td>';
					Mhtml += '<td><input type="text" class="FinanceNumber" data-column="Actual" value=""/></td>';				
					Mhtml += '</tr>';		
				});
				$("#BenefitsMonthBody").append(Mhtml);
				InitNumberFormat();
				UpdateTSTables();
			}
			else{
				
				$("#StandardAlert").html('Duplicate item exsits!');
				$("#StandardAlert").dialog("open");			
			}			
					
	});
	$( ".BenefitsSave" ).unbind();			
	$( ".BenefitsSave" ).button({icons: {secondary: "ui-icon-circle-check"}}).click(function(event ) {
	//$( ".BenefitsSave" ).button().click(function(event ) {
		event.preventDefault();
		$('#BenefitsReload').show();
		$('#BenefitsData').hide();	
	  	DataWriteStart();
	});
	$('#BenefitsYearBody').on('keyup change','input',function(){
	
		if ($.isNumeric($(this).autoNumeric('get')) || $(this).autoNumeric('get')==''){
		//if ($.isNumeric($(this).autoNumeric('get')) || $(this).val()==''){
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
			var TargetRem = YearRow.find('input[data-column="Target"]').autoNumeric('get')%CurrentChanges.length;
			var Target = ((YearRow.find('input[data-column="Target"]').autoNumeric('get')/1)-TargetRem)/CurrentChanges.length;
			var ActualRem = YearRow.find('input[data-column="Actual"]').autoNumeric('get')%CurrentChanges.length;
			var Actual = ((YearRow.find('input[data-column="Actual"]').autoNumeric('get')/1)-ActualRem)/CurrentChanges.length;
			CurrentChanges.each(function(index, item) {
				if(CurrentChanges.length == index + 1){
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
	$('#BenefitsMonthBody').on('keyup change','input',function(){
		if ($.isNumeric($(this).autoNumeric('get')) || $(this).autoNumeric('get')==''){
		//if ($(this).val()==''){
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
				Target += $(this).find('input[data-column="Target"]').autoNumeric('get')/1;
				Actual += $(this).find('input[data-column="Actual"]').autoNumeric('get')/1;
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
		UpdateTSTables();
	});
	$('#BenefitsMonthBody').on('click','img.MonthPCDeleteIcon',function(){
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
		//debugger;	
		var MonthRows = $('#BenefitsMonthBody input[data-column="Year"][value="'+year+'"]').parent().parent().filter(function(index ) {
			return $(this).find('input[data-column="Division"]').val() == Division
					&& $(this).find('input[data-column="Region"]').val() == Region
					&& $(this).find('input[data-column="Location"]').val() == Location 
					&& $(this).find('input[data-column="FinancialCategory"]').val() == FinancialCategory
					&& $(this).find('input[data-column="FinancialSubcategory"]').val() == FinancialSubcategory;
	
			});

		if (MonthRows.length == 1){
			YearRow.remove();
		}		
		$(this).parent().parent().remove();			
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
			Target += $(this).find('input[data-column="Target"]').autoNumeric('get')/1;
			Actual += $(this).find('input[data-column="Actual"]').autoNumeric('get')/1;
		});
		YearRow.find('input[data-column="Target"]').val(Target);
		YearRow.find('input[data-column="Actual"]').val(Actual);
	
		
		$('.BenefitsSave').button( "option", "disabled", false );
		NotSavedCheck = true;
		SetTotals();
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
		url: ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
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
			batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Target">'+$(this).find('input[data-column="Target"]').autoNumeric('get')+'</SetVar>';	
			batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Actual">'+$(this).find('input[data-column="Actual"]').autoNumeric('get')+'</SetVar>';	
			batch +='</Method>'; 	
	 });	
	batch +='</ows:Batch>';
	
//alert(batch);	
	$.ajax({
		type: 'POST',
		url: ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
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
		BenefitsActual += $(this).find('input[data-column="Actual"]').autoNumeric('get')/1;
		BenefitsTarget += $(this).find('input[data-column="Target"]').autoNumeric('get')/1;
	});

	var Rootbatch = '<ows:Batch OnError="Return">';
	Rootbatch += '<Method ID="A1"><SetList>%Projects%</SetList><SetVar Name="ID">'+ProjectID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';	
	//Rootbatch += '<SetVar Name="urn:schemas-microsoft-com:office:office#BenefitsFinancialEntryType">'+$('#PCFinancialEntryTypeSelecttBox').val()+'</SetVar>';		
	Rootbatch += '<SetVar Name="urn:schemas-microsoft-com:office:office#BenefitsActual">'+BenefitsActual+'</SetVar>';	
	Rootbatch += '<SetVar Name="urn:schemas-microsoft-com:office:office#BenefitsTarget">'+BenefitsTarget+'</SetVar>';	
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
			$('#Resources').html(LoaderHTML);
			NotSavedCheck = false;
			BenefitsRender();				
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	});
}

function DivisionChange(ID, CurrentObject, TotalNeeded) {
	CurrentObject.parent().parent().find('.LocationSelectBox').html('<option selected="selected" disabled="disabled"></option>');
	CurrentObject.parent().parent().find('.LocationSelectBox').prop('disabled', 'disabled');
    				
	   $.ajax({
	        url: ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
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
						RegionItems+='<option selected="selected" disabled="disabled"></option>';
						RegionItems+='<option data-id="'+json.NewDataSet.Region.listitems["rs:data"]["z:row"].ows_ID+'" value="'+json.NewDataSet.Region.listitems["rs:data"]["z:row"].ows_Region+'">'+json.NewDataSet.Region.listitems["rs:data"]["z:row"].ows_Region+'</option>'; 
					}					
					else{
						RegionItems+='<option selected="selected" disabled="disabled"></option>';
						$.each(json.NewDataSet.Region.listitems["rs:data"]["z:row"],function(index,item){
			        		RegionItems+='<option data-id="'+item.ows_ID+'" value="'+item.ows_Region+'">'+item.ows_Region+'</option>';      	
			        	});
					}
				CurrentObject.parent().parent().find('.RegionSelectBox').html(RegionItems);
				CurrentObject.parent().parent().find('.RegionSelectBox').prop('disabled', false);
				AddSelectCheck(CurrentObject, TotalNeeded);					
				        	       	
	        },
	        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	    });	

    
    }
function RegionChange(ID, CurrentObject, TotalNeeded) {				
	   $.ajax({
	        url: ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
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
						LocationItems+='<option selected="selected" disabled="disabled"></option>';
						LocationItems+='<option data-id="'+json.NewDataSet.Location.listitems["rs:data"]["z:row"].ows_ID+'" value="'+json.NewDataSet.Location.listitems["rs:data"]["z:row"].ows_Title+'">'+json.NewDataSet.Location.listitems["rs:data"]["z:row"].ows_Title+'</option>'; 
					}					
					else{
						LocationItems+='<option selected="selected" disabled="disabled"></option>';
						$.each(json.NewDataSet.Location.listitems["rs:data"]["z:row"],function(index,item){
			        		LocationItems+='<option data-id="'+item.ows_ID+'" value="'+item.ows_Title+'">'+item.ows_Title+'</option>';      	
			        	});
					}
				CurrentObject.parent().parent().find('.LocationSelectBox').html(LocationItems);
				CurrentObject.parent().parent().find('.LocationSelectBox').prop('disabled', false);
				AddSelectCheck(CurrentObject, TotalNeeded);					
				        	       	
	        },
	        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	    });	

    
    }
function FinancialChange(name, CurrentObject, TotalNeeded) {				
	   $.ajax({
	        url: ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
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
						LocationItems+='<option selected="selected" disabled="disabled"></option>';
						LocationItems+='<option value="'+json.NewDataSet.Subcategories.listitems["rs:data"]["z:row"].ows_Title+'">'+json.NewDataSet.Subcategories.listitems["rs:data"]["z:row"].ows_Title+'</option>'; 
					}					
					else{
						LocationItems+='<option selected="selected" disabled="disabled"></option>';
						$.each(json.NewDataSet.Subcategories.listitems["rs:data"]["z:row"],function(index,item){
			        		LocationItems+='<option data-id="'+item.ows_ID+'" value="'+item.ows_Title+'">'+item.ows_Title+'</option>';      	
			        	});
					}
				CurrentObject.parent().parent().find('.FinancialSubcategoriesSelectBox').html(LocationItems);
				CurrentObject.parent().parent().find('.FinancialSubcategoriesSelectBox').prop('disabled', false);
				AddSelectCheck(CurrentObject, TotalNeeded);					
				        	       	
	        },
	        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	    });	

    
    }
function SetTotals(){
			var YearTargetTotal = 0;
			$('#BenefitsMonthBody input[data-column="Target"]').each(function(index, item) {
				YearTargetTotal += $(this).autoNumeric('get')/1;		
			});
			var YearActualTotal = 0;
			$('#BenefitsMonthBody input[data-column="Actual"]').each(function(index, item) {
				YearActualTotal += $(this).autoNumeric('get')/1;		
			});
			$('.YearTargetTotal').html(YearTargetTotal);
			$('.YearActualTotal').html(YearActualTotal);
			
			UpdateNumberFormat();
}
function AddSelectCheck(CurrentObject, TotalNeeded){
		if (!CurrentObject.parent().parent().find('.FinancialSubcategoriesSelectBox').prop('disabled')){
			var SubCat = CurrentObject.parent().parent().find('.FinancialSubcategoriesSelectBox option:enabled');
			if(SubCat.length == 0){
				TotalNeeded = TotalNeeded -1;
			}
		}	
		var CurrentSelects = CurrentObject.parent().parent().find('select').filter(function(index ) {
						return $(this).val() != null;
						});			
		if(CurrentSelects.length == TotalNeeded){
			CurrentObject.parent().parent().find('.YearDone').button( "option", "disabled", false );
		}
		else{
			CurrentObject.parent().parent().find('.YearDone').button( "option", "disabled", true );
		}
		//console.log('T'+TotalNeeded+'-C'+CurrentSelects.length);	
}
function UpdateTSTables(){
			$("#BenefitsYear").trigger("update");
			$("#BenefitsMonth").trigger("update");	
}
function InitNumberFormat(){
	$('#TabbedBenefitsForm input[data-column="Actual"], #TabbedBenefitsForm input[data-column="Target"]').autoNumeric('init', {aSign: '$', pSign: 'p', aPad: false, mDec:0});
}
function UpdateNumberFormat(){
$('#TabbedBenefitsForm input[data-column="Actual"], #TabbedBenefitsForm input[data-column="Target"]').autoNumeric('update');
$('#TabbedBenefitsForm .YearTargetTotal, #TabbedBenefitsForm .YearActualTotal').autoNumeric('update'); 

}
