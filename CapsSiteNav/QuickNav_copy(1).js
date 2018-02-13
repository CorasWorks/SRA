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
	var SearchTimeOut = false;
	$('#SearchText').keyup(function () {
		if(SearchTimeOut) { clearTimeout(SearchTimeOut); }
		SearchTimeOut = setTimeout(function () {
			var SearchValue = new RegExp($('#SearchText').val(),'gi');
			var SearchMatches = [];
			var SearchMisses = []
			
			$('.jstree-node').filter(function(){ 
				var InnerTextContent = ('innerText' in this) ? 'innerText' : 'textContent';
				var MatchText = this[InnerTextContent];
				var HitCount = MatchText.match(SearchValue);
				if(HitCount != null && HitCount.length > 0)
					SearchMatches.push(this);
				else
					SearchMisses.push(this);
			});
			
			$(SearchMatches).addClass('SearchMatch').removeClass('SearchMiss');
			$(SearchMisses).addClass('SearchMiss').removeClass('SearchMatch');
		}, 250);
	});

	
});

function BuildQuickNav(json) {
	//$('#QuickNav').jstree({'core':{'data':json.NewDataSet.Sites.Site,themes:{'dots':false}}}).on('ready.jstree',function(){$(this).jstree('open_all');});
	$('#QuickNav').jstree({
	'core':{'data':json.NewDataSet.Sites.Site,themes:{'dots':false}}
  	})
	.on('ready.jstree',function(){
		//$(this).jstree('open_all');
		$('#QuickNav').show();
		//$('#SearchSites').show();
		$('#busyLoader').hide();
	});
	
	
}