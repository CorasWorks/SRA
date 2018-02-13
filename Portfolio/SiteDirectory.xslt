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
				<xsl:for-each select="//NewDataSet/SiteDirectory/cw:listitems/rs:data/z:row">
					<xsl:call-template name="parseURLs">
						<xsl:with-param name="projectsInPortfolio" select="@ows_Projects_x0020_In_x0020_Portfoli" />
					</xsl:call-template>
				</xsl:for-each>
		</NewDataSet>
	</xsl:template>
	<xsl:template name="parseURLs">
		<xsl:param name="projectsInPortfolio" />
		<xsl:choose>
			<xsl:when test="$projectsInPortfolio = ''">
			</xsl:when>
			<xsl:otherwise>
				<xsl:choose>
					<xsl:when test="contains(substring-after($projectsInPortfolio, ';#'), ';#')">
						<SiteUrl>
							<xsl:value-of select="substring-before(substring-after($projectsInPortfolio, ';#'), ';#')" />
						</SiteUrl>
						<xsl:call-template name="parseURLs">
							<xsl:with-param name="projectsInPortfolio">
								<xsl:value-of select="substring-after(substring-after($projectsInPortfolio, ';#'), ';#')" /> 
							</xsl:with-param>
						</xsl:call-template>
					</xsl:when>
					<xsl:otherwise>
						<SiteUrl>
							<xsl:value-of select="substring-after($projectsInPortfolio, ';#')" />
						</SiteUrl>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>

