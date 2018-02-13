<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:variable name="MultiDelimiter"><![CDATA[^\d+;#|;#\d+;#|;#]]></xsl:variable>
	<xsl:variable name="MapDefs">
		<Maps>
			<xsl:for-each select="NewDataSet/Maps/*/*/*">
				<xsl:sort select="@ows_Title"/>
				<Map id="{@ows_ID}" title="{@ows_Title}" description="@ows_Description" helpMessage="@ows_HelpMessage">
					<xsl:variable name="thisMapID" select="@ows_ID"/>
					<Stages ItemCount="{count(//MapStages/*/*/*[@ows_MapID = $thisMapID])}">
						<xsl:for-each select="//MapStages/*/*/*[@ows_MapID = $thisMapID]">
							<xsl:sort select="@ows_StagePosition" data-type="number" />
							<xsl:variable name="thisMapStageID" select="@ows_ID"/>
							<xsl:variable name="thisStageID" select="@ows_StageID"/>
							<xsl:variable name="thisStageTollgateFlag" select="@ows_Tollgate"/>
							<Stage id="{@ows_ID}" stageID="{@ows_StageID}" position="{format-number(@ows_StagePosition,'##')}" title="{@ows_Stage}" initial="{//Stages/*/*/*[@ows_ID = $thisStageID]/@ows_Initial}" purpose="{//Stages/*/*/*[@ows_ID = $thisStageID]/@ows_Purpose}" tollgate="{@ows_Tollgate}">
								<Tools ItemCount="{count(//ProjectMap/*/*/*[@ows_MapStageID = $thisMapStageID])}">
									<xsl:for-each select="//ProjectMap/*/*/*[@ows_MapStageID = $thisMapStageID]">
										<xsl:sort data-type="number" select="@ows_ToolPosition"/>
										<xsl:variable name="thisToolID" select="@ows_ToolID"/>
										<Tool id="{@ows_ID}" purpose="{//Tools/*/*/*[@ows_ID = $thisToolID]/@ows_Purpose}" toolID="{@ows_ToolID}" position="{format-number(@ows_ToolPosition,'##')}" title="{//Tools/*/*/*[@ows_ID = $thisToolID]/@ows_Title}" templateURL="{substring-before(//Tools/*/*/*[@ows_ID = $thisToolID]/@ows_TemplateLocation,',')}" helpURL="{substring-before(//Tools/*/*/*[@ows_ID = $thisToolID]/@ows_HelpFileLocation,',')}" helpMessage="{//Tools/*/*/*[@ows_ID = $thisToolID]/@ows_HelpMessage}" status="{@ows_Status}"/>
									</xsl:for-each>
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