var RemovedApprovals = new Array();
var TeamMemberPermUsers = new Array();
var NewSaveItemsLength = 0;
var NewSaveItemsDone = 0;
var NewItemCounter = 0;
var MultiAddlength = 0;

$(document).ready(function () {
	$("#ApprovalTable").tablesorter({
		sortList: [[3,0]],
		widgets: ["filter"],
		widthFixed: true,
		
	});

	$( ".ApprovalSave" ).button({icons: {secondary: "ui-icon-circle-check"}}).click(function(event ) {
		event.preventDefault();
		//saveLocalData();
		NotSavedCheck = false;
		$("#ApprovalData").hide();
		$("#ApprovalReload").show();
		saveNewItems();
	});
	
	$("#ApprovalsAdd").dialog({
      autoOpen: false,
      modal: true,
      width: 500     
    });
	$("#ApprovalsEdit").dialog({
      autoOpen: false,
      modal: true,
      width: 500     
    });
    $("#ApprovalError").dialog({
      autoOpen: false,
      modal: true,   
    })
    
	$('input.DueDate').datepicker({
		dateFormat: "mm-dd-yy",
		altField: "#sharePointDate",
		altFormat: "yy-mm-dd"
	})
	$( ".ApprovalAdd" ).unbind();    
	$( ".ApprovalAdd" ).button().click(function(event ) {
		event.preventDefault();
		ClearForm();
		$("#ApprovalsAdd").dialog("open");
	});
	$( ".ApprovalNewAdd" ).unbind();
	$( ".ApprovalNewAdd" ).button().click(function(event ) {
		event.preventDefault();
		var APTitle = $('#ApprovalsAdd .Title').val();
		var APDueDate = $('#ApprovalsAdd .DueDate').val();
	    var users = SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerApprover_TopSpan.GetAllUserInfo();
		if(APTitle !='' && APDueDate !='' && users.length != 0 ){
			getUserInfoNew();
		}
		else{
			
			$("#ApprovalError").dialog("open");
		}
	});
	$( ".ApprovalEdit" ).unbind();
	$( ".ApprovalEdit" ).button().click(function(event ) {
		event.preventDefault();
		var APTitle = $('#ApprovalsEdit .Title').val();
		var APDueDate = $('#ApprovalsEdit .DueDate').val();
	    var users = SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerApproverEdit_TopSpan.GetAllUserInfo();
		if(APTitle !='' && APDueDate !='' && users.length != 0 ){
			getUserInfoEdit();
		}
		else{
			
			$("#ApprovalError").dialog("open");
		}
		
	});

	$('#ApprovalTable').on('click','img.PCDeleteIcon',function(){
		RemovedApprovals.push($(this).parent().parent().data('id')); 	
		$(this).parent().parent().remove();
		$("#ApprovalTable").trigger("update");
		$('.ApprovalSave').button( "option", "disabled", false );
		NotSavedCheck = true;
	});	
	$('#ApprovalTable').on('click','img.ApprovalEditIcon',function(){
		var ParentTR = 	$(this).parent().parent();
		$('#ApprovalsEdit .ApprovalEdit').attr( "CurrentID", ParentTR.data('id') );
		$('#ApprovalsEdit .Title').val(ParentTR.find('.APTitle').data('value'));
		$('#ApprovalsEdit .LinkedDoc').prop('selectedIndex',0);	
		$('#ApprovalsEdit .LinkedDoc').find('option[value="'+ ParentTR.find('.APDocument').data('docname')+'"]').attr('selected','selected');
		$('#ApprovalsEdit .Description').val(ParentTR.find('.APDescription').val());
		$('#ApprovalsEdit .DueDate').datepicker( "setDate", ParentTR.find('.APDueDate').text() );
		LoadUser(ParentTR.find('.APApprover').data('value'));
	});	
	$('#ApprovalTable').on('click','img.PCEmailAlert',function(){
		SentEmailAlert($(this).parent().parent().data('id'),true);
	});	
	
	initializePeoplePicker('peoplePickerApprover');
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

    SPClientPeoplePicker_InitStandaloneControlWrapper('peoplePickerApproverEdit', users, schema);
    $("#ApprovalsEdit").dialog("open");

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

    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerApproverEdit_TopSpan;
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
	EditApprovalToTable(this.user.get_id(), this.user.get_title());
}

function getUserInfoNew() {

    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerApprover_TopSpan;
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
			AddApprovalToTable(userArray[index].get_id(), userArray[index].get_title());             
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
function AddApprovalToTable(UserID, UserTitle){
			MultiAddlength--;
			var html = '';
			var docid = '';
			var docurl= '';
			var docname= '';
			NewItemCounter++; 
			if($('#ApprovalsAdd .LinkedDoc').val() != '' && $('#ApprovalsAdd .LinkedDoc').val() != null && $('#ApprovalsAdd .LinkedDoc').val() != 'None'){
				docid = $('#ApprovalsAdd .LinkedDoc option:selected').data('id');
				docurl= $('#ApprovalsAdd .LinkedDoc option:selected').data('url');
				docname= $('#ApprovalsAdd .LinkedDoc').val();
			}
			html = '<tr data-id="New'+NewItemCounter+'">';
			html += '<td style="vertical-align:middle"><img data-url="" title="Remove Year" class="PCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="'+removeimage +'"/>';
			html += '<img data-url="" title="Edit Approval" class="ApprovalEditIcon ui-button ui-widget ui-state-default ui-corner-all" src="'+editimage +'"/>';
			html += '<textarea style="display:none" class="APDescription">'+ $('#ApprovalsAdd .Description').val()+'</textarea>';			
			html += '<input style="display:none" class="APDocument"  data-docid="'+docid +'"  data-docurl="'+docurl+'"  data-docname="'+docname+'"/></td>';			
			html += '<td class="APTitle" data-value="'+$('#ApprovalsAdd .Title').val()+'">'+$('#ApprovalsAdd .Title').val()+'</td>';
			html += '<td class="APApprover" data-value="'+UserID+'">'+UserTitle+'</td>';
			html += '<td class="APDueDate" data-value="'+$.datepicker.formatDate('yy-mm-dd', $("#ApprovalsAdd .DueDate").datepicker('getDate'))+'">'+$.datepicker.formatDate('mm-dd-yy', $("#ApprovalsAdd .DueDate").datepicker('getDate'))+'</td>';
			html += '<td data-value=""></td>';
			html += '<td data-value=""></td>';			
			html += '</tr>';
			$("#ApprovalTableBody").append(html);
		if(MultiAddlength == 0){					    
			
			$("#ApprovalTable").trigger("update");
			$("#ApprovalsAdd").dialog("close");
			$('html, body').animate({
			        scrollTop: $(document).height()
			    }, 'fast');
			ClearForm();
			$('.ApprovalSave').button( "option", "disabled", false );
			NotSavedCheck = true;
			}
				    
}
function EditApprovalToTable(UserID, UserTitle){
			//debugger;
			var CurrentItemID = $('#ApprovalsEdit .ApprovalEdit').attr("CurrentID");
			var CurrentItemTR = $('#ApprovalTableBody tr[data-id="'+CurrentItemID +'"]');
			var docid = '';
			var docurl= '';
			var docname= '';
			if($('#ApprovalsEdit .LinkedDoc').val() != '' && $('#ApprovalsEdit .LinkedDoc').val() != null && $('#ApprovalsEdit .LinkedDoc').val() != 'None'){
				docid = $('#ApprovalsEdit .LinkedDoc option:selected').data('id');
				docurl= $('#ApprovalsEdit .LinkedDoc option:selected').data('url');
				docname= $('#ApprovalsEdit .LinkedDoc').val();
			}
			
			CurrentItemTR.attr("Changed", 'Yes');
			CurrentItemTR.find('.APDescription').val($('#ApprovalsEdit .Description').val());
			CurrentItemTR.find('.APTitle').data('value', $('#ApprovalsEdit .Title').val());
			CurrentItemTR.find('.APTitle').text($('#ApprovalsEdit .Title').val());
			CurrentItemTR.find('.APApprover').data('value', UserID);
			CurrentItemTR.find('.APDocument').data('docid', docid);
			CurrentItemTR.find('.APDocument').data('docurl', docurl);
			CurrentItemTR.find('.APDocument').data('docname', docname);
			CurrentItemTR.find('.APApprover').text(UserTitle);
			CurrentItemTR.find('.APDueDate').data('value', $.datepicker.formatDate('yy-mm-dd', $("#ApprovalsEdit .DueDate").datepicker('getDate')));
			CurrentItemTR.find('.APDueDate').text($.datepicker.formatDate('mm-dd-yy', $("#ApprovalsEdit .DueDate").datepicker('getDate')));
			CurrentItemTR.find('img.PCEmailAlert').remove();	    
			$("#ApprovalTable").trigger("update");
			$("#ApprovalsEdit").dialog("close");
			$('.ApprovalSave').button( "option", "disabled", false );
			NotSavedCheck = true;
			//alert($('#ApprovalsEdit .LinkedDoc option:selected').data('id')+'-'+('#ApprovalsEdit .LinkedDoc option:selected').data('url')+'-'+$('#ApprovalsEdit .LinkedDoc').val());	    
}

function saveLocalData(){
	//SaveType = 'New';
	var batch = '<ows:Batch OnError="Return">';
	var NewItems = $('#ApprovalTableBody tr[data-id*="New"]');
	NewItems.each(function(index, item) {
		batch += '<Method ID="A'+index+'"><SetList>%Approvals%</SetList><SetVar Name="ID">New</SetVar><SetVar Name="Cmd">Save</SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Title">'+$(this).find('.APTitle').data('value')+'</SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Description"><![CDATA['+ $(this).find('.APDescription').val()+']]></SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#LinkedDocID">'+ $(this).find('.APDocument').data('docid')+'</SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#LinkedDocURL">'+ $(this).find('.APDocument').data('docurl')+'</SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#LinkedDocTitle">'+ $(this).find('.APDocument').data('docname')+'</SetVar>';		
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Approver">'+$(this).find('.APApprover').data('value')+'</SetVar>';	
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#DueDate">'+$(this).find('.APDueDate').data('value') +'T12:00:00Z</SetVar>';
		batch +='</Method>'; 
		//TeamMemberPermUsers.push(); 
	});	
	$.each(RemovedApprovals,function(index, item) {
		batch += '<Method ID="D'+index+'"><SetList>%Approvals%</SetList><SetVar Name="ID">'+item+'</SetVar><SetVar Name="Cmd">Delete</SetVar></Method>';
		//TeamMemberRemove(item);	
	});	 
	var EditItems = $('#ApprovalTableBody tr[changed="Yes"]');
	EditItems .each(function(index, item) {
		batch += '<Method ID="E'+index+'"><SetList>%Approvals%</SetList><SetVar Name="ID">'+$(this).data('id')+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Title">'+$(this).find('.APTitle').data('value')+'</SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Description"><![CDATA['+ $(this).find('.APDescription').val()+']]></SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#LinkedDocID">'+ $(this).find('.APDocument').data('docid')+'</SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#LinkedDocURL">'+ $(this).find('.APDocument').data('docurl')+'</SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#LinkedDocTitle">'+ $(this).find('.APDocument').data('docname')+'</SetVar>';		
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Approver">'+$(this).find('.APApprover').data('value')+'</SetVar>';	
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#DueDate">'+$(this).find('.APDueDate').data('value') +'T12:00:00Z</SetVar>';
		batch +='</Method>';
		//ChangedTeamMemberRemove(APID,$(this).find('.APApprover').data('value'),'SiteLevelApprover') 
	});	
	
	
	batch +='</ows:Batch>';
	
//alert(batch);

	$.ajax({
		type: 'POST',
		url: ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'ProcessBatchData',
		 		ListTitle: 'Approvals',
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
			$('#Approval').html(LoaderHTML);
			NotSavedCheck = false;
			if(NotSavedCloseCheck){CloseEditMain();}
			ApprovalRender();								
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	});
}
function ClearForm(){
	$('#ApprovalsAdd .Title').val('');
	$('#ApprovalsAdd .Description').val('');
	$( "#ApprovalsAdd .DueDate" ).datepicker( "setDate", "" );
	initializePeoplePicker('peoplePickerApprover');
	$('#ApprovalsAdd .LinkedDoc').prop('selectedIndex',0);	
}
function saveNewItems(){
	var NewItems = $('#ApprovalTableBody tr[data-id*="New"]');
	NewSaveItemsLength = NewItems.length;
	NewItems.each(function(index, item) {
		var batch = '<ows:Batch OnError="Return">';
		batch += '<Method ID="A1"><SetList>%Approvals%</SetList><SetVar Name="ID">New</SetVar><SetVar Name="Cmd">Save</SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Title">'+$(this).find('.APTitle').data('value')+'</SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Description"><![CDATA['+ $(this).find('.APDescription').val()+']]></SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Approver">'+$(this).find('.APApprover').data('value')+'</SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#DueDate">'+$(this).find('.APDueDate').data('value') +'T12:00:00Z</SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#LinkedDocID">'+ $(this).find('.APDocument').data('docid')+'</SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#LinkedDocURL">'+ $(this).find('.APDocument').data('docurl')+'</SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#LinkedDocTitle">'+ $(this).find('.APDocument').data('docname')+'</SetVar>';			
		batch +='</Method>';
		batch +='</ows:Batch>';
		saveNewItemsSingle(batch, $(this).find('.APApprover').data('value')); 
		
	});
	if(NewItems.length == 0){
		saveExsitingItems();
	}		

}

function saveNewItemsSingle(batch, UserID){
	$.ajax({
		type: 'POST',
		url: ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'ProcessBatchData',
		 		ListTitle: 'Approvals',
		 		SiteUrl: '%ISiteURL%',
				Batch: batch,
				OutputType: 'json' 
				},
		dataType: 'json',
		cache: false,
		async: true,
		success:function(json){
			NewSaveItemsDone++;
			var ReturnID = '';
			if (json.NewDataSet.ProcessBatchData.Results.Result.ID[1]){
				ReturnID =json.NewDataSet.ProcessBatchData.Results.Result.ID[1];
			}
			if(NewSaveItemsLength == NewSaveItemsDone){
				createTeamMemberJSON(ReturnID,UserID);
				SentEmailAlert(ReturnID,false);
				saveExsitingItems();
				
			}
			else{
				createTeamMemberJSON(ReturnID,UserID);
				SentEmailAlert(ReturnID,false);
			}
			
			//$("#ApprovalsAdd").dialog("close");
			//saveMainData();
			//$('#Approval').html(LoaderHTML);
			//NotSavedCheck = false;
			//ApprovalRender();
			//TeamMemberPermUsers.push(+';#'+UserID); 								
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	});
}
function saveExsitingItems(){
	//SaveType = 'New';
	var batch = '<ows:Batch OnError="Return">';
	$.each(RemovedApprovals,function(index, item) {
		batch += '<Method ID="D'+index+'"><SetList>%Approvals%</SetList><SetVar Name="ID">'+item+'</SetVar><SetVar Name="Cmd">Delete</SetVar></Method>';
	});	 
	var EditItems = $('#ApprovalTableBody tr:not([data-id*="New"])[changed="Yes"]');
	EditItems .each(function(index, item) {
		batch += '<Method ID="E'+index+'"><SetList>%Approvals%</SetList><SetVar Name="ID">'+$(this).data('id')+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Title">'+$(this).find('.APTitle').data('value')+'</SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Description"><![CDATA['+ $(this).find('.APDescription').val()+']]></SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Approver">'+$(this).find('.APApprover').data('value')+'</SetVar>';	
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#DueDate">'+$(this).find('.APDueDate').data('value') +'T12:00:00Z</SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#LinkedDocID">'+ $(this).find('.APDocument').data('docid')+'</SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#LinkedDocURL">'+ $(this).find('.APDocument').data('docurl')+'</SetVar>';
		batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#LinkedDocTitle">'+ $(this).find('.APDocument').data('docname')+'</SetVar>';			
		batch +='</Method>';
		//createTeamMemberJSON($(this).data('id'),$(this).find('.APApprover').data('value'));
	});	
	var ExsitingItems = $('#ApprovalTableBody tr:not([data-id*="New"])');
	ExsitingItems.each(function(index, item) {
		createTeamMemberJSON($(this).data('id'),$(this).find('.APApprover').data('value'));
	});	
	
	
	batch +='</ows:Batch>';
	
//alert(batch);

	$.ajax({
		type: 'POST',
		url: ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'ProcessBatchData',
		 		ListTitle: 'Approvals',
		 		SiteUrl: '%ISiteURL%',
				Batch: batch,
				OutputType: 'json' 
				},
		dataType: 'json',
		cache: false,
		async: true,
		success:function(json){
			TeamMemberRemove();					
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	});
}

/* Permissions Code */
function createTeamMemberJSON(OAPID, OUserID) {
		var item = {};
		item.UserID = OUserID;
        item.APID = OAPID;
        TeamMemberPermUsers.push(item);
}

function TeamMemberRemove(){
$.ajax({
		type:'POST',
		async: true,			 
		dataType:'json',
		url:ProjectSiteURL +'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'BatchRequest',
			ConfigFileLocation: '[SRA Root]/Resources/ProjectEdit/SitePermissionsCheck.xml',
			OutputType : 'json'
		},
		success: function(json){
					if (json.NewDataSet.TeamMembers.listitems["rs:data"].ItemCount > 0) {
							var batch = '<ows:Batch OnError="Return">';
							$.each(json.NewDataSet.TeamMembers.listitems["rs:data"]["z:row"],function(index, item) {
								batch += '<Method ID="D'+index+'"><SetList>%Team Members%</SetList><SetVar Name="ID">'+item.ows_ID+'</SetVar><SetVar Name="Cmd">Delete</SetVar></Method>';	
							});	 
							batch +='</ows:Batch>';	
							DeleteProjectUsers(batch);	
						}
					else{
							BuildProjectUsers();
						}		
							
		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});	


}

function DeleteProjectUsers(batch){
					$.ajax({
						type: 'POST',
						url: ProjectSiteURL + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
						data: { RequestType: 'ProcessBatchData',
						 		ListTitle: 'Team Members',
								Batch: batch,
								OutputType: 'json' },
						dataType: 'json',
						cache: false,
						async : true,
						success:function(json){
							BuildProjectUsers();
				        },
						error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
				
					});

}
function BuildProjectUsers(){
	var ToWrite = '<ows:Batch OnError="Return">';
	var Role = 'SiteLevelApprover';
	$.each(TeamMemberPermUsers,function(index, item) {
		ToWrite += '<Method ID="A1"><SetList>%Team Members%</SetList><SetVar Name="ID">New</SetVar><SetVar Name="Cmd">Save</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#SharePointUser">'+item.UserID +'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#APID">'+item.APID+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Role">'+Role+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#_x002a__x002a__x002a_wplu_x002a_">';
		ToWrite += '<![CDATA[<Properties><Property><LookupKeyValue></LookupKeyValue><LookupLinkValue></LookupLinkValue><LookupDbStoreValue>'+Role+'</LookupDbStoreValue><LookupDisplayValue>'+Role+'</LookupDisplayValue></Property></Properties>]]>';
		ToWrite += '</SetVar>';
		ToWrite +='</Method>';
	});	 
	ToWrite +='</ows:Batch>';
//debugger;
	$.ajax({
		type: 'POST',
		url: ProjectSiteURL + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'ProcessBatchData',
		 		ListTitle: 'Team Members',
				Batch: ToWrite,
				OutputType: 'json' },
		dataType: 'json',
		cache: false,
		async : true,
		success:function(json){
			CurrentReloadTab = 'Project Approval';
			ResetRoleInheritance(ProjectSiteURL, 'reset');
			//$('#Approval').html(LoaderHTML);
			//NotSavedCheck = false;
			//ApprovalRender();							
        },				
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}

	});

}
function SentEmailAlert(ID,Manual){
	$.ajax({
        url: ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
	    data: { RequestType: 'ExecuteAction',
			    ListTitle: 'Approvals',
			    ActionUrl: '[SRA Root]/Actions%20Library/ProjectApprovalAlert.cwad', 
	    		ItemIds: ID,
    			OutputType:'JSON'
    			},
        dataType: 'json',
        async: true,
        cache: false,
        type: 'POST',
        success: function (json) {
        	if (Manual){
        		$("#StandardAlert").html('Email Alert Sent');
				$("#StandardAlert").dialog("open");	
        	}
        	//parent.CWDialogCloseLaunchEmailRefresh();    	       	
        },
        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}

    });	

}

/*
*/


