var CurrentProID = '';
var CurrentProURL = '';
var CurrentLeader = '';
var AppDesignOBJ = new Array();
var AppDesignID = '';
var UsersArray = new Array();
var InitalRun = true;
var FirstLoad = false;

$(document).ready(function () {
	
});
function SetPermissionsInital(URL, ID, Leader){
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
							if(Inital){
							//GetCurrentProjectRecord(URL, ID);
							BreakRoleInheritance(URL, ID);
							}
							else{
							ResetRoleInheritance(URL, ID);
							}							
				        },				
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
						
				        },
						error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
				
					});

}
function BreakRoleInheritance(URL, ID) {
GetAppDesigner(URL);
UsersArray = new Array();

	$.ajax({
		type: 'POST',
		url: URL + '/_api/web/breakroleinheritance',
		headers: { 
        "accept": "application/json; odata=verbose", 
        "content-type":"application/json;odata=verbose",
        "X-RequestDigest": $("#__REQUESTDIGEST").val() 
    	},  	
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
					//debugger;
						if (json.NewDataSet.count == 0)
								{
								alert('Users Not Found');
								}
							else if (json.NewDataSet.count == 1) {
								GetCurrentProjectRecord(URL, ID);
								if(json.NewDataSet.User.UserRoleName == 'Team Leader'){
									createJSON(UsersArray, json.NewDataSet.User.UserSCID, json.NewDataSet.User.UserSCName);
									}
								SetUsersPermissions(URL, json.NewDataSet.User.UserSCID, json.NewDataSet.User.PremRole);
								if(ID != 'reset'){
									SetTeamMembersField(URL,true);
									}
								else{
									SetTeamMembersField(URL,false);
									}	
								
							}
							else {
								GetCurrentProjectRecord(URL, ID);
								$.each(json.NewDataSet.User,function(index,item) {
									if(item.UserRoleName == 'Team Leader'){
										createJSON(UsersArray, item.UserSCID, item.UserSCName);
										}
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
        "X-RequestDigest": $("#__REQUESTDIGEST").val() 
    	},
		cache: false,
		success:function(json){
				BreakRoleInheritance(URL, 'reset');
				//GetCurrentProjectRecord(URL, 'reset');
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
							if (FirstLoad){
								window.location = window.location;
								}
							else{	
								refreshGrid();
								}
							SP.UI.ModalDialog.commonModalDialogClose();							
				        },
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
        "X-RequestDigest": $("#__REQUESTDIGEST").val() 
    	},
		dataType: 'json',
		cache: false,
		async : true,
		success:function(json){
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}

	});
	
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
								}
							else if (json.NewDataSet.count == 1) {
								DeleteProjectUser(CurrentProURL,json.NewDataSet.User.ProUserID);
								GetCurrentTL();
								
							}
							else {
								$.each(json.NewDataSet.User,function(index,item) {
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
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#TeamLeader">'+json.NewDataSet.Users.ProTeamLeaders+'</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Approvers">'+json.NewDataSet.Users.ProApprovers+'</SetVar>';
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
							SetAppDesigner(URL);							
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
function SetAppDesigner(URL){

	$.each(AppDesignOBJ,function(index,item) {
		/*Set config tab to team leaders only*/
		/*
		if(item.title == 'Configuration'){
			AppDesignOBJ[index].users = UsersArray;
		}
		*/
		/*Set SRA home button link to root*/
		/*
		if(item.title == 'Home'){
			var TabNum = index;
			$.each(item.widgets,function(index,item) {
				if(item.title == 'SRA'){
					AppDesignOBJ[TabNum].widgets[index].link = SRABase;
				}
				
			});
		}
		*/
	});
	var ToWrite = '';
	ToWrite = '<ows:Batch OnError="Return">';
	ToWrite += '<Method ID="A1"><SetList>%ApplicationConfig%</SetList><SetVar Name="ID">'+AppDesignID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
	ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#ApplicationJSON">'+JSON.stringify(AppDesignOBJ)+'</SetVar>';
	ToWrite +='</Method>';
	ToWrite +='</ows:Batch>';
	
	$.ajax({
		type: 'POST',
		url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'ProcessBatchData',
		 		ListTitle: 'ApplicationConfig',
		 		SiteUrl: URL,
				Batch: ToWrite,
				OutputType: 'json' },
		dataType: 'json',
		cache: false,
		async : true,
		success:function(json){
			if (FirstLoad){
				window.location = window.location;
				}
			else{	
				refreshGrid();
				}

			SP.UI.ModalDialog.commonModalDialogClose();
						
	    },
	
		//success: ResetPage,
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	});

}
function GetAppDesigner(URL){
	$.ajax({
		 type:'POST',
         dataType:'json',
         url:'../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'GetListItems',
			TableName: 'ApplicationConfig',
			ListTitle: 'ApplicationConfig',
			SiteUrl: URL,
			OutputType : 'json'
		},
		cache: false,
		async : true,	
		success: function(json){
				if (json.NewDataSet.ApplicationConfig.listitems['rs:data'].ItemCount == 0)
						{
						}
					else if (json.NewDataSet.ApplicationConfig.listitems['rs:data'].ItemCount == 1) {
							AppDesignOBJ = $.parseJSON(json.NewDataSet.ApplicationConfig.listitems['rs:data']['z:row'].ows_ApplicationJSON);
							AppDesignID = json.NewDataSet.ApplicationConfig.listitems['rs:data']['z:row'].ows_ID;
						}
					else{
						}	
		
		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});

}
function createJSON(Object, ID, Name) {
		var item = {};
		item.ID = ID;
        item.Sid= '';
        item.Name= Name;
        item.LoginName= '';
        item.Email= '';
        item.IsSiteAdmin = '';        
        Object.push(item);
}
function SetEditor(ID, URL , CBSet){
CurrentProURL = URL; 
var ToWrite = '';
					ToWrite = '<ows:Batch OnError="Return">';
					ToWrite += '<Method ID="A1"><SetList>%Team Members%</SetList><SetVar Name="ID">'+ID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Editor0">'+CBSet+'</SetVar>';
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
								SP.UI.ModalDialog.showWaitScreenWithNoClose('Setting Permissions', '');
								ResetRoleInheritance(URL, 'reset');
							
				        },				
						error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
				
					});

}
/*new div/reg/loc level users */

function GetDivision(ParentID, GroupsArray, URL, ID){

	   $.ajax({
	        url: URL + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		    data: { RequestType: 'BatchRequest', 
		    		ConfigFileLocation: '[SRA Root]/Resources/UserGroups/DivSite.xml',
		    		ParentID: ParentID, 
	    			OutputType:'JSON'
	    			},
	        dataType: 'json',
	        async: true,
	        cache: false,
	        type: 'POST',
	        success: function (json) {
					if (json.NewDataSet.Divisions.listitems["rs:data"].ItemCount == 1){
						var item = {};
						item.ID = json.NewDataSet.Divisions.listitems["rs:data"]["z:row"].ows_UserGroupID;
				        GroupsArray.push(item);				        
					}
					$.each(GroupsArray,function(index,item){
						//1073741826 is the SPRoleID for Read
						SetUsersPermissions(URL, item.ID, '1073741924');
					});
					//BreakRoleInheritance(URL, ID);									
	        },
	        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	    });	

}
function GetRegion(ParentID, GroupsArray, URL, ID){

	   $.ajax({
	        url: URL + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		    data: { RequestType: 'BatchRequest', 
		    		ConfigFileLocation: '[SRA Root]/Resources/UserGroups/RegSite.xml',
		    		ParentID: ParentID, 
	    			OutputType:'JSON'
	    			},
	        dataType: 'json',
	        async: true,
	        cache: false,
	        type: 'POST',
	        success: function (json) {
					if (json.NewDataSet.Regions.listitems["rs:data"].ItemCount == 1){
						var item = {};
						item.ID = json.NewDataSet.Regions.listitems["rs:data"]["z:row"].ows_UserGroupID;
				        GroupsArray.push(item);
				        GetDivision(json.NewDataSet.Regions.listitems["rs:data"]["z:row"].ows_ParentID, GroupsArray,  URL, ID);
					}									
	        },
	        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	    });	

}
function GetLocation(ParentID, URL, ID){
	var GroupsArray = new Array();
	   $.ajax({
	        url: URL + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		    data: { RequestType: 'BatchRequest', 
		    		ConfigFileLocation: '[SRA Root]/Resources/UserGroups/LocSite.xml',
		    		ParentID: ParentID,
	    			OutputType:'JSON'
	    			},
	        dataType: 'json',
	        async: true,
	        cache: false,
	        type: 'POST',
	        success: function (json) {
					if (json.NewDataSet.Locations.listitems["rs:data"].ItemCount == 1){
						var item = {};
						item.ID = json.NewDataSet.Locations.listitems["rs:data"]["z:row"].ows_UserGroupID;
				        GroupsArray.push(item);
				        GetRegion(json.NewDataSet.Locations.listitems["rs:data"]["z:row"].ows_ParentID, GroupsArray, URL, ID);
					}									
	        },
	        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	    });	

}

function GetCurrentProjectRecord(URL, ID){
	$.ajax({
		 type:'POST',
         dataType:'json',
         url:URL + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'BatchRequest',
			ConfigFileLocation: '[SRA Root]/Resources/UserGroups/ProSite.xml',
			ProURL: URL,
			SiteUrl: '[SRA Root]',
			OutputType : 'json'
		},
		success: function(json){
					if (json.NewDataSet.Project.listitems["rs:data"].ItemCount == 1){
						GetLocation(json.NewDataSet.Project.listitems["rs:data"]["z:row"].ows_ParentID, URL, ID);
					}					
		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});

}

