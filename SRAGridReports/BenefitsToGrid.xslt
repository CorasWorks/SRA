<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:variable name="formatDate" select="'[MNn]-[Y0001]'"/>	
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
							<xsl:for-each-group select="//z:row" group-by="concat(@ows_Title,@ows_Division,@ows_Region,@ows_Location,@ows_FinancialCategory,@ows_FinancialSubcategory)">
								<Data>
									<GroupKey><xsl:value-of select="current-grouping-key()"/></GroupKey>
									<Title><xsl:value-of select="@ows_Title"/></Title>
									<Division><xsl:value-of select="@ows_Division"/></Division>
									<Region><xsl:value-of select="@ows_Region"/></Region>
									<Location><xsl:value-of select="@ows_Location"/></Location>
									<FinancialCategory><xsl:value-of select="@ows_FinancialCategory"/></FinancialCategory>
									<FinancialSubcategory><xsl:value-of select="@ows_FinancialSubcategory"/></FinancialSubcategory>		
									<Actual>
										<xsl:choose>
											<xsl:when test="count(current-group()/@ows_Actual) &gt; 0">
												<xsl:value-of select="format-number(sum(current-group()/@ows_Actual), '#')"/>
											</xsl:when>
											<xsl:otherwise></xsl:otherwise>
										</xsl:choose>
									</Actual>
									<Target>
										<xsl:choose>
											<xsl:when test="count(current-group()/@ows_Target) &gt; 0">
												<xsl:value-of select="format-number(sum(current-group()/@ows_Target), '#')"/>
											</xsl:when>
											<xsl:otherwise></xsl:otherwise>
										</xsl:choose>							
									</Target>
								</Data>			
							</xsl:for-each-group>
						</xsl:when>
						<xsl:otherwise>
								<Data>
									<GroupKey></GroupKey>
									<Title></Title>
									<Division></Division>
									<Region></Region>
									<Location></Location>
									<FinancialCategory></FinancialCategory>
									<FinancialSubcategory></FinancialSubcategory>		
									<Actual></Actual>
									<Target></Target>
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
									<Division><xsl:value-of select="@ows_Division"/></Division>
									<Region><xsl:value-of select="@ows_Region"/></Region>
									<Location><xsl:value-of select="@ows_Location"/></Location>
									<FinancialCategory><xsl:value-of select="@ows_FinancialCategory"/></FinancialCategory>
									<FinancialSubcategory><xsl:value-of select="@ows_FinancialSubcategory"/></FinancialSubcategory>	
									<Actual>
										<xsl:choose>
											<xsl:when test="@ows_Actual">
												<xsl:value-of select="format-number(@ows_Actual, '#')"/>
											</xsl:when>
											<xsl:otherwise></xsl:otherwise>
										</xsl:choose>
									</Actual>
									<Target>
										<xsl:choose>
											<xsl:when test="@ows_Target">
												<xsl:value-of select="format-number(@ows_Target, '#')"/>
											</xsl:when>
											<xsl:otherwise></xsl:otherwise>
										</xsl:choose>
									</Target>
								</Data>
							</xsl:for-each>
						</xsl:when>
						<xsl:otherwise>
								<Data>
									<Date></Date>
									<Month></Month>
									<Title></Title>
									<Division></Division>
									<Region></Region>
									<Location></Location>
									<FinancialCategory></FinancialCategory>
									<FinancialSubcategory></FinancialSubcategory>		
									<Actual></Actual>
									<Target></Target>
								</Data>									
						</xsl:otherwise>
					</xsl:choose>					
				</xsl:otherwise>
			</xsl:choose>
		</NewDataSet>
	</xsl:template>
</xsl:stylesheet>
