$(function () {




	$.ajax({
	    url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
	    data: { 
	    	RequestType: 'BatchRequest',
	    	ConfigFileLocation: '[SRA Root]/Resources/CapsSiteNav/QuickNav.xml',
	    	XsltLocation: '[SRA Root]/Resources/CapsSiteNav/QuickNav.xslt',
	    	OutputType: 'json'
	    },
	    dataType: 'json',
	    success: BuildQuickNav,
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	});
	
	$('#QuickNav').on('select_node.jstree',function(event,data){
		window.open(data.node.a_attr.href);
	});
	
});

function BuildQuickNav(json) {
	$('#QuickNav').jstree({
		"plugins" : [ "search" ],
		'core':{'data':json.NewDataSet.Sites.Site,themes:{'dots':false}}
	  	})
	  	.on('ready.jstree',function(){
		//$(this).jstree('open_all');
		$('#QuickNav').show();
		$('#SearchSites').show();
		$('#busyLoader').hide();
	});


							
	var to = false;
	$('#SearchText').keyup(function () {
		if(to) { clearTimeout(to); }
		to = setTimeout(function () {
			var v = $('#SearchText').val();
			$('#QuickNav').jstree(true).search(v);
		}, 250);
	});
	
}