<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:template match="/">
		<xsl:variable name="thisStatusID" select="NewDataSet/Projects/*/*/*/@ows_ProjectStatusID"/>
		<xsl:variable name="ProjectKeys">
			<ProjectID><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_ID"/></ProjectID>
			<KeyAccomplishments><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_KeyAccomplishments" disable-output-escaping="yes"/></KeyAccomplishments>
			<KeyUpcomingEvents><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_KeyUpcomingEvents"/></KeyUpcomingEvents>
			<KeyRisksIssues><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_KeyRisksIssues"/></KeyRisksIssues>
			<ProjectStatus><xsl:value-of select="//NewDataSet/StatusLookups/*/*/*[@ows_ID = $thisStatusID]/@ows_Title"/></ProjectStatus>
			<ProjectStatusID><xsl:value-of select="$thisStatusID"/></ProjectStatusID>
			<xsl:variable name="thisLevel" select="NewDataSet/Projects/*/*/*/@ows_ProjectStatusKPI"></xsl:variable>
			<KPI levelID="{$thisLevel}" leveltitle="{//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Title}" icon="{substring-before(//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Image,',')}" color="{//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Color}" code="{//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Code}" level="{format-number(//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_SortOrder,'#')}"></KPI>
			<MaxChars><xsl:value-of select="format-number(NewDataSet/Config/*/*/*/@ows_MultiLineFieldLength,'###')"/></MaxChars>						
		</xsl:variable>
		<xsl:variable name="ProjectKPIs">
			<xsl:choose>
				<xsl:when test="//NewDataSet/ProjectStatusKPIs/cw:listitems/rs:data/@ItemCount &gt; 0">
					<xsl:for-each select="//NewDataSet/ProjectStatusKPIs/*/*/*">
						<xsl:variable name="thisKPI" select="@ows_ProjectKPICategory"/>
						<xsl:variable name="thisLevel" select="@ows_ProjectKPILevel"/>
						<KPI kpiID="{@ows_ID}" categoryID="{//NewDataSet/KPICategories/*/*/*[@ows_ID = $thisKPI]/@ows_ID}" tip="{//NewDataSet/KPICategories/*/*/*[@ows_ID = $thisKPI]/@ows_Description}" levelID="{//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_ID}" leveltitle="{//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Title}" icon="{substring-before(//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Image,',')}" color="{//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Color}" code="{//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Code}" level="{format-number(//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_SortOrder,'#')}" lock="{//NewDataSet/KPICategories/*/*/*[@ows_ID = $thisKPI]/@ows_Default}"><xsl:value-of select="//NewDataSet/KPICategories/*/*/*[@ows_ID = $thisKPI]/@ows_Title"/></KPI>				
					</xsl:for-each> 
				</xsl:when>
				<xsl:otherwise>
					<xsl:for-each select="//NewDataSet/KPICategories/*/*/*[@ows_Default = '1']">
						<xsl:variable name="thisKPI" select="@ows_ID"/>
						<xsl:variable name="thisLevel" select="1"/>
						<KPI kpiID="New" categoryID="{@ows_ID}" tip="{@ows_Description}" levelID="{//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_ID}" leveltitle="{//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Title}" icon="{substring-before(//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Image,',')}" color="{//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Color}" code="{//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Code}" level="{format-number(//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_SortOrder,'#')}" lock="{@ows_Default}"><xsl:value-of select="@ows_Title"/></KPI>				
					</xsl:for-each> 					
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<NewDataSet>
			<Project>
				<xsl:copy-of select="$ProjectKeys"/>
			</Project>
			
			<KPIs>
				<xsl:copy-of select="$ProjectKPIs"/>
			</KPIs>
			<KPICategoryLookups>
				<xsl:for-each select="NewDataSet/KPICategories/*/*/*[not(@ows_ID = //NewDataSet/ProjectStatusKPIs/*/*/*/@ows_ProjectKPICategory) and not(@ows_Default = '1') ]">
					<xsl:sort select="@ows_Title"/>
					<KPICategory categoryID="{@ows_ID}" tip="{@ows_Description}"><xsl:value-of select="@ows_Title"/></KPICategory>
				</xsl:for-each>
			</KPICategoryLookups>
			<KPILevelLookups>
				<xsl:for-each select="NewDataSet/KPILevels/*/*/*">
					<xsl:sort select="@ows_SortOrder" data-type="number"/>
					<KPILevel levelID="{@ows_ID}" level="{format-number(@ows_SortOrder,'#')}" icon="{substring-before(@ows_Image,',')}" color="{@ows_Color}" code="{@ows_Code}" title="{@ows_Title}"><xsl:value-of select="@ows_Title"/></KPILevel>
				</xsl:for-each>
			</KPILevelLookups>
			<StatusLookups>
				<xsl:for-each select="NewDataSet/StatusLookups/*/*/*">
					<xsl:sort select="@ows_SortOrder" data-type="number"/>
					<Status statusID="{@ows_ID}" statusSelected="{if(@ows_ID = $thisStatusID) then 'true' else 'false'}"><xsl:value-of select="@ows_Title"/></Status>
				</xsl:for-each>
			</StatusLookups>
			<History>
				<xsl:choose>
					<xsl:when test="//NewDataSet/History/cw:listitems/rs:data/@ItemCount &gt; 0">
						<xsl:for-each select="NewDataSet/History/*/*/*">
							<xsl:sort select="@ows_ID" data-type="number" order="descending"/>
							<Update><xsl:value-of select="@ows_Data"/></Update>
						</xsl:for-each>
					</xsl:when>
					<xsl:otherwise>
						<Update></Update>
					</xsl:otherwise>
				</xsl:choose>
			</History>
			<ProjectEditor>
				<xsl:choose>
					<xsl:when test="count(//ProjectEditor/cw:listitems/rs:data/z:row) &gt; 0" >True</xsl:when>
					<xsl:otherwise>False</xsl:otherwise>
				</xsl:choose>
			</ProjectEditor>		
		</NewDataSet>
	</xsl:template>
</xsl:stylesheet>