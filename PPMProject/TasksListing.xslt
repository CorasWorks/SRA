<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:msxsl="urn:schemas-microsoft-com:xslt" 
	xmlns:date="http://exslt.org/dates-and-times"
	xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/"
	xmlns:rs="urn:schemas-microsoft-com:rowset"
	xmlns:z="#RowsetSchema"
	exclude-result-prefixes="msxsl date cw rs z">
	<xsl:output method="html" omit-xml-declaration="yes"/>
	<xsl:template match="/">
		<html>
			<head />
			<body>
				<link href="/CWPPM32/Project/TasksListing.css" rel="stylesheet" type="text/css" />
				<!--
				<table border="1">
					<thead>
						<tr style="font-weight:bolder">
							<td>Title</td>
							<td>Assigned To</td>
							<td>Start Date</td>
							<td>Due Date</td>
							<td>Work</td>
							<td>Actual Work</td>
						</tr>
					</thead>
					<tbody>
						<xsl:for-each select="//NewDataSet/Tasks/cw:listitems/rs:data/z:row">
							<xsl:variable name="wbsCheck" select="@ows_WBS" />
							<xsl:if test="count(//NewDataSet/Tasks/cw:listitems/rs:data/z:row[@ows_ParentWBS = $wbsCheck]) = 0">
								<tr>
									<td><xsl:value-of select="@ows_Title" />&#160;</td>
									<td><xsl:value-of select="@ows_AssignedTo" />&#160;</td>
									<td><xsl:value-of select="@ows_StartDate" />&#160;</td>
									<td><xsl:value-of select="@ows_DueDate" />&#160;</td>
									<td><xsl:value-of select="@ows_Work" />&#160;</td>
									<td><xsl:value-of select="@ows_ActualWork" />&#160;</td>
								</tr>
							</xsl:if>
						</xsl:for-each>
					</tbody>
				</table>
				-->
				<table style="width:100%">
					<tr>
						<td style="width:100%;vertical-align:top">
					<table class="OrgDollarsTable" cellpadding="0" cellspacing="0">
						<tr class="HeaderRow">
							<td>Title</td>
							<td>Assigned To</td>
							<td>Start Date</td>
							<td>Due Date</td>
							<td>Work</td>
							<td>Actual Work</td>
						</tr>
						<xsl:for-each select="//NewDataSet/Tasks/cw:listitems/rs:data/z:row">
							<xsl:variable name="wbsCheck" select="@ows_WBS" />
							<xsl:if test="count(//NewDataSet/Tasks/cw:listitems/rs:data/z:row[@ows_ParentWBS = $wbsCheck]) = 0">
							<tr>
								<xsl:if test="position() mod 2 = 0">
									<xsl:attribute name="class">
										<xsl:text>SummaryRowAlternate</xsl:text>
									</xsl:attribute>
								</xsl:if>
									<td class="OrgTitle"><xsl:value-of select="@ows_Title" />&#160;</td>
									<td class="OrgTitle"><xsl:value-of select="@ows_AssignedTo" />&#160;</td>
									<td class="OrgTitle"><xsl:value-of select="@ows_StartDate" />&#160;</td>
									<td class="OrgTitle"><xsl:value-of select="@ows_DueDate" />&#160;</td>
									<td class="OrgTitle"><xsl:value-of select="@ows_Work" />&#160;</td>
									<td class="OrgTitle"><xsl:value-of select="@ows_ActualWork" />&#160;</td>
							</tr>
													</xsl:if>
						</xsl:for-each>

								</table>
											</td>
					</tr>
				</table>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>

