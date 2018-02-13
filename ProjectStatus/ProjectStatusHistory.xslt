<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">

	<xsl:variable name="ProjectKeys">
		<ProjectID><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_ID"/></ProjectID>
		<KeyAccomplishments><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_KeyAccomplishments"/></KeyAccomplishments>
		<KeyUpcomingEvents><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_KeyUpcomingEvents"/></KeyUpcomingEvents>
		<KeyRisksIssues><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_KeyRisksIssues"/></KeyRisksIssues>
		<ProjectStatus><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_ProjectStatus"/></ProjectStatus>
		<xsl:variable name="thisLevel" select="NewDataSet/Projects/*/*/*/@ows_ProjectStatusKPI"></xsl:variable>
		<KPI levelID="{$thisLevel}" leveltitle="{//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Title}" icon="{substring-before(//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Image,',')}" color="{//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Color}" code="{//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Code}" level="{format-number(//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_SortOrder,'#')}"></KPI>						
	</xsl:variable>
	<xsl:variable name="ProjectKPIs">
		<xsl:for-each select="//NewDataSet/ProjectStatusKPIs/*/*/*">
			<xsl:variable name="thisKPI" select="@ows_ProjectKPICategory"/>
			<xsl:variable name="thisLevel" select="@ows_ProjectKPILevel"/>
			<KPI kpiID="{@ows_ID}" categoryID="{//NewDataSet/KPICategories/*/*/*[@ows_ID = $thisKPI]/@ows_ID}" levelID="{//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_ID}" leveltitle="{//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Title}" icon="{substring-before(//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Image,',')}" color="{//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Color}" code="{//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Code}" level="{format-number(//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_SortOrder,'#')}" lock="{//NewDataSet/KPICategories/*/*/*[@ows_ID = $thisKPI]/@ows_Default}"><xsl:value-of select="//NewDataSet/KPICategories/*/*/*[@ows_ID = $thisKPI]/@ows_Title"/></KPI>				
		</xsl:for-each>
	</xsl:variable>
	<xsl:template match="/">
		<Update>
			<WhoWhen>Updated by [Me] on [Date] at [Time]</WhoWhen>
			<xsl:copy-of select="$ProjectKeys"/>
			<KPIs>
				<xsl:copy-of select="$ProjectKPIs"/>
			</KPIs>
		</Update>		
	</xsl:template>
</xsl:stylesheet>