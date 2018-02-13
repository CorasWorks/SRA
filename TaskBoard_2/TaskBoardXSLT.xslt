<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet
	version="2.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:xs="http://www.w3.org/2001/XMLSchema"
	xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/"
	xmlns:rs="urn:schemas-microsoft-com:rowset"
	xmlns:z="#RowsetSchema"
	exclude-result-prefixes="xs cw rs z">
  <xsl:output omit-xml-declaration="yes"/>
  <xsl:variable name="MultiDelimiter"><![CDATA[^\d+;#|;#\d+;#|;#]]></xsl:variable>
  <xsl:template match="/">
    <NewDataSet>
      <Tasks>
        <xsl:for-each select="/NewDataSet/Tasks/*/*/*">
          <Task>
          <ows_ID>
          <xsl:value-of select="@ows_ID" />
          </ows_ID>
            <ows_Title>
              <xsl:value-of select="if(@ows_Title) then @ows_Title else 'No Title'" />
            </ows_Title>
            <ows_Priority>
              <xsl:value-of select="@ows_Priority"/>
            </ows_Priority>
            <ows_Status>
              <xsl:value-of select="@ows_Status"/>
            </ows_Status>
            <ows_StartDate>
              <xsl:value-of select="@ows_StartDate"/>
            </ows_StartDate>
            <ows_DueDate>
              <xsl:value-of select="@ows_DueDate"/>
            </ows_DueDate>
            <ows_ActualStart>
            	<xsl:value-of select="@ows_ActualStart" />
            </ows_ActualStart>
            <ows_ActualFinish>
            	<xsl:value-of select="@ows_ActualFinish" />
            </ows_ActualFinish>            
            <ows_Predecessors>
              <xsl:value-of select="@ows_Predecessors"/>
            </ows_Predecessors>
            <ows_AssignedTo>
            	<xsl:value-of select="@ows_AssignedTo"/>
            </ows_AssignedTo>
            <ows_Work>
              <xsl:value-of select="@ows_Work"/>
            </ows_Work>
            <ows_ActualWork>
              	<xsl:choose>
	            	<xsl:when test="@ows_ActualWork">
	            		<xsl:value-of select="@ows_ActualWork"/>
	            	</xsl:when>
	            	<xsl:otherwise>
	            		<xsl:text>0</xsl:text>
	            	</xsl:otherwise>
	            </xsl:choose> 
            </ows_ActualWork>
			<ows_IsSummaryTask>
				<xsl:value-of select="@ows_IsSummaryTask"/>
			</ows_IsSummaryTask>
            <ows_PercentComplete>
              <xsl:value-of select="@ows_PercentComplete"/>
            </ows_PercentComplete>
            <ows_Description>
            	<xsl:value-of select="@ows_Description" />
            </ows_Description>
          </Task>
        </xsl:for-each>
      </Tasks>
      <ProjectDetails>
        <xsl:for-each select="/NewDataSet/ProjectDetails/listitems/rs:data/z:row">
          <xsl:copy-of select="." />
        </xsl:for-each>
      </ProjectDetails>
      <xsl:copy-of select="/NewDataSet/TasksMetadata" />
    </NewDataSet>
  </xsl:template>


</xsl:stylesheet>
