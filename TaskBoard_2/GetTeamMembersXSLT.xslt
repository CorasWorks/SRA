<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
  <xsl:variable name="MultiDelimiter"><![CDATA[^\d+;#|;#\d+;#|;#]]></xsl:variable>
  <xsl:template match="/NewDataSet">
    <TeamMembers>
      <xsl:for-each select="*/*/*/*">
        <xsl:if test="@ows_Role != 'SiteLevelApprover'">
          <TeamMember>
            <SharePointUser>
              <xsl:value-of select="substring-after(@ows_SharePointUser, ';#')" />
            </SharePointUser>
            <SharePointUserID>
              <xsl:value-of select="substring-before(@ows_SharePointUser, ';#')" />
            </SharePointUserID>
            <xsl:apply-templates select="@ows_Role"/>
            <Editor>
              <xsl:value-of select="@ows_Editor0" />
            </Editor>
            <xsl:apply-templates select="@ows_ID"/>
          </TeamMember>
        </xsl:if>
      </xsl:for-each>
    </TeamMembers>
  </xsl:template>
  
  <xsl:template match="z:row/@*">
    <xsl:element name="{substring-after(name(), 'ows_')}">
      <xsl:value-of select="."/>
    </xsl:element>
  </xsl:template>
  
  
</xsl:stylesheet>

