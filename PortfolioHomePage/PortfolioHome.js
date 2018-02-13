$(document).ready(function () {
PortfolioHomeload();

});
function PortfolioHomeload(){
$('#PortfolioMain').hide();
	$.ajax({
		 type:'POST',
         dataType:'html',
         url:'../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'BatchRequest',
			ConfigFileLocation: '[SRA Root]/Resources/PortfolioHomePage/PortfolioHome.xml',
			XsltLocation: '[SRA Root]/Resources/PortfolioHomePage/PortfolioHome.xslt',
			OutputType : 'html'
		},
		success: function(html){
			$('#PortfolioMain').html(html);
			$('#PortfolioMain').show();
			$('#busyLoader').hide();
		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});	
	
}
