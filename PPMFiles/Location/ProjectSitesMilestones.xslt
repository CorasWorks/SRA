﻿<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:template match="/">
		<OperationDefinitionCollection>
			<Items>
				<xsl:for-each select="//Projects/cw:listitems/rs:data/z:row">
					<OperationDefinition>
						<RequestType>GetListItems</RequestType>
						<TableName>Milestones</TableName>
						<ListTitle>Milestones</ListTitle>
						<SiteUrl><xsl:value-of select="@ows_URL"/></SiteUrl>
						<CAML><![CDATA[
							<OrderBy>
								<FieldRef Name="StagePosition"/>
							</OrderBy>
							<ViewFields>
								<FieldRef Name="ID"/>
								<FieldRef Name="TargetDate"/>
								<FieldRef Name="ActualDate"/>
								<FieldRef Name="Title"/>
								<FieldRef Name="StagePosition"/>								
								<FieldRef Name="Complete"/>
							</ViewFields>
							<QueryOptions>
								<ViewFieldsOnly>True</ViewFieldsOnly>
								<DatesInUtc>True</DatesInUtc>
							</QueryOptions>	
							]]>
						</CAML>
					</OperationDefinition>
				</xsl:for-each>
				<OperationDefinition>
					<RequestType>GetListItems</RequestType>
					<TableName>Projects</TableName>
					<ListTitle>Projects</ListTitle>
					<CAML><![CDATA[<Query>
							<OrderBy>
							  <FieldRef Name="ID"/>
							</OrderBy>			
							<Where>
								<Contains><FieldRef Name='URL' /><Value Type='Text'>%ISiteURL%/</Value></Contains>			
							</Where></Query><QueryOptions><DateInUtc>False</DateInUtc></QueryOptions>]]></CAML>	
					<SiteUrl>[SRA Root]</SiteUrl>
				</OperationDefinition>
				<OperationDefinition>
					<RequestType>GetListItems</RequestType>
					<TableName>Colors</TableName>
					<ListTitle>Colors</ListTitle>
					<CAML><![CDATA[<Query>
							<OrderBy>
							  <FieldRef Name="ID"/>
							</OrderBy>
							<Where>
								<Eq><FieldRef Name="Active"/><Value Type="Boolean">1</Value></Eq>
							</Where>			
							</Query><QueryOptions><DateInUtc>False</DateInUtc></QueryOptions>]]></CAML>	
					<SiteUrl>[SRA Root]</SiteUrl>	
				</OperationDefinition>
			</Items>	
		</OperationDefinitionCollection>
	</xsl:template>
</xsl:stylesheet>