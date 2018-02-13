<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:msxsl="urn:schemas-microsoft-com:xslt" 
	xmlns:date="http://exslt.org/dates-and-times"
	xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/"
	xmlns:rs="urn:schemas-microsoft-com:rowset"
	xmlns:z="#RowsetSchema"
	exclude-result-prefixes="msxsl date cw rs z">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="/">
		<xsl:choose>
			<xsl:when test="//NewDataSet/Risks/cw:listitems/rs:data/@ItemCount = 0">
				<anychart>
					<charts>
						<chart plot_type="Pie">
							<chart_settings>
								<title>
									<text>No risk data to display</text>
									<font family="Verdana" size="14" />
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
					<settings>
						<animation enabled="True"/>
						<type>Scatter</type>
					</settings>
					<charts>
						<chart plot_type="Scatter">
							<chart_settings>
								<legend enabled="True" position="Top" align="Spread" elements_align="Center">
									<font family="Verdana" />
									<title enabled="False"/>
									<background enabled="False"/>
								</legend>
								<title>
									<text>Risks - Probability and Impact</text>
									<font family="Verdana" />
								</title>
								<axes>
									<y_axis>
										<scale minimum="0.8" maximum="5.2"/>
										<labels>
											<format>{%Value}{numDecimals:0}</format>
										</labels>
										<title>
											<text>Impact Level</text>
											<font family="Verdana" />
										</title>
									</y_axis>
									<x_axis>
										<title>
											<text>Probablity</text>
											<font family="Verdana" />
										</title>
										<scale minimum="0" maximum="100" major_interval="20"/>
										<labels>
											<format>{%Value}{numDecimals:0}%</format>
										</labels>
										<axis_markers>
											<ranges>
												<range minimum="0" maximum="20">
													<minimum_line enabled="False"/>
													<maximum_line enabled="False"/>
													<label enabled="True">
														<font bold="True" family="Verdana" />
														<format>Very Low (1-20%)</format>
													</label>
												</range>
												<range minimum="20" maximum="40">
													<minimum_line enabled="False"/>
													<maximum_line enabled="False"/>
													<label enabled="True" multi_line_align="Center">
														<font bold="True" family="Verdana" />
														<format>Low (21-40%)</format>
													</label>
												</range>
												<range minimum="40" maximum="60">
													<minimum_line enabled="False"/>
													<maximum_line enabled="False"/>
													<label enabled="True" multi_line_align="Center">
														<font bold="True" family="Verdana" />
														<format>Moderate (41-60%)</format>
													</label>
												</range>
												<range minimum="60" maximum="80">
													<minimum_line enabled="False"/>
													<maximum_line enabled="False"/>
													<label enabled="True" multi_line_align="Center">
														<font bold="True" family="Verdana" />
														<format>High (61-80%)</format>
													</label>
												</range>
												<range minimum="80" maximum="100">
													<minimum_line enabled="False"/>
													<maximum_line enabled="False"/>
													<label enabled="True" multi_line_align="Center">
														<font bold="True" family="Verdana" />
														<format>Very High (81-100%)</format>
													</label>
												</range>
												<range minimum="0" maximum="100">
													<fill type="Gradient" opacity=".75">
														<gradient angle="315" focal_point="1">
															<key position="0" color="Green"/>
															<key position="0.5" color="Yellow"/>
															<key position="1" color="Red"/>
														</gradient>
													</fill>
												</range>
											</ranges>
										</axis_markers>
									</x_axis>
								</axes>
							</chart_settings>
							<data_plot_settings>
								<marker_series>
									<tooltip_settings enabled="True">
										<format>RISK - {%Name} Impact Level: {%YValue}{numDecimals:0} Probability: {%XValue}{numDecimals:0}%</format>
										<font family="Verdana" />
									</tooltip_settings>
									<marker_style>
										<marker size="8" />
										<states>
											<hover color="White">
												<marker size="12" />
											</hover>
										</states>
									</marker_style>
								</marker_series>
							</data_plot_settings>
							<data>
								<actions>
									<action type="call" function="clickChartItemView">
										<arg>Risk</arg>
										<arg>{%SiteURL}</arg>
										<arg>{%ListId}</arg>
										<arg>{%UniqueId}</arg>
										<arg>[PPM v3.2]/Actions%20Library/ViewRisk.cwad</arg>
									</action>
								</actions>
									<series type="Marker" name="Risks">
										<xsl:for-each select="//NewDataSet/Risks/cw:listitems/rs:data/z:row">
											<point>
												<xsl:attribute name="x">
									  				<xsl:value-of select="@ows_Probability"/>
									  			</xsl:attribute>
												<xsl:attribute name="y">
									  				<xsl:value-of select="@ows_Impact"/>
									  			</xsl:attribute>
												<xsl:attribute name="name">
									  				<xsl:value-of select="@ows_Title"/>
									  			</xsl:attribute>
									  			<attributes>
									  				<attribute name="SiteURL">
									  					<xsl:value-of select="../../../@SiteUrl" />
									  				</attribute>
									  				<attribute name="ListId">
									  					<xsl:value-of select="substring-after(substring-before(//NewDataSet/RisksMetadata/cw:List/@ID, '}'), '{')" />
									  				</attribute>
									  				<attribute name="UniqueId">
									  					<xsl:value-of select="substring-after(@ows_UniqueId, ';#')" />
									  				</attribute>
									  			</attributes>
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
</xsl:stylesheet>