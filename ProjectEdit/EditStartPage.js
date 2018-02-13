var ProjectSiteURL = '';

$(function () {
		//debugger;		
	if(getParameterByName('ProjectSite') !=''){
			ProjectSiteURL = getParameterByName('ProjectSite');
			RenderProjectEdit(ProjectSiteURL);
		}		
    
});
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
function RenderProjectEdit(ProjectSiteURL) {
		$.ajax({
			 type:'POST',
	         dataType:'html',
	         url:ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
			data : {
				RequestType : 'GetFileContents',
				FileUrl: '[SRA Root]/Resources/ProjectEdit/ProjectEdit.htm',
				//XsltLocation: '[SRA Root]/Resources/ProjectEdit/ProjectEdit-Resources2.xslt',
				OutputType : 'html'
			},
			success: function(html){
					$('#PageOutput').html(html);					
			},
			error : function (xhr, status, error) {
				alert("Error:\n" + xhr.responseText);
			}
	
		});	    
}
