$(document).ready(function () {

var cleared= true;
for (var i = 0; i < applicationJSON.length; i++) // Loop through tabs
{
	if(enabledAndAllowed(applicationJSON[i], navigationVM.currentUser))
	{
		var widgetCount = 0;
        var anyLevel2Enabled = false;
		for (var j = 0; j < applicationJSON[i].widgets.length; j++) // Loop through widgets for each tab
		{
			if(enabledAndAllowed(applicationJSON[i].widgets[j], navigationVM.currentUser))
			{
				widgetCount++;
                if(applicationJSON[i].widgets[j].enabled)
                {
                    anyLevel2Enabled = true;
                }
			}
		}
		if(widgetCount > 0)
		{
		
			for (var j = 0; j < applicationJSON[i].widgets.length; j++) // Loop through widgets for each tab
			{
				if (enabledAndAllowed(applicationJSON[i].widgets[j], navigationVM.currentUser))
				{
					//
				}
				else
				{
					pageArray = location.href.split('/'); 
					pageWithParms = pageArray[pageArray.length - 1].toLowerCase();
					pageArray = location.href.split('?')[0].split('#')[0].split('/');
					page = pageArray[pageArray.length - 1].toLowerCase();
					if(applicationJSON[i].widgets[j].link.toLowerCase() == page)
					{
						cleared=false;
						$('#busyLoader').hide();
					}
				}
			}
		}
	}
}

if(cleared){
Reportsload();
}
});
function Reportsload(){
$('#ProjectReportsMain').hide();
	$.ajax({
		 type:'POST',
         dataType:'html',
         url:'../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'BatchRequest',
			ConfigFileLocation: '[SRA Root]/Resources/PortfolioReports/PortfolioReports.xml',
			XsltLocation: '[SRA Root]/Resources/PortfolioReports/PortfolioReports.xslt',
			OutputType : 'html'
		},
		success: function(html){
			$('#ProjectReportsMain').html(html);
			$('#ProjectReportsMain').show();
			
			$('.SectionBaseRoot').on('click','.SectionBase',function(){
				 LaunchReport($(this).data('url'));
			})					
			$('#busyLoader').hide();
		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});	
	
}
function LaunchReport(URL) {
    var CWDialogOptions = {
        url: URL,
        title: 'Report',
        allowMaximize: true,
        showClose: true,
        showMaximized:true,
        autoSize:true
        //dialogReturnValueCallback: CWDialogCloseProjectApprovalRefresh
    };
    SP.UI.ModalDialog.showModalDialog(CWDialogOptions);
}
function LaunchActionWithChange(URL,Name,Max,Close) {
    var CWDialogOptions = {
        url: URL,
        title: Name,
        allowMaximize: true,
        showMaximized:Max,
        showClose: Close,
        autoSize:true,
        //dialogReturnValueCallback: CWDialogCloseActionWithChange
    };
    SP.UI.ModalDialog.showModalDialog(CWDialogOptions);
}

