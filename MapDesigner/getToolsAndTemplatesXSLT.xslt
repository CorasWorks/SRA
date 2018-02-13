<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:variable name="MultiDelimiter"><![CDATA[^\d+;#|;#\d+;#|;#]]></xsl:variable>
	<xsl:template match="/NewDataSet">
		<Templates>
			<xsl:for-each select="*/*/*/*">
				<xsl:sort select="lower-case(@ows_Title)" />
				<Template>
					<Url>
						[SRA Root]<xsl:value-of select="substring-after(@ows_FileRef,'sites/sra')"/>
					</Url>
					<Filename>
						<xsl:value-of select="substring-after(@ows_FileLeafRef,';#')"/>
					</Filename>
					<xsl:choose>
						<xsl:when test="@ows_Title">
							<xsl:apply-templates select="@ows_Title"/>
						</xsl:when>
						<xsl:otherwise>
							<Title>
								<xsl:value-of select="substring-after(@ows_FileLeafRef,';#')"/>
							</Title>
						</xsl:otherwise>
					</xsl:choose>
					<xsl:apply-templates select="@ows_Methodology"/>
					<xsl:apply-templates select="@ows_Language"/>
					<xsl:apply-templates select="@ows_DocIcon"/>
					<xsl:apply-templates select="@ows_ID"/>
				</Template>
			</xsl:for-each>
		</Templates>
	</xsl:template>
	<xsl:template match="z:row/@*">
		<xsl:element name="{substring-after(name(), 'ows_')}">			
			<xsl:value-of select="."/>
		</xsl:element>
	</xsl:template>
</xsl:stylesheet>


