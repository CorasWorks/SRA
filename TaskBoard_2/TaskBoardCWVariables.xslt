<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:msxsl="urn:schemas-microsoft-com:xslt"
	exclude-result-prefixes="msxsl">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="/">
        <NewDataSet>
            <xsl:for-each select="NewDataSet/CheckVariables/CWVariable">
            	<xsl:variable name="NodeName">
            		<xsl:choose>
            			<xsl:when test="contains(@name,'[') or contains(@name,'%') and (contains(@name,'&lt;') = 0)">
            				<xsl:value-of select="substring(@name,2,string-length(@name)-2)"/>
            			</xsl:when>
            			<xsl:otherwise><xsl:value-of select="@name"/></xsl:otherwise>
            		</xsl:choose>
            	</xsl:variable>
            	<xsl:element name="{$NodeName}">
            		<xsl:value-of select="."/>
            	</xsl:element>
            </xsl:for-each>   
        </NewDataSet>
	</xsl:template>
</xsl:stylesheet>



