<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:template match="/">
	<xsl:variable name="formatDate" select="'[M01]-[D01]-[Y0001]'"/>
		<script>
				var SRARootCheck = '[SRA Root]';					
		</script>		
	<div id="PCDisplayRoot">
		<div id="ProjectDeleteManagerLoader" style="text-align: center; display:none">
		    <h2 style="text-align:center">
		        <span id="DocbusySpinner"></span>
		        <img src="[SRA Root]/_layouts/AppDesigner/Apps/ApplicationDesigner/Images/ProcessDesigner.gif" style="vertical-align:middle;padding:5px"/>
		        <br/>
		        Loading Sites...
		    </h2>
		</div>
		<div id="ProjectDeleteManagerShell">
			<div id="ProjectDeleteManagerWrap">
				<!-- pager -->
				<div id="PCDocumentsPager" class="pagerProjectDeleteManager">
				  <form>
				    <img src="[SRA Root]/Resources/TableSorter/pager/icons/first.png" class="first"/>
				    <img src="[SRA Root]/Resources/TableSorter/pager/icons/prev.png" class="prev"/>
				    <span class="pagedisplay"></span> <!-- this can be any element, including an input -->
				    <img src="[SRA Root]/Resources/TableSorter/pager/icons/next.png" class="next"/>
				    <img src="[SRA Root]/Resources/TableSorter/pager/icons/last.png" class="last"/>
				    <select class="pagesize">
				      <option value="50">50</option>
				      <option value="100">100</option>
				      <option value="150">150</option>
				    </select>
				  </form>
				</div>
				<table id="ProjectDeleteManager" class="tablesorter-default">
				  <thead>
				    <tr>
				      <th  class="filter-false" style="width:250px;"></th>
				      <!--
				      <th>Type</th>
				      -->
				      <th>Project ID</th>
				      <th>Division</th>
				      <th>Region</th>
				      <th>Location</th>
				      <th>Title</th>
				      <th>Project Status</th>
				      <!--
				      <th># SubSites</th>
				      <th>Active</th>
				      -->
				    </tr>
				  </thead>
				  <tbody>
				  <xsl:for-each select="//Projects/cw:listitems/rs:data/z:row">
				  <!--
				  <xsl:variable name="CurrentURL" select="@ows_URL" />
				  <xsl:variable name="ParentID" select="@ows_ParentID" />
				  <xsl:variable name="RegID" select="//Locations/cw:listitems/rs:data/z:row[@ows_ID = $ParentID]/@ows_ParentID" />
				  <xsl:variable name="DivID" select="//Regions/cw:listitems/rs:data/z:row[@ows_ID = $RegID]/@ows_ParentID" />
 				  <xsl:variable name="TotalSites">0</xsl:variable>
 				  -->
					<xsl:variable name="DeleteSite">
						<button class="ProjectDelete" data-id="{@ows_ID}" data-url="{@ows_URL}" data-title="{@ows_Title}">Delete</button>
					</xsl:variable>
					<xsl:variable name="EditSite">
						<button class="ProjectEdit" data-title="{@ows_Title}" data-url="{@ows_URL}">Edit</button>
					</xsl:variable>
 				  
						<tr>
							<td class="SiteButtons">
									<xsl:copy-of select="$EditSite" />
									<xsl:copy-of select="$DeleteSite" />
							</td>
							<td><xsl:value-of select="@ows_ID" /></td>
							<!--
							<td><xsl:text>Project</xsl:text></td>
							-->
							<td><xsl:value-of select="@ows_Division" /></td>
							<td><xsl:value-of select="@ows_Region" /></td>
							<td><xsl:value-of select="@ows_Location" /></td>
							<!--
							<td><xsl:value-of select="//Divisions/cw:listitems/rs:data/z:row[@ows_ID = $DivID]/@ows_Title" /></td>
							<td><xsl:value-of select="//Regions/cw:listitems/rs:data/z:row[@ows_ID = $RegID]/@ows_Region" /></td>
							<td><xsl:value-of select="//Locations/cw:listitems/rs:data/z:row[@ows_ID = $ParentID]/@ows_Title" /></td>
							-->
							<td>
								<xsl:choose>
									<xsl:when test="@ows_URL">
										<a href="{@ows_URL}"><xsl:value-of select="@ows_Title" /></a>
									</xsl:when>
									<xsl:otherwise><xsl:value-of select="@ows_Title" /></xsl:otherwise>
								</xsl:choose>							
							</td>
							<td><xsl:value-of select="@ows_ProjectStatus" /></td>
							<!--
							<td><xsl:value-of select="$TotalSites" /></td>
							<td>
								<xsl:choose>
									<xsl:when test="@ows_Active=1">Yes</xsl:when>
									<xsl:otherwise>No</xsl:otherwise>
								</xsl:choose>
							</td>
							-->	
						</tr>
				   </xsl:for-each>
				   
				  </tbody>
				</table>
				<!-- pager -->
				<div id="PCDocumentsPager" class="pagerProjectDeleteManager">
				  <form>
				    <img src="[SRA Root]/Resources/TableSorter/pager/icons/first.png" class="first"/>
				    <img src="[SRA Root]/Resources/TableSorter/pager/icons/prev.png" class="prev"/>
				    <span class="pagedisplay"></span> <!-- this can be any element, including an input -->
				    <img src="[SRA Root]/Resources/TableSorter/pager/icons/next.png" class="next"/>
				    <img src="[SRA Root]/Resources/TableSorter/pager/icons/last.png" class="last"/>
				    <select class="pagesize">
				      <option value="50">50</option>
				      <option value="100">100</option>
				      <option value="150">150</option>
				    </select>
				  </form>
				</div>
			</div>						
		</div>				
	</div>				
	</xsl:template>
</xsl:stylesheet>