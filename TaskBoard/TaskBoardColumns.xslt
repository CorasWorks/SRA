<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" 
	xmlns:soap="http://schemas.microsoft.com/sharepoint/soap/"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
>
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="/">
		<NewDataSet>
			<Status>
				<xsl:copy-of select="//NewDataSet/GetListInfo/soap:List/soap:Fields/soap:Field[@Name = 'Status']" />			
			</Status>
			<Priority>
				<xsl:copy-of select="//NewDataSet/GetListInfo/soap:List/soap:Fields/soap:Field[@Name = 'Priority']" />						
			</Priority>
		</NewDataSet>
	</xsl:template>
</xsl:stylesheet>

