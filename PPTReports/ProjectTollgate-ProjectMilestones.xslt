<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:template match="/">
		<xsl:variable name="MultiDelimiter"><![CDATA[^\d+;#|;#\d+;#|;#]]></xsl:variable>
		<xsl:variable name="formatDate" select="'[M01]-[D01]-[Y0001]'"/>	
		<xsl:variable name="ProjectKeys">
			<ProjectID><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_ID"/></ProjectID>
			<ProjectTitle><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_Title"/></ProjectTitle>
			<Division><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_Division"/></Division>
			<Region><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_Region"/></Region>
			<Location><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_Location"/></Location>
			<Map><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_Methodology"/></Map>
			<Category><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_Category"/></Category>
			<CharterGoalStatement><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_CharterGoalStatement"/></CharterGoalStatement>
			<CharterProblemStatement><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_CharterProblemStatement"/></CharterProblemStatement>
			<KeyAccomplishments><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_KeyAccomplishments"/></KeyAccomplishments>
			<KeyUpcomingEvents><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_KeyUpcomingEvents"/></KeyUpcomingEvents>
			<KeyRisksIssues><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_KeyRisksIssues"/></KeyRisksIssues>
			<tollgate><xsl:value-of select="NewDataSet/Projects/*/*/*/@ows_tollgate"/></tollgate>
			<xsl:variable name="thisLevel" select="NewDataSet/Projects/*/*/*/@ows_tollgateKPI"></xsl:variable>
			<KPI levelID="{$thisLevel}" leveltitle="{//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Title}" icon="{substring-before(//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Image,',')}" color="{//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Color}" code="{//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_Code}" level="{format-number(//NewDataSet/KPILevels/*/*/*[@ows_ID = $thisLevel]/@ows_SortOrder,'#')}"></KPI>						
		</xsl:variable>
		<xsl:variable name="ProjectKPIs">
			<xsl:choose>
				<xsl:when test="//NewDataSet/tollgateKPIs/cw:listitems/rs:data/@ItemCount &gt; 0">
					<xsl:for-each select="//NewDataSet/tollgateKPIs/*/*/*">
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
			<table id="ProFinancial" style="width:500px">
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
			    	<td align="center">
						<xsl:value-of select="if (//Projects/*/*/*/@ows_BenefitsTarget) then format-number(//Projects/*/*/*/@ows_BenefitsTarget, '$###,###') else '$0'"/>
					</td>
			      	<td align="center">
						<xsl:value-of select="if (//Projects/*/*/*/@ows_BenefitsActual) then format-number(//Projects/*/*/*/@ows_BenefitsActual, '$###,###') else '$0'"/>
					</td>
			    </tr>						    				    				  
			    <tr>
			      <th>Expense</th>
			      <td align="center">
						<xsl:value-of select="if (//Projects/*/*/*/@ows_ResourcesExpenseTargeted) then format-number(//Projects/*/*/*/@ows_ResourcesExpenseTarget, '$###,###') else '$0'"/>			      
			      </td>
			      <td align="center">
						<xsl:value-of select="if (//Projects/*/*/*/@ows_ResourcesExpenseActual) then format-number(//Projects/*/*/*/@ows_ResourcesExpenseActual, '$###,###') else '$0'"/>			      
			      </td>
			    </tr>				    
			    <tr>
			      <th>Capital</th>
			      <td align="center">
						<xsl:value-of select="if (//Projects/*/*/*/@ows_ResourcesCapitalTargeted) then format-number(//Projects/*/*/*/@ows_ResourcesCapitalTarget, '$###,###') else '$0'"/>			      
			      </td>
			      <td align="center">
						<xsl:value-of select="if (//Projects/*/*/*/@ows_ResourcesCapitalActual) then format-number(//Projects/*/*/*/@ows_ResourcesCapitalActual, '$###,###') else '$0'"/>			      
			      </td>
			    </tr>	
			  </tbody>
			</table>
		
		</xsl:variable>
		<xsl:variable name="ProjectMilestones">
			<table id="ProMilestones" style="width:550px">
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
			      <td align="center"><xsl:if test="@ows_TargetDate"><xsl:value-of select="format-date(xs:date(substring-before(@ows_TargetDate,' ')), '[M01]-[D01]-[Y0001]')"/></xsl:if></td>
			      <td align="center"><xsl:if test="@ows_ActualDate"><xsl:value-of select="format-date(xs:date(substring-before(@ows_ActualDate,' ')), '[M01]-[D01]-[Y0001]')"/></xsl:if></td>				      
			      <td align="center">
			      	<xsl:choose>
			      		<xsl:when test="@ows_Complete = 1">
			      		<xsl:text>Yes</xsl:text> 
			      		</xsl:when>
			      		<xsl:otherwise>
			      		<xsl:text>No</xsl:text> 
			      		</xsl:otherwise>
			      	</xsl:choose> 
			      </td>
			    </tr>
			   </xsl:for-each>				    
			  </tbody>
			</table>		
		</xsl:variable>
		<xsl:variable name="CurrentTollgate">
			<xsl:for-each select="//Milestones/*/*/*[@ows_Complete = 0][1]">
				<Stage><xsl:value-of select="@ows_Title"/></Stage>
				<Target><xsl:value-of select="@ows_TargetDate"/></Target>
				<xsl:variable name="tollgateStageID" select="@ows_StageID"/>
				<xsl:variable name="tollgateMapStageID" select="@ows_MapStageID"/>
				<Purpose>
					<xsl:value-of select="//Stages/*/*/*[@ows_ID = $tollgateStageID]/@ows_Purpose"/>
				</Purpose>
				<Deliverables>
					<xsl:for-each select="tokenize(//MapStages/*/*/*[@ows_ID = $tollgateMapStageID]/@ows_Deliverables2,$MultiDelimiter)">
						<item><xsl:value-of select="."/></item>
					</xsl:for-each>
				</Deliverables>				
				<KeyQuestions>
					<xsl:for-each select="tokenize(//MapStages/*/*/*[@ows_ID = $tollgateMapStageID]/@ows_KeyQuestions2,$MultiDelimiter)">
						<item><xsl:value-of select="."/></item>
					</xsl:for-each>
				</KeyQuestions>
			</xsl:for-each>
		</xsl:variable>
	
<font face="Calibri">	
	<div>
		<xsl:copy-of select="$ProjectMilestones"/>		
	</div>
</font>						
	</xsl:template>
</xsl:stylesheet>