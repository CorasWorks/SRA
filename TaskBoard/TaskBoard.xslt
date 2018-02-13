<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="cw rs z">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="/">
		<NewDataSet>
			<Tasks>
				<xsl:for-each select="//NewDataSet/Tasks/cw:listitems/rs:data/z:row">
					<xsl:copy-of select="." />
				</xsl:for-each>
			</Tasks>
			<xsl:copy-of select="//NewDataSet/TasksMetadata" />
		</NewDataSet>
	</xsl:template>
</xsl:stylesheet>

