<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:msxsl="urn:schemas-microsoft-com:xslt" 
	xmlns:date="http://exslt.org/dates-and-times"
	xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/"
	xmlns:rs="urn:schemas-microsoft-com:rowset"
	xmlns:z="#RowsetSchema"
	exclude-result-prefixes="msxsl date cw rs z">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="/">
		<xsl:variable name="siteURL">
			<xsl:for-each select="//SiteDirectory/cw:listitems/rs:data/z:row">
				<xsl:call-template name="parseURLs">
					<xsl:with-param name="projectsInPortfolio" select="@ows_Projects_x0020_In_x0020_Portfoli" />
				</xsl:call-template>
			</xsl:for-each>
		</xsl:variable>
		<OperationDefinitionCollection xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
			<Items>
				<OperationDefinition>
					<RequestType>GetListItems</RequestType>
					<TableName>Risks</TableName>
					<ListTitle>Risks</ListTitle>
					<SiteUrl>
						<xsl:value-of select="$siteURL" />
					</SiteUrl>
					<CAML>
						<xsl:text disable-output-escaping="yes">&lt;![CDATA[</xsl:text>
						<Query><Where><Eq><FieldRef Name='Status' /><Value Type='Choice'>Risk</Value></Eq></Where></Query>
						<xsl:text disable-output-escaping="yes">]]&gt;</xsl:text>
					</CAML>
				</OperationDefinition>
				<OperationDefinition>
					<RequestType>GetListInfo</RequestType>
					<TableName>TasksMetadata</TableName>
					<ListTitle>Tasks</ListTitle>
					<SiteUrl>
						<xsl:value-of select="$siteURL" />
					</SiteUrl>
				</OperationDefinition>
				<OperationDefinition>
					<RequestType>GetListItems</RequestType>
					<TableName>SiteDirectory</TableName>
					<ListTitle>Site Directory</ListTitle>
					<SiteUrl>[PPM v3.2]</SiteUrl>
				</OperationDefinition>
			</Items>
		</OperationDefinitionCollection>
	</xsl:template>
	<xsl:template name="parseURLs">
		<xsl:param name="projectsInPortfolio" />
		<xsl:choose>
			<xsl:when test="$projectsInPortfolio = ''">
			</xsl:when>
			<xsl:otherwise>
				<xsl:choose>
					<xsl:when test="contains(substring-after($projectsInPortfolio, ';#'), ';#')">
						<xsl:value-of select="substring-before(substring-after($projectsInPortfolio, ';#'), ';#')" />
						<xsl:text>,</xsl:text>
						<xsl:call-template name="parseURLs">
							<xsl:with-param name="projectsInPortfolio">
								<xsl:value-of select="substring-after(substring-after($projectsInPortfolio, ';#'), ';#')" /> 
							</xsl:with-param>
						</xsl:call-template>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="substring-after($projectsInPortfolio, ';#')" />
					</xsl:otherwise>
				</xsl:choose>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>

