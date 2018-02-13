var LoaderHTML = '<div id="busyLoader" style="text-align: center;">'
			    + '<h2 style="text-align:center">'
			    + '<span id="busySpinner"></span>'
			    + '<img src="[SRA Root]/_layouts/AppDesigner/Apps/ApplicationDesigner/Images/ProcessDesigner.gif" style="vertical-align:middle;padding:5px">'
			    + '<br>'
			    + 'Loading...'
			    + '</h2>'
				+ '</div>';
var NotSavedCheck = false;
var SiteEditOnly = false;
var PermissionsOnly = false;
var ProjectBaseID = '';
$(function () {
	var FirstLoad = 0;	
	if(getParameterByName('SiteEditOnly') !=''){
			SiteEditOnly = true;
			ProjectBaseID = getParameterByName('ProjectID');
		}
	if(getParameterByName('PermissionsOnly') !=''){
			PermissionsOnly = true;
		}
	
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
				if(ui.newTab[0].innerText=='Permissions'){
						$('#Permissions').html(LoaderHTML);
					}
				else if(ui.newTab[0].innerText=='Site'){
						$('#Site').html(LoaderHTML);
					}	
						
			}else{
			event.preventDefault();
			$("#SaveCheck").dialog({
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
		    });
			
			$("#SaveCheck").dialog("open");
			}
					
			},
			activate: function( event, ui) {
				if(ui.newTab[0].innerText == 'Permissions'){
						PermissionsRender();
					}
				else if(ui.newTab[0].innerText =='Site'){
						SiteRender();
					}
			},
			create: function( event, ui ) {
				if(ui.tab[0].innerText == 'Permissions'){
						$('#Permissions').html(LoaderHTML);
						PermissionsRender();
					}
				else if(ui.tab[0].innerText =='Site'){
						$('#Site').html(LoaderHTML);
						SiteRender();
					}
			},

	});	
   if(SiteEditOnly){$( "#TabbedForm" ).tabs( "option", "disabled", [1] ); }
   if(PermissionsOnly){$( "#TabbedForm" ).tabs( "option", "disabled", [0] ); }
   
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
function SiteRender() {
var XmlLocation;
if(SiteEditOnly){XmlLocation= '[SRA Root]/Resources/EditSites/ProjectEdit-InfoReg.xml';}
else{XmlLocation= '[SRA Root]/Resources/EditSites/ProjectEdit-Info.xml';}

		$.ajax({
			 type:'POST',
	         dataType:'html',
	         url:ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
			data : {
				RequestType : 'BatchRequest',
				ConfigFileLocation: XmlLocation,
				XsltLocation: '[SRA Root]/Resources/EditSites/ProjectEdit-Info.xslt',
				CurrentID: ProjectBaseID,
				SiteType: SiteType, 
				OutputType : 'html'
			},
			success: function(html){
					$('#Site').html(html);
			},
			error : function (xhr, status, error) {
				alert("Error:\n" + xhr.responseText);
			}
	
		});	
}

function PermissionsRender() {
		$.ajax({
			 type:'POST',
	         dataType:'html',
	         url:ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
			data : {
				RequestType : 'BatchRequest',
				ConfigFileLocation: '[SRA Root]/Resources/EditSites/TeamMembers.xml',
				XsltLocation: '[SRA Root]/Resources/EditSites/TeamMembers.xslt',
				SiteType: SiteType,
				OutputType : 'html'
			},
			success: function(html){
					$('#Permissions').html(html);
										
			},
			error : function (xhr, status, error) {
				alert("Error:\n" + xhr.responseText);
			}
	
		});	    
}
