$(document).ready(function () {
Reportsload();

});
function Reportsload(){
$('#ProjectReportsMain').hide();
	$.ajax({
		 type:'POST',
         dataType:'html',
         url:'../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'BatchRequest',
			ConfigFileLocation: '[SRA Root]/Resources/ProjectReports/ProjectReports.xml',
			XsltLocation: '[SRA Root]/Resources/ProjectReports/ProjectReports.xslt',
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

