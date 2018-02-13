<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:template match="/">
				<div id="PCDocumentsWrap">
							<table id="ProDocuments" class="tablesorter-default">
							  <thead>
							    <tr>
							      <th>Name</th>
							      <th>Added</th>
							      <th>Modified</th>
							    </tr>
							  </thead>
							  <tbody>
							  <xsl:for-each select="//Documents/cw:listitems/rs:data/z:row">
									<tr>
										<td><a onclick="ForceDocDL('%SiteURL%','{@ows_EncodedAbsUrl}')">
						            	<xsl:value-of select="@ows_LinkFilename" /></a>
						            	</td>
										<td>
						            	<xsl:value-of select="format-date(xs:date(substring-before(@ows_Created,' ')), '[M01]-[D01]-[Y0001]')" />
						            	</td>
										<td>
						            	<xsl:value-of select="format-date(xs:date(substring-before(@ows_Modified,' ')), '[M01]-[D01]-[Y0001]')" />
						            	</td>
									</tr>
							   </xsl:for-each>				    
							  </tbody>
							</table>
						<!-- pager -->
						<div id="PCDocumentsPager" class="pagerPCDocuments">
						  <form>
						    <img src="[SRA Root]/Resources/TableSorter/pager/icons/first.png" class="first"/>
						    <img src="[SRA Root]/Resources/TableSorter/pager/icons/prev.png" class="prev"/>
						    <span class="pagedisplay"></span> <!-- this can be any element, including an input -->
						    <img src="[SRA Root]/Resources/TableSorter/pager/icons/next.png" class="next"/>
						    <img src="[SRA Root]/Resources/TableSorter/pager/icons/last.png" class="last"/>
						    <!--
						    <select class="pagesize">
						      <option value="6">6</option>
						      <option value="12">12</option>
						      <option value="24">24</option>
						    </select>
						    -->
						  </form>
						</div>
					</div>	
							
	</xsl:template>
</xsl:stylesheet>