<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:template match="/">
	<xsl:variable name="formatDate" select="'[M01]-[D01]-[Y0001]'"/>
		<script>
				var SRARootCheck = '[SRA Root]';					
		</script>		
	<div id="PCDisplayRoot">
		<div id="RegionManagerLoader" style="text-align: center; display:none">
		    <h2 style="text-align:center">
		        <span id="DocbusySpinner"></span>
		        <img src="[SRA Root]/_layouts/AppDesigner/Apps/ApplicationDesigner/Images/ProcessDesigner.gif" style="vertical-align:middle;padding:5px"/>
		        <br/>
		        Loading Regions...
		    </h2>
		</div>
		<div id="RegionManagerShell">
			<div id="RegionManagerWrap">
				<!-- pager -->
				<div id="PCDocumentsPager" class="pagerRegionManager">
				  <form>
				    <img src="[SRA Root]/Resources/TableSorter/pager/icons/first.png" class="first"/>
				    <img src="[SRA Root]/Resources/TableSorter/pager/icons/prev.png" class="prev"/>
				    <span class="pagedisplay"></span> <!-- this can be any element, including an input -->
				    <img src="[SRA Root]/Resources/TableSorter/pager/icons/next.png" class="next"/>
				    <img src="[SRA Root]/Resources/TableSorter/pager/icons/last.png" class="last"/>
				    <select class="pagesize">
				      <option value="25">25</option>
				      <option value="50">50</option>
				      <option value="100">100</option>
				    </select>
				  </form>
				</div>			
				<table id="RegionManager" class="tablesorter-default">
				  <thead>
				    <tr>
				      <th  class="filter-false" style="width:250px;"></th>
				      <th>Title</th>
				      <th># Region-Divisions</th>
				      <th>Active</th>
				    </tr>
				  </thead>
				  <tbody>
				  <xsl:for-each select="//Regions/cw:listitems/rs:data/z:row">
				  <xsl:variable name="CurrentID" select="@ows_ID" />
 				  <xsl:variable name="TotalSites" select="count(//RegionsDivs/cw:listitems/rs:data/z:row[@ows_RegionID=$CurrentID])" />
					<xsl:variable name="DeleteSite">
						<button class="RegionOnlyDelete" data-id="{@ows_ID}" data-url="[SRA Root]"  data-title="{@ows_Title}">
							<xsl:if test="$TotalSites != 0">
								<xsl:attribute name="Disabled">Disabled</xsl:attribute>
							</xsl:if>						
							Delete
						</button>
					</xsl:variable>
					<xsl:variable name="EditSite">
							<button class="RegionOnlyEdit" data-id="{@ows_ID}" data-title="{@ows_Title}" data-url="[SRA Root]">Edit</button>
					</xsl:variable>
						<tr>
							<td class="SiteButtons">
									<xsl:copy-of select="$EditSite" />
									<xsl:copy-of select="$DeleteSite" />
							</td>
							<td><xsl:value-of select="@ows_Title" /></td>
							<td><xsl:value-of select="$TotalSites" /></td>
							<td>
								<xsl:choose>
									<xsl:when test="@ows_Active=1">Yes</xsl:when>
									<xsl:otherwise>No</xsl:otherwise>
								</xsl:choose>
							</td>	
						</tr>
				   </xsl:for-each>				    				   
				  </tbody>
				</table>
				<!-- pager -->
				<div id="PCDocumentsPager" class="pagerRegionManager">
				  <form>
				    <img src="[SRA Root]/Resources/TableSorter/pager/icons/first.png" class="first"/>
				    <img src="[SRA Root]/Resources/TableSorter/pager/icons/prev.png" class="prev"/>
				    <span class="pagedisplay"></span> <!-- this can be any element, including an input -->
				    <img src="[SRA Root]/Resources/TableSorter/pager/icons/next.png" class="next"/>
				    <img src="[SRA Root]/Resources/TableSorter/pager/icons/last.png" class="last"/>
				    <select class="pagesize">
				      <option value="25">25</option>
				      <option value="50">50</option>
				      <option value="100">100</option>
				    </select>
				  </form>
				</div>
			</div>						
		</div>				
	</div>				
	</xsl:template>
</xsl:stylesheet>