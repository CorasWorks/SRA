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
	<xsl:key name="byPriority" match="Tasks/cw:listitems/rs:data/z:row" use="@ows_Priority" />
	<xsl:key name="byStatus" match="Tasks/cw:listitems/rs:data/z:row" use="@ows_Status" />
	<xsl:output omit-xml-declaration="yes"/>
	<!-- Read in the settings for the Program Timeline Chart -->
	<xsl:template match="/">
		<anychart>
			<dashboard>
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
							<view type="Chart" source="ExpenseAmount" width="25%" height="100%" />
						</hbox>
						<hbox width="100%" height="50%">
							<margin all="0" />
							<view type="Chart" source="OverdueTasks" width="50%" height="100%" />
							<view type="Chart" source="Risks" width="25%" height="100%" />
							<view type="Chart" source="Deliverables" width="25%" height="100%" />
							<!--
									<view type="Chart" source="TasksByAssignedTo" width="75%" height="100%" />
		-->
						</hbox>
					</vbox>
				</view>
			</dashboard>
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
									<scale minimum="0" minor_interval="1" />
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
			</templates>
			<charts>
				<xsl:choose>
					<xsl:when test="//NewDataSet/Tasks/cw:listitems/rs:data/@ItemCount = 0">
						<chart name="TasksByPriority" template="baseTemplatePie" plot_type="Pie">
							<chart_settings>
								<title enabled="True">
									<text>No Tasks</text>
								</title>
							</chart_settings>
							<data>
								<series>
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
									<action type="call" function="clickOnMyTasksByPriority">
										<arg>{%Priority}</arg>
									</action>
								</actions>
								<series>
									<xsl:for-each select="//NewDataSet/TasksMetadata/cw:List/cw:Fields/cw:Field[@Name='Priority']/cw:CHOICES/cw:CHOICE">
										<xsl:variable name="priority" select="." />
										<point>
											<xsl:attribute name="name">
													<xsl:value-of select="." /> 
												</xsl:attribute>
											<xsl:attribute name="y">
													<xsl:value-of select="count(//NewDataSet/Tasks/cw:listitems/rs:data/z:row[@ows_Priority = $priority])" />
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
				<xsl:choose>
					<xsl:when test="//NewDataSet/Tasks/cw:listitems/rs:data/z:row/@ItemCount = 0">
						<chart name="TasksByStatus" template="baseTemplatePie" plot_type="Pie">
							<chart_settings>
								<title enabled="True">
									<text>No Tasks</text>
								</title>
							</chart_settings>
							<data>
								<series>
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
									<action type="call" function="clickOnMyTasksByStatus">
										<arg>{%Status}</arg>
									</action>
								</actions>
								<series>
									<xsl:for-each select="//NewDataSet/TasksMetadata/cw:List/cw:Fields/cw:Field[@Name='Status']/cw:CHOICES/cw:CHOICE">
										<xsl:variable name="status" select="." />
										<point>
											<xsl:attribute name="name">
													<xsl:value-of select="." /> 
												</xsl:attribute>
											<xsl:attribute name="y">
													<xsl:value-of select="count(//NewDataSet/Tasks/cw:listitems/rs:data/z:row[@ows_Status = $status])" />
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
							<action type="call" function="clickOnMyOverdueTask">
								<arg>{%Query}</arg>
								<arg>{%SeriesName}</arg>
								<arg>{%Name}</arg>
							</action>
						</actions>
						<series name="Incomplete">
							<point name="Slight">
								<xsl:attribute name="y">
								<xsl:value-of select="//NewDataSet/IncompleteSlight/cw:listitems/rs:data/@ItemCount" />
							</xsl:attribute>
								<attributes>
									<attribute name="Query"><![CDATA[<Where><And><And><And><Neq><FieldRef Name='Status'/><Value Type='Choice'>Completed</Value></Neq><Eq><FieldRef Name='AssignedTo'/><Value Type='User'>Me</Value></Eq></And><And><Geq><FieldRef Name='DueDate'/><Value Type='DateTime'><Today OffsetDays='-7'/></Value></Geq><Lt><FieldRef Name='DueDate'/><Value Type='DateTime'><Today/></Value></Lt></And></And><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where>]]></attribute>
								</attributes>
							</point>
							<point name="Moderate">
								<xsl:attribute name="y">
								<xsl:value-of select="//NewDataSet/IncompleteModerate/cw:listitems/rs:data/@ItemCount" />
							</xsl:attribute>
								<attributes>
									<attribute name="Query"><![CDATA[<Where><And></And><And><And><Neq><FieldRef Name='Status'/><Value Type='Choice'>Completed</Value></Neq><Eq><FieldRef Name='AssignedTo'/><Value Type='User'>Me</Value></Eq></And><And><Geq><FieldRef Name='DueDate'/><Value Type='DateTime'><Today OffsetDays='-14'/></Value></Geq><Lt><FieldRef Name='DueDate'/><Value Type='DateTime'><Today OffsetDays='-7'/></Value></Lt></And></And><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where>]]></attribute>
								</attributes>
							</point>
							<point name="Extreme">
								<xsl:attribute name="y">
								<xsl:value-of select="//NewDataSet/IncompleteExtreme/cw:listitems/rs:data/@ItemCount" />
							</xsl:attribute>
								<attributes>
									<attribute name="Query"><![CDATA[<Where><And><And><Neq><FieldRef Name='Status'/><Value Type='Choice'>Completed</Value></Neq><Lt><FieldRef Name='DueDate'/><Value Type='DateTime'><Today OffsetDays='-14'/></Value></Lt></And><And><Eq><FieldRef Name='AssignedTo'/><Value Type='User'>Me</Value></Eq><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></And></Where>]]></attribute>
								</attributes>
							</point>
						</series>
						<series name="Unstarted">
							<point name="Slight">
								<xsl:attribute name="y">
								<xsl:value-of select="//NewDataSet/UnstartedSlight/cw:listitems/rs:data/@ItemCount" />
							</xsl:attribute>
								<attributes>
									<attribute name="Query"><![CDATA[<Where><And><And><And><Eq><FieldRef Name='Status'/><Value Type='Choice'>Not Started</Value></Eq><Eq><FieldRef Name='AssignedTo'/><Value Type='User'>Me</Value></Eq></And><And><Geq><FieldRef Name='StartDate'/><Value Type='DateTime'><Today OffsetDays='-7'/></Value></Geq><Lt><FieldRef Name='StartDate'/><Value Type='DateTime'><Today /></Value></Lt></And></And><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where>]]></attribute>
								</attributes>
							</point>
							<point name="Moderate">
								<xsl:attribute name="y">
								<xsl:value-of select="//NewDataSet/UnstartedModerate/cw:listitems/rs:data/@ItemCount" />
							</xsl:attribute>
								<attributes>
									<attribute name="Query"><![CDATA[<Where><And><And><And><Eq><FieldRef Name="Status"/><Value Type="Choice">Not Started</Value></Eq><Eq><FieldRef Name='AssignedTo'/><Value Type='User'>Me</Value></Eq></And><And><Geq><FieldRef Name="StartDate"/><Value Type="DateTime"><Today OffsetDays="-14"/></Value></Geq><Lt><FieldRef Name="StartDate"/><Value Type="DateTime"><Today OffsetDays="-7"/></Value></Lt></And></And><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where>]]></attribute>
								</attributes>
							</point>
							<point name="Extreme">
								<xsl:attribute name="y">
								<xsl:value-of select="//NewDataSet/UnstartedExtreme/cw:listitems/rs:data/@ItemCount" />
							</xsl:attribute>
								<attributes>
									<attribute name="Query"><![CDATA[<Where><And><And><Eq><FieldRef Name='Status'/><Value Type='Choice'>Not Started</Value></Eq><Lt><FieldRef Name='StartDate'/><Value Type='DateTime'><Today OffsetDays='-14'/></Value></Lt></And><And><Eq><FieldRef Name='AssignedTo'/><Value Type='User'>Me</Value></Eq><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></And></Where>]]></attribute>
								</attributes>
							</point>
						</series>
					</data>
				</chart>
				<!--<xsl:choose>
					<xsl:when test="count(//NewDataSet/ProjectMetrics/TaskCountAssignedTo) = 0">
						<chart name="TasksByAssignedTo" template="baseTemplatePie" plot_type="Pie">
							<chart_settings>
								<title enabled="True">
									<text>No Tasks</text>
								</title>
							</chart_settings>
							<data>
								<series>
								</series>
							</data>
						</chart>
					</xsl:when>
					<xsl:otherwise>
						<chart name="TasksByAssignedTo" template="baseTemplateCategorizedVertical" plot_type="CategorizedHorizontal">
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
									<action type="call" function="clickOnMyAssignedTo">
										<arg>{%Name}</arg>
									</action>
								</actions>
								<xsl:for-each select="//NewDataSet/ProjectMetrics/TaskCountAssignedTo">
									<xsl:sort order="ascending" select="./@AssignedTo" />
									<series>
										<point>
											<xsl:attribute name="name">
												<xsl:choose>
													<xsl:when test="./@AssignedTo = ''">
														<xsl:text>unassigned</xsl:text> 
													</xsl:when>
													<xsl:otherwise>
														<xsl:value-of select="./@AssignedTo" /> 
													</xsl:otherwise> 
												</xsl:choose> 
											</xsl:attribute>
											<xsl:attribute name="y">
												<xsl:value-of select="." />
											</xsl:attribute>
										</point>
									</series>
								</xsl:for-each>
							</data>
						</chart>
					</xsl:otherwise>
				</xsl:choose>
				<xsl:choose>
					<xsl:when test="sum(//NewDataSet/ProjectMetrics/OverdueTasks/Count) = 0">
						<chart name="OverdueTasks" template="baseTemplatePie" plot_type="Pie">
							<chart_settings>
								<title enabled="True">
									<text>No Overdue Tasks</text>
								</title>
							</chart_settings>
							<data>
								<series>
								</series>
							</data>
						</chart>
					</xsl:when>
					<xsl:otherwise>
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
									<action type="call" function="clickOnMyOverdueTask">
										<arg>{%Query}</arg>
									</action>
								</actions>
								<xsl:for-each select="//NewDataSet/ProjectMetrics/OverdueTasks[count(. | key('overdueType', @Type)[1]) = 1]">
									<xsl:variable name="oType" select="@Type" />
									<series>
										<xsl:attribute name="name"><xsl:value-of select="$oType" /></xsl:attribute>
										<xsl:for-each select="//NewDataSet/ProjectMetrics/OverdueTasks[count(. | key('overdueSeverity', @Severity)[1]) = 1]">
											<xsl:variable name="oSeverity" select="@Severity" />
											<point>
												<xsl:attribute name="name"><xsl:value-of select="./@Severity" /></xsl:attribute>
												<xsl:attribute name="y">
														<xsl:value-of select="sum(//NewDataSet/ProjectMetrics/OverdueTasks[@Type = $oType and @Severity = $oSeverity]/Count)" />
													</xsl:attribute>
												<attributes>
													<attribute name="Query">
														<xsl:value-of select="Query" />
													</attribute>
												</attributes>
											</point>
										</xsl:for-each>
									</series>
								</xsl:for-each>
							</data>
						</chart>
					</xsl:otherwise>
				</xsl:choose>-->
				<xsl:choose>
					<xsl:when test="//NewDataSet/Risks/cw:listitems/rs:data/@ItemCount = 0">
						<chart name="Risks" template="baseTemplatePie" plot_type="Pie">
							<chart_settings>
								<title enabled="True">
									<text>No Risks</text>
								</title>
							</chart_settings>
							<data>
								<series>
								</series>
							</data>
						</chart>
					</xsl:when>
					<xsl:otherwise>
						<chart name="Risks" template="baseTemplateCategorizedVertical" plot_type="CategorizedVertical">
							<chart_settings>
								<title enabled="True">
									<text>Risks</text>
								</title>
							</chart_settings>
							<data>
								<actions>
									<action type="call" function="clickOnMyRisks">
										<arg>{%Priority}</arg>
									</action>
								</actions>
								<series name="Actual">
									<point name="Actual">
										<xsl:attribute name="y">
											<xsl:value-of select="//NewDataSet/Risks/cw:listitems/rs:data/@ItemCount" />
										</xsl:attribute>
									</point>
								</series>
							</data>
						</chart>
					</xsl:otherwise>
				</xsl:choose>
				<xsl:choose>
					<xsl:when test="//NewDataSet/Deliverables/cw:listitems/rs:data/@ItemCount = 0">
						<chart name="Deliverables" template="baseTemplatePie" plot_type="Pie">
							<chart_settings>
								<title enabled="True">
									<text>No Deliverables</text>
								</title>
							</chart_settings>
							<data>
								<series>
								</series>
							</data>
						</chart>
					</xsl:when>
					<xsl:otherwise>
						<chart name="Deliverables" template="baseTemplateCategorizedVertical" plot_type="CategorizedVertical">
							<chart_settings>
								<title enabled="True">
									<text>Deliverables</text>
								</title>
							</chart_settings>
							<data>
								<actions>
									<action type="call" function="clickOnMyDeliverables">
										<arg>{%Priority}</arg>
									</action>
								</actions>
								<series name="Actual">
									<point name="Actual">
										<xsl:attribute name="y">
											<xsl:value-of select="//NewDataSet/Deliverables/cw:listitems/rs:data/@ItemCount" />
										</xsl:attribute>
									</point>
								</series>
							</data>
						</chart>
					</xsl:otherwise>
				</xsl:choose>
				<xsl:choose>
					<xsl:when test="//NewDataSet/ExpenseTracking/cw:listitems/rs:data/@ItemCount = 0">
						<chart name="ExpenseAmount" template="baseTemplatePie" plot_type="Pie">
							<chart_settings>
								<title enabled="True">
									<text>No Expenses</text>
								</title>
							</chart_settings>
							<data>
								<series>
								</series>
							</data>
						</chart>
					</xsl:when>
					<xsl:otherwise>
						<chart name="ExpenseAmount" template="baseTemplateCategorizedVertical" plot_type="CategorizedVertical">
							<chart_settings>
								<title enabled="True">
									<text>Expenses</text>
								</title>
							</chart_settings>
							<data>
								<actions>
									<action type="call" function="clickOnMyExpense">
										<arg>{%Priority}</arg>
									</action>
								</actions>
								<series name="Actual">
									<point name="Actual">
										<xsl:attribute name="y">
											<xsl:value-of select="sum(//NewDataSet/ExpenseTracking/cw:listitems/rs:data/z:row/@ows_Amount)" />
										</xsl:attribute>
									</point>
								</series>
							</data>
						</chart>
					</xsl:otherwise>
				</xsl:choose>
				<xsl:choose>
					<xsl:when test="sum(//NewDataSet/Tasks/cw:listitems/rs:data/z:row/@ows_Work) = 0 and sum(//NewDataSet/Tasks/cw:listitems/rs:data/z:row/@ows_ActualWork) = 0">
						<chart name="WorkHours" template="baseTemplatePie" plot_type="Pie">
							<chart_settings>
								<title enabled="True">
									<text>No Hours</text>
								</title>
							</chart_settings>
							<data>
								<series>
								</series>
							</data>
						</chart>
					</xsl:when>
					<xsl:otherwise>
						<chart name="WorkHours" template="baseTemplateCategorizedVertical" plot_type="CategorizedVertical">
							<chart_settings>
								<title enabled="True">
									<text>Work (hours)</text>
								</title>
							</chart_settings>
							<data>
								<actions>
									<action type="call" function="clickOnMyWork">
										<arg>{%Name}</arg>
									</action>
								</actions>
								<series name="Work">
									<point name="Work">
										<xsl:attribute name="y">
													<xsl:value-of select="sum(//NewDataSet/Tasks/cw:listitems/rs:data/z:row/@ows_Work)" />
												</xsl:attribute>
									</point>
								</series>
								<series name="ActualWork">
									<point name="Actual Work">
										<xsl:attribute name="y">
													<xsl:value-of select="sum(//NewDataSet/Tasks/cw:listitems/rs:data/z:row/@ows_ActualWork)" />
												</xsl:attribute>
									</point>
								</series>
							</data>
						</chart>
					</xsl:otherwise>
				</xsl:choose>
			</charts>
		</anychart>
	</xsl:template>
</xsl:stylesheet>

