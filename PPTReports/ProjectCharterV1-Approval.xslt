<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:template match="/">
<font face="Calibri">	
	<div>
		<table style="width:400px;">
				<thead>
					<tr>
						<th align="left" style="width:200px;padding:5px">Title</th>
						<th align="left" style="width:200px;padding:5px">Due Date</th>
						<!--
						<th align="left" style="width:200px;padding:5px">Approver</th>
						<th align="left" style="width:200px;padding:5px">Approved</th>
						-->
					</tr>
				</thead>
				<tbody id="ApprovalTableBody">
					<xsl:for-each select="//Approvals/cw:listitems/rs:data/z:row">
						<tr data-id="{@ows_ID}">
							<td align="left" style="width:200px;padding:5px">
						      	<xsl:value-of select="@ows_Title" />
						      </td>
							<td align="left" style="width:200px;padding:5px">
								<xsl:value-of select="format-date(xs:date(substring-before(@ows_DueDate,' ')), '[M01]-[D01]-[Y0001]')"/>
						      </td>						      
						      <!--
							<td align="left" style="width:200px;padding:5px">
						      	<xsl:value-of select="substring-after(@ows_Approver,';#')" />
						      </td>
							<td align="left" style="width:200px;padding:5px">
								<xsl:value-of select="format-date(xs:date(substring-before(@ows_DueDate,' ')), '[M01]-[D01]-[Y0001]')"/>
						      </td>
							<td align="left" style="width:200px;padding:5px">
						      	<xsl:value-of select="@ows_Approved" />
						      </td>
						      -->
						</tr>
					</xsl:for-each>
				</tbody>
		</table>
	</div>
</font>						
	</xsl:template>
</xsl:stylesheet>