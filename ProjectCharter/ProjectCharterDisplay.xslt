<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:template match="/">
	<xsl:variable name="PPTLink">
		<xsl:text>[SRA Root]/Resources/PPTReports/ProjectCharterV1.aspx?Create=True&amp;ProjectURL=%SiteURL%</xsl:text>
	</xsl:variable>
	<xsl:variable name="TodaysDate">%TodayRfc%</xsl:variable>
	<xsl:variable name="CurrentDate">%Date%</xsl:variable>
	<xsl:variable name="CurrentTime">%Time%</xsl:variable>
	<xsl:variable name="TeamMembers">
				<xsl:for-each select="//TeamMembers/cw:listitems/rs:data/z:row">
					<xsl:copy-of select="." />			
				</xsl:for-each>
	</xsl:variable>	

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
		var CurrentFileBuildname = 'Project Charter ([me] - <xsl:value-of select="$FileDate"/>).PPT';
		var CurrentFileBuildnameNew = 'Project Charter ([me] - <xsl:value-of select="$FinalDate"/>).PPT';		
		var SARRoot = '[SRA Root]';
	</script>	
	<xsl:for-each select="//Projects/cw:listitems/rs:data/z:row">		
	<div>
		<div id="CreatePowerPoint" class="CreatePPT ui-state-default ui-corner-all" style="cursor:pointer;padding:5px 5px; width:250px;margin-bottom:10px;float:left" title="Create PowerPoint" data-url="{$PPTLink}">
			<img src="[SRA Root]/Resources/PPTReports/Images/PowerPoint2013.png" width="" style="vertical-align:middle;padding-right:5px" class="CreatePPT"/>
			Send Report to Project Library
		</div>
		<div id="PrintReport" class="ui-state-default ui-corner-all" style="cursor:pointer;padding:5px 5px 5px 5px;margin-bottom:10px;float:left; margin-left: 10px;width:120px;" title="Print Report">
			<img src="[SRA Root]/Resources/PPTReports/Print.png" width="" style="vertical-align:middle;padding-right:5px"/>
			Print Report
		</div>	
		<div id="PCHeader" class="ui-widget-header">
		
		</div>
		<div id="PCInfo" class="PCRow">
			<table style="width:100%">
				<tr>
					<td style="width:100%; text-align:right" colspan="4" class="PCLabel"><xsl:value-of select="format-date(xs:date(substring-before($TodaysDate,'T')), '[FNn], [MNn] [D], [Y]', 'en', (), ())"/></td>
				</tr>			
				<tr>
					<td style="width:15%" class="PCLabel">Project Name: </td>
					<td style="width:80%" colspan="3"><xsl:value-of select="@ows_Title"/></td>
				</tr>				
				<tr>
					<td style="width:15%" class="PCLabel">Division: </td>
					<td style="width:40%"><xsl:value-of select="@ows_Division"/></td>
					<td style="width:15%" class="PCLabel">Project Security: </td>
					<td style="width:30%"><xsl:value-of select="@ows_ProjectSecurity"/></td>
				</tr>
				<tr>
					<td style="width:15%" class="PCLabel">Region: </td>
					<td style="width:40%"><xsl:value-of select="@ows_Region"/></td>
					<td style="width:15%" class="PCLabel">Team Leader: </td>
					<td style="width:30%">
						<xsl:for-each select="tokenize(@ows_TeamLeader, ';#')">
							<xsl:if test="(position() mod 2) = 0">
							<xsl:value-of select="current()"/><xsl:text>, </xsl:text>
							</xsl:if>
						</xsl:for-each>
					</td>
				</tr>
				<tr>
					<td style="width:15%" class="PCLabel">Location: </td>
					<td style="width:30%"><xsl:value-of select="@ows_Location"/></td>				
					<td style="width:15%" class="PCLabel">Methodology: </td>
					<td style="width:40%"><xsl:value-of select="@ows_Methodology"/></td>
				</tr>				
			</table>
		</div>
		<div id="PCRow1" class="PCRow PCALeft">
			<table style="width:100%">
				<tr>
					<th class="ui-widget-header" style="width:50%">Problem Statement</th>
					<th class="ui-widget-header" style="width:50%">Goal Statement</th>
				</tr>
				<tr>
					<td style="width:50%"><xsl:value-of select="@ows_CharterProblemStatement"/></td>
					<td style="width:50%"><xsl:value-of select="@ows_CharterGoalStatement"/></td>
				</tr>				
			</table>		
		</div>
		<div id="PCRow2" class="PCRow PCALeft">
			<table style="width:100%">
				<tr>
					<th class="ui-widget-header" style="width:33.33%">Business Case</th>
					<th class="ui-widget-header" style="width:33.33%">Scope Includes</th>
					<th class="ui-widget-header" style="width:33.33%">Scope Excludes</th>
				</tr>
				<tr>
					<td style="width:33.33%"><xsl:value-of select="@ows_CharterBusinessCase"/></td>
					<td style="width:33.33%"><xsl:value-of select="@ows_CharterScopeIncludes"/></td>
					<td style="width:33.33%"><xsl:value-of select="@ows_CharterScopeExcludes"/></td>
				</tr>
			</table>
		</div>
		<div id="PCRow3" class="PCRow PCAMid">
			<table style="width:100%">
				<tr>
					<th class="ui-widget-header" style="width:33.33%">Project Team Members</th>
					<th class="ui-widget-header" style="width:33.33%">Project Benefits</th>
					<th class="ui-widget-header" style="width:33.33%">Project Tollgates/Milestones</th>
				</tr>
				<tr>
					<td style="width:33.33%">
						<table id="ProContacts" class="tablesorter-default">
						  <thead>
						    <tr>
						      <th>Name</th>
						      <th>Role</th>
						    </tr>
						  </thead>
						  <tbody>
						  <xsl:for-each-group select="$TeamMembers/z:row" group-by="@ows_SharePointUser">
						  	<xsl:variable name="User" select="current-grouping-key()" />
						    <tr>
						      <td><xsl:value-of select="substring-after(@ows_SharePointUser, ';#')"/></td>
						      <td>
								<xsl:for-each select="$TeamMembers/z:row[@ows_SharePointUser=$User]">
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
					</td>
					<td style="width:33.33%">
						<table id="ProFinancial" class="">
						  <thead>
						    <tr>
						      <th>Targeted</th>
						      <th>Actual</th>
						    </tr>
						  </thead>
						  <tbody>
						    <tr>
						      <td>
							      <xsl:choose>
								      <xsl:when test="@ows_BenefitsTarget ">
								      	<xsl:value-of select="format-number(@ows_BenefitsTarget, '$###,###')"/>
								      </xsl:when>
								      <xsl:otherwise>$0</xsl:otherwise>
							      </xsl:choose>
								</td>
						      	<td>
							      <xsl:choose>
								      <xsl:when test="@ows_BenefitsActual ">
								      	<xsl:value-of select="format-number(@ows_BenefitsActual, '$###,###')"/>
								      </xsl:when>
								      <xsl:otherwise>$0</xsl:otherwise>
							      </xsl:choose>
								</td>
						    </tr>						    				    				  
						  </tbody>
						</table>
					</td>
					<td style="width:33.33%">
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
					</td>

				</tr>
			</table>		
		</div>
		<div id="PCRow4" class="PCRow PCAMid">
			<table style="width:100%">
				<tr>
					<th class="ui-widget-header" style="width:50%">Project Costs</th>
					<th class="ui-widget-header" style="width:50%">Project Approval</th>
				</tr>
				<tr>
					<td style="width:50%">	
						<table id="ProResources" class="">
						  <thead>
						    <tr>
						      <th></th>	
						      <th>Targeted</th>
						      <th>Actual</th>
						    </tr>
						  </thead>
						  <tbody>
						    <tr>
						      <th>Expense</th>
						      <td>
						      <xsl:choose>
							      <xsl:when test="@ows_ResourcesExpenseTargeted">
							      	<xsl:value-of select="format-number(@ows_ResourcesExpenseTargeted, '$###,###')"/>
							      </xsl:when>
							      <xsl:otherwise>$0</xsl:otherwise>
						      </xsl:choose>
						      
						      </td>
						      <td>
						      <xsl:choose>
							      <xsl:when test="@ows_ResourcesExpenseActual">
							      	<xsl:value-of select="format-number(@ows_ResourcesExpenseActual, '$###,###')"/>
							      </xsl:when>
							      <xsl:otherwise>$0</xsl:otherwise>
						      </xsl:choose>
						      </td>
						    </tr>				    
						    <tr>
						      <th>Capital</th>
						      <td>
						      <xsl:choose>
							      <xsl:when test="@ows_ResourcesCapitalTargeted">
							      	<xsl:value-of select="format-number(@ows_ResourcesCapitalTargeted, '$###,###')"/>
							      </xsl:when>
							      <xsl:otherwise>$0</xsl:otherwise>
						      </xsl:choose>
						      </td>
						      <td>
						      <xsl:choose>
							      <xsl:when test="@ows_ResourcesCapitalActual">
							      	<xsl:value-of select="format-number(@ows_ResourcesCapitalActual, '$###,###')"/>
							      </xsl:when>
							      <xsl:otherwise>$0</xsl:otherwise>
						      </xsl:choose>
						      </td>
						    </tr>	
						  </tbody>
						</table>
					</td>
					<td style="width:50%">
					<!--
						<table id="ProApproval" class="">
					-->	
					<table id="ProMilestones" class="tablesorter-default">
					  <thead>
					    <tr>
					      <th>Title</th>
					      <th>Approver</th>
					      <th>Due Date</th>
					      <th>Approved</th>
					    </tr>
					  </thead>
					  <tbody>
					  <xsl:for-each select="//Approvals/cw:listitems/rs:data/z:row">
					    <tr>
					      <td><xsl:value-of select="@ows_Title"/></td>
					      <td><xsl:value-of select="substring-after(@ows_Approver, ';#')"/></td>
					      <td><xsl:if test="@ows_DueDate"><xsl:value-of select="format-date(xs:date(substring-before(@ows_DueDate,' ')), '[M01]-[D01]-[Y0001]')"/></xsl:if></td>				      
					      <td><xsl:value-of select="@ows_Approved"/></td>
					    </tr>
					   </xsl:for-each>				    
					  </tbody>
					</table>
					</td>
				</tr>
				
			</table>
		</div>		
	<div id="ReportBuilding" title="Building Report">
	    <h2 style="text-align:center">
	        <span id="busySpinner"></span>
	        <img src="[SRA Root]/_layouts/AppDesigner/Apps/ApplicationDesigner/Images/ProcessDesigner.gif" style="vertical-align:middle;padding:5px"/>
	        <br/>
	        Building Report...
	    </h2> 
	</div>
	<div id="ReportDone" title="Report Built">
	</div>
  	</div>
  	</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>