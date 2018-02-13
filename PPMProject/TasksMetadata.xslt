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
		<xsl:for-each select="//NewDataSet/GetListInfo/cw:List/cw:Fields/cw:Field[@Name='Status']/cw:CHOICES/cw:CHOICE">
			<Status>
				<xsl:attribute name="value">
					<xsl:value-of select="." /> 
				</xsl:attribute>
			</Status>
		</xsl:for-each>
		</NewDataSet>
	</xsl:template>
</xsl:stylesheet>

