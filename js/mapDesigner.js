$(document).ready(function () {	
	//Menu events
	$('select#sraSelectMaps').on('change',function(){
		var selected=$(this).val();
		if(selected !== 'All' && selected > 0)
		{
			$('div.mapContainer').hide();
			$('#map'+selected).show().children('div.stages').show();		
		}
		else
		{
			$('div.stages').hide();		
			$('div.mapContainer').show();
		}
	}); 
	
	$('div.mapTitle').on('click',function(){
		$(this).next('div.stages').toggle();
	});
});