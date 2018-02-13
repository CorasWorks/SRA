var ToSiteUrl = "";
var TOsJSON= new Array();
var DocsJSON= new Array();
var DocsJSON2= new Array();

$(document).ready(function () {
	$('#BaseSearch').button().click(function(){
		WriteJSON();
		return false;
	});
	$('#FixTOURL').button().click(function(){
		
		FixTOfields('https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
		FixTOfields('https://fsnet.unisys.com/sites/cwidiq/home/vehicle26');
		FixTOfields('https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
		FixTOfields('https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
		FixTOfields('https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
		FixTOfields('https://fsnet.unisys.com/sites/cwidiq/home/vehicle30');
		FixTOfields('https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
		FixTOfields('https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
		FixTOfields('https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
		FixTOfields('https://fsnet.unisys.com/sites/cwidiq/home/vehicle34');
		FixTOfields('https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
		FixTOfields('https://fsnet.unisys.com/sites/cwidiq/home/vehicle36');
		FixTOfields('https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
		FixTOfields('https://fsnet.unisys.com/sites/cwidiq/home/vehicle38');
		FixTOfields('https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
		FixTOfields('https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
		FixTOfields('https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
		FixTOfields('https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
/*		*/
		//FixTOURL();
		/*
var ToWrite = '<ows:Batch OnError="Return">';
					ToWrite += '<Method ID="A1"><SetList>%Task Orders%</SetList><SetVar Name="ID">8</SetVar><SetVar Name="Cmd">Save</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">13</SetVar>';
					ToWrite +='</Method>';					
					ToWrite += '<Method ID="A2"><SetList>%Task Orders%</SetList><SetVar Name="ID">9</SetVar><SetVar Name="Cmd">Save</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">13</SetVar>';					
					ToWrite +='</Method></ows:Batch>';
		
$.ajax({
					type: 'POST',
					url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
					data: { RequestType: 'ProcessBatchData',
					 		ListTitle: 'Task Orders',
					 		SiteUrl: 'https://fsnet.unisys.com/sites/cwidiq/home/vehicle38',
							Batch: ToWrite,
							OutputType: 'json' },
					dataType: 'json',
		async : true,
		cache : false,

					
					success:function(json){
						//alert('Done!')							
			        },
			
					//success: ResetPage,
					error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
			
				});
		*/
		return false;
	});
	/*
	$('#MoveDocs').button().click(function(){
		MoveDocs();
		return false;
	});
	*/
	$('#MoveDocs').button().click(function(){
		MoveDocs1();
		return false;
	});
	$('#MoveDocs2').button().click(function(){
		ChangeDate();
		//MoveDocs2();
		return false;
	});

ToSiteUrl = "https://fsnet.unisys.com/sites/cwidiq/home/vehicle37";



createChangeJSON(TOsJSON,'1','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'2','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'3','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'4','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'5','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'6','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'7','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'8','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'9','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'10','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'11','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'12','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'13','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'14','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'15','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'16','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'17','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'18','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'19','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'20','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'21','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'22','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'23','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'24','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'25','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'26','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'27','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'28','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'29','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'30','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'31','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'32','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'33','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'34','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'35','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'36','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'37','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'38','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'39','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'40','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'41','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'42','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'43','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle39');
createChangeJSON(TOsJSON,'1','No Bid-PM','2010-3-4T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'3','Received','2015-1-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'2','No Bid-PM','2012-8-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'4','No Bid-VP','2012-11-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'5','No Bid-PM','2011-3-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'6','No Bid-PM','2009-11-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'7','No Bid-PM','2011-5-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'8','No Bid-PM','2009-12-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'9','No Bid-PM','2011-1-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'10','No Bid-PM','2011-8-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'11','No Bid-PM','2010-12-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'12','No Bid-PM','2011-6-29T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'13','No Bid-PM','2011-10-21T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'14','No Bid-PM','2010-10-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'15','No Bid-PM','2011-8-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'16','No Bid-PM','2009-7-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'17','No Bid-PM','2009-8-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'18','No Bid-PM','2009-5-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'19','No Bid-PM','2010-8-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'20','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'21','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'22','Sources Sought','2014-10-20T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'24','No Bid-PM','2011-4-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'23','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'28','No Bid-VP','2014-2-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'29','Lead','2014-4-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'30','RFI','2013-7-10T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'25','Retired','2011-2-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'31','Retired','2011-12-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'32','Retired','2012-2-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'33','Retired','2012-1-31T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'34','Retired','2012-1-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'35','Retired','2012-1-5T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'36','Lead','2012-3-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'37','Lead','2009-4-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'38','Retired','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'39','Retired','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'26','Retired','2011-12-6T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'27','No Bid-PM','2011-6-15T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'40','No Bid-PM','2012-1-4T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'41','Sources Sought','2014-11-3T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'42','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'43','No Bid-PM','2010-9-10T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'44','No Bid-PM','2011-7-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'45','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'46','Lead','2012-9-26T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'47','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'48','No Bid-PM','2012-7-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'49','No Bid-PM','2012-7-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'50','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'51','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'52','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'53','No Bid-PM','2010-11-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'54','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'55','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'56','No Bid-PM','2010-11-17T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'57','No Bid-PM','2014-11-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'58','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'59','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'60','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'61','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'62','RFI','2014-3-1T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'63','Sources Sought','2013-6-27T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'64','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'65','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'66','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'67','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'68','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'69','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'70','Sources Sought','2014-10-6T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'71','No Bid-PM','2012-4-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'72','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'73','No Bid-PM','2010-7-2T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'74','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'75','No Bid-VP','2013-4-23T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'76','No Bid-PM','2009-10-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'77','No Bid-PM','2011-7-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'78','No Bid-PM','2011-7-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'80','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'81','Retired','2012-2-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'82','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'79','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'83','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'84','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'85','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'86','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'87','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'88','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'89','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'90','Lead','2012-3-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'91','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'92','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'93','No Bid-PM','2010-9-10T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'94','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'95','No Bid-PM','2010-11-9T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'96','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'97','No Bid-PM','2010-6-23T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'98','No Bid-PM','2011-12-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'99','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'100','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'101','No Bid-PM','2010-9-13T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'102','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'103','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'104','No Bid-PM','2011-1-26T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'105','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'106','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'107','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'108','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'109','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'110','No Bid-PM','2010-7-9T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'111','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'112','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'113','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'114','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'115','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'116','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'117','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'118','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'119','No Bid-PM','2010-8-25T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'120','No Bid-PM','2010-12-3T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'121','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'122','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'123','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'124','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'125','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'126','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'127','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'128','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'129','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'130','No Bid-PM','2010-4-27T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'131','No Bid-PM','2010-5-12T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'132','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'133','No Bid-PM','2010-10-19T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'134','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'135','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'136','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'137','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'138','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'139','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'140','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'141','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'142','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'143','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'144','No Bid-PM','2010-6-30T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'145','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'146','No Bid-PM','2010-11-22T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'147','No Bid-PM','2010-1-13T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'148','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'149','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'150','No Bid-PM','2010-9-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'151','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'152','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'153','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'154','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'155','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'156','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'506','No Bid-PM','2010-4-22T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'157','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'158','No Bid-PM','2010-12-30T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'159','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'160','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'161','No Bid-VP','2014-9-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'162','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'163','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'164','No Bid-PM','2009-6-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'165','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'166','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'168','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'167','No Bid-PM','2010-7-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'169','Retired','2013-2-28T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'170','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'171','Bid Won','2012-5-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'172','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'173','No Bid-VP','2012-6-25T07:54:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'174','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'175','No Bid-PM','2012-3-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'176','RFP Bid Submitted','2014-8-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'177','RFI','2014-9-25T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'178','No Bid-VP','2014-9-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'179','No Bid-PM','2011-12-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'180','Cancelled','2012-10-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'181','No Bid-PM','2012-9-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'182','No Bid-PM','2012-8-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'183','No Bid-PM','2012-7-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'184','No Bid-VP','2012-12-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'185','No Bid-VP','2013-3-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'186','No Bid-PM','2013-4-9T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'187','No Bid-PM','2014-3-4T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'188','No Bid-PM','2012-2-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'189','No Bid-PM','2012-1-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'190','No Bid-PM','2012-4-12T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'191','No Bid-VP','2012-7-11T15:16:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'192','Bid Lost','2012-8-3T00:00:00Z','','','will submit','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'193','No Bid-VP','2013-1-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'194','Cancelled','2013-10-24T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'195','No Bid-PM','2014-3-4T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'196','Cancelled','2013-7-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'197','No Bid-PM','2013-8-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'198','No Bid-PM','2012-7-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'199','Cancelled','2013-8-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'200','No Bid-PM','2012-3-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'201','No Bid-VP','2014-8-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'202','No Bid-PM','2010-7-28T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'203','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'204','No Bid-PM','2009-8-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'205','No Bid-PM','2010-9-17T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'206','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'207','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'208','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'209','Draft RFP/Q','2012-3-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'211','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'210','No Bid-PM','2010-10-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'212','Sources Sought','2014-1-29T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'213','No Bid-VP','2013-5-31T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'214','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'215','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'216','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'217','No Bid-PM','2011-12-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'218','No Bid-PM','2009-9-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'219','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'220','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'221','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'222','No Bid-VP','2012-11-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'223','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'224','No Bid-PM','2013-7-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'508','No Bid-PM','2009-9-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'225','Draft RFP/Q','2009-7-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'226','No Bid-PM','2011-7-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'227','No Bid-PM','2009-7-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'228','No Bid-PM','2012-3-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'229','No Bid-PM','2009-8-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'230','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'231','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'232','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'233','No Bid-PM','2010-5-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'234','No Bid-PM','2010-8-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'235','No Bid-PM','2010-9-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'236','Retired','2012-1-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'237','Lead','2012-3-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'238','RFI','2014-12-12T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'239','No Bid-PM','2010-6-8T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'240','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'241','No Bid-PM','2010-6-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'242','No Bid-PM','2011-12-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'243','No Bid-PM','2012-8-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'244','No Bid-PM','2011-1-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'245','No Bid-PM','2011-7-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'246','No Bid-PM','2011-7-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'247','RFI','2011-10-18T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'248','RFI','2011-10-18T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'249','Sources Sought','2013-12-5T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'250','RFI','2014-7-28T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'253','RFI','2013-6-27T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'251','RFI','2014-2-21T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'252','No Bid-PM','2012-3-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'254','No Bid-PM','2012-9-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'255','No Bid-PM','2010-8-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'256','No Bid-PM','2012-5-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'257','No Bid-PM','2009-5-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'258','No Bid-PM','2009-6-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'259','No Bid-PM','2009-6-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'260','No Bid-PM','2009-7-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'261','No Bid-PM','2009-7-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'503','No Bid-PM','2009-9-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'505','No Bid-PM','2009-9-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'262','No Bid-PM','2009-9-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'507','No Bid-PM','2009-9-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'504','No Bid-PM','2011-12-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'263','No Bid-PM','2010-6-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'264','No Bid-PM','2010-6-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'265','No Bid-PM','2010-7-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'266','No Bid-PM','2010-7-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'502','No Bid-PM','2011-12-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'267','No Bid-PM','2011-10-21T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'268','No Bid-PM','2011-12-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'269','No Bid-PM','2010-9-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'270','No Bid-PM','2010-9-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'271','No Bid-PM','2010-11-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'272','No Bid-PM','2011-3-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'273','No Bid-PM','2012-3-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'509','Cancelled','2011-11-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'274','No Bid-PM','2011-12-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'275','Bid Won','2012-1-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'276','No Bid-PM','2011-12-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'277','No Bid-PM','2011-12-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'510','No Bid-PM','2012-1-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'278','No Bid-PM','2011-12-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'279','No Bid-PM','2012-1-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'280','Draft RFP/Q','2011-11-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'281','No Bid-PM','2012-2-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'282','Bid Lost','2012-7-18T12:19:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'283','Cancelled','2012-2-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'284','No Bid-PM','2012-3-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'285','Draft RFP/Q','2012-3-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'286','Draft RFP/Q','2012-2-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'287','No Bid-VP','2012-6-5T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'288','No Bid-VP','2012-5-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'289','No Bid-PM','2012-3-26T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'290','No Bid-PM','2012-1-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'291','RFI','2012-3-29T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'292','No Bid-PM','2012-4-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'293','RFI','2012-4-18T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'294','No Bid-VP','2012-4-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'295','No Bid-PM','2012-4-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'296','Bid Won','2012-7-17T16:01:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'297','Draft RFP/Q','2012-5-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'298','RFI','2012-5-18T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'299','No Bid-PM','2012-5-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'300','No Bid-PM','2012-5-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'301','No Bid-PM','2012-5-31T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'302','No Bid-PM','2012-6-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'303','RFI','2012-6-4T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'304','No Bid-VP','2012-6-12T08:39:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'305','Retired','2012-6-6T14:20:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'306','No Bid-VP','2012-6-25T07:51:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'307','No Bid-PM','2012-7-12T08:13:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'308','No Bid-PM','2012-7-16T08:59:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'309','Draft RFP/Q','2012-7-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'310','No Bid-PM','2012-7-10T15:41:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'311','No Bid-PM','2012-7-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'312','No Bid-PM','2012-8-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'313','No Bid-PM','2012-8-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'314','Bid Won','2012-8-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'315','No Bid-PM','2012-8-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'316','No Bid-PM','2012-8-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'317','Cancelled','2012-8-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'318','No Bid-VP','2012-8-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'319','No Bid-PM','2012-8-12T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'320','No Bid-VP','2012-8-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'321','No Bid-PM','2012-8-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'322','No Bid-PM','2012-8-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'323','No Bid-PM','2012-8-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'324','No Bid-VP','2012-8-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'325','No Bid-PM','2012-9-4T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'326','No Bid-PM','2012-9-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'327','No Bid-PM','2012-9-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'328','Sources Sought','2012-10-19T00:00:00Z','','submitted','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'329','RFI','2012-10-24T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'330','Draft RFP/Q','2012-11-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'331','No Bid-VP','2012-11-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'332','No Bid-VP','2012-11-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'333','No Bid-PM','2012-11-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'334','No Bid-VP','2012-12-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'335','Bid Lost','2012-10-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'336','Draft RFP/Q','2012-10-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'337','RFI','2012-12-6T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'338','RFI','2012-12-21T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'339','Cancelled','2013-1-7T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'340','Retired','2013-1-7T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'341','No Bid-VP','2013-1-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'342','No Bid-VP','2013-1-31T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'343','No Bid-VP','2013-2-5T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'344','Retired','2013-2-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'345','No Bid-VP','2013-2-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'346','Cancelled','2013-2-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'347','No Bid-VP','2013-2-26T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'348','Sources Sought','2013-2-27T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'349','Sources Sought','2013-2-27T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'350','Cancelled','2013-3-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'351','Cancelled','2013-3-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'352','Bid Won','2013-3-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'353','Cancelled','2013-3-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'354','No Bid-PM','2013-8-5T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'355','No Bid-PM','2013-4-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'356','Cancelled','2013-4-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'357','Cancelled','2013-4-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'358','No Bid-VP','2013-4-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'359','No Bid-PM','2013-5-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'360','Received','2013-5-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'361','No Bid-VP','2013-5-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'362','RFI','2013-5-15T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'363','No Bid-PM','2013-5-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'364','No Bid-PM','2013-5-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'365','No Bid-PM','2013-5-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'366','No Bid-PM','2013-5-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'367','No Bid-PM','2013-5-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'368','RFI','2013-5-29T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'369','RFI','2013-4-11T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'370','RFI','2013-6-13T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'371','No Bid-VP','2013-6-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'372','Sources Sought','2013-6-20T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'373','No Bid-PM','2013-6-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'374','RFI','2013-6-27T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'375','Draft RFP/Q','2013-7-5T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'376','No Bid-VP','2013-4-3T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'377','No Bid-PM','2013-7-12T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'378','No Bid-PM','2013-7-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'379','Sources Sought','2013-7-22T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'380','No Bid-PM','2013-8-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'381','No Bid-PM','2013-7-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'382','RFI','2013-7-22T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'383','No Bid-VP','2013-7-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'384','Sources Sought','2013-7-26T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'385','Sources Sought','2013-7-26T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'386','No Bid-VP','2013-7-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'387','No Bid-PM','2013-7-31T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'388','No Bid-VP','2013-8-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'389','RFI','2013-8-5T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'390','No Bid-PM','2013-8-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'391','Sources Sought','2013-8-13T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'392','No Bid-PM','2013-8-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'393','No Bid-PM','2013-8-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'394','No Bid-PM','2013-9-4T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'395','Bid Lost','2013-9-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'396','No Bid-PM','2013-9-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'397','No Bid-PM','2013-9-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'398','No Bid-PM','2013-9-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'399','No Bid-PM','2013-9-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'400','No Bid-PM','2013-9-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'401','RFI','2013-10-9T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'402','RFI','2013-10-18T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'403','Sources Sought','2013-10-19T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'404','Sources Sought','2013-11-7T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'405','Cancelled','2013-11-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'406','No Bid-PM','2013-11-12T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'407','RFI','2013-11-13T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'408','Sources Sought','2013-11-15T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'409','No Bid-PM','2013-11-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'410','RFI','2013-11-22T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'411','No Bid-PM','2013-12-5T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'412','No Bid-VP','2013-12-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'413','No Bid-VP','2013-12-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'414','RFI','2014-1-2T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'415','RFI','2014-1-14T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'416','No Bid-VP','2014-1-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'417','Bid Lost','2014-1-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'418','No Bid-VP','2014-1-31T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'419','RFI','2014-2-13T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'420','No Bid-PM','2013-8-30T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'421','RFI','2014-4-16T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'422','Sources Sought','2014-3-17T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'423','RFI','2014-3-17T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'424','No Bid-PM','2014-4-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'425','RFI','2014-4-9T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'426','RFI','2014-4-21T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'427','RFI','2014-4-22T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'428','No Bid-VP','2014-5-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'429','No Bid-VP','2014-6-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'430','Draft RFP/Q','2014-6-24T00:00:00Z','','','submitted','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'431','RFI','2014-6-26T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'432','Retired','2014-6-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'433','RFP Bid Submitted','2014-7-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'434','RFI','2014-7-10T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'435','RFI','2014-7-14T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'436','RFI','2014-7-15T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'437','Cancelled','2014-7-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'438','RFI','2014-8-26T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'439','RFI','2014-9-19T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'440','No Bid-PM','2014-9-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'441','No Bid-PM','2014-9-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'442','RFI','2014-9-16T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'443','Sources Sought','2014-9-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'444','RFI','2014-10-2T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'445','RFI','2014-10-2T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'446','RFI','2014-10-3T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'447','No Bid-VP','2014-10-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'448','RFI','2014-10-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'449','Sources Sought','2014-11-3T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'450','Sources Sought','2014-11-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'451','No Bid-VP','2014-11-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'452','Sources Sought','2014-11-13T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'453','RFI','2014-11-19T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'454','RFI','2014-11-21T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'455','No Bid-VP','2014-12-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'456','RFI','2014-12-8T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'457','No Bid-PM','2014-12-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'458','RFI','2014-12-15T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'459','No Bid-VP','2014-12-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'460','Draft RFP/Q','2014-12-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'461','No Bid-PM','2014-12-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'462','No Bid-VP','2014-12-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'463','RFI','2014-12-17T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'464','No Bid-PM','2014-12-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'465','RFI','2015-1-7T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'466','RFI','2015-1-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'467','Cancelled','2015-1-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'468','No Bid-PM','2009-8-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'469','No Bid-PM','2009-9-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'470','No Bid-PM','2010-7-12T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'471','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'472','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'476','Lead','2012-3-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'473','No Bid-PM','2010-6-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'474','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'475','No Bid-PM','2012-4-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'477','Sources Sought','2013-5-7T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'478','No Bid-VP','2012-8-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'479','Retired','2012-3-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'480','Retired','2012-3-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'481','RFI','2014-5-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'482','No Bid-VP','2014-4-9T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'487','Lead','2012-3-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'483','Bid Won','2011-12-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'484','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'485','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'486','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'488','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'489','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'490','Draft RFP/Q','2014-12-30T00:00:00Z','','','submitted','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'491','Bid Won','2014-1-24T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'492','No Bid-PM','2012-4-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'493','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'494','No Bid-PM','2014-7-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'495','Sources Sought','2013-12-5T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'496','No Bid-PM','2011-12-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'497','No Bid-VP','2014-8-31T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'498','No Bid-PM','2014-3-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'499','No Bid-PM','2014-5-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'500','No Bid-PM','2014-6-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'501','No Bid-PM','2014-9-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle25');
createChangeJSON(TOsJSON,'1','Retired','2011-2-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle26');
createChangeJSON(TOsJSON,'2','Retired','2012-3-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle26');
createChangeJSON(TOsJSON,'3','Bid Lost','2012-2-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle26');
createChangeJSON(TOsJSON,'4','No Bid-PM','2012-4-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle26');
createChangeJSON(TOsJSON,'5','No Bid-PM','2012-4-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle26');
createChangeJSON(TOsJSON,'204','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'205','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'206','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'207','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'208','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'209','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'210','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'211','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'212','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'213','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'214','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'215','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'216','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'217','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'218','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'219','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'220','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'221','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'222','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'223','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'224','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'225','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'226','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'227','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'228','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'229','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'230','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'231','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'232','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'233','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'234','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'235','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'236','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'237','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'238','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'239','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'240','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'241','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'242','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'243','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'244','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'245','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'246','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'247','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'248','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'249','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'250','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'251','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'252','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'253','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'254','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'255','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'256','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'257','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'258','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'259','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'260','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'261','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'262','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'263','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'264','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'265','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'266','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'267','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'268','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'269','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'270','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'271','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'272','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'273','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'274','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'275','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'276','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'277','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'278','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'279','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'280','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'281','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'282','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'283','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'284','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'285','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'286','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'287','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'288','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'289','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'290','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'291','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'292','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'293','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'294','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'295','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'296','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'297','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'298','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'299','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'300','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'301','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'302','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'303','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'304','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'305','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'306','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'307','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'308','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'309','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'310','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'311','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'312','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'313','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'314','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'315','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'316','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'317','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'318','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'319','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'320','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'321','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'322','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'323','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'324','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'325','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'326','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'327','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'328','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'329','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'330','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'331','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'332','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'333','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'334','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'335','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'336','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'337','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'338','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'339','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'340','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'341','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'342','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'343','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'344','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'345','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'346','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'347','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'348','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'349','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'350','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'351','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'352','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'353','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'354','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'355','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'356','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'357','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'358','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'359','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'360','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'361','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'362','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'363','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'364','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'365','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'366','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'367','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'368','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'369','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'370','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'371','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'372','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'373','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'374','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'375','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'376','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'377','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'378','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'379','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'380','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'381','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'382','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'383','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'384','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'385','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'386','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'387','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'388','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'389','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'390','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'391','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'392','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'393','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'394','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'395','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'396','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'397','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'398','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'399','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'400','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'401','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'402','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'403','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'404','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'405','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'406','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'407','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'408','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'409','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'410','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'411','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'412','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'413','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'414','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'415','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'416','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'417','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'418','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'419','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'420','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'421','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'422','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'423','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'424','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'425','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'426','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'427','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'428','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'429','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'430','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'431','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'432','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'433','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'434','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'435','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'436','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'437','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'438','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'439','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'440','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'441','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'442','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'443','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'444','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'445','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'446','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'447','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'448','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'449','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'450','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'451','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'452','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'453','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'454','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'455','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'456','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'457','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'458','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'459','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'460','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'461','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'462','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'463','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'464','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'465','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'466','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'467','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'468','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'469','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'470','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'471','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'472','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'473','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'474','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'475','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'476','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'477','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'478','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'479','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'480','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'481','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'482','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'483','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'484','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'485','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'486','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'487','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'488','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'489','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'490','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'491','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'492','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'493','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'494','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'495','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'496','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'497','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'498','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'499','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'500','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'501','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'502','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'503','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'504','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'505','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'506','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'507','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'508','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'509','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'510','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'511','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'512','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'513','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'514','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'515','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'516','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'517','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'518','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'519','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'520','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'521','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'522','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'523','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'524','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'525','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'526','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'527','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'528','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'529','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'530','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'531','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'532','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'533','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'534','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'535','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'536','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'537','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'538','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'539','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'540','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'541','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'542','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'543','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'544','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'545','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'546','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'547','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'548','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'549','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'550','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'551','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'552','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'553','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'554','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'555','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'556','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'557','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'558','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'559','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'560','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'561','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'562','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'563','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'564','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'565','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'566','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'567','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'568','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'569','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'570','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'571','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'572','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'573','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'574','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'575','No Bid-PM','2005-6-3T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'576','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'577','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'578','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'579','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'580','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'581','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'582','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'583','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'584','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'585','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'586','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'587','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'588','No Bid-PM','2005-7-28T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'589','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'590','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'591','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'592','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'593','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'594','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'595','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'596','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'597','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'598','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'599','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'600','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'601','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'602','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'603','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'604','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'605','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'606','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'607','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'608','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'609','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'610','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'611','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'612','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'613','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'614','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'615','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'616','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'617','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'618','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'619','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'620','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'621','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'622','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'623','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'624','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'625','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'626','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'627','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'628','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'629','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'630','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'631','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'632','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'633','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'634','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'635','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'636','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'637','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'638','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'639','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'640','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'641','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'642','Bid Won','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'643','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'644','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'645','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'646','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'647','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'648','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'649','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'650','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'651','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'652','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'653','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'654','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'655','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'656','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'657','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'658','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'659','No Bid-PM','2010-7-26T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'660','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'661','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'662','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'663','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'664','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'665','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'666','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'667','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'668','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'669','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'670','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'671','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'672','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'673','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'674','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'675','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'676','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'677','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'678','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'679','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'680','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'681','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'682','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'683','No Bid-PM','2006-11-22T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'684','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'685','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'686','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'687','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'688','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'689','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'690','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'691','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'692','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'693','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'694','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'695','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'696','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'697','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'698','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'699','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'700','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'701','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'702','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'703','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'704','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'705','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'706','No Bid-PM','2007-8-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'707','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'708','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'709','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'710','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'711','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'712','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'713','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'714','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'715','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'716','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'717','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'718','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'719','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'720','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'721','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'722','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'723','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'724','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'725','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'726','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'727','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'728','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'729','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'730','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'731','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'732','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'733','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'734','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'735','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'736','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'737','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'738','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'739','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'740','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'741','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'742','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'743','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'744','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'745','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'746','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'747','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'748','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'749','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'750','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'751','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'752','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'753','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'754','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'755','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'756','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'757','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'758','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'759','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'760','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'761','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'762','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'763','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'764','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'765','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'766','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'767','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'768','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'769','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'770','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'771','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'772','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'773','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'774','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'775','No Bid-PM','2009-10-15T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'776','No Bid-PM','2009-8-18T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'777','No Bid-PM','2009-8-28T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'778','No Bid-PM','2009-9-11T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'779','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'780','No Bid-PM','2009-12-23T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'781','No Bid-PM','2009-12-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'782','No Bid-PM','2009-12-23T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'783','No Bid-PM','2010-6-7T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'784','No Bid-PM','2010-1-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'785','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'786','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'787','No Bid-PM','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'788','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'789','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'790','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'791','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'792','No Bid-PM','2010-2-22T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'793','No Bid-PM','2010-4-29T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'794','No Bid-PM','2010-2-23T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'795','No Bid-PM','2010-2-26T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'796','No Bid-PM','2010-3-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'797','No Bid-PM','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'798','No Bid-PM','2010-3-9T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'799','No Bid-PM','2010-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'800','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'801','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'802','No Bid-PM','2010-4-30T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'803','No Bid-PM','2010-5-3T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'804','No Bid-PM','2010-5-25T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'805','No Bid-PM','2010-5-21T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'806','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'807','No Bid-PM','2010-7-13T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'808','No Bid-PM','2010-8-4T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'809','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'810','No Bid-PM','2010-6-15T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'811','No Bid-PM','2010-6-25T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'812','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'813','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'814','No Bid-PM','2010-7-12T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'815','No Bid-PM','2010-7-27T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'816','No Bid-PM','2010-7-30T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'817','No Bid-PM','2010-8-6T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'818','No Bid-PM','2010-8-11T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'819','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'820','No Bid-PM','2010-8-19T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'821','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'822','No Bid-PM','2010-8-23T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'823','No Bid-PM','2010-8-19T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'824','No Bid-PM','2010-9-28T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'825','No Bid-PM','2010-9-10T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'826','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'827','No Bid-PM','2010-9-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'828','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'829','No Bid-PM','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'830','No Bid-PM','2010-9-13T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'831','No Bid-PM','2010-9-10T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'832','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'833','No Bid-PM','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'834','No Bid-PM','2008-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'835','No Bid-PM','2010-11-4T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'836','No Bid-PM','2010-11-17T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'837','No Bid-PM','2010-11-19T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'838','No Bid-PM','2010-11-16T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'839','No Bid-PM','2010-11-16T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'840','No Bid-PM','2011-2-15T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'841','No Bid-PM','2010-12-2T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'842','No Bid-PM','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'843','No Bid-PM','2011-2-23T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'844','No Bid-PM','2011-3-24T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'845','No Bid-PM','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'846','No Bid-PM','2011-4-4T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'847','No Bid-PM','2011-4-19T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'848','No Bid-PM','2011-6-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'849','No Bid-PM','2011-5-6T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'850','No Bid-PM','2011-5-19T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'851','No Bid-PM','2011-5-2T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'852','No Bid-PM','2011-6-30T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'853','Bid Lost','2011-5-4T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'854','No Bid-PM','2011-7-14T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'855','No Bid-PM','2011-5-12T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'856','No Bid-PM','2011-7-6T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'857','No Bid-PM','2011-7-13T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'858','No Bid-PM','2011-7-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'859','No Bid-PM','2011-7-7T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'860','No Bid-PM','2011-5-26T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'861','No Bid-PM','2011-6-22T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'862','No Bid-PM','2011-6-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'863','No Bid-PM','2011-6-24T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'864','No Bid-PM','2011-6-27T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'865','No Bid-PM','2011-6-29T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'866','No Bid-PM','2011-6-29T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'867','No Bid-PM','2011-7-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'868','No Bid-PM','2011-10-20T00:00:00Z','','','','15648055.24','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'869','No Bid-PM','2011-7-18T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'870','No Bid-PM','2011-7-27T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'871','No Bid-PM','2011-8-3T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'872','No Bid-PM','2011-8-5T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'873','No Bid-PM','2011-8-18T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'874','No Bid-PM','2011-8-17T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'875','No Bid-PM','2011-8-13T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'876','No Bid-PM','2011-10-21T00:00:00Z','','','','4385687.65','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'877','No Bid-PM','2011-10-20T00:00:00Z','','','','4347108.68','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'878','No Bid-PM','2011-10-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'879','No Bid-PM','2011-9-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'880','No Bid-PM','2011-9-7T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'881','No Bid-PM','2011-9-9T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'882','No Bid-PM','2011-9-14T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'883','No Bid-PM','2011-9-14T00:00:00Z','','','','4800975.53','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'884','No Bid-PM','2011-9-27T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'885','No Bid-PM','2011-10-18T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'886','No Bid-PM','2011-11-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'887','No Bid-PM','2011-11-2T00:00:00Z','','','','2703698.19','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'888','No Bid-PM','2011-11-2T00:00:00Z','','','','4332179.55','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'889','No Bid-PM','2011-11-2T00:00:00Z','','','','22696531.13','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'890','No Bid-PM','2011-10-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'891','No Bid-PM','2011-10-31T00:00:00Z','','','','483865.75','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'892','No Bid-PM','2011-11-8T00:00:00Z','','','','1383693.46','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'893','No Bid-PM','2011-11-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'894','No Bid-PM','2011-11-17T00:00:00Z','','','','26011980.36','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'895','Cancelled','2011-11-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'896','Received','2011-12-15T00:00:00Z','','','','7571455.91','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'897','No Bid-PM','2011-11-23T00:00:00Z','','','','217206.6','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'898','Cancelled','2011-12-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'899','Cancelled','2011-12-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'900','No Bid-PM','2011-12-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'901','No Bid-PM','2012-2-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'902','No Bid-PM','2012-2-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'903','No Bid-PM','2012-2-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'904','No Bid-PM','2012-3-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'905','No Bid-PM','2012-2-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'906','Bid Won','2012-3-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'907','No Bid-PM','2012-4-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'908','No Bid-PM','2012-5-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'909','Bid Lost','2012-3-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'910','No Bid-PM','2012-3-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'911','No Bid-PM','2012-4-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'912','No Bid-PM','2012-4-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'913','No Bid-PM','2012-4-5T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'914','No Bid-PM','2012-4-12T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'915','No Bid-PM','2012-4-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'916','No Bid-PM','2012-5-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'917','No Bid-PM','2012-5-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'918','No Bid-PM','2012-6-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'919','Retired','2011-11-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'920','RFI','2012-4-23T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'921','RFI','2012-4-24T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'922','RFI','2012-5-4T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'923','Retired','2012-5-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle27');
createChangeJSON(TOsJSON,'157','Received','2015-1-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'156','Sources Sought','2015-1-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'149','RFP Pending Bid Decision','2015-1-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'155','RFP In Proposal','2015-1-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'197','RFI','2015-1-7T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'154','No Bid-PM','2014-12-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'153','No Bid-PM','2014-12-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'196','RFI','2014-12-12T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'152','No Bid-PM','2014-12-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'195','RFI','2014-12-2T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'194','RFI','2014-11-25T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'151','Sources Sought','2014-11-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'150','Draft RFP/Q','2014-11-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'193','RFI','2014-11-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'192','RFI','2014-11-5T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'148','No Bid-VP','2014-10-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'191','RFI','2014-10-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'147','No Bid-VP','2014-9-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'145','No Bid-PM','2014-9-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'146','No Bid-PM','2014-9-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'190','RFI','2014-9-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'144','Cancelled','2014-9-4T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'140','RFI','2014-9-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'141','No Bid-PM','2014-9-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'142','Cancelled','2014-9-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'143','Cancelled','2014-9-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'139','No Bid-VP','2014-8-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'138','No Bid-VP','2014-8-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'137','No Bid-VP','2014-8-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'189','RFI','2014-8-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'136','RFI','2014-8-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'114','No Bid-PM','2014-8-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'135','No Bid-VP','2014-8-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'134','No Bid-VP','2014-8-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'132','Draft RFP/Q','2014-8-12T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'133','No Bid-VP','2014-8-12T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'93','Cancelled','2014-8-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'128','RFI','2014-8-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'130','Bid Lost','2014-8-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'131','No Bid-PM','2014-8-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'129','No Bid-VP','2014-8-5T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'188','RFI','2014-8-5T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'126','No Bid-PM','2014-7-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'127','Cancelled','2014-7-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'125','No Bid-PM','2014-7-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'122','No Bid-VP','2014-7-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'123','No Bid-VP','2014-7-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'187','RFI','2014-7-14T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'121','No Bid-VP','2014-7-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'120','No Bid-PM','2014-7-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'118','No Bid-VP','2014-7-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'111','No Bid-VP','2014-6-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'117','No Bid-VP','2014-6-26T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'186','RFI','2014-6-26T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'115','Cancelled','2014-6-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'116','Cancelled','2014-6-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'185','RFI','2014-6-16T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'113','No Bid-VP','2014-6-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'103','No Bid-VP','2014-6-5T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'98','No Bid-VP','2014-6-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'112','No Bid-VP','2014-6-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'184','RFI','2014-5-27T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'124','Sources Sought','2014-5-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'110','No Bid-PM','2014-5-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'109','No Bid-PM','2014-5-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'104','Cancelled','2014-5-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'108','No Bid-VP','2014-5-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'107','No Bid-VP','2014-5-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'106','No Bid-VP','2014-5-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'183','RFI','2014-5-2T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'105','Sources Sought','2014-4-28T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'101','Sources Sought','2014-4-14T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'102','No Bid-VP','2014-4-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'100','No Bid-PM','2014-4-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'182','RFI','2014-4-10T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'97','Cancelled','2014-4-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'88','No Bid-VP','2014-4-4T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'99','No Bid-PM','2014-4-4T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'83','Cancelled','2014-3-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'96','No Bid-PM','2014-3-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'95','No Bid-PM','2014-3-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'94','No Bid-VP','2014-3-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'92','No Bid-VP','2014-3-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'90','No Bid-PM','2014-3-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'89','Cancelled','2014-3-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'91','No Bid-VP','2014-3-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'181','RFI','2014-2-28T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'80','No Bid-VP','2014-2-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'159','Sources Sought','2014-2-19T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'87','No Bid-PM','2014-2-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'180','RFI','2014-2-10T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'85','No Bid-VP','2014-1-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'84','RFI','2014-1-24T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'86','No Bid-VP','2014-1-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'82','No Bid-VP','2014-1-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'81','Sources Sought','2014-1-10T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'79','No Bid-VP','2013-12-26T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'78','No Bid-VP','2013-12-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'77','No Bid-PM','2013-12-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'74','Sources Sought','2013-12-18T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'75','Sources Sought','2013-12-18T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'76','Sources Sought','2013-12-18T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'73','No Bid-VP','2013-12-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'71','No Bid-PM','2013-12-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'72','No Bid-PM','2013-12-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'70','No Bid-PM','2013-11-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'179','RFI','2013-11-27T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'69','No Bid-VP','2013-11-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'119','RFI','2013-11-22T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'178','No Bid-PM','2013-11-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'68','No Bid-PM','2013-11-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'67','No Bid-VP','2013-10-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'177','RFI','2013-9-20T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'58','No Bid-VP','2013-9-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'59','No Bid-VP','2013-9-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'64','No Bid-PM','2013-9-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'176','Cancelled','2013-9-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'66','No Bid-VP','2013-9-4T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'65','No Bid-PM','2013-9-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'63','No Bid-PM','2013-8-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'62','No Bid-VP','2013-8-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'61','No Bid-VP','2013-8-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'60','No Bid-PM','2013-8-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'54','No Bid-VP','2013-8-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'175','RFI','2013-8-9T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'57','Sources Sought','2013-8-2T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'56','No Bid-VP','2013-8-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'55','Sources Sought','2013-7-30T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'53','No Bid-PM','2013-7-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'47','No Bid-PM','2013-7-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'52','No Bid-PM','2013-7-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'51','No Bid-PM','2013-7-12T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'198','Lead','2013-7-12T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'50','No Bid-PM','2013-7-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'174','RFI','2013-7-10T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'199','Sources Sought','2013-7-9T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'49','No Bid-PM','2013-6-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'48','No Bid-VP','2013-6-26T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'46','No Bid-VP','2013-6-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'44','No Bid-PM','2013-6-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'173','RFI','2013-6-5T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'172','Received','2013-5-28T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'37','Cancelled','2013-5-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'45','No Bid-PM','2013-5-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'43','No Bid-VP','2013-4-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'39','No Bid-PM','2013-4-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'42','No Bid-VP','2013-4-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'41','No Bid-PM','2013-4-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'40','No Bid-PM','2013-4-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'38','No Bid-PM','2013-3-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'29','No Bid-VP','2013-3-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'36','No Bid-PM','2013-3-5T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'35','No Bid-VP','2013-2-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'31','Bid Lost','2013-2-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'34','No Bid-PM','2013-2-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'33','RFI','2013-2-21T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'32','No Bid-VP','2013-2-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'171','Retired','2013-2-12T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'30','No Bid-PM','2013-1-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'158','Lead','2013-1-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'27','No Bid-VP','2013-1-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'28','No Bid-VP','2013-1-4T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'170','No Bid-PM','2012-12-26T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'169','RFI','2012-12-12T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'25','No Bid-PM','2012-12-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'168','Retired','2012-11-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'26','No Bid-PM','2012-10-31T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'23','No Bid-PM','2012-9-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'167','No Bid-PM','2012-9-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'24','No Bid-PM','2012-9-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'22','No Bid-PM','2012-8-31T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'19','No Bid-PM','2012-8-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'20','No Bid-PM','2012-8-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'15','No Bid-PM','2012-8-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'21','No Bid-PM','2012-8-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'17','Draft RFP/Q','2012-8-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'18','No Bid-PM','2012-8-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'10','No Bid-PM','2012-8-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'166','Cancelled','2012-8-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'16','No Bid-PM','2012-8-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'14','No Bid-PM','2012-8-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'165','RFI','2012-8-14T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'11','No Bid-VP','2012-8-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'13','No Bid-VP','2012-8-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'12','No Bid-PM','2012-8-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'7','No Bid-VP','2012-8-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'164','No Bid-PM','2012-7-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'9','No Bid-PM','2012-7-26T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'8','No Bid-VP','2012-7-19T14:06:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'4','Bid Lost','2012-7-18T12:09:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'6','No Bid-VP','2012-7-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'161','No Bid-PM','2012-7-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'1','No Bid-PM','2012-7-13T12:16:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'163','Retired','2012-7-13T09:03:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'5','No Bid-VP','2012-7-11T14:56:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'162','No Bid-VP','2012-7-11T14:32:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'160','No Bid-VP','2012-7-10T08:29:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'3','No Bid-PM','2012-6-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'2','Cancelled','2012-6-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle28');
createChangeJSON(TOsJSON,'1','RFI','2014-5-19T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
createChangeJSON(TOsJSON,'2','RFI','2014-5-20T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
createChangeJSON(TOsJSON,'3','Bid Won','2014-1-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
createChangeJSON(TOsJSON,'4','Bid Won','2013-8-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
createChangeJSON(TOsJSON,'5','Bid Lost','2013-8-9T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
createChangeJSON(TOsJSON,'6','No Bid-PM','2013-11-1T00:00:00Z','','','submitted','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
createChangeJSON(TOsJSON,'7','No Bid-VP','2014-2-5T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
createChangeJSON(TOsJSON,'8','No Bid-VP','2014-2-5T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
createChangeJSON(TOsJSON,'9','Bid Won','2014-2-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
createChangeJSON(TOsJSON,'10','Bid Lost','2014-4-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
createChangeJSON(TOsJSON,'11','Bid Lost','2014-5-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
createChangeJSON(TOsJSON,'12','Bid Lost','2014-5-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
createChangeJSON(TOsJSON,'13','Retired','2014-6-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
createChangeJSON(TOsJSON,'14','Retired','2014-7-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
createChangeJSON(TOsJSON,'15','No Bid-PM','2014-6-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
createChangeJSON(TOsJSON,'16','Lead','2013-8-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
createChangeJSON(TOsJSON,'17','Draft RFP/Q','2013-9-17T00:00:00Z','','','submitted','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
createChangeJSON(TOsJSON,'18','Retired','2014-1-16T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
createChangeJSON(TOsJSON,'19','RFI','2014-2-13T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
createChangeJSON(TOsJSON,'20','RFI','2014-3-26T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
createChangeJSON(TOsJSON,'21','RFI','2014-4-1T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
createChangeJSON(TOsJSON,'22','RFI','2014-4-16T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
createChangeJSON(TOsJSON,'23','Retired','2014-6-30T00:00:00Z','will submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
createChangeJSON(TOsJSON,'24','RFI','2014-3-26T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
createChangeJSON(TOsJSON,'25','RFI','2014-5-13T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
createChangeJSON(TOsJSON,'26','RFI','2014-5-13T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle29');
createChangeJSON(TOsJSON,'1','Cancelled','2014-7-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle30');
createChangeJSON(TOsJSON,'3','RFI','2012-12-13T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle30');
createChangeJSON(TOsJSON,'2','RFI','2013-9-20T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle30');
createChangeJSON(TOsJSON,'4','No Bid-VP','2014-8-26T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle30');
createChangeJSON(TOsJSON,'5','No Bid-VP','2014-9-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle30');
createChangeJSON(TOsJSON,'6','No Bid-VP','2014-7-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle30');
createChangeJSON(TOsJSON,'7','Bid Lost','2013-2-12T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle30');
createChangeJSON(TOsJSON,'8','Cancelled','2013-5-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle30');
createChangeJSON(TOsJSON,'9','No Bid-VP','2013-8-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle30');
createChangeJSON(TOsJSON,'10','Cancelled','2013-10-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle30');
createChangeJSON(TOsJSON,'11','Bid Won','2014-2-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle30');
createChangeJSON(TOsJSON,'12','RFP Bid Submitted','2014-9-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle30');
createChangeJSON(TOsJSON,'1','No Bid-PM','2013-2-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'148','Received','1990-1-1T00:00:00Z','','','','-8528.86','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'3','No Bid-PM','2012-12-12T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'4','No Bid-PM','2010-11-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'5','No Bid-PM','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'83','No Bid-PM','2010-11-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'84','No Bid-PM','2010-7-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'85','No Bid-VP','2013-3-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'6','No Bid-PM','2008-8-31T00:00:00Z','','','','95043756.4','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'237','No Bid-PM','2008-11-1T00:00:00Z','','','','3995280.12','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'224','No Bid-PM','2008-6-2T00:00:00Z','','','','4172113.17','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'103','No Bid-PM','2008-6-14T00:00:00Z','','','','1893235.87','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'104','No Bid-PM','2008-6-1T00:00:00Z','','','','1037039.92','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'126','No Bid-PM','2008-6-2T00:00:00Z','','','','3526568.57','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'105','No Bid-PM','2008-7-30T00:00:00Z','','','','10014842.39','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'106','No Bid-PM','2008-8-28T00:00:00Z','','','','10226811.48','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'193','No Bid-PM','2008-7-17T00:00:00Z','','','','7737188.95','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'127','No Bid-PM','2008-9-16T00:00:00Z','','','','9797662.02','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'150','No Bid-PM','2008-7-6T00:00:00Z','','','','6934636.71','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'151','Bid Lost','2008-7-27T00:00:00Z','','','','2327901.2','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'107','No Bid-PM','2008-8-1T00:00:00Z','','','','1743300.3','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'173','No Bid-PM','2008-7-27T00:00:00Z','','','','3827034.07','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'128','No Bid-PM','2008-7-5T00:00:00Z','','','','13865284.25','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'108','No Bid-PM','2008-8-25T00:00:00Z','','','','20605735.52','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'174','No Bid-PM','2008-7-25T00:00:00Z','','','','300946.28','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'225','No Bid-PM','2008-8-1T00:00:00Z','','','','24892044.03','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'175','No Bid-PM','2008-8-1T00:00:00Z','','','','1856264.07','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'109','No Bid-PM','2008-7-29T00:00:00Z','','','','793412.58','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'194','No Bid-PM','2008-7-20T00:00:00Z','','','','883069.31','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'110','No Bid-PM','2008-7-20T00:00:00Z','','','','1963574.04','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'129','Bid Won','2008-7-27T00:00:00Z','','','','17917297.16','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'130','No Bid-PM','2008-8-1T00:00:00Z','','','','1793455.1','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'209','Received','1990-1-1T00:00:00Z','','','','10182010','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'132','No Bid-PM','2008-7-24T00:00:00Z','','','','2368925.77','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'152','Bid Won','2008-7-6T00:00:00Z','','','','2287754.95','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'111','No Bid-PM','2008-7-31T00:00:00Z','','','','9058492.05','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'133','No Bid-PM','2008-8-1T00:00:00Z','','','','28326007.99','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'257','Bid Lost','2008-8-1T00:00:00Z','','','','23986461.38','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'195','No Bid-PM','2008-8-1T00:00:00Z','','','','412207','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'112','No Bid-PM','2008-8-1T00:00:00Z','','','','17749810.88','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'211','No Bid-PM','2008-7-31T00:00:00Z','','','','620448.42','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'113','No Bid-PM','2008-7-29T00:00:00Z','','','','7808450.86','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'248','No Bid-PM','2008-8-1T00:00:00Z','','','','2926035.57','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'238','No Bid-PM','2008-7-31T00:00:00Z','','','','12805463.06','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'196','No Bid-PM','2008-8-2T00:00:00Z','','','','1526399.27','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'396','Received','1990-1-1T00:00:00Z','','','','1617803.85','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'226','No Bid-PM','2008-7-26T00:00:00Z','','','','6125235.91','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'176','No Bid-PM','2008-7-31T00:00:00Z','','','','48991.9','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'275','No Bid-PM','2008-7-25T00:00:00Z','','','','404263.08','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'134','No Bid-PM','2008-8-1T00:00:00Z','','','','1639637.38','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'212','No Bid-PM','2008-7-31T00:00:00Z','','','','599530.1','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'114','No Bid-PM','2008-8-1T00:00:00Z','','','','147357.4','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'154','No Bid-PM','2008-7-12T00:00:00Z','','','','358761.3','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'155','No Bid-PM','2008-7-31T00:00:00Z','','','','13615926.27','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'115','No Bid-PM','2008-12-8T00:00:00Z','','','','12413885.09','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'156','No Bid-PM','2008-7-27T00:00:00Z','','','','3591578.06','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'116','No Bid-PM','2008-12-7T00:00:00Z','','','','1183652.71','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'117','No Bid-PM','2008-7-17T00:00:00Z','','','','59236.09','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'118','No Bid-PM','2009-5-16T00:00:00Z','','','','6099037.61','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'249','No Bid-PM','2009-2-7T00:00:00Z','','','','410724.43','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'135','No Bid-PM','2008-8-18T00:00:00Z','','','','52111363.47','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'227','No Bid-PM','2008-7-31T00:00:00Z','','','','5035322','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'177','No Bid-PM','2008-7-31T00:00:00Z','','','','2975307.05','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'266','No Bid-PM','2008-9-15T00:00:00Z','','','','12566334.37','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'178','No Bid-PM','2008-8-24T00:00:00Z','','','','3074831.91','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'136','No Bid-PM','2008-9-14T00:00:00Z','','','','3677361.69','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'137','No Bid-PM','2009-2-2T00:00:00Z','','','','986180.94','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'276','No Bid-PM','2009-7-31T00:00:00Z','','','','27359922.54','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'119','Bid Won','2009-3-16T00:00:00Z','','','','106972.31','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'228','No Bid-PM','2008-12-20T00:00:00Z','','','','14581338.46','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'179','No Bid-PM','2008-9-27T00:00:00Z','','','','2239776.66','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'330','Received','1990-1-1T00:00:00Z','','','','555922.34','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'416','No Bid-PM','2008-9-14T00:00:00Z','','','','2377327','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'138','No Bid-PM','2008-11-6T00:00:00Z','','','','17209998.04','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'397','No Bid-PM','2009-6-28T00:00:00Z','','','','31042825.38','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'13','Received','1990-1-1T00:00:00Z','','','','225193.03','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'15','Received','1990-1-1T00:00:00Z','','','','9622043','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'282','No Bid-PM','2008-9-18T00:00:00Z','','','','5009675.2','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'239','No Bid-PM','2009-4-30T00:00:00Z','','','','7714230.37','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'283','No Bid-PM','2009-1-10T00:00:00Z','','','','27020545.89','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'420','No Bid-PM','2008-11-16T00:00:00Z','','','','1591659.81','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'421','No Bid-PM','2008-11-30T00:00:00Z','','','','514085','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'258','No Bid-PM','2008-12-1T00:00:00Z','','','','1050061.13','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'324','No Bid-PM','2008-12-1T00:00:00Z','','','','980320.43','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'318','No Bid-PM','2008-11-9T00:00:00Z','','','','1518031.17','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'312','No Bid-PM','2008-11-17T00:00:00Z','','','','1864089.42','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'398','No Bid-PM','2008-11-14T00:00:00Z','','','','1847747.28','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'300','No Bid-PM','2008-9-15T00:00:00Z','','','','332424','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'250','No Bid-PM','2008-10-13T00:00:00Z','','','','6183734.68','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'214','No Bid-PM','2008-10-24T00:00:00Z','','','','1146008.64','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'406','No Bid-PM','2008-11-14T00:00:00Z','','','','2524605.6','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'306','No Bid-PM','2009-1-16T00:00:00Z','','','','17196521.94','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'399','No Bid-PM','2008-10-5T00:00:00Z','','','','881767','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'139','No Bid-PM','2008-10-16T00:00:00Z','','','','848981.33','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'140','No Bid-PM','2009-3-14T00:00:00Z','','','','12927791','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'349','No Bid-PM','2008-12-15T00:00:00Z','','','','150691882.07','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'407','Bid Won','2008-12-28T00:00:00Z','','','','7617873.92','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'180','No Bid-PM','2008-11-2T00:00:00Z','','','','348185','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'400','No Bid-PM','2008-12-29T00:00:00Z','','','','1109362.8','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'215','No Bid-PM','2008-12-20T00:00:00Z','','','','784027.36','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'331','No Bid-PM','2008-12-14T00:00:00Z','','','','861033.08','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'197','Bid Won','2008-12-1T00:00:00Z','','','','7334061.47','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'157','No Bid-PM','2008-11-17T00:00:00Z','','','','33503481.6','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'417','No Bid-PM','2008-11-23T00:00:00Z','','','','2441608.19','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'181','No Bid-PM','2008-11-23T00:00:00Z','','','','3958023.29','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'120','No Bid-PM','2008-11-23T00:00:00Z','','','','4116961.81','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'17','Received','1990-1-1T00:00:00Z','','','','7693144.61','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'412','No Bid-PM','2008-12-13T00:00:00Z','','','','379520.53','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'158','No Bid-PM','2008-12-27T00:00:00Z','','','','1750866.71','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'159','No Bid-PM','2008-11-30T00:00:00Z','','','','3807570.93','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'259','No Bid-PM','2009-4-18T00:00:00Z','','','','68472773.74','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'267','Bid Won','2008-12-28T00:00:00Z','','','','7349998.9','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'198','No Bid-PM','2008-12-14T00:00:00Z','','','','29606329.93','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'199','No Bid-PM','2008-12-14T00:00:00Z','','','','2399370.79','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'274','Received','1990-1-1T00:00:00Z','','','','1289853.09','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'460','No Bid-PM','2008-12-19T00:00:00Z','','','','4094410.46','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'18','Received','1990-1-1T00:00:00Z','','','','3103278.2','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'20','Received','1990-1-1T00:00:00Z','','','','703186','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'251','No Bid-PM','2009-1-19T00:00:00Z','','','','22314354.25','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'216','No Bid-PM','2008-12-3T00:00:00Z','','','','3959043.14','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'423','No Bid-PM','2008-11-17T00:00:00Z','','','','2704078.02','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'22','Received','1990-1-1T00:00:00Z','','','','234207.12','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'121','No Bid-PM','2009-5-1T00:00:00Z','','','','76766725.88','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'284','No Bid-PM','2009-3-1T00:00:00Z','','','','27204127.98','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'268','Bid Lost','2009-2-12T00:00:00Z','','','','8389623.52','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'131','Received','2008-6-28T00:00:00Z','','','','591470.85','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'462','No Bid-PM','2009-7-18T00:00:00Z','','','','4166164.68','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'241','No Bid-PM','2009-4-4T00:00:00Z','','','','42662764.36','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'160','No Bid-PM','2009-1-22T00:00:00Z','','','','1829139.53','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'401','No Bid-PM','2009-2-26T00:00:00Z','','','','9003148.09','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'269','No Bid-PM','2009-1-31T00:00:00Z','','','','3072873.4','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'229','Bid Won','2009-4-2T00:00:00Z','','','','864549.44','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'242','Bid Won','2009-1-31T00:00:00Z','','','','781543.7','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'217','No Bid-PM','2009-1-12T00:00:00Z','','','','1954657','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'341','No Bid-PM','2009-1-26T00:00:00Z','','','','14903426.52','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'430','No Bid-PM','2009-7-10T00:00:00Z','','','','1375629.53','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'141','No Bid-PM','2009-4-18T00:00:00Z','','','','73360026.32','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'299','Received','2008-7-17T00:00:00Z','','','','3061285.8','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'408','No Bid-PM','2009-3-7T00:00:00Z','','','','151216917.33','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'161','No Bid-PM','2009-2-26T00:00:00Z','','','','22052967.93','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'153','Received','2008-8-1T00:00:00Z','','','','5948304.53','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'290','Received','2008-8-1T00:00:00Z','','','','286491.11','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'427','No Bid-PM','2009-5-10T00:00:00Z','','','','1428454.53','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'361','No Bid-PM','2009-6-4T00:00:00Z','','','','2754709.73','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'365','No Bid-PM','2009-1-29T00:00:00Z','','','','7208575.72','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'409','No Bid-PM','2009-2-8T00:00:00Z','','','','19560489.48','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'213','Received','2008-8-1T00:00:00Z','','','','4191864.46','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'200','Received','2008-10-3T00:00:00Z','','','','2457011.54','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'343','No Bid-PM','2009-2-28T00:00:00Z','','','','11478682.91','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'431','No Bid-PM','2009-5-25T00:00:00Z','','','','8977099.9','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'277','No Bid-PM','2009-4-17T00:00:00Z','','','','15204649.29','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'440','No Bid-PM','2009-4-19T00:00:00Z','','','','4457949.5','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'419','No Bid-PM','2009-2-27T00:00:00Z','','','','1587097.99','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'335','Received','2008-10-9T00:00:00Z','','','','2410763.5','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'142','No Bid-PM','2009-7-31T00:00:00Z','','','','3592665.58','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'182','No Bid-PM','2009-7-3T00:00:00Z','','','','405773.57','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'285','Bid Won','2009-7-31T00:00:00Z','','','','902941.53','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'260','No Bid-PM','2009-3-29T00:00:00Z','','','','6420158','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'278','No Bid-PM','2009-7-27T00:00:00Z','','','','11036388.27','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'230','No Bid-PM','2009-6-1T00:00:00Z','','','','4493297.68','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'183','No Bid-PM','2009-3-7T00:00:00Z','','','','361832.1','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'231','No Bid-PM','2009-3-27T00:00:00Z','','','','61064973.07','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'261','No Bid-PM','2009-7-18T00:00:00Z','','','','56409556.89','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'291','No Bid-PM','2009-4-18T00:00:00Z','','','','4893096.43','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'355','No Bid-PM','2009-5-2T00:00:00Z','','','','15603097','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'442','No Bid-PM','2009-9-2T00:00:00Z','','','','20247799.7','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'403','Bid Lost','2009-5-30T00:00:00Z','','','','1120525.32','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'359','No Bid-PM','2009-7-30T00:00:00Z','','','','113086290.9','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'122','Received','2008-10-19T00:00:00Z','','','','1138177.82','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'143','No Bid-PM','2009-3-29T00:00:00Z','','','','3418032.77','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'435','No Bid-PM','2009-7-16T00:00:00Z','','','','1352014.52','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'144','No Bid-PM','2009-6-20T00:00:00Z','','','','811740.79','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'461','Received','2008-10-23T00:00:00Z','','','','1063003.18','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'307','No Bid-PM','2009-7-31T00:00:00Z','','','','8404963.59','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'262','No Bid-PM','2009-4-4T00:00:00Z','','','','899985.83','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'243','No Bid-PM','2009-5-30T00:00:00Z','','','','6708080.01','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'426','No Bid-PM','2009-7-15T00:00:00Z','','','','1825278.64','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'292','No Bid-PM','2009-9-14T00:00:00Z','','','','1842727','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'375','No Bid-PM','2009-7-20T00:00:00Z','','','','2633976.53','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'240','Received','2008-10-24T00:00:00Z','','','','851187.74','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'410','No Bid-PM','2009-6-4T00:00:00Z','','','','17669584.16','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'218','No Bid-PM','2009-7-25T00:00:00Z','','','','2355818.51','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'301','Bid Won','2009-7-26T00:00:00Z','','','','2911115.12','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'254','No Bid-PM','2009-7-4T00:00:00Z','','','','344989.39','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'252','Received','2008-11-26T00:00:00Z','','','','4049604.49','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'293','No Bid-PM','2009-7-28T00:00:00Z','','','','3484688.68','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'313','No Bid-PM','2009-7-31T00:00:00Z','','','','3044044.24','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'433','No Bid-PM','2009-7-24T00:00:00Z','','','','7805154.84','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'369','No Bid-PM','2009-7-25T00:00:00Z','','','','2293241.09','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'424','Received','2008-11-28T00:00:00Z','','','','30631422.96','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'162','No Bid-PM','2009-7-2T00:00:00Z','','','','3154741.35','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'163','Bid Lost','2010-3-29T00:00:00Z','','','','36836873.08','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'286','No Bid-PM','2009-7-31T00:00:00Z','','','','10006855.71','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'219','No Bid-PM','2009-7-31T00:00:00Z','','','','15378626.36','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'220','No Bid-PM','2009-7-13T00:00:00Z','','','','1564651.59','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'184','No Bid-PM','2009-7-18T00:00:00Z','','','','129921274.65','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'164','No Bid-PM','2009-7-23T00:00:00Z','','','','4962646.2','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'165','Bid Won','2009-9-3T00:00:00Z','','','','10317610.83','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'270','No Bid-PM','2009-7-27T00:00:00Z','','','','27803714.2','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'203','No Bid-PM','2009-7-18T00:00:00Z','','','','446631.3','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'145','No Bid-PM','2009-7-24T00:00:00Z','','','','1226533.32','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'263','No Bid-PM','2009-7-23T00:00:00Z','','','','67168947','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'185','No Bid-PM','2010-5-2T00:00:00Z','','','','16240133.11','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'308','No Bid-PM','2009-12-20T00:00:00Z','','','','35753675.67','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'418','Received','2008-12-15T00:00:00Z','','','','3774519.85','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'352','Received','2009-1-1T00:00:00Z','','','','6181471.42','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'357','No Bid-PM','2009-10-22T00:00:00Z','','','','26294973.57','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'264','No Bid-PM','2010-1-1T00:00:00Z','','','','16059767.81','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'279','No Bid-PM','2009-9-7T00:00:00Z','','','','20243026.93','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'255','No Bid-PM','2009-11-12T00:00:00Z','','','','1207815.73','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'271','No Bid-PM','2009-8-29T00:00:00Z','','','','3474557.96','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'166','No Bid-PM','2009-8-17T00:00:00Z','','','','11568840.89','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'425','Received','2009-1-20T00:00:00Z','','','','2594204','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'373','No Bid-PM','2009-8-16T00:00:00Z','','','','1647938.71','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'402','Received','2009-2-5T00:00:00Z','','','','264106.8','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'232','No Bid-PM','2010-4-26T00:00:00Z','','','','17513896.41','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'123','No Bid-PM','2009-10-23T00:00:00Z','','','','2194614.69','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'272','No Bid-PM','2009-10-11T00:00:00Z','','','','12554566.49','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'376','No Bid-PM','2009-10-17T00:00:00Z','','','','29346336.21','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'377','No Bid-PM','2010-1-2T00:00:00Z','','','','2999440.58','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'294','No Bid-PM','2009-11-13T00:00:00Z','','','','629878.54','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'319','No Bid-PM','2009-12-4T00:00:00Z','','','','2906114.71','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'287','No Bid-PM','2009-10-1T00:00:00Z','','','','1555270','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'411','No Bid-PM','2009-10-11T00:00:00Z','','','','302353.48','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'434','No Bid-PM','2009-11-27T00:00:00Z','','','','12432738.28','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'441','No Bid-PM','2009-11-30T00:00:00Z','','','','10434622.29','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'186','No Bid-PM','2009-12-24T00:00:00Z','','','','10126600.66','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'302','No Bid-PM','2009-12-20T00:00:00Z','','','','1403828.07','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'167','No Bid-PM','2010-1-1T00:00:00Z','','','','6037803.95','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'280','No Bid-PM','2010-1-11T00:00:00Z','','','','789165.56','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'309','No Bid-PM','2010-3-18T00:00:00Z','','','','7362941.16','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'273','No Bid-PM','2010-3-21T00:00:00Z','','','','994761.41','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'346','Received','2009-2-5T00:00:00Z','','','','2133572.31','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'244','No Bid-PM','2010-8-1T00:00:00Z','','','','18360346.06','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'168','Bid Lost','2010-4-10T00:00:00Z','','','','587362.8','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'146','No Bid-PM','2010-3-2T00:00:00Z','','','','17531527.83','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'169','No Bid-PM','2010-4-9T00:00:00Z','','','','856933.84','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'436','No Bid-PM','2010-5-1T00:00:00Z','','','','2243303.08','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'437','No Bid-PM','2010-6-6T00:00:00Z','','','','683856','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'448','No Bid-PM','2010-4-18T00:00:00Z','','','','848057.42','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'325','No Bid-PM','2010-4-18T00:00:00Z','','','','979436.54','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'320','No Bid-PM','2010-4-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'86','No Bid-PM','2010-2-20T00:00:00Z','','','','6870263','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'446','No Bid-PM','2010-4-8T00:00:00Z','','','','16504524.15','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'310','No Bid-PM','2010-7-3T00:00:00Z','','','','712653.37','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'332','Bid Lost','2010-4-3T00:00:00Z','','','','4967674.39','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'303','No Bid-PM','2010-4-30T00:00:00Z','','','','6532876.52','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'147','No Bid-PM','2010-5-31T00:00:00Z','','','','316030140.02','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'378','No Bid-PM','2010-6-12T00:00:00Z','','','','9770020.78','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'201','Received','2009-2-28T00:00:00Z','','','','3191331.6','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'202','Received','2009-3-16T00:00:00Z','','','','4000193','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'449','No Bid-PM','2011-4-21T00:00:00Z','','','','8064564.6','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'315','No Bid-PM','1990-1-1T00:00:00Z','','','','4804925.94','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'363','Received','2009-4-17T00:00:00Z','','','','811989.53','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'432','No Bid-PM','2011-3-28T00:00:00Z','','','','1605261.5','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'358','No Bid-PM','2010-7-25T00:00:00Z','','','','26643918.24','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'336','No Bid-PM','2010-8-2T00:00:00Z','','','','7586943.58','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'380','No Bid-PM','2010-7-26T00:00:00Z','','','','7552803.54','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'413','No Bid-PM','2010-7-5T00:00:00Z','','','','14569102.14','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'438','No Bid-PM','2010-7-17T00:00:00Z','','','','1869507.84','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'444','Received','2009-5-25T00:00:00Z','','','','882599.49','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'204','No Bid-PM','2011-2-24T00:00:00Z','','','','14378913','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'395','No Bid-PM','2010-7-2T00:00:00Z','','','','719456.12','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'367','Received','2009-6-27T00:00:00Z','','','','668229','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'429','No Bid-PM','2010-7-16T00:00:00Z','','','','12061051.16','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'187','No Bid-PM','2010-7-24T00:00:00Z','','','','9284104.77','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'379','No Bid-PM','2010-6-20T00:00:00Z','','','','104950.74','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'188','No Bid-PM','2010-7-4T00:00:00Z','','','','1807969.04','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'233','No Bid-PM','2010-7-22T00:00:00Z','','','','11410675.23','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'337','No Bid-PM','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'371','Received','2009-7-11T00:00:00Z','','','','244339.55','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'221','Cancelled','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'88','No Bid-PM','2010-8-1T00:00:00Z','','','','3099764.28','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'205','No Bid-PM','2010-7-26T00:00:00Z','','','','2317116.27','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'382','No Bid-PM','2010-10-8T00:00:00Z','','','','12952815.37','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'253','Received','2009-7-12T00:00:00Z','','','','49586.84','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'245','No Bid-PM','2010-7-31T00:00:00Z','','','','26679366.07','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'381','No Bid-PM','2010-10-29T00:00:00Z','','','','10212777.83','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'347','No Bid-PM','2010-10-10T00:00:00Z','','','','669679.73','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'374','Received','2009-7-31T00:00:00Z','','','','3251061','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'428','Received','2009-7-31T00:00:00Z','','','','1115752.22','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'256','No Bid-PM','2010-11-12T00:00:00Z','','','','5144060.29','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'304','No Bid-PM','1990-1-1T00:00:00Z','','','','10318488.49','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'314','Received','2009-8-30T00:00:00Z','','','','6828503.96','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'295','Received','2010-4-2T00:00:00Z','','','','297146','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'326','Received','2010-5-23T00:00:00Z','','','','26007133.04','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'452','No Bid-PM','2010-11-28T00:00:00Z','','','','9732860.05','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'350','No Bid-PM','2011-2-18T00:00:00Z','','','','1941089.79','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'345','No Bid-PM','2010-12-19T00:00:00Z','','','','5559381.61','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'124','No Bid-PM','2010-12-18T00:00:00Z','','','','978835.58','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'353','No Bid-PM','2010-11-8T00:00:00Z','','','','8823903.74','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'170','No Bid-PM','2010-11-20T00:00:00Z','','','','5259333.98','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'451','No Bid-PM','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'316','Received','2010-5-30T00:00:00Z','','','','17427949.17','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'311','No Bid-PM','2011-1-10T00:00:00Z','','','','3545191','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'422','Received','2010-6-2T00:00:00Z','','','','30643786.63','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'454','No Bid-PM','2011-2-7T00:00:00Z','','','','2406230.2','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'246','No Bid-PM','2011-1-28T00:00:00Z','','','','7223888','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'453','No Bid-PM','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'90','No Bid-PM','2011-6-29T07:31:00Z','','','','14947617.95','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'7','Received','2010-6-2T00:00:00Z','','','','3899997','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'386','No Bid-PM','2011-1-9T00:00:00Z','','','','1006355.69','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'385','No Bid-PM','2011-1-13T00:00:00Z','','','','739359.91','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'344','Received','2010-6-2T00:00:00Z','','','','34516140.77','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'171','No Bid-PM','2011-1-20T00:00:00Z','','','','897029.6','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'338','No Bid-PM','2011-2-5T00:00:00Z','','','','842399.12','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'356','No Bid-PM','2010-12-31T00:00:00Z','','','','1348954.31','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'342','No Bid-PM','2011-3-4T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'91','Bid Won','2011-2-15T00:00:00Z','','','','6262444.37','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'281','No Bid-PM','2011-1-28T00:00:00Z','','','','5118869.85','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'387','No Bid-PM','2011-1-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'92','No Bid-PM','2011-6-23T15:31:00Z','','','','26146264.3','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'189','Received','2010-7-3T00:00:00Z','','','','14848275.59','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'439','No Bid-PM','2011-4-4T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'288','Received','2010-7-26T00:00:00Z','','','','2216343.09','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'222','Received','2010-7-26T00:00:00Z','','','','30578787.81','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'234','No Bid-PM','2011-3-8T00:00:00Z','','','','36506503','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'172','No Bid-PM','2011-2-22T00:00:00Z','','','','4999185.86','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'125','No Bid-PM','2011-5-4T00:00:00Z','','','','1491557.09','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'445','No Bid-PM','2011-4-26T00:00:00Z','','','','7600396.79','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'87','Received','2010-7-31T00:00:00Z','','','','5041947','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'206','Received','2010-8-1T00:00:00Z','','','','2829038.01','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'321','No Bid-PM','2011-5-11T00:00:00Z','','','','12382135.16','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'362','No Bid-PM','2011-5-13T00:00:00Z','','','','61443377.23','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'391','No Bid-PM','2011-6-10T09:32:00Z','','','','1208243.64','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'190','No Bid-PM','2011-5-10T00:00:00Z','','','','4082284.62','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'322','No Bid-PM','2011-5-13T00:00:00Z','','','','27247998.14','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'191','No Bid-PM','2011-6-3T14:24:00Z','','','','3196558','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'388','No Bid-PM','2011-5-11T00:00:00Z','','','','1471035.62','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'360','No Bid-PM','2011-5-10T00:00:00Z','','','','7971323','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'450','Received','2010-10-9T00:00:00Z','','','','614002.74','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'383','Received','2010-10-31T00:00:00Z','','','','1831366.24','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'207','Received','2010-11-29T00:00:00Z','','','','1318664','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'443','No Bid-PM','2011-8-13T07:21:00Z','','','','2960938.49','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'327','No Bid-PM','2011-7-27T11:29:00Z','','','','2625037.39','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'323','No Bid-PM','2011-6-16T15:08:00Z','','','','121052.3','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'208','No Bid-PM','2011-7-1T17:14:00Z','','','','5073928.51','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'364','No Bid-PM','2011-8-5T13:35:00Z','','','','290175.39','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'93','Received','2010-12-4T00:00:00Z','','','','11688255.24','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'247','No Bid-PM','2011-7-29T11:03:00Z','','','','1707842.9','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'392','Bid Won','2011-9-29T09:04:00Z','','','','5211006.66','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'149','Received','2011-1-3T00:00:00Z','','','','15553999.03','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'235','No Bid-PM','2011-8-16T15:27:00Z','','','','4315486.23','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'351','No Bid-PM','2011-8-8T14:50:00Z','','','','3024962.92','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'333','Cancelled','2011-9-1T08:51:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'8','No Bid-PM','2012-5-25T00:00:00Z','','','','5780788.03','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'459','No Bid-PM','2011-8-24T13:09:00Z','','','','1160681.24','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'389','Received','2011-1-14T00:00:00Z','','','','265582.54','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'296','No Bid-PM','2011-8-19T19:29:00Z','','','','9960924','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'297','No Bid-PM','2011-8-30T08:24:00Z','','','','4929846','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'210','No Bid-PM','2011-9-20T13:45:00Z','','','','9906600','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'305','No Bid-PM','2011-8-13T07:28:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'455','Received','2011-2-5T00:00:00Z','','','','12417553.95','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'328','No Bid-PM','1990-1-1T00:00:00Z','','','','1582017.96','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'329','No Bid-PM','2011-8-22T08:54:00Z','','','','1481260.59','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'457','Draft RFP/Q','2011-11-4T00:00:00Z','','','','14183680.04','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'334','No Bid-PM','2011-11-29T00:00:00Z','','','','8399647.01','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'404','Received','2011-2-28T00:00:00Z','','','','3924963','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'447','Received','2011-3-7T00:00:00Z','','','','292292.84','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'456','No Bid-PM','2012-3-2T00:00:00Z','','','','8078613.44','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'354','Cancelled','2012-9-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'9','Bid Won','2012-6-1T00:00:00Z','','','','902737.71','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'298','No Bid-PM','2012-3-5T00:00:00Z','','','','1009648.15','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'89','Received','2011-4-4T00:00:00Z','','','','1217563.39','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'265','No Bid-PM','2012-3-27T00:00:00Z','','','','2434619','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'384','No Bid-PM','2012-3-29T00:00:00Z','','','','6052613.37','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'366','No Bid-PM','2012-2-28T00:00:00Z','','','','414453','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'10','No Bid-PM','2012-5-11T00:00:00Z','','','','7873523.62','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'11','No Bid-PM','2012-4-4T00:00:00Z','','','','2983100.21','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'393','No Bid-PM','2012-5-14T00:00:00Z','','','','21563816.86','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'368','No Bid-PM','2012-5-11T00:00:00Z','','','','3692030.71','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'12','No Bid-VP','2012-5-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'192','Received','2011-5-17T00:00:00Z','','','','17284427.43','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'223','No Bid-PM','2013-2-4T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'14','No Bid-PM','2012-7-27T00:00:00Z','','','','3715367.25','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'339','No Bid-PM','2012-8-15T00:00:00Z','','','','2899799.74','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'340','No Bid-PM','1990-1-1T00:00:00Z','','','','1872113','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'236','No Bid-PM','2012-6-21T09:05:00Z','','','will not submit','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'390','Received','2011-5-26T00:00:00Z','','','','8934214.5','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'394','No Bid-PM','2012-12-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'16','No Bid-PM','2012-9-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'348','Received','2011-7-10T00:00:00Z','','','','17589144.78','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'370','No Bid-PM','1990-1-1T00:00:00Z','','','','575201','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'414','Received','2011-7-30T00:00:00Z','','','','1152952.19','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'458','No Bid-PM','2012-11-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'317','Received','2011-7-30T00:00:00Z','','','','6003389.19','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'405','No Bid-PM','2012-12-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'19','No Bid-PM','2012-12-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'289','Received','2011-7-31T00:00:00Z','','','','2632295.42','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'415','No Bid-PM','2013-1-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'21','No Bid-PM','2013-7-12T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'82','Received','2013-5-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'372','No Bid-PM','2013-4-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'23','No Bid-PM','2013-2-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'24','No Bid-PM','2013-4-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'25','No Bid-PM','2013-5-31T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'26','No Bid-VP','2014-2-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'27','No Bid-PM','2013-7-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'28','Bid Won','2013-5-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'29','No Bid-PM','2013-7-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'30','Bid Won','2013-10-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'31','No Bid-PM','2013-7-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'32','No Bid-PM','2014-2-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'33','No Bid-PM','2013-8-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'34','No Bid-VP','2014-1-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'35','No Bid-VP','2013-8-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'36','Retired','2014-1-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'37','No Bid-PM','2014-1-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'38','No Bid-PM','2014-3-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'39','No Bid-PM','2014-1-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'40','No Bid-PM','2014-3-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'41','No Bid-PM','2014-3-21T00:00:00Z','','','will not submit','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'42','Bid Won','2014-4-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'43','No Bid-PM','2014-2-12T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'44','No Bid-PM','2014-7-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'45','No Bid-PM','2014-6-4T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'46','No Bid-PM','2014-10-31T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'47','No Bid-PM','2014-7-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'48','No Bid-PM','2014-6-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'49','No Bid-PM','2014-9-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'50','No Bid-PM','2014-5-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'51','No Bid-PM','2014-6-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'52','No Bid-PM','2014-6-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'53','No Bid-PM','2014-6-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'54','No Bid-PM','2014-7-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'55','No Bid-VP','2014-9-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'56','No Bid-PM','2014-11-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'57','No Bid-PM','2014-11-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'58','No Bid-PM','2014-12-5T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'59','RFP Pending Bid Decision','2015-1-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'60','No Bid-PM','2008-7-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'94','No Bid-PM','2008-8-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'95','No Bid-PM','2008-8-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'96','No Bid-PM','2008-10-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'97','Bid Lost','2008-10-2T00:00:00Z','','','','980408','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'98','No Bid-PM','2008-10-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'99','No Bid-PM','2014-11-21T00:00:00Z','','','will not submit','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'61','No Bid-PM','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'100','No Bid-PM','2013-6-12T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'62','No Bid-VP','2014-1-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'63','No Bid-VP','2014-12-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'64','No Bid-PM','2012-1-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'65','Bid Lost','2013-1-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'66','No Bid-PM','2013-6-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'67','Bid Lost','2013-9-26T00:00:00Z','','submitted','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'68','No Bid-PM','2011-6-9T09:35:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'69','RFI','2014-3-14T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'70','RFI','2012-12-20T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'71','RFI','2014-3-11T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'72','RFI','2014-8-7T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'73','No Bid-PM','2014-2-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'74','No Bid-PM','2011-11-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'75','Sources Sought','2014-2-10T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'76','Sources Sought','2014-4-28T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'77','No Bid-PM','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'101','No Bid-PM','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'102','No Bid-VP','2013-5-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'78','No Bid-VP','2013-5-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'79','No Bid-PM','2013-5-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'80','No Bid-VP','2014-4-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'81','No Bid-PM','2014-5-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'2','Received','2014-11-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle31');
createChangeJSON(TOsJSON,'1','Bid Won','2008-3-1T00:00:00Z','','','','2845934','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'2','Bid Won','2009-5-15T00:00:00Z','','','','831001.6','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'3','Bid Won','2009-8-15T00:00:00Z','','','','1157604','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'4','Bid Won','2009-10-1T00:00:00Z','','','','3730953.89','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'5','Bid Won','2011-5-15T00:00:00Z','','','','366657.75','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'6','Bid Won','2011-5-25T00:00:00Z','','','','2417017.93','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'7','Retired','2012-11-16T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'8','Received','2014-12-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'9','No Bid-PM','2014-12-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'10','No Bid-PM','2010-1-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'11','No Bid-PM','2010-3-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'12','Bid Lost','2010-5-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'13','No Bid-PM','2010-5-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'14','No Bid-PM','2010-5-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'15','No Bid-PM','2010-6-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'16','No Bid-PM','2010-6-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'17','No Bid-PM','2010-6-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'18','No Bid-PM','2010-7-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'19','No Bid-PM','2010-8-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'20','No Bid-PM','2010-8-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'21','No Bid-PM','2010-12-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'22','No Bid-PM','2011-1-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'23','No Bid-PM','2011-1-5T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'24','No Bid-PM','2011-1-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'25','Bid Won','2011-1-26T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'26','No Bid-PM','2011-2-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'27','No Bid-PM','2011-3-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'28','No Bid-PM','2011-5-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'29','No Bid-PM','2011-9-28T06:29:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'30','No Bid-PM','2011-10-4T10:16:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'31','Draft RFP/Q','2011-10-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'32','No Bid-PM','2012-2-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'33','RFI','2012-2-9T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'34','RFI','2012-2-15T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'35','RFI','2012-4-11T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'36','No Bid-PM','2012-5-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'37','No Bid-PM','2012-8-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'38','Bid Won','2012-10-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'39','Bid Lost','2012-12-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'40','No Bid-PM','2013-1-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'41','RFI','2013-2-1T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'42','No Bid-PM','2013-7-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'43','No Bid-VP','2014-9-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'44','RFI','2014-12-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'45','RFI','2014-12-30T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'46','No Bid-PM','2015-1-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle32');
createChangeJSON(TOsJSON,'1','Retired','2012-2-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'2','Retired','2012-3-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'3','Retired','2012-2-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'4','Retired','2012-2-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'5','Retired','2012-1-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'6','Retired','2012-2-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'7','Retired','2012-2-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'8','Retired','2012-6-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'9','Retired','2012-3-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'10','Retired','2012-3-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'11','Retired','2012-3-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'12','Retired','2012-2-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'13','Retired','2012-2-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'14','Retired','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'15','Lead','2012-3-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'16','Retired','2012-7-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'17','Lead','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'18','Retired','2012-2-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'19','Retired','2012-1-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'20','Retired','2012-3-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'21','Retired','2012-3-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'22','Lead','2012-3-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'23','Retired','2012-2-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'24','Lead','2012-1-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'25','Retired','2012-3-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'26','Lead','2012-3-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'27','Lead','2012-3-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'28','Retired','2012-3-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'29','Lead','2012-2-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'30','Lead','2012-2-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'31','Lead','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'32','Lead','2012-5-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'33','Retired','2012-1-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'34','Retired','2012-2-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'35','Retired','2012-2-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'36','Lead','2012-3-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'37','Cancelled','2012-6-20T08:21:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'38','Lead','2012-2-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'39','Retired','2012-3-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'40','Retired','2012-1-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'41','Retired','2012-3-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'42','Retired','2012-3-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'43','Lead','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'44','Retired','2012-4-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'45','Retired','2012-2-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'46','Lead','2012-2-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'47','Lead','2012-3-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'48','Lead','2012-6-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'49','Lead','2012-2-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'50','Retired','2012-2-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'51','Retired','2012-1-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'52','Retired','2012-2-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'53','Retired','2012-5-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'54','Retired','2012-1-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'55','Lead','2012-3-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'56','Lead','2012-3-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'57','Retired','2012-1-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'58','Lead','2012-1-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'59','Lead','2012-1-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'60','Lead','2012-3-12T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'61','Lead','2012-3-12T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'62','Retired','2012-1-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'63','Retired','2012-2-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'64','Retired','2012-4-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'65','Retired','2012-2-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'66','Retired','2012-2-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle40');
createChangeJSON(TOsJSON,'1','Lead','2012-4-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'2','Bid Won','2007-2-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'3','Bid Won','2007-7-15T00:00:00Z','','','','19431','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'4','Bid Won','2007-6-15T00:00:00Z','','','','592737.6','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'5','Bid Won','2007-7-1T00:00:00Z','','','','189260','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'6','Retired','2012-4-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'7','Bid Won','2008-8-15T00:00:00Z','','','','2377427.73','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'8','Bid Won','2008-5-1T00:00:00Z','will not submit','will not submit','will not submit','719597.8','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'9','Bid Won','2008-8-1T00:00:00Z','','','','1092264.55','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'10','Bid Won','2008-5-25T00:00:00Z','','','','967696.92','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'11','Bid Won','2008-5-1T00:00:00Z','','','','7071882.78','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'12','Bid Won','2008-7-1T00:00:00Z','','','','5209646.97','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'13','Bid Won','2008-12-28T00:00:00Z','','','','13498780.66','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'14','Bid Won','2009-8-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'15','Bid Won','2010-1-15T00:00:00Z','','','','2759345','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'16','Bid Won','2010-3-1T00:00:00Z','','','','666791.12','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'17','Bid Won','2010-3-1T00:00:00Z','','','','6150638.29','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'18','Bid Won','2010-3-1T00:00:00Z','','','','2799972.52','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'19','Bid Won','2010-7-15T00:00:00Z','','','','883020','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'20','Bid Won','2010-3-15T00:00:00Z','','','','525767','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'21','Bid Won','2011-8-15T00:00:00Z','','','','2030807','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'22','Bid Won','2011-7-1T00:00:00Z','','','','3110100','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'23','Bid Won','2011-8-1T00:00:00Z','','','','100031.08','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'24','Bid Won','2011-7-15T00:00:00Z','','','','327344.28','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'25','Bid Won','2011-8-1T00:00:00Z','','','','1180185.6','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'26','Bid Won','2011-9-1T00:00:00Z','','','','23758.27','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'27','Lead','2012-3-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'28','Lead','2012-6-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'29','Draft RFP/Q','2012-12-12T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'30','Retired','2012-4-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'31','Lead','2012-1-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'32','Retired','2012-1-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'33','Lead','2012-1-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'34','Lead','2012-1-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'35','Lead','2012-1-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'36','Lead','2012-1-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'37','Lead','2012-1-16T00:00:00Z','','','','250000','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'38','Lead','2012-1-16T00:00:00Z','','','','250000','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'39','Lead','2012-1-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'40','Bid Won','2012-9-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'41','Bid Lost','2012-8-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'42','Bid Won','2012-8-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'43','No Bid-PM','2010-9-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'44','Retired','2012-3-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'45','Lead','2012-1-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'46','Lead','2012-2-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'47','Retired','2012-3-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'48','Retired','2012-2-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'49','Lead','2012-3-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'50','No Bid-PM','2013-9-5T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'51','No Bid-PM','2010-4-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'52','Draft RFP/Q','2013-6-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'53','RFI','2014-2-28T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'54','Lead','2012-1-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'55','Draft RFP/Q','2012-5-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'56','No Bid-PM','2010-6-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'57','No Bid-PM','2009-12-4T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'58','No Bid-PM','2013-11-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'59','No Bid-PM','2014-1-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'60','Retired','2009-11-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'61','No Bid-PM','2009-11-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'62','No Bid-PM','2009-12-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'63','Retired','2009-12-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'64','No Bid-PM','2009-12-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'65','No Bid-PM','2010-1-4T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'66','No Bid-PM','2010-1-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'67','No Bid-PM','2010-1-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'68','No Bid-PM','2010-1-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'69','No Bid-PM','2010-1-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'70','No Bid-PM','2010-1-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'71','No Bid-PM','2010-1-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'72','No Bid-PM','2010-1-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'73','No Bid-PM','2010-1-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'74','No Bid-PM','2010-2-12T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'75','No Bid-PM','2010-2-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'76','No Bid-PM','2010-2-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'77','No Bid-PM','2010-2-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'78','No Bid-PM','2010-3-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'79','No Bid-PM','2010-3-5T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'80','Retired','2010-3-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'81','Retired','2010-4-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'82','Retired','2010-6-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'83','No Bid-PM','2010-3-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'84','No Bid-PM','2010-3-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'85','No Bid-PM','2010-3-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'86','No Bid-PM','2010-3-26T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'87','No Bid-PM','2010-3-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'88','No Bid-PM','2010-3-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'89','No Bid-PM','2010-3-26T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'90','No Bid-PM','2010-3-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'91','No Bid-PM','2010-3-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'92','No Bid-PM','2010-3-31T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'93','No Bid-PM','2010-4-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'94','Retired','2010-4-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'95','Retired','2010-4-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'96','No Bid-PM','2010-4-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'97','No Bid-PM','2010-4-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'98','No Bid-PM','2010-4-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'99','No Bid-PM','2010-4-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'100','No Bid-PM','2010-5-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'101','No Bid-PM','2010-5-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'102','No Bid-PM','2010-5-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'103','No Bid-PM','2010-5-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'104','No Bid-PM','2010-5-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'105','No Bid-PM','2010-5-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'106','No Bid-PM','2010-5-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'107','No Bid-PM','2010-5-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'108','No Bid-PM','2010-5-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'109','No Bid-PM','2010-5-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'110','No Bid-PM','2010-5-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'111','No Bid-PM','2010-5-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'112','No Bid-PM','2010-5-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'113','No Bid-PM','2010-5-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'114','No Bid-PM','2010-5-26T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'115','No Bid-PM','2010-5-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'116','No Bid-PM','2010-5-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'117','No Bid-PM','2010-6-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'118','No Bid-PM','2010-6-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'119','No Bid-PM','2010-6-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'120','No Bid-PM','2010-6-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'121','No Bid-PM','2010-6-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'122','No Bid-PM','2010-6-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'123','No Bid-PM','2010-6-4T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'124','No Bid-PM','2010-6-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'125','No Bid-PM','2010-6-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'126','No Bid-PM','2010-6-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'127','No Bid-PM','2010-6-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'128','No Bid-PM','2010-6-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'129','No Bid-PM','2010-6-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'130','No Bid-PM','2010-6-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'389','No Bid-PM','2010-6-26T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'131','No Bid-PM','2010-6-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'132','No Bid-PM','2010-6-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'133','Lead','2010-7-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'134','No Bid-PM','2010-7-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'135','No Bid-PM','2010-7-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'136','No Bid-PM','2010-7-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'137','No Bid-PM','2010-7-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'138','No Bid-PM','2010-7-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'139','No Bid-PM','2010-7-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'140','No Bid-PM','2010-7-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'141','No Bid-PM','2010-7-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'142','No Bid-PM','2010-7-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'143','No Bid-PM','2010-7-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'144','No Bid-PM','2010-7-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'145','No Bid-PM','2010-7-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'146','No Bid-PM','2010-7-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'147','No Bid-PM','2010-7-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'148','No Bid-PM','2010-7-26T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'149','No Bid-PM','2010-7-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'150','No Bid-PM','2010-7-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'151','No Bid-PM','2010-7-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'152','No Bid-PM','2010-8-4T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'153','No Bid-PM','2010-8-5T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'154','Draft RFP/Q','2010-8-5T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'155','Bid Won','2010-8-5T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'156','No Bid-PM','2010-8-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'157','No Bid-PM','2010-8-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'158','Lead','2010-8-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'159','No Bid-PM','2010-8-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'160','No Bid-PM','2010-8-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'161','No Bid-PM','2010-8-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'162','No Bid-PM','2010-8-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'163','No Bid-PM','2010-8-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'164','No Bid-PM','2010-8-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'165','Lead','2010-8-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'166','No Bid-PM','2010-8-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'167','No Bid-PM','2010-8-26T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'168','No Bid-PM','2010-8-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'169','No Bid-PM','2010-8-31T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'170','No Bid-PM','2010-9-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'171','No Bid-PM','2010-9-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'172','No Bid-PM','2010-9-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'173','No Bid-PM','2010-9-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'390','No Bid-PM','2010-9-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'174','No Bid-PM','2010-9-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'175','No Bid-PM','2010-9-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'176','No Bid-PM','2010-9-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'177','No Bid-PM','2010-9-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'178','Bid Lost','2010-10-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'179','No Bid-PM','2010-10-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'180','No Bid-PM','2010-10-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'181','No Bid-PM','2010-10-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'182','No Bid-PM','2010-10-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'183','No Bid-PM','2010-12-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'184','No Bid-PM','2010-10-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'185','No Bid-PM','2010-11-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'186','No Bid-PM','2010-11-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'187','No Bid-PM','2010-11-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'188','No Bid-PM','2010-12-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'189','Lead','2010-12-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'190','No Bid-PM','2010-12-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'191','No Bid-PM','2010-12-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'192','No Bid-PM','2010-12-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'193','No Bid-PM','2010-12-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'194','No Bid-PM','2010-12-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'195','No Bid-PM','2010-12-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'196','No Bid-PM','2011-1-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'197','No Bid-PM','2011-1-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'198','No Bid-PM','2011-1-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'199','No Bid-PM','2011-1-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'200','Lead','2011-1-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'201','No Bid-PM','2011-1-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'202','Retired','2011-1-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'203','No Bid-PM','2011-1-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'204','No Bid-PM','2011-1-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'205','No Bid-PM','2011-1-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'206','No Bid-PM','2011-1-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'207','No Bid-PM','2011-2-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'208','No Bid-PM','2011-2-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'209','No Bid-PM','2011-2-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'210','No Bid-PM','2011-2-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'211','No Bid-PM','2011-2-4T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'212','No Bid-PM','2011-2-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'213','No Bid-PM','2011-2-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'214','No Bid-PM','2011-2-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'215','No Bid-PM','2011-2-12T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'216','No Bid-PM','2011-2-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'217','No Bid-PM','2011-2-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'218','No Bid-PM','2011-2-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'219','No Bid-PM','2011-2-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'220','No Bid-PM','2011-2-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'221','No Bid-PM','2011-2-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'222','No Bid-PM','2011-2-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'223','No Bid-PM','2011-2-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'224','No Bid-PM','2011-2-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'225','No Bid-PM','2011-2-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'226','No Bid-PM','2011-2-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'227','RFI','2011-2-28T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'228','No Bid-PM','2011-2-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'229','No Bid-PM','2011-2-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'230','No Bid-PM','2011-3-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'231','No Bid-PM','2011-3-4T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'232','No Bid-PM','2011-3-4T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'233','No Bid-PM','2011-3-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'234','No Bid-PM','2011-3-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'235','No Bid-PM','2011-3-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'236','No Bid-PM','2011-3-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'237','No Bid-PM','2011-3-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'238','No Bid-PM','2011-3-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'239','No Bid-PM','2011-3-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'240','No Bid-PM','2011-3-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'241','No Bid-PM','2011-3-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'242','No Bid-PM','2011-3-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'243','No Bid-PM','2011-3-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'244','No Bid-PM','2011-3-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'245','Bid Won','2011-3-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'246','RFI','2011-3-21T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'247','No Bid-PM','2011-3-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'248','No Bid-PM','2011-3-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'249','No Bid-PM','2011-3-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'250','No Bid-PM','2011-3-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'251','No Bid-PM','2011-3-31T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'252','No Bid-PM','2011-4-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'253','No Bid-PM','2011-4-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'254','No Bid-PM','2011-4-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'255','No Bid-PM','2011-4-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'256','No Bid-PM','2011-4-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'257','No Bid-PM','2011-4-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'258','No Bid-PM','2011-4-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'259','No Bid-PM','2011-4-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'260','No Bid-PM','2011-5-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'261','No Bid-PM','2011-4-12T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'262','No Bid-PM','2011-4-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'263','No Bid-PM','2011-4-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'264','No Bid-PM','2011-4-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'265','No Bid-PM','2011-4-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'266','No Bid-PM','2011-4-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'267','No Bid-PM','2011-4-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'268','No Bid-PM','2011-4-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'269','No Bid-PM','2011-4-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'270','No Bid-PM','2011-4-26T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'271','No Bid-PM','2011-4-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'272','No Bid-PM','2011-5-4T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'273','No Bid-PM','2011-5-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'274','No Bid-PM','2011-5-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'275','No Bid-PM','2011-5-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'276','No Bid-PM','2011-5-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'277','No Bid-PM','2011-5-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'278','No Bid-PM','2011-5-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'279','No Bid-PM','2011-5-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'280','No Bid-PM','2011-5-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'281','No Bid-PM','2011-5-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'282','No Bid-PM','2011-5-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'283','No Bid-PM','2011-5-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'284','No Bid-PM','2011-5-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'285','No Bid-PM','2011-5-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'286','No Bid-PM','2011-5-12T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'287','No Bid-PM','2011-12-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'288','No Bid-PM','2011-9-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'289','No Bid-PM','2011-10-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'290','Bid Won','2011-10-25T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'291','No Bid-PM','2011-10-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'292','No Bid-PM','2011-11-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'293','No Bid-PM','2011-12-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'294','No Bid-PM','2011-11-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'295','Bid Won','2011-11-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'296','No Bid-PM','2011-11-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'297','Draft RFP/Q','2011-11-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'298','No Bid-PM','2011-11-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'299','Cancelled','2011-11-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'300','Draft RFP/Q','2011-12-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'391','Bid Lost','2011-12-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'392','Lead','2011-12-12T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'393','No Bid-PM','2012-1-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'394','No Bid-PM','2012-1-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'395','No Bid-PM','2011-12-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'396','Draft RFP/Q','2011-2-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'397','RFI','2011-12-29T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'398','No Bid-PM','2012-2-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'399','No Bid-PM','2012-1-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'400','No Bid-PM','2012-1-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'401','No Bid-PM','2012-1-5T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'402','Retired','2012-1-5T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'403','No Bid-PM','2012-1-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'404','No Bid-PM','2012-1-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'405','No Bid-PM','2012-1-12T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'406','RFI','2012-1-13T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'407','RFI','2012-1-17T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'408','Lead','2012-1-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'409','No Bid-PM','2012-1-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'410','Bid Won','2012-1-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'411','No Bid-PM','2012-1-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'412','Bid Won','2012-1-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'413','No Bid-PM','2012-1-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'414','No Bid-PM','2012-1-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'415','RFI','2012-1-31T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'416','Retired','2012-1-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'417','Retired','2012-1-31T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'418','RFI','2012-2-1T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'419','No Bid-PM','2012-2-1T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'420','No Bid-PM','2012-2-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'421','No Bid-PM','2012-2-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'422','No Bid-PM','2012-2-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'423','No Bid-PM','2012-2-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'424','No Bid-PM','2012-2-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'425','RFI','2012-2-10T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'426','No Bid-PM','2012-2-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'427','No Bid-PM','2012-2-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'428','No Bid-PM','2012-2-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'429','No Bid-PM','2012-2-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'430','No Bid-PM','2012-2-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'431','No Bid-PM','2012-2-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'432','No Bid-PM','2012-2-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'433','No Bid-PM','2012-2-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'434','No Bid-PM','2012-2-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'435','No Bid-PM','2012-2-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'436','No Bid-PM','2012-3-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'437','RFI','2012-2-28T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'438','Draft RFP/Q','2012-2-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'439','No Bid-PM','2012-3-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'440','No Bid-PM','2012-3-5T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'466','RFI','2012-3-8T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'467','Draft RFP/Q','2012-3-12T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'468','No Bid-PM','2012-3-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'469','Draft RFP/Q','2012-3-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'470','RFI','2012-3-19T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'471','Draft RFP/Q','2012-3-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'472','No Bid-PM','2012-4-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'473','No Bid-PM','2012-4-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'474','No Bid-PM','2012-4-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'475','No Bid-PM','2012-5-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'476','No Bid-PM','2012-5-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'477','RFI','2012-5-4T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'478','Bid Lost','2012-5-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'492','Bid Lost','2012-5-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'486','Cancelled','2012-6-4T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'487','No Bid-PM','2012-6-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'488','No Bid-PM','2012-6-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'489','No Bid-VP','2012-6-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'490','Cancelled','2012-7-11T15:17:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'480','No Bid-VP','2012-6-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'481','No Bid-PM','2012-6-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'482','No Bid-VP','2012-7-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'483','No Bid-PM','2012-7-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'484','No Bid-PM','2012-7-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'485','Bid Won','2012-8-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'441','No Bid-PM','2012-7-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'442','Bid Won','2012-8-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'443','No Bid-PM','2012-8-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'444','No Bid-PM','2012-8-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'445','No Bid-PM','2012-8-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'446','Bid Lost','2012-8-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'447','No Bid-PM','2012-8-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'448','No Bid-PM','2012-8-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'449','No Bid-PM','2012-8-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'450','No Bid-PM','2012-8-31T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'451','No Bid-PM','2012-9-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'452','No Bid-PM','2012-9-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'453','No Bid-PM','2012-9-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'454','No Bid-PM','2012-10-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'455','RFI','2012-10-4T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'456','RFI','2012-10-5T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'457','No Bid-PM','2012-10-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'458','No Bid-PM','2012-10-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'459','No Bid-VP','2012-10-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'460','No Bid-PM','2012-11-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'461','RFI','2012-11-9T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'462','No Bid-PM','2012-11-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'463','No Bid-VP','2012-11-12T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'464','No Bid-VP','2012-11-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'465','Bid Lost','2013-1-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'301','No Bid-VP','2012-11-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'302','No Bid-PM','2012-12-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'303','Bid Won','2012-11-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'304','No Bid-PM','2013-1-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'305','Retired','2013-1-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'306','No Bid-PM','2013-2-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'307','Bid Won','2013-2-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'308','No Bid-PM','2013-2-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'309','No Bid-PM','2013-2-26T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'310','Bid Lost','2013-3-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'311','No Bid-VP','2013-3-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'312','Sources Sought','2013-3-15T00:00:00Z','','submitted','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'313','No Bid-PM','2013-3-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'314','Sources Sought','2013-4-2T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'315','No Bid-PM','2013-4-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'316','No Bid-PM','2013-4-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'317','No Bid-PM','2013-4-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'318','No Bid-PM','2013-5-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'319','No Bid-PM','2013-5-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'320','No Bid-PM','2013-5-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'321','No Bid-PM','2013-5-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'322','No Bid-PM','2013-5-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'323','RFI','2013-5-5T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'324','Sources Sought','2013-5-5T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'325','RFI','2013-5-8T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'326','No Bid-PM','2013-5-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'327','No Bid-PM','2013-5-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'328','RFI','2013-5-17T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'329','No Bid-PM','2013-5-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'330','No Bid-PM','2013-5-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'331','No Bid-PM','2013-6-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'332','RFI','2013-6-6T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'333','RFI','2013-6-10T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'334','No Bid-VP','2013-7-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'335','No Bid-PM','2013-7-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'336','Sources Sought','2013-7-23T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'337','No Bid-VP','2013-9-26T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'338','No Bid-PM','2013-7-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'339','No Bid-PM','2013-8-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'340','RFI','2013-9-9T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'341','RFI','2013-9-9T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'342','No Bid-PM','2013-9-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'343','Sources Sought','2013-10-19T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'344','No Bid-PM','2013-10-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'345','RFI','2013-10-25T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'346','RFI','2013-10-25T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'347','Sources Sought','2013-11-7T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'348','Lead','2013-11-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'349','RFI','2013-11-19T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'350','No Bid-VP','2013-11-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'351','No Bid-VP','2013-12-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'352','RFI','2013-12-19T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'353','Sources Sought','2013-12-23T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'354','RFI','2014-1-2T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'355','RFI','2014-1-16T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'356','RFI','2014-2-6T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'357','Sources Sought','2014-2-18T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'358','Sources Sought','2014-3-21T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'359','RFI','2014-4-7T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'360','No Bid-VP','2014-4-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'361','RFI','2014-4-22T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'362','Sources Sought','2014-5-22T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'363','Sources Sought','2014-6-13T00:00:00Z','','submitted','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'364','RFI','2014-7-7T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'365','RFI','2014-7-8T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'366','RFI','2014-7-10T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'367','No Bid-VP','2014-7-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'368','RFI','2014-8-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'369','No Bid-VP','2014-9-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'370','RFI','2014-9-9T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'371','Bid Won','2014-9-22T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'372','RFI','2014-10-8T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'373','RFI','2014-11-7T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'374','No Bid-PM','2014-11-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'375','No Bid-PM','2014-11-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'376','RFI','2014-11-25T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'377','No Bid-VP','2014-12-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'378','RFI','2014-12-23T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'379','RFI','2015-1-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'380','No Bid-PM','2010-11-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'381','No Bid-PM','2015-1-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'383','No Bid-PM','2010-8-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'384','No Bid-PM','2010-8-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'385','Bid Won','2010-10-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'382','Bid Lost','2014-6-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'386','Sources Sought','2012-11-6T00:00:00Z','','submitted','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'387','Retired','2012-10-23T00:00:00Z','','submitted','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'388','Bid Lost','2012-6-21T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle33');
createChangeJSON(TOsJSON,'1','RFI','2014-2-28T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle34');
createChangeJSON(TOsJSON,'2','RFI','2014-6-3T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle34');
createChangeJSON(TOsJSON,'3','No Bid-PM','2014-10-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle34');
createChangeJSON(TOsJSON,'4','No Bid-PM','2014-12-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle34');
createChangeJSON(TOsJSON,'5','No Bid-PM','2014-12-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle34');
createChangeJSON(TOsJSON,'1','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'2','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'3','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'4','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'5','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'6','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'7','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'8','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'9','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'10','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'11','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'12','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'13','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'14','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'15','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'16','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'17','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'18','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'19','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'20','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'21','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'22','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'23','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'24','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'25','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'26','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'27','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'28','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'29','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'30','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle41');
createChangeJSON(TOsJSON,'1','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'2','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'3','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'4','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'5','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'6','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'7','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'8','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'9','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'10','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'11','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'12','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'13','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'14','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'15','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'16','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'17','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'18','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'19','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'20','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'21','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'22','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'23','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'24','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'25','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'26','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'27','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'28','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'29','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'30','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'31','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'32','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'33','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'34','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'35','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'36','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'37','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'38','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'39','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'40','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'41','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'42','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'43','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'44','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'45','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'46','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'47','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'48','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'49','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'50','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'51','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'52','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'53','No Bid-PM','1990-1-1T00:00:00Z','','','','0','https://fsnet.unisys.com/sites/cwidiq/home/vehicle42');
createChangeJSON(TOsJSON,'1','Retired','2012-3-13T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'2','Retired','2012-3-14T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'3','Retired','2011-11-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'4','Retired','2012-1-13T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'5','Retired','2012-1-20T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'6','Retired','2012-2-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'7','Retired','2012-2-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'8','Retired','2012-4-13T00:00:00Z','','','submitted','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'9','Retired','2012-5-4T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'10','Retired','2012-2-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'11','Bid Won','2012-3-14T00:00:00Z','','','','880385.66','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'12','Bid Won','2012-5-1T00:00:00Z','','','','72000','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'13','Retired','2012-1-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'14','Retired','2012-2-3T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'15','Retired','2012-2-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'16','Bid Lost','2012-3-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'17','Retired','2012-3-14T00:00:00Z','','','','70000000','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'18','Bid Won','2012-3-16T00:00:00Z','','','','3000000','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'19','Retired','2012-3-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'20','Retired','2012-4-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'21','Retired','2012-5-31T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'25','Bid Won','2011-12-1T00:00:00Z','','','','210000','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'26','Bid Lost','2012-3-16T00:00:00Z','','','','3373600','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'22','Retired','2012-3-23T00:00:00Z','','','','399407','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'23','Retired','2012-3-23T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'24','Retired','2012-3-23T00:00:00Z','','','','4215255','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'27','Retired','2011-12-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'28','Retired','2011-11-7T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'29','Retired','2011-12-30T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'30','Retired','2012-6-7T14:55:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'31','Retired','2012-6-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'32','Retired','2012-3-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'33','Retired','2012-2-28T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'34','Retired','2012-6-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'35','Retired','2012-6-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'36','Retired','2012-6-7T14:56:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'37','Retired','2012-7-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'38','Retired','2012-6-7T14:57:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'39','Retired','2012-4-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'40','Retired','2011-6-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'41','Retired','2012-6-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'42','Retired','2012-5-4T08:16:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'43','Retired','2011-11-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'44','Bid Lost','2012-3-16T00:00:00Z','','','','4121818','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'45','Retired','2012-3-23T00:00:00Z','','','','1000000','https://fsnet.unisys.com/sites/cwidiq/home/vehicle35');
createChangeJSON(TOsJSON,'1','No Bid-PM','2014-6-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle36');
createChangeJSON(TOsJSON,'2','Sources Sought','2014-7-7T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle36');
createChangeJSON(TOsJSON,'3','Lead','2012-10-26T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'5','Lead','2012-10-26T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'6','Lead','2012-10-26T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'4','RFI','2014-7-16T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'1','RFI','2014-8-6T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'2','No Bid-PM','2014-8-8T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'7','Lead','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'8','Lead','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'9','Lead','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'10','Lead','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'11','Lead','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'12','Lead','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'13','Lead','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'14','Retired','2012-4-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'15','Retired','2011-12-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'16','Retired','2011-11-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'17','Retired','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'18','Retired','2011-11-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'19','Lead','2012-6-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'20','Lead','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'21','Lead','2012-6-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'22','Lead','1990-1-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'23','RFI','2014-2-25T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'24','Bid Lost','2013-6-11T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'25','RFI','2014-1-14T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'26','RFI','2014-5-12T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'27','RFI','2014-7-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'28','RFI','2014-4-10T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'29','RFI','2014-4-30T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'30','RFI','2014-6-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'31','Sources Sought','2014-6-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'32','Sources Sought','2014-5-28T00:00:00Z','','submitted','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'33','Received','2013-7-26T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'34','RFI','2014-12-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'35','No Bid-PM','2012-7-24T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'36','No Bid-PM','2012-10-23T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'37','Lead','2014-4-25T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'38','RFI','2014-8-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'39','RFI','2014-3-19T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'40','RFI','2014-6-16T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'41','Lead','2011-12-1T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'42','Lead','2013-9-27T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'43','Sources Sought','2014-8-5T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'44','RFI','2015-1-6T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'45','RFI','2014-6-23T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'46','No Bid-PM','2012-8-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'1','Sources Sought','2014-10-2T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle38');
createChangeJSON(TOsJSON,'2','Sources Sought','2014-10-2T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle38');
createChangeJSON(TOsJSON,'3','Sources Sought','2014-12-12T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle38');
createChangeJSON(TOsJSON,'4','Sources Sought','2014-9-23T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle38');
createChangeJSON(TOsJSON,'5','Sources Sought','2014-10-17T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle38');
createChangeJSON(TOsJSON,'6','RFP Pending Bid Decision','2015-1-15T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle38');
createChangeJSON(TOsJSON,'7','RFI','2014-10-29T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle38');
createChangeJSON(TOsJSON,'8','No Bid-PM','2014-12-31T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle38');
createChangeJSON(TOsJSON,'9','No Bid-PM','2014-10-23T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle38');
createChangeJSON(TOsJSON,'10','RFP Pending Bid Decision','2014-12-2T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle38');
createChangeJSON(TOsJSON,'11','RFI','2014-12-17T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle38');
createChangeJSON(TOsJSON,'12','Sources Sought','2015-1-2T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle38');
createChangeJSON(TOsJSON,'53','RFI','2014-3-19T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'47','Received','2014-3-17T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'52','RFI','2013-12-26T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'48','RFI','2014-5-9T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'49','RFI','2014-5-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'50','RFI','2014-6-20T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'51','RFI','2014-6-23T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'54','Sources Sought','2014-7-9T00:00:00Z','','will not submit','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'55','RFI','2014-8-6T00:00:00Z','will not submit','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'57','RFI','2013-2-8T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'56','RFI','2014-3-14T00:00:00Z','submitted','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');
createChangeJSON(TOsJSON,'58','RFI','2014-8-18T00:00:00Z','','','','','https://fsnet.unisys.com/sites/cwidiq/home/vehicle37');

























/*
*/
});

function WriteJSON() {
var ToWrite = '<ows:Batch OnError="Return">';
	$.each(TOsJSON,function(index,item) {
		ToWrite += '<Method ID="A'+index+'"><SetList>%Task Orders%</SetList><SetVar Name="ID">New</SetVar><SetVar Name="Cmd">Save</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Status">Migrated</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#TrackNo">'+ item.TrackNo+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#TOrder">'+ item.TOrder+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#TotalContractValue">'+ item.TotalContractValue+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Award_x0020_Date">'+ item.AwardDate+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Incumbent">'+ item.Incumbent+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Title">'+ item.Title+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Agency">'+ item.Agency+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#TaskAreas">'+ item.TaskAreas+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Ubid">'+ item.Ubid+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Department">'+ item.Department+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Capability">'+ item.Capability+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Contract_x0020_Type">'+ item.Contract_x0020_Type+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Region">'+ item.Region+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#PlaceofPerformance">'+ item.PlaceofPerformance+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#SalesForceID">'+ item.SalesForceID+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#PrimeSub">'+ item.PrimeSub+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#RFPReleaseDate">'+ item.RFPReleaseDate+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#RFPResponseDue">'+ item.RFPResponseDue+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#ContractingOrg">'+ item.ContractingOrg+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#POC">'+ item.POC+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#DecisionDate">'+ item.DecisionDate+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Keywords"><![CDATA['+ item.Keywords+']]></SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#COEOriginated">'+ item.COEOriginated+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#RFPQuestionsDue">'+ item.RFPQuestionsDue+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#LossReason">'+ item.LossReason+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">'+ item.NoBidReason+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Notes">'+ item.Notes+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#ProgramManager">'+ item.ProgramManager+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#IncumbentDetails"><![CDATA['+ item.IncumbentDetails+']]></SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#KeyEvaluationCriteria"><![CDATA['+ item.KeyEvaluationCriteria+']]></SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#PastPerformanceCriteria"><![CDATA['+ item.PastPerformanceCriteria+']]></SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#KeyPersonnelCriteria"><![CDATA['+ item.KeyPersonnelCriteria+']]></SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#POPStartDate">'+ item.POPStartDate+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#POPEndDate">'+ item.POPEndDate+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#OppSource">'+ item.OppSource+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#RFISubmitted">'+ item.RFISubmitted+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#SourcesSoughtSubmitted">'+ item.SourcesSoughtSubmitted+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#DRFPSubmitted">'+ item.DRFPSubmitted+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#RFIReleaseDate">'+ item.RFIReleaseDate+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#RFIQuestionsDue">'+ item.RFIQuestionsDue+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#RFIResponseDue">'+ item.RFIResponseDue+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#DRFPReleaseDate">'+ item.DRFPReleaseDate+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#DRFPQuestionsDue">'+ item.DRFPQuestionsDue+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#DRFPResponseDue">'+ item.DRFPResponseDue+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#SourcesSoughtResponseDue">'+ item.SourcesSoughtResponseDue+'</SetVar>';
		ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#TeamMembers">'+ item.TeamMembers+'</SetVar>';
/*
*/
		ToWrite +='</Method>';
	});
	ToWrite +='</ows:Batch>';

	$.ajax({
		type: 'POST',
		url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'ProcessBatchData',
		 		ListTitle: 'Task Orders',
		 		SiteUrl: ToSiteUrl,
				Batch: ToWrite,
				OutputType: 'json' },
		dataType: 'json',
		cache: false,
		
		success:function(json){
			alert('Done!')							
        },

		//success: ResetPage,
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}

	});

	
}

function createJSON(Object, TrackNo, TOrder, TotalContractValue, AwardDate, Incumbent, Title, Agency, TaskAreas, Ubid, Department, Capability, Contract_x0020_Type, Region, PlaceofPerformance, SalesForceID, PrimeSub, RFPReleaseDate, RFPResponseDue, ContractingOrg, POC, DecisionDate, Keywords, COEOriginated, RFPQuestionsDue, LossReason, NoBidReason, Notes, ProgramManager, IncumbentDetails, KeyEvaluationCriteria, PastPerformanceCriteria, KeyPersonnelCriteria, POPStartDate, POPEndDate, OppSource, RFISubmitted, SourcesSoughtSubmitted, DRFPSubmitted, RFIReleaseDate, RFIQuestionsDue, RFIResponseDue, DRFPReleaseDate, DRFPQuestionsDue, DRFPResponseDue, SourcesSoughtResponseDue, TeamMembers) {
		var item = {};
		item.TrackNo=TrackNo;
		item.TOrder=TOrder;
		item.TotalContractValue=TotalContractValue;
		item.AwardDate=AwardDate;
		item.Incumbent=Incumbent;
		item.Title=Title;
		item.Agency=Agency;
		item.TaskAreas=TaskAreas;
		item.Ubid=Ubid;
		item.Department=Department;
		item.Capability=Capability;
		item.Contract_x0020_Type=Contract_x0020_Type;
		item.Region=Region;
		item.PlaceofPerformance=PlaceofPerformance;
		item.SalesForceID=SalesForceID;
		item.PrimeSub=PrimeSub;
		item.RFPReleaseDate=RFPReleaseDate;
		item.RFPResponseDue=RFPResponseDue;
		item.ContractingOrg=ContractingOrg;
		item.POC=POC;
		item.DecisionDate=DecisionDate;
		item.Keywords=Keywords;
		item.COEOriginated=COEOriginated;
		item.RFPQuestionsDue=RFPQuestionsDue;
		item.LossReason=LossReason;
		item.NoBidReason=NoBidReason;
		item.Notes=Notes;
		item.ProgramManager=ProgramManager;
		item.IncumbentDetails=IncumbentDetails;
		item.KeyEvaluationCriteria=KeyEvaluationCriteria;
		item.PastPerformanceCriteria=PastPerformanceCriteria;
		item.KeyPersonnelCriteria=KeyPersonnelCriteria;
		item.POPStartDate=POPStartDate;
		item.POPEndDate=POPEndDate;
		item.OppSource=OppSource;
		item.RFISubmitted=RFISubmitted;
		item.SourcesSoughtSubmitted=SourcesSoughtSubmitted;
		item.DRFPSubmitted=DRFPSubmitted;
		item.RFIReleaseDate=RFIReleaseDate;
		item.RFIQuestionsDue=RFIQuestionsDue;
		item.RFIResponseDue=RFIResponseDue;
		item.DRFPReleaseDate=DRFPReleaseDate;
		item.DRFPQuestionsDue=DRFPQuestionsDue;
		item.DRFPResponseDue=DRFPResponseDue;
		item.SourcesSoughtResponseDue=SourcesSoughtResponseDue;
		item.TeamMembers=TeamMembers;
        Object.push(item);
}

function FixTOURL() {
	$.ajax({
		 type:'POST',
         dataType:'json',
         url:'../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'GetListItems',
			TableName: 'TaskOrders',
			ListTitle: 'Task Orders',
			SiteUrl: ToSiteUrl,
			OutputType : 'json'
		},
		success: Setsetfix,
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});

}
function Setsetfix(json) {
var ToWrite = '';
	if (json.NewDataSet.TaskOrders.listitems['rs:data'].ItemCount == 0)
		{
		alert('No Vehicles found');
		}
	else if (json.NewDataSet.TaskOrders.listitems['rs:data'].ItemCount == 1) {
		ToWrite = '<ows:Batch OnError="Return">';
					ToWrite += '<Method ID="A1"><SetList>%Task Orders%</SetList><SetVar Name="ID">'+json.NewDataSet.TaskOrders.listitems['rs:data']['z:row'].ows_ID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#TO_x0020_Site_x0020_URL"></SetVar>';
					ToWrite +='</Method></ows:Batch>';
	}
	else {
			ToWrite = '<ows:Batch OnError="Return">';
				$.each(json.NewDataSet.TaskOrders.listitems['rs:data']['z:row'],function(index,item) {
					ToWrite += '<Method ID="A'+index+'"><SetList>%Task Orders%</SetList><SetVar Name="ID">'+item.ows_ID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#TO_x0020_Site_x0020_URL"></SetVar>';
					ToWrite +='</Method>';	
				});
			ToWrite +='</ows:Batch>';
	}

//alert(ToWrite);	

	$.ajax({
		type: 'POST',
		url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'ProcessBatchData',
		 		ListTitle: 'Task Orders',
		 		SiteUrl: ToSiteUrl,
				Batch: ToWrite,
				OutputType: 'json' },
		dataType: 'json',
		cache: false,
		
		success:function(json){
			alert('Done!')							
        },

		//success: ResetPage,
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}

	});

}
/*
function MoveDocs() {
	$.each(DocsJSON,function(index,item) {
	var caml = '';
	caml += '<Query><Where>';
	//caml += '<Query><Where><And>';
	caml += '<Contains><FieldRef Name="FileDirRef" /><Value Type="Lookup">'+ item.docfolder +'</Value></Contains>';
	//caml += '<Eq><FieldRef Name="FSObjType" /><Value Type="Lookup">0</Value></Eq>';
	//caml += '</And></Where></Query>'; ows_EncodedAbsUrl
	caml += '</Where></Query>';
	caml += '<QueryOptions><DateInUtc>false</DateInUtc><RowLimit>10</RowLimit><ViewAttributes Scope="RecursiveAll" /></QueryOptions>';
var CTOURL = item.tourl;
		$.ajax({
		 type:'POST',
         dataType:'json',
         url:'../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'GetListItems',
			TableName: 'Docs',
			ListTitle: 'RFP Repository Folder/Library',
			CAML: caml,
			SiteUrl: 'https://fsnet.unisys.com/sites/IDIQ/RFPServices',
			
			OutputType : 'json'
		},
		//success: MoveDocsfiles,
		success:function(json){
				if (json.NewDataSet.Docs.listitems['rs:data'].ItemCount == 0)
						{
						//alert('No Vehicles found');
						}
					else if (json.NewDataSet.Docs.listitems['rs:data'].ItemCount == 1) {
										$.ajax({
											type: 'POST',
											url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
											data: { RequestType: 'CopyFile',
											 		NewFileName: json.NewDataSet.Docs.listitems['rs:data']['z:row'].ows_LinkFilename,
											 		SourceFileUrl: json.NewDataSet.Docs.listitems['rs:data']['z:row'].ows_EncodedAbsUrl,
											 		ListTitle: 'Request Documents',
													SiteUrl: CTOURL,
													OutputType: 'json' },
											dataType: 'json',
											cache: false,
											async : true,
											success:function(json){
												//alert('Done!')							
									        },
									
											//success: ResetPage,
											//error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
									
										});
					}
					else {
								$.each(json.NewDataSet.Docs.listitems['rs:data']['z:row'],function(index,item) {
										$.ajax({
											type: 'POST',
											url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
											data: { RequestType: 'CopyFile',
											 		NewFileName: item.ows_LinkFilename,
											 		SourceFileUrl: item.ows_EncodedAbsUrl,
											 		ListTitle: 'Request Documents',
													SiteUrl: CTOURL,
													OutputType: 'json' },
											dataType: 'json',
											cache: false,
											async : true,
											success:function(json){
												//alert('Done!')							
									        },
									
											//success: ResetPage,
											//error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
									
										});
								});
					}
						
        },

		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});

	
	});

}
*/
function MoveDocs2() {

$.each(DocsJSON2,function(index,item) {
	var	TrackNo = item.TrackNo
	var	TitleTO= item.Title;
	var	TOID= item.TOID;
	var caml = '';
	caml += '<Query><Where>';
	//caml += '<Query><Where><And>';
	caml += '<Contains><FieldRef Name="FileLeafRef" /><Value Type="Text">'+ TrackNo +'</Value></Contains>';
	//caml += '<Eq><FieldRef Name="FSObjType" /><Value Type="Lookup">0</Value></Eq>';
	//caml += '</And></Where></Query>'; ows_EncodedAbsUrl
	caml += '</Where></Query>';
	caml += '<QueryOptions><DateInUtc>false</DateInUtc><ViewAttributes Scope="RecursiveAll" /></QueryOptions>';

	$.ajax({
		 type:'POST',
         dataType:'json',
         url:'../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'GetListItems',
			TableName: 'Docs',
	 		ListTitle: 'Vehicle Library',
			SiteUrl: ToSiteUrl,
			CAML: caml, 
			OutputType : 'json'
		},
		success:function(json){
				var ToWrite = '';
					if (json.NewDataSet.Docs.listitems['rs:data'].ItemCount == 0)
						{
						//alert('No Vehicles found');
						}
					else if (json.NewDataSet.Docs.listitems['rs:data'].ItemCount == 1) {
						//var current = json.NewDataSet.Docs.listitems['rs:data']['z:row'].ows_BaseName;
						//var currentname = current.split('!_!');
						ToWrite = '<ows:Batch OnError="Return">';
									ToWrite += '<Method ID="A1"><SetList>%Vehicle Library%</SetList><SetVar Name="ID">'+json.NewDataSet.Docs.listitems['rs:data']['z:row'].ows_ID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
									ToWrite += '<SetVar Name="owsfileref">'+json.NewDataSet.Docs.listitems['rs:data']['z:row'].ows_ServerUrl+'</SetVar>';
									ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#TOID">'+TOID+'</SetVar>';
									ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#TOTitle">'+TitleTO+'</SetVar>';
									//ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#owsnewfileref">'+currentname[1] +'</SetVar>';
									ToWrite +='</Method></ows:Batch>';
					}
					else {
							ToWrite = '<ows:Batch OnError="Return">';
								$.each(json.NewDataSet.Docs.listitems['rs:data']['z:row'],function(index,item) {
									//var current1 = item.ows_BaseName;
									//var currentname1 = current1.split('!_!');

									ToWrite += '<Method ID="A'+index+'"><SetList>%Vehicle Library%</SetList><SetVar Name="ID">'+item.ows_ID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
									ToWrite += '<SetVar Name="owsfileref">'+item.ows_ServerUrl+'</SetVar>';
									ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#TOID">'+TOID+'</SetVar>';
									ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#TOTitle">'+TitleTO+'</SetVar>';
									//ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#owsnewfileref">'+currentname1[1] +'</SetVar>';
									ToWrite +='</Method>';	
								});
							ToWrite +='</ows:Batch>';
					}
				
				//alert(ToWrite);	
				if(ToWrite != ''){
					$.ajax({
						type: 'POST',
						url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
						data: { RequestType: 'ProcessBatchData',
						 		ListTitle: 'Vehicle Library',
						 		SiteUrl: ToSiteUrl,
								Batch: ToWrite,
								OutputType: 'json' },
						dataType: 'json',
						cache: false,
						async : true,
						success:function(json){
							//alert('Done!')							
				        },
				
						//success: ResetPage,
						error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
				
					});
					}
					/*
				*/
		},
		async : true,
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});
});
}
function MoveDocs21(json) {

}

function MoveDocs1() {
	$.each(DocsJSON,function(index,item) {
	var caml = '';
	caml += '<Query><Where>';
	//caml += '<Query><Where><And>';
	caml += '<Contains><FieldRef Name="FileDirRef" /><Value Type="Lookup">'+ item.docfolder +'</Value></Contains>';
	//caml += '<Eq><FieldRef Name="FSObjType" /><Value Type="Lookup">0</Value></Eq>';
	//caml += '</And></Where></Query>'; ows_EncodedAbsUrl
	caml += '</Where></Query>';
	caml += '<QueryOptions><DateInUtc>false</DateInUtc><ViewAttributes Scope="RecursiveAll" /></QueryOptions>';
var TOTrackNum = item.tourl;
		$.ajax({
		 type:'POST',
         dataType:'json',
         url:'../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'GetListItems',
			TableName: 'Docs',
			ListTitle: 'RFP Repository Folder/Library',
			CAML: caml,
			SiteUrl: 'https://fsnet.unisys.com/sites/IDIQ/RFPServices',
			
			OutputType : 'json'
		},
		//success: MoveDocsfiles,
		success:function(json){
				if (json.NewDataSet.Docs.listitems['rs:data'].ItemCount == 0)
						{
						//alert('No Vehicles found');
						}
					else if (json.NewDataSet.Docs.listitems['rs:data'].ItemCount == 1) {
										$.ajax({
											type: 'POST',
											url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
											data: { RequestType: 'CopyFile',
											 		NewFileName: TOTrackNum + '_'+json.NewDataSet.Docs.listitems['rs:data']['z:row'].ows_LinkFilename,
											 		SourceFileUrl: json.NewDataSet.Docs.listitems['rs:data']['z:row'].ows_EncodedAbsUrl,
											 		ListTitle: 'Vehicle Library',
													SiteUrl: ToSiteUrl,
													OutputType: 'json' },
											dataType: 'json',
											cache: false,
											async : true,
											success:function(json){
												//alert('Done!')							
									        },
									
											//success: ResetPage,
											//error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
									
										});
					}
					else {
								$.each(json.NewDataSet.Docs.listitems['rs:data']['z:row'],function(index,item) {
										$.ajax({
											type: 'POST',
											url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
											data: { RequestType: 'CopyFile',
											 		//NewFileName: TOTrackNum + '!_!'+json.NewDataSet.Docs.listitems['rs:data']['z:row'].ows_LinkFilename,
											 		NewFileName: TOTrackNum + '_'+ item.ows_LinkFilename,
											 		SourceFileUrl: item.ows_EncodedAbsUrl,
											 		ListTitle: 'Vehicle Library',
													SiteUrl: ToSiteUrl,
													OutputType: 'json' },
											dataType: 'json',
											cache: false,
											async : true,
											success:function(json){
												//alert('Done!')							
									        },
									
											//success: ResetPage,
											//error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
									
										});
								});
					}
						
        },

		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});

	
	});

}

function createDocJSON(Object, docfolder, tourl) {
		var item = {};
		item.docfolder=docfolder;
		item.tourl=tourl;
        Object.push(item);
}
function createDocJSON2(Object, TrackNo, Title, TOID) {
		var item = {};
		item.TrackNo=TrackNo;
		item.Title=Title;
		item.TOID=TOID;

        Object.push(item);
}
function FixTOfields(TOURL) {
	$.ajax({
		 type:'POST',
         dataType:'json',
         url:'../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		async : true,
		cache : false,         
		data : {
			RequestType : 'GetListItems',
			TableName: 'TaskOrders',
			ListTitle: 'Task Orders',
			SiteUrl: TOURL,
			OutputType : 'json'
		},
		success: function(json){

			var ToWrite = '';
				if (json.NewDataSet.TaskOrders.listitems['rs:data'].ItemCount == 0)
					{
					alert('No Vehicles found');
					}
				else if (json.NewDataSet.TaskOrders.listitems['rs:data'].ItemCount == 1) {
					/*
					if(json.NewDataSet.TaskOrders.listitems['rs:data']['z:row'].ows_NoBidReason || json.NewDataSet.TaskOrders.listitems['rs:data']['z:row'].ows_LossReason){
					ToWrite = '<ows:Batch OnError="Return">';
								ToWrite += '<Method ID="A1"><SetList>%Task Orders%</SetList><SetVar Name="ID">'+json.NewDataSet.TaskOrders.listitems['rs:data']['z:row'].ows_ID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
					switch (json.NewDataSet.TaskOrders.listitems['rs:data']['z:row'].ows_NoBidReason) {
					  case '1':
					    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">Entrenched incumbent</SetVar>';
					    break;
					  case '2':
					    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">High equipment investment</SetVar>';
					    break;
					  case '3':
					    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">Insufficient time to bid</SetVar>';
					    break;
					  case '4':
					    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">Lack of quals/past performance</SetVar>';
					    break;
					  case '5':
					    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">Lack of client intimacy</SetVar>';
					    break;
					  case '7':
					    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">Lack of key personnel</SetVar>';
					    break;
					  case '8':
					    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">Lack of resources/workload</SetVar>';
					    break;
					  case '9':
					    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">No response from account</SetVar>';
					    break;
					  case '10':
					    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">No SB teammate/set-aside opp</SetVar>';
					    break;
					  case '11':
					    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">Not at location/zone</SetVar>';
					    break;
					  case '12':
					    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">Pricing constraints/value too small</SetVar>';
					    break;
					  case '13':
					    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">Not in our focus area</SetVar>';
					    break;
					  default:
					    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason"></SetVar>';
					    break;
					}
									switch (json.NewDataSet.TaskOrders.listitems['rs:data']['z:row'].ows_LossReason) {
									  case '1':
									    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#LossReason">Price</SetVar>';
									    break;
									  case '2':
									    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#LossReason">Technical</SetVar>';
									    break;
									  case '3':
									    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#LossReason">Entrenched Incumbent</SetVar>';
									    break;
									  default:
									    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#LossReason"></SetVar>';
									    break;
									}
					
								
								ToWrite +='</Method></ows:Batch>';
					}
					*/
					if(json.NewDataSet.TaskOrders.listitems['rs:data']['z:row'].ows_NoBidReason){
					if(item.ows_POC){
					ToWrite = '<ows:Batch OnError="Return">';
								ToWrite += '<Method ID="A1"><SetList>%Task Orders%</SetList><SetVar Name="ID">'+json.NewDataSet.TaskOrders.listitems['rs:data']['z:row'].ows_ID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
								 ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#GovernmentPOCs">'+json.NewDataSet.TaskOrders.listitems['rs:data']['z:row'].ows_POC+'</SetVar>';
					ToWrite +='</Method></ows:Batch>';
					}
					}

				}
				else {
						ToWrite = '<ows:Batch OnError="Return">';
							$.each(json.NewDataSet.TaskOrders.listitems['rs:data']['z:row'],function(index,item) {
							if(item.ows_POC){
								//alert(item.ows_NoBidReason);
								ToWrite += '<Method ID="A'+index+'"><SetList>%Task Orders%</SetList><SetVar Name="ID">'+item.ows_ID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
								ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#GovernmentPOCs">'+item.ows_POC+'</SetVar>';
								ToWrite +='</Method>';
								}	
							/*
							if(item.ows_NoBidReason || item.ows_LossReason){
								//alert(item.ows_NoBidReason);
								ToWrite += '<Method ID="A'+index+'"><SetList>%Task Orders%</SetList><SetVar Name="ID">'+item.ows_ID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
									switch (item.ows_NoBidReason) {
									  case '1':
									    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">Entrenched incumbent</SetVar>';
									    break;
									  case '2':
									    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">High equipment investment</SetVar>';
									    break;
									  case '3':
									    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">Insufficient time to bid</SetVar>';
									    break;
									  case '4':
									    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">Lack of quals/past performance</SetVar>';
									    break;
									  case '5':
									    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">Lack of client intimacy</SetVar>';
									    break;
									  case '7':
									    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">Lack of key personnel</SetVar>';
									    break;
									  case '8':
									    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">Lack of resources/workload</SetVar>';
									    break;
									  case '9':
									    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">No response from account</SetVar>';
									    break;
									  case '10':
									    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">No SB teammate/set-aside opp</SetVar>';
									    break;
									  case '11':
									    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">Not at location/zone</SetVar>';
									    break;
									  case '12':
									    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">Pricing constraints/value too small</SetVar>';
									    break;
									  case '13':
									    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason">Not in our focus area</SetVar>';
									    break;
									  default:
									    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#NoBidReason"></SetVar>';
									    break;
									}
									switch (item.ows_LossReason) {
									  case '1':
									    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#LossReason">Price</SetVar>';
									    break;
									  case '2':
									    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#LossReason">Technical</SetVar>';
									    break;
									  case '3':
									    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#LossReason">Entrenched Incumbent</SetVar>';
									    break;
									  default:
									    ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#LossReason"></SetVar>';
									    break;
									}
									
												ToWrite +='</Method>';	
							}
							*/					
							});
						ToWrite +='</ows:Batch>';
				}
			
			//alert(ToWrite);	

				$.ajax({
					type: 'POST',
					url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
					data: { RequestType: 'ProcessBatchData',
					 		ListTitle: 'Task Orders',
					 		SiteUrl: TOURL,
							Batch: ToWrite,
							OutputType: 'json' },
					dataType: 'json',
		async : true,
		cache : false,

					
					success:function(json){
						//alert('Done!')							
			        },
			
					//success: ResetPage,
					error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
			
				});
						/*		*/
		
		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});

}
function Setsetfix(json) {
var ToWrite = '';
	if (json.NewDataSet.TaskOrders.listitems['rs:data'].ItemCount == 0)
		{
		alert('No Vehicles found');
		}
	else if (json.NewDataSet.TaskOrders.listitems['rs:data'].ItemCount == 1) {
		ToWrite = '<ows:Batch OnError="Return">';
					ToWrite += '<Method ID="A1"><SetList>%Task Orders%</SetList><SetVar Name="ID">'+json.NewDataSet.TaskOrders.listitems['rs:data']['z:row'].ows_ID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#TO_x0020_Site_x0020_URL"></SetVar>';
					ToWrite +='</Method></ows:Batch>';
	}
	else {
			ToWrite = '<ows:Batch OnError="Return">';
				$.each(json.NewDataSet.TaskOrders.listitems['rs:data']['z:row'],function(index,item) {
					ToWrite += '<Method ID="A'+index+'"><SetList>%Task Orders%</SetList><SetVar Name="ID">'+item.ows_ID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#TO_x0020_Site_x0020_URL"></SetVar>';
					ToWrite +='</Method>';	
				});
			ToWrite +='</ows:Batch>';
	}

//alert(ToWrite);	

	$.ajax({
		type: 'POST',
		url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'ProcessBatchData',
		 		ListTitle: 'Task Orders',
		 		SiteUrl: ToSiteUrl,
				Batch: ToWrite,
				OutputType: 'json' },
		dataType: 'json',
		cache: false,
		
		success:function(json){
			alert('Done!')							
        },

		//success: ResetPage,
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}

	});

}
function ChangeDateOld() {
var ToWrite = '';
			ToWrite = '<ows:Batch OnError="Return">';
					ToWrite += '<Method ID="A1"><SetList>%Task Orders%</SetList><SetVar Name="ID">1</SetVar><SetVar Name="Cmd">Save</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Created">2013-09-15T00:00:00Z</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Author">11</SetVar>';
					ToWrite +='</Method>';	
			ToWrite +='</ows:Batch>';

//alert(ToWrite);	

	$.ajax({
		type: 'POST',
		url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'ProcessBatchData',
		 		ListTitle: 'Task Orders',
		 		SiteUrl: ToSiteUrl,
				Batch: ToWrite,
				OutputType: 'json' },
		dataType: 'json',
		cache: false,
		
		success:function(json){
			alert('Done!')							
        },

		//success: ResetPage,
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}

	});

}
function ChangeDate() {
				$.each(TOsJSON,function(index,item) {
					var ToWrite = '';
					ToWrite = '<ows:Batch OnError="Return">';
					ToWrite += '<Method ID="A1"><SetList>%Task Orders%</SetList><SetVar Name="ID">'+item.ID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Created">'+item.Created +'</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#RFISubmitted">'+item.RFISubmitted +'</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#RFPSubmitted">'+item.RFPSubmitted +'</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#DRFPSubmitted">'+item.DRFPSubmitted+'</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#SourcesSoughtSubmitted">'+item.SSSubmitted+'</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Award_x0020_Value">'+item.AwardAMT+'</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Status">'+item.Status +'</SetVar>';
					ToWrite +='</Method>';
					ToWrite +='</ows:Batch>';

					$.ajax({
						type: 'POST',
						url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
						data: { RequestType: 'ProcessBatchData',
						 		ListTitle: 'Task Orders',
						 		SiteUrl: item.TOURL,
								Batch: ToWrite,
								OutputType: 'json' },
						dataType: 'json',
						cache: false,
						async : true,
						success:function(json){
							//alert('Done!')							
				        },
				
						//success: ResetPage,
						error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
				
					});
						
				});
			

/*
var ToWrite = '';
			ToWrite = '<ows:Batch OnError="Return">';
				$.each(TOsJSON,function(index,item) {
					
					ToWrite += '<Method ID="A'+index+'"><SetList>%Task Orders%</SetList><SetVar Name="ID">'+item.ID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Created">'+item.Created +'</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#RFISubmitted">'+item.RFISubmitted +'</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#RFPSubmitted">'+item.RFPSubmitted +'</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#DRFPSubmitted">'+item.DRFPSubmitted+'</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#SourcesSoughtSubmitted">'+item.SSSubmitted+'</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Award_x0020_Value">'+item.AwardAMT+'</SetVar>';
					ToWrite += '<SetVar Name="urn:schemas-microsoft-com:office:office#Status">'+item.Status +'</SetVar>';
					ToWrite +='</Method>';	
				});
			ToWrite +='</ows:Batch>';


//alert(ToWrite);	

	$.ajax({
		type: 'POST',
		url: '../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'ProcessBatchData',
		 		ListTitle: 'Task Orders',
		 		SiteUrl: ToSiteUrl,
				Batch: ToWrite,
				OutputType: 'json' },
		dataType: 'json',
		cache: false,
		
		success:function(json){
			alert('Done!')							
        },

		//success: ResetPage,
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}

	});
*/
}
function createChangeJSON(Object, ID, Status, Created , RFISubmitted, SSSubmitted, DRFPSubmitted, AwardAMT, TOURL) {

		var item = {};
		item.Created =Created;
		if (RFISubmitted=='submitted'){item.RFISubmitted = 'Yes';}else{item.RFISubmitted = 'No';}
		if (SSSubmitted=='submitted'){item.SSSubmitted= 'Yes';}else{item.SSSubmitted= 'No';}
		if (DRFPSubmitted=='submitted'){item.DRFPSubmitted= 'Yes';}else{item.DRFPSubmitted= 'No';}
		item.AwardAMT=AwardAMT;
		item.ID=ID;
		item.TOURL = TOURL;
		switch (Status) {
		  case 'No Bid-PM':
		    item.RFPSubmitted = 'No';
		    item.Status = 'No Bid';
		    break;
		  case 'NULL':
		    item.RFPSubmitted = 'No';
		    item.Status = 'NULL';
		    break;
		  case 'No Bid-VP':
		    item.RFPSubmitted = 'No';
		    item.Status = 'No Bid';
		    break;
		  case 'Sources Sought':
		    item.RFPSubmitted = 'No';
		    item.Status = 'Sources Sought';
		    break;
		  case 'Retired':
		    item.RFPSubmitted = 'No';
		    item.Status = 'Retired';
		    break;
		  case 'Lead':
		    item.RFPSubmitted = 'No';
		    item.Status = 'Lead';
		    break;
		  case 'RFI':
		    item.RFPSubmitted = 'No';
		    item.Status = 'Received';
		    break;
		  case 'Bid Won':
		    item.RFPSubmitted = 'Yes';
		    item.Status = 'Awarded - Won';
		    break;
		  case 'RFP Bid Submitted':
		    item.RFPSubmitted = 'Yes';
		    item.Status = 'Submitted';
		    break;
		  case 'Cancelled':
		    item.RFPSubmitted = 'No';
		    item.Status = 'Cancelled';
		    break;
		  case 'Draft RFP/Q':
		    item.RFPSubmitted = 'No';
		    item.Status = 'Draft RFP/Q';
		    break;
		  case 'Bid Lost':
		    item.RFPSubmitted = 'Yes';
		    item.Status = 'Awarded - Lost';
		    break;
		  case 'RFP Pending Bid Decision':
		    item.RFPSubmitted = 'No';
		    item.Status = 'Bid Assessment';
		    break;
		  case 'RFP In Proposal':
		    item.RFPSubmitted = 'No';
		    item.Status = 'Proposal Development';
		    break;
		  default:
		  	item.RFPSubmitted = 'No';
		  	item.Status = Status;
		    break;
		}
			

        Object.push(item);
}




