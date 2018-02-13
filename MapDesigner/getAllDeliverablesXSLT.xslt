<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:variable name="MultiDelimiter"><![CDATA[^\d+;#|;#\d+;#|;#]]></xsl:variable>
	<xsl:template match="/NewDataSet">
		<Deliverables>
			<xsl:for-each select="*/*/*/*">
				<xsl:sort select="lower-case(@ows_Initial)" />
				<Deliverable>
					<xsl:apply-templates select="@ows_Title"/>
					<xsl:apply-templates select="@ows_Active"/>
					<xsl:apply-templates select="@ows_ID"/>
				</Deliverable>
			</xsl:for-each>
		</Deliverables>
	</xsl:template>
	<xsl:template match="z:row/@*">
		<xsl:element name="{substring-after(name(), 'ows_')}">
			<xsl:value-of select="."/>
		</xsl:element>
	</xsl:template>
</xsl:stylesheet>


