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
		<NewDataSet>
			<xsl:for-each select="//NewDataSet/Meetings">
				<xsl:variable name="projectSiteURL" select="@SiteUrl" />
				<xsl:variable name="projectSiteTitle" select="//NewDataSet/SiteDirectory/cw:listitems/rs:data/z:row[@ows_URL = $projectSiteURL]/@ows_Title" />
				<xsl:for-each select="cw:listitems/rs:data/z:row">
					<xsl:element name="MeetingsItem">
						<MeetingId><xsl:value-of select="@ows_ID" /></MeetingId>
						<MeetingTitle>
							<xsl:value-of select="@ows_Title" />
							<xsl:text> [</xsl:text>
							<xsl:value-of select="@ows_ID" />
							<xsl:text>] </xsl:text>
						</MeetingTitle>
						<MeetingItem>
							<xsl:value-of select="@ows_Title" />
						</MeetingItem>
						<MeetingSortOrder><xsl:text>1</xsl:text></MeetingSortOrder>
						<MeetingItemType><xsl:text>Meeting</xsl:text></MeetingItemType>
						<ProjectSiteURL><xsl:value-of select="$projectSiteURL" /></ProjectSiteURL>
						<ProjectSiteTitle><xsl:value-of select="$projectSiteTitle" /></ProjectSiteTitle>
						<xsl:for-each select="@*">
							<xsl:choose>
								<xsl:when test="contains(name(), 'ows_')">
									<xsl:element name="{substring-after(name(), 'ows_')}">
										<xsl:value-of select="."/>
									</xsl:element>
								</xsl:when>
								<xsl:otherwise>
									<xsl:element name="{name()}">
										<xsl:value-of select="."/>
									</xsl:element>
								</xsl:otherwise> 
							</xsl:choose>
						</xsl:for-each>
						<xsl:apply-templates select="*|text()"/>
					</xsl:element>
				</xsl:for-each>
			</xsl:for-each>
			<xsl:for-each select="//NewDataSet/MeetingActionItems">
				<xsl:variable name="projectSiteURL" select="@SiteUrl" />
				<xsl:variable name="projectSiteTitle" select="//NewDataSet/SiteDirectory/cw:listitems/rs:data/z:row[@ows_URL = $projectSiteURL]/@ows_Title" />
				<xsl:for-each select="cw:listitems/rs:data/z:row">
					<xsl:element name="MeetingsItem">
						<MeetingId><xsl:value-of select="substring-before(@ows_Meeting, ';#')" /></MeetingId>
						<MeetingTitle>
							<xsl:value-of select="substring-after(@ows_Meeting, ';#')" />
							<xsl:text> [</xsl:text>
							<xsl:value-of select="substring-before(@ows_Meeting, ';#')" />
							<xsl:text>] </xsl:text>
						</MeetingTitle>
						<MeetingItem>
							<xsl:value-of select="@ows_Title" />
						</MeetingItem>
						<MeetingSortOrder><xsl:text>2</xsl:text></MeetingSortOrder>
						<MeetingItemType><xsl:text>Meeting Action Item</xsl:text></MeetingItemType>
						<ProjectSiteURL><xsl:value-of select="$projectSiteURL" /></ProjectSiteURL>
						<ProjectSiteTitle><xsl:value-of select="$projectSiteTitle" /></ProjectSiteTitle>
						<xsl:for-each select="@*">
							<xsl:choose>
								<xsl:when test="contains(name(), 'ows_')">
									<xsl:element name="{substring-after(name(), 'ows_')}">
										<xsl:value-of select="."/>
									</xsl:element>
								</xsl:when>
								<xsl:otherwise>
									<xsl:element name="{name()}">
										<xsl:value-of select="."/>
									</xsl:element>
								</xsl:otherwise> 
							</xsl:choose>
						</xsl:for-each>
						<xsl:apply-templates select="*|text()"/>
					</xsl:element>
				</xsl:for-each>
			</xsl:for-each>
			<xsl:for-each select="//NewDataSet/MeetingDocuments">
				<xsl:variable name="projectSiteURL" select="@SiteUrl" />
				<xsl:variable name="projectSiteTitle" select="//NewDataSet/SiteDirectory/cw:listitems/rs:data/z:row[@ows_URL = $projectSiteURL]/@ows_Title" />
				<xsl:for-each select="cw:listitems/rs:data/z:row">
					<xsl:element name="MeetingsItem">
						<MeetingId><xsl:value-of select="substring-before(@ows_Meeting, ';#')" /></MeetingId>
						<MeetingTitle>
							<xsl:value-of select="substring-after(@ows_Meeting, ';#')" />
							<xsl:text> [</xsl:text>
							<xsl:value-of select="substring-before(@ows_Meeting, ';#')" />
							<xsl:text>] </xsl:text>
						</MeetingTitle>
						<MeetingItem>
							<xsl:value-of select="@ows_LinkFilename" />
						</MeetingItem>
						<MeetingSortOrder><xsl:text>3</xsl:text></MeetingSortOrder>
						<MeetingItemType><xsl:text>Meeting Document</xsl:text></MeetingItemType>
						<ProjectSiteURL><xsl:value-of select="$projectSiteURL" /></ProjectSiteURL>
						<ProjectSiteTitle><xsl:value-of select="$projectSiteTitle" /></ProjectSiteTitle>
						<xsl:for-each select="@*">
							<xsl:choose>
								<xsl:when test="contains(name(), 'ows_')">
									<xsl:element name="{substring-after(name(), 'ows_')}">
										<xsl:value-of select="."/>
									</xsl:element>
								</xsl:when>
								<xsl:otherwise>
									<xsl:element name="{name()}">
										<xsl:value-of select="."/>
									</xsl:element>
								</xsl:otherwise> 
							</xsl:choose>
						</xsl:for-each>
						<xsl:apply-templates select="*|text()"/>
					</xsl:element>
				</xsl:for-each>
			</xsl:for-each>
		</NewDataSet>
	</xsl:template>
</xsl:stylesheet>