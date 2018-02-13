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
	<xsl:variable name="DA">
		<xsl:for-each select="$xAxis">
			<xsl:if test="substring(StartDay, 1, 7) = substring(date:date(), 1, 7)">
				<xsl:value-of select="((position() - 1) div 8) * 10000" />
			</xsl:if>
		</xsl:for-each>
	</xsl:variable>
	<xsl:variable name="AC">
		<xsl:for-each select="$xAxis">
			<xsl:if test="substring(StartDay, 1, 7) = substring(date:date(), 1, 7)">
				<!-- ACTUAL COST (AC) = Cost of work accomplished = Actual Cost of Work Performed (ACWP) -->
				<!-- y = Sum of Actual Work (hours) * the cost per hour for all Tasks completed in the current month or earlier -->
				<xsl:variable name="diffRangeLow" select="StartDay/@secsDiff" />
				<xsl:variable name="diffRangeHigh" select="EndDay/@secsDiff" />
				<xsl:variable name="tasksInRange">
					<xsl:for-each select="$tasksData/z:row[@ows_Status = 'Completed']">
						<xsl:variable name="secsDiff" select="date:seconds(date:difference(date:date(substring-before(@ows_DueDate, ' ')), $eDate))" />
						<xsl:if test="$secsDiff &gt;= $diffRangeHigh" >
							<Task>
							 	<xsl:value-of select="@ows_ActualWork" />
							</Task>
						</xsl:if>
					</xsl:for-each>
				</xsl:variable>
				<xsl:value-of select="sum(msxsl:node-set($tasksInRange)/Task) * $costFactor" />
			</xsl:if> 
		</xsl:for-each>
	</xsl:variable>
	<xsl:variable name="EV">
		<xsl:for-each select="$xAxis">
			<xsl:if test="substring(StartDay, 1, 7) = substring(date:date(), 1, 7)">
				<!-- EARNED VALUE (EV) = Value of work accomplished = Budgeted Cost for Work Performed (BCWP) -->
				<!-- y = Sum of Work (hours) * the cost per hour for all Tasks completed in the current month or earlier -->
				<xsl:variable name="diffRangeLow" select="StartDay/@secsDiff" />
				<xsl:variable name="diffRangeHigh" select="EndDay/@secsDiff" />
				<xsl:variable name="tasksInRange">
					<xsl:for-each select="$tasksData/z:row[@ows_Status = 'Completed']">
						<xsl:variable name="secsDiff" select="date:seconds(date:difference(date:date(substring-before(@ows_ActualFinish, ' ')), $eDate))" />
						<xsl:if test="$secsDiff &gt;= $diffRangeHigh" >
							<Task>
							 	<xsl:value-of select="@ows_Work" />
							</Task>
						</xsl:if>
					</xsl:for-each>
				</xsl:variable>
				<xsl:value-of select="sum(msxsl:node-set($tasksInRange)/Task) * $costFactor" />
			</xsl:if> 
		</xsl:for-each>
	</xsl:variable>
	<xsl:variable name="PV">
		<xsl:for-each select="$xAxis">
			<xsl:if test="substring(StartDay, 1, 7) = substring(date:date(), 1, 7)">
				<!-- PLANNED VALUE (PV) = Value of work planned to be accomplished = Budgeted Cost for Work Scheduled (BCWS)-->
				<!-- y = Sum of Work (hours) * the cost per hour for all Tasks due in the current month or earlier -->
				<xsl:variable name="diffRangeLow" select="StartDay/@secsDiff" />
				<xsl:variable name="diffRangeHigh" select="EndDay/@secsDiff" />
				<xsl:variable name="tasksInRange">
					<xsl:for-each select="$tasksData/z:row">
						<xsl:variable name="secsDiff" select="date:seconds(date:difference(date:date(substring-before(@ows_DueDate, ' ')), $eDate))" />
						<xsl:if test="$secsDiff &gt;= $diffRangeHigh" >
							<Task>
							 	<xsl:value-of select="@ows_Work" />
							</Task>
						</xsl:if>
					</xsl:for-each>
				</xsl:variable>
				<xsl:value-of select="sum(msxsl:node-set($tasksInRange)/Task) * $costFactor" />
			</xsl:if> 
		</xsl:for-each>
	</xsl:variable>
	<xsl:variable name="BAC">
		<xsl:value-of select="sum($tasksData/z:row/@ows_Work) * $costFactor" />
	</xsl:variable>
	<xsl:variable name="EAC">
		<xsl:value-of select="(sum($tasksData/z:row[@ows_Status = 'Completed']/@ows_Work) + sum($tasksData/z:row[@ows_Status != 'Completed' and @ows_Work &gt;= @ows_ActualWork ]/@ows_Work) + sum($tasksData/z:row[@ows_Status != 'Completed' and @ows_Work &lt; @ows_ActualWork ]/@ows_ActualWork)) * $costFactor" />
	</xsl:variable>
	<xsl:variable name="BCWS" select="$PV" />
	<xsl:variable name="BCWP" select="$EV" />
	<xsl:variable name="ACWP" select="$AC" />
	<xsl:variable name="CV" select="$BCWP - $ACWP" />
	<xsl:variable name="SV" select="$BCWP - $BCWS" />
	<xsl:variable name="VAC" select="$BAC - $EAC" />
	<xsl:variable name="CVper">
		<xsl:choose>
			<xsl:when test="$BCWP = 0">
				<xsl:text>0</xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="$CV div $BCWP * 100" />
			</xsl:otherwise> 
		</xsl:choose>
	</xsl:variable>
	<xsl:variable name="SVper">
		<xsl:choose>
			<xsl:when test="$BCWS = 0">
				<xsl:text>0</xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="$SV div $BCWS * 100" />
			</xsl:otherwise> 
		</xsl:choose>
	</xsl:variable>
	<xsl:variable name="CPI">
		<xsl:choose>
			<xsl:when test="$ACWP = 0">
				<xsl:text>0</xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="$BCWP div $ACWP" />
			</xsl:otherwise> 
		</xsl:choose>
	</xsl:variable>
	<xsl:variable name="SPI">
		<xsl:choose>
			<xsl:when test="$BCWS= 0">
				<xsl:text>0</xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="$BCWP div $BCWS" />
			</xsl:otherwise> 
		</xsl:choose>
	</xsl:variable>
	<xsl:variable name="tnDAOblGoal" select="format-number($DA div 10000 * 100, '###.00')" />
	<xsl:variable name="tnPV" select="format-number($PV div $BAC * 100, '###.00')" />
	<xsl:variable name="tnAC" select="format-number($AC div $BAC * 100, '###.00')" />
	<xsl:variable name="tnEV" select="format-number($EV div $BAC * 100, '###.00')" />
	<!-- costFactor = the hourly rate (in dollars) for work -->
	<xsl:variable name="costFactor"><xsl:text>75</xsl:text></xsl:variable>
	<!-- tasksData = The base tasks, no summary tasks -->
	<xsl:variable name="tasksDatax">
		<xsl:for-each select="//NewDataSet/Tasks/cw:listitems/rs:data/z:row">
			<xsl:variable name="wbs" select="@ows_WBS" />
			<xsl:if test="count(//NewDataSet/Tasks/cw:listitems/rs:data/z:row[@ows_ParentWBS = $wbs]) = 0">
				<xsl:copy-of select="." />
			</xsl:if>
		</xsl:for-each>
	</xsl:variable>
	<xsl:variable name="tasksData" select="msxsl:node-set($tasksDatax)" />
	<!-- sDate = Month prior to the earliest StartDate of any Task -->
	<xsl:variable name="sDate">
		<xsl:for-each select="//NewDataSet/Tasks/cw:listitems/rs:data/z:row">
			<xsl:sort select="@ows_StartDate" />
			<xsl:if test="position() = 1">
				<xsl:value-of select="substring(substring-before(@ows_StartDate, ' '), 1, 8)" />
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
	<!-- xAxis = The complete date range of the project broken into months -->
	<xsl:variable name="secsDiff" select="date:seconds(date:difference($sDate, $eDate))" />
	<xsl:variable name="daysDiff" select="$secsDiff div (3600*24)" />
	<xsl:variable name="XaxisArray">
		<NewDataSet>
			<xsl:if test="$sDate != '' and $eDate != ''">
				<xsl:call-template name="buildXaxisArray">
					<xsl:with-param name="startDayParam" select="$sDate" /> 
					<xsl:with-param name="endDayParam" select="$eDate" />
					<xsl:with-param name="monthsIncrementParam">
						<xsl:text>1</xsl:text> 
					</xsl:with-param>
				</xsl:call-template>
			</xsl:if>
		</NewDataSet>
	</xsl:variable>
	<xsl:variable name="xAxis" select="msxsl:node-set($XaxisArray)/NewDataSet/*" />
	<xsl:template match="/">
		<anychart>
			<xsl:copy-of select="$xAxis" />
			<xsl:choose>
				<xsl:when test="count($xAxis/*) = 0">
					<settings>
						<animation enabled="True" />
					</settings>
					<charts>
						<chart plot_type="CategorizedVertical">
							<data_plot_settings default_series_type="Bar">
								<bar_series group_padding="0.2">
									<tooltip_settings enabled="true" />
								</bar_series>
							</data_plot_settings>
							<chart_settings>
								<title enabled="true">
									<text>No Data</text>
								</title>
							</chart_settings>
							<data>
								<series name="Series 1">
									<point name="No Data" y="0" />
								</series>
							</data>
						</chart>
					</charts>
				</xsl:when>
				<xsl:otherwise>
					<settings>
						<animation enabled="True" />
					</settings>
					<dashboard>
						<view type="Dashboard">
							<background>
								<border enabled="false" />
							</background>
							<title enabled="false">
								<text>
								</text>
							</title>
							<vbox height="100%" width="100%">
								<hbox height="66%" width="100%">
									<view type="chart" source="EVM" height="100%" width="100%" />
								</hbox>
								<hbox height="33%" width="100%">
									<view type="Chart" source="PercentageChart" height="100%" width="50%" />
									<view type="Gauge" source="CPISPI" height="100%" width="50%" />
								</hbox>
							</vbox>
						</view>
					</dashboard>
					<gauges>
						<gauge name="CPISPI">
							<chart_settings>
								<title>
									<text><![CDATA[CPI CV and SVI SV]]></text>
								</title>
								<chart_background>
									<border enabled="false" />
								</chart_background>
							</chart_settings>
							<linear orientation="Horizontal">
								<axis size="0" position="50">
									<scale minimum="0" maximum="2" major_interval="1" />
									<scale_bar enabled="false" />
									<labels padding="5" />
									<color_ranges>
										<color_range start="-8000" end="8000" align="Outside" padding="0" start_size="8" end_size="8">
											<fill type="Gradient">
												<gradient angle="0">
													<key color="Red" />
													<key color="Yellow" />
													<key color="Green" />
												</gradient>
											</fill>
											<border enabled="true" type="Solid" color="Black" opacity="0.4" />
										</color_range>
									</color_ranges>
								</axis>
								<pointers>
									<pointer type="Marker" value="{$CPI}">
										<xsl:attribute name="color">
											<xsl:choose>
												<xsl:when test="$CV &gt;= 0">
													<xsl:text>Green</xsl:text> 
												</xsl:when>
												<xsl:otherwise>
													<xsl:text>Red</xsl:text> 
												</xsl:otherwise>
											</xsl:choose>  
										</xsl:attribute>
										<tooltip enabled="false">
											<format>
												<xsl:value-of select="$CV" />
											</format>
										</tooltip>
										<marker_pointer_style shape="TriangleUp" align="Center" padding="5" width="15" height="15" />
										<label enabled="true">
											<position placement_mode="ByAnchor" valign="Top" halign="Center" padding="12" />
											<format><![CDATA[CPI: {%Value}{numDecimals:2}% ]]><xsl:call-template name="formatVariance"><xsl:with-param name="var" select="($CV) div 1000" /></xsl:call-template></format>
											<background enabled="false" />
										</label>
										<animation enabled="true" start_time="0" duration="0.7" interpolation_type="Back" />
									</pointer>
									<pointer type="Marker" value="{$SPI}">
										<xsl:attribute name="color">
											<xsl:choose>
												<xsl:when test="$SV &gt;= 0">
													<xsl:text>Green</xsl:text> 
												</xsl:when>
												<xsl:otherwise>
													<xsl:text>Red</xsl:text> 
												</xsl:otherwise>
											</xsl:choose>  
										</xsl:attribute>
										<tooltip enabled="false">
											<format>
												<xsl:value-of select="$SV" />
											</format>
										</tooltip>
										<marker_pointer_style shape="TriangleDown" align="Center" padding="5" width="15" height="15" />
										<label enabled="true">
											<position placement_mode="ByAnchor" valign="Bottom" halign="Center" padding="12" />
											<format><![CDATA[SPI: {%Value}{numDecimals:2}% ]]><xsl:call-template name="formatVariance"><xsl:with-param name="var" select="($SV) div 1000" /></xsl:call-template></format>
											<background enabled="false" />
										</label>
										<animation enabled="true" start_time="0" duration="0.7" interpolation_type="Back" />
									</pointer>
								</pointers>
							</linear>
						</gauge>
					</gauges>
					<charts>
						<chart name="PercentageChart" plot_type="CategorizedHorizontal">
							<data_plot_settings default_series_type="Bar">
								<bar_series point_padding="0.2" group_padding="1">
									<tooltip_settings enabled="True" />
								</bar_series>
							</data_plot_settings>
							<chart_settings>
								<title enabled="false" />
								<chart_background>
									<border enabled="false" />
								</chart_background>
								<axes>
									<y_axis position="Opposite">
										<title enabled="false" />
										<scale minimum="0" />
									</y_axis>
									<x_axis>
										<title enabled="false" />
									</x_axis>
								</axes>
							</chart_settings>
							<data>
								<series name="PercentageChart">
									<point name="% Planned Work (PV)" y="{$tnPV}" color="Blue" />
									<point name="% Complete (EV)" y="{$tnEV}" color="Red" />
									<point name="% Spent (AC)" y="{$tnAC}" color="Green" />
									<!--
									<point name="DA Obligation Goal" y="{$tnDAOblGoal}" color="Yellow" />
									-->
								</series>
							</data>
						</chart>
						<chart name="EVM" plot_type="CategorizedVertical">
							<chart_settings>
								<title enabled="false">
									<text>Good Example Performance Measurement</text>
									<background enabled="false" />
								</title>
								<chart_background>
									<border enabled="false" />
								</chart_background>
								<axes>
									<x_axis>
										<title>
											<text><![CDATA[]]></text>
										</title>
										<zero_line>
										</zero_line>
										<axis_markers>
											<ranges>
												<range>
													<xsl:attribute name="minimum">
														<xsl:value-of select="substring(date:date(), 1, 7)" />
													</xsl:attribute>
													<xsl:attribute name="maximum">
														<xsl:value-of select="substring(date:date(), 1, 7)" />
													</xsl:attribute>
												</range>
											</ranges>
										</axis_markers>
										<labels rotation="45" />
									</x_axis>
									<y_axis>
										<labels>
											<format>${%Value}{numDecimals:0}</format>
										</labels>
										<title>
											<text><![CDATA[]]></text>
										</title>
									</y_axis>
								</axes>
								<legend enabled="true" position="Float" anchor="RightBottom" horizontal_padding="10" vertical_padding="10">
									<title enabled="false" />
									<icon>
										<marker enabled="true" type="%MarkerType" size="8" />
									</icon>
								</legend>
								<xsl:call-template name="chartControls" />
							</chart_settings>
							<data_plot_settings default_series_type="Line">
								<line_series>
									<tooltip_settings enabled="true">
										<format>
		Series: {%SeriesName}
		Point Name: {%Name}
		Value: {%YValue}
									</format>
									</tooltip_settings>
								</line_series>
							</data_plot_settings>
							<data>
								<series name="Planned">
									<animation type="SideFromTop" show_mode="OneByOne" />
									<xsl:for-each select="$xAxis">
										<point>
											<xsl:attribute name="name">
												<xsl:value-of select="substring(StartDay, 1, 7)" />
											</xsl:attribute>
											<!-- PLANNED VALUE (PV) = Value of work planned to be accomplished = Budgeted Cost for Work Scheduled (BCWS)-->
											<!-- y = Sum of Work (hours) * the cost per hour for all Tasks due in the current month or earlier -->
											<xsl:variable name="diffRangeLow" select="StartDay/@secsDiff" />
											<xsl:variable name="diffRangeHigh" select="EndDay/@secsDiff" />
											<xsl:variable name="tasksInRange">
												<xsl:for-each select="$tasksData/z:row">
													<xsl:variable name="secsDiff" select="date:seconds(date:difference(date:date(substring-before(@ows_DueDate, ' ')), $eDate))" />
													<xsl:if test="$secsDiff &gt;= $diffRangeHigh" >
														<Task>
														 	<xsl:value-of select="@ows_Work" />
														</Task>
													</xsl:if>
												</xsl:for-each>
											</xsl:variable>
											<xsl:attribute name="y">
												<xsl:value-of select="sum(msxsl:node-set($tasksInRange)/Task) * $costFactor" />
											</xsl:attribute>
											<attributes>
												<attribute name="count">
													<xsl:value-of select="count(msxsl:node-set($tasksInRange)/Task)" />
												</attribute>
											</attributes>
										</point>
									</xsl:for-each>
								</series>
								<series name="Earned Value">
									<animation type="SideFromBottom" show_mode="OneByOne" />
									<xsl:for-each select="$xAxis">
										<point>
											<xsl:attribute name="name">
												<xsl:value-of select="substring(StartDay, 1, 7)" />
											</xsl:attribute>
											<!-- EARNED VALUE (EV) = Value of work accomplished = Budgeted Cost for Work Performed (BCWP) -->
											<!-- y = Sum of Work (hours) * the cost per hour for all Tasks completed in the current month or earlier -->
											<xsl:variable name="diffRangeLow" select="StartDay/@secsDiff" />
											<xsl:variable name="diffRangeHigh" select="EndDay/@secsDiff" />
											<xsl:variable name="tasksInRange">
												<xsl:for-each select="$tasksData/z:row[@ows_Status = 'Completed']">
													<xsl:variable name="secsDiff" select="date:seconds(date:difference(date:date(substring-before(@ows_ActualFinish, ' ')), $eDate))" />
													<xsl:if test="$secsDiff &gt;= $diffRangeHigh" >
														<Task>
														 	<xsl:value-of select="@ows_Work" />
														</Task>
													</xsl:if>
												</xsl:for-each>
											</xsl:variable>
											<xsl:attribute name="y">
												<xsl:value-of select="sum(msxsl:node-set($tasksInRange)/Task) * $costFactor" />
											</xsl:attribute>
											<attributes>
												<attribute name="count">
													<xsl:value-of select="count(msxsl:node-set($tasksInRange)/Task)" />
												</attribute>
											</attributes>
										</point>
									</xsl:for-each>
								</series>
								<series name="Actual Cost">
									<animation type="SideFromRight" show_mode="OneByOne" />
									<xsl:for-each select="$xAxis">
										<point>
											<xsl:attribute name="name">
												<xsl:value-of select="substring(StartDay, 1, 7)" />
											</xsl:attribute>
											<!-- ACTUAL COST (AC) = Cost of work accomplished = Actual Cost of Work Performed (ACWP) -->
											<!-- y = Sum of Actual Work (hours) * the cost per hour for all Tasks completed in the current month or earlier -->
											<xsl:variable name="diffRangeLow" select="StartDay/@secsDiff" />
											<xsl:variable name="diffRangeHigh" select="EndDay/@secsDiff" />
											<xsl:variable name="tasksInRange">
												<xsl:for-each select="$tasksData/z:row[@ows_Status = 'Completed']">
													<xsl:variable name="secsDiff" select="date:seconds(date:difference(date:date(substring-before(@ows_DueDate, ' ')), $eDate))" />
													<xsl:if test="$secsDiff &gt;= $diffRangeHigh" >
														<Task>
														 	<xsl:value-of select="@ows_ActualWork" />
														</Task>
													</xsl:if>
												</xsl:for-each>
											</xsl:variable>
											<xsl:attribute name="y">
												<xsl:value-of select="sum(msxsl:node-set($tasksInRange)/Task) * $costFactor" />
											</xsl:attribute>
											<attributes>
												<attribute name="count">
													<xsl:value-of select="count(msxsl:node-set($tasksInRange)/Task)" />
												</attribute>
											</attributes>
										</point>
									</xsl:for-each>
								</series>
								<!--
								<series name="DA Obl Goal">
									<animation type="SideFromLeft" show_mode="OneByOne" />
									<xsl:for-each select="$xAxis">
										<point>
											<xsl:attribute name="name">
												<xsl:value-of select="substring(StartDay, 1, 7)" />
											</xsl:attribute>
											<xsl:attribute name="y">
												<xsl:value-of select="((position() - 1) div 8) * 10000" />
											</xsl:attribute>
										</point>
									</xsl:for-each>
								</series>
		-->
							</data>
						</chart>
					</charts>
				</xsl:otherwise>
			</xsl:choose>
		</anychart>
	</xsl:template>
	<xsl:template name="buildXaxisArray">
		<xsl:param name="startDayParam" />
		<xsl:param name="endDayParam" />
		<xsl:param name="monthsIncrementParam" />
		<xsl:variable name="startDay" select="$startDayParam" />
		<xsl:variable name="endDay" select="$endDayParam" />
		<xsl:variable name="daysIncrement" select="$monthsIncrementParam" />
		<xsl:variable name="secsDiff" select="date:seconds(date:difference($startDay, $endDay))" />
		<xsl:variable name="daysDiff" select="$secsDiff div (3600*24)" />
		<xsl:choose>
			<xsl:when test="$daysDiff &lt; 0">
			</xsl:when>
			<xsl:otherwise>
				<Date>
					<StartDay>
						<xsl:attribute name="secsDiff">
							<xsl:value-of select="date:seconds(date:difference($startDay, $endDay))" />
						</xsl:attribute>
						<xsl:attribute name="daysDiff">
							<xsl:value-of select="date:seconds(date:difference($startDay, $endDay)) div (3600*24)" />
						</xsl:attribute>
						<xsl:value-of select="$startDay" />
					</StartDay>
					<EndDay>
						<xsl:attribute name="secsDiff">
							<xsl:value-of select="date:seconds(date:difference(date:add(date:add($startDay, 'P1M'), '-P1D' ), $endDay))" />
						</xsl:attribute>
						<xsl:attribute name="daysDiff">
							<xsl:value-of select="date:seconds(date:difference(date:add(date:add($startDay, 'P1M'), '-P1D'), $endDay)) div (3600*24)" />
						</xsl:attribute>
						<xsl:value-of select="date:add(date:add($startDay, 'P1M'), '-P1D')" />
					</EndDay>
					<NextMonthStart>
						<xsl:value-of select="date:add($startDay, 'P1M')" />
					</NextMonthStart>
				</Date>
				<xsl:call-template name="buildXaxisArray">
					<xsl:with-param name="startDayParam" select="date:add($startDay, 'P1M')" />
					<xsl:with-param name="endDayParam" select="$endDay" />
					<xsl:with-param name="monthsIncrementParam" select="$daysIncrement" />
				</xsl:call-template>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="chartControls">
		<controls>
			<label position="Right" align="Near">
				<font size="12" bold="true" family="Monaco" />
				<text>
Time Now Values:
<!--
DA Obligation goal  : <xsl:value-of select="$tnDAOblGoal" />%
-->
% Planned work(PV)  : <xsl:value-of select="$tnPV" />%
% Spent (AC)        : <xsl:value-of select="$tnAC" />%
% Complete (EV)     : <xsl:value-of select="$tnEV" />%
CPI:  <xsl:value-of select="format-number($CPI, '0.000')" />% 	CV:  <xsl:call-template name="formatVariance"><xsl:with-param name="var" select="($CV) div 1000" /></xsl:call-template>
SPI:  <xsl:value-of select="format-number($SPI, '0.000')" />% 	SV:  <xsl:call-template name="formatVariance"><xsl:with-param name="var" select="($SV) div 1000" /></xsl:call-template>
				</text>
			</label>
			<label position="Left" align="Near">
				<font size="12" bold="true" family="Monaco" />
				<text>
<!--
DA: <xsl:value-of select="$DA" /> 
-->
AC: <xsl:value-of select="$AC" /> 
EV: <xsl:value-of select="$EV" />
PV: <xsl:value-of select="$PV" /> 
BCWS: <xsl:value-of select="$BCWS" /> 
BCWP: <xsl:value-of select="$BCWP" />
ACWP: <xsl:value-of select="$ACWP" /> 
CV: <xsl:value-of select="$CV" /> 
CV %: <xsl:value-of select="format-number($CVper, '0.000')" />
SV: <xsl:value-of select="$SV" /> 
SV %: <xsl:value-of select="format-number($SVper, '0.000')" /> 
BAC: <xsl:value-of select="$BAC" />
EAC: <xsl:value-of select="$EAC" /> 
CPI: <xsl:value-of select="format-number($CPI, '0.000')" /> 
SPI: <xsl:value-of select="format-number($SPI, '0.000')" />

Hourly Cost 
Factor: <xsl:value-of select="format-number($costFactor, '0.00')" />
				</text>
			</label>
		</controls>
	</xsl:template>
	<xsl:template name="formatVariance">
		<xsl:param name="var" />
		<xsl:choose>
			<xsl:when test="$var &lt; 0">
				<xsl:text>$(</xsl:text>
				<xsl:value-of select="format-number($var * -1, '###,###,###')" />
				<xsl:text>k)</xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>$</xsl:text>
				<xsl:value-of select="format-number($var, '###,###,###')" />
				<xsl:text>k</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>
