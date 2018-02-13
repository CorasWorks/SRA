$(document).ready(function () {	
	$.ajax({
		 type:'POST',
         dataType:'html',
         url:Site+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'BatchRequest',
			ConfigFileLocation: '[SRA Root]/Resources/sragridreports/pex.xml',
			XsltLocation: '[SRA Root]/Resources/sragridreports/pexrawwithtags.xslt',
			PortFolioURL: '%SiteURL%',
			OutputType : 'html'
		},
		success: function(html){
			$('#CAPSHtmlContent').html(html);
			initializeHTML();
			$('div#busyLoaderOuter').hide();  
		}
	});
});

function initializeHTML()
{
	var $table = $("table#pexRawWithTags");

	pagerOptions = {
		// target the pager markup - see the HTML block below
		container: $(".pager"),
		// output string - default is '{page}/{totalPages}'; possible variables: {page}, {totalPages}, {startRow}, {endRow} and {totalRows}
		output: '{startRow} - {endRow} / {filteredRows} ({totalRows})',
		// if true, the table will remain the same height no matter how many records are displayed. The space is made up by an empty
		// table row set to a height to compensate; default is false
		fixedHeight: true,
		// remove rows from the table to speed up the sort of large tables.
		// setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
		removeRows: false,
		// go to page selector - select dropdown that sets the current page
		cssGoto: '.gotoPage'
	};

	$table.tablesorter({
		sortList: [[0,0],[2,0],[3,0],[4,0],[5,0]],
		theme:'blue',
		widgets: ['filter', 'zebra', 'output'],
		widthFixed: true,
        widgetOptions: {
             // set to "json", "array" or any separator
            output_separator: ',',
            // header attrib containing modified header name
            output_dataAttrib: 'data-name',
            // if true, include multiple header rows (JSON only)
            output_headerRows: false,
            // popup, download
            output_delivery: 'download',
            // all, visible or filtered
            output_saveRows: 'filtered',
            // left double quote
            output_replaceQuote: '\u201c;',
            // if true, include any HTML within the table cell
            output_includeHTML: false,
            // remove extra whitespace before & after the cell content
            output_trimSpaces: true,
            // if true, wrap all output in quotes
            output_wrapQuotes: false,
            // if using popup, set it's dimensions here
            output_popupStyle: 'width=500,height=300',
            // if saving a file, set the file name here
            output_saveFileName: 'RawAllCostWithAdHocTags.csv',
            // callback executed when processing completes
            // return true to continue download/output
            // return false to stop delivery & do something else with the data
        }									
	}).tablesorterPager(pagerOptions);

    $('input#tableExport').click(function(){    
        $table.trigger('outputTable');
    });

}