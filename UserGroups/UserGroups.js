/*User group testing*/
/*
createGroup('38', 'Divisions', 'http://corning.corasworks.net/sites/sra/div38');
createGroup('77', 'Divisions-Regions', 'http://corning.corasworks.net/sites/sra/div38/Reg77', '38');
createGroup('71', 'Locations', 'http://corning.corasworks.net/sites/sra/div38/Reg77/loc71', '77');
*/
function createGroup(ListItemID, List, ListURL, ParentID) {
	SP.UI.ModalDialog.showWaitScreenWithNoClose('Setting Permissions', '');
	var GroupName = '';
	if (List == 'Divisions'){
		GroupName = 'div' + ListItemID;
		}
	else if(List == 'Divisions-Regions'){
		GroupName = 'reg' + ListItemID;
		}
	else if(List == 'Locations'){
		GroupName = 'loc' + ListItemID;
		}	

	$.ajax({
		type: 'POST',
		url: '../_api/web/sitegroups',
		headers: { 
        "accept": "application/json; odata=verbose", 
        "content-type":"application/json;odata=verbose",
        "X-RequestDigest": $("#__REQUESTDIGEST").val() 
    	},
    	data: JSON.stringify({ '__metadata': { 'type': 'SP.Group' }, 'Title': GroupName}),
		cache: false,
		success:function(json){
				var GroupsArray = new Array();
				if (List == 'Divisions'){
					var item = {};
					item.ID = json.d.Id;
			        item.Name= json.d.Title;
			        GroupsArray.push(item);
			        GetAppDesignerButtons(ListURL, GroupsArray);
					}
				else if(List == 'Divisions-Regions'){
					var item = {};
					item.ID = json.d.Id;
			        item.Name= json.d.Title;
			        GroupsArray.push(item);				
					GetDivision(ParentID, GroupsArray, ListURL);
					}
				else if(List == 'Locations'){
					var item = {};
					item.ID = json.d.Id;
			        item.Name= json.d.Title;
			        GroupsArray.push(item);				
					GetRegion(ParentID, GroupsArray, ListURL)
					}							
				WriteGroupID(List,json.d.Id,json.d.Title,ListItemID);
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}

	});
}
function WriteGroupID(List,GroupID,GroupName,ListItemID){
	var ToWrite = '';
	ToWrite = '<ows:Batch OnError="Return">';
	ToWrite += '<Method ID="A1"><SetList>%'+List+'%</SetList><SetVar Name="ID">'+ListItemID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
	ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#UserGroupID">'+GroupID+'</SetVar>';
	ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#UserGroupName">'+GroupName+'</SetVar>';
	ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Active">true</SetVar>';	
	ToWrite +='</Method>';
	ToWrite +='</ows:Batch>';
	
	$.ajax({
		type: 'POST',
		url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'ProcessBatchData',
		 		ListTitle: List,
		 		SiteUrl: '[SRA Root]',
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
function GetAppDesignerButtons(URL, GroupsArray){
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
				if (json.NewDataSet.ApplicationConfig.listitems['rs:data'].ItemCount == 1) {
							SetAppDesignerButtons(URL, json.NewDataSet.ApplicationConfig.listitems['rs:data']['z:row'].ows_ID, GroupsArray, $.parseJSON(json.NewDataSet.ApplicationConfig.listitems['rs:data']['z:row'].ows_ApplicationJSON));
						}	
		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});

}

function SetAppDesignerButtons(URL,AppDesignID,GroupsArray,AppDesignOBJ){
	//debugger;
	$.each(AppDesignOBJ,function(index1,item1) {
		/*Set config tab to team leaders only*/
		if(item1.title == 'Home'){
			$.each(AppDesignOBJ[index1].widgets,function(index,item) {
				if(item.title == 'Portfolio Timeline' || item.title == 'Portfolio Milestones' || item.title == 'Tasks by Team Member' || item.title == 'Team Members Timeline' || item.title == 'Reports'){
					AppDesignOBJ[index1].widgets[index].groups = GroupsArray;
				}		
			});	
		}
	});
	var ToWrite = '';
	ToWrite = '<ows:Batch OnError="Return">';
	ToWrite += '<Method ID="A1"><SetList>%ApplicationConfig%</SetList><SetVar Name="ID">'+AppDesignID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
	ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#ApplicationJSON">'+JSON.stringify(AppDesignOBJ)+'</SetVar>';
	ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#ApplicationManagers">11;#;#12</SetVar>';
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
			//$('#SiteManagerShell').hide();
			//$('#SiteManagerLoader').show();
			//Sitesload();	
			SP.UI.ModalDialog.commonModalDialogClose();
			CWDialogCloseActionWithChange(true);			
	    },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	});

}
function GetDivision(ParentID, GroupsArray, ListURL){

	   $.ajax({
	        url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
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
				        item.Name= json.NewDataSet.Divisions.listitems["rs:data"]["z:row"].ows_UserGroupName;
				        GroupsArray.push(item);
				        GetAppDesignerButtons(ListURL, GroupsArray);
					}									
	        },
	        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	    });	

}
function GetRegion(ParentID, GroupsArray, ListURL){

	   $.ajax({
	        url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
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
				        item.Name= json.NewDataSet.Regions.listitems["rs:data"]["z:row"].ows_UserGroupName;
				        GroupsArray.push(item);
				        GetDivision(json.NewDataSet.Regions.listitems["rs:data"]["z:row"].ows_ParentID, GroupsArray, ListURL);
					}									
	        },
	        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	    });	

}
/*Inital get all sites*/
function SetDivs(){

	   $.ajax({
	        url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		    data: { RequestType: 'GetListItems',
		    		ListTitle:'Divisions',
		    		TableName:'Divisions',
		    		SiteUrl:'[SRA Root]',
	    			OutputType:'JSON'
	    			},
	        dataType: 'json',
	        async: true,
	        cache: false,
	        type: 'POST',
	        success: function (json) {
						if (json.NewDataSet.Divisions.listitems["rs:data"].ItemCount == 0)
								{
								}
							else if (json.NewDataSet.Divisions.listitems["rs:data"].ItemCount == 1) {
								//createGroup(json.NewDataSet.Divisions.listitems["rs:data"]["z:row"].ows_ID, 'Divisions', json.NewDataSet.Divisions.listitems["rs:data"]["z:row"].ows_URL);
								GetADManualChange(json.NewDataSet.Divisions.listitems["rs:data"]["z:row"].ows_URL);
							}
							else {
								$.each(json.NewDataSet.Divisions.listitems["rs:data"]["z:row"],function(index,item) {
									//createGroup(item.ows_ID, 'Divisions', item.ows_URL);
									GetADManualChange(item.ows_URL);
								});
							}
	
	        },
	        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	    });	

}
function SetDivReg(){

	   $.ajax({
	        url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		    data: { RequestType: 'GetListItems',
		    		ListTitle:'Divisions-Regions',
		    		TableName:'Regions',
		    		SiteUrl:'[SRA Root]',
	    			OutputType:'JSON'
	    			},
	        dataType: 'json',
	        async: true,
	        cache: false,
	        type: 'POST',
	        success: function (json) {
						if (json.NewDataSet.Regions.listitems["rs:data"].ItemCount == 0)
								{
								}
							else if (json.NewDataSet.Regions.listitems["rs:data"].ItemCount == 1) {
								//createGroup(json.NewDataSet.Regions.listitems["rs:data"]["z:row"].ows_ID, 'Divisions-Regions', json.NewDataSet.Regions.listitems["rs:data"]["z:row"].ows_URL, json.NewDataSet.Regions.listitems["rs:data"]["z:row"].ows_ParentID);
								GetADManualChange(json.NewDataSet.Regions.listitems["rs:data"]["z:row"].ows_URL);
							}
							else {
								$.each(json.NewDataSet.Regions.listitems["rs:data"]["z:row"],function(index,item) {
									//createGroup(item.ows_ID, 'Divisions-Regions', item.ows_URL, item.ows_ParentID);
									GetADManualChange(item.ows_URL);
								});
							}
	
	        },
	        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	    });	

}
function SetLoc(){

	   $.ajax({
	        url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		    data: { RequestType: 'GetListItems',
		    		ListTitle:'Locations',
		    		TableName:'Locations',
		    		SiteUrl:'[SRA Root]',
	    			OutputType:'JSON'
	    			},
	        dataType: 'json',
	        async: true,
	        cache: false,
	        type: 'POST',
	        success: function (json) {
						if (json.NewDataSet.Locations.listitems["rs:data"].ItemCount == 0)
								{
								}
							else if (json.NewDataSet.Locations.listitems["rs:data"].ItemCount == 1) {
								//createGroup(json.NewDataSet.Locations.listitems["rs:data"]["z:row"].ows_ID, 'Locations', json.NewDataSet.Locations.listitems["rs:data"]["z:row"].ows_URL, json.NewDataSet.Locations.listitems["rs:data"]["z:row"].ows_ParentID);
								GetADManualChange(json.NewDataSet.Locations.listitems["rs:data"]["z:row"].ows_URL);
							}
							else {
								$.each(json.NewDataSet.Locations.listitems["rs:data"]["z:row"],function(index,item) {
									//createGroup(item.ows_ID, 'Locations', item.ows_URL, item.ows_ParentID);
									GetADManualChange(item.ows_URL);
								});
							}
	
	        },
	        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	    });	

}
function SetProjects(){

	   $.ajax({
	        url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		    data: { RequestType: 'GetListItems',
		    		ListTitle:'Projects',
		    		TableName:'Projects',
		    		SiteUrl:'[SRA Root]',
	    			OutputType:'JSON'
	    			},
	        dataType: 'json',
	        async: true,
	        cache: false,
	        type: 'POST',
	        success: function (json) {
						if (json.NewDataSet.Projects.listitems["rs:data"].ItemCount == 0)
								{
								}
							else if (json.NewDataSet.Projects.listitems["rs:data"].ItemCount == 1) {
								//createGroup(json.NewDataSet.Locations.listitems["rs:data"]["z:row"].ows_ID, 'Locations', json.NewDataSet.Locations.listitems["rs:data"]["z:row"].ows_URL, json.NewDataSet.Locations.listitems["rs:data"]["z:row"].ows_ParentID);
								GetADManualChange(json.NewDataSet.Projects.listitems["rs:data"]["z:row"].ows_URL);
							}
							else {
								$.each(json.NewDataSet.Projects.listitems["rs:data"]["z:row"],function(index,item) {
									//createGroup(item.ows_ID, 'Locations', item.ows_URL, item.ows_ParentID);
									GetADManualChange(item.ows_URL);
								});
							}
	
	        },
	        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	    });	

}

function SetADManualChange(URL,AppDesignID,AppDesignOBJ){
	//debugger;
	/*
	$.each(AppDesignOBJ,function(index1,item1) {
		//Set config tab to team leaders only
		if(item1.title == 'Home'){
			$.each(AppDesignOBJ[index1].widgets,function(index,item) {
				if(item.title == 'Team Members Task Timeline'){
					AppDesignOBJ[index1].widgets[index].title = 'Team Members Timeline';
				}		
			});	
		}
	});
	*/
	$.each(AppDesignOBJ,function(index1,item1) {
		//turn on advanced ppm
		if(item1.title == 'Advanced PPM'){
			AppDesignOBJ[index1].enabled = true;
		}
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
			//$('#SiteManagerShell').hide();
			//$('#SiteManagerLoader').show();
			//Sitesload();	
			//SP.UI.ModalDialog.commonModalDialogClose();
			//CWDialogCloseActionWithChange(true);			
	    },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	});

}
function GetADManualChange(URL){
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
				if (json.NewDataSet.ApplicationConfig.listitems['rs:data'].ItemCount == 1) {
							SetADManualChange(URL, json.NewDataSet.ApplicationConfig.listitems['rs:data']['z:row'].ows_ID, $.parseJSON(json.NewDataSet.ApplicationConfig.listitems['rs:data']['z:row'].ows_ApplicationJSON));
						}	
		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});

}

/*
function createGroupJSON(Object, ID, Name) {
		var item = {};
		item.ID = ID;
        //item.Sid= '';
        item.Name= Name;
        //item.LoginName= '';
        //item.Email= '';
        //item.IsSiteAdmin = '';        
        Object.push(item);
}

function GetGroup2() {
	var groupName = 'test new2';
	$.ajax({
		type: 'GET',
		url: 'http://corning.corasworks.net/sites/sra/_api/web/sitegroups(' + groupName + ')/users',
		headers: { 
        "accept": "application/json; odata=verbose", 
        "content-type":"application/json;odata=verbose",
        "X-RequestDigest": $("#__REQUESTDIGEST").val() 
    	},
		cache: false,
		success:function(json){
				//BreakRoleInheritance(URL, 'reset');
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}

	});
	
}
function AddUser() {
	var GID = 'test new2';
	var UID = 'test new2';
	$.ajax({
		type: 'GET',
		url: 'http://corning.corasworks.net/sites/sra//_api/web/sitegroups('+GID+')/users',
		headers: { 
        "accept": "application/json; odata=verbose", 
        "content-type":"application/json;odata=verbose",
        "X-RequestDigest": $("#__REQUESTDIGEST").val() 
    	},
		cache: false,
		success:function(json){
				//BreakRoleInheritance(URL, 'reset');
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}

	});
	
}




*/
/*
// Create a new site group
var hostweburl = 'http://corning.corasworks.net/sites/sra';
var appweburl = 'http://corning.corasworks.net/sites/sra';

function createGroup() {
    var groupName = 'test new';
    var executor;
    // Initialize the RequestExecutor with the app web URL.
    // Content Type Header is used to tell server what format data in the body contains.
    executor = new SP.RequestExecutor(appweburl);
    executor.executeAsync({
    url: appweburl + "/_api/web/sitegroups",
    method: "POST",
    body: "{ '__metadata': { 'type': 'SP.Group' }, 'Title':'" + groupName + "'}",
    headers: {
    "content-type": "application/json; odata=verbose",
},
    success: createGroupSuccessHandler,
    error: createGroupErrorHandler
    });
}
// Success Handler
function createGroupSuccessHandler(data) {
alert("Group Created successfully");
}
function createGroupErrorHandler(data, errorCode, errorMessage) {
    alert("Could not create a new group: " + errorMessage);
}

*/

/*Manual site perm update*/
/*
function SetPremProjects(){

	   $.ajax({
	        url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		    data: { RequestType: 'GetListItems',
		    		ListTitle:'Projects',
		    		TableName:'Projects',
		    		SiteUrl:'[SRA Root]',
	    			OutputType:'JSON'
	    			},
	        dataType: 'json',
	        async: true,
	        cache: false,
	        type: 'POST',
	        success: function (json) {
						if (json.NewDataSet.Projects.listitems["rs:data"].ItemCount == 0)
								{
								}
							else if (json.NewDataSet.Projects.listitems["rs:data"].ItemCount == 1) {
								//createGroup(json.NewDataSet.Locations.listitems["rs:data"]["z:row"].ows_ID, 'Locations', json.NewDataSet.Locations.listitems["rs:data"]["z:row"].ows_URL, json.NewDataSet.Locations.listitems["rs:data"]["z:row"].ows_ParentID);
								//GetADManualChange(json.NewDataSet.Projects.listitems["rs:data"]["z:row"].ows_URL);
								//ResetRoleInheritance(json.NewDataSet.Projects.listitems["rs:data"]["z:row"].ows_URL, 'reset');
							}
							else {
								
								$.each(json.NewDataSet.Projects.listitems["rs:data"]["z:row"],function(index,item) {
									//createGroup(item.ows_ID, 'Locations', item.ows_URL, item.ows_ParentID);
									//GetADManualChange(item.ows_URL);
									//console.log(item.ows_URL);
									ResetRoleInheritance(item.ows_URL, 'reset');
								});
							}
	
	        },
	        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	    });	

}


var CurrentProID = '';
var CurrentProURL = '';
var CurrentLeader = '';

//var AppDesignOBJ = new Array();
//var AppDesignID = '';

//var UsersArray = new Array();


var InitalRun = true;
var FirstLoad = false;

function BreakRoleInheritance(URL, ID) {
//GetAppDesigner(URL);
//UsersArray = new Array();

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
									//createJSON(UsersArray, json.NewDataSet.User.UserSCID, json.NewDataSet.User.UserSCName);
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
										//createJSON(UsersArray, item.UserSCID, item.UserSCName);
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
						//alert("Error:\n" + xhr.responseText);
						console.log('BreakRoleInheritance-'+URL);
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
		error: function(xhr, status, error) {
		console.log('ResetRoleInheritance-'+URL);
		console.log(error);
		BreakRoleInheritance(URL, 'reset');
		}

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
		error: function(xhr, status, error) {console.log('SetUsersPermissions-'+URL);}

	});
	
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
							//SetAppDesigner(URL);							
				        },
				
						//success: ResetPage,
						error: function(xhr, status, error) {console.log('SetTeamMembersFieldinner-'+URL);}
				
					});
	
		
		},
		error : function (xhr, status, error) {
			//alert("Error:\n" + xhr.responseText);
			console.log('SetTeamMembersField-'+URL);
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
					console.log(URL);
					$.each(GroupsArray,function(index,item){
						//1073741826 is the SPRoleID for Read
						SetUsersPermissions(URL, item.ID, '1073741924');
					});
					//BreakRoleInheritance(URL, ID);									
	        },
	        error: function(xhr, status, error) {console.log('GetDivision-'+URL);}
	
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
				        //console.log(GroupsArray);

					}									
	        },
	        error: function(xhr, status, error) {console.log('GetRegion-'+URL);}
	
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
				        //console.log(GroupsArray);
					}									
	        },
	        error: function(xhr, status, error) {console.log('GetLocation-'+URL);}
	
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
						//console.log(URL);
					}					
		},
		error : function (xhr, status, error) {
			//alert("Error:\n" + xhr.responseText);
			console.log('GetCurrentProjectRecord-'+URL);
		}

	});

}
*/

