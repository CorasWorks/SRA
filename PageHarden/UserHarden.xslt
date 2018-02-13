<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="xml" omit-xml-declaration="yes"/>
	<xsl:template match="/">
		<NewDataSet>
			<xsl:choose>
				<xsl:when test="count(//GetSiteUsers/SPUser/Groups/Xml/Groups/Group[@Name='Corning SRA Owners']) &gt; 0">
					<Admin>true</Admin>
				</xsl:when>
				<xsl:otherwise>
					<Admin>false</Admin>
				</xsl:otherwise>
			</xsl:choose>
		</NewDataSet>
	</xsl:template>
</xsl:stylesheet>

