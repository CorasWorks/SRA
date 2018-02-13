<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:template match="/NewDataSet">
	<xsl:variable name="MultiDelimiter"><![CDATA[^\d+;#|;#\d+;#|;#]]></xsl:variable>	
	<xsl:variable name="formatDate" select="'[M01]-[D01]-[Y0001]'"/>
	<xsl:variable name="Resources">
			<xsl:for-each-group select="//Projects/*/*/*" group-by="tokenize(@ows_TeamMembers,$MultiDelimiter)">
				<xsl:for-each select="current-group()[not(string-length(current-grouping-key()) = 0)]">
					<xsl:variable name="thisKPI" select="@ows_ProjectStatusKPI"/>
					<xsl:variable name="thisKPIIcon" select="if(@ows_ProjectStatus = 'Active')then substring-before(//KPIs/*/*/*[@ows_ID = $thisKPI]/@ows_Image,',') else 0"/>
					<xsl:variable name="thisKPIIconTitle" select="if(@ows_ProjectStatus = 'Active')then //KPIs/*/*/*[@ows_ID = $thisKPI]/@ows_Title else 0"/>
					
				<Projects>
					<TeamMember><xsl:value-of select="current-grouping-key()"/></TeamMember>
					<TeamMemberRoles>
						<xsl:choose>
							<xsl:when test="@ows_TeamMemberRoles">
								<xsl:for-each select="tokenize(@ows_TeamMemberRoles,';#')[substring-before(.,'##') = current-grouping-key()]">
									<xsl:if test="position() &gt; 1">
										<xsl:text>, </xsl:text> 
									</xsl:if>
									<xsl:value-of select="substring-after(.,'##')"/>							
								</xsl:for-each>
							</xsl:when>
							<xsl:otherwise>Team Leader</xsl:otherwise>
						</xsl:choose>
					</TeamMemberRoles>
					<RolesTest>
						<xsl:value-of select="@ows_TeamMemberRoles"/>
					</RolesTest>
					<ProjectID><xsl:value-of select="@ows_ID"/></ProjectID>
					<Project><xsl:value-of select="@ows_Title"/></Project>
					<Division><xsl:value-of select="@ows_Division"/></Division>
					<Region><xsl:value-of select="@ows_Region"/></Region>
					<Location><xsl:value-of select="@ows_Location"/></Location>
					<ProjectStatus>
						<xsl:value-of select="@ows_ProjectStatus"/>
						<xsl:if test="xs:string($thisKPIIcon) != '0'">
							<xsl:text><![CDATA[<img src="]]></xsl:text>
							<xsl:value-of select="$thisKPIIcon"/>
							<xsl:text><![CDATA[" width="12" height="12" style="padding-left:10px;"/>]]></xsl:text>
						</xsl:if>							
					</ProjectStatus>
					<ProjectStatusKPI>
						<xsl:value-of select="if (xs:string($thisKPIIconTitle) != '0') then $thisKPIIconTitle else ''"/>
						
					</ProjectStatusKPI>
					<Methodology><xsl:value-of select="@ows_Methodology"/></Methodology>
					<Category><xsl:value-of select="@ows_Category"/></Category>
					<TeamLaunchTarget>
						<xsl:choose>
							<xsl:when test="@ows_TeamLaunchTarget"><xsl:value-of select="format-date(xs:date(substring-before(@ows_TeamLaunchTarget,' ')), $formatDate)"/></xsl:when>
							<xsl:otherwise></xsl:otherwise>
						</xsl:choose>
					</TeamLaunchTarget>
					<TeamLaunchActual>
						<xsl:choose>
							<xsl:when test="@ows_TeamLaunchActual"><xsl:value-of select="format-date(xs:date(substring-before(@ows_TeamLaunchActual,' ')), $formatDate)"/></xsl:when>
							<xsl:otherwise></xsl:otherwise>
						</xsl:choose>
					</TeamLaunchActual>
					<FinalMilestoneTarget>
						<xsl:choose>
							<xsl:when test="@ows_FinalMilestoneTarget"><xsl:value-of select="format-date(xs:date(substring-before(@ows_FinalMilestoneTarget,' ')), $formatDate)"/></xsl:when>
							<xsl:otherwise></xsl:otherwise>
						</xsl:choose>
					</FinalMilestoneTarget>
					<FinalMilestoneActual>
						<xsl:choose>
							<xsl:when test="@ows_FinalMilestoneActual"><xsl:value-of select="format-date(xs:date(substring-before(@ows_FinalMilestoneActual,' ')), $formatDate)"/></xsl:when>
							<xsl:otherwise></xsl:otherwise>
						</xsl:choose>
					</FinalMilestoneActual>
				</Projects>
				</xsl:for-each>
			</xsl:for-each-group>
	</xsl:variable>
		<NewDataSet>
			<xsl:copy-of select="$Resources"/>
		</NewDataSet>
	</xsl:template>
</xsl:stylesheet>
