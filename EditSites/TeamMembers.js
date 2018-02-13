var RemovedTeamMembers = new Array();
var TeamMemberPermUsers = new Array();
var NewSaveItemsLength = 0;
var NewSaveItemsDone = 0;
var NewItemCounter = 0;
var MultiAddlength = 0;

$(document).ready(function () {
	NotSavedCheck = false;
	getUsersFromGroup(GroupID,false);
	$("#TeamMembersTable").tablesorter({
		sortList: [[1,0]],
		//widgets: ["filter"],
		widthFixed: true,
		
	});

	$( ".TeamMembersSave" ).button({icons: {secondary: "ui-icon-circle-check"}}).click(function(event ) {
		event.preventDefault();
		var TeamLeaderCheck = 0;
		if($('#TeamMembersTable').find('.Roles input[data-value="Team Leader"]').length > 0){TeamLeaderCheck =1;}
		if(TeamLeaderCheck){	
			NotSavedCheck = false;
			$("#TeamMembersData").hide();
			$("#TeamMembersReload").show();
			saveLocalData();
		}
		else{
			$("#TeamMembersNoLeader").dialog("open");
		}	

	});
	$("#TeamMembersAdd").dialog({
      autoOpen: false,
      modal: true,
      width: 600     
    });
    $("#TeamMembersError").dialog({
      autoOpen: false,
      modal: true,   
    })
	$( ".TeamMembersAdd" ).unbind();    
	$( ".TeamMembersAdd" ).button().click(function(event ) {
		event.preventDefault();
		ClearForm();
		$("#TeamMembersAdd").dialog("open");
	});
	$( ".TeamMembersNewAdd" ).unbind();
	$( ".TeamMembersNewAdd" ).button().click(function(event ) {
		event.preventDefault();
	    var users = SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerTeamMembers_TopSpan.GetAllUserInfo();
		if(users.length != 0 ){
			getUserInfoNew();
		}
		else{
			
			$("#TeamMembersError").dialog("open");
		}
	});
	$('#TeamMembersTableBody').on('click','img.TeamMembersDeleteIcon',function(){
		removeUserFromGroup($(this).data('id'));
	});	
	initializePeoplePicker('peoplePickerTeamMembers');
});

function LoadUser(UserID){
    var context = new SP.ClientContext.get_current();
    this.user = context.get_web().getUserById(UserID);
    context.load(this.user);	
    context.executeQueryAsync(
         Function.createDelegate(null, onGetUserNameSuccess), 
         Function.createDelegate(null, onFail)
    );
}

function onGetUserNameSuccess() {

    var schema = {};
    schema['PrincipalAccountType'] = 'User,DL';
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = false;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '90%';

    var users = new Array(1);
    var defaultUser = new Object();
    defaultUser.AutoFillDisplayText = this.user.get_title();
    defaultUser.AutoFillKey = this.user.get_loginName();
    defaultUser.Description = this.user.get_email();
    defaultUser.DisplayText = this.user.get_title();
    defaultUser.EntityType = "User";
    defaultUser.IsResolved = true;
    defaultUser.Key = this.user.get_loginName();
    defaultUser.Resolved = true;
    users[0] = defaultUser;

    SPClientPeoplePicker_InitStandaloneControlWrapper('peoplePickerTeamMembersEdit', users, schema);
    $("#TeamMembersEdit").dialog("open");

}

function initializePeoplePicker(peoplePickerElementId) {

    var schema = {};
    schema['PrincipalAccountType'] = 'User,DL';
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = true;//false;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '90%';

    this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
}
function getUserInfoEdit() {

    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerTeamMembersEdit_TopSpan;
    var users = peoplePicker.GetAllUserInfo();
    var context = new SP.ClientContext.get_current();
    this.user = context.get_web().ensureUser(users[0].Key);
    context.load(this.user);
    context.executeQueryAsync(
         Function.createDelegate(null, ensureUserSuccessEdit), 
         Function.createDelegate(null, onFail)
    );
    
}
function ensureUserSuccessEdit() {
	EditTeamMembersToTable(this.user.get_id(), this.user.get_title());
}

function getUserInfoNew() {

    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerTeamMembers_TopSpan;
    var users = peoplePicker.GetAllUserInfo();
    var userArray = [];
    var context = new SP.ClientContext.get_current();
	$.each(users,function(index, item) {
	    user = context.get_web().ensureUser(users[index].Key);
	    context.load(user);
	    userArray.push(user);
    });
    MultiAddlength = userArray.length;
    context.executeQueryAsync(function() {
        $.each(users,function(index, item) {
			addUserToGroup(userArray[index].get_loginName());
        });
    }, 
    function(sender, args) {});
    context.dispose();    
}
function ClearForm(){
	$('#TeamMembersAdd input:checkbox').removeAttr('checked');	
	initializePeoplePicker('peoplePickerTeamMembers');	
}
/******/
function getUsersFromGroup(GID,CloseAdd) {
$.ajax({
		type: 'GET',
		url: SRARoot + "/_api/web/sitegroups/getbyid('"+GID+"')/users",
		headers: { 
        "accept": "application/json; odata=verbose", 
        "content-type":"application/json;odata=verbose",
        "X-RequestDigest": $("#__REQUESTDIGEST").val() 
    	},
		cache: false,
		success:function(json){
			var html = '';
			///debugger;
			if(json.d.results){
			//var Usersgrid = $.parseJSON(json.d.results);
			
			
			$.each(json.d.results,function(index,item){	
				
				html += '<tr>';
				html += '<td style="vertical-align:middle"><img data-id="'+item.Id+'" title="Remove Team Member" class="TeamMembersDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="'+removeimage +'"/>';
				html += '</td>';
				html += '<td>'+item.Title+'</td>';
				html += '<td>'+item.Email+'</td>';
				html += '<td>'+item.LoginName+'</td>';
				html += '</tr>';
			});
			$("#TeamMembersTableBody").html(html);
			
			UserTableRefreshed(CloseAdd);			
			}
		
		
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}

	});


}
function addUserToGroup(LoginName) {
$.ajax({
		type: 'POST',
		url: SRARoot + "/_api/web/sitegroups("+GroupID+")/users",
		headers: { 
        "accept": "application/json; odata=verbose", 
        "content-type":"application/json;odata=verbose",
        "X-RequestDigest": $("#__REQUESTDIGEST").val() 
    	},
    	//data:JSON.stringify({'__metadata': { 'type': 'SP.User' }, 'LoginName': 'i:0#.w|cwqa\\rich.belanger'}),
    	data:JSON.stringify({'__metadata': { 'type': 'SP.User' }, 'LoginName': LoginName}),
		cache: false,
		success:function(json){
			NewItemCounter++;
			if(MultiAddlength === NewItemCounter){
			getUsersFromGroup(GroupID, true);
			}
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}

	});


}
function removeUserFromGroup(UserID) {

$.ajax({
		type: 'POST',
		url: SRARoot + "/_api/web/sitegroups/getbyid('"+GroupID+"')/users/removebyid('"+UserID+"')",
		headers: { 
        "accept": "application/json; odata=verbose", 
        "content-type":"application/json;odata=verbose",
        "X-RequestDigest": $("#__REQUESTDIGEST").val() 
    	},
		cache: false,
		success:function(json){
			getUsersFromGroup(GroupID,false);
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}

	});


}
function UserTableRefreshed(CloseAdd){
			if(CloseAdd){
				$("#TeamMembersAdd").dialog("close");
				$('html, body').animate({
			        scrollTop: $(document).height()
			    }, 'fast');
				ClearForm();
				}	
			$("#TeamMembersTable").trigger("update");

}


