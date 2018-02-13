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
		<NewDataSet>
			<xsl:for-each select="//NewDataSet/Meetings">
				<xsl:variable name="projectSiteURL" select="@SiteUrl" />
				<xsl:variable name="projectSiteTitle" select="//NewDataSet/*/cw:listitems/rs:data/z:row[@ows_URL = $projectSiteURL]/@ows_Title" />
				<xsl:for-each select="cw:listitems/rs:data/z:row">
					<xsl:element name="Meetings">
						<ProjectSiteURL><xsl:value-of select="$projectSiteURL" /></ProjectSiteURL>
						<ProjectSiteTitle><xsl:value-of select="$projectSiteTitle" /></ProjectSiteTitle>
						<xsl:for-each select="@*">
							<xsl:element name="{name()}">
								<xsl:value-of select="."/>
							</xsl:element>
						</xsl:for-each>
						<xsl:apply-templates select="*|text()"/>
					</xsl:element>
				</xsl:for-each>
			</xsl:for-each>
		</NewDataSet>
	</xsl:template>
</xsl:stylesheet>