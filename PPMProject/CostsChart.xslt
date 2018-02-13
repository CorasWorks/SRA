<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" xmlns:ms="urn:schemas-microsoft-com:xslt" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" exclude-result-prefixes="rs z cw ms msxsl">
	<xsl:output method="xml"/>
	<xsl:key name="taskStatus" match="//NewDataSet/Tasks/cw:listitems/rs:data/z:row" use="@ows_Status" />
	<xsl:key name="assignedTo" match="//NewDataSet/Tasks/cw:listitems/rs:data/z:row" use="@ows_AssignedTo" />
	<xsl:key name="resource" match="//NewDataSet/cw:listitems/rs:data/z:row" use="@ows_AssignedTo" />
	<xsl:key name="assignedToUnique" match="//NewDataSet/AssignedTo" use="@ID" />
	<!-- Create a variable with multiple assigned values parsed individual elements -->
	<xsl:variable name="assignedToNames">
		<NewDataSet>
			<xsl:for-each select="//NewDataSet/Tasks/cw:listitems/rs:data/z:row[count(. | key('resource', @ows_AssignedTo)[1]) = 1 and @ows_AssignedTo != '']">
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
			<xsl:when test="not(//NewDataSet/Tasks/cw:listitems/rs:data/@ItemCount) and not(//NewDataSet/ExpenseTracking/cw:listitems/rs:data/@ItemCount) and not(//NewDataSet/ExpenseTrackingCategories/cw:listitems/rs:data/@ItemCount)">
				<anychart>
					<charts>
						<chart plot_type="Pie">
							<chart_settings>
								<title>
									<text>No expense data to display</text>
									<font size="14" />
								</title>
								<chart_background>
									<border enabled="False" />
									<fill type="Solid" color="white" />
									<corners type="Square" />
								</chart_background>
							</chart_settings>
							<data>
								<series>
								</series>
							</data>
						</chart>
					</charts>
				</anychart>
			</xsl:when>
			<xsl:otherwise>
				<anychart>
					<dashboard>
						<view type="Dashboard">
							<title enabled="False" padding="2">
								<text>Project Costs Dashboard</text>
							</title>
							<background>
								<border type="Solid" color="#CCCCCC" thickness="1" />
								<corners type="Square" />
								<effects enabled="true" />
								<inside_margin all="10" top="5" />
							</background>
							<vbox width="100%" height="100%">
								<margin all="0" />
								<hbox width="100%" height="100%">
									<margin all="0" />
									<view type="Chart" source="ExpensesByCategory" width="33%" height="100%" />
									<view type="Chart" source="EffortByStatus" width="33%" height="100%" />
									<view type="Chart" source="EffortByResource" width="33%" height="100%" />
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
										<format>{%Icon} {%Name} - {%Value}{numDecimals:0}</format>
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
										<format>{%Icon} {%Name} - {%Value}{numDecimals:0}</format>
										<items>
											<item source="Points" />
										</items>
									</legend>
									<axes>
										<x_axis>
											<title enabled="false">
												<text><![CDATA[Arguments]]></text>
											</title>
											<labels rotation="45" />
										</x_axis>
										<y_axis>
											<title enabled="false">
												<text><![CDATA[Values]]></text>
											</title>
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
											<format>{%YValue}{numDecimals:2}</format>
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
						<chart name="ExpensesByCategory" template="baseTemplateCategorizedVertical" plot_type="CategorizedVertical">
							<chart_settings>
								<title enabled="True">
									<text>Expenses By Category</text>
								</title>
								<legend enabled="false" ignore_auto_item="True">
									<title enabled="false" />
									<format>{%Icon} {%Name}</format>
									<items>
										<item source="Points" />
									</items>
								</legend>
							</chart_settings>
							<data>
								<actions>
									<action type="call" function="clickOnExpensesByCategory">
										<arg>{%Name}</arg>
									</action>
								</actions>
								<xsl:for-each select="//NewDataSet/ExpenseTrackingCategories/cw:listitems/rs:data/z:row">
									<xsl:variable name="exCatID" select="@ows_ID" />
									<series name="Expenses">
											<point>
												<xsl:attribute name="name">
													<xsl:value-of select="@ows_Title" /> 
												</xsl:attribute>
												<xsl:attribute name="y">
													<xsl:value-of select="sum(//NewDataSet/ExpenseTracking/cw:listitems/rs:data/z:row[substring-before(@ows_Expense_x0020_Category, ';#') = $exCatID]/@ows_Amount)" />
												</xsl:attribute>
											</point>
									</series>
								</xsl:for-each>
							</data>
						</chart>
		
						<chart name="EffortByStatus" template="baseTemplateCategorizedVertical" plot_type="CategorizedVertical">
							<chart_settings>
								<title enabled="True">
									<text>Effort By Status</text>
								</title>
								<legend enabled="true" ignore_auto_item="True" position="Bottom">
									<title enabled="false" />
									<format>{%Icon} {%Name}</format>
									<items>
										<item source="Series" />
									</items>
								</legend>
							</chart_settings>
							<data>
								<actions>
									<action type="call" function="clickOnEffortByStatus">
										<arg>{%Name}</arg>
									</action>
								</actions>
								<series name="Work">
									<xsl:for-each select="//NewDataSet/Tasks/cw:listitems/rs:data/z:row[count(. | key('taskStatus', @ows_Status)[1]) = 1]">
										<xsl:variable name="tStat" select="@ows_Status" />
										<xsl:if test="$tStat != ''">
											<point>
												<xsl:attribute name="name">
													<xsl:value-of select="@ows_Status" /> 
												</xsl:attribute>
												<xsl:attribute name="y">
													<xsl:value-of select="sum(//NewDataSet/Tasks/cw:listitems/rs:data/z:row[@ows_Status = $tStat]/@ows_Work)" />
												</xsl:attribute>
											</point>
										</xsl:if>
									</xsl:for-each>
								</series>
								<series name="Actual Work">
									<xsl:for-each select="//NewDataSet/Tasks/cw:listitems/rs:data/z:row[count(. | key('taskStatus', @ows_Status)[1]) = 1]">
										<xsl:variable name="tStat" select="@ows_Status" />
										<xsl:if test="$tStat != ''">
											<point>
												<xsl:attribute name="name">
													<xsl:value-of select="@ows_Status" /> 
												</xsl:attribute>
												<xsl:attribute name="y">
													<xsl:value-of select="sum(//NewDataSet/Tasks/cw:listitems/rs:data/z:row[@ows_Status = $tStat]/@ows_ActualWork)" />
												</xsl:attribute>
											</point>
										</xsl:if>
									</xsl:for-each>
								</series>
							</data>
						</chart>
						<chart name="EffortByResource" template="baseTemplateCategorizedVertical" plot_type="CategorizedVertical">
							<xsl:variable name="tasksData" select="//NewDataSet/Tasks/cw:listitems/rs:data" />
							<chart_settings>
								<title enabled="True">
									<text>Effort By Resource</text>
								</title>
								<legend enabled="true" ignore_auto_item="True" position="Bottom">
									<title enabled="false" />
									<format>{%Icon} {%Name}</format>
									<items>
										<item source="Series" />
									</items>
								</legend>
							</chart_settings>
							<data>
								<actions>
									<action type="call" function="clickOnEffortByResource">
										<arg>{%Name}</arg>
									</action>
								</actions>
		
								<series name="Work">
									<xsl:for-each select="$assignedTo/AssignedTo">
										<xsl:variable name="Key">
											<xsl:value-of select="@ID" />
											<xsl:text>;#</xsl:text>
											<xsl:value-of select="@Name" />
										</xsl:variable>
										<point>
											<xsl:attribute name="name">
												<xsl:value-of select="@Name" /> 
											</xsl:attribute>
											<xsl:attribute name="y">
												<xsl:value-of select="sum($tasksData/z:row[contains(@ows_AssignedTo, $Key)]/@ows_Work)" />
											</xsl:attribute>
										</point>
									</xsl:for-each>
								</series>
								<series name="Actual Work">
									<xsl:for-each select="$assignedTo/AssignedTo">
										<xsl:variable name="Key">
											<xsl:value-of select="@ID" />
											<xsl:text>;#</xsl:text>
											<xsl:value-of select="@Name" />
										</xsl:variable>
										<point>
											<xsl:attribute name="name">
												<xsl:value-of select="@Name" /> 
											</xsl:attribute>
											<xsl:attribute name="y">
												<xsl:value-of select="sum($tasksData/z:row[contains(@ows_AssignedTo, $Key)]/@ows_ActualWork)" />
											</xsl:attribute>
										</point>
									</xsl:for-each>
								</series>
							</data>
						</chart>
					</charts>
				</anychart>
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
</xsl:stylesheet>