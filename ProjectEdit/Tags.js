var TeamMemberPermUsers = new Array();
var NewSaveItemsLength = 0;
var NewSaveItemsDone = 0;
var NewItemCounter = 0;
var MultiAddlength = 0;
var DefaultTags= [];
var ValueChoice = false;

$(document).ready(function () {
	DivisionTags();
	
	$("#TagsTable").tablesorter({
		//sortList: [[3,0]],
		//widgets: ["filter"],
		widthFixed: true
		
	});

	$( ".TagsSave" ).button({icons: {secondary: "ui-icon-circle-check"}}).click(function(event ) {
		event.preventDefault();
		//saveLocalData();
		NotSavedCheck = false;
		$("#TagsData").hide();
		$("#TagsReload").show();
		saveData();
	});
	
	$("#TagsAdd").dialog({
      autoOpen: false,
      modal: true,
      width: 500     
    });
	$("#TagsEdit").dialog({
      autoOpen: false,
      modal: true,
      width: 500     
    });
	$("#DefaultTagsEditText").dialog({
      autoOpen: false,
      modal: true,
      width: 500     
    });
	$("#DefaultTagsEditChoice").dialog({
      autoOpen: false,
      modal: true,
      width: 500,
      height: 300     
    });
	$("#DefaultTagsEditMChoice").dialog({
      autoOpen: false,
      modal: true,
      width: 500,
      height: 300     
    });
	$("#ValueChoice").chosen({
		 width: "250px",
		 placeholder_text_single: 'Select a Value',
		 search_contains: true	
		
	});
	$("#ValueMChoice").chosen({
		 width: "250px",
		 placeholder_text_multiple: 'Select a Value',
		 search_contains: true	
		
	});
    
    $("#TagsError").dialog({
      autoOpen: false,
      modal: true,   
    })
    
	$( ".TagsAdd" ).unbind();    
	$( ".TagsAdd" ).button().click(function(event ) {
		event.preventDefault();
		ClearForm();
		$("#TagsAdd").dialog("open");
	});
	$( ".TagsNewAdd" ).unbind();
	$( ".TagsNewAdd" ).button().click(function(event ) {
		event.preventDefault();
		var Label = $('#TagsAdd .Label').val();
		var Value = $('#TagsAdd .Value').val();
		var ValueCheck = (Label.search(/[^A-Za-z0-9\s]/) == -1) ? true:false;
		console.log(ValueCheck);  
        if (Value.match('#')||Value.match(';')||Value.match('_')){ValueCheck = false;}
		
		if(Label !='' && Value !='' && ValueCheck){
			AddTagsToTable(Label, Value);
		}
		else{
			
			$("#TagsError").dialog("open");
		}
	});
	$( "#TagsEdit .TagsEdit" ).unbind();
	$( "#TagsEdit .TagsEdit" ).button().click(function(event ) {
		event.preventDefault();		
		var Label = $('#TagsEdit .Label').val();
		var Value = $('#TagsEdit .Value').val();
		var ValueCheck = (Label.search(/[^A-Za-z0-9\s]/) == -1) ? true:false; 
        if (Value.match('#')||Value.match(';')||Value.match('_')){ValueCheck = false;}
		
		if(Label !='' && Value !='' && ValueCheck){
			EditTagsToTable('#TagsEdit', Label, Value);
		}
		else{
			
			$("#TagsError").dialog("open");
		}
		
	});

	$('#TagsTable').on('click','img.PCDeleteIcon',function(){	
		$(this).parent().parent().remove();
		$("#TagsTable").trigger("update");
		$('.TagsSave').button( "option", "disabled", false );
		NotSavedCheck = true;
	});	
	$('#TagsTable').on('click','img.TagsEditIcon',function(){
		var ParentTR = 	$(this).parent().parent();+
		/*
		$('#TagsEdit .TagsEdit').attr( "CurrentID", ParentTR.data('id') );
		$('#TagsEdit .Label').val(ParentTR.find('input.Label').val());
		$('#TagsEdit .Value').val(ParentTR.find('input.Value').val());
		$("#TagsEdit").dialog("open");
		*/
		EditRouter(ParentTR);		
	});
	$( "#DefaultTagsEditText .TagsEdit" ).unbind();
	$( "#DefaultTagsEditText .TagsEdit" ).button().click(function(event ) {
		event.preventDefault();		
		var Label = $('#DefaultTagsEditText .Label').val();
		var Value = $('#DefaultTagsEditText .Value').val();
		var ValueCheck = (Label.search(/[^A-Za-z0-9\s]/) == -1) ? true:false; 
        if (Value.match('#')||Value.match(';')||Value.match('_')){ValueCheck = false;}
		
		if(Label !='' && Value !='' && ValueCheck){
			EditTagsToTable('#DefaultTagsEditText', Label, Value);
		}
		else{
			
			$("#TagsError").dialog("open");
		}
		
	});	
	$( "#DefaultTagsEditChoice .TagsEdit" ).unbind();
	$( "#DefaultTagsEditChoice .TagsEdit" ).button().click(function(event ) {
		event.preventDefault();		
		var Label = $('#DefaultTagsEditChoice .Label').val();
		var Value = $('#DefaultTagsEditChoice .Value').val();
		var ValueCheck = (Label.search(/[^A-Za-z0-9\s]/) == -1) ? true:false;  
        if (Value.match('#')||Value.match(';')||Value.match('_')){ValueCheck = false;}
		
		if(Label !='' && Value !='' && ValueCheck){
			EditTagsToTable('#DefaultTagsEditChoice', Label, Value);
		}
		else{
			
			$("#TagsError").dialog("open");
		}
		
	});
	$( "#DefaultTagsEditMChoice .TagsEdit" ).unbind();
	$( "#DefaultTagsEditMChoice .TagsEdit" ).button().click(function(event ) {
		event.preventDefault();		
		var Label = $('#DefaultTagsEditMChoice .Label').val();
		var Value = $('#DefaultTagsEditMChoice .Value').val();
		var CompValue = '';
		//var ValueCheck = (Label.search(/[^A-Za-z0-9\s]/) == -1) ? true:false;  
        //if (Value.match('#')||Value.match(';')||Value.match('_')){ValueCheck = false;}
		console.log(Value);
		if (Value != '' && Value != null){
			if (Value.length > 0){
				$.each(Value,function(index,item){
					if(index > 0 ){CompValue += ', '}
					CompValue += item;
				});
			}
			if(Label !='' && Value !=''){
				EditTagsToTable('#DefaultTagsEditMChoice', Label, CompValue);
			}
			else{
				
				$("#TagsError").dialog("open");
			}
		}
		else{
			
			$("#TagsError").dialog("open");
		}
		
	});
			
});
function AddTagsToTable(Label, Value){
			NewItemCounter++; 
			html = '<tr data-id="New'+NewItemCounter+'">';
			html += '<td style="vertical-align:middle"><img data-url="" title="Remove" class="PCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="'+removeimage +'"/>';
			html += '<img data-url="" title="Edit Tags" class="TagsEditIcon ui-button ui-widget ui-state-default ui-corner-all" src="'+editimage +'"/>';			
			html += '<input style="display:none" class="Label"  value="'+Label+'"/>';			
			html += '<input style="display:none" class="Value"  value="'+Value+'"/></td>';			

			html += '<td class="Label">'+Label+'</td>';
			html += '<td class="Value">'+Value+'</td>';
			html += '</tr>';
			$("#TagsTableBody").append(html);
			$("#TagsAdd").dialog("close");	
			$("#TagsTable").trigger("update");
			$('.TagsSave').button( "option", "disabled", false );
			NotSavedCheck = true;
						    
}
function EditTagsToTable(dialog, Label, Value){
		
			var CurrentItemID = $(dialog +' .TagsEdit').attr("CurrentID");
			var CurrentItemTR = $('#TagsTableBody tr[data-id="'+CurrentItemID +'"]');
			//console.log(CurrentItemTR);
			CurrentItemTR.find('input.Label').val(Label);
			CurrentItemTR.find('td.Label').html(Label);
			CurrentItemTR.find('input.Value').val(Value);
			CurrentItemTR.find('td.Value').html(Value);
			
			console.log($(dialog +' .Label').val());
			console.log($(dialog +' .Value').val());
			
			$("#TagsTable").trigger("update");
			$(dialog).dialog("close");
			$('.TagsSave').button( "option", "disabled", false );
			NotSavedCheck = true;
}

function saveData(){
	//SaveType = 'New';
	var Items = $('#TagsTableBody tr');
	var tags = '';
	 Items.each(function(index, item) {
	 		tags +=';#';
			tags += $(this).find('input.Label').val();
	 		tags +='##';	
			tags += $(this).find('input.Value').val();
	 });
	var Rootbatch = '<ows:Batch OnError="Return">';
	Rootbatch += '<Method ID="A1"><SetList>%Projects%</SetList><SetVar Name="ID">'+ProjectID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';	
	Rootbatch += '<SetVar Name="urn:schemas-microsoft-com:office:office#adhoctagging">'+tags +'</SetVar>';
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
			if(NotSavedCloseCheck){CloseEditMain();}
			$("#ValueChoice").chosen("destroy");
			$("#ValueMChoice").chosen("destroy");
			TagsRender();				
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	});
}
function ClearForm(){
	$('#TagsAdd .Label').val('');
	$('#TagsAdd .Value').val('');
}

function DivisionTags() {
	var URLs1 = ProjectSiteURL.split('/div');
	var DivID = URLs1[1].split('/');						
   $.ajax({
        url: ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
	    data: { RequestType: 'BatchRequest', 
	    		ConfigFileLocation: '[SRA Root]/Resources/ProjectEdit/SRAProjectTags.xml',
	    		PSelectValue: DivID[0], 
    			OutputType:'JSON'
    			},
        dataType: 'json',
        async: true,
        cache: false,
        type: 'POST',
        success: function (json) {
				if (json.NewDataSet.TagsChoices.listitems["rs:data"].ItemCount == 0){
					//DefaultTags ='';
				}
				else if (json.NewDataSet.TagsChoices.listitems["rs:data"].ItemCount == 1){
					var NewChoice = {};
					NewChoice.Title = json.NewDataSet.TagsChoices.listitems["rs:data"]["z:row"].ows_Title;
					NewChoice.CID = json.NewDataSet.TagsChoices.listitems["rs:data"]["z:row"].ows_Category;
					DefaultTags.push(NewChoice);

				}
				else{
					$.each(json.NewDataSet.TagsChoices.listitems["rs:data"]["z:row"],function(index,item){
						var NewChoice = {};
						NewChoice.Title = item.ows_Title;
						NewChoice.CID = item.ows_Category;
						DefaultTags.push(NewChoice);

		        	});

				}				
				console.log(DefaultTags);	
					
			        	       	
        },
        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}

    });	


}
function EditRouter(ParentTR) {
		//var IsDefaultTagsDiv = DefaultTags.length>0;
		var IsDefaultTagsField = ParentTR.find('img.TagsEditIcon').data('isdefault');
		var DefaultType = ParentTR.find('img.TagsEditIcon').data('defaulttype');
		var DefaultID = ParentTR.find('img.TagsEditIcon').data('defaultid');
		var DefaultChoices = '';
		//console.log(ParentTR);
		//console.log(IsDefaultTagsField);
		//console.log(DefaultType);

    	if(IsDefaultTagsField){
				if(DefaultType  == 'Text'){
						$('#DefaultTagsEditText .TagsEdit').attr( "CurrentID", ParentTR.data('id') );
						$('#DefaultTagsEditText .Label').val(ParentTR.find('input.Label').val());
						$('#DefaultTagsEditText .Value').val(ParentTR.find('input.Value').val());
						$("#DefaultTagsEditText").dialog("open");   					
					}
				else if(DefaultType  == 'Choice'){
						DefaultChoices = ''
						var CurrentCount = 0;
						//DefaultChoices +='<option selected="selected" disabled="disabled"></option>'; 
						$.each(DefaultTags,function(index,item){
							var CID = item.CID.split(';#');
							if(DefaultID == CID[0]){
								DefaultChoices +='<option value="'+item.Title+'">'+item.Title+'</option>';
								CurrentCount++;
								} 
						});	
						if(CurrentCount  == 0){
							DefaultChoices +='<option disabled="disabled">No Options Available</option>';
						}
						
						$('#DefaultTagsEditChoice .Value').html(DefaultChoices);
						$('#DefaultTagsEditChoice .TagsEdit').attr( "CurrentID", ParentTR.data('id') );
						$('#DefaultTagsEditChoice .Label').val(ParentTR.find('input.Label').val());
						$('#DefaultTagsEditChoice .Value').val(ParentTR.find('input.Value').val());
						$("#DefaultTagsEditChoice").dialog("open");
						$("#ValueChoice").trigger('chosen:updated');										
					}					
				else if(DefaultType  == 'Multi Choice'){
						DefaultChoices = ''
						var CurrentCount = 0;
						var CurrentChoices = ParentTR.find('input.Value').val().split(', ');
						
						//DefaultChoices +='<option selected="selected" disabled="disabled"></option>'; 
						$.each(DefaultTags,function(index,item){
							var CID = item.CID.split(';#');
							if(DefaultID == CID[0]){
								var selected = ''; 
								$.each(CurrentChoices ,function(indexC,itemC){
									//console.log(item);
									//console.log(itemC);
									if(itemC == item.Title){selected = 'selected="selected"'; }
								});
								DefaultChoices +='<option '+selected+' value="'+item.Title+'">'+item.Title+'</option>';
								CurrentCount++;
								} 
						});	
						if(CurrentCount  == 0){
							DefaultChoices +='<option disabled="disabled">No Options Available</option>';
						}
						
						$('#DefaultTagsEditMChoice .Value').html(DefaultChoices);					
						$('#DefaultTagsEditMChoice .TagsEdit').attr( "CurrentID", ParentTR.data('id') );
						$('#DefaultTagsEditMChoice .Label').val(ParentTR.find('input.Label').val());
						//$('#DefaultTagsEditMChoice .Value').val(ParentTR.find('input.Value').val());
						$("#DefaultTagsEditMChoice").dialog("open");
						$("#ValueMChoice").trigger('chosen:updated');
						$("#ValueMChoice").trigger('chosen:close');    				
					}
    		}
    	else{
				$('#TagsEdit .TagsEdit').attr( "CurrentID", ParentTR.data('id') );
				$('#TagsEdit .Label').val(ParentTR.find('input.Label').val());
				$('#TagsEdit .Value').val(ParentTR.find('input.Value').val());
				$("#TagsEdit").dialog("open");   	
    		}
//console.log(DefaultType);
//console.log(DefaultChoices );
}



