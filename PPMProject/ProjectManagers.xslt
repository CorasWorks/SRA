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
		<AuthorizedUsers>
			<Users>
				<xsl:call-template name="parsePMs">
					<xsl:with-param name="projectManagers" select="//NewDataSet/SiteDirectory/cw:listitems/rs:data/z:row/@ows_ProjectManagers" />
				</xsl:call-template>
			</Users>
			<Groups>
				<Group></Group>
			</Groups>
		</AuthorizedUsers>
	</xsl:template>
	<xsl:template name="parsePMs">
		<xsl:param name="projectManagers" />
		<xsl:choose>
			<xsl:when test="$projectManagers = ''">
			</xsl:when>
			<xsl:otherwise>
				<xsl:choose>
					<xsl:when test="contains(substring-after($projectManagers, ';#'), ';#')">
						<User>
							<xsl:value-of select="substring-before(substring-after($projectManagers, ';#'), ';#')" />
						</User>
						<xsl:call-template name="parsePMs">
							<xsl:with-param name="projectManagers">
								<xsl:value-of select="substring-after(substring-after($projectManagers, ';#'), ';#')" /> 
							</xsl:with-param>
						</xsl:call-template>
					</xsl:when>
					<xsl:otherwise>
						<User>
							<xsl:value-of select="substring-after($projectManagers, ';#')" />
						</User>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>

