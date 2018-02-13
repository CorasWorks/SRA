<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:template match="/">
		<xsl:variable name="ToolLinkUpdates">
			<xsl:for-each select="NewDataSet/*/*/*/*[@ows_TemplateLocation]">
				<![CDATA[<Method ID="A]]><xsl:value-of select="@ows_ID"/><![CDATA[">
					<SetList>%Tools%</SetList>
					<SetVar Name="ID">]]><xsl:value-of select="@ows_ID"/><![CDATA[</SetVar>
					<SetVar Name="Cmd">Save</SetVar>
					<SetVar Name="urn:schemas-microsoft-com:office:office#TemplateLocation">]]><xsl:value-of select="concat('[SRA Root]','/Documents/',tokenize(substring-before(@ows_TemplateLocation,','),'/')[last()])"/><![CDATA[</SetVar>
				</Method>]]>
			</xsl:for-each>	
		</xsl:variable>
		<OperationDefinitionCollection xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
			<Items>
				<OperationDefinition>
					<RequestType>ProcessBatchData</RequestType>
					<ListTitle>Tools</ListTitle>
					<SiteUrl>[SRA Root]</SiteUrl>
					<Batch>
						<![CDATA[<ows:Batch OnError="Return">]]>
							<xsl:copy-of select="$ToolLinkUpdates"/>
						<![CDATA[</ows:Batch>]]>
					</Batch>
				</OperationDefinition>
			</Items>
		</OperationDefinitionCollection>		
	</xsl:template>
</xsl:stylesheet>