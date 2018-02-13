<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:variable name="updateMapStageTools">
		<xsl:for-each select="NewDataSet/MapStages/*/*/*">
			<xsl:variable name="thisMapStageID" select="@ows_ID"/>
			<xsl:variable name="thisMapID" select="@ows_MapID"/>
			<xsl:variable name="thisStageID" select="@ows_StageID"/>
			<xsl:for-each select="//NewDataSet/MapStageTools/*/*/*[@ows_MapStageID = $thisMapStageID]">
				<![CDATA[<Method ID="A]]><xsl:value-of select="@ows_ID"/><![CDATA[">
					<SetList>%MapStageTools%</SetList>
					<SetVar Name="ID">]]><xsl:value-of select="@ows_ID"/><![CDATA[</SetVar>
					<SetVar Name="Cmd">Save</SetVar>
					<SetVar Name="urn:schemas-microsoft-com:office:office#StageID">]]><xsl:value-of select="$thisStageID"/><![CDATA[</SetVar>
					<SetVar Name="urn:schemas-microsoft-com:office:office#MapID">]]><xsl:value-of select="$thisMapID"/><![CDATA[</SetVar>
				</Method>]]>
			</xsl:for-each>
		</xsl:for-each>
	</xsl:variable>
	<xsl:template match="/">
		<OperationDefinitionCollection xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
			<Items>
				<OperationDefinition>
					<RequestType>ProcessBatchData</RequestType>
					<ListTitle>MapStageTools</ListTitle>
					<SiteUrl>[SRA Root]</SiteUrl>
					<Batch>
						<![CDATA[<ows:Batch OnError="Return">]]>
							<xsl:copy-of select="$updateMapStageTools"/>
						<![CDATA[</ows:Batch>]]>
					</Batch>
				</OperationDefinition>
			</Items>
		</OperationDefinitionCollection>											
	</xsl:template>
</xsl:stylesheet>


