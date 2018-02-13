<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:msxsl="urn:schemas-microsoft-com:xslt" 
	xmlns:date="http://exslt.org/dates-and-times"
	xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/"
	xmlns:rs="urn:schemas-microsoft-com:rowset"
	xmlns:z="#RowsetSchema"
	exclude-result-prefixes="msxsl date cw rs z">
	<xsl:key name="overdueTasks" match="OverdueTasks" use="@OverdueTypeAndSeverity" />
	<xsl:key name="overdueType" match="OverdueTasks" use="@Type" />
	<xsl:key name="overdueSeverity" match="OverdueTasks" use="@Severity" />
	<xsl:key name="resource" match="//NewDataSet/*/NewDataSet/cw:listitems/rs:data/z:row" use="@ows_AssignedTo" />
	<xsl:key name="assignedToUnique" match="//NewDataSet/AssignedTo" use="@ID" />
	<xsl:output omit-xml-declaration="yes"/>
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
		<anychart>
			<xsl:call-template name="DashboardSettings" />
			<charts>
				<xsl:call-template name="TasksByPriorityChart" />
				<xsl:call-template name="TasksByStatusChart" />
				<xsl:call-template name="TasksByAssignedToChart" />
				<xsl:call-template name="OverdueTasksChart" />
				<xsl:call-template name="ExpensesChart" />
				<xsl:call-template name="WorkChart" />
			</charts>
			<xsl:call-template name="AnyChartTemplates" />
		</anychart>
	</xsl:template>
	<xsl:template name="DashboardSettings">
		<dashboard>
<!--
			<xsl:value-of select="date:date()" />*
-->
			<view type="Dashboard">
				<title enabled="False" padding="2">
					<text>Projects Dashboard</text>
				</title>
				<background>
					<border type="Solid" color="#CCCCCC" thickness="1" />
					<corners type="Square" />
					<effects enabled="true" />
					<inside_margin all="10" top="5" />
				</background>
				<vbox width="100%" height="100%">
					<margin all="0" />
					<hbox width="100%" height="50%">
						<margin all="0" />
						<view type="Chart" source="TasksByPriority" width="25%" height="100%" />
						<view type="Chart" source="TasksByStatus" width="25%" height="100%" />
						<view type="Chart" source="WorkHours" width="25%" height="100%" />
						<view type="Chart" source="Expenses" width="25%" height="100%" />
					</hbox>
					<hbox width="100%" height="50%">
						<margin all="0" />
<!--
						<view type="Chart" source="OverdueTasks" width="50%" height="100%" />
-->						<view type="Chart" source="TasksByAssignedTo" width="100%" height="100%" />
					</hbox>
				</vbox>
			</view>
		</dashboard>
	</xsl:template>

	<xsl:template name="TasksByPriorityChart">
		<xsl:choose>
			<xsl:when test="sum(//NewDataSet/*/NewDataSet/Tasks/cw:listitems/rs:data/@ItemCount) = 0">
				<chart name="TasksByPriority" template="noDataTemplate" plot_type="CategorizedVertical">
					<chart_settings>
						<title enabled="True">
							<text>Tasks by Priority - None</text>
						</title>
					</chart_settings>
					<data>
						<series name="Tasks">
							<point name="Tasks" y="0" />
						</series>
					</data>
				</chart>
			</xsl:when>
			<xsl:otherwise>
				<chart name="TasksByPriority" template="baseTemplatePie" plot_type="Pie">
					<chart_settings>
						<title enabled="True">
							<text>Tasks by Priority</text>
						</title>
					</chart_settings>
					<data>
						<actions>
							<action type="call" function="clickOnTasksByPriorityPort">
								<arg>{%Priority}</arg>
							</action>
						</actions>
						<series>
							<xsl:for-each select="//NewDataSet/*/NewDataSet/TasksMetadata/cw:List/cw:Fields/cw:Field[@Name='Priority']/cw:CHOICES/cw:CHOICE">
								<xsl:variable name="priority" select="." />
								<point>
									<xsl:attribute name="name">
											<xsl:value-of select="." /> 
										</xsl:attribute>
									<xsl:attribute name="y">
											<xsl:value-of select="count(//NewDataSet/*/NewDataSet/Tasks/cw:listitems/rs:data/z:row[@ows_IsSummaryTask = '0' and @ows_Priority = $priority])" />
										</xsl:attribute>
									<attributes>
										<attribute name="Priority">
											<xsl:value-of select="." />
										</attribute>
									</attributes>
								</point>
							</xsl:for-each>
						</series>
					</data>
				</chart>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="TasksByStatusChart">
		<xsl:choose>
			<xsl:when test="sum(//NewDataSet/*/NewDataSet/Tasks/cw:listitems/rs:data/@ItemCount) = 0">
				<chart name="TasksByStatus" template="noDataTemplate" plot_type="CategorizedVertical">
					<chart_settings>
						<title>
							<text>Tasks by Status - None</text>
						</title>
					</chart_settings>
					<data>
						<series name="Tasks">
							<point name="Tasks" y="0" />
						</series>
					</data>
				</chart>
			</xsl:when>
			<xsl:otherwise>
				<chart name="TasksByStatus" template="baseTemplatePie" plot_type="Pie">
					<chart_settings>
						<title enabled="True">
							<text>Tasks by Status</text>
						</title>
					</chart_settings>
					<data>
						<actions>
							<action type="call" function="clickOnTasksByStatusPort">
								<arg>{%Status}</arg>
							</action>
						</actions>
						<series>
							<xsl:for-each select="//NewDataSet/*/NewDataSet/TasksMetadata/cw:List/cw:Fields/cw:Field[@Name='Status']/cw:CHOICES/cw:CHOICE">
								<xsl:variable name="status" select="." />
								<point>
									<xsl:attribute name="name">
											<xsl:value-of select="." /> 
										</xsl:attribute>
									<xsl:attribute name="y">
											<xsl:value-of select="count(//NewDataSet/*/NewDataSet/Tasks/cw:listitems/rs:data/z:row[@ows_IsSummaryTask = '0' and@ows_Status = $status])" />
										</xsl:attribute>
									<attributes>
										<attribute name="Status">
											<xsl:value-of select="." />
										</attribute>
									</attributes>
								</point>
							</xsl:for-each>
						</series>
					</data>
				</chart>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="WorkChart">
		<xsl:choose>
			<xsl:when test="sum(//NewDataSet/*/NewDataSet/Tasks/cw:listitems/rs:data/z:row[@ows_IsSummaryTask = '0']/@ows_Work) = 0 and sum(//NewDataSet/*/NewDataSet/Tasks/cw:listitems/rs:data/z:row[@ows_IsSummaryTask = '0']/@ows_ActualWork) = 0">
				<chart name="WorkHours" template="noDataTemplate" plot_type="CategorizedVertical">
					<chart_settings>
						<title enabled="True">
							<text>Work (hours) - None</text>
						</title>
					</chart_settings>
					<data>
						<series name="Work">
							<point name="Work" y="0" />
						</series>
						<series name="Actual Work">
							<point name="ActualWork" y="0" />
						</series>
					</data>
				</chart>
			</xsl:when>
			<xsl:otherwise>
				<chart name="WorkHours" template="baseTemplateCategorizedVertical" plot_type="CategorizedVertical">
					<xsl:variable name="tasksOnly">
						<TasksOnly>
							<xsl:for-each select="//NewDataSet/*/NewDataSet/Tasks/cw:listitems/rs:data/z:row[@ows_IsSummaryTask = '0']">
								<xsl:copy-of select="." />
							</xsl:for-each>
						</TasksOnly>
					</xsl:variable>
					<chart_settings>
						<title enabled="True">
							<text>Work (hours)</text>
						</title>
					</chart_settings>
					<data>
						<actions>
							<action type="call" function="clickOnWorkPort">
								<arg>{%Name}</arg>
							</action>
						</actions>
						<series name="Work">
							<point name="Work">
								<xsl:attribute name="y">
									<xsl:value-of select="sum($tasksOnly/TasksOnly/z:row/@ows_Work)" />
								</xsl:attribute>
							</point>
						</series>
						<series name="Actual Work">
							<point name="ActualWork">
								<xsl:attribute name="y">
									<xsl:value-of select="sum($tasksOnly/TasksOnly/z:row/@ows_ActualWork)" />
								</xsl:attribute>
							</point>
						</series>
					</data>
				</chart>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template name="ExpensesChart">
		<xsl:choose>
			<xsl:when test="sum(//NewDataSet/*/NewDataSet/ExpenseTrackingCategories/cw:listitems/rs:data/z:row/@ows_BudgetedAmount) = 0 and sum(//NewDataSet/*/NewDataSet/ExpenseTracking/cw:listitems/rs:data/z:row/@ows_Amount) = 0">
				<chart name="Expenses" template="noDataTemplate" plot_type="CategorizedVertical">
					<chart_settings>
						<title enabled="True">
							<text>Expenses - None</text>
						</title>
					</chart_settings>
					<data>
						<series name="Budgeted">
							<point name="Budgeted" y="0" />
						</series>
						<series name="Actual">
							<point name="Actual" y="0" />
						</series>
					</data>
				</chart>
			</xsl:when>
			<xsl:otherwise>
				<chart name="Expenses" template="baseTemplateCategorizedVertical" plot_type="CategorizedVertical">
					<chart_settings>
						<title enabled="True">
							<text>Expenses</text>
						</title>
					</chart_settings>
					<data>
						<actions>
							<action type="call" function="clickOnExpensePort">
								<arg>{%Name}</arg>
							</action>
						</actions>
						<series name="Budgeted">
							<point name="Budgeted">
								<xsl:attribute name="y">
									<xsl:value-of select="sum(//NewDataSet/*/NewDataSet/ExpenseTrackingCategories/cw:listitems/rs:data/z:row/@ows_BudgetedAmount)" />
								</xsl:attribute>
							</point>
						</series>
						<series name="Actual">
							<point name="Actual">
								<xsl:attribute name="y">
									<xsl:value-of select="sum(//NewDataSet/*/NewDataSet/ExpenseTracking/cw:listitems/rs:data/z:row/@ows_Amount)" />
								</xsl:attribute>
							</point>
						</series>
					</data>
				</chart>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="TasksByAssignedToChart">
		<xsl:choose>
			<xsl:when test="sum(//NewDataSet/*/NewDataSet/Tasks/cw:listitems/rs:data/@ItemCount) = 0">
				<chart name="TasksByAssignedTo" template="noDataTemplate" plot_type="CategorizedVertical">
					<chart_settings>
						<title>
							<text>Tasks by Assigned To - None</text>
						</title>
					</chart_settings>
					<data>
						<series name="Tasks">
							<point name="Tasks" y="0" />
						</series>
					</data>
				</chart>
			</xsl:when>
			<xsl:otherwise>
				<chart name="TasksByAssignedTo" template="baseTemplateCategorizedVertical" plot_type="CategorizedHorizontal">
					<xsl:variable name="tasksData" select="//NewDataSet/*/NewDataSet/Tasks/cw:listitems/rs:data[z:row/@ows_IsSummaryTask = '0'] " />
					<chart_settings>
						<title enabled="True">
							<text>Tasks by Assigned To</text>
						</title>
						<legend enabled="true" ignore_auto_item="True" position="Left">
							<title enabled="false" />
							<format><![CDATA[{%Icon} {%Name}]]></format>
							<items>
								<item source="Points" />
							</items>
						</legend>
					</chart_settings>
					<data>
						<actions>
							<action type="call" function="clickOnAssignedToPort">
								<arg>{%Name}</arg>
							</action>
						</actions>
						<xsl:for-each select="$assignedTo/AssignedTo">
							<xsl:variable name="Key">
								<xsl:value-of select="@ID" />
								<xsl:text>;#</xsl:text>
								<xsl:value-of select="@Name" />
							</xsl:variable>
							<series>
								<point>
									<xsl:attribute name="name">
										<xsl:value-of select="@Name" /> 
									</xsl:attribute>
									<xsl:attribute name="y">
										<xsl:value-of select="count($tasksData/z:row[@ows_IsSummaryTask = '0' and contains(@ows_AssignedTo, $Key)])" />
									</xsl:attribute>
								</point>
							</series>
						</xsl:for-each>
					</data>
				</chart>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="OverdueTasksChart">
		<chart name="OverdueTasks" template="baseTemplateCategorizedVertical" plot_type="CategorizedVertical">
			<chart_settings>
				<title enabled="True">
					<text>Overdue Tasks</text>
				</title>
				<legend enabled="True" ignore_auto_item="True" position="Bottom">
					<title enabled="false" />
					<format><![CDATA[{%Icon} {%Name}]]></format>
					<items>
						<item source="Series" />
					</items>
				</legend>
			</chart_settings>
			<data>
				<actions>
					<action type="call" function="clickOnOverdueTask">
						<arg>{%Query}</arg>
						<arg>{%SeriesName}</arg>
						<arg>{%Name}</arg>
					</action>
				</actions>
				<series name="Incomplete">
					<point name="Slight">
						<xsl:attribute name="y">
								<xsl:value-of select="//NewDataSet/*/NewDataSet/IncompleteSlight/cw:listitems/rs:data/@ItemCount" />
							</xsl:attribute>
						<attributes>
									<attribute name="Query"><![CDATA[<Where><And><And><Neq><FieldRef Name='Status'/><Value Type='Choice'>Completed</Value></Neq><Eq><FieldRef Name="IsSummaryTask"/><Value Type="Boolean">0</Value></Eq></And><And><Geq><FieldRef Name='DueDate'/><Value Type='DateTime'><Today OffsetDays='-7'/></Value></Geq><Lt><FieldRef Name='DueDate'/><Value Type='DateTime'><Today/></Value></Lt></And></And></Where>]]></attribute>
						</attributes>
					</point>
					<point name="Moderate">
						<xsl:attribute name="y">
								<xsl:value-of select="//NewDataSet/*/NewDataSet/IncompleteModerate/cw:listitems/rs:data/@ItemCount" />
							</xsl:attribute>
						<attributes>
									<attribute name="Query"><![CDATA[<Where><And><And></And><Neq><FieldRef Name='Status'/><Value Type='Choice'>Completed</Value></Neq><And><Geq><FieldRef Name='DueDate'/><Value Type='DateTime'><Today OffsetDays='-14'/></Value></Geq><Lt><FieldRef Name='DueDate'/><Value Type='DateTime'><Today OffsetDays='-7'/></Value></Lt></And><Eq><FieldRef Name="IsSummaryTask"/><Value Type="Boolean">0</Value></Eq></And></Where>]]></attribute>
						</attributes>
					</point>
					<point name="Extreme">
						<xsl:attribute name="y">
								<xsl:value-of select="//NewDataSet/*/NewDataSet/IncompleteExtreme/cw:listitems/rs:data/@ItemCount" />
							</xsl:attribute>
						<attributes>
									<attribute name="Query"><![CDATA[<Where><And><And><Neq><FieldRef Name='Status'/><Value Type='Choice'>Completed</Value></Neq><Lt><FieldRef Name='DueDate'/><Value Type='DateTime'><Today OffsetDays='-14'/></Value></Lt></And><Eq><FieldRef Name="IsSummaryTask"/><Value Type="Boolean">0</Value></Eq></And></Where>]]></attribute>
						</attributes>
					</point>
				</series>
				<series name="Unstarted">
					<point name="Slight">
						<xsl:attribute name="y">
								<xsl:value-of select="//NewDataSet/*/NewDataSet/UnstartedSlight/cw:listitems/rs:data/@ItemCount" />
							</xsl:attribute>
						<attributes>
									<attribute name="Query"><![CDATA[<Where><And><And><Eq><FieldRef Name='Status'/><Value Type='Choice'>Not Started</Value></Eq><Eq><FieldRef Name="IsSummaryTask"/><Value Type="Boolean">0</Value></Eq></And><And><Geq><FieldRef Name='StartDate'/><Value Type='DateTime'><Today OffsetDays='-7'/></Value></Geq><Lt><FieldRef Name='StartDate'/><Value Type='DateTime'><Today /></Value></Lt></And></And></Where>]]></attribute>
						</attributes>
					</point>
					<point name="Moderate">
						<xsl:attribute name="y">
								<xsl:value-of select="//NewDataSet/*/NewDataSet/UnstartedModerate/cw:listitems/rs:data/@ItemCount" />
							</xsl:attribute>
						<attributes>
									<attribute name="Query"><![CDATA[<Where><And><And><Eq><FieldRef Name="Status"/><Value Type="Choice">Not Started</Value></Eq><Eq><FieldRef Name="IsSummaryTask"/><Value Type="Boolean">0</Value></Eq></And><And><Geq><FieldRef Name="StartDate"/><Value Type="DateTime"><Today OffsetDays="-14"/></Value></Geq><Lt><FieldRef Name="StartDate"/><Value Type="DateTime"><Today OffsetDays="-7"/></Value></Lt></And></And></Where>]]></attribute>
						</attributes>
					</point>
					<point name="Extreme">
						<xsl:attribute name="y">
								<xsl:value-of select="//NewDataSet/*/NewDataSet/UnstartedExtreme/cw:listitems/rs:data/@ItemCount" />
							</xsl:attribute>
						<attributes>
									<attribute name="Query"><![CDATA[<Where><And><And><Eq><FieldRef Name='Status'/><Value Type='Choice'>Not Started</Value></Eq><Lt><FieldRef Name='StartDate'/><Value Type='DateTime'><Today OffsetDays='-14'/></Value></Lt></And><Eq><FieldRef Name="IsSummaryTask"/><Value Type="Boolean">0</Value></Eq></And></Where>]]></attribute>
						</attributes>
					</point>
				</series>
			</data>
		</chart>
	</xsl:template>
	<xsl:template name="AnyChartTemplates">
		<templates>
			<template name="baseTemplatePie">
				<chart>
					<chart_settings>
						<legend enabled="True" ignore_auto_item="True" position="Bottom">
							<title enabled="false" />
							<format><![CDATA[{%Icon} {%Name} - {%Value}{numDecimals:0}]]></format>
							<items>
								<item source="Points" />
							</items>
						</legend>
						<chart_background>
							<border type="Solid" color="#CCCCCC" thickness="1" />
							<corners type="Square" />
							<effects enabled="true" />
							<inside_margin all="10" top="5" />
						</chart_background>
						<title enabled="false" />
					</chart_settings>
					<data_plot_settings>
						<pie_series>
							<label_settings enabled="False" mode="Outside" multi_line_align="Center">
								<position halign="Center" valign="Center" padding="8" />
								<format>{%Name}, {%Value}{numDecimals:0}</format>
								<font bold="False" />
							</label_settings>
							<connector enabled="False" opacity="0.3" />
							<tooltip_settings enabled="True">
								<format>{%Name} - {%Value}{numDecimals:0}</format>
							</tooltip_settings>
						</pie_series>
					</data_plot_settings>
				</chart>
			</template>
			<template name="baseTemplateCategorizedVertical">
				<chart>
					<chart_settings>
						<chart_background>
							<border type="Solid" color="#CCCCCC" thickness="1" />
							<corners type="Square" />
							<effects enabled="true" />
							<inside_margin all="10" top="5" />
						</chart_background>
						<legend enabled="False" ignore_auto_item="True">
							<title enabled="false" />
							<format><![CDATA[{%Icon} {%Name} - {%Value}{numDecimals:0} ]]></format>
							<items>
								<item source="Points" />
							</items>
						</legend>
						<axes>
							<x_axis>
								<title enabled="false">
									<text><![CDATA[Arguments]]></text>
								</title>
							</x_axis>
							<y_axis>
								<title enabled="false">
									<text><![CDATA[Values]]></text>
								</title>
								<labels>
									<format><![CDATA[{%Value}{numDecimals:0} ]]></format>
								</labels>
								<scale minimum="0" />
							</y_axis>
						</axes>
					</chart_settings>
					<data_plot_settings default_series_type="Bar">
						<bar_series point_padding="0.2" group_padding="1">
							<label_settings enabled="true">
								<background enabled="false" />
								<font color="DarkColor(%Color)" />
								<format>{%YValue}{numDecimals:0}</format>
								<effects>
									<drop_shadow enabled="true" opacity="1" />
								</effects>
							</label_settings>
							<tooltip_settings enabled="True">
								<format>{%YValue}{numDecimals:0} ({%Name})</format>
								<background>
									<border color="DarkColor(%Color)" />
								</background>
								<font color="DarkColor(%Color)" />
							</tooltip_settings>
						</bar_series>
					</data_plot_settings>
				</chart>
			</template>
			<template name="noDataTemplate">
				<chart>
					<chart_settings>
						<chart_background>
							<border type="Solid" color="#CCCCCC" thickness="1" />
							<corners type="Square" />
							<effects enabled="false" />
							<inside_margin all="10" top="5" />
						</chart_background>
						<legend enabled="False" ignore_auto_item="True">
							<title enabled="false" />
							<format><![CDATA[{%Icon} {%Name} - {%Value}{numDecimals:0} ]]></format>
							<items>
								<item source="Points" />
							</items>
						</legend>
						<axes>
							<x_axis>
								<title enabled="false">
									<text><![CDATA[Arguments]]></text>
								</title>
							</x_axis>
							<y_axis>
								<title enabled="false">
									<text><![CDATA[Values]]></text>
								</title>
								<labels>
									<format><![CDATA[{%Value}{numDecimals:0} ]]></format>
								</labels>
								<scale minimum="0" maximum="10" />
							</y_axis>
						</axes>
					</chart_settings>
					<data_plot_settings default_series_type="Bar">
						<bar_series point_padding="0.2" group_padding="1">
							<label_settings enabled="true">
								<background enabled="false" />
								<font color="DarkColor(%Color)" />
								<format>{%YValue}{numDecimals:0}</format>
								<effects>
									<drop_shadow enabled="true" opacity="1" />
								</effects>
							</label_settings>
						</bar_series>
					</data_plot_settings>
				</chart>
			</template>
		</templates>
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
</xsl:stylesheet>