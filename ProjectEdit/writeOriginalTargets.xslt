<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:variable name="thisMapID" select="NewDataSet/Projects/*/*/*/@ows_MapID"/>
	<xsl:variable name="writeOriginalTargetValues">
		<xsl:for-each select="NewDataSet/*/*/*/*">
			<![CDATA[<Method ID="A]]><xsl:value-of select="@ows_ID"/><![CDATA[">
				<SetList>%Milestones%</SetList>
				<SetVar Name="ID">]]><xsl:value-of select="@ows_ID"/><![CDATA[</SetVar>
				<SetVar Name="Cmd">Save</SetVar>
				<SetVar Name="urn:schemas-microsoft-com:office:office#OriginalTargetDate">]]><xsl:value-of select="@ows_TargetDate"/><![CDATA[</SetVar>
			</Method>]]>
		</xsl:for-each>
	</xsl:variable>
	


	<xsl:template match="/">
		<OperationDefinitionCollection xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
			<Items>
				<OperationDefinition>
					<RequestType>ProcessBatchData</RequestType>
					<ListTitle>Milestones</ListTitle>
					<SiteUrl>%SiteURL%</SiteUrl>
					<Batch>
						<![CDATA[<ows:Batch OnError="Return">]]>
							<xsl:copy-of select="$writeOriginalTargetValues"/>
						<![CDATA[</ows:Batch>]]>
					</Batch>
				</OperationDefinition>
				<OperationDefinition>
					<RequestType>ProcessBatchData</RequestType>
					<ListTitle>Projects</ListTitle>
					<SiteUrl>[SRA Root]</SiteUrl>
					<Batch>
						<![CDATA[
							<ows:Batch OnError="Return">
								<Method ID="A2">
									<SetList>%Projects%</SetList>
									<SetVar Name="ID">%ProjectID%</SetVar><SetVar Name="Cmd">Save</SetVar>
									<SetVar Name="urn:schemas-microsoft-com:office:office#ProjectStatus">%ProjectStatus%</SetVar>
									<SetVar Name="urn:schemas-microsoft-com:office:office#_x002a__x002a__x002a_wplu_x002a_2">&lt;![CDATA[<Properties><Property><LookupKeyValue></LookupKeyValue><LookupLinkValue></LookupLinkValue><LookupDbStoreValue>%ProjectStatus%</LookupDbStoreValue><LookupDisplayValue>%ProjectStatus%</LookupDisplayValue></Property></Properties>]]&gt;</SetVar>
								</Method>
							</ows:Batch>]]>
					</Batch>					
				</OperationDefinition>
			</Items>
		</OperationDefinitionCollection>												
	</xsl:template>
</xsl:stylesheet>