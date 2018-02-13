var ProjectURL = '';

$(document).ready(function () {
ProjectURL = getParameterByName('ProjectURL');
Approvalload();

});
function Approvalload(){
$('#ProjectApprovalsMain').hide();
	$.ajax({
		 type:'POST',
         dataType:'html',
         url:ProjectURL + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'BatchRequest',
			ConfigFileLocation: '[SRA Root]/Resources/ProjectCharterV2/ProjectApprovalSingle.xml',
			APID: getParameterByName('APID'), 
			XsltLocation: '[SRA Root]/Resources/ProjectCharterV2/ProjectApprovalSingle.xslt',
			OutputType : 'html'
		},
		success: function(html){
			$('#ProjectApprovalsMain').html(html);
			$('#ProjectApprovalsMain').show();			
			$('#busyLoader').hide();
		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});	
	
}
function ForceDocDL(Origin,ItemURL)
{
	
	parent.STSNavigate(Origin+'/_layouts/download.aspx?SourceURL=' + ItemURL);

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
