<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:variable name="MultiDelimiter"><![CDATA[^\d+;#|;#\d+;#|;#]]></xsl:variable>
	<xsl:template match="/NewDataSet">
		<Tools>
			<xsl:for-each select="*/*/*/*">
				<xsl:sort select="lower-case(@ows_Title)"/>
				<Tool>
					<xsl:apply-templates select="@ows_ID"/>
					<xsl:apply-templates select="@ows_Title"/>
					<xsl:apply-templates select="@ows_Purpose"/>
					<xsl:apply-templates select="@ows_HelpMessage"/>
					<xsl:apply-templates select="@ows_TemplateLocation"/>
					<xsl:apply-templates select="@ows_HelpFileLocation"/>
					<xsl:apply-templates select="@ows_Active"/>
					<Stages><xsl:value-of select="translate(@ows_Stages,';#',' ')"/></Stages>
				</Tool>
			</xsl:for-each>
		</Tools>
	</xsl:template>
	<xsl:template match="z:row/@*">
		<xsl:element name="{substring-after(name(), 'ows_')}">
		<xsl:choose>
			<xsl:when test="contains(.,';#')">
				<xsl:variable name="ValueToSplit" select="tokenize(.,$MultiDelimiter)"/>
				<xsl:for-each select="$ValueToSplit[not(string-length(.) = 0)]">
					<xsl:value-of select="."/>
					<xsl:if test="not(position() = last())">
						<xsl:text>, </xsl:text>
					</xsl:if>
				</xsl:for-each>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="."/>
			</xsl:otherwise>
		</xsl:choose>
		</xsl:element>
	</xsl:template>
</xsl:stylesheet>
