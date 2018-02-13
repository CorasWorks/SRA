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
			<Tasks>
				<xsl:for-each select="//NewDataSet/Tasks/cw:listitems/rs:data/z:row">
					<xsl:copy-of select="." />
				</xsl:for-each>
			</Tasks>
			<ProjectDetails>
				<xsl:for-each select="//NewDataSet/ProjectDetails/cw:listitems/rs:data/z:row">
					<xsl:copy-of select="." />
				</xsl:for-each>
			</ProjectDetails>
			<xsl:copy-of select="//NewDataSet/TasksMetadata" />
		</NewDataSet>
	</xsl:template>
</xsl:stylesheet>

