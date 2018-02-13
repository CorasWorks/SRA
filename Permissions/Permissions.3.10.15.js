var CurrentProID = '';
var CurrentProURL = '';
var CurrentLeader = '';
var InitalRun = true;
$(document).ready(function () {
/*
	$('#Testing').button().click(function(){
		WritePermissions();
		return false;
	});
	$('#Testing1').button().click(function(){
		GetUsers();
		return false;
	});
	$('#Testing2').button().click(function(){
		GetPermissionLevels();
		return false;
	});
	*/
	
});
function SetPermissionsInital(URL, ID, Leader){
//URL = 'http://corning.corasworks.net/sites/sra/basetemp';
if (Leader!= ''){
BuildProjectUser(URL,Leader,'Team Leader', ID, true);
}
else{
alert('Team leader not set. Permissions not set.');
}
}

function BuildProjectUser(URL,UserID,Role,ID,Inital){
var ToWrite = '';
					ToWrite = '<ows:Batch OnError="Return">';
					ToWrite += '<Method ID="A1"><SetList>%Team Members%</SetList><SetVar Name="ID">New</SetVar><SetVar Name="Cmd">Save</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#SharePointUser">'+UserID+'</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Role">'+Role+'</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#_x002a__x002a__x002a_wplu_x002a_">';
					ToWrite += '<![CDATA[<Properties><Property><LookupKeyValue></LookupKeyValue><LookupLinkValue></LookupLinkValue><LookupDbStoreValue>'+Role+'</LookupDbStoreValue><LookupDisplayValue>'+Role+'</LookupDisplayValue></Property></Properties>]]>';
					ToWrite += '</SetVar>';
					//<![CDATA[<Properties><Property><LookupKeyValue></LookupKeyValue><LookupLinkValue></LookupLinkValue><LookupDbStoreValue>Black Belt</LookupDbStoreValue><LookupDisplayValue>Black Belt</LookupDisplayValue></Property></Properties>]]>
					ToWrite +='</Method>';
					ToWrite +='</ows:Batch>';

					$.ajax({
						type: 'POST',
						url: URL + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
						data: { RequestType: 'ProcessBatchData',
						 		ListTitle: 'Team Members',
						 		//SiteUrl: item.TOURL,
								Batch: ToWrite,
								OutputType: 'json' },
						dataType: 'json',
						cache: false,
						async : true,
						success:function(json){
							//alert('Done!')
							//refreshGrid();
							if(Inital){
							SetPermissionsOLD(URL, ID);
							}
							else{
							ReSetPermissions(URL, ID);
							}							
				        },
				
						//success: ResetPage,
						error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
				
					});

}
function DeleteProjectUser(URL,ID){
var ToWrite = '';
					ToWrite = '<ows:Batch OnError="Return">';
					ToWrite += '<Method ID="A1"><SetList>%Team Members%</SetList><SetVar Name="ID">'+ID+'</SetVar><SetVar Name="Cmd">Delete</SetVar>';
					ToWrite +='</Method>';
					ToWrite +='</ows:Batch>';

					$.ajax({
						type: 'POST',
						url: URL + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
						data: { RequestType: 'ProcessBatchData',
						 		ListTitle: 'Team Members',
								Batch: ToWrite,
								OutputType: 'json' },
						dataType: 'json',
						cache: false,
						async : true,
						success:function(json){
							//alert('Done!')
							//refreshGrid();
							//SetPermissionsOLD(URL, ID);							
				        },
				
						//success: ResetPage,
						error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
				
					});

}

function SetPermissionsOLD(URL, ID){
//URL = 'http://corning.corasworks.net/sites/sra/basetemp';
BreakRoleInheritance(URL, ID);
}
function ReSetPermissions(URL, ID){
//URL = 'http://corning.corasworks.net/sites/sra/basetemp';
ResetRoleInheritance(URL, ID);
}

function BreakRoleInheritance(URL, ID) {
	$.ajax({
		type: 'POST',
		url: URL + '/_api/web/breakroleinheritance',
		headers: { 
        "accept": "application/json; odata=verbose", 
        "content-type":"application/json;odata=verbose",
        //"content-length": <length of post body>,
        "X-RequestDigest": $("#__REQUESTDIGEST").val() 
    	},
		//dataType: 'xml',
		cache: false,
		success:function(json){
				$.ajax({
					 type:'POST',
			         dataType:'json',
			         url:URL + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
					data : {
						RequestType : 'BatchRequest',
						ConfigFileLocation: '[SRA Root]/Resources/Permissions/SitePermissions.xml',
						XsltLocation: '[SRA Root]/Resources/Permissions/SitePermissions.xslt',
						OutputType : 'json'
					},
					success: function(json){
						if (json.NewDataSet.count == 0)
								{
								alert('Users Not Found');
								}
							else if (json.NewDataSet.count == 1) {
								//alert(json.NewDataSet.User.UserSCID);
								SetUsersPermissions(URL, json.NewDataSet.User.UserSCID, json.NewDataSet.User.PremRole);
								if(ID != 'reset'){
									SetTeamMembersField(URL,true);
									}
								else{
									SetTeamMembersField(URL,false);
									}	
								
							}
							else {
								$.each(json.NewDataSet.User,function(index,item) {
									//alert(item.UserSCID);
									SetUsersPermissions(URL, item.UserSCID, item.PremRole);
								});
								if(ID != 'reset'){
									SetTeamMembersField(URL,true);
									}
								else{
									SetTeamMembersField(URL,false);
									}	
							}
			
					},
					error : function (xhr, status, error) {
						alert("Error:\n" + xhr.responseText);
					}
			
				});	
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}

	});
	
}
function ResetRoleInheritance(URL, ID) {
	$.ajax({
		type: 'POST',
		url: URL + '/_api/web/resetroleinheritance',
		headers: { 
        "accept": "application/json; odata=verbose", 
        "content-type":"application/json;odata=verbose",
        //"content-length": <length of post body>,
        "X-RequestDigest": $("#__REQUESTDIGEST").val() 
    	},
		//dataType: 'xml',
		cache: false,
		success:function(json){
				BreakRoleInheritance(URL, 'reset');
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}

	});
	
}

function setPremDone(ID){
var ToWrite = '';
					ToWrite = '<ows:Batch OnError="Return">';
					ToWrite += '<Method ID="A1"><SetList>%Projects%</SetList><SetVar Name="ID">'+ID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#SecurityApplied">Yes</SetVar>';
					ToWrite +='</Method>';
					ToWrite +='</ows:Batch>';

					$.ajax({
						type: 'POST',
						url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
						data: { RequestType: 'ProcessBatchData',
						 		ListTitle: 'Projects',
						 		//SiteUrl: item.TOURL,
								Batch: ToWrite,
								OutputType: 'json' },
						dataType: 'json',
						cache: false,
						async : true,
						success:function(json){
							//alert('Done!')
							refreshGrid();
							SP.UI.ModalDialog.commonModalDialogClose();							
				        },
				
						//success: ResetPage,
						error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
				
					});

}
function refreshGrid()
{
	var masterTable = $find(GetMyIDCorasWorksGrid()).get_masterTableView();       
	masterTable.rebind();    
}

function SetUsersPermissions(URL, UserID, RoleID) {
	$.ajax({
		type: 'POST',
		url:  URL + '/_api/web/roleassignments/addroleassignment(principalid='+UserID+',roleDefId='+RoleID+')',
		headers: { 
        "accept": "application/json; odata=verbose", 
        "content-type":"application/json;odata=verbose",
        //"content-length": <length of post body>,
        "X-RequestDigest": $("#__REQUESTDIGEST").val() 
    	},
		dataType: 'json',
		cache: false,
		async : true,
		success:function(json){
			//alert('Done!')							
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}

	});
	
}




///testing functions
function SetUsers(URl,ID) {
	$.ajax({
		type: 'POST',
		url:  URl + '_api/web/roleassignments/addroleassignment(principalid=3,roleDefId=1073741829)',
		headers: { 
        "accept": "application/json; odata=verbose", 
        "content-type":"application/json;odata=verbose",
        //"content-length": <length of post body>,
        "X-RequestDigest": $("#__REQUESTDIGEST").val() 
    	},
		dataType: 'json',
		cache: false,
		async : true,
		success:function(json){
			GetUsers(ID);							
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}

	});
	
}

function GetUsers(ID) {
	$.ajax({
		 type:'POST',
         dataType:'json',
         url:'../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'GetListItems',
			TableName: 'Project',
			ListTitle: 'Test Site List',
			CAML :'<Query><Where><Contains><FieldRef Name="ID" /><Value Type="Text">'+ ID +'</Value></Contains></Where></Query>',
			OutputType : 'json'
		},
		success: SetBase,
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});
}

function SetBase(json) {
	if (json.NewDataSet.Project.listitems['rs:data'].ItemCount == 0)
		{
		alert('No Users Found');
		}
	else if (json.NewDataSet.Project.listitems['rs:data'].ItemCount == 1) {
		//need to adjust to find ID
		SetUsersPermissions(json.NewDataSet.SiteList.listitems['rs:data']['z:row'].ows_SiteURL, json.NewDataSet.SiteList.listitems['rs:data']['z:row'].ows_User1);
	}
	else {
			sitecount = json.NewDataSet.SiteList.listitems['rs:data'].ItemCount;
			$.each(json.NewDataSet.Project.listitems['rs:data']['z:row'],function(index,item) {
				SetUsersPermissions(item.ows_SiteURL, item.ows_User1);

			BuildData(item.ows_VehicleSiteURL,item.ows_SiteType);	
			});
	
	}
	//then fire the wirte to flip the flag
}

function LaunchProjectEditAction(URL, Title, ProID, ProURL, Inital) {
	CurrentProURL = ProURL; 
	CurrentProID = ProID;
	InitalRun =  Inital;
    var CWDialogOptions = {
        url: URL,
        title: Title,
        allowMaximize: true,
        showClose: true,
        autoSize:true,
        dialogReturnValueCallback: CWDialogCloseProjectEditActionRefresh
    };
    SP.UI.ModalDialog.showModalDialog(CWDialogOptions);
}
function CWDialogCloseProjectEditActionRefresh()
{
	SP.UI.ModalDialog.commonModalDialogClose();
	SP.UI.ModalDialog.showWaitScreenWithNoClose(SP.Res.dialogLoading15);
	//refreshGrid();
	$.ajax({
		 type:'POST',
         dataType:'json',
         url:'../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'BatchRequest',
			ConfigFileLocation: '[SRA Root]/Resources/Permissions/SitePermissionsCheck.xml',
			XsltLocation: '[SRA Root]/Resources/Permissions/SitePermissionsCheck.xslt',
			ProURL: CurrentProURL,
			ProID: CurrentProID,
			OutputType : 'json'
		},
		success: function(json){
			if (json.NewDataSet.deleteYes != 0)
					{
					SP.UI.ModalDialog.commonModalDialogClose();
					SP.UI.ModalDialog.showWaitScreenWithNoClose('Setting Permissions', '');
						if (json.NewDataSet.count == 0)
								{
								//alert('Users Not Found');
								}
							else if (json.NewDataSet.count == 1) {
								//alert(json.NewDataSet.User.UserSCID);
								//SetUsersPermissions(URL, json.NewDataSet.User.ProUserID, json.NewDataSet.User.PremRole);
								DeleteProjectUser(CurrentProURL,json.NewDataSet.User.ProUserID);
								GetCurrentTL();
								
							}
							else {
								$.each(json.NewDataSet.User,function(index,item) {
									//alert(item.UserSCID);
									//SetUsersPermissions(URL, item.UserSCID, item.PremRole);
									DeleteProjectUser(CurrentProURL,item.ProUserID);
								});
								GetCurrentTL();
							}
	
						}
			else {		
					if (json.NewDataSet.count == 0 && json.NewDataSet.CurrentLead != '')
								{
								SP.UI.ModalDialog.commonModalDialogClose();
								SP.UI.ModalDialog.showWaitScreenWithNoClose('Setting Permissions', '');
								BuildProjectUser(CurrentProURL,json.NewDataSet.CurrentLead,'Team Leader', CurrentProID , InitalRun);
								
								
								//GetCurrentTL();
								}
					else{
					
					SP.UI.ModalDialog.commonModalDialogClose();
					alert('Team leader not set. Permissions not changed.');
					}			

				}		

		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});	
	
}
function GetCurrentTL(){
	$.ajax({
		 type:'POST',
         dataType:'json',
         url:'../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'GetListItems',
			TableName: 'Project',
			ListTitle: 'Projects',
			SiteUrl: '[SRA Root]',
			CAML: '<Query><Where><Eq><FieldRef Name="ID"/><Value Type="Text">'+CurrentProID+'</Value></Eq></Where></Query><QueryOptions><ViewFieldsOnly>True</ViewFieldsOnly><DateInUtc>TRUE</DateInUtc></QueryOptions>',
			OutputType : 'json'
		},
		success: function(json){
				if (json.NewDataSet.Project.listitems['rs:data'].ItemCount == 0)
						{
						//alert('No Vehicles found');
						}
					else if (json.NewDataSet.Project.listitems['rs:data'].ItemCount == 1) {
							BuildProjectUser(CurrentProURL,json.NewDataSet.Project.listitems['rs:data']['z:row'].ows_TeamLeader,'Team Leader', CurrentProID, InitalRun);
						}
					else{
						}	
		
		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});

}
function LaunchTeamMemberAction(URL, Title,ProURL) {
	CurrentProURL = ProURL; 
    var CWDialogOptions = {
        url: URL,
        title: Title,
        allowMaximize: true,
        showClose: true,
        autoSize:true,
        dialogReturnValueCallback: CWDialogCloseTeamMemberActionRefresh
    };
    SP.UI.ModalDialog.showModalDialog(CWDialogOptions);
}
function CWDialogCloseTeamMemberActionRefresh()
{
	SP.UI.ModalDialog.commonModalDialogClose();
	SP.UI.ModalDialog.showWaitScreenWithNoClose('Setting Permissions', '');
	//refreshGrid();
	ResetRoleInheritance(CurrentProURL, 'reset');
	
}
function SetTeamMembersField(URL, Inital){
	$.ajax({
		 type:'POST',
         dataType:'json',
         url:'../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'BatchRequest',
			ConfigFileLocation: '[SRA Root]/Resources/Permissions/SetTeamMembersField.xml',
			XsltLocation: '[SRA Root]/Resources/Permissions/SetTeamMembersField.xslt',
			SiteUrl: '[SRA Root]',
			ProURL: URL,
			OutputType : 'json'
		},
		success: function(json){
		
					var ToWrite = '';
					ToWrite = '<ows:Batch OnError="Return">';
					ToWrite += '<Method ID="A1"><SetList>%Projects%</SetList><SetVar Name="ID">'+json.NewDataSet.SiteR.ProUserID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#TeamMembers">'+json.NewDataSet.Users.ProTeamMembers+'</SetVar>';
					if (Inital){ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#SecurityApplied">Yes</SetVar>';}
					ToWrite +='</Method>';
					ToWrite +='</ows:Batch>';
					
					$.ajax({
						type: 'POST',
						url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
						data: { RequestType: 'ProcessBatchData',
						 		ListTitle: 'Projects',
						 		SiteUrl: '[SRA Root]',
								Batch: ToWrite,
								OutputType: 'json' },
						dataType: 'json',
						cache: false,
						async : true,
						success:function(json){
							//alert('Done!')
							refreshGrid();
							SP.UI.ModalDialog.commonModalDialogClose();							
				        },
				
						//success: ResetPage,
						error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
				
					});
	
		
		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});

}

