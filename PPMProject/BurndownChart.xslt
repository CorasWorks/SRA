<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:msxsl="urn:schemas-microsoft-com:xslt" 
	xmlns:date="http://exslt.org/dates-and-times"
	xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/"
	xmlns:rs="urn:schemas-microsoft-com:rowset"
	xmlns:z="#RowsetSchema"
	exclude-result-prefixes="msxsl date cw rs z">
	<xsl:output method="xml" omit-xml-declaration="yes"/>
	<xsl:template match="/">
		<xsl:choose>
			<xsl:when test="count(//NewDataSet/Tasks/cw:listitems/rs:data/z:row[@ows_StartDate != '']) = 0">
				<anychart>
					<charts>
						<chart plot_type="Pie">
							<chart_settings>
								<title>
									<text>Project Burndown Chart - No Planned Start Date</text>
									<font family="Verdana" size="14" />
								</title>
								<chart_background>
									<border enabled="False" />
									<fill type="Solid" color="white" />
									<corners type="Square" />
								</chart_background>
							</chart_settings>
							<data>
								<series />
							</data>
						</chart>
					</charts>
				</anychart>
			</xsl:when>
			<xsl:when test="count(//NewDataSet/Tasks/cw:listitems/rs:data/z:row[@ows_DueDate != '']) = 0">
				<anychart>
					<charts>
						<chart plot_type="Pie">
							<chart_settings>
								<title>
									<text>Project Burndown Chart - No Planned Finish Date</text>
									<font family="Verdana" size="14" />
								</title>
								<chart_background>
									<border enabled="False" />
									<fill type="Solid" color="white" />
									<corners type="Square" />
								</chart_background>
							</chart_settings>
							<data>
								<series />
							</data>
						</chart>
					</charts>
				</anychart>
			</xsl:when>
			<xsl:when test="sum(//NewDataSet/Tasks/cw:listitems/rs:data/z:row/@ows_Work) = 0">
				<anychart>
					<charts>
						<chart plot_type="Pie">
							<chart_settings>
								<title>
									<text>Project Burndown Chart - No Planned Work</text>
									<font family="Verdana" size="14" />
								</title>
								<chart_background>
									<border enabled="False" />
									<fill type="Solid" color="white" />
									<corners type="Square" />
								</chart_background>
							</chart_settings>
							<data>
								<series />
							</data>
						</chart>
					</charts>
				</anychart>
			</xsl:when>
			<xsl:otherwise>
				<xsl:variable name="sDate">
					<xsl:for-each select="//NewDataSet/Tasks/cw:listitems/rs:data/z:row">
						<xsl:sort select="@ows_StartDate" />
						<xsl:if test="position() = 1">
							<xsl:value-of select="substring(date:add(substring-before(@ows_StartDate, ' '), '-P1M'), 1, 8)" />
							<xsl:text>01</xsl:text>
						</xsl:if>			
					</xsl:for-each>
				</xsl:variable>
				<!-- eDate = Month of the latest DueDate of any Task or current month, whichever is later -->
				<xsl:variable name="eDate">
					<xsl:for-each select="//NewDataSet/Tasks/cw:listitems/rs:data/z:row">
						<xsl:sort select="@ows_DueDate" order="descending" />
						<xsl:if test="position() = 1">
							<xsl:variable name="lastDueDateMonth">
								<xsl:value-of select="substring(date:add(substring-before(@ows_DueDate, ' '), 'P1M'), 1, 8)" />
								<xsl:text>01</xsl:text>
							</xsl:variable>
							<xsl:choose>
								<xsl:when test="$lastDueDateMonth &lt; substring(date:date(), 1, 7)">
									<xsl:value-of select="substring(date:date(), 1, 7)" />
								</xsl:when>
								<xsl:otherwise>
									<xsl:value-of select="$lastDueDateMonth " />
								</xsl:otherwise>
							</xsl:choose>
						</xsl:if>			
					</xsl:for-each>
				</xsl:variable>
				<!-- xAxis = The complete date range of the project broken into days -->
				<xsl:variable name="secsDiff" select="date:seconds(date:difference($sDate, $eDate))" />
				<xsl:variable name="daysDiff" select="$secsDiff div (3600*24)" />
				<xsl:variable name="XaxisArray">
					<NewDataSet>
						<xsl:if test="$sDate != '' and $eDate != ''">
							<xsl:call-template name="buildXaxisArray">
								<xsl:with-param name="startDayParam" select="$sDate" /> 
								<xsl:with-param name="endDayParam" select="$eDate" />
								<xsl:with-param name="daysIncrementParam">
									<xsl:text>1</xsl:text> 
								</xsl:with-param>
							</xsl:call-template>
						</xsl:if>
					</NewDataSet>
				</xsl:variable>
				<xsl:variable name="xAxis" select="msxsl:node-set($XaxisArray)/NewDataSet/*" />
				<xsl:variable name="tasksDatax">
					<xsl:for-each select="//NewDataSet/Tasks/cw:listitems/rs:data/z:row[@ows_ActualFinish != '']">
						<xsl:sort select="@ows_ActualFinish" />
						<Tasks>
							<StartDay>
								<xsl:value-of select="substring-before(@ows_ActualFinish, ' ')" />
							</StartDay>
							<xsl:variable name="startDay" select="substring-before(@ows_ActualFinish, ' ')" />
							<xsl:variable name="endDay" select="$eDate" />
							<xsl:variable name="secsDiff1" select="date:seconds(date:difference($startDay, $endDay))" />
							<xsl:variable name="daysDiff1" select="$secsDiff1 div (3600*24)" />
							<DaysDiff>
								<xsl:value-of select="$daysDiff1" />
							</DaysDiff>
							<Work><xsl:value-of select="@ows_Work" /></Work>
						</Tasks>
					</xsl:for-each>
				</xsl:variable>
				<xsl:variable name="tasksData" select="msxsl:node-set($tasksDatax)" />

			<xsl:variable name="work" select="sum(//NewDataSet/Tasks/cw:listitems/rs:data/z:row/@ows_Work)" />

				<anychart>
					<settings>
						<animation enabled="True" />
					</settings>
					<templates>
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
					<charts>
						<chart plot_type="CategorizedVertical">
							<chart_settings>
								<title>
									<text>Project Burndown Chart</text>
									<background enabled="false" />
								</title>
								<legend enabled="true" ignore_auto_item="True">
									<title enabled="false" />
									<format><![CDATA[{%Icon} {%Name}  ]]></format>
									<items>
										<item source="Series" />
									</items>
								</legend>
								<axes>
									<x_axis>
										<title>
											<text>Iteration Timeline (days)</text>
										</title>
									</x_axis>
									<y_axis>
										<title>
											<text>Sum of Task Work (hours)</text>
										</title>
									</y_axis>
								</axes>
							</chart_settings>
							<data_plot_settings default_series_type="Line">
								<line_series>
									<marker_settings>
										<marker size="8" />
										<states>
											<hover>
												<marker size="12" />
											</hover>
										</states>
									</marker_settings>
									<tooltip_settings enabled="True">
										<format>Day: {%Name}{numDecimals:0} Hours Remaining: {%Value}{numDecimals:0} Date: {%date}</format>
									</tooltip_settings>
								</line_series>
							</data_plot_settings>
							<data>
								<series name="Straight Line Burndown">
									<xsl:for-each select="msxsl:node-set($XaxisArray)/NewDataSet/Date" >
										<xsl:if test="position() = 1">
											<point>
												<xsl:attribute name="name">
													<xsl:value-of select="$daysDiff - DaysDiff" />
												</xsl:attribute>
												<xsl:attribute name="y">
													<xsl:value-of select="$work * (DaysDiff div $daysDiff)" />
									          	</xsl:attribute>
											</point>
										</xsl:if>
										<point>
											<xsl:attribute name="name">
												<xsl:value-of select="$daysDiff - DaysDiff + 1" />
											</xsl:attribute>
											<xsl:attribute name="y">
												<xsl:value-of select="$work * (DaysDiff div $daysDiff)" />
								          	</xsl:attribute>
											<attributes>
												<attribute name="date">
													<xsl:value-of select="StartDay" />
												</attribute>
											</attributes>
										</point>
									</xsl:for-each>
								</series>
								<series name="Actual Completed Tasks">
									<point>
										<xsl:attribute name="name">
											<xsl:text>0</xsl:text>
										</xsl:attribute>
										<xsl:attribute name="y">
											<xsl:value-of select="$work" />
							          	</xsl:attribute>
									</point>
									<xsl:for-each select="msxsl:node-set($XaxisArray)/NewDataSet/Date" >
										<xsl:variable name="dazeDiff" select="DaysDiff" />
										<xsl:if test="$tasksData/Tasks[last()]/DaysDiff &lt; $dazeDiff" >
											<point>
												<xsl:attribute name="name">
													<xsl:value-of select="$daysDiff - DaysDiff + 1" />
												</xsl:attribute>
												<xsl:attribute name="y">
													<xsl:value-of select="$work - sum($tasksData/Tasks[DaysDiff + 1 &gt;= $dazeDiff]/Work)" />
									          	</xsl:attribute>
												<attributes>
													<attribute name="date">
														<xsl:value-of select="StartDay" />
													</attribute>
												</attributes>
											</point>
										</xsl:if>
									</xsl:for-each>
								</series>
								<series name="Today Marker">
									<point>
										<xsl:attribute name="name">
											<xsl:value-of select="$daysDiff - msxsl:node-set($XaxisArray)/NewDataSet/Date[Today = 'Yes']/DaysDiff + 1" />
										</xsl:attribute>
										<xsl:attribute name="y">0</xsl:attribute>
									</point>
								</series>
							</data>
						</chart>
					</charts>
				</anychart>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="buildXaxisArray">
		<xsl:param name="startDayParam" />
		<xsl:param name="endDayParam" />
		<xsl:param name="daysIncrementParam" />
		<xsl:variable name="startDay" select="$startDayParam" />
		<xsl:variable name="endDay" select="$endDayParam" />
		<xsl:variable name="daysIncrement" select="$daysIncrementParam" />
		<xsl:variable name="secsDiff" select="date:seconds(date:difference($startDay, $endDay))" />
		<xsl:variable name="daysDiff" select="$secsDiff div (3600*24)" />
		<xsl:choose>
			<xsl:when test="$daysDiff &lt; 0">
			</xsl:when>
			<xsl:otherwise>
				<Date>
					<StartDay>
						<xsl:value-of select="$startDay" />
					</StartDay>
					<EndDay>
						<xsl:value-of select="$endDay" />
					</EndDay>
					<SecsDiff>
						<xsl:value-of select="$secsDiff" />
					</SecsDiff>
					<DaysDiff>
						<xsl:value-of select="$daysDiff" />
					</DaysDiff>
					<NextDay>
						<xsl:value-of select="date:add($startDay, 'P1D')" />
					</NextDay>
					<xsl:if test="$startDay= substring(date:date(), 1, 10)">
						<Today>Yes</Today>
					</xsl:if>
				</Date>
				<xsl:call-template name="buildXaxisArray">
					<xsl:with-param name="startDayParam" select="date:add($startDay, 'P1D')" />
					<xsl:with-param name="endDayParam" select="$endDay" />
					<xsl:with-param name="daysIncrementParam" select="$daysIncrement" />
				</xsl:call-template>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>
