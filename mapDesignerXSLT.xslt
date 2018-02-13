<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html" indent="yes" version="4.0"/>
	<xsl:variable name="MultiDelimiter"><![CDATA[^\d+;#|;#\d+;#|;#]]></xsl:variable>
	<!--Preprocess the map, stages, tools and relationships in a variable to improve performance and ready the data for the true transformation -->
	<xsl:variable name="MapDefs">
		<Maps>
			<xsl:for-each select="NewDataSet/Maps/*/*/*">
				<Map id="{@ows_ID}" title="{@ows_Title}" description="@ows_Description" helpMessage="@ows_HelpMessage">
					<xsl:variable name="thisMapID" select="@ows_ID"/>
					<Stages>
						<xsl:for-each select="//MapStages/*/*/*[@ows_MapID = $thisMapID]">
							<xsl:sort select="@ows_StagePosition"/>
							<xsl:variable name="thisMapStageID" select="@ows_ID"/>
							<xsl:variable name="thisStageID" select="@ows_StageID"/>
							<xsl:variable name="thisStageTollgateFlag" select="@ows_Tollgate"/>
							<Stage id="{@ows_ID}" stageID="{@ows_StageID}" position="{format-number(@ows_StagePosition,'##')}" title="{@ows_Stage}" initial="{//Stages/*/*/*[@ows_ID = $thisStageID]/@ows_Initial}" purpose="{//Stages/*/*/*[@ows_ID = $thisStageID]/@ows_Purpose}" tollgate="{@ows_Tollgate}">
								<Tools>
									<xsl:for-each select="//MapStageTools/*/*/*[@ows_MapStageID = $thisMapStageID]">
										<xsl:sort select="@ows_ToolPosition"/>
										<xsl:variable name="thisToolID" select="@ows_ToolID"/>
										<Tool id="{@ows_ID}" toolID="{@ows_ToolID}" position="{format-number(@ows_ToolPosition,'##')}" title="{//Tools/*/*/*[@ows_ID = $thisToolID]/@ows_Title}" templateURL="{//Tools/*/*/*[@ows_ID = $thisToolID]/@ows_TemplateLocation}" helpURL="{//Tools/*/*/*[@ows_ID = $thisToolID]/@ows_HelpFileLocation}" helpMessage="{//Tools/*/*/*[@ows_ID = $thisToolID]/@ows_HelpMessage}"/>
									</xsl:for-each>
									<xsl:if test="$thisStageTollgateFlag = '1'">
										<Tool id="tg{$thisMapStageID}" toolID="tollgate" position="{count(//MapStageTools/*/*/*[@ows_MapStageID = $thisMapStageID])+1}" title="Tollgate" templateURL="" helpURL="" helpMessage="Tollgate"/>
									</xsl:if>	
								</Tools>
							</Stage>
						</xsl:for-each>
					</Stages>
				</Map>		
			</xsl:for-each>	
		</Maps>	
	</xsl:variable>
	<xsl:template match="/">
		<link href="%SiteURL%/resources/css/mapDesigner.css" rel="stylesheet" type="text/css" />
		<div>
			<div id="sraMapDesignerMenu" class="sra-map-designer-menu">
				<div id="sraMapSelection">
					<select id="sraSelectMaps" name="Maps">
						<option value="0">Select Map</option>
						<xsl:for-each select="$MapDefs/Maps/Map">
							<option value="{@id}"><xsl:value-of select="@title"/></option>
						</xsl:for-each>
						<option value="All">Show All Maps</option>
					</select>
				</div>
			</div>
			<div id="sraMaps">
				<xsl:for-each select="$MapDefs/Maps/Map">
					<div id="map{@id}" class="mapContainer">
						<div class="mapTitle"><xsl:value-of select="@title" disable-output-escaping="yes"/></div>
						<div class="stages">
							<xsl:for-each select="Stages/Stage">
							<div id="stage{@id}" class="cw-sra-tool-row">
								<div class="cw-sra-row-head cw-sra-row-head-font" title="{@title}"><xsl:value-of select="@initial"/></div>
								<xsl:for-each select="Tools/Tool">
									<div id="tool{id}" class="cw-sra-tool active"><xsl:value-of select="@title"/></div>
								</xsl:for-each>
							</div>
							</xsl:for-each>
						</div>
					</div>
				</xsl:for-each>
			</div>
		</div>
		<script src="%SiteURL%/resources/js/mapDesigner.js" type="text/javascript"></script>
	</xsl:template>
</xsl:stylesheet>