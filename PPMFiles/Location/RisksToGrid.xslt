<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:variable name="MultiDelimiter"><![CDATA[^\d+;#|;#\d+;#|;#]]></xsl:variable>
	<xsl:template match="/">
		<NewDataSet>
			<xsl:for-each select="NewDataSet/Risks/NewDataSet/Risks">
				<xsl:variable name="SiteUrl" select="@SiteUrl"/>
				<xsl:variable name="SiteTitle" select="@SiteTitle"/>
				<xsl:if test="@ListGuid!=''" >				
				<xsl:for-each select="cw:listitems/rs:data/z:row">
					<Item>
						<Title><xsl:value-of select="@ows_Title"/></Title>
						<Probability>
							<xsl:choose>
								<xsl:when test="@ows_Probability">
										<xsl:value-of select="format-number(@ows_Probability, '#')"/>
								</xsl:when>			
								<xsl:otherwise>
									0
								</xsl:otherwise>
							</xsl:choose>
						</Probability>
						<site>&lt;a href="<xsl:value-of select="$SiteUrl"/>"&gt;<xsl:value-of select="$SiteTitle"/>&lt;/a&gt;</site>
						<Impact>
							<xsl:choose>
								<xsl:when test="@ows_Impact">
										<xsl:value-of select="format-number(@ows_Impact, '#')"/>
								</xsl:when>			
								<xsl:otherwise>
									0
								</xsl:otherwise>
							</xsl:choose>
						</Impact>
						<Modified><xsl:value-of select="@ows_Created"/></Modified>
						<AssignedTo>
							<xsl:choose>
								<xsl:when test="contains(@ows_AssignedTo,';#')">
									<xsl:variable name="ValueToSplit" select="tokenize(@ows_AssignedTo,$MultiDelimiter)"/>
									<xsl:for-each select="$ValueToSplit[not(string-length(.) = 0)]">
										<xsl:value-of select="."/>
										<xsl:if test="not(position() = last())">
											<xsl:text>, </xsl:text>
										</xsl:if>
									</xsl:for-each>
								</xsl:when>		
								<xsl:otherwise>
									<xsl:value-of select="@ows_AssignedTo"/>
								</xsl:otherwise>
							</xsl:choose>
						</AssignedTo>
						<Editor><xsl:value-of select="substring-after(@ows_Editor, ';#')"/></Editor>
						<CreatedBy><xsl:value-of select="substring-after(@ows_Author, ';#')"/></CreatedBy>
						<Created><xsl:value-of select="@ows_Created"/></Created>
						<Status><xsl:value-of select="@ows_Status"/></Status>
						<RiskSource><xsl:value-of select="@ows_Risk_x0020_Source"/></RiskSource>
						<Description><xsl:value-of select="@ows_Comment"/></Description>
					</Item>
				</xsl:for-each>	
				</xsl:if>
				
			</xsl:for-each>
		</NewDataSet>
	</xsl:template>
</xsl:stylesheet>
