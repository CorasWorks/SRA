<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" xmlns:ms="urn:schemas-microsoft-com:xslt" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" exclude-result-prefixes="rs z cw ms">
	<xsl:key name="array" match="color" use="position()"/>
	<xsl:key name="assignedTo" match="//NewDataSet/*/NewDataSet/Tasks/cw:listitems/rs:data/z:row" use="@ows_AssignedTo" />
	<xsl:key name="resource" match="//NewDataSet/*/NewDataSet/Tasks/cw:listitems/rs:data/z:row" use="@ows_AssignedTo" />
	<xsl:key name="assignedToUnique" match="//NewDataSet/AssignedTo" use="@ID" />
	<!-- Create a variable with multiple assigned values parsed individual elements -->
	<xsl:variable name="assignedToNames">
		<NewDataSet>
			<xsl:for-each select="//NewDataSet/*/NewDataSet/Tasks/cw:listitems/rs:data/z:row[count(. | key('resource', @ows_AssignedTo)[1]) = 1 and @ows_AssignedTo != '']">
				<xsl:variable name="multiSelectColumn">
					<xsl:call-template name="assignedToHandler">
						<xsl:with-param name="iterationCount">1</xsl:with-param>
						<xsl:with-param name="thisAssignedTo" select="@ows_AssignedTo" />
						<xsl:with-param name="currentPosition" select="position()" />
					</xsl:call-template>
				</xsl:variable>
				<xsl:variable name="multiCount" select="count($multiSelectColumn/values)" />
				<xsl:copy-of select="$multiSelectColumn" />
			</xsl:for-each>
		</NewDataSet>
	</xsl:variable>
	<!-- Eliminate Duplicates -->
	<xsl:variable name="assignedToUniqueNames">
		<xsl:for-each select="$assignedToNames/NewDataSet/AssignedTo[count(. | key('assignedToUnique', @ID)[1]) = 1]">
			<xsl:sort select="@Name" />
			<xsl:copy-of select="." />
		</xsl:for-each>
	</xsl:variable>
	<!-- Create proper node-set -->
	<xsl:variable name="assignedTo" select="$assignedToUniqueNames" />

	<xsl:template match="/">
		<xsl:choose>
			<xsl:when test="sum(//NewDataSet/*/NewDataSet/Tasks/cw:listitems/rs:data/@ItemCount) = 0">
				<anygantt>
					<settings>
						<title align="Center" angle="0" position="Top">
							<text>No Tasks to display</text>
							<font_style><font size="12" /></font_style>
						</title>
						<animation enabled="True" />
						<context_menu about_anychart="false" />
						<background enabled="false" />
					</settings>
					<project_chart>
						<tasks>
							<task id="1" actual_start="2001-01-01" name="Not a task" parent="" />
						</tasks>
					</project_chart>
				</anygantt>
			</xsl:when>
			<xsl:otherwise>
				<anygantt>
					<settings>
						<title align="Center" angle="0" position="Top">
							<text>Resource Utilization Chart</text>
							<font_style><font size="12" /></font_style>
						</title>
						<animation enabled="True" />
						<context_menu about_anychart="false" />
						<background enabled="false" />
						<navigation enabled="true" position="top">
							<buttons>
							</buttons>
						</navigation>
					</settings>
					<datagrid>
						<collapser>
							<states>
								<normal>
									<fill enabled="true" color="#61AEDC" />
									<border enabled="true" color="#136599" />
								</normal>
								<hover>
									<fill enabled="true" color="#ABE0FF" />
									<border enabled="true" color="#007FD8" />
								</hover>
							</states>
						</collapser>
					</datagrid>
					<resource_chart>
						<resources>
							<!-- Create resource group for unassigned tasks -->
							<xsl:if test="count(//NewDataSet/*/NewDataSet/Tasks/cw:listitems/rs:data/z:row[@ows_AssignedTo = ''])">
								<resource>
									<xsl:attribute name="id">
										<xsl:text>_</xsl:text>
									</xsl:attribute>
									<xsl:attribute name="name">
										<xsl:text>unassigned</xsl:text>
									</xsl:attribute>
									<xsl:text>unassigned</xsl:text>
								</resource>
							</xsl:if>
							<!-- Create resource group for each person who has a task-->
							<xsl:for-each select="$assignedTo/AssignedTo">
								<xsl:sort select="@Name" />
								<resource>
									<xsl:attribute name="id">
										<xsl:value-of select="@ID" />
									</xsl:attribute>
									<xsl:attribute name="name">
										<xsl:value-of select="@Name" />
									</xsl:attribute>
								</resource>
							</xsl:for-each>
						</resources>
						<periods>
							<xsl:for-each select="//NewDataSet/*/NewDataSet/Tasks/cw:listitems/rs:data/z:row">
								<xsl:if test="@ows_StartDate != '' or @ows_DueDate != ''">
									<xsl:variable name="siteURL" select="../../../@SiteUrl" />
									<xsl:call-template name="outputPeriodElement">
										<xsl:with-param name="dataRow" select="." />
										<xsl:with-param name="thisAssignedTo" select="@ows_AssignedTo" />
										<xsl:with-param name="colorCode">
											<xsl:value-of select="concat('#', substring-after(//NewDataSet/*/NewDataSet/SiteDirectory/cw:listitems/rs:data/z:row[@ows_URL = $siteURL]/@ows_LegendColor_x003a_Code, ';#'))" />
										</xsl:with-param>
										<xsl:with-param name="projectTitle" select="//NewDataSet/*/NewDataSet/SiteDirectory/cw:listitems/rs:data/z:row[@ows_URL = $siteURL]/@ows_Title" />
									</xsl:call-template>
								</xsl:if>
							</xsl:for-each>
						</periods>
					</resource_chart>
				</anygantt>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="assignedToHandler">
		<xsl:param name="thisAssignedTo" />
		<xsl:param name="iterationCount" />
		<xsl:param name="currentPosition" />
		<xsl:choose>
			<xsl:when test="$thisAssignedTo = ''">
			</xsl:when>
			<xsl:otherwise>
				<xsl:choose>
					<xsl:when test="contains(substring-after($thisAssignedTo, ';#'), ';#')">
						<AssignedTo>
							<xsl:attribute name="ID">
								<xsl:value-of select="substring-before($thisAssignedTo, ';#')" />
							</xsl:attribute>
							<xsl:attribute name="Name">
								<xsl:value-of select="substring-before(substring-after($thisAssignedTo, ';#'), ';#')" />
							</xsl:attribute>
							<xsl:attribute name="Key">
								<xsl:value-of select="substring-before($thisAssignedTo, ';#')" />
								<xsl:text>;#</xsl:text>
								<xsl:value-of select="substring-before(substring-after($thisAssignedTo, ';#'), ';#')" />
							</xsl:attribute>
						</AssignedTo>
						<xsl:call-template name="assignedToHandler">
							<xsl:with-param name="iterationCount" select="$iterationCount + 1" />
							<xsl:with-param name="thisAssignedTo">
								<xsl:value-of select="substring-after(substring-after($thisAssignedTo, ';#'), ';#')" /> 
							</xsl:with-param>
							<xsl:with-param name="currentPosition" select="$currentPosition" />
						</xsl:call-template>
					</xsl:when>
					<xsl:otherwise>
						<AssignedTo>
							<xsl:attribute name="ID">
								<xsl:value-of select="substring-before($thisAssignedTo, ';#')" />
							</xsl:attribute>
							<xsl:attribute name="Name">
								<xsl:value-of select="substring-after($thisAssignedTo, ';#')" />
							</xsl:attribute>
							<xsl:attribute name="Key">
								<xsl:value-of select="substring-before($thisAssignedTo, ';#')" />
								<xsl:text>;#</xsl:text>
								<xsl:value-of select="substring-after($thisAssignedTo, ';#')" />
							</xsl:attribute>
						</AssignedTo>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="outputPeriodElement">
		<xsl:param name="dataRow" />
		<xsl:param name="thisAssignedTo" />
		<xsl:param name="colorCode" />
		<xsl:param name="projectTitle" />
		<period>
			<xsl:attribute name="resource_id">
				<xsl:choose>
					<xsl:when test="$thisAssignedTo = ''">
						<xsl:text>_</xsl:text>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="substring-before($thisAssignedTo, ';#')" />
					</xsl:otherwise>
				</xsl:choose> 
			</xsl:attribute>
			<xsl:if test="@ows_StartDate != ''">
				<xsl:attribute name="start">
  				<xsl:value-of select="translate(substring(@ows_StartDate,1,10),'.','/')"/>
  				<xsl:text>&#160;</xsl:text> 
  				<xsl:value-of select="translate(substring(@ows_StartDate,12,5),'.',':')"/>
  			</xsl:attribute>
				<xsl:if test="@ows_DueDate = ''">
					<xsl:attribute name="end">
	  				<xsl:value-of select="translate(substring(@ows_StartDate,1,10),'.','/')"/>
	  				<xsl:text>&#160;</xsl:text> 
	  				<xsl:value-of select="translate(substring(@ows_StartDate,12,5),'.',':')"/>
	  			</xsl:attribute>
				</xsl:if>
			</xsl:if>
			<xsl:if test="@ows_DueDate != ''">
				<xsl:attribute name="end">
				<xsl:value-of select="translate(substring(@ows_DueDate,1,10),'.','/')"/>
  				<xsl:text>&#160;</xsl:text> 
  				<xsl:value-of select="translate(substring(@ows_DueDate,12,5),'.',':')"/>
			</xsl:attribute>
				<xsl:if test="@ows_StartDate = ''">
					<xsl:attribute name="start">
	  				<xsl:value-of select="translate(substring(@ows_DueDate,1,10),'.','/')"/>
	  				<xsl:text>&#160;</xsl:text> 
	  				<xsl:value-of select="translate(substring(@ows_DueDate,12,5),'.',':')"/>
	  			</xsl:attribute>
				</xsl:if>
			</xsl:if>
		<actions>
			<action type="Call" event="Click" function="clickChartItemView">
				<arg>Task</arg>
				<arg>{%SiteURL}</arg>
				<arg>{%ListId}</arg>
				<arg>{%UniqueId}</arg>
				<arg>[PPM v3.2]/Actions%20Library/ViewTaskPortfolio.cwad</arg>
			</action>
		</actions>
			<style>
				<tooltip>
					<text>
Project: <xsl:value-of select="$projectTitle" />
Task: <xsl:value-of select="@ows_Title" />
Assigned To: <xsl:value-of select="@ows_AssignedTo" />
Start Date: <xsl:value-of select="@ows_StartDate" />
Due Date: <xsl:value-of select="@ows_DueDate" />
Work: <xsl:value-of select="@ows_Work" />
Actual Start: <xsl:value-of select="@ows_ActualStart" />
Actual Finish: <xsl:value-of select="@ows_ActualFinish" />
Actual Effort: <xsl:value-of select="@ows_ActualWork" />
Project Phase: <xsl:value-of select="@ows_ProjectPhase" />
Percent Complete: <xsl:value-of select="@ows_PercentComplete * 100" />
  				</text>
				</tooltip>
				<bar_style>
					<middle shape="Full">
						<fill>
							<xsl:attribute name="color">
								<xsl:value-of select="$colorCode" />
  							</xsl:attribute>
						</fill>
					</middle>
					
					<xsl:if test="Milestone = 1">
								<start>
									<marker>
										<border enabled="true" color="black" />
									</marker>
								</start>
								<end>
									<marker>
										<border enabled="true" color="black" />
									</marker>
								</end>
					</xsl:if>

				</bar_style>
			</style>
			<attributes>
				<attribute name="Title">
					<xsl:value-of select="@ows_Title" />
				</attribute>
				<attribute name="Work">
					<xsl:value-of select="@ows_Work" />
				</attribute>
				<attribute name="StartDate">
					<xsl:value-of select="@ows_StartDate" />
				</attribute>
				<attribute name="DueDate">
					<xsl:value-of select="@ows_DueDate" />
				</attribute>
				<attribute name="ActualWork">
					<xsl:value-of select="@ows_ActualWork" />
				</attribute>
				<attribute name="ActualStart">
					<xsl:value-of select="@ows_ActualStart" />
				</attribute>
				<attribute name="ActualFinish">
					<xsl:value-of select="@ows_ActualFinish" />
				</attribute>
				<attribute name="AssignedTo">
					<xsl:value-of select="@ows_AssignedTo" />
				</attribute>
				<attribute name="ProjectPhase">
					<xsl:value-of select="@ows_ProjectPhase" />
				</attribute>
				<attribute name="PercentComplete">
					<xsl:value-of select="@ows_PercentComplete" />
				</attribute>
				<attribute name="WBS">
					<xsl:value-of select="@ows_WBS" />
				</attribute>
				<attribute name="ID">
					<xsl:value-of select="@ows_ID" />
				</attribute>
  				<attribute name="SiteURL">
  					<xsl:value-of select="../../../@SiteUrl" />
  				</attribute>
  				<xsl:variable name="taskListSiteUrl" select="../../../@SiteUrl" />
  				<attribute name="ListId">
  					<xsl:value-of select="substring-after(substring-before(//NewDataSet/TasksMetadata[@SiteUrl = $taskListSiteUrl]/cw:List/@ID, '}'), '{')" />
  				</attribute>
  				<attribute name="UniqueId">
  					<xsl:value-of select="substring-after(@ows_UniqueId, ';#')" />
  				</attribute>
				
			</attributes>
		</period>
		<xsl:if test="contains(substring-after($thisAssignedTo, ';#'), ';#')">
			<xsl:call-template name="outputPeriodElement">
				<xsl:with-param name="dataRow" select="." />
				<xsl:with-param name="thisAssignedTo" select="substring-after(substring-after($thisAssignedTo, ';#'), ';#')" />
				<xsl:with-param name="colorCode" select="$colorCode" />
				<xsl:with-param name="projectTitle" select="$projectTitle" />
			</xsl:call-template>
		</xsl:if>
	</xsl:template>
</xsl:stylesheet>