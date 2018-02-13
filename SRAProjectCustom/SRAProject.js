var DefaultTags = '';

$(function () {
    $('#TabbedForm').tabs({ show: { effect: "slide",direction:"right", duration: 700 } });
    $('.Cancel').button({ icons: { primary: "ui-icon-circle-close" } });
    $('.Save').button({icons: {secondary: "ui-icon-circle-check"}});
    /*
    $('.HiddenToggle').button({
    	icons: { primary: "ui-icon-circle-triangle-e" }
    }).click(function(event){
    	event.preventDefault();
    	$(".ui-button-icon-primary", this).toggleClass("ui-icon-circle-triangle-s ui-icon-circle-triangle-e");
    	$('#HiddenParameters').slideToggle();
    });
    */
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
            //$.each(data.Fields,function(index,item){
	        //    var obj = $.parseJSON(this);
	        //    ListSchema[index] = obj.Field;
	        //});
            RenderForm();
        },
        error: function (data) { alert(data.responseText); }
    });

    $('.Cancel').click(function (event) {
    	event.preventDefault();
    	//CWSCloseActionForm(webDialogId);
    	parent.SP.UI.ModalDialog.commonModalDialogClose();
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
				ToWrite += '<Method ID="A1"><SetList>%Projects%</SetList><SetVar Name="ID">New</SetVar><SetVar Name="Cmd">Save</SetVar>';
				ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#TeamLeader">'+CurrentUserID +'</SetVar>';
				ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Title">'+ $("#Title").val()+'</SetVar>';
				ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#SiteStatus">Build in Progress</SetVar>';
				ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Division">'+ $("#Division option:selected").val()+'</SetVar>';
				ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Region">'+ $("#Region option:selected").val()+'</SetVar>';
				ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Location">'+ $("#Location option:selected").val()+'</SetVar>';
				ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#ParentID">'+ $("#Location option:selected").attr("OPTid")+'</SetVar>';
				ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#ProjectSecurity">'+ $("#ProjectSecurity option:selected").val()+'</SetVar>';
				ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#_x002a__x002a__x002a_wplu_x002a_"><![CDATA[<Properties><Property><LookupKeyValue></LookupKeyValue><LookupLinkValue></LookupLinkValue><LookupDbStoreValue>'+ $("#ProjectSecurity option:selected").val()+'</LookupDbStoreValue><LookupDisplayValue>'+ $("#ProjectSecurity option:selected").val()+'</LookupDisplayValue></Property></Properties>]]></SetVar>';
				ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#ProjectStatus">Proposed</SetVar>';
				ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#_x002a__x002a__x002a_wplu_x002a_2"><![CDATA[<Properties><Property><LookupKeyValue></LookupKeyValue><LookupLinkValue></LookupLinkValue><LookupDbStoreValue>Proposed</LookupDbStoreValue><LookupDisplayValue>Proposed</LookupDisplayValue></Property></Properties>]]></SetVar>';				
				ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#adhoctagging">'+DefaultTags+'</SetVar>';
		//		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Methodology">'+ $("#Methodology option:selected").val()+'</SetVar>';
		//		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#_x002a__x002a__x002a_wplu_x002a_0"><![CDATA[<Properties><Property><LookupKeyValue></LookupKeyValue><LookupLinkValue></LookupLinkValue><LookupDbStoreValue>'+ $("#Methodology option:selected").val()+'</LookupDbStoreValue><LookupDisplayValue>'+ $("#Methodology option:selected").val()+'</LookupDisplayValue></Property></Properties>]]></SetVar>';
		//		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#MapID">'+ $("#Methodology option:selected").attr("OPTid")+'</SetVar>';
				if($("#Category option:selected").val()!='Select a Category'){
				ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Category">'+ $("#Category option:selected").val()+'</SetVar>';
				ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#_x002a__x002a__x002a_wplu_x002a_1"><![CDATA[<Properties><Property><LookupKeyValue></LookupKeyValue><LookupLinkValue></LookupLinkValue><LookupDbStoreValue>'+ $("#Category option:selected").val()+'</LookupDbStoreValue><LookupDisplayValue>'+ $("#Category option:selected").val()+'</LookupDisplayValue></Property></Properties>]]></SetVar>';				
				}
				//ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#ProjectStartDate">'+ $.datepicker.formatDate('yy-mm-dd', $("#ProjectStartDate").datepicker('getDate')) +'T12:00:00Z</SetVar>';
				ToWrite +='</Method></ows:Batch>';
				$.ajax({
					type:'POST',
					dataType:'json',
					url:'../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
					data: { 
						RequestType: 'ProcessBatchData',
				 		ListTitle: 'Projects',
				 		SiteURL: '[SRA Root]',
						Batch: ToWrite,
						OutputType:'JSON'
						},
					error:function(xhr,status,error){
						alert('Error:\n' + xhr.responseText);
					},
					success:function(json) {
							if (json.NewDataSet.ProcessBatchData.Results.Result.Code){
								 CreateSiteBuilderItem(json.NewDataSet.ProcessBatchData.Results.Result.ID[1]);
							}			
					}
				});
			}	
			else{
			alert('Project Name contains an illegal character. Please remove any of the following characters. &  "  ' + " ' ");
			parent.SP.UI.ModalDialog.commonModalDialogClose();
			}
	
		}
		else{
		alert('Missing required field(s): ' + MissingFields);
		parent.SP.UI.ModalDialog.commonModalDialogClose();
		}
    });
    function CreateSiteBuilderItem(ID) {
		var ToWrite = '<ows:Batch OnError="Return">';
		ToWrite += '<Method ID="A1"><SetList>%Site Builder Tasks%</SetList><SetVar Name="ID">New</SetVar><SetVar Name="Cmd">Save</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Title">'+ $("#Title").val()+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#SiteType">Pro</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Template">SRA.Project.7.8.2015</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#ParentURL">'+ $("#Location option:selected").attr("LocURL")+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#ListID">'+ID+'</SetVar>';
		ToWrite +='</Method></ows:Batch>';
		$.ajax({
			type:'POST',
			dataType:'json',
			url:'../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
			data: { 
				RequestType: 'ProcessBatchData',
		 		ListTitle: 'Site Builder Tasks',
		 		SiteURL: '[SRA Root]',
				Batch: ToWrite,
				OutputType:'JSON'
				},
			error:function(xhr,status,error){
				alert('Error:\n' + xhr.responseText);
			},
			success:function(json) {
				alert('Your request is being processed. You will receive an email once it is complete.');
				parent.SP.UI.ModalDialog.commonModalDialogClose();
				parent.window.location = parent.SRABase + '/AppPages/myProjects.aspx?GUID=fff62001-602e-42aa-a3a0-d8788370d546-199';
				parent.SP.UI.ModalDialog.commonModalDialogClose();		
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
			    		ConfigFileLocation: '%ISiteURL%/Resources/SRAProjectCustom/SRAProjectFieldData.xml', 
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

					if (json.NewDataSet.ProjectSecurity.listitems["rs:data"].ItemCount == 0){
						ProjectSecurityItems+='<option selected="selected" disabled="disabled">No Project Security Loaded</option>'; 
					}
					else if (json.NewDataSet.ProjectSecurity.listitems["rs:data"].ItemCount == 1){
			        		ProjectSecurityItems+='<option OPTid="'+json.NewDataSet.Division.listitems["rs:data"]["z:row"].ows_ID+'" value="'+json.NewDataSet.Division.listitems["rs:data"]["z:row"].ows_Title+'"';
			        		if (json.NewDataSet.Division.listitems["rs:data"]["z:row"].ows_Title == 'Restricted'){ProjectSecurityItems+='selected="selected"';}	        		
			        		ProjectSecurityItems+='>'+json.NewDataSet.Division.listitems["rs:data"]["z:row"].ows_Title+'</option>'; 					}					
					else{
			        	$.each(json.NewDataSet.ProjectSecurity.listitems["rs:data"]["z:row"],function(index,item){
			        		ProjectSecurityItems+='<option OPTid="'+item.ows_ID+'" value="'+item.ows_Title+'"';
			        		if (item.ows_Title == 'Restricted'){ProjectSecurityItems+='selected="selected"';}	        		
			        		ProjectSecurityItems+='>'+item.ows_Title+'</option>';      	
			        	});
					}
/*
					if (json.NewDataSet.Methodology.listitems["rs:data"].ItemCount == 0){
						MethodologyItems+='<option selected="selected" disabled="disabled">No Methodology Loaded</option>'; 
					}
					else if (json.NewDataSet.Methodology.listitems["rs:data"].ItemCount == 1){
						MethodologyItems+='<option OPTid="'+json.NewDataSet.Methodology.listitems["rs:data"]["z:row"].ows_ID+'" value="'+json.NewDataSet.Methodology.listitems["rs:data"]["z:row"].ows_Title+'">'+json.NewDataSet.Methodology.listitems["rs:data"]["z:row"].ows_Title+'</option>'; 
					}					
					else{
			        	$.each(json.NewDataSet.Methodology.listitems["rs:data"]["z:row"],function(index,item){
			        		MethodologyItems+='<option OPTid="'+item.ows_ID+'" value="'+item.ows_Title+'">'+item.ows_Title+'</option>';      	
			        	});
					}
*/	
					if (json.NewDataSet.Category.listitems["rs:data"].ItemCount == 0){
						CategoryItems+='<option selected="selected" disabled="disabled">No Divisions Loaded</option>'; 
					}
					else if (json.NewDataSet.Category.listitems["rs:data"].ItemCount == 1){
						CategoryItems+='<option OPTid="'+json.NewDataSet.Category.listitems["rs:data"]["z:row"].ows_ID+'" value="'+json.NewDataSet.Category.listitems["rs:data"]["z:row"].ows_Title+'">'+json.NewDataSet.Category.listitems["rs:data"]["z:row"].ows_Title+'</option>'; 
					}					
					else{
			        	$.each(json.NewDataSet.Category.listitems["rs:data"]["z:row"],function(index,item){
			        		CategoryItems+='<option OPTid="'+item.ows_ID+'" value="'+item.ows_Title+'">'+item.ows_Title+'</option>';      	
			        	});
					}

		        	
					$("select#Division").append(DivisionItems);
					$("select#ProjectSecurity").append(ProjectSecurityItems);
/*					
					$("select#Methodology").append(MethodologyItems);
*/	
					$("select#Category").append(CategoryItems);
				
					$("input#ProjectStartDate").datepicker();
					
					$('select#Division').change(function (event) {
						DivisionChange($("option:selected", this).attr("OPTid"));
				    });
    				
				    	$('#busyLoader').hide();
    					$('#ActionForm').show();

  
		        },
		        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
		
		    });
    	
    	/*
    	$.each(definition._actionParams,function(){
    		if(this._valueFromUser==true) {
	    		var InputID = this._name.replace(/\s+/g,'');
	    		var InputName = (this._alternateTitle=='') ? this._name : this._alternateTitle;
	    		FormHTML += '<label for="' + InputName + '">' + InputName;
	    		if(this._required==true)
	    			FormHTML += '<sup class="CWRequired">*</sup>';
	    		FormHTML += '</label>';
				FormHTML += '<input type="text" class="CWInput" id="' + InputID + '" name="' + InputName + '" data-ActionParam="' + this._name + '"';
				if(this._value!='')
					FormHTML += ' value="' + this._value + '"';
				if(this._readOnly==true)
					FormHTML += ' disabled="disabled"';
				FormHTML += '><br/>';
	    		if(this._description!='')
	    			FormHTML += '<span class="CWFormDescription">' + this._description + '</span><br/>';
	    	}
    	});
    	HiddenParamsHTML = '<ul><li>Action is updating the List/Library "' + definition._listTitle + '"</li>';
    	$.each(definition._actionParams,function(){
    		if(this._valueFromUser==false) {
    			HiddenParamsHTML += '<li>Field "' + this._name + '" will be set to "' + this._value + '"</li>';
    		}
    	});
    	HiddenParamsHTML += '<li>On success, the message "' + definition._onSuccessMessage + '" could be displayed</li>';
    	HiddenParamsHTML += '<li>On error, the message "' + definition._onErrorMessage + '" could be displayed</li></ul>';
    	$('#DynamicForm').html(FormHTML);
    	$('#HiddenParameters').html(HiddenParamsHTML);
    	*/
    }
    function DivisionChange(ID) {
    DivisionChangeTags(ID);
    $("select#Location").html('<option selected="selected" disabled="disabled">Select a Location</option>');
    $('select#Location').prop('disabled', 'disabled');
    				
	   $.ajax({
	        url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		    data: { RequestType: 'BatchRequest', 
		    		ConfigFileLocation: '%ISiteURL%/Resources/SRAProjectCustom/SRAProjectRegion.xml',
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
				$('select#Region').change(function (event) {
					RegionChange($("option:selected", this).attr("OPTid"));
			    });
					
				        	       	
	        },
	        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	    });	

    
    }
    function DivisionChangeTags(ID) {    				
	   $.ajax({
	        url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		    data: { RequestType: 'BatchRequest', 
		    		ConfigFileLocation: '%ISiteURL%/Resources/SRAProjectCustom/SRAProjectTags.xml',
		    		PSelectValue: ID, 
	    			OutputType:'JSON'
	    			},
	        dataType: 'json',
	        async: true,
	        cache: false,
	        type: 'POST',
	        success: function (json) {
					if (json.NewDataSet.Tags.listitems["rs:data"].ItemCount == 0){
						DefaultTags ='';
					}
					else if (json.NewDataSet.Tags.listitems["rs:data"].ItemCount == 1){
							DefaultTags = ';#'+json.NewDataSet.Tags.listitems["rs:data"]["z:row"].ows_Title+'##';
					}		
					else{
						DefaultTags ='';
			        	$.each(json.NewDataSet.Tags.listitems["rs:data"]["z:row"],function(index,item){
			        		DefaultTags += ';#'+item.ows_Title+'##';     	
			        	});
					}					
					console.log(DefaultTags);						
				        	       	
	        },
	        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	    });	

    
    }
    
    function RegionChange(ID) {				
	   $.ajax({
	        url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		    data: { RequestType: 'BatchRequest', 
		    		ConfigFileLocation: '%ISiteURL%/Resources/SRAProjectCustom/SRAProjectLocation.xml',
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
						LocationItems+='<option LocURL="'+json.NewDataSet.Location.listitems["rs:data"]["z:row"].ows_URL+'" OPTid="'+json.NewDataSet.Location.listitems["rs:data"]["z:row"].ows_ID+'" value="'+json.NewDataSet.Location.listitems["rs:data"]["z:row"].ows_Title+'">'+json.NewDataSet.Location.listitems["rs:data"]["z:row"].ows_Title+'</option>'; 
					}					
					else{
						LocationItems+='<option selected="selected" disabled="disabled">Select a Location</option>';
						$.each(json.NewDataSet.Location.listitems["rs:data"]["z:row"],function(index,item){
			        		LocationItems+='<option LocURL="'+item.ows_URL+'" OPTid="'+item.ows_ID+'" value="'+item.ows_Title+'">'+item.ows_Title+'</option>';      	
			        	});
					}
				$("select#Location").html(LocationItems);
				$('select#Location').prop('disabled', false);					
				        	       	
	        },
	        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	    });	

    
    }
    
});