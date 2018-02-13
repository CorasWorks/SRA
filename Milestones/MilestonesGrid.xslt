﻿<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:template match="/">
		<xsl:variable name="formatDate" select="'[M01]-[D01]-[Y0001]'"/>
		<link rel="stylesheet" href="[SRA Root]/Resources/Milestones/Milestones.css" type="text/css"/>
        <div id="title-wrapper">
            <div class="cw-sra-title">Map: <span id="cw-sra-MapMethodology" class="cw-sra-map-methodology"></span></div>
            <div class="cw-sra-map-menu">
            	<select id="mapMenu">
            		<option mapID="0" selected="selected" disabled="disabled">Select a Methodology</option>
            	</select>
            </div>
        </div>
		<table class="milestonesTable">
			<tr class="milestonesHeaderRow">
				<th class="milestonesHeaderColumn">Milestone</th>
				<th class="milestonesHeaderColumn">Original Target Date</th>
				<th class="milestonesHeaderColumn">Target Date</th>
				<th class="milestonesHeaderColumn">Actual Date</th>
				<th class="milestonesHeaderColumn">Complete</th>
			</tr>
			<xsl:for-each select="//Milestones/cw:listitems/rs:data/z:row" >
				<xsl:sort select="@ows_StagePosition" data-type="number"/>
				<tr>
					<td><xsl:value-of select="@ows_Title"/></td>
					<td class="originalTargetDate" data-column="originalTargetDate" data-milestone="{upper-case(@ows_Title)}" data-position="{position()}">
						<xsl:value-of select="if(@ows_OriginalTargetDate) then format-date(xs:date(substring-before(@ows_OriginalTargetDate,' ')), $formatDate) else ''"/>
					</td>
					<td>
						<img style="padding:3px; margin-right:3px;" src="../_layouts/images/calendar.gif" title="Set Target Date" class="{if(@ows_Complete = 1) then 'noCalIcon' else 'milestoneCalIcon'} ui-button ui-widget ui-state-default ui-corner-all"/>
						<input class="targetDate {if(@ows_Complete = 1) then 'noDatePicker' else 'milestoneDatePicker'}" type="text" value="{if(@ows_TargetDate) then format-date(xs:date(substring-before(@ows_TargetDate,' ')), $formatDate) else ''}" data-id="{@ows_ID}" data-column="TargetDate" data-milestone="{upper-case(@ows_Title)}" data-message="Target Date Updated" data-position="{position()}"/>
					</td>
					<td>
						<img style="padding:3px; margin-right:3px;" src="../_layouts/images/calendar.gif" title="Set Target Date" class="{if(@ows_Complete = 1) then 'noCalIcon' else 'milestoneCalIcon'} ui-button ui-widget ui-state-default ui-corner-all"/>
						<input class="actualDate {if(@ows_Complete = 1) then 'noDatePicker' else 'milestoneDatePicker'}" type="text" value="{if(@ows_ActualDate) then format-date(xs:date(substring-before(@ows_ActualDate,' ')), $formatDate) else ''}" data-id="{@ows_ID}" data-column="ActualDate" data-milestone="{upper-case(@ows_Title)}" data-message="Actual Date Updated" data-position="{position()}"/>
					</td>
					<td>
						<xsl:choose>
							<xsl:when test="upper-case(@ows_Title) = 'DEFINE'">
							<!--<xsl:when test="position() == 1">-->
								<div class="{if(@ows_TargetDate and @ows_ActualDate) then (if(@ows_Complete = 1) then 'cbchecked' else (if((preceding-sibling::node()[1]/@ows_Complete = 1) and (count(//@ows_TargetDate) = count(//Milestones/*/*/*/@ows_ID))) then 'cbunchecked' else 'cbwarning')) else 'cbHidden'} milestoneComplete" title="{if(@ows_Complete = 1) then 'Click to Uncomplete' else (if(count(//@ows_TargetDate) = count(//Milestones/*/*/*/@ows_ID) and preceding-sibling::node()[1]/@ows_Complete = 1) then 'Click to Complete' else 'Complete prior Milestone and enter all Target Dates')}" data-id="{@ows_ID}" data-column="Complete" data-milestone="{upper-case(@ows_Title)}" data-position="{position()}" originaldatesset="{if(@ows_OriginalTargetDate) then 1 else 0}"></div>						
							</xsl:when>
							<xsl:otherwise>
								<div class="{if(@ows_TargetDate and @ows_ActualDate) then (if(@ows_Complete = 1) then 'cbchecked' else (if(not(position() = 1) and preceding-sibling::node()[1]/@ows_Complete != 1) then 'cbwarning' else 'cbunchecked')) else 'cbHidden'} milestoneComplete" title="{if(@ows_Complete = 1) then 'Click to Uncomplete' else (if(not(position() = 1) and preceding-sibling::node()[1]/@ows_Complete != 1) then 'Complete prior Milestone' else 'Click to Complete')}" data-id="{@ows_ID}" data-column="Complete" data-milestone="{upper-case(@ows_Title)}" data-position="{position()}"></div>							
							</xsl:otherwise>
						</xsl:choose>
					</td>
				</tr>
			</xsl:for-each>
		</table>
		<div id="projectStatusWrapper" data-projectid="{//Projects/cw:listitems/rs:data/z:row/@ows_ID}">Overall Project Status:  <span id="thisProjectStatus"><xsl:value-of select="//Projects/cw:listitems/rs:data/z:row/@ows_ProjectStatus"/></span></div>
		
		<input id="sharePointDate" type="hidden"/>
		<div id="finalMilestoneDialog">
			<div>You have not entered any benefits for this project. Would you like to close this project?</div>
			<div class="finalMilestoneButtonWrapper">
				<input type="button" value="Yes" id="closeProjectButton" class="milestoneButton" title="Your project status will be set to 'Closed'"/>
				<input type="button" value="No" id="doNotCloseProjectButton" class="milestoneButton" title="Your project status will be set to 'Complete'"/>
			</div>
		
		</div>
		<script type="text/javascript" src="[SRA Root]/Resources/Milestones/milestones.js">
		</script>
	</xsl:template>
</xsl:stylesheet>