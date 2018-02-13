<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:variable name="MultiDelimiter"><![CDATA[^\d+;#|;#\d+;#|;#]]></xsl:variable>
	<xsl:template match="/">
		<NewDataSet>
			<xsl:for-each select="//Tasks/cw:listitems/rs:data/z:row">
			<Item>
				<Title><xsl:value-of select="@ows_Title"/></Title>
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
				<StartDate><xsl:value-of select="@ows_StartDate"/></StartDate>
				<ActualStart><xsl:value-of select="@ows_ActualStart"/></ActualStart>
				<DueDate><xsl:value-of select="@ows_DueDate"/></DueDate>
				<ActualFinish><xsl:value-of select="@ows_ActualFinish"/></ActualFinish>
				<Work>
					<xsl:choose>
						<xsl:when test="@ows_Work">
								<xsl:value-of select="format-number(@ows_Work, '#')"/>
						</xsl:when>			
						<xsl:otherwise>
							0
						</xsl:otherwise>
					</xsl:choose>
				</Work>
				<ActualWork>
					<xsl:choose>
						<xsl:when test="@ows_ActualWork">
								<xsl:value-of select="format-number(@ows_ActualWork, '#')"/>
						</xsl:when>			
						<xsl:otherwise>
							0
						</xsl:otherwise>
					</xsl:choose>				
				</ActualWork>
				<Priority><xsl:value-of select="@ows_Priority"/></Priority>
				<Status><xsl:value-of select="@ows_Status"/></Status>
			</Item>	  
			</xsl:for-each>
		</NewDataSet>
	</xsl:template>
</xsl:stylesheet>
