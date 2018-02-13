<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="2.0" xmlns:fn="http://www.w3.org/2005/xpath-functions" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:date="http://exslt.org/dates-and-times" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="fn msxsl date cw rs z">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="/">
		<xsl:variable name="CurrentPhase" select="//Proposals/cw:listitems/rs:data/z:row/@ows_Phase" />
		<link rel="stylesheet" type="text/css" href="%ISiteURL%/ServiceFiles/Report1.css" />
		<!-- Header Div -->
		<div id="HeaderDiv" align="center">
			<div id="FullHeader" align="center">
			There are Currently <xsl:value-of select="//Projects/cw:listitems/rs:data/@ItemCount"/> active partnerships in %ChartName% R&amp;D
			</div>
			<table id="HorizonBD">
				<tr class="HeadLine">
					<td width="25%">Total projects</td>
					<td width="75%" class="mainhead">Active Partnerships</td>
				</tr>
				<tr>
					<td>Horizon 3: <xsl:value-of select="count(//Projects/cw:listitems/rs:data/z:row[@ows_Partnership_x0020_Level = 'Horizon 3']/@ows_ID)"/></td>
					<td></td>
				</tr>
				<tr>
					<td>Horizon 2: <xsl:value-of select="count(//Projects/cw:listitems/rs:data/z:row[@ows_Partnership_x0020_Level = 'Horizon 2']/@ows_ID)"/></td>
					<td></td>
				</tr>
				<tr>
					<td>Horizon 1: <xsl:value-of select="count(//Projects/cw:listitems/rs:data/z:row[@ows_Partnership_x0020_Level = 'Horizon 1']/@ows_ID)"/></td>
					<td></td>
				</tr>
			</table>
			<div id="charts">
			</div>
		</div>
	</xsl:template>
</xsl:stylesheet>	
