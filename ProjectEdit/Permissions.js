
var CurrentReloadTab = ''; 
var CurrentProID = '';
var CurrentProURL = '';
var CurrentLeader = '';
var AppDesignOBJ = new Array();
var AppDesignID = '';
var UsersArray = new Array();
var InitalRun = true;
var FirstLoad = false;

function EditReload() {
	if(CurrentReloadTab == 'Charter'){
			$('#Charter').html(LoaderHTML);
			if(NotSavedCloseCheck){CloseEditMain();}
			CharterRender();
		}
	else if(CurrentReloadTab =='Project Costs'){
			$('#Resources').html(LoaderHTML);
			if(NotSavedCloseCheck){CloseEditMain();}
			ResourcesRender();
		}
	else if(CurrentReloadTab =='Project Approval'){
			$('#Approval').html(LoaderHTML);
			if(NotSavedCloseCheck){CloseEditMain();}
			ApprovalRender();
		}
	else if(CurrentReloadTab =='Milestones'){
			$('#Milestones').html(LoaderHTML);
			if(NotSavedCloseCheck){CloseEditMain();}
			MilestonesRender();
		}						
	else if(CurrentReloadTab =='Project Benefits'){
			$('#Benefits').html(LoaderHTML);
			if(NotSavedCloseCheck){CloseEditMain();}
			BenefitsRender();
		}
	else if(CurrentReloadTab =='Team Members'){
			$('#TeamMembers').html(LoaderHTML);
			if(NotSavedCloseCheck){CloseEditMain();}
			TeamMembersRender();
		}					
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
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}

	});
	
}
function BreakRoleInheritance(URL, ID) {
//GetAppDesigner(URL);
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
function SetTeamMembersField(URL, Inital){
	$.ajax({
		 type:'POST',
         dataType:'json',
         url:URL + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
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
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#TeamMemberRoles">'+json.NewDataSet.Users.TeamMemberRoles+'</SetVar>'
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#TeamMemberDivisions">'+json.NewDataSet.Users.TeamMemberDivisions+'</SetVar>'
					if (Inital){ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#SecurityApplied">Yes</SetVar>';}
					ToWrite +='</Method>';
					ToWrite +='</ows:Batch>';
					
					$.ajax({
						type: 'POST',
						url: URL + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
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
/*
	$.each(AppDesignOBJ,function(index,item) {
		if(item.title == 'Configuration'){
			AppDesignOBJ[index].users = UsersArray;
		}
		if(item.title == 'Home'){
			var TabNum = index;
			$.each(item.widgets,function(index,item) {
				if(item.title == 'SRA'){
					AppDesignOBJ[TabNum].widgets[index].link = SRABase;
				}
				
			});
		}
	});
*/	
	var ToWrite = '';
	ToWrite = '<ows:Batch OnError="Return">';
	ToWrite += '<Method ID="A1"><SetList>%ApplicationConfig%</SetList><SetVar Name="ID">'+AppDesignID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
	ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#ApplicationJSON">'+JSON.stringify(AppDesignOBJ)+'</SetVar>';
	ToWrite +='</Method>';
	ToWrite +='</ows:Batch>';
	
	$.ajax({
		type: 'POST',
		url: URL + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'ProcessBatchData',
		 		ListTitle: 'ApplicationConfig',
		 		SiteUrl: URL,
				Batch: ToWrite,
				OutputType: 'json' },
		dataType: 'json',
		cache: false,
		async : true,
		success:function(json){
			EditReload();						
	    },
	
		//success: ResetPage,
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	});

}
function GetAppDesigner(URL){
	$.ajax({
		 type:'POST',
         dataType:'json',
         url:URL + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
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
/*new div/reg/loc level users */
function SetUsersPermissionsFinal(URL, UserID, RoleID) {
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
			$('.CancelMain').button( "option", "disabled", false );
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}

	});
	
}

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
						//var item = {};
						//item.ID = json.NewDataSet.Divisions.listitems["rs:data"]["z:row"].ows_UserGroupID;
				        //GroupsArray.push(item);
				        SetUsersPermissionsFinal(URL, json.NewDataSet.Divisions.listitems["rs:data"]["z:row"].ows_UserGroupID, '1073741924');				        
					}
					//$('.CancelMain').button( "option", "disabled", false );
					//$.each(GroupsArray,function(index,item){
						//1073741826 is the SPRoleID for Read
					//	SetUsersPermissions(URL, item.ID, '1073741826');
					//});
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
				        SetUsersPermissions(URL, json.NewDataSet.Regions.listitems["rs:data"]["z:row"].ows_UserGroupID, '1073741924');	
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
				        SetUsersPermissions(URL, json.NewDataSet.Locations.listitems["rs:data"]["z:row"].ows_UserGroupID, '1073741924');
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


