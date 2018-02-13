<%@ Page language="C#" MasterPageFile="~masterurl/default.master"    Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage,Microsoft.SharePoint,Version=15.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document"  %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> 
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> 
<%@ Import Namespace="Microsoft.SharePoint" %> 
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> 
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
	<script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.1.min.js"></script>
	<SharePoint:ScriptLink name="clienttemplates.js" runat="server" LoadAfterUI="true" Localizable="false"/>
    <SharePoint:ScriptLink name="clientforms.js" runat="server" LoadAfterUI="true" Localizable="false"/>
    <SharePoint:ScriptLink name="clientpeoplepicker.js" runat="server" LoadAfterUI="true" Localizable="false"/>
    <SharePoint:ScriptLink name="autofill.js" runat="server" LoadAfterUI="true" Localizable="false"/>
    <SharePoint:ScriptLink name="sp.js" runat="server" LoadAfterUI="true" Localizable="false"/>
    <SharePoint:ScriptLink name="sp.runtime.js" runat="server" LoadAfterUI="true" Localizable="false"/>
    <SharePoint:ScriptLink name="sp.core.js" runat="server" LoadAfterUI="true" Localizable="false"/>
	<div>People Picker:</div>
    <div style="padding-bottom:20px;" id="peoplePickerDiv"></div>
    <div>
        <div>
        	<input type="button" value="Get User Info" onclick="getUserInfo()"></input>
        </div>
        <div>
	        <h1>User info:</h1>
	        <p id="resolvedUsers"></p>
	        <h1>User keys:</h1>
	        <p id="userKeys"></p> 
	        <h1>User ID:</h1>
	        <p id="userId"></p>
        </div>
    </div>
	<script type="text/javascript">
		// Run your custom code when the DOM is ready.
		$(document).ready(function () {
		
		    // Specify the unique ID of the DOM element where the
		    // picker will render.
		    initializePeoplePicker('peoplePickerDiv');
		});
		
		// Render and initialize the client-side People Picker.
		function initializePeoplePicker(peoplePickerElementId) {
		
		    // Create a schema to store picker properties, and set the properties.
		    var schema = {};
		    schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
		    schema['SearchPrincipalSource'] = 15;
		    schema['ResolvePrincipalSource'] = 15;
		    schema['AllowMultipleValues'] = true;
		    schema['MaximumEntitySuggestions'] = 50;
		    schema['Width'] = '280px';
		
		    // Render and initialize the picker. 
		    // Pass the ID of the DOM element that contains the picker, an array of initial
		    // PickerEntity objects to set the picker value, and a schema that defines
		    // picker properties.
		    this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
		}
		
		// Query the picker for user information.
		function getUserInfo() {
		
		    // Get the people picker object from the page.
		    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan;
		
		    // Get information about all users.
		    var users = peoplePicker.GetAllUserInfo();
		    var userInfo = '';
		    for (var i = 0; i < users.length; i++) {
		        var user = users[i];
		        for (var userProperty in user) { 
		            userInfo += userProperty + ':  ' + user[userProperty] + '<br>';
		        }
		    }
		    $('#resolvedUsers').html(userInfo);
		
		    // Get user keys.
		    var keys = peoplePicker.GetAllUserKeys();
		    $('#userKeys').html(keys);
		
		    // Get the first user's ID by using the login name.
		    getUserId(users[0].Key);
		}
		
		// Get the user ID.
		function getUserId(loginName) {
		    var context = new SP.ClientContext.get_current();
		    this.user = context.get_web().ensureUser(loginName);
		    context.load(this.user);
		    context.executeQueryAsync(
		         Function.createDelegate(null, ensureUserSuccess), 
		         Function.createDelegate(null, onFail)
		    );
		}
		
		function ensureUserSuccess() {
		    $('#userId').html(this.user.get_id());
		    //alert(this.user.get_id());
		}
		
		function onFail(sender, args) {
		    alert('Query failed. Error: ' + args.get_message());
		}	
	</script>        
		
</asp:Content>