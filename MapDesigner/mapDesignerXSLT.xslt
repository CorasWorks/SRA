<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:variable name="MultiDelimiter"><![CDATA[^\d+;#|;#\d+;#|;#]]></xsl:variable>

	
<!--Preprocess the map, stages, tools and relationships in a variable to improve performance and ready the data for the true transformation -->

	<xsl:variable name="MapDefs">
		<Maps>
			<xsl:for-each select="NewDataSet/Maps/*/*/*">
				<Map id="{@ows_ID}" title="{@ows_Title}" active="{@ows_Active}" description="{@ows_Description}" helpMessage="{@ows_HelpMessage}">
					<xsl:variable name="thisMapID" select="@ows_ID"/>
					<Stages>
						<xsl:for-each select="//MapStages/*/*/*[@ows_MapID = $thisMapID]">
							<xsl:sort select="@ows_StagePosition"/>
							<xsl:variable name="thisMapStageID" select="@ows_ID"/>
							<xsl:variable name="thisStageID" select="@ows_StageID"/>
							<xsl:variable name="thisStageTollgateFlag" select="@ows_Tollgate"/>
							<Stage id="{@ows_ID}" stageID="{@ows_StageID}" position="{format-number(@ows_StagePosition,'##')}" title="{@ows_Stage}" initial="{//Stages/*/*/*[@ows_ID = $thisStageID]/@ows_Initial}" purpose="{//Stages/*/*/*[@ows_ID = $thisStageID]/@ows_Purpose}" keyQuestions="{@ows_KeyQuestions2}" deliverables="{@ows_Deliverables2}" tollgate="{@ows_Tollgate}">
								<Tools>
									<xsl:for-each select="//MapStageTools/*/*/*[@ows_MapStageID = $thisMapStageID]">
										<xsl:sort data-type="number" select="@ows_ToolPosition"/>
										<xsl:variable name="thisToolID" select="@ows_ToolID"/>
										<Tool id="{@ows_ID}" toolID="{@ows_ToolID}" position="{format-number(@ows_ToolPosition,'##')}" title="{//Tools/*/*/*[@ows_ID = $thisToolID]/@ows_Title}" templateURL="{//Tools/*/*/*[@ows_ID = $thisToolID]/@ows_TemplateLocation}" helpURL="{//Tools/*/*/*[@ows_ID = $thisToolID]/@ows_HelpFileLocation}" helpMessage="{//Tools/*/*/*[@ows_ID = $thisToolID]/@ows_HelpMessage}"/>
									</xsl:for-each>
									<!--
									<xsl:if test="$thisStageTollgateFlag = '1'">
										<Tool id="tg{$thisMapStageID}" toolID="tollgate" position="{count(//MapStageTools/*/*/*[@ows_MapStageID = $thisMapStageID])+1}" title="Tollgate" templateURL="" helpURL="" helpMessage="Tollgate"/>
									</xsl:if>
									-->
								</Tools>
							</Stage>
						</xsl:for-each>
					</Stages>
				</Map>		
			</xsl:for-each>	
		</Maps>	
	</xsl:variable>

	<xsl:template match="/">
		<xsl:copy-of select="$MapDefs"/>

	</xsl:template>
</xsl:stylesheet>