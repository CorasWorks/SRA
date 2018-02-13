<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:template match="/">
		<xsl:variable name="formatDate" select="'[M01]-[D01]-[Y0001]'"/>	
		<xsl:variable name="ProjectKeys">
			<ProjectID><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_ID"/></ProjectID>
			<ProjectTitle><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_Title"/></ProjectTitle>
			<CharterGoalStatement><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_CharterGoalStatement"/></CharterGoalStatement>
			<KeyAccomplishments><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_KeyAccomplishments"/></KeyAccomplishments>
			<KeyUpcomingEvents><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_KeyUpcomingEvents"/></KeyUpcomingEvents>
			<KeyRisksIssues><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_KeyRisksIssues"/></KeyRisksIssues>
			<ProjectStatus><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_ProjectStatus"/></ProjectStatus>
			<xsl:variable name="thisLevel" select="NewDataSet/Projects/*/*/*/@ows_ProjectStatusKPI"></xsl:variable>
			<KPI levelID="{$thisLevel}" leveltitle="{//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Title}" icon="{substring-before(//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Image,',')}" color="{//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Color}" code="{//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Code}" level="{format-number(//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_SortOrder,'#')}"></KPI>						
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
		<xsl:variable name="ProjectTeam">
			<table id="ProContacts" class="tablesorter-default">
			  <thead>
			    <tr>
			      <th>Name</th>
			      <th>Role</th>
			    </tr>
			  </thead>
			  <tbody>
			  <xsl:for-each select="//TeamMembers/cw:listitems/rs:data/z:row[@ows_Role = 'Team Leader']">
			    <tr>
			      <td><xsl:value-of select="substring-after(@ows_SharePointUser, ';#')"/></td>
			      <td><xsl:value-of select="@ows_Role"/></td>
			    </tr>
			   </xsl:for-each>
			  <xsl:for-each select="//TeamMembers/cw:listitems/rs:data/z:row[@ows_Role != 'Team Leader']">
			  <xsl:sort select="@ows_Role" order="ascending" />
			    <tr>
			      <td><xsl:value-of select="substring-after(@ows_SharePointUser, ';#')"/></td>
			      <td><xsl:value-of select="@ows_Role"/></td>
			    </tr>
			   </xsl:for-each> 					    
			  </tbody>
			</table>
		</xsl:variable>
		<NewDataSet>
			<Project>
				<xsl:copy-of select="$ProjectKeys"/>
				<Update>
					<Date><xsl:value-of select="//NewDataSet/History/*/*/*/format-date(xs:date(substring-before(@ows_Modified,' ')), $formatDate)"/></Date>
					<By><xsl:value-of select="//NewDataSet/History/*/*/*/substring-after(@ows_Editor,';#')"/></By>
				</Update>
			</Project>			
			<KPIs>
				<xsl:copy-of select="$ProjectKPIs"/>
			</KPIs>
			<Team>
				<xsl:copy-of select="$ProjectTeam"/>
			</Team>			
		</NewDataSet>
	</xsl:template>
</xsl:stylesheet>