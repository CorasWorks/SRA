var ProjectSiteURL = '';
$(function () {

	if(getParameterByName('ProjectSite') !=''){
			ProjectSiteURL = getParameterByName('ProjectSite');
		}		
    $('#OpenCharterReport').button().click(function (event) {
    	event.preventDefault();
  		//parent.window.location = ProjectSiteURL;
        parent.LaunchTLReport(ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=GetFileContents&OutputType=html&FileUrl=[SRA Root]/Resources/ProjectCharter/ProjectCharterBase.htm');
  		
    });
    
    $('#OpenStatusReport').button().click(function (event) {
        event.preventDefault();
        parent.LaunchTLReport(ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=GetFileContents&OutputType=html&FileUrl=[SRA Root]/Resources/ProjectStatus/ProjectStatusReport.htm');
    });
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
