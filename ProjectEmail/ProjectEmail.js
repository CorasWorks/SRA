$(function () {
    $('.Cancel').button({ icons: { primary: "ui-icon-circle-close" } });
    $('.Save').button({icons: {secondary: "ui-icon-circle-check"}});
	//$("#testbox").chosen();   
    var definition;
    var SiteURL;
    var SiteTitle = '';
    var ListSchema = {};
    var selectedItems;
    var InputsHTML = '';
    var splitEndPoint = actionEndPoint.split("definitionUrl=");
    var correctEndPoint = splitEndPoint[0] +"definitionUrl="+ splitEndPoint[1].substring(splitEndPoint[1].indexOf("/")+1, splitEndPoint[1].length);
    //alert(actionEndPoint+'-'+ correctEndPoint);
    selectedItems = CWSGetSelectedListItems(webPartId);
    DocLoad();
    TeamMembersload();
    /*
    $.ajax({
        type: "GET",
        url: correctEndPoint,
        cache: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            definition = data.Definition;
            $.each(data.Fields,function(index,item){
	            var obj = $.parseJSON(this);
	            ListSchema[index] = obj.Field;
	        });
            //RenderForm();
            TeamMembersload();
        },
        error: function (data) { alert(data.responseText); }
    });
    */
    $('.Cancel').click(function (event) {
    	event.preventDefault();
    	parent.CWDialogCloseLaunchEmailRefresh();
    });   
    $('.Save').click(function (event) {
        event.preventDefault();
        if ($('#EmailTo').val() != '' && $('#EmailTo').val() != null){
            	var ToUsers = '';
            	$.each($('#EmailTo').val(),function(){
            		ToUsers += this + ';#;#';
            	});
        				docid = $('#LinkedDoc option:selected').data('url');
				docurl= $('#LinkedDoc option:selected').data('url');

			var ToWrite = '<ows:Batch OnError="Return">';
			ToWrite += '<Method ID="A1"><SetList>%EmailAlerts%</SetList><SetVar Name="ID">New</SetVar><SetVar Name="Cmd">Save</SetVar>';
			ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#EmailCC">%CWUID%;#</SetVar>';
			ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Title">'+SiteTitle+'</SetVar>';
			ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#EmailTo">'+ ToUsers +'</SetVar>';
			ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#EmailSubject">'+$('#EmailSubject').val()+'</SetVar>';
			if ($('#LinkedDoc').val() != 'None' && $('#LinkedDoc').val() != '' && $('#LinkedDoc').val() != 'undefined' && $('#LinkedDoc').val() != null){
			ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#LinkedDocURL">'+$('#LinkedDoc option:selected').data('url')+'</SetVar>';
			ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#LinkedDocTitle">'+$('#LinkedDoc').val()+'</SetVar>';
				}
			else{
			ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#LinkedDocURL">#</SetVar>';
			ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#LinkedDocTitle"></SetVar>';			
				}
			ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#EmailBody"><![CDATA['+ CKEDITOR.instances.EmailBody.getData()+']]></SetVar>';
			ToWrite +='</Method></ows:Batch>';
			$.ajax({
				type:'POST',
				dataType:'json',
				url:'../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
				data: { 
					RequestType: 'ProcessBatchData',
			 		ListTitle: 'EmailAlerts',
			 		SiteURL: '%SiteURL%',
					Batch: ToWrite,
					OutputType:'JSON'
					},
				error:function(xhr,status,error){
					alert('Error:\n' + xhr.responseText);
				},
				success:function(json) {
						if (json.NewDataSet.ProcessBatchData.Results.Result.Code){
							 EmailAction(json.NewDataSet.ProcessBatchData.Results.Result.ID[1]);
						}			
				}
			});

        
        }else{
        	alert('You must select a user to sent the email too.');
        }
    });
    function DocLoad() {    				
	   $.ajax({
	        url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		    data: { RequestType: 'BatchRequest', 
		    		ConfigFileLocation: '[SRA Root]/Resources/ProjectEmail/ProjectDocs.xml',
	    			OutputType:'JSON'
	    			},
	        dataType: 'json',
	        async: true,
	        cache: false,
	        type: 'POST',
	        success: function (json) {
	        		var DocOpt = '';
					if (json.NewDataSet.Documents.listitems["rs:data"].ItemCount == 0){
						DocOpt +='<option selected="selected" disabled="disabled">No Documents Available</option>'; 
					}
		            else{
		            	DocOpt +='<option selected="selected" disabled="disabled">Select a Document</option>';
		            	DocOpt +='<option data-url="None" value="None">None</option>';  
						if (json.NewDataSet.Documents.listitems["rs:data"].ItemCount == 1){
							DocOpt +='<option data-url="'+json.NewDataSet.Documents.listitems["rs:data"]["z:row"].ows_EncodedAbsUrl+'" value="'+json.NewDataSet.Documents.listitems["rs:data"]["z:row"].ows_LinkFilenameNoMenu+'">'+json.NewDataSet.Documents.listitems["rs:data"]["z:row"].ows_LinkFilenameNoMenu+'</option>'; 
						}					
						else{
							$.each(json.NewDataSet.Documents.listitems["rs:data"]["z:row"],function(index,item){
								DocOpt +='<option data-url="'+item.ows_EncodedAbsUrl+'" value="'+item.ows_LinkFilenameNoMenu+'">'+item.ows_LinkFilenameNoMenu+'</option>'; 
				        	});
						}
			        }
			        $("select#LinkedDoc").html(DocOpt);
	        
	        },
	        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	    });	

    
    }
    
    function TeamMembersload() {    				
	   $.ajax({
	        url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		    data: { RequestType: 'BatchRequest', 
		    		ConfigFileLocation: '[SRA Root]/Resources/ProjectEmail/TeamMembers.xml',
		    		XsltLocation: '[SRA Root]/Resources/ProjectEmail/TeamMembersClean.xslt',
	    			OutputType:'JSON'
	    			},
	        dataType: 'json',
	        async: true,
	        cache: false,
	        type: 'POST',
	        success: function (json) {
	        	//debugger;
	        	
	        	//var SiteTitle = '';
	        	//var SiteURl = '';
		        var EmailTo="";
		        var TeamMembers = [];
					if (json.NewDataSet.Count == 0){
						EmailTo+='<option selected="selected" disabled="disabled">No Team Members Loaded</option>'; 
					}
		            else{
						if (json.NewDataSet.Count == 1){
							SiteTitle= json.NewDataSet.SiteTitle;
							SiteURL= json.NewDataSet.SiteUrl;
							TeamMembers.push(json.NewDataSet.User);
							//var TeamMember= json.NewDataSet.TeamMembers.listitems["rs:data"]["z:row"].ows_SharePointUser.split(";#");
							//EmailTo+='<option value="'+TeamMember[0]+'">'+TeamMember[1]+'</option>'; 
						}					
						else{
							SiteTitle= json.NewDataSet.SiteTitle;
							SiteURL= json.NewDataSet.SiteUrl;					
							$.each(json.NewDataSet.User,function(index,item){
								TeamMembers.push(item);
								//var TeamMember= item.ows_SharePointUser.split(";#");
				        		//EmailTo+='<option value="'+TeamMember[0]+'">'+TeamMember[1]+'</option>';      	
				        	});
						}
						//debugger;
						$.each(TeamMembers,function(index,item){
							//TeamMembers.push(item.ows_SharePointUser);
							var TeamMember= item.split(";#");
			        		EmailTo+='<option value="'+TeamMember[0]+'">'+TeamMember[1]+'</option>';      	
			        	});	
			        }
			        /*
					if (json.NewDataSet.TeamMembers.listitems["rs:data"].ItemCount == 0){
						EmailTo+='<option selected="selected" disabled="disabled">No Team Members Loaded</option>'; 
					}
		            else{
						if (json.NewDataSet.TeamMembers.listitems["rs:data"].ItemCount == 1){
							SiteTitle= json.NewDataSet.TeamMembers.SiteTitle;
							SiteURL= json.NewDataSet.TeamMembers.SiteUrl;
							TeamMembers.push(json.NewDataSet.TeamMembers.listitems["rs:data"]["z:row"].ows_SharePointUser);
							//var TeamMember= json.NewDataSet.TeamMembers.listitems["rs:data"]["z:row"].ows_SharePointUser.split(";#");
							//EmailTo+='<option value="'+TeamMember[0]+'">'+TeamMember[1]+'</option>'; 
						}					
						else{
							SiteTitle= json.NewDataSet.TeamMembers.SiteTitle;
							SiteURL= json.NewDataSet.TeamMembers.SiteUrl;					
							$.each(json.NewDataSet.TeamMembers.listitems["rs:data"]["z:row"],function(index,item){
								TeamMembers.push(item.ows_SharePointUser);
								//var TeamMember= item.ows_SharePointUser.split(";#");
				        		//EmailTo+='<option value="'+TeamMember[0]+'">'+TeamMember[1]+'</option>';      	
				        	});
						}
						//debugger;
						$.each($.unique(TeamMembers),function(index,item){
							//TeamMembers.push(item.ows_SharePointUser);
							var TeamMember= item.split(";#");
			        		EmailTo+='<option value="'+TeamMember[0]+'">'+TeamMember[1]+'</option>';      	
			        	});	
			        }
		  */
		        /*
					else if (json.NewDataSet.TeamMembers.listitems["rs:data"].ItemCount == 1){
						SiteTitle= json.NewDataSet.TeamMembers.SiteTitle;
						SiteURL= json.NewDataSet.TeamMembers.SiteUrl;
						var TeamMember= json.NewDataSet.TeamMembers.listitems["rs:data"]["z:row"].ows_SharePointUser.split(";#");
						EmailTo+='<option value="'+TeamMember[0]+'">'+TeamMember[1]+'</option>'; 
					}					
					else{
						SiteTitle= json.NewDataSet.TeamMembers.SiteTitle;
						SiteURL= json.NewDataSet.TeamMembers.SiteUrl;					
						$.each(json.NewDataSet.TeamMembers.listitems["rs:data"]["z:row"],function(index,item){
							var TeamMember= item.ows_SharePointUser.split(";#");
			        		EmailTo+='<option value="'+TeamMember[0]+'">'+TeamMember[1]+'</option>';      	
			        	});
					}
				*/	
				$("select#EmailTo").html(EmailTo);
				//$('select#EmailTo').chosen({width: "100%"});
				$("select#EmailTo").pqSelect({
				    multiplePlaceholder: 'Select Team Members',    
				    checkbox: true,
				    width: '100%',
				    maxDisplay: 20    
				});
				//$('textarea#EmailBody').val('<br/><a href="'+SiteURl+'">Go To '+SiteTitle+'</>');
				//$('textarea#EmailBody').val('<br/><a href="%SiteURL%">Go To '+SiteTitle+'</>');
				$('#EmailSubject').val(SiteTitle +' - ');
				//alert( CKEDITOR.basePath );
				//$( 'textarea#EmailBody' ).ckeditor();
				CKEDITOR.replace('EmailBody', {
				    on: {
				        instanceReady: function( evt ) {
				        	//$('ul.chosen-choices li.search-field input.default').width('250px');
				            $('#busyLoader').hide();
							$('#ActionForm').show();
				        }  
				    }
				} );
				CKEDITOR.config.width = '99.8%';

				
					
				        	       	
	        },
	        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	    });	

    
    }
    function EmailAction(ID){
		$.ajax({
	        url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		    data: { RequestType: 'ExecuteAction',
				    ListTitle: 'EmailAlerts',
				    ActionUrl: '[SRA Root]/Actions%20Library/TeamEmail.cwad', 
		    		ItemIds: ID,
	    			OutputType:'JSON'
	    			},
	        dataType: 'json',
	        async: true,
	        cache: false,
	        type: 'POST',
	        success: function (json) {
	        	parent.CWDialogCloseLaunchEmailRefresh();    	       	
	        },
	        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	    });	

    }
    
});