var RemovedTeamMembers = new Array();
var TeamMemberPermUsers = new Array();
var NewSaveItemsLength = 0;
var NewSaveItemsDone = 0;
var NewItemCounter = 0;
var MultiAddlength = 0;

$(document).ready(function () {

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
	$("#TeamMembersNoLeader").dialog({
      autoOpen: false,
      modal: true,   
    })
	$("#TeamMembersAdd").dialog({
      autoOpen: false,
      modal: true,
      width: 600     
    });
	$("#TeamMembersEdit").dialog({
      autoOpen: false,
      modal: true,
      width: 600     
    });
    $("#TeamMembersError").dialog({
      autoOpen: false,
      modal: true,   
    })
    $("#TeamMembersDup").dialog({
      autoOpen: false,
      modal: true,   
    });

    $( "#RoleSet" ).unbind();
    $('#RoleSet').buttonset();
/*    
	$('input.DueDate').datepicker({
		dateFormat: "mm-dd-yy",
		altField: "#sharePointDate",
		altFormat: "yy-mm-dd"
	})
*/	
	$( ".TeamMembersAdd" ).unbind();    
	$( ".TeamMembersAdd" ).button().click(function(event ) {
		event.preventDefault();
		ClearForm();
		$("#TeamMembersAdd").dialog("open");
	});
	$( ".TeamMembersNewAdd" ).unbind();
	$( ".TeamMembersNewAdd" ).button().click(function(event ) {
		event.preventDefault();
		var CBChecked = $('#TeamMembersAdd :checkbox:checked').length > 0;
		var SelectFilters = $('#TeamMembersAdd .DivisionSelectBox option:selected').filter(function() { return $( this ).attr( "disabled" ) === "disabled"; });
	    var users = SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerTeamMembers_TopSpan.GetAllUserInfo();
		if(CBChecked && users.length != 0 && SelectFilters.length === 0 ){
			getUserInfoNew();
		}
		else{
			
			$("#TeamMembersError").dialog("open");
		}
	});
	$( ".TeamMembersEdit" ).unbind();
	$( ".TeamMembersEdit" ).button().click(function(event ) {
		event.preventDefault();
		var CBChecked = $('#TeamMembersEdit :checkbox:checked').length > 0;
		var SelectFilters = $('#TeamMembersEdit .DivisionSelectBox option:selected').filter(function() { return $( this ).attr( "disabled" ) === "disabled"; });
	    //var users = SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerTeamMembersEdit_TopSpan.GetAllUserInfo();
		if(CBChecked && SelectFilters.length === 0){
			//getUserInfoEdit();
			EditTeamMembersToTable();
		}
		else{
			
			$("#TeamMembersError").dialog("open");
		}
		
	});
	$('#TeamMembersTableBody').on('click','.Editor img',function(){
		//debugger;
		if ($(this).hasClass('EditorChecked')){
			$(this).parent().parent().attr('datachanged','Yes');
			$(this).parent().html('<img style="padding:3px; margin-right:3px;" src="'+cbunchecked +'" title="Set as Editor" class="EditorUnchecked ui-button ui-widget ui-state-default ui-corner-all"/>');
			NotSavedCheck = true;
			$('.TeamMembersSave').button( "option", "disabled", false );
		}
		else if ($(this).hasClass('EditorUnchecked')){
			$(this).parent().parent().attr('datachanged','Yes');
			$(this).parent().html('<img style="padding:3px; margin-right:3px;" src="'+cbchecked +'" title="Set as Editor" class="EditorChecked ui-button ui-widget ui-state-default ui-corner-all"/>');
			NotSavedCheck = true;
			$('.TeamMembersSave').button( "option", "disabled", false );
		}
	});	
	

	$('#TeamMembersTableBody').on('click','img.TeamMembersDeleteIcon',function(){
		var ParentTR = 	$(this).parent().parent();
		var Roles = ParentTR.find('.Roles input');
		Roles.each(function(index, item) {
			if($(item).data('id')!='New'){
			RemovedTeamMembers.push($(item).data('id')); 
			}	
		});		
		ParentTR.remove();
		$("#TeamMembersTable").trigger("update");
		$('.TeamMembersSave').button( "option", "disabled", false );
		NotSavedCheck = true;
	});	
		
	$('#TeamMembersTableBody').on('click','img.TeamMembersEditIcon',function(){
		$('#TeamMembersEdit input:checkbox').removeAttr('checked');
		var RoleClear = $('#TeamMembersEdit input:checkbox');
		RoleClear.each(function(index, item) {
			$(item).attr('dataid', 'New');
		});			
		var ParentTR = 	$(this).parent().parent();
		var Roles = ParentTR.find('.Roles input');
		var Division = ParentTR.find('.Division input').val();
		if (Division !=''){$('#TeamMembersEdit select.DivisionSelectBox').val(Division);}
		$('#TeamMembersEdit .TeamMembersEdit').attr( "CurrentID", ParentTR.data('id') );
		Roles.each(function(index, item) {
			$('#TeamMembersEdit :checkbox[datavalue="'+$(item).data('value')+'"]').prop('checked', true);
			$('#TeamMembersEdit :checkbox[datavalue="'+$(item).data('value')+'"]').attr('dataid', $(item).data('id'));
		});
		
		$('#EditUserName').html(ParentTR.find('.TMName').text());
		$("#TeamMembersEdit").dialog("open");	
		//LoadUser(ParentTR.find('.TMName').data('value'));
	});	

	initializePeoplePicker('peoplePickerTeamMembers');
	if($('#TeamMembersTable tr[datachanged="Yes"]').length != 0){
		$('.TeamMembersSave').button( "option", "disabled", false );
		NotSavedCheck = true;	
	}
	
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
    //debugger;
    MultiAddlength = userArray.length;
    context.executeQueryAsync(function() {
        $.each(users,function(index, item) {

             //alert(userArray[i].get_id());
			AddTeamMemberToTable(userArray[index].get_id(), userArray[index].get_title());             
        });
    }, 
    function(sender, args) {});
    context.dispose();    
}
function ensureUserSuccessNew() {
	//alert(user.get_id());
	//AddApprovalToTable(this.user.get_id(), this.user.get_title());
}

function onFail(sender, args) {
    alert('Query failed. Error: ' + args.get_message());
}
function AddTeamMemberToTable(UserID, UserTitle){
			MultiAddlength--;
			var html = '';
			var UserNotfound = $('#TeamMembersTable .TMName[data-value='+UserID+']').length == 0;
		if(UserNotfound){	
			var Roles = $('#TeamMembersAdd :checkbox:checked');
			var Division = $('#TeamMembersAdd .DivisionSelectBox option:selected').val();
			var TeamLeader = false;
			NewItemCounter++; 
			html = '<tr data-id="New'+NewItemCounter+'">';
			html += '<td style="vertical-align:middle"><img data-url="" title="Remove Team Member" class="TeamMembersDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="'+removeimage +'"/>';
			html += '<img title="Edit Team Member" class="TeamMembersEditIcon ui-button ui-widget ui-state-default ui-corner-all" src="'+editimage +'"/>';
			html += '</td>';
			html += '<td class="TMName" data-value="'+UserID+'">'+UserTitle+'</td>';
			html += '<td class="Roles">';
			Roles.each(function(index, item) {
				html += $(item).data('value') + ', ';
				if ($(item).data('value')=='Team Leader'){TeamLeader=true;}
			});	
			Roles.each(function(index, item) {
				html += '<input class="role" style="display:none" data-id="'+$(item).data('id')+'" data-value="'+$(item).data('value')+'"/>';
			});				
			html += '</td>';
			html += '<td class="Editor">';
			if (TeamLeader){
				html += '<img style="padding:3px; margin-right:3px;" src="'+cbchecked +'" title="Set as Editor" class="EditorTeamLeader ui-button-disabled ui-state-disabled ui-button ui-widget ui-state-default ui-corner-all"/>';	
			}else{
				html += '<img style="padding:3px; margin-right:3px;" src="'+cbunchecked +'" title="Set as Editor" class="EditorUnchecked ui-button ui-widget ui-state-default ui-corner-all"/>';
			}
			html += '</td>';
			html += '<td class="Division">';
			html += $('#TeamMembersAdd .DivisionSelectBox option:selected').text();
			html += '<input class="Division" style="display:none" value="'+Division+'"/>';
			html += '</td>';
			html += '</tr>';
			$("#TeamMembersTableBody").append(html);
		}else{
			$("#TeamMembersDup").dialog("open");
			}
	
		if(MultiAddlength == 0){					    
			
			$("#TeamMembersTable").trigger("update");
			$("#TeamMembersAdd").dialog("close");
			$('html, body').animate({
			        scrollTop: $(document).height()
			    }, 'fast');
			ClearForm();
			$('.TeamMembersSave').button( "option", "disabled", false );
			NotSavedCheck = true;
			}
				    
}
//function EditTeamMembersToTable(UserID, UserTitle){
function EditTeamMembersToTable(){
			//debugger;
			var CurrentItemID = $('#TeamMembersEdit .TeamMembersEdit').attr("CurrentID");
			var CurrentItemTR = $('#TeamMembersTable tr[data-id="'+CurrentItemID +'"]');
			var RemovedRoles = $('#TeamMembersEdit :checkbox:not(:checked)[dataid!="New"]');
			var Division = $('#TeamMembersEdit .DivisionSelectBox option:selected').val();
			var TeamLeader = false;
			var Roleshtml='';
			var EditorBox='';
			var DivBox='';
			CurrentItemTR.attr('datachanged','Yes');
			RemovedRoles.each(function(index, item) {
				RemovedTeamMembers.push($(item).attr('dataid'));
			});			
			var Roles = $('#TeamMembersEdit :checkbox:checked');
			Roles.each(function(index, item) {
				Roleshtml += $(item).attr('datavalue') + ', ';
				if ($(item).attr('datavalue')=='Team Leader'){TeamLeader=true;}
			});	
			Roles.each(function(index, item) {
				Roleshtml += '<input class="role" style="display:none" data-id="'+$(item).attr('dataid')+'" data-value="'+$(item).attr('datavalue')+'"/>';
			});	
			CurrentItemTR.find('.Roles').html(Roleshtml);
			if (TeamLeader){
				EditorBox += '<img style="padding:3px; margin-right:3px;" src="'+cbchecked +'" title="Set as Editor" class="EditorTeamLeader ui-button-disabled ui-state-disabled ui-button ui-widget ui-state-default ui-corner-all"/>';	
			}else{
				EditorBox+= '<img style="padding:3px; margin-right:3px;" src="'+cbunchecked +'" title="Set as Editor" class="EditorUnchecked ui-button ui-widget ui-state-default ui-corner-all"/>';
			}
			CurrentItemTR.find('.Editor').html(EditorBox);			

			DivBox += $('#TeamMembersEdit .DivisionSelectBox option:selected').text();
			DivBox += '<input class="Division" style="display:none" value="'+Division+'"/>';
	    	CurrentItemTR.find('.Division').html(DivBox);
			$("#TeamMembersTable").trigger("update");
			$("#TeamMembersEdit").dialog("close");
			$('.TeamMembersSave').button( "option", "disabled", false );
			NotSavedCheck = true;

}

function saveLocalData(){
	//SaveType = 'New';
	var batch = '<ows:Batch OnError="Return">';
	

	var NewEditorItems = $('#TeamMembersTable').find('.Roles input[data-id="New"]');
	NewEditorItems.each(function(index, item) {
		var Parent = $(this).parent().parent();
		var Editor = 0;
		if(Parent.find('img.EditorChecked').length > 0){Editor=1;}
		var user = Parent.find('.TMName').data('value');
		batch += '<Method ID="A'+index+'"><SetList>%Team Members%</SetList><SetVar Name="ID">New</SetVar><SetVar Name="Cmd">Save</SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#SharePointUser">'+user+'</SetVar>';		
		if(Parent.find('input.Division').val()!=''){batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Title">'+ Parent.find('input.Division').val()+'</SetVar>';}		
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Role">'+ $(this).data('value')+'</SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#_x002a__x002a__x002a_wplu_x002a_"><![CDATA[';
		batch += '<Properties><Property><LookupKeyValue></LookupKeyValue><LookupLinkValue></LookupLinkValue><LookupDbStoreValue>'+$(this).data('value')+'</LookupDbStoreValue><LookupDisplayValue>'+$(this).data('value')+'</LookupDisplayValue></Property></Properties>';
		batch += ']]></SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Editor0">'+Editor+'</SetVar>';
		batch +='</Method>'; 
	});	
	var EditItems = $('#TeamMembersTable tr[datachanged="Yes"]').find('.Roles input[data-id!="New"]');
	EditItems.each(function(index, item) {
		var Parent = $(this).parent().parent();
		var NewitemTest = Parent.find('.Roles input[data-id="New"]') > 0
		var Editor = 0;
		if(Parent.find('img.EditorChecked').length > 0){Editor=1;}		
		var user = Parent.find('.TMName').data('value');
		if(!NewitemTest){
		batch += '<Method ID="A'+index+'"><SetList>%Team Members%</SetList><SetVar Name="ID">'+$(this).data('id')+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#SharePointUser">'+user+'</SetVar>';		
		if(Parent.find('input.Division').val()!=''){batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Title">'+ Parent.find('input.Division').val()+'</SetVar>';}
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Role">'+ $(this).data('value')+'</SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#_x002a__x002a__x002a_wplu_x002a_"><![CDATA[';
		batch += '<Properties><Property><LookupKeyValue></LookupKeyValue><LookupLinkValue></LookupLinkValue><LookupDbStoreValue>'+$(this).data('value')+'</LookupDbStoreValue><LookupDisplayValue>'+$(this).data('value')+'</LookupDisplayValue></Property></Properties>';
		batch += ']]></SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Editor0">'+Editor+'</SetVar>';
		batch +='</Method>'; 
		}
	});		
	$.each(RemovedTeamMembers,function(index, item) {
		batch += '<Method ID="D'+index+'"><SetList>%Team Members%</SetList><SetVar Name="ID">'+item+'</SetVar><SetVar Name="Cmd">Delete</SetVar></Method>';	
	});	 	
	
	batch +='</ows:Batch>';
	//debugger;
//alert(batch);
	$.ajax({
		type: 'POST',
		url: ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'ProcessBatchData',
		 		ListTitle: 'Team Members',
		 		SiteUrl: '%ISiteURL%',
				Batch: batch,
				OutputType: 'json' 
				},
		dataType: 'json',
		cache: false,
		async: true,
		success:function(json){
			//$("#ApprovalsAdd").dialog("close");
			//saveMainData();
			//$('#Approval').html(LoaderHTML);
			///NotSavedCheck = false;
			//ApprovalRender();
			CurrentReloadTab = 'Team Members';
			ResetRoleInheritance(ProjectSiteURL, 'reset');
											
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	});
}
function ClearForm(){
	$('#TeamMembersAdd input:checkbox').removeAttr('checked');	
	initializePeoplePicker('peoplePickerTeamMembers');	
}
