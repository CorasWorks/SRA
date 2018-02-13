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
			<xsl:for-each select="SiteDirectory/cw:listitems/rs:data/z:row">
				<xsl:call-template name="parseURLs">
					<xsl:with-param name="projectsInPortfolio" select="@ows_ProjectsInPortfolio_x003a_PPM_x0" />
				</xsl:call-template>
			</xsl:for-each>
		</xsl:variable>
		<OperationDefinitionCollection>
			<Items>
				<OperationDefinition>
					<RequestType>GetListItems</RequestType>
					<TableName>Tasks</TableName>
					<ListTitle>Tasks</ListTitle>
					<SiteUrl><xsl:value-of select="$siteURL" /></SiteUrl>
				</OperationDefinition>
				<OperationDefinition>
					<RequestType>GetListItems</RequestType>
					<TableName>Risks</TableName>
					<ListTitle>Risks</ListTitle>
					<SiteUrl><xsl:value-of select="$siteURL" /></SiteUrl>
				</OperationDefinition>
				<OperationDefinition>
					<RequestType>GetListItems</RequestType>
					<TableName>Deliverables</TableName>
					<ListTitle>Deliverables</ListTitle>
					<SiteUrl><xsl:value-of select="$siteURL" /></SiteUrl>
				</OperationDefinition>
				<OperationDefinition>
					<RequestType>GetListItems</RequestType>
					<TableName>ExpenseTracking</TableName>
					<ListTitle>Expense Tracking</ListTitle>
					<SiteUrl><xsl:value-of select="$siteURL" /></SiteUrl>
				</OperationDefinition>
				<OperationDefinition>
					<RequestType>GetListItems</RequestType>
					<TableName>ExpenseTrackingCategories</TableName>
					<ListTitle>Expense Tracking Categories</ListTitle>
					<SiteUrl><xsl:value-of select="$siteURL" /></SiteUrl>
				</OperationDefinition>
				<OperationDefinition>
					<RequestType>GetListInfo</RequestType>
					<TableName>TasksMetadata</TableName>
					<ListTitle>Tasks</ListTitle>
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

