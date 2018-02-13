var PrintParam = '';
var LoaderHTML = '<div id="busyLoader" style="text-align: center;">'
			    + '<h2 style="text-align:center">'
			    + '<span id="busySpinner"></span>'
			    + '<img src="[SRA Root]/_layouts/AppDesigner/Apps/ApplicationDesigner/Images/ProcessDesigner.gif" style="vertical-align:middle;padding:5px">'
			    + '<br>'
			    + 'Loading...'
			    + '</h2>'
			    //+ "Don't refresh the page, just wait patiently please"
				+ '</div>';


$(document).ready(function () {
Approvalload();

});
function Approvalload(){
$('#ProjectApprovalsMain').hide();
	$.ajax({
		 type:'POST',
         dataType:'html',
         url:'../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'BatchRequest',
			ConfigFileLocation: '[SRA Root]/Resources/ApprovalsDisplay/ProjectApproval.xml',
			XsltLocation: '[SRA Root]/Resources/ApprovalsDisplay/ProjectApprovalsDisplay.xslt',
			OutputType : 'html'
		},
		success: function(html){
			$('#ProjectApprovalsMain').html(html);
			$('#ProjectApprovalsMain').show();
			
			$('#PCDisplayRoot').on('click','img.CharterEditIcon',function(){
				 LaunchProjectEdit($(this).data('url'));
			})					
			$('#busyLoader').hide();
		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});	
	
}
function ForceDocDL(Origin,ItemURL)
{
	
	STSNavigate(Origin+'/_layouts/download.aspx?SourceURL=' + ItemURL);

}
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
function LaunchProjectApproval(URL) {
    var CWDialogOptions = {
        url: URL,
        title: 'Edit',
        allowMaximize: true,
        showClose: true,
        autoSize:true,
        dialogReturnValueCallback: CWDialogCloseProjectApprovalRefresh
    };
    SP.UI.ModalDialog.showModalDialog(CWDialogOptions);
}
function CWDialogCloseProjectApprovalRefresh()
{
		$('#ProjectApprovalsMain').hide();
		$('#busyLoader').show();
		Approvalload();
}
