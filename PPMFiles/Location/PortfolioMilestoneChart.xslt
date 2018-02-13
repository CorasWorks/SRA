<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:msxsl="urn:schemas-microsoft-com:xslt"
	xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/"
	xmlns:rs="urn:schemas-microsoft-com:rowset"
	xmlns:z="#RowsetSchema"
	exclude-result-prefixes="msxsl cw rs z">
	<xsl:variable name="TodayRfc">%TodayRfc%</xsl:variable>
	<xsl:variable name="ProjectColors">
		<xsl:variable name="ProjectSiteCount" select="count(//NewDataSet/*/NewDataSet/Colors/cw:listitems/rs:data/z:row)"/>
		<xsl:for-each select="//NewDataSet/*/NewDataSet/Milestones">
			<xsl:variable name="CurrentPos" select="position()" />
			<Project SiteURL="{@SiteUrl}">
			<xsl:choose>
				<xsl:when test="$CurrentPos mod $ProjectSiteCount = 0 ">
					<xsl:attribute name="SiteColor"><xsl:value-of select="//NewDataSet/*/NewDataSet/Colors/cw:listitems/rs:data/z:row[$ProjectSiteCount]/@ows_Code" /></xsl:attribute>
					<xsl:attribute name="FontColor"><xsl:value-of select="//NewDataSet/*/NewDataSet/Colors/cw:listitems/rs:data/z:row[$ProjectSiteCount]/@ows_FontColorCode" /></xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="SiteColor"><xsl:value-of select="//NewDataSet/*/NewDataSet/Colors/cw:listitems/rs:data/z:row[$CurrentPos mod $ProjectSiteCount]/@ows_Code" /></xsl:attribute>
					<xsl:attribute name="FontColor"><xsl:value-of select="//NewDataSet/*/NewDataSet/Colors/cw:listitems/rs:data/z:row[$CurrentPos mod $ProjectSiteCount]/@ows_FontColorCode" /></xsl:attribute>					
				</xsl:otherwise>
			</xsl:choose>					
			</Project>							
		</xsl:for-each>
	</xsl:variable>	
	
	<!-- <xsl:variable name="todayDate" 
	select="concat(substring(date:date(), 1, 4), '.', substring(date:date(), 6, 2), '.', substring(date:date(), 9, 2))" /> -->
	<xsl:variable name="todays_date">
		<![CDATA[
			<marker type="Circle">
				<fill type="Solid" color="Red" /> 
				<border color="Black" /> 
			</marker>
		]]>
	</xsl:variable>
	<xsl:variable name="derived_date">
		<![CDATA[
			<marker type="Circle">
				<fill type="Solid" color="Yellow" /> 
				<border color="Black" /> 
			</marker>
		]]>
	</xsl:variable>
	<xsl:variable name="real_date">
		<![CDATA[
			<marker type="Arrow">
				<fill type="Solid" color="Green" /> 
				<border color="Black" /> 
			</marker>
		]]>
	</xsl:variable>
	<xsl:template match="/">
		<xsl:choose>
			<xsl:when test="sum(//NewDataSet/*/NewDataSet/Projects/cw:listitems/rs:data/@ItemCount) = 0">
				<anygantt>
					<settings>
						<title align="Center" angle="0" position="Top">
							<text>No data to display. (No projects in Portfolio or no milestones in any project.  Be sure your projects have a selected methodology and associated milestones.) </text>
							<font_style><font size="12" /></font_style>
						</title>
						<animation enabled="True" />
						<context_menu about_anychart="false" />
						<background enabled="false" />
					</settings>
					<project_chart>
						<tasks>
							<task id="1" actual_start="2001-01-01" name="No milestones entered" parent="" />
						</tasks>
					</project_chart>
				</anygantt>
			</xsl:when>
			<xsl:otherwise>
				<anygantt>
					<settings>
						<animation enabled="True"/>
						<context_menu about_anychart="false"/>
						<background enabled="false"/>
						<navigation enabled="true" position="top">
							<buttons>
							</buttons>
						</navigation>
					</settings>
					<styles>
						<defaults>
							<task>
								<task_style>
									<actual>
										<bar_style>
								            <start>
								              <marker type="Arrow">
								                <fill type="Solid" color="White" />
								                <border color="Black" />
								              </marker>
								            </start>
								            <end>
								              <marker type="Arrow">
								                <fill type="Solid" color="White" />
								                <border color="Black" />
								              </marker>
								            </end>									
											<labels>
												<label anchor="Left" valign="Center" halign="Near">
													<text>{%Complete}%</text>
													<font face="Verdana" size="10" bold="true" color="Black">
													</font>
												</label>
											</labels>
										</bar_style>
									</actual>
									<baseline>
										<bar_style>
											<middle shape="Full">
												<fill enabled="true" type="Solid" color="#EEEEEE" />
												<border enabled="true" color="#999999" />
											</middle>
								            <start>
								              <marker type="Arrow">
								                <fill type="Solid" color="Blue" />
								                <border color="Black" />
								              </marker>
								            </start>
								            <end>
								              <marker type="Arrow">
								                <fill type="Solid" color="Blue" />
								                <border color="Black" />
								              </marker>
								            </end>											
											<labels>
												<!--						<label anchor="Center" halign="Center" valign="Center" vpadding="">								<text>{%Name}</text>								<font face="Verdana" size="10" bold="true" color="#000066" >								</font>							</label>	-->
												<label anchor="Right" halign="Far" valign="Center" vpadding="-2">
													<text>Status: {%ReportedStatus}</text>
													<font face="Verdana" size="8" bold="true" color="#000066">
													</font>
												</label>
												<label anchor="TopRight" halign="Far" valign="Center" vpadding="-2">
													<text>Quality: {%ReportedQuality} </text>
													<font face="Verdana" size="8" bold="true" color="#000066">
													</font>
												</label>
												<label anchor="BottomRight" halign="Far" valign="Center" vpadding="0">
													<text>Health: {%ReportedHealth}</text>
													<font face="Verdana" size="8" bold="true" color="#000066">
													</font>
												</label>
											</labels>
										</bar_style>
									</baseline>
								</task_style>
							</task>
						</defaults>
					</styles>
					<timeline>
						<scale padding_unit="Percent" left="25" right="25" />
						<plot line_height="28" item_height="24" item_padding="2">
							<grid>
								<horizontal>
									<line enabled="true" color="DarkSeaGreen" thickness="1" />
									<even>
										<fill enabled="true" color="DarkSeaGreen" opacity="0.2" />
									</even>
									<odd>
										<fill enabled="true" color="White" opacity="1" />
									</odd>
								</horizontal>
							</grid>
						</plot>
					</timeline>
					<datagrid width="200">
						<columns>
							<column width="200" cell_align="LeftLevelPadding">
								<header>
									<text>Project Name</text>
								</header>
								<format>{%Name}</format>
							</column>
							<column width="90" cell_align="LeftLevelPadding">
								<header>
									<text>Project ID</text>
								</header>
								<format>{%projectid}</format>
							</column>							
							<column width="90" cell_align="Left">
								<header>
									<text>Team Launch Target Date</text>
								</header>
								<format>{%BaselineStart}{dateTimeFormat:%MM/%dd/%yyyy}</format>
							</column>
							<column width="90" cell_align="Left">
								<header>
									<text>Last Milestone Target Date</text>
								</header>
								<format>{%BaselineEnd}{dateTimeFormat:%MM/%dd/%yyyy}</format>
							</column>
							<column width="90" cell_align="Left">
								<header>
									<text>Team Launch Actual Start</text>
								</header>
								<format>{%ActualStart}{dateTimeFormat:%MM/%dd/%yyyy}</format>
							</column>
							<column width="90" cell_align="Left">
								<header>
									<text>Last Milestone Actual Finish</text>
								</header>
								<format>{%ActualEnd}{dateTimeFormat:%MM/%dd/%yyyy}</format>
							</column>
						</columns>
					</datagrid>
					<project_chart>
						<tasks>
						<!--
							<xsl:for-each select="//NewDataSet/*/NewDataSet/Milestones[cw:listitems/rs:data/z:row/@ows_TargetDate!= '']">
							-->
							<xsl:for-each select="//NewDataSet/*/NewDataSet/Milestones">
								<xsl:sort select="@SiteUrl" />
								<xsl:variable name="siteURL" select="@SiteUrl" />
								<xsl:variable name="siteTitle" select="@SiteTitle" />
								<xsl:variable name="Division" select="//NewDataSet/*/NewDataSet/Projects/cw:listitems/rs:data/z:row[@ows_URL=$siteURL]/@ows_Division" />
								<xsl:variable name="Region" select="//NewDataSet/*/NewDataSet/Projects/cw:listitems/rs:data/z:row[@ows_URL=$siteURL]/@ows_Region" />
								<xsl:variable name="Location" select="//NewDataSet/*/NewDataSet/Projects/cw:listitems/rs:data/z:row[@ows_URL=$siteURL]/@ows_Location" />
								<xsl:variable name="baselineStart">
									<xsl:choose>
										<xsl:when test="count(cw:listitems/rs:data/z:row[@ows_TargetDate!= '']) &gt; 0">
											<xsl:for-each select="cw:listitems/rs:data/z:row[@ows_TargetDate!= '']" >
												<xsl:sort select="@ows_TargetDate" data-type="text" order="ascending" />
												<xsl:if test="position() = 1">
														<xsl:value-of select="substring-before(@ows_TargetDate,'T')" />
												</xsl:if>
											</xsl:for-each>
										</xsl:when>
										<xsl:otherwise>
											<!--<xsl:text>0</xsl:text>-->
											<xsl:value-of select="substring-before($TodayRfc,'T')" />
										</xsl:otherwise>
									</xsl:choose>
								</xsl:variable>
								<xsl:variable name="baselineEnd">
									<xsl:choose>
										<xsl:when test="count(cw:listitems/rs:data/z:row[@ows_TargetDate!= '']) &gt; 0">
											<xsl:for-each select="cw:listitems/rs:data/z:row[@ows_TargetDate!= '']" >
												<xsl:sort select="@ows_TargetDate" data-type="text" order="descending" />
												<xsl:if test="position() = 1">
														<xsl:value-of select="substring-before(@ows_TargetDate,'T')" />
												</xsl:if>
											</xsl:for-each>
										</xsl:when>
										<xsl:otherwise>
											<!--<xsl:text>0</xsl:text>-->
											<xsl:value-of select="substring-before($TodayRfc,'T')" />
										</xsl:otherwise>
									</xsl:choose>
								</xsl:variable>
								<xsl:variable name="actualStart">
									<xsl:choose>
										<xsl:when test="count(cw:listitems/rs:data/z:row[@ows_ActualDate != '']) &gt; 0">
											<xsl:for-each select="cw:listitems/rs:data/z:row[@ows_ActualDate != '']" >
												<xsl:sort select="@ows_ActualDate" data-type="text" order="ascending" />
												<xsl:if test="position() = 1">
														<xsl:value-of select="substring-before(@ows_ActualDate,'T')" />
												</xsl:if>
											</xsl:for-each>
										</xsl:when>
										<xsl:otherwise>
											<xsl:value-of select="$baselineStart" />
										</xsl:otherwise>
									</xsl:choose>
								</xsl:variable>
								<xsl:variable name="actualEnd">
									<xsl:choose>
										<xsl:when test="count(cw:listitems/rs:data/z:row[@ows_ActualDate != '']) &gt; 0">
											<xsl:for-each select="cw:listitems/rs:data/z:row[@ows_ActualDate != '']" >
												<xsl:sort select="@ows_ActualDate" data-type="text" order="descending" />
												<xsl:if test="position() = 1">
														<xsl:value-of select="substring-before(@ows_ActualDate,'T')" />
												</xsl:if>
											</xsl:for-each>
										</xsl:when>
										<xsl:otherwise>
											<xsl:value-of select="$baselineEnd" />
										</xsl:otherwise>
									</xsl:choose>
								</xsl:variable>
								<xsl:variable name="progress" select="count(cw:listitems/rs:data/z:row[@ows_Complete = 1])" />
								<xsl:variable name="countMilestones" select="count(cw:listitems/rs:data/z:row)" />
								<xsl:variable name="progressPercent">
									<xsl:choose>
										<xsl:when test="$countMilestones != 0">
											<xsl:value-of select="format-number(($progress div $countMilestones)*100,'##')" />
										</xsl:when>
										<xsl:otherwise>0</xsl:otherwise>
									</xsl:choose>
								</xsl:variable>
								<xsl:variable name="lastMilestone" select="cw:listitems/rs:data/z:row[$countMilestones]/@ows_Title"/>
								
								<!--
										<xsl:variable name="thisSiteDirectoryTemp">
											<xsl:copy-of select="//NewDataSet/*/NewDataSet/SiteDirectory/cw:listitems/rs:data/z:row[@ows_URL = $siteURL]" />
										</xsl:variable>
										<xsl:variable name="thisSiteDirectory" select="$thisSiteDirectoryTemp" />
								-->		
								<task parent="">
									<xsl:attribute name="id">
										<xsl:value-of select="@SiteUrl" />
									</xsl:attribute>									
									<xsl:attribute name="name">
										<xsl:value-of select="$siteTitle" />
									</xsl:attribute>
									<xsl:attribute name="progress">
										<xsl:value-of select="$progressPercent" />
									</xsl:attribute>
									<xsl:attribute name="baseline_start">
										<xsl:value-of select="$baselineStart" />
									</xsl:attribute>
									<xsl:attribute name="baseline_end">
										<xsl:value-of select="$baselineEnd" />
									</xsl:attribute>
									<xsl:attribute name="actual_start">
										<xsl:value-of select="$actualStart" />
									</xsl:attribute>
									<xsl:attribute name="actual_end">
										<xsl:value-of select="if($actualEnd = $actualStart) then $baselineEnd else $actualEnd" />
									</xsl:attribute>
									<style>
										<row_datagrid>
											<cell>
												<fill type="Solid">
													<xsl:attribute name="color">
													<!--
														<xsl:variable name="colorName" select="substring-after($thisSiteDirectory/z:row/@ows_LegendColor, ';#')" />
														<xsl:value-of select="concat('#', substring-after($thisSiteDirectory/z:row/@ows_LegendColor_x003a_Code, ';#'))" />
													-->
														<xsl:value-of select="concat('#', $ProjectColors/Project[@SiteURL = $siteURL]/@SiteColor)" />
													</xsl:attribute>
												</fill>
												<font color="#{$ProjectColors/Project[@SiteURL = $siteURL]/@FontColor}"/>
											</cell>
										</row_datagrid>
										<actual>
										</actual>
										<baseline>
											<bar_style>
												<labels>
												</labels>
											</bar_style>
										</baseline>
										<tooltip>
											<font render_as_html="True" />
											<text>
 		Project: <xsl:value-of select="$siteTitle" /> (<xsl:value-of select="$siteURL" />)
 		Division: <xsl:value-of select="$Division" />
 		Region: <xsl:value-of select="$Region" />
 		Location: <xsl:value-of select="$Location" />
		Team Launch Target Date: <xsl:value-of select="$baselineStart" />
		Last Milestone (<xsl:value-of select="$lastMilestone"/>) Target Date: <xsl:value-of select="$baselineEnd" />
		Team Launch Actual Date: <xsl:value-of select="$actualStart" />
		Last Milestone (<xsl:value-of select="$lastMilestone"/>) Actual Date: <xsl:value-of select="$actualEnd" />
		Milestones Completed: <xsl:value-of select="$progress" /> of <xsl:value-of select="$countMilestones" /> 
<!--		
		KPIs: 		
		<xsl:if test="//NewDataSet/*/NewDataSet/KPILabels/cw:listitems/rs:data/z:row[@ows_Title = 'KPI1']/@ows_KPILabel != ''">
			<xsl:value-of select="//NewDataSet/*/NewDataSet/KPILabels/cw:listitems/rs:data/z:row[@ows_Title = 'KPI1']/@ows_KPILabel" /><xsl:text>: </xsl:text>
			<xsl:value-of select="$thisSiteDirectory/z:row/@ows__x004b_PI1" />
			<xsl:text>&#160;</xsl:text>
		</xsl:if>
		
		<xsl:if test="//NewDataSet/*/NewDataSet/KPILabels/cw:listitems/rs:data/z:row[@ows_Title = 'KPI2']/@ows_KPILabel != ''">
			<xsl:value-of select="//NewDataSet/*/NewDataSet/KPILabels/cw:listitems/rs:data/z:row[@ows_Title = 'KPI2']/@ows_KPILabel" /><xsl:text>: </xsl:text>
			<xsl:value-of select="$thisSiteDirectory/z:row/@ows__x004b_PI2" />
			<xsl:text>&#160;</xsl:text>
		</xsl:if>

		<xsl:if test="//NewDataSet/*/NewDataSet/KPILabels/cw:listitems/rs:data/z:row[@ows_Title = 'KPI3']/@ows_KPILabel != ''">
			<xsl:value-of select="//NewDataSet/*/NewDataSet/KPILabels/cw:listitems/rs:data/z:row[@ows_Title = 'KPI3']/@ows_KPILabel" /><xsl:text>: </xsl:text>
			<xsl:value-of select="$thisSiteDirectory/z:row/@ows__x004b_PI3" />
			<xsl:text>&#160;</xsl:text>
		</xsl:if>

		<xsl:if test="//NewDataSet/*/NewDataSet/KPILabels/cw:listitems/rs:data/z:row[@ows_Title = 'KPI4']/@ows_KPILabel != ''">
			<xsl:value-of select="//NewDataSet/*/NewDataSet/KPILabels/cw:listitems/rs:data/z:row[@ows_Title = 'KPI4']/@ows_KPILabel" /><xsl:text>: </xsl:text>
			<xsl:value-of select="$thisSiteDirectory/z:row/@ows__x004b_PI4" />
			<xsl:text>&#160;</xsl:text>
		</xsl:if>

		<xsl:if test="//NewDataSet/*/NewDataSet/KPILabels/cw:listitems/rs:data/z:row[@ows_Title = 'KPI5']/@ows_KPILabel != ''">
			<xsl:value-of select="//NewDataSet/*/NewDataSet/KPILabels/cw:listitems/rs:data/z:row[@ows_Title = 'KPI5']/@ows_KPILabel" /><xsl:text>: </xsl:text>
			<xsl:value-of select="$thisSiteDirectory/z:row/@ows__x004b_PI5" />
			<xsl:text>&#160;</xsl:text>
		</xsl:if>

		<xsl:if test="//NewDataSet/*/NewDataSet/KPILabels/cw:listitems/rs:data/z:row[@ows_Title = 'KPI6']/@ows_KPILabel != ''">
			<xsl:value-of select="//NewDataSet/*/NewDataSet/KPILabels/cw:listitems/rs:data/z:row[@ows_Title = 'KPI6']/@ows_KPILabel" /><xsl:text>: </xsl:text>
			<xsl:value-of select="$thisSiteDirectory/z:row/@ows__x004b_PI6" />
			<xsl:text>&#160;</xsl:text>
		</xsl:if>

		<xsl:if test="//NewDataSet/*/NewDataSet/KPILabels/cw:listitems/rs:data/z:row[@ows_Title = 'KPI7']/@ows_KPILabel != ''">
			<xsl:value-of select="//NewDataSet/*/NewDataSet/KPILabels/cw:listitems/rs:data/z:row[@ows_Title = 'KPI7']/@ows_KPILabel" /><xsl:text>: </xsl:text>
			<xsl:value-of select="$thisSiteDirectory/z:row/@ows__x004b_PI7" />
			<xsl:text>&#160;</xsl:text>
		</xsl:if>

		<xsl:if test="//NewDataSet/*/NewDataSet/KPILabels/cw:listitems/rs:data/z:row[@ows_Title = 'KPI8']/@ows_KPILabel != ''">
			<xsl:value-of select="//NewDataSet/*/NewDataSet/KPILabels/cw:listitems/rs:data/z:row[@ows_Title = 'KPI8']/@ows_KPILabel" /><xsl:text>: </xsl:text>
			<xsl:value-of select="$thisSiteDirectory/z:row/@ows__x004b_PI8" />
			<xsl:text>&#160;</xsl:text>
		</xsl:if>

		<xsl:if test="//NewDataSet/*/NewDataSet/KPILabels/cw:listitems/rs:data/z:row[@ows_Title = 'KPI9']/@ows_KPILabel != ''">
			<xsl:value-of select="//NewDataSet/*/NewDataSet/KPILabels/cw:listitems/rs:data/z:row[@ows_Title = 'KPI9']/@ows_KPILabel" /><xsl:text>: </xsl:text>
			<xsl:value-of select="$thisSiteDirectory/z:row/@ows__x004b_PI9" />
			<xsl:text>&#160;</xsl:text>
		</xsl:if>
-->		
							  				</text>
										</tooltip>
									</style>
									<attributes>
										<attribute name="SiteURL">
											<xsl:value-of select="$siteURL" />
										</attribute>
										<attribute name="Title">
											<xsl:value-of select="$siteTitle" />
										</attribute>
										<attribute name="projectid">
											<xsl:value-of select="//NewDataSet/*/NewDataSet/Projects/cw:listitems/rs:data/z:row[@ows_URL=$siteURL]/@ows_ID" />
										</attribute>
									</attributes>
									<actions>
										<!--
										<action type="NavigateToURL" event="Click" target="_top">
											<xsl:attribute name="url">
												<xsl:value-of select="$siteURL" />
											</xsl:attribute>
										</action>
										-->
										<action type="Call" function="LaunchTimeLinePage" event="Click">
											<arg><xsl:value-of select="$siteURL" /></arg>
										</action>

									</actions>
								</task>
							</xsl:for-each>
						</tasks>
					</project_chart>
				</anygantt>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>