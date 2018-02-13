<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	>
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:variable name="overdueSeverity"><xsl:text>%OverdueSeverity%</xsl:text></xsl:variable>
	<xsl:variable name="overdueType"><xsl:text>%OverdueType%</xsl:text></xsl:variable>
	<xsl:variable name="query"><xsl:text>%Query%</xsl:text></xsl:variable>
	<xsl:template match="/">
		<NewDataSet>
			<xsl:for-each select="*/*">
				<xsl:if test="name(.) = 'Tasks'">
					<Overdue>
						<xsl:element name="Query"><xsl:copy-of select="$query" /></xsl:element>
						<xsl:element name="OverdueTypeAndSeverity">
							<xsl:value-of select="$overdueType" />
							<xsl:text>{}</xsl:text>
							<xsl:value-of select="$overdueSeverity" />
						</xsl:element> 
						<xsl:copy-of select="./*" />
					</Overdue>
				</xsl:if>
			</xsl:for-each>
		</NewDataSet>
	</xsl:template>
</xsl:stylesheet>