﻿<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
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
			      <th>Role(s)</th>
			    </tr>
			  </thead>
			  <tbody>
			 <xsl:for-each-group select="//TeamMembers/cw:listitems/rs:data/z:row" group-by="@ows_SharePointUser">
			    <tr>
			      <td><xsl:value-of select="substring-after(@ows_SharePointUser,';#')"/></td>
			      <td>
					<xsl:for-each select="current-group()">
						<xsl:value-of select="@ows_Role"/>
						<xsl:if test="position() != last()">
							<xsl:text>, </xsl:text>
						</xsl:if>
					</xsl:for-each>			      
			      </td>
			    </tr>						  
			  </xsl:for-each-group>				    
			  </tbody>
			</table>
		</xsl:variable>
		<xsl:variable name="ProjectFinancials">
			<table id="ProFinancial" class="tablesorter-default">
			  <thead>
			    <tr>
			      <th></th>
			      <th>Targeted</th>
			      <th>Actual</th>
			    </tr>
			  </thead>
			  <tbody>
			    <tr>
					<th>Benefits</th>
			    	<td>
						<xsl:value-of select="if (//Projects/*/*/*/@ows_BenefitsTarget) then format-number(//Projects/*/*/*/@ows_BenefitsTarget, '$###,###') else '$0'"/>
					</td>
			      	<td>
						<xsl:value-of select="if (//Projects/*/*/*/@ows_BenefitsActual) then format-number(//Projects/*/*/*/@ows_BenefitsActual, '$###,###') else '$0'"/>
					</td>
			    </tr>						    				    				  
			    <tr>
			      <th>Expense</th>
			      <td>
						<xsl:value-of select="if (//Projects/*/*/*/@ows_ResourcesExpenseTargeted) then format-number(//Projects/*/*/*/@ows_ResourcesExpenseTargeted, '$###,###') else '$0'"/>			      
			      </td>
			      <td>
						<xsl:value-of select="if (//Projects/*/*/*/@ows_ResourcesExpenseActual) then format-number(//Projects/*/*/*/@ows_ResourcesExpenseActual, '$###,###') else '$0'"/>			      
			      </td>
			    </tr>				    
			    <tr>
			      <th>Capital</th>
			      <td>
						<xsl:value-of select="if (//Projects/*/*/*/@ows_ResourcesCapitalTargeted) then format-number(//Projects/*/*/*/@ows_ResourcesCapitalTargeted, '$###,###') else '$0'"/>			      
			      </td>
			      <td>
						<xsl:value-of select="if (//Projects/*/*/*/@ows_ResourcesCapitalActual) then format-number(//Projects/*/*/*/@ows_ResourcesCapitalActual, '$###,###') else '$0'"/>			      
			      </td>
			    </tr>	
			  </tbody>
			</table>
		
		</xsl:variable>
		<xsl:variable name="ProjectMilestones">
			<table id="ProMilestones" class="tablesorter-default">
			  <thead>
			    <tr>
			      <th>Milestone</th>
			      <th>Target Date</th>
			      <th>Actual Date</th>
			      <th>Complete</th>
			    </tr>
			  </thead>
			  <tbody>
			  <xsl:for-each select="//Milestones/cw:listitems/rs:data/z:row">
			    <tr>
			      <td><xsl:value-of select="@ows_Title"/></td>
			      <td><xsl:if test="@ows_TargetDate"><xsl:value-of select="format-date(xs:date(substring-before(@ows_TargetDate,' ')), '[M01]-[D01]-[Y0001]')"/></xsl:if></td>
			      <td><xsl:if test="@ows_ActualDate"><xsl:value-of select="format-date(xs:date(substring-before(@ows_ActualDate,' ')), '[M01]-[D01]-[Y0001]')"/></xsl:if></td>				      
			      <td>
			      	<xsl:choose>
			      		<xsl:when test="@ows_Complete = 1">
			      			<img style="padding:3px; margin-right:3px;" src="[SRA Root]/_layouts/images/cbchecked.gif"/>
			      		</xsl:when>
			      		<xsl:otherwise>
			      			<img style="padding:3px; margin-right:3px;" src="[SRA Root]/_layouts/images/cbunchecked.gif"/>
			      		</xsl:otherwise>
			      	</xsl:choose> 
			      </td>
			    </tr>
			   </xsl:for-each>				    
			  </tbody>
			</table>		
		</xsl:variable>
		
<link rel="stylesheet" type="text/css" href="[SRA Root]/Resources/TableSorter/theme.default.css" />
<link  rel="stylesheet" type="text/css" href="[SRA Root]/_layouts/AppDesigner/Content-Cache/libs/jqueryui/1.10.3/css/base/jquery-ui.css"/>
<link rel="stylesheet" type="text/css" href="[SRA Root]/Resources/TableSorter/pager/jquery.tablesorter.pager.css"/>
<script src="[SRA Root]/_layouts/AppDesigner/Content-Cache/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="[SRA Root]/_layouts/AppDesigner/Content-Cache/libs/jqueryui/1.10.3/jquery-ui-1.10.3.custom.min.js"></script>    	
<script type="text/javascript" src="[SRA Root]/resources/projectstatus/projectstatusreportdisplay.js"></script>
<script>
	var CurrentSiteRoot = '%SiteURL%';
</script>
<!--PPT part-->
	<xsl:variable name="PPTLink">
		<xsl:text>[SRA Root]/Resources/PPTReports/ProjectStatus.aspx?Create=True&amp;ProjectURL=%SiteURL%</xsl:text>
	</xsl:variable>
	<xsl:variable name="TodaysDate">%TodayRfc%</xsl:variable>
	<xsl:variable name="CurrentDate">%Date%</xsl:variable>
	<xsl:variable name="CurrentTime">%Time%</xsl:variable>
	<xsl:variable name="FinalDate">
		<xsl:value-of select="substring-before($CurrentDate, '/')"/>
		<xsl:text>.</xsl:text>
		<xsl:value-of select="substring-before(substring-after($CurrentDate, '/'), '/')"/>
		<xsl:text>.</xsl:text>
		<xsl:value-of select="substring-after(substring-after($CurrentDate, '/'), '/')"/>
		<xsl:text> </xsl:text>
		<xsl:value-of select="substring-before(substring-before($CurrentTime, ' '), ':')"/>
		<xsl:text>.</xsl:text>				
		<xsl:value-of select="substring-after(substring-before($CurrentTime, ' '), ':')"/>
		<xsl:text>.</xsl:text>
		<xsl:value-of select="format-dateTime(xs:dateTime($TodaysDate), '[s01]')"/>
		<xsl:value-of select="substring-after($CurrentTime, ' ')"/>
	</xsl:variable>
	<xsl:variable name="FileDate">
		<xsl:value-of select="substring-after(substring-after($CurrentDate, '/'), '/')"/>
		<xsl:text>.</xsl:text>
			<xsl:if test="string-length(substring-before($CurrentDate, '/'))=1">0</xsl:if>		
		<xsl:value-of select="substring-before($CurrentDate, '/')"/>
		<xsl:text>.</xsl:text>
			<xsl:if test="string-length(substring-before(substring-after($CurrentDate, '/'), '/'))=1">0</xsl:if>	
		<xsl:value-of select="substring-before(substring-after($CurrentDate, '/'), '/')"/>		
	</xsl:variable>

	<script>
		var CurrentFileBuildname = 'Project Status ([me] - <xsl:value-of select="$FileDate"/>).PPT';
		var CurrentFileBuildnameNew = 'Project Status ([me] - <xsl:value-of select="$FinalDate"/>).PPT';		
		var SARRoot = '[SRA Root]';
	</script>
	<div id="ReportBuilding" title="Building Report">
	    <h2 style="text-align:center">
	        <span id="busySpinner"></span>
	        <img src="[SRA Root]/_layouts/AppDesigner/Apps/ApplicationDesigner/Images/ProcessDesigner.gif" style="vertical-align:middle;padding:5px"/>
	        <br/>
	        Building Report...
	    </h2> 
	</div>
	<div id="ReportDone" title="Report Built"></div>
	<!--
	<div id="CreatePowerPoint" class="CreatePPT ui-state-default ui-corner-all" style="cursor:pointer;padding:5px 5px; width:250px;margin-bottom:10px;" title="Create PowerPoint" data-url="{$PPTLink}">
		<img src="[SRA Root]/Resources/PPTReports/Images/PowerPoint2013.png" width="" style="vertical-align:middle;padding-right:5px" class="CreatePPT"/>
		Send Report to Project Library
	</div>
	-->
		<div id="PrintReport" class="ui-state-default ui-corner-all" style="cursor:pointer;padding:5px 5px 5px 5px;margin-bottom:10px; margin-left: 10px;width:120px;" title="Print Report">
		<img src="[SRA Root]/Resources/PPTReports/Print.png" width="" style="vertical-align:middle;padding-right:5px"/>
		Print Report
	</div>
	
<!--PPT part end -->

<div class="projectStatusReportWrapper">
	<div id="projectStatusReportHeader">
		<div id="ProjectTitle"></div>
		<div id="ProjectLastUpdate">
			<xsl:choose>
				<xsl:when test="//History/*/*/*/@ows_Editor">
					Last updated by <xsl:value-of select="substring-after(//History/*/*/*/@ows_Editor,';#')"/> on <xsl:value-of select="format-date(xs:date(substring-before(//History/*/*/*/@ows_Modified,' ')), $formatDate)"/>
				</xsl:when>
				<xsl:otherwise>The status of this project has not been updated.</xsl:otherwise>
			</xsl:choose>
		</div>
	</div>
	<div id="projectKPIs" class="projectStatusKPIsWrapper">

	</div>
	<div class="projectGoalWrapper reportSection">
		<div id="CharterGoalStatement" class="projectStatusGoal">
			<span class="boldLabel">Goal: </span>
		</div >
	</div>	
	<div id="projectStatusReportBody">
		<div id="projectStatusReportBodyLeftColumn">
			<div class="reportSection">
				<div id="KeyAccomplishments" class="projectStatusKeyAccomplishments ">
					<span class="boldItalicsLabel">Key Accomplishments: </span> 
				</div>
			</div>
			<div class="reportSection">
				<div id="KeyUpcomingEvents" class="projectStatusKeyUpcomingEvents ">
					<span class="boldItalicsLabel">Key Upcoming Events: </span >			
				</div>
			</div>
			<div class="reportSection">
				<div id="KeyRisksIssues" class="projectStatusKeyRisksIssues ">
					<span class="boldItalicsLabel">Key Risks &amp; Issues: </span >
				</div>	
			</div>
			<div class="reportSection">
				<div class="projectStatusNarrativeLabel boldLabel">Project Financials:</div>
				<div class="projectStatusFinancials">
					<xsl:copy-of select="$ProjectFinancials"/>
				</div>
			</div>
		</div>
		<div id="projectStatusReportBodyRightColumn">
			<div class="reportSection">
				<div class="projectStatusNarrativeLabel boldLabel">Project Milestones:</div>
				<div class="projectStatusMilestones">
					<xsl:copy-of select="$ProjectMilestones"/>				
				</div>
			</div>
			<div class="reportSection">
				<div class="projectStatusNarrativeLabel boldLabel">Project Team:</div>
				<div class="projectStatusTeam">
					<xsl:copy-of select="$ProjectTeam"/>
				</div>
			</div>

		</div>
	</div>
	<div id="projectStatusReportFooter">
		<div id="reportLog">Status Report generated by [Me] on [Date] at [Time]</div>
	</div>
</div>
	</xsl:template>
</xsl:stylesheet>