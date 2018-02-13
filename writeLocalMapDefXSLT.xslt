<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:variable name="thisMapID" select="NewDataSet/Projects/*/*/*/@ows_MapID"/>
	<xsl:variable name="deleteExistingTools">
		<xsl:for-each select="NewDataSet/LocalMap/*/*/*">
			<xsl:sort select="@ows_ID"/>
			<![CDATA[<Method ID="A]]><xsl:value-of select="@ows_ID"/><![CDATA[">
				<SetList>%Map%</SetList>
				<SetVar Name="ID">]]><xsl:value-of select="@ows_ID"/><![CDATA[</SetVar>
				<SetVar Name="Cmd">Delete</SetVar>
			</Method>]]>
		</xsl:for-each>
	</xsl:variable>
	<xsl:variable name="writeNewTools">
		<xsl:for-each select="NewDataSet/MapStages/*/*/*[@ows_MapID = $thisMapID]">
			<xsl:sort select="@ows_StagePosition"/>
			<xsl:variable name="thisMapStageID" select="@ows_ID"/>
			<xsl:for-each select="//NewDataSet/MapStageTools/*/*/*[@ows_MapStageID = $thisMapStageID]">
				<xsl:sort select="@ows_ToolPosition"/>
				<xsl:variable name="methodID" select="concat($thisMapStageID,'-',@ows_ToolID)"/>
				<![CDATA[<Method ID="B]]><xsl:value-of select="$methodID"/><![CDATA[">
					<SetList>%Map%</SetList>
					<SetVar Name="ID">New</SetVar>
					<SetVar Name="Cmd">Save</SetVar>
					<SetVar Name="urn:schemas-microsoft-com:office:office#MapStageID">]]><xsl:value-of select="$thisMapStageID"/><![CDATA[</SetVar>
					<SetVar Name="urn:schemas-microsoft-com:office:office#ToolID">]]><xsl:value-of select="@ows_ToolID"/><![CDATA[</SetVar>
					<SetVar Name="urn:schemas-microsoft-com:office:office#ToolPosition">]]><xsl:value-of select="@ows_ToolPosition"/><![CDATA[</SetVar>
				</Method>]]>
			</xsl:for-each>
		</xsl:for-each>
	</xsl:variable>
	<xsl:variable name="deleteExistingMilestones">
		<xsl:for-each select="NewDataSet/LocalMilestones/*/*/*">
			<xsl:sort select="@ows_ID"/>
			<![CDATA[<Method ID="C]]><xsl:value-of select="@ows_ID"/><![CDATA[">
				<SetList>%Milestones%</SetList>
				<SetVar Name="ID">]]><xsl:value-of select="@ows_ID"/><![CDATA[</SetVar>
				<SetVar Name="Cmd">Delete</SetVar>
			</Method>]]>
		</xsl:for-each>
	</xsl:variable>
	<xsl:variable name="writeNewMilestones">
			<![CDATA[<Method ID="D0">
				<SetList>%Milestones%</SetList>
				<SetVar Name="ID">New</SetVar>
				<SetVar Name="Cmd">Save</SetVar>
				<SetVar Name="urn:schemas-microsoft-com:office:office#Title">Team Launch</SetVar>
				<SetVar Name="urn:schemas-microsoft-com:office:office#StagePosition">0</SetVar>
			</Method>]]>
		<xsl:for-each select="NewDataSet/MapStages/*/*/*[@ows_MapID = $thisMapID and @ows_Tollgate = '1']">
			<xsl:sort select="@ows_StagePosition"/>
			<![CDATA[<Method ID="D]]><xsl:value-of select="@ows_ID"/><![CDATA[">
				<SetList>%Milestones%</SetList>
				<SetVar Name="ID">New</SetVar>
				<SetVar Name="Cmd">Save</SetVar>
				<SetVar Name="urn:schemas-microsoft-com:office:office#Title">]]><xsl:value-of select="@ows_Stage"/><![CDATA[</SetVar>
				<SetVar Name="urn:schemas-microsoft-com:office:office#StagePosition">]]><xsl:value-of select="@ows_StagePosition"/><![CDATA[</SetVar>
				<SetVar Name="urn:schemas-microsoft-com:office:office#MapStageID">]]><xsl:value-of select="@ows_ID"/><![CDATA[</SetVar>
				<SetVar Name="urn:schemas-microsoft-com:office:office#StageID">]]><xsl:value-of select="@ows_StageID"/><![CDATA[</SetVar>
			</Method>]]>
		</xsl:for-each>
	</xsl:variable>
	


	<xsl:template match="/">
		<OperationDefinitionCollection xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
			<Items>
				<OperationDefinition>
					<RequestType>ProcessBatchData</RequestType>
					<ListTitle>Map</ListTitle>
					<SiteUrl>%SiteURL%</SiteUrl>
					<Batch>
						<![CDATA[<ows:Batch OnError="Return">]]>
							<xsl:copy-of select="$deleteExistingTools"/>
							<xsl:copy-of select="$writeNewTools"/>
						<![CDATA[</ows:Batch>]]>
					</Batch>
				</OperationDefinition>
				<OperationDefinition>
					<RequestType>ProcessBatchData</RequestType>
					<ListTitle>Milestones</ListTitle>
					<SiteUrl>%SiteURL%</SiteUrl>
					<Batch>
						<![CDATA[<ows:Batch OnError="Return">]]>
							<xsl:copy-of select="$deleteExistingMilestones"/>
							<xsl:copy-of select="$writeNewMilestones"/>
						<![CDATA[</ows:Batch>]]>
					</Batch>
				</OperationDefinition>
			</Items>
		</OperationDefinitionCollection>											
	</xsl:template>
</xsl:stylesheet>


