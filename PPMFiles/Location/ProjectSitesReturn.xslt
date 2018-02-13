<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:template match="/">
		<OperationDefinitionCollection>
			<Items>
			<xsl:for-each select="//Locations/cw:listitems/rs:data/z:row">
				<OperationDefinition>
					<RequestType>GetListItems</RequestType>
					<TableName>Projects</TableName>
					<ListTitle>Projects</ListTitle>
					<CAML><![CDATA[<Query><Where>
								<Eq><FieldRef Name='Location' /><Value Type='Text'>]]><xsl:value-of select="@ows_Title"/><![CDATA[</Value></Eq>
							</Where></Query><QueryOptions><DateInUtc>False</DateInUtc></QueryOptions>]]></CAML>	
					<SiteUrl>[SRA Root]</SiteUrl>
					<XsltLocation>[SRA Root]/Resources/PPMFiles/Location/ProjectSitesIssues.xslt</XsltLocation>
					<OutputType>redirect</OutputType>
				</OperationDefinition>
			</xsl:for-each>
			</Items>	
		</OperationDefinitionCollection>
	</xsl:template>
</xsl:stylesheet>