var LoaderHTML = '<div id="busyLoader" style="text-align: center;">'
			    + '<h2 style="text-align:center">'
			    + '<span id="busySpinner"></span>'
			    + '<img src="[SRA Root]/_layouts/AppDesigner/Apps/ApplicationDesigner/Images/ProcessDesigner.gif" style="vertical-align:middle;padding:5px">'
			    + '<br>'
			    + 'Loading...'
			    + '</h2>'
			    //+ "Don't refresh the page, just wait patiently please"
				+ '</div>';
var NotSavedCheck = false;
var NotSavedCloseCheck = false;
var NotSavedCheckNewtab = -1;

/*temp
var ProjectSiteURL = '';

*/

$(function () {
/*temp
	if(getParameterByName('ProjectSite') !=''){
			ProjectSiteURL = getParameterByName('ProjectSite');
		}
	*/	
	$("#SaveCheck").dialog({
      autoOpen: false,
      modal: true     
    });
    $(".CancelMain").button({ icons: { primary: "ui-icon-circle-close" } }).click(function (event) {
		event.preventDefault();
		if(!NotSavedCheck){	
			parent.SP.UI.ModalDialog.commonModalDialogClose();	
		}else{
		$("#SaveCheck").dialog({
		  buttons : {
	        "Yes" : function() {
		        //NotSavedCheck = false;
		        NotSavedCloseCheck = true;
				var active = $( "#TabbedForm" ).tabs( "option", "active" );
				if(active===0){
						$( "#ProjectSave" ).trigger( "click" );
					}
				else if (active===1){
						$( "#CharterSave" ).trigger( "click" );
					}
				else if (active===2){
						$( "#ProCostsSave" ).trigger( "click" );
					}
				else if (active===3){
						$( "#BenefitsSave" ).trigger( "click" );
					}
				else if (active===4){
						$( "#ApprovalSave" ).trigger( "click" );
					}	
				else if (active===5){
						$( "#TeamMembersSave" ).trigger( "click" );
					}		        
				else if (active===6){
					}		        
				else if (active===7){
						$( "#TagsSave" ).trigger( "click" );
					}	
		        $(this).dialog("close");
	        },
	        "No" : function() {
		        NotSavedCheck = false;
		        parent.SP.UI.ModalDialog.commonModalDialogClose();
		        $(this).dialog("close");
	          
	        }
	      }      
	    });

		/*
		$("#SaveCheck").dialog({
		  buttons : {
	        "Confirm" : function() {
		        NotSavedCheck = false;
		        parent.SP.UI.ModalDialog.commonModalDialogClose();
		        $(this).dialog("close");
	        },
	        "Cancel" : function() {
		        $(this).dialog("close");
	          
	        }
	      }      
	    });
		*/
		$("#SaveCheck").dialog("open");
		}

    });    
	$("#StandardAlert").dialog({
      autoOpen: false,
      modal: true,
		buttons : {
		        "Ok" : function() {
			        $(this).dialog("close");
		        }
		      }           
    });    
	var FirstLoad = 0;	
	$('.ProjectTextArea').on('keyup',function(){
		$(this).next('div').children('span').text($(this).val().length);
	});					
	if(getParameterByName('LoadedTab') !='' && getParameterByName('LoadedTab') > -1){
			FirstLoad = getParameterByName('LoadedTab');
		}		
    $('#TabbedForm').tabs({
    		active: FirstLoad,
			beforeActivate: function( event, ui) {
			//debugger;
			if(!NotSavedCheck){	
				if(ui.newTab[0].innerText == 'Charter'){	
						$('#Charter').html(LoaderHTML);
					}
				else if(ui.newTab[0].innerText =='Project Costs'){
						$('#Resources').html(LoaderHTML);
					}
				else if(ui.newTab[0].innerText=='Project Approval'){
						$('#Approval').html(LoaderHTML);
					}
				else if(ui.newTab[0].innerText=='Milestones'){
						$('#Milestones').html(LoaderHTML);
					}			
				else if(ui.newTab[0].innerText=='Project Benefits'){
						$('#Benefits').html(LoaderHTML);
					}
				else if(ui.newTab[0].innerText=='Team Members'){
						$('#TeamMembers').html(LoaderHTML);
					}
				else if(ui.newTab[0].innerText=='Project'){
						$('#Project').html(LoaderHTML);
					}	
				else if(ui.newTab[0].innerText=='Tags'){
						$('#Tags').html(LoaderHTML);
					}	
						
			}else{
			event.preventDefault();
			$("#SaveCheck").dialog({
			  buttons : {
		        "Yes" : function() {
		        	NotSavedCloseCheck = true;
		        	NotSavedCheckNewtab = ui.newTab.index();
					var active = $( "#TabbedForm" ).tabs( "option", "active" );
					if(active===0){
							$( "#ProjectSave" ).trigger( "click" );
						}
					else if (active===1){
							$( "#CharterSave" ).trigger( "click" );
						}
					else if (active===2){
							$( "#ProCostsSave" ).trigger( "click" );
						}
					else if (active===3){
							$( "#BenefitsSave" ).trigger( "click" );
						}
					else if (active===4){
							$( "#ApprovalSave" ).trigger( "click" );
						}	
					else if (active===5){
							$( "#TeamMembersSave" ).trigger( "click" );
						}		        
					else if (active===6){
						}
					else if (active===7){
							$( "#TagsSave" ).trigger( "click" );
						}
					$(this).dialog("close");				        
		        },
		        "No" : function() {
			        NotSavedCheck = false;
			        $('#TabbedForm').tabs( "option", "active", ui.newTab.index());
			        $(this).dialog("close");         
		        }
		      }			
			/*
			  buttons : {
		        "Confirm" : function() {
			        NotSavedCheck = false;
			        $('#TabbedForm').tabs( "option", "active", ui.newTab.index());
			        $(this).dialog("close");
		        },
		        "Cancel" : function() {
			        $(this).dialog("close");
		          
		        }
		      } 
		     */      
		    });
			
			$("#SaveCheck").dialog("open");
			}
					
			},
			activate: function( event, ui) {
				if(ui.newTab[0].innerText == 'Charter'){
						NotSavedCheckNewtab = -1;
						CharterRender();
					}
				else if(ui.newTab[0].innerText =='Project Costs'){
						NotSavedCheckNewtab = -1;
						ResourcesRender();
					}
				else if(ui.newTab[0].innerText=='Project Approval'){
						NotSavedCheckNewtab = -1;
						ApprovalRender();
					}
				else if(ui.newTab[0].innerText=='Milestones'){
						NotSavedCheckNewtab = -1;
						MilestonesRender();
					}			
				else if(ui.newTab[0].innerText=='Project Benefits'){
						NotSavedCheckNewtab = -1;
						BenefitsRender();
					}
				else if(ui.newTab[0].innerText=='Team Members'){
						NotSavedCheckNewtab = -1;
						TeamMembersRender();
					}			
				else if(ui.newTab[0].innerText=='Project'){
						NotSavedCheckNewtab = -1;
						ProjectRender();
					}
				else if(ui.newTab[0].innerText=='Tags'){
						NotSavedCheckNewtab = -1;
						TagsRender();
					}

			},
			create: function( event, ui ) {
				if(ui.tab[0].innerText == 'Charter'){
						$('#Charter').html(LoaderHTML);
						CharterRender();
					}
				else if(ui.tab[0].innerText =='Project Costs'){
						$('#Resources').html(LoaderHTML);
						ResourcesRender();
					}
				else if(ui.tab[0].innerText=='Project Approval'){
						$('#Approval').html(LoaderHTML);
						ApprovalRender();
					}
				else if(ui.tab[0].innerText=='Milestones'){
						$('#Milestones').html(LoaderHTML);
						MilestonesRender();
					}						
				else if(ui.tab[0].innerText=='Project Benefits'){
						$('#Benefits').html(LoaderHTML);
						BenefitsRender();
					}
				else if(ui.tab[0].innerText=='Team Members'){
						$('#TeamMembers').html(LoaderHTML);
						TeamMembersRender();
					}						
				else if(ui.tab[0].innerText=='Project'){
						$('#Project').html(LoaderHTML);
						ProjectRender();
					}
				else if(ui.tab[0].innerText=='Tags'){
						$('#Tags').html(LoaderHTML);
						TagsRender();
					}	
			},

	});

    /*
    $('.Cancel').button({ icons: { primary: "ui-icon-circle-close" } });
    $('.Save').button({icons: {secondary: "ui-icon-circle-check"}});
    $('.HiddenToggle').button({
    	icons: { primary: "ui-icon-circle-triangle-e" }
    }).click(function(event){
    	event.preventDefault();
    	$(".ui-button-icon-primary", this).toggleClass("ui-icon-circle-triangle-s ui-icon-circle-triangle-e");
    	$('#HiddenParameters').slideToggle();
    });
    $('.Cancel').click(function (event) {
    	event.preventDefault();
    });
    
    $('.Save').click(function (event) {
        event.preventDefault();
    });
    */
    
});
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
function TagsRender() {
		$.ajax({
			 type:'POST',
	         dataType:'html',
	         url:ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
			data : {
				RequestType : 'BatchRequest',
				ConfigFileLocation: '[SRA Root]/Resources/ProjectEdit/ProjectEdit-Tags.xml',
				XsltLocation: '[SRA Root]/Resources/ProjectEdit/ProjectEdit-Tags.xslt',
				OutputType : 'html'
			},
			success: function(html){
					$('#Tags').html(html);
			},
			error : function (xhr, status, error) {
				alert("Error:\n" + xhr.responseText);
			}
	
		});	
}

function ProjectRender() {
		$.ajax({
			 type:'POST',
	         dataType:'html',
	         url:ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
			data : {
				RequestType : 'BatchRequest',
				ConfigFileLocation: '[SRA Root]/Resources/ProjectEdit/ProjectEdit-Info.xml',
				XsltLocation: '[SRA Root]/Resources/ProjectEdit/ProjectEdit-Info.xslt',
				OutputType : 'html'
			},
			success: function(html){
					$('#Project').html(html);
			},
			error : function (xhr, status, error) {
				alert("Error:\n" + xhr.responseText);
			}
	
		});	
}

function CharterRender() {
		$.ajax({
			 type:'POST',
	         dataType:'html',
	         url:ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
			data : {
				RequestType : 'BatchRequest',
				ConfigFileLocation: '[SRA Root]/Resources/ProjectEdit/ProjectEdit.xml',
				XsltLocation: '[SRA Root]/Resources/ProjectEdit/ProjectEdit-Charter.xslt',
				OutputType : 'html'
			},
			success: function(html){
					$('#Charter').html(html);
				    /*
				    $('#GoalStatement, #ProblemStatement, #CharterBusinessCase, #CharterScopeIncludes, #CharterScopeExcludes').change(function() {
					  	$('#CharterSave').button( "option", "disabled", false );
					  	NotSavedCheck = true;
					  	//).attr('disabled','disabled');
					});
					*/
			},
			error : function (xhr, status, error) {
				alert("Error:\n" + xhr.responseText);
			}
	
		});	
}
function ResourcesRender() {
		$.ajax({
			 type:'POST',
	         dataType:'html',
	         url:ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
			data : {
				RequestType : 'BatchRequest',
				ConfigFileLocation: '[SRA Root]/Resources/ProjectEdit/ProjectEdit-Resources.xml',
				XsltLocation: '[SRA Root]/Resources/ProjectEdit/ProjectEdit-Resources2.xslt',
				OutputType : 'html'
			},
			success: function(html){
					$('#Resources').html(html);					
			},
			error : function (xhr, status, error) {
				alert("Error:\n" + xhr.responseText);
			}
	
		});	    
}
function BenefitsRender() {
		$.ajax({
			 type:'POST',
	         dataType:'html',
	         url:ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
			data : {
				RequestType : 'BatchRequest',
				ConfigFileLocation: '[SRA Root]/Resources/ProjectEdit/ProjectEdit-Benefits.xml',
				XsltLocation: '[SRA Root]/Resources/ProjectEdit/ProjectEdit-Benefits2.xslt',
				OutputType : 'html'
			},
			success: function(html){
					$('#Benefits').html(html);					
			},
			error : function (xhr, status, error) {
				alert("Error:\n" + xhr.responseText);
			}
	
		});	    
}

function ApprovalRender() {
		$.ajax({
			 type:'POST',
	         dataType:'html',
	         url:ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
			data : {
				RequestType : 'BatchRequest',
				ConfigFileLocation: '[SRA Root]/Resources/ProjectEdit/ProjectEdit-Approval.xml',
				XsltLocation: '[SRA Root]/Resources/ProjectEdit/ProjectEdit-Approval.xslt',
				OutputType : 'html'
			},
			success: function(html){
					$('#Approval').html(html);
					/*
					$('#Approval').on('click','img.ApprovalCalIcon',function(){
						   $(this).next().datepicker('show');
					})
					$('input.ApprovalDate').datepicker({
						dateFormat: "mm-dd-yy",
						altField: "#sharePointDate",
						altFormat: "yy-mm-dd",
						onSelect: function(selectedDate){
							saveData('[SRA Root]','Projects',$(this).data('id'),$(this).data('column'),$('#sharePointDate').val(),$(this).data('message'));
						}
					});
					*/
										
			},
			error : function (xhr, status, error) {
				alert("Error:\n" + xhr.responseText);
			}
	
		});	    
}
function MilestonesRender() {
		$.ajax({
			 type:'POST',
	         dataType:'html',
	         url:ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
			data : {
				RequestType : 'BatchRequest',
				ConfigFileLocation: '[SRA Root]/Resources/ProjectEdit/MilestonesGrid.xml',
				XsltLocation: '[SRA Root]/Resources/ProjectEdit/MilestonesGrid.xslt',
				OutputType : 'html'
			},
			success: function(html){
					$('#Milestones').html(html);
										
			},
			error : function (xhr, status, error) {
				alert("Error:\n" + xhr.responseText);
			}
	
		});	    
}
function TeamMembersRender() {
		$.ajax({
			 type:'POST',
	         dataType:'html',
	         url:ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
			data : {
				RequestType : 'BatchRequest',
				ConfigFileLocation: '[SRA Root]/Resources/ProjectEdit/TeamMembers.xml',
				XsltLocation: '[SRA Root]/Resources/ProjectEdit/TeamMembers.xslt',
				ProjectSite: ProjectSiteURL,
				OutputType : 'html'
			},
			success: function(html){
					$('#TeamMembers').html(html);
										
			},
			error : function (xhr, status, error) {
				alert("Error:\n" + xhr.responseText);
			}
	
		});	    
}
function SaveCheck(){
$('<div></div>').appendTo('body')
    .html('<div><h6>Are you sure?</h6></div>')
    .dialog({
        modal: true,
        title: 'Delete message',
        zIndex: 10000,
        autoOpen: true,
        width: 'auto',
        resizable: false,
        buttons: {
            Yes: function () {
                // $(obj).removeAttr('onclick');                                
                // $(obj).parents('.Parent').remove();

                $(this).dialog("close");
            },
            No: function () {
                $(this).dialog("close");
            }
        },
        close: function (event, ui) {
            $(this).remove();
        }
    });
}
function CloseEditMain(){
//tripped on close check
	if(NotSavedCheckNewtab !=-1){
        $('#TabbedForm').tabs( "option", "active", NotSavedCheckNewtab);
        //$('#SaveCheck').dialog("close");	
	}
	else{
	    parent.SP.UI.ModalDialog.commonModalDialogClose();
	    //$('#SaveCheck').dialog("close");
	}
}
