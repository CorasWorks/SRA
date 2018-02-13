
$(document).ready(function () {
	//FTLcheck = true;
	noApplicationManagers2();
	//writeLocalMapDefinition();
});

//Only call this function if the local Map list is empty
function writeLocalMapDefinition() {

    $.ajax({
        url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
        data: { 'RequestType': 'BatchRequest', 'ConfigFileLocation': '[SRA Root]/resources/writeLocalMapDefCBD.xml', 'XsltLocation': '[SRA Root]/Resources/writeLocalMapDefXSLT.xslt', 'OutputType': 'Redirect' },
        dataType: 'json',
        async: true,
        cache: false,
        type: 'POST',
        success: function (json) {
			noApplicationManagers2();
        },
        error: function(xhr, status, error) {
        	//alert("Error:\n" + xhr.responseText);
        	noApplicationManagers2();
        }
    });
}
function noApplicationManagers2()
{
    //firstTimeDialog();
    var siteAdminUsers = '',
        pbd = [],
        methodStr;
    var thisuser = navigationVM.currentUser.ID.value + ';#' + navigationVM.currentUser.Name.value;
    pbd.push(new batchDataItem('Application Configuration', navigationVM.applicationConfigListGuid, 'Save', navigationVM.applicationConfig()[0].ows_ID(), 'ApplicationManagers', '7;#;#6'));
    methodStr = buildProcessBatchData(pbd);
    result = CAPSProcessBatchData(methodStr);

    //Todo: this needs to be converted to promise syntax
    if ( result['success'] ) {
    }
$.getScript( SRABase +"/Resources/Permissions/Permissions.js" ).done(function( script, textStatus ) {FirstLoadPerms();});

}
function FirstLoadPerms() {
FirstLoad = true;				
	   $.ajax({
	        url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		    data: { RequestType: 'BatchRequest', 
		    		ConfigFileLocation: '[SRA Root]/Resources/Permissions/PermissionsSiteLevel.xml', 
	    			OutputType:'JSON'
	    			},
	        dataType: 'json',
	        async: true,
	        cache: false,
	        type: 'POST',
	        success: function (json) {
		        var LocationItems="";
					if (json.NewDataSet.Projects.listitems["rs:data"].ItemCount == 0){
						//alert('Permissions Could not be set.');
						SP.UI.ModalDialog.commonModalDialogClose();
					}
					else if (json.NewDataSet.Projects.listitems["rs:data"].ItemCount == 1){
						if (json.NewDataSet.Projects.listitems["rs:data"]["z:row"].ows_SecurityApplied == 'Yes'){
								ResetRoleInheritance(json.NewDataSet.Projects.listitems["rs:data"]["z:row"].ows_URL, 'reset');
							}
						else{	
						var userfull = json.NewDataSet.Projects.listitems["rs:data"]["z:row"].ows_TeamLeader;
						userfull = userfull.substring(0,userfull.indexOf(';#'));
						SetPermissionsInital(json.NewDataSet.Projects.listitems["rs:data"]["z:row"].ows_URL, json.NewDataSet.Projects.listitems["rs:data"]["z:row"].ows_ID, userfull);
						} 
					}					
				
				        	       	
	        },
	        error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	
	    });	

    
 }


