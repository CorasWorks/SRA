<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:template match="/">
	<xsl:variable name="TodaysDate">%TodayRfc%</xsl:variable>
	<xsl:for-each select="//Projects/cw:listitems/rs:data/z:row">
		<Configuration>
			<Slides>
				<Slide number="0">
					<Replace variable="%ProjectTitle%">
						<xsl:value-of select="@ows_Title"/>
					</Replace>
					<Replace variable="%ReportDate%">
						<xsl:value-of select="format-date(xs:date(substring-before($TodaysDate,'T')), '[FNn], [MNn] [D], [Y]', 'en', (), ())"/>
					</Replace>
					<Replace variable="%Division%">
						<xsl:value-of select="@ows_Division"/>
					</Replace>
					<Replace variable="%Region%">
						<xsl:value-of select="@ows_Region"/>
					</Replace>
					<Replace variable="%Location%">
						<xsl:value-of select="@ows_Location"/>
					</Replace>
					<Replace variable="%ProjectSecurity%">
						<xsl:value-of select="@ows_ProjectSecurity"/>
					</Replace>
					<Replace variable="%TeamLeaders%">
						<xsl:for-each select="tokenize(@ows_TeamLeader, ';#')">
							<xsl:if test="(position() mod 2) = 0">
							<xsl:value-of select="current()"/><xsl:text>, </xsl:text>
							</xsl:if>
						</xsl:for-each>
					</Replace>
					<Replace variable="%ProblemStatement%">
						<xsl:value-of select="@ows_CharterProblemStatement"/>
					</Replace>
					<Replace variable="%GoalStatement%">
						<xsl:value-of select="@ows_CharterGoalStatement"/>
					</Replace>
					<Replace variable="%BusinessCase%">
						<xsl:value-of select="@ows_CharterBusinessCase"/>
					</Replace>
					<Replace variable="%ScopeIncludes%">
						<xsl:value-of select="@ows_CharterScopeIncludes"/>
					</Replace>
					<Replace variable="%ScopeExcludes%">
						<xsl:value-of select="@ows_CharterScopeExcludes"/>
					</Replace>
					<Replace variable="%ProjectCostsET%">
					      <xsl:choose>
						      <xsl:when test="@ows_ResourcesExpenseTargeted">
						      	<xsl:value-of select="format-number(@ows_ResourcesExpenseTargeted, '$###,###')"/>
						      </xsl:when>
						      <xsl:otherwise>$0</xsl:otherwise>
					      </xsl:choose>
					</Replace>
					<Replace variable="%ProjectCostsCT%">
					      <xsl:choose>
						      <xsl:when test="@ows_ResourcesCapitalTargeted">
						      	<xsl:value-of select="format-number(@ows_ResourcesCapitalTargeted, '$###,###')"/>
						      </xsl:when>
						      <xsl:otherwise>$0</xsl:otherwise>
					      </xsl:choose>
					</Replace>
					<Replace variable="%ProjectCostsEA%">
					      <xsl:choose>
						      <xsl:when test="@ows_ResourcesExpenseActual">
						      	<xsl:value-of select="format-number(@ows_ResourcesExpenseActual, '$###,###')"/>
						      </xsl:when>
						      <xsl:otherwise>$0</xsl:otherwise>
					      </xsl:choose>
					</Replace>
					<Replace variable="%ProjectCostsCA%">
					      <xsl:choose>
						      <xsl:when test="@ows_ResourcesCapitalActual">
						      	<xsl:value-of select="format-number(@ows_ResourcesCapitalActual, '$###,###')"/>
						      </xsl:when>
						      <xsl:otherwise>$0</xsl:otherwise>
					      </xsl:choose>
					</Replace>
					<Replace variable="%ProjectBenefitsT%">
					      <xsl:choose>
						      <xsl:when test="@ows_BenefitsTarget">
						      	<xsl:value-of select="format-number(@ows_BenefitsTarget, '$###,###')"/>
						      </xsl:when>
						      <xsl:otherwise>$0</xsl:otherwise>
					      </xsl:choose>
					</Replace>
					<Replace variable="%ProjectBenefitsA%">
					      <xsl:choose>
						      <xsl:when test="@ows_BenefitsActual">
						      	<xsl:value-of select="format-number(@ows_BenefitsActual, '$###,###')"/>
						      </xsl:when>
						      <xsl:otherwise>$0</xsl:otherwise>
					      </xsl:choose>
					</Replace>					
				</Slide>
				<Slide number="1">
					<Replace variable="%Methodology%">
						<xsl:value-of select="@ows_Methodology"/>
					</Replace>				
					<Text top="40" left="20" width="1" height="1" borderwidth="0" bordercolor="White" firstrowbgcolor="White" altrowbgcolor="White" textheight="12" rowheight="10">	
						<xsl:attribute name="url">
							<xsl:text>%ISiteURL%/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=BatchRequest</xsl:text>
							<xsl:text>&amp;ConfigFileLocation=[SRA Root]/Resources/PPTReports/ProjectCharterV1-Users.xml</xsl:text>
							<xsl:text>&amp;XsltLocation=[SRA Root]/Resources/PPTReports/ProjectCharterV1-Users.xslt</xsl:text>
							<xsl:text>&amp;OutputType=html&amp;ProjectURL=%ProjectURL%</xsl:text>
						</xsl:attribute>
					</Text>
					<!--
					<Text top="220" left="340" width="1" height="1" borderwidth="0" bordercolor="White" firstrowbgcolor="White" altrowbgcolor="White" textheight="12" rowheight="10">	
						<xsl:attribute name="url">
							<xsl:text>%ISiteURL%/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=BatchRequest</xsl:text>
							<xsl:text>&amp;ConfigFileLocation=[SRA Root]/Resources/PPTReports/ProjectCharterV1-Approval.xml</xsl:text>
							<xsl:text>&amp;XsltLocation=[SRA Root]/Resources/PPTReports/ProjectCharterV1-Approval.xslt</xsl:text>
							<xsl:text>&amp;OutputType=html&amp;ProjectURL=%ProjectURL%</xsl:text>
						</xsl:attribute>
					</Text>	
					-->				
					
					<Text top="40" left="500" width="1" height="1" borderwidth="0" bordercolor="White" firstrowbgcolor="White" altrowbgcolor="White" textheight="12" rowheight="10">	
						<xsl:attribute name="url">
							<xsl:text>%ISiteURL%/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=BatchRequest</xsl:text>
							<xsl:text>&amp;ConfigFileLocation=[SRA Root]/Resources/PPTReports/ProjectCharterV1-Milestones.xml</xsl:text>
							<xsl:text>&amp;XsltLocation=[SRA Root]/Resources/PPTReports/ProjectCharterV1-Milestones.xslt</xsl:text>
							<xsl:text>&amp;OutputType=html&amp;ProjectURL=%ProjectURL%</xsl:text>
						</xsl:attribute>
					</Text>	
						
				</Slide>
			</Slides>
		</Configuration>
	</xsl:for-each>	
	</xsl:template>
	<xsl:template name="FormatNumber">
		<xsl:param name="ValueToFormat"/>
		<xsl:value-of select="format-number(xs:decimal($ValueToFormat), '#,##0.00')"/>
	</xsl:template>
	<xsl:template match="Uploads"/>
</xsl:stylesheet>