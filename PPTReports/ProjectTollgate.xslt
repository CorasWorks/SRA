<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
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
						<xsl:value-of select="if (//Projects/*/*/*/@ows_ResourcesExpenseTargeted) then format-number(//Projects/*/*/*/@ows_ResourcesExpenseTarget, '$###,###') else '$0'"/>			      
			      </td>
			      <td>
						<xsl:value-of select="if (//Projects/*/*/*/@ows_ResourcesExpenseActual) then format-number(//Projects/*/*/*/@ows_ResourcesExpenseActual, '$###,###') else '$0'"/>			      
			      </td>
			    </tr>				    
			    <tr>
			      <th>Capital</th>
			      <td>
						<xsl:value-of select="if (//Projects/*/*/*/@ows_ResourcesCapitalTargeted) then format-number(//Projects/*/*/*/@ows_ResourcesCapitalTarget, '$###,###') else '$0'"/>			      
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
<!--PPT Code-->	
		<Configuration>
			<Slides>
				<Slide number="0">
					<Replace variable="%ProjectTitle%">
						<xsl:value-of select="$ProjectKeys/ProjectTitle"/>
					</Replace>
					<Replace variable="%ProjectTollgate%">
						<xsl:value-of select="$CurrentTollgate/Stage"/>
					</Replace>
					<Replace variable="%Goal%">
						<xsl:value-of select="$CurrentTollgate/Purpose"/>
					</Replace>
					
					<Replace variable="%ModBy%">
						<xsl:value-of select="substring-after(//History/*/*/*/@ows_Editor,';#')"/>
					</Replace>
					<Replace variable="%ModDate%">
						<xsl:value-of select="format-date(xs:date(substring-before(//History/*/*/*/@ows_Modified,' ')), $formatDate)"/>
					</Replace>
					<Replace variable="%TargetDate%">
						<xsl:value-of select="if($CurrentTollgate/Target != '') then format-date(xs:date(substring-before($CurrentTollgate/Target,' ')), $formatDate)  else 'No Target Date Set'"/>
					</Replace>
					<Replace variable="%Division%">
						<xsl:value-of select="$ProjectKeys/Division"/>
					</Replace>
					<Replace variable="%Region%">
						<xsl:value-of select="$ProjectKeys/Region"/>
					</Replace>
					<Replace variable="%Location%">
						<xsl:value-of select="$ProjectKeys/Location"/>
					</Replace>
					<Replace variable="%Methodology%">
						<xsl:value-of select="$ProjectKeys/Map"/>
					</Replace>
					<Replace variable="%Category%">
						<xsl:value-of select="$ProjectKeys/Category"/>
					</Replace>
					<Replace variable="%ProblemStatement%">
						<xsl:value-of select="$ProjectKeys/CharterProblemStatement"/>
					</Replace>
					<!--
					<Text top="220" left="20" width="1" height="1" borderwidth="0" bordercolor="White" firstrowbgcolor="White" altrowbgcolor="White" textheight="12" rowheight="10">	
						<xsl:attribute name="url">
							<xsl:text>%ISiteURL%/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=BatchRequest</xsl:text>
							<xsl:text>&amp;ConfigFileLocation=[SRA Root]/Resources/PPTReports/ProjectCharterV1-Milestones.xml</xsl:text>
							<xsl:text>&amp;XsltLocation=[SRA Root]/Resources/PPTReports/ProjectCharterV1-Milestones.xslt</xsl:text>
							<xsl:text>&amp;OutputType=html&amp;ProjectURL=%ProjectURL%</xsl:text>
						</xsl:attribute>
					</Text>
					-->
					<Text top="320" left="140" width="1" height="1" borderwidth="0" bordercolor="White" firstrowbgcolor="White" altrowbgcolor="White" textheight="12" rowheight="10">	
						<xsl:attribute name="url">
							<xsl:text>%ISiteURL%/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=BatchRequest</xsl:text>
							<xsl:text>&amp;ConfigFileLocation=[SRA Root]/Resources/PPTReports/ProjectTollgate-Deliverables.xml</xsl:text>
							<xsl:text>&amp;XsltLocation=[SRA Root]/Resources/PPTReports/ProjectTollgate-Deliverables.xslt</xsl:text>
							<xsl:text>&amp;OutputType=html&amp;ProjectURL=%ProjectURL%</xsl:text>
						</xsl:attribute>
					</Text>
					<Text top="390" left="140" width="1" height="1" borderwidth="0" bordercolor="White" firstrowbgcolor="White" altrowbgcolor="White" textheight="12" rowheight="10">	
						<xsl:attribute name="url">
							<xsl:text>%ISiteURL%/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=BatchRequest</xsl:text>
							<xsl:text>&amp;ConfigFileLocation=[SRA Root]/Resources/PPTReports/ProjectTollgate-KeyQuestions.xml</xsl:text>
							<xsl:text>&amp;XsltLocation=[SRA Root]/Resources/PPTReports/ProjectTollgate-KeyQuestions.xslt</xsl:text>
							<xsl:text>&amp;OutputType=html&amp;ProjectURL=%ProjectURL%</xsl:text>
						</xsl:attribute>
					</Text>
					<Text top="140" left="520" width="1" height="1" borderwidth="0" bordercolor="White" firstrowbgcolor="White" altrowbgcolor="White" textheight="12" rowheight="10">	
						<xsl:attribute name="url">
							<xsl:text>%ISiteURL%/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=BatchRequest</xsl:text>
							<xsl:text>&amp;ConfigFileLocation=[SRA Root]/Resources/PPTReports/ProjectTollgate-ProjectFinancials.xml</xsl:text>
							<xsl:text>&amp;XsltLocation=[SRA Root]/Resources/PPTReports/ProjectTollgate-ProjectFinancials.xslt</xsl:text>
							<xsl:text>&amp;OutputType=html&amp;ProjectURL=%ProjectURL%</xsl:text>
						</xsl:attribute>
					</Text>
					<Text top="260" left="510" width="1" height="1" borderwidth="0" bordercolor="White" firstrowbgcolor="White" altrowbgcolor="White" textheight="8" rowheight="8">	
						<xsl:attribute name="url">
							<xsl:text>%ISiteURL%/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=BatchRequest</xsl:text>
							<xsl:text>&amp;ConfigFileLocation=[SRA Root]/Resources/PPTReports/ProjectTollgate-ProjectMilestones.xml</xsl:text>
							<xsl:text>&amp;XsltLocation=[SRA Root]/Resources/PPTReports/ProjectTollgate-ProjectMilestones.xslt</xsl:text>
							<xsl:text>&amp;OutputType=html&amp;ProjectURL=%ProjectURL%</xsl:text>
						</xsl:attribute>
					</Text>ProjectKPI
					<Text top="390" left="550" width="1" height="1" borderwidth="0" bordercolor="White" firstrowbgcolor="White" altrowbgcolor="White" textheight="8" rowheight="8">	
						<xsl:attribute name="url">
							<xsl:text>%ISiteURL%/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=BatchRequest</xsl:text>
							<xsl:text>&amp;ConfigFileLocation=[SRA Root]/Resources/PPTReports/ProjectTollgate-ProjectTeam.xml</xsl:text>
							<xsl:text>&amp;XsltLocation=[SRA Root]/Resources/PPTReports/ProjectTollgate-ProjectTeam.xslt</xsl:text>
							<xsl:text>&amp;OutputType=html&amp;ProjectURL=%ProjectURL%</xsl:text>
						</xsl:attribute>
					</Text>
					<Text top="510" left="20" width="1" height="1" borderwidth="0" bordercolor="White" firstrowbgcolor="White" altrowbgcolor="White" textheight="8" rowheight="8">	
						<xsl:attribute name="url">
							<xsl:text>%ISiteURL%/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=BatchRequest</xsl:text>
							<xsl:text>&amp;ConfigFileLocation=[SRA Root]/Resources/PPTReports/ProjectTollgate-ProjectKPI.xml</xsl:text>
							<xsl:text>&amp;XsltLocation=[SRA Root]/Resources/PPTReports/ProjectTollgate-ProjectKPI.xslt</xsl:text>
							<xsl:text>&amp;OutputType=html&amp;ProjectURL=%ProjectURL%</xsl:text>
						</xsl:attribute>
					</Text>
					
				</Slide>
				<!--	
					<Replace variable="%TeamLeaders%">
						<xsl:for-each select="tokenize(@ows_TeamLeader, ';#')">
							<xsl:if test="(position() mod 2) = 0">
							<xsl:value-of select="current()"/><xsl:text>, </xsl:text>
							</xsl:if>
						</xsl:for-each>
					</Replace>
					<Replace variable="%Methodology%">
						<xsl:value-of select="@ows_Methodology"/>
					</Replace>
					<Replace variable="%ProblemStatement%">
						<xsl:value-of select="@ows_CharterProblemStatement"/>
					</Replace>
					<Replace variable="%GoalStatement%">
						<xsl:value-of select="@ows_CharterGoalStatement"/>
					</Replace>
					<Replace variable="%BusinessCase%">
						<xsl:value-of select="@ows_CharterBusinessCase"/>
					</Replace>
					<Replace variable="%ScopeIncludes%">
						<xsl:value-of select="@ows_CharterScopeIncludes"/>
					</Replace>
					<Replace variable="%ScopeExcludes%">
						<xsl:value-of select="@ows_CharterScopeExcludes"/>
					</Replace>
				</Slide>
				<Slide number="1">
					<Replace variable="%ProjectCostsET%">
					      <xsl:choose>
						      <xsl:when test="@ows_ResourcesExpenseTargeted">
						      	<xsl:value-of select="format-number(@ows_ResourcesExpenseTargeted, '$###,###')"/>
						      </xsl:when>
						      <xsl:otherwise>$0</xsl:otherwise>
					      </xsl:choose>
					</Replace>
					<Replace variable="%ProjectCostsCT%">
					      <xsl:choose>
						      <xsl:when test="@ows_ResourcesCapitalTargeted">
						      	<xsl:value-of select="format-number(@ows_ResourcesCapitalTargeted, '$###,###')"/>
						      </xsl:when>
						      <xsl:otherwise>$0</xsl:otherwise>
					      </xsl:choose>
					</Replace>
					<Replace variable="%ProjectCostsEA%">
					      <xsl:choose>
						      <xsl:when test="@ows_ResourcesExpenseActual">
						      	<xsl:value-of select="format-number(@ows_ResourcesExpenseActual, '$###,###')"/>
						      </xsl:when>
						      <xsl:otherwise>$0</xsl:otherwise>
					      </xsl:choose>
					</Replace>
					<Replace variable="%ProjectCostsCA%">
					      <xsl:choose>
						      <xsl:when test="@ows_ResourcesCapitalActual">
						      	<xsl:value-of select="format-number(@ows_ResourcesCapitalActual, '$###,###')"/>
						      </xsl:when>
						      <xsl:otherwise>$0</xsl:otherwise>
					      </xsl:choose>
					</Replace>
					<Replace variable="%ProjectBenefitsT%">
					      <xsl:choose>
						      <xsl:when test="@ows_BenefitsTarget ">
						      	<xsl:value-of select="format-number(@ows_BenefitsTarget, '$###,###')"/>
						      </xsl:when>
						      <xsl:otherwise>$0</xsl:otherwise>
					      </xsl:choose>
					</Replace>
					<Replace variable="%ProjectBenefitsA%">
					      <xsl:choose>
						      <xsl:when test="@ows_BenefitsActual ">
						      	<xsl:value-of select="format-number(@ows_BenefitsActual, '$###,###')"/>
						      </xsl:when>
						      <xsl:otherwise>$0</xsl:otherwise>
					      </xsl:choose>
					</Replace>
					<Text top="220" left="20" width="1" height="1" borderwidth="0" bordercolor="White" firstrowbgcolor="White" altrowbgcolor="White" textheight="12" rowheight="10">	
						<xsl:attribute name="url">
							<xsl:text>%ISiteURL%/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=BatchRequest</xsl:text>
							<xsl:text>&amp;ConfigFileLocation=[SRA Root]/Resources/PPTReports/ProjectCharterV1-Users.xml</xsl:text>
							<xsl:text>&amp;XsltLocation=[SRA Root]/Resources/PPTReports/ProjectCharterV1-Users.xslt</xsl:text>
							<xsl:text>&amp;OutputType=html&amp;ProjectURL=%ProjectURL%</xsl:text>
						</xsl:attribute>
					</Text>
					<Text top="220" left="340" width="1" height="1" borderwidth="0" bordercolor="White" firstrowbgcolor="White" altrowbgcolor="White" textheight="12" rowheight="10">	
						<xsl:attribute name="url">
							<xsl:text>%ISiteURL%/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=BatchRequest</xsl:text>
							<xsl:text>&amp;ConfigFileLocation=[SRA Root]/Resources/PPTReports/ProjectCharterV1-Approval.xml</xsl:text>
							<xsl:text>&amp;XsltLocation=[SRA Root]/Resources/PPTReports/ProjectCharterV1-Approval.xslt</xsl:text>
							<xsl:text>&amp;OutputType=html&amp;ProjectURL=%ProjectURL%</xsl:text>
						</xsl:attribute>
					</Text>	
					<Text top="220" left="640" width="1" height="1" borderwidth="0" bordercolor="White" firstrowbgcolor="White" altrowbgcolor="White" textheight="12" rowheight="10">	
						<xsl:attribute name="url">
							<xsl:text>%ISiteURL%/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=BatchRequest</xsl:text>
							<xsl:text>&amp;ConfigFileLocation=[SRA Root]/Resources/PPTReports/ProjectCharterV1-Milestones.xml</xsl:text>
							<xsl:text>&amp;XsltLocation=[SRA Root]/Resources/PPTReports/ProjectCharterV1-Milestones.xslt</xsl:text>
							<xsl:text>&amp;OutputType=html&amp;ProjectURL=%ProjectURL%</xsl:text>
						</xsl:attribute>
					</Text>	
						
				</Slide>
				-->
			</Slides>
		</Configuration>	
	</xsl:template>
	<xsl:template name="FormatNumber">
		<xsl:param name="ValueToFormat"/>
		<xsl:value-of select="format-number(xs:decimal($ValueToFormat), '#,##0.00')"/>
	</xsl:template>
	<xsl:template match="Uploads"/>
</xsl:stylesheet>