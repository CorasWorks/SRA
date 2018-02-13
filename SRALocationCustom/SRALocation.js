$(function () {
	var Sitemanger = false;	
	if(getParameterByName('SiteManager') !=''){
			Sitemanger = true;
		}

    $('#TabbedForm').tabs({ show: { effect: "slide",direction:"right", duration: 700 } });
    $('.Cancel').button({ icons: { primary: "ui-icon-circle-close" } });
    $('.Save').button({icons: {secondary: "ui-icon-circle-check"}});
    var definition;
    var ListSchema = {};
    var selectedItems;
    var InputsHTML = '';
    var CurrentUserID = '';
    
   selectedItems = CWSGetSelectedListItems(webPartId);

    $.ajax({
        type: "GET",
        url: actionEndPoint,
        cache: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            definition = data.Definition;
            RenderForm();
        },
        error: function (data) { alert(data.responseText); }
    });

    $('.Cancel').click(function (event) {
    	event.preventDefault();
		if(Sitemanger){
			parent.SP.UI.ModalDialog.commonModalDialogClose();
			}
		else{
			CWSCloseActionForm(webDialogId);
			}    	
    });
    
    $('.Save').click(function (event) {
        event.preventDefault();
        var MissingFields= '';
        parent.SP.UI.ModalDialog.showWaitScreenWithNoClose('Processing Request', '');
		/* checking for missing fields */
		var InputFilters = $('#DynamicForm input').filter(function() { return this.value == ""; });
		InputFilters.each(function() {
			MissingFields += $("#DynamicForm label[for="+$(this).attr("id")+"]").text() + ', ';
		})
		
		var SelectFilters = $('#DynamicForm select[req!="false"] option:selected').filter(function() { return $( this ).attr( "disabled" ) === "disabled"; });
		SelectFilters.each(function() {
			MissingFields += $("#DynamicForm label[for="+$(this).parent().attr("id")+"]").text() + ', ';
		})

        if (MissingFields == ''){
        	var TitleCheck = true;
        	if ($("#Title").val().match("'")||$("#Title").val().match('"')||$("#Title").val().match('&')){TitleCheck = false;}
        	if (TitleCheck){
				var ToWrite = '<ows:Batch OnError="Return">';
				ToWrite += '<Method ID="A1"><SetList>%Locations%</SetList><SetVar Name="ID">New</SetVar><SetVar Name="Cmd">Save</SetVar>';
				ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Title">'+ $("#Title").val()+'</SetVar>';
				ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Division">'+ $("#Division option:selected").val()+'</SetVar>';
				ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#DivisionRegion">'+ $("#Region option:selected").val()+'</SetVar>';
				ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#ParentID">'+ $("#Region option:selected").attr("OPTid")+'</SetVar>';
				if($('#Active').prop('checked')!=true){
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Active">false</SetVar>';
				}
				ToWrite +='</Method></ows:Batch>';
				$.ajax({
					type:'POST',
					dataType:'json',
					url:'../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
					data: { 
						RequestType: 'ProcessBatchData',
				 		ListTitle: 'Locations',
				 		SiteURL: '[SRA Root]',
						Batch: ToWrite,
						OutputType:'JSON'
						},
					error:function(xhr,status,error){
						alert('Error:\n' + xhr.responseText);
					},
					success:function(json) {
						CreateSite(json.NewDataSet.ProcessBatchData.Results.Result.ID[1])
					}
				});
			}	
			else{
			alert('Location Name contains an illegal character. Please remove any of the following characters. &  "  ' + " ' ");
			parent.SP.UI.ModalDialog.commonModalDialogClose();
			//CWSCloseActionForm(webDialogId);
			}
	
		}
		else{
		alert('Missing required field(s): ' + MissingFields);
		parent.SP.UI.ModalDialog.commonModalDialogClose();
		//CWSCloseActionForm(webDialogId);

		}
    });
    function CreateSite(ID) {
		$.ajax({
			type:'POST',
			dataType:'json',
			url:'../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
			data: { 
				RequestType: 'StartWorkflow',
		 		ListTitle: 'Locations',
		 		SiteURL: '[SRA Root]',
				WorkFlowName: 'CreateSite Location',
				ItemIds: ID,
				OutputType:'JSON'
				},
			error:function(xhr,status,error){
				alert('Error:\n' + xhr.responseText);
			},
			success:function(json) {
				if(Sitemanger){
					parent.SP.UI.ModalDialog.commonModalDialogClose();
					parent.CWDialogCloseActionWithChange(true);
					parent.SP.UI.ModalDialog.commonModalDialogClose()
					}
				else{
					parent.SP.UI.ModalDialog.commonModalDialogClose();
					parent.refreshGridFromMaster();
					CWSCloseActionForm(webDialogId);
					}	
	
			}
		});
    
    
	    
    }
    
    function RenderForm() {
    	var FormHTML = '';
    	var HiddenParamsHTML = '';
    	$('#CWActionTitle').text(definition._actionName);
    	$('#CWActionCategory').text(definition._category);
    	$('#CWActionDescription').text(definition._decription);
		   $.ajax({
		        url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
			    data: { RequestType: 'BatchRequest', 
			    		ConfigFileLocation: '%ISiteURL%/Resources/SRALocationCustom/SRAProjectFieldData.xml', 
		    			OutputType:'JSON'
		    			},
		        dataType: 'json',
		        async: true,
		        cache: false,
		        type: 'POST',
		        success: function (json) {	        	
					var DivisionItems="";
					var ProjectSecurityItems="";
					var MethodologyItems="";
					var CategoryItems="";
					$.each(json.NewDataSet.CWUserID.CWVariable,function(index,item){
			        		if (item.name == 'CWUID'){CurrentUserID = item.value;}     	
			        	});
					
					if (json.NewDataSet.Division.listitems["rs:data"].ItemCount == 0){
						DivisionItems+='<option selected="selected" disabled="disabled">No Divisions Loaded</option>'; 
					}
					else if (json.NewDataSet.Division.listitems["rs:data"].ItemCount == 1){
						DivisionItems+='<option OPTid="'+json.NewDataSet.Division.listitems["rs:data"]["z:row"].ows_ID+'" value="'+json.NewDataSet.Division.listitems["rs:data"]["z:row"].ows_Title+'">'+json.NewDataSet.Division.listitems["rs:data"]["z:row"].ows_Title+'</option>'; 
					}					
					else{
						$.each(json.NewDataSet.Division.listitems["rs:data"]["z:row"],function(index,item){
			        		DivisionItems+='<option OPTid="'+item.ows_ID+'" value="'+item.ows_Title+'">'+item.ows_Title+'</option>';      	
			        	});
					}

					$("select#Division").append(DivisionItems);					
					$('select#Division').change(function (event) {
						DivisionChange($("option:selected", this).attr("OPTid"));
				    });
    				
				    	$('#busyLoader').hide();
    					$('#ActionForm').show();

  
		        },
		        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
		
		    });
    }
    function DivisionChange(ID) {
    $("select#Location").html('<option selected="selected" disabled="disabled">Select a Location</option>');
    $('select#Location').prop('disabled', 'disabled');
    				
	   $.ajax({
	        url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		    data: { RequestType: 'BatchRequest', 
		    		ConfigFileLocation: '%ISiteURL%/Resources/SRALocationCustom/SRAProjectRegion.xml',
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
						RegionItems+='<option OPTid="'+json.NewDataSet.Region.listitems["rs:data"]["z:row"].ows_ID+'" value="'+json.NewDataSet.Region.listitems["rs:data"]["z:row"].ows_Region+'">'+json.NewDataSet.Region.listitems["rs:data"]["z:row"].ows_Region+'</option>'; 
					}					
					else{
						RegionItems+='<option selected="selected" disabled="disabled">Select a Region</option>';
						$.each(json.NewDataSet.Region.listitems["rs:data"]["z:row"],function(index,item){
			        		RegionItems+='<option OPTid="'+item.ows_ID+'" value="'+item.ows_Region+'">'+item.ows_Region+'</option>';      	
			        	});
					}
				$("select#Region").html(RegionItems);
				$('select#Region').prop('disabled', false);					
				        	       	
	        },
	        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	    });	

    
    }
	function getParameterByName(ParamName)
	{
	    ParamName = ParamName.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	    var regexS = "[\\?&]"+ParamName+"=([^&#]*)";
	    var regex = new RegExp( regexS );
	    var results = regex.exec( window.location.href );
	    if( results == null )
	        {return "";}
	    else
	        {return decodeURIComponent(results[1].replace(/\+/g, " "));}
	}
    
});