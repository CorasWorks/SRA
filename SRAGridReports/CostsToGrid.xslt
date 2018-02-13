<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:variable name="MultiDelimiter"><![CDATA[^\d+;#|;#\d+;#|;#]]></xsl:variable>
	<xsl:variable name="Yearly">%Yearly%</xsl:variable>
	<xsl:variable name="GroupByYear">
		<xsl:value-of select="if(lower-case($Yearly) = 'yes' or lower-case($Yearly) = 'true' or $Yearly = '1') then 1 else 0"/>
	</xsl:variable>
	<xsl:template match="/">
		<NewDataSet>
			<xsl:choose>
				<xsl:when test="$GroupByYear = 1">
				<xsl:choose>
					<xsl:when test="count(//z:row) &gt; 0">			
						<xsl:for-each-group select="//z:row" group-by="@ows_Title">
							<Data>
								<Title><xsl:value-of select="@ows_Title"/></Title>	
								<ExpenseActual>
									<xsl:choose>
										<xsl:when test="count(current-group()/@ows_ExpenseActual) &gt; 0">
											<xsl:value-of select="format-number(sum(current-group()/@ows_ExpenseActual), '#')"/>
										</xsl:when>
										<xsl:otherwise></xsl:otherwise>
									</xsl:choose>									
								</ExpenseActual>
								<ExpenseTarget>
									<xsl:choose>
										<xsl:when test="count(current-group()/@ows_ExpenseTarget) &gt; 0">
											<xsl:value-of select="format-number(sum(current-group()/@ows_ExpenseTarget), '#')"/>
										</xsl:when>
										<xsl:otherwise></xsl:otherwise>
									</xsl:choose>
								</ExpenseTarget>
								<CapitalActual>
									<xsl:choose>
										<xsl:when test="count(current-group()/@ows_CapitalActual) &gt; 0">
											<xsl:value-of select="format-number(sum(current-group()/@ows_CapitalActual), '#')"/>
										</xsl:when>
										<xsl:otherwise></xsl:otherwise>
									</xsl:choose>
								</CapitalActual>
								<CapitalTarget>
									<xsl:choose>
										<xsl:when test="count(current-group()/@ows_CapitalTarget) &gt; 0">
											<xsl:value-of select="format-number(sum(current-group()/@ows_CapitalTarget), '#')"/>
										</xsl:when>
										<xsl:otherwise></xsl:otherwise>
									</xsl:choose>
								</CapitalTarget>
							</Data>			
						</xsl:for-each-group>
					</xsl:when>
					<xsl:otherwise>
							<Data>
								<Title></Title>	
								<ExpenseActual></ExpenseActual>
								<ExpenseTarget></ExpenseTarget>
								<CapitalActual></CapitalActual>
								<CapitalTarget></CapitalTarget>
							</Data>									
					</xsl:otherwise>
				</xsl:choose>				
				</xsl:when>
				<xsl:otherwise>
				<xsl:choose>
					<xsl:when test="count(//z:row) &gt; 0">						
					<xsl:for-each select="//z:row">
						<Data>
							<Title><xsl:value-of select="@ows_Title"/></Title>
							<Month><xsl:value-of select="@ows_Month"/></Month>
							<Date><xsl:value-of select="xs:date(concat(@ows_Title,'-',format-number(@ows_Month,'00'),'-01'))"/></Date>							
							<ExpenseActual>
								<xsl:choose>
									<xsl:when test="@ows_ExpenseActual">
										<xsl:value-of select="format-number(@ows_ExpenseActual, '#')"/>
									</xsl:when>
									<xsl:otherwise></xsl:otherwise>
								</xsl:choose>
							</ExpenseActual>
							<ExpenseTarget>
								<xsl:choose>
									<xsl:when test="@ows_ExpenseTarget">
										<xsl:value-of select="format-number(@ows_ExpenseTarget, '#')"/>
									</xsl:when>
									<xsl:otherwise></xsl:otherwise>
								</xsl:choose>
							</ExpenseTarget>
							<CapitalActual>
								<xsl:choose>
									<xsl:when test="@ows_CapitalActual">
										<xsl:value-of select="format-number(@ows_CapitalActual, '#')"/>
									</xsl:when>
									<xsl:otherwise></xsl:otherwise>
								</xsl:choose>
							</CapitalActual>
							<CapitalTarget>
								<xsl:choose>
									<xsl:when test="@ows_CapitalTarget">
										<xsl:value-of select="format-number(@ows_CapitalTarget, '#')"/>
									</xsl:when>
									<xsl:otherwise></xsl:otherwise>
								</xsl:choose>
							</CapitalTarget>
						</Data>
					</xsl:for-each>
					</xsl:when>
					<xsl:otherwise>
							<Data>
								<Title></Title>
								<Month></Month>
								<Date></Date>											
								<ExpenseActual></ExpenseActual>
								<ExpenseTarget></ExpenseTarget>
								<CapitalActual></CapitalActual>
								<CapitalTarget></CapitalTarget>
							</Data>									
					</xsl:otherwise>
				</xsl:choose>						
				</xsl:otherwise>
			</xsl:choose>
		</NewDataSet>
	</xsl:template>
</xsl:stylesheet>
