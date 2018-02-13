<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:msxsl="urn:schemas-microsoft-com:xslt"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:date="http://exslt.org/dates-and-times"
	extension-element-prefixes="date"
	exclude-result-prefixes="msxsl xsi"
	>
	<xsl:key name="projectURL" match="Tasks" use="SiteURL" />
	<xsl:key name="taskStatus" match="Tasks" use="Status" />
	<xsl:key name="taskPriority" match="Tasks" use="Priority" />
	<xsl:key name="assignedTo" match="Tasks" use="AssignedTo" />
	<xsl:key name="overdueGroup" match="Overdue" use="OverdueTypeAndSeverity" />
	<xsl:key name="resource" match="Tasks" use="AssignedTo" />
	<xsl:variable name="me" select="//NewDataSet/CurrentUser/CWDisplayName" />
	<xsl:variable name="todayDate" 
	select="concat(substring(//NewDataSet/Dates/Today/StartDate/date, 1, 4), substring(//NewDataSet/Dates/Today/StartDate/date, 6, 2), substring(//NewDataSet/Dates/Today/StartDate/date, 9, 2))" />

	<xsl:variable name="tasksList">
		<NewDataSet>
			<xsl:for-each select="//NewDataSet/Tasks[contains(AssignedTo, $me)] ">
				<xsl:copy-of select="." />
			</xsl:for-each>
		</NewDataSet>
	</xsl:variable>
	<xsl:variable name="tasks" select="$tasksList" />



	<xsl:template match="/">
		<NewDataSet>
				<!-- Create resource group for each project URL-->
				<xsl:for-each select="//NewDataSet/CurrentUser">
					<ProjectMetrics>
						<SiteTitle>
							<xsl:value-of select="CWSiteTitle" />
						</SiteTitle>
						<URL>
							<xsl:value-of select="SiteURL" />
						</URL>
						<xsl:variable name="siteURL" select="SiteURL" />
						<PlannedStartDate>
							<xsl:choose>
								<xsl:when test="count($tasks/NewDataSet/Tasks[SiteURL = $siteURL and ParentWBS = '' and StartDate != '']) &gt; 0">
									<xsl:for-each select="$tasks/NewDataSet/Tasks[SiteURL = $siteURL and ParentWBS = '' and StartDate != '']" >
										<xsl:sort select="StartDate" data-type="text" order="ascending" />
										<xsl:if test="position() = 1">
												<xsl:value-of select="StartDate" />
										</xsl:if>
									</xsl:for-each>
								</xsl:when>
								<xsl:otherwise>
									<xsl:text />
								</xsl:otherwise>
							</xsl:choose>
						</PlannedStartDate>
						<PlannedFinishDate>
							<xsl:choose>
								<xsl:when test="count($tasks/NewDataSet/Tasks[SiteURL = $siteURL and ParentWBS = '' and DueDate != '']) &gt; 0">
									<xsl:for-each select="$tasks/NewDataSet/Tasks[SiteURL = $siteURL and ParentWBS = '' and DueDate != '']" >
										<xsl:sort select="DueDate" data-type="text" order="descending" />
										<xsl:if test="position() = 1">
												<xsl:value-of select="DueDate" />
										</xsl:if>
									</xsl:for-each>
								</xsl:when>
								<xsl:otherwise>
									<xsl:text />
								</xsl:otherwise>
							</xsl:choose>
						</PlannedFinishDate>
						<ActualStartDate>
							<xsl:choose>
								<xsl:when test="count($tasks/NewDataSet/Tasks[SiteURL = $siteURL and ParentWBS = '' and ActualStart != '']) &gt; 0">
									<xsl:for-each select="$tasks/NewDataSet/Tasks[SiteURL = $siteURL and ParentWBS = '' and ActualStart != '']" >
										<xsl:sort select="ActualStart" data-type="text" order="ascending" /> 
										<xsl:if test="position() = 1">
												<xsl:value-of select="ActualStart" />
										</xsl:if>
									</xsl:for-each>
								</xsl:when>
								<xsl:otherwise>
									<xsl:text />
								</xsl:otherwise>
							</xsl:choose> 
						</ActualStartDate>
						<ActualFinishDate>
							<xsl:choose>
								<xsl:when test="count($tasks/NewDataSet/Tasks[SiteURL = $siteURL and ParentWBS = '' and ActualFinish != '']) &gt; 0" >
									<xsl:for-each select="$tasks/NewDataSet/Tasks[SiteURL = $siteURL and ParentWBS = '' and ActualFinish != '']" >
										<xsl:sort select="ActualFinish" data-type="text" order="descending" />
										<xsl:if test="position() = 1">
												<xsl:value-of select="ActualFinish" />
										</xsl:if>
									</xsl:for-each>
								</xsl:when>
								<xsl:otherwise>
									<xsl:text />
								</xsl:otherwise>
							</xsl:choose> 
						</ActualFinishDate>
						<Work>
							<xsl:variable name="work" select="sum($tasks/NewDataSet/Tasks[SiteURL = $siteURL and string(number(Work))!='NaN']/Work)" />
							<xsl:choose>
								<xsl:when test="string(number($work))='NaN'">
									<xsl:text>0.00</xsl:text> 
								</xsl:when>
								<xsl:otherwise>
									<xsl:value-of select="format-number($work,'#####0.##')" />
								</xsl:otherwise>
							</xsl:choose>
						</Work>
						<ActualWork>
							<xsl:variable name="actualWork" select="sum($tasks/NewDataSet/Tasks[SiteURL = $siteURL and string(number(ActualWork))!='NaN']/ActualWork)" />
							<xsl:choose>
								<xsl:when test="string(number($actualWork))='NaN'">
									<xsl:text>0.00</xsl:text> 
								</xsl:when>
								<xsl:otherwise>
									<xsl:value-of select="format-number($actualWork,'#####0.##')" />
								</xsl:otherwise>
							</xsl:choose>
						</ActualWork>
						<TaskCount>
							<xsl:value-of select="count($tasks/NewDataSet/Tasks[SiteURL = $siteURL]/ID)" />
						</TaskCount>
						<xsl:for-each select="//NewDataSet/Overdue[count(. | key('overdueGroup', OverdueTypeAndSeverity)[1]) = 1]">
							<OverdueTasks>
								<xsl:attribute name="OverdueTypeAndSeverity"><xsl:value-of select="OverdueTypeAndSeverity" /></xsl:attribute>
								<xsl:attribute name="Type"><xsl:value-of select="substring-before(OverdueTypeAndSeverity, '{}')" /></xsl:attribute>
								<xsl:attribute name="Severity"><xsl:value-of select="substring-after(OverdueTypeAndSeverity, '{}')" /></xsl:attribute>
								<xsl:variable name="findme" select="OverdueTypeAndSeverity" />
								<Count>
									<xsl:value-of select="count(//NewDataSet/Overdue[SiteURL = $siteURL and OverdueTypeAndSeverity = $findme and contains(AssignedTo, $me)])" />
								</Count>
								<xsl:copy-of select="Query" />
							</OverdueTasks>
						</xsl:for-each>
						<xsl:for-each select="$tasks/NewDataSet/Tasks[count(. | key('taskStatus', Status)[1]) = 1]">
							<xsl:variable name="thisStatus" select="Status" />
							<xsl:element name="StatusCount">
								<xsl:attribute name="Status" >
									<xsl:value-of select="$thisStatus" />
								</xsl:attribute>
								<Count>
									<xsl:value-of select="count($tasks/NewDataSet/Tasks[SiteURL = $siteURL and Status = $thisStatus]/ID)" />
								</Count>
							</xsl:element>
						</xsl:for-each>
						<xsl:for-each select="$tasks/NewDataSet/Tasks[count(. | key('taskPriority', Priority)[1]) = 1]">
							<xsl:variable name="thisPriority" select="Priority" />
							<xsl:element name="PriorityCount">
								<xsl:attribute name="Priority" >
									<xsl:value-of select="$thisPriority" />
								</xsl:attribute>
								<Count>
									<xsl:value-of select="count($tasks/NewDataSet/Tasks[SiteURL = $siteURL and Priority = $thisPriority]/ID)" />
								</Count>
							</xsl:element>
						</xsl:for-each>
						<xsl:for-each select="$tasks/NewDataSet/Tasks[SiteURL = $siteURL and count(. | key('assignedTo', AssignedTo)[1]) = 1]">
							<xsl:variable name="thisAssignedTo" select="AssignedTo" />
							<xsl:element name="TaskCountAssignedTo">
								<xsl:attribute name="AssignedTo" >
									<xsl:value-of select="$thisAssignedTo" />
								</xsl:attribute>
								<xsl:value-of select="count($tasks/NewDataSet/Tasks[SiteURL = $siteURL and AssignedTo = $thisAssignedTo]/ID)" />
							</xsl:element>
						</xsl:for-each>
						<BudgetedExpenses>
							<xsl:variable name="budgetedExpenses" select="sum(//NewDataSet/ExpenseTrackingCategories[SiteURL = $siteURL and string(number(BudgetedAmount))!='NaN']/BudgetedAmount)" />
							<xsl:choose>
								<xsl:when test="string(number($budgetedExpenses))='NaN'">
									<xsl:text>0.00</xsl:text> 
								</xsl:when>
								<xsl:otherwise>
									<xsl:value-of select="format-number($budgetedExpenses,'#####0.##')" />
								</xsl:otherwise>
							</xsl:choose>
						</BudgetedExpenses>
						<ActualExpenses>
							<xsl:variable name="actualExpenses" select="sum(//NewDataSet/ExpenseTracking[SiteURL = $siteURL and string(number(Amount))!='NaN']/Amount)" />
							<xsl:choose>
								<xsl:when test="string(number($actualExpenses))='NaN'">
									<xsl:text>0.00</xsl:text> 
								</xsl:when>
								<xsl:otherwise>
									<xsl:value-of select="format-number($actualExpenses,'#####0.##')" />
								</xsl:otherwise>
							</xsl:choose>
						</ActualExpenses>
						<Milestones>
							<xsl:for-each select="$tasks/NewDataSet/Tasks[SiteURL = $siteURL and Milestone = '1']">
								<xsl:copy-of select="." />
							</xsl:for-each>
						</Milestones>
					</ProjectMetrics>
				</xsl:for-each>
		</NewDataSet>
	</xsl:template>
	<xsl:template name="multiSelectHandler">
		<xsl:param name="thisMultiSelect" />
		<xsl:param name="iterationCount" />
		<xsl:choose>
			<xsl:when test="contains($thisMultiSelect, ',')">
				<xsl:variable name="numberCheck" select="contains($thisMultiSelect, ',')" />
				<!-- The characters between a pair of , -->
				<xsl:choose>
					<xsl:when test="$numberCheck = ''">
						<xsl:choose>
							<xsl:when test="contains($thisMultiSelect, ',')">
								<xsl:value-of select="normalize-space(substring-after($thisMultiSelect, ','))" />
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="normalize-space($thisMultiSelect)" />
							</xsl:otherwise>
						</xsl:choose>
					</xsl:when>
					<xsl:when test="string(number($numberCheck))='NaN'">
						<xsl:choose>
							<xsl:when test="contains($thisMultiSelect, ',')">
								<xsl:value-of select="normalize-space(substring-after($thisMultiSelect, ','))" />
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="normalize-space($thisMultiSelect)" />
							</xsl:otherwise>
						</xsl:choose>
					</xsl:when>
					<xsl:otherwise>
						<!-- Found a multiselect delimiter, remove it and check again -->
						<Tasks>
							<AssignedTo>
								<xsl:value-of select="substring-before($thisMultiSelect, ',')" />
							</AssignedTo>
						</Tasks>
						<xsl:call-template name="multiSelectHandler">
							<xsl:with-param name="iterationCount" select="$iterationCount + 1" />
							<xsl:with-param name="thisMultiSelect">
<!--
								<xsl:value-of select="substring-before($thisMultiSelect, ',')" /> 
								<xsl:text>-</xsl:text> 
-->
								<xsl:value-of select="substring-after($thisMultiSelect, ',')" /> 
							</xsl:with-param>
						</xsl:call-template>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:otherwise>
				<xsl:choose>
					<xsl:when test="$iterationCount = 1">
						<Tasks>
							<AssignedTo>
								<xsl:value-of select="normalize-space($thisMultiSelect)" />
							</AssignedTo>
						</Tasks>
					</xsl:when>
					<xsl:otherwise>
						<Tasks>
							<AssignedTo>
								<xsl:value-of select="normalize-space($thisMultiSelect)" />
							</AssignedTo>
						</Tasks>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

</xsl:stylesheet>