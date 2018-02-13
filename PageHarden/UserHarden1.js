$(function()
{
//RedirectCheckIN();
});
function RedirectCheckIN() {
	   if (window.location.href.indexOf("AppPages/AppMgrs.aspx?IsDlg=1") > -1 || window.location.href.indexOf("_layouts/Upload.aspx?") > -1 || window.location.href.indexOf("Forms/Upload.aspx") > -1 || window.location.href.indexOf("_layouts/Versions.aspx") > -1 || window.location.href.indexOf("Forms/EditForm.aspx") > -1 || window.location.href.indexOf("Forms/DispForm.aspx") > -1 || window.location.href.indexOf("_layouts/checkin.aspx") > -1){
		}
		else{	
		RedirectCheck();
		}

}


function RedirectCheck() {
	$.ajax({
		type: "POST",
		cache: false,
		url: CurrentURL + "/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx",
		data:{
			RequestType: 'BatchRequest',
			ConfigFileLocation: '[SRA Root]/Resources/PageHarden/UserHarden.xml',
			XsltLocation: '[SRA Root]/Resources/PageHarden/UserHarden.xslt',
			OutputType:'json'
			},
		dataType: 'json',	
		success: Redirect,
		error: CatchProblem
	});
}
function Redirect(json) {
try
   {
		var response = json.NewDataSet.Admin;
		if (response){
			}
		else{
			window.location = CurrentURL;
			}
   }
 catch(err)
   {
		window.location = CurrentURL;
   }

}
function CatchProblem(xml)
{
	window.location = CurrentURL;
}


