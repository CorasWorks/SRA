var ToSiteUrl = "";
var TOsJSON= new Array();

$(document).ready(function () {
	$('#BaseSearch').button().click(function(){
			//SiteDelete();
		return false;
	});
	$('#FixTOURL').button().click(function(){
		return false;
	});
	$('#MoveDocs').button().click(function(){
		return false;
	});
	$('#MoveDocs2').button().click(function(){
		return false;
	});
	
createChangeJSON(TOsJSON,'http://corning.corasworks.net/sites/sra/div18');
createChangeJSON(TOsJSON,'http://corning.corasworks.net/sites/sra/div19');
createChangeJSON(TOsJSON,'http://corning.corasworks.net/sites/sra/div20');
createChangeJSON(TOsJSON,'http://corning.corasworks.net/sites/sra/div21');
createChangeJSON(TOsJSON,'http://corning.corasworks.net/sites/sra/div22');
createChangeJSON(TOsJSON,'http://corning.corasworks.net/sites/sra/div23');
createChangeJSON(TOsJSON,'http://corning.corasworks.net/sites/sra/div24');
createChangeJSON(TOsJSON,'http://corning.corasworks.net/sites/sra/div25');
createChangeJSON(TOsJSON,'http://corning.corasworks.net/sites/sra/div26');
createChangeJSON(TOsJSON,'http://corning.corasworks.net/sites/sra/div27');
createChangeJSON(TOsJSON,'http://corning.corasworks.net/sites/sra/div28');
createChangeJSON(TOsJSON,'http://corning.corasworks.net/sites/sra/div29');
createChangeJSON(TOsJSON,'http://corning.corasworks.net/sites/sra/div30');


});

function SiteDelete(){

				$.each(TOsJSON,function(index,item) {
						$.ajax({
							type: 'POST',
							url: item.URL + '/_api/web',
							headers: { 
					        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
					        "X-HTTP-Method": "DELETE"  
					    	},
							cache: false,
							success:function(json){
									//alert('Done');
					        },
							error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
					
						});
		
				});


}



function createChangeJSON(Object, URL) {

		var item = {};
		item.URL= URL;
        Object.push(item);
}




