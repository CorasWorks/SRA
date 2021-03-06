﻿<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:op="http://www.w3.org/2001/12/xquery-operators" exclude-result-prefixes="xs op">
	<xsl:template match="/">
		<xsl:variable name="MultiDelimiter"><![CDATA[^\d+;#|;#\d+;#|;#]]></xsl:variable>
		<xsl:variable name="formatDate" select="'[MNn]-[Y0001]'"/>	
		<xsl:variable name="thisYear"><xsl:value-of select="substring-before('%TodayRfc%','-')"/></xsl:variable>
		<xsl:variable name="totals">%totals%</xsl:variable>
		<xsl:variable name="KPIs">
			<xsl:for-each select="NewDataSet/KPIs/*/*/*">
				<KPI id="{@ows_ID}" title="{@ows_Title}" code="{@ows_Code}" image="{@ows_Image}"/>
			</xsl:for-each>
		</xsl:variable>
		<xsl:variable name="Benefits">
			<Benefits>
			<xsl:for-each select="NewDataSet/Projects/*/*/*">
				<xsl:variable name="project">
					<xsl:variable name="thisKPI" select="@ows_ProjectStatusKPI"/>
					<xsl:variable name="thisKPIIcon" select="substring-before($KPIs/KPI[@id = $thisKPI]/@image,',')"/>
					<xsl:variable name="thisKPIIconTitle" select="$KPIs/KPI[@id = $thisKPI]/@title"/>								
					<Project projectTitle="{@ows_Title}" projectID="{@ows_ID}" projectURL="{@ows_URL}" projectStatus="{@ows_ProjectStatusID}" projectKPIValue="{$thisKPIIconTitle}" projectKPIIcon="{$thisKPIIcon}" projectMap="{@ows_MapID}"/>
				</xsl:variable>				
				<xsl:variable name="thisProjectDate" select="if(@ows_TeamLaunchTarget) then substring-before(@ows_TeamLaunchTarget,'T') else substring-before(@ows_Created,'T')"/>
				
				<xsl:if test="not(@ows_BenefitsFull) or @ows_BenefitsFull = ''">
				<Benefit>
					<Date><xsl:value-of select="$thisProjectDate"/></Date>
					<Month><xsl:value-of select="tokenize($thisProjectDate,'-')[2]"/></Month>
					<Year><xsl:value-of select="tokenize($thisProjectDate,'-')[1]"/></Year>
					<Division><xsl:value-of select="substring-after(tokenize(substring-after($project/Project/@projectURL,'http://'),'/')[contains(.,'div')],'div')"/></Division>
					<Region><xsl:value-of select="substring-after(tokenize(substring-after($project/Project/@projectURL,'http://'),'/')[contains(.,'Reg')],'Reg')"/></Region>
					<Location><xsl:value-of select="substring-after(tokenize(substring-after($project/Project/@projectURL,'http://'),'/')[contains(.,'Loc')],'Loc')"/></Location>
					<Category><xsl:value-of select="//Categories/*/*/*[1]/@ows_ID"/></Category>
					<Subcategory></Subcategory>
					<Target>0</Target>
					<Actual>0</Actual>
					<Project><xsl:value-of select="$project/Project/@projectTitle"/></Project>
					<ProjectID><xsl:value-of select="$project/Project/@projectID"/></ProjectID>
					<ProjectURL><xsl:value-of select="$project/Project/@projectURL"/></ProjectURL>
					<ProjectStatus><xsl:value-of select="$project/Project/@projectStatus"/></ProjectStatus>
					<ProjectKPIValue><xsl:value-of select="$project/Project/@projectKPIValue"/></ProjectKPIValue>								
					<ProjectKPIIcon><xsl:value-of select="$project/Project/@projectKPIIcon"/></ProjectKPIIcon>
					
					<ProjectMap><xsl:value-of select="$project/Project/@projectMap"/></ProjectMap>							
					<HomeDivision><xsl:value-of select="substring-after(tokenize(substring-after($project/Project/@projectURL,'http://'),'/')[contains(.,'div')],'div')"/></HomeDivision>
				</Benefit>
				</xsl:if>

				
				<xsl:for-each select="tokenize(@ows_BenefitsFull,$MultiDelimiter)[. != '']">
					<Benefit value="{.}">
						<xsl:variable name="this" select="tokenize(.,'##')"/>
							<Date><xsl:value-of select="concat($this[2],'-',format-number(xs:double($this[1]),'00'),'-01')"/></Date>
							<Month><xsl:value-of select="$this[1]"/></Month>
							<Year><xsl:value-of select="$this[2]"/></Year>
							<Division><xsl:value-of select="$this[3]"/></Division>
							<Region><xsl:value-of select="$this[4]"/></Region>
							<Location><xsl:value-of select="$this[5]"/></Location>
							<Category><xsl:value-of select="$this[6]"/></Category>
							<Subcategory><xsl:value-of select="$this[7]"/></Subcategory>
							<Target><xsl:value-of select="if($this[8]) then $this[8] else 0"/></Target>
							<Actual><xsl:value-of select="if($this[9]) then $this[9] else 0"/></Actual>
							<Project><xsl:value-of select="$project/Project/@projectTitle"/></Project>
							<ProjectID><xsl:value-of select="$project/Project/@projectID"/></ProjectID>
							<ProjectURL><xsl:value-of select="$project/Project/@projectURL"/></ProjectURL>
							<ProjectStatus><xsl:value-of select="$project/Project/@projectStatus"/></ProjectStatus>
							<ProjectKPIValue><xsl:value-of select="$project/Project/@projectKPIValue"/></ProjectKPIValue>								
							<ProjectKPIIcon><xsl:value-of select="$project/Project/@projectKPIIcon"/></ProjectKPIIcon>							
							<ProjectMap><xsl:value-of select="$project/Project/@projectMap"/></ProjectMap>							
					</Benefit>
				</xsl:for-each>		
			</xsl:for-each>
			</Benefits>
			<Divisions>
				<xsl:for-each select="//Divisions/*/*/*">
					<Division>
						<ID><xsl:value-of select="@ows_ID"/></ID>
						<Title><xsl:value-of select="@ows_Title"/></Title>
					</Division>					
				</xsl:for-each>
			</Divisions>
			<Divisions-Regions>
				<xsl:for-each select="//Divisions-Regions/*/*/*">
					<Region>
						<xsl:variable name="thisRegion"><xsl:value-of select="@ows_RegionID"/></xsl:variable>
						<ID><xsl:value-of select="@ows_ID"/></ID>
						<Title><xsl:value-of select="//Regions/*/*/*[@ows_ID = $thisRegion]/@ows_Title"/></Title>
					</Region>					
				</xsl:for-each>
			</Divisions-Regions>
			<Locations>
				<xsl:for-each select="//Locations/*/*/*">
					<Location>
						<ID><xsl:value-of select="@ows_ID"/></ID>
						<Title><xsl:value-of select="@ows_Title"/></Title>
					</Location>					
				</xsl:for-each>
			</Locations>
			<Categories>
				<xsl:for-each select="//Categories/*/*/*">
					<Category>
						<ID><xsl:value-of select="@ows_ID"/></ID>
						<Title><xsl:value-of select="@ows_Title"/></Title>
					</Category>					
				</xsl:for-each>
			</Categories>
			<Subcategories>
				<xsl:for-each select="//Subcategories/*/*/*">
					<Subcategory>
						<ID><xsl:value-of select="@ows_ID"/></ID>
						<Title><xsl:value-of select="@ows_Title"/></Title>
					</Subcategory>					
				</xsl:for-each>
			</Subcategories>
			<Maps>
				<xsl:for-each select="//Maps/*/*/*">
					<Map>
						<ID><xsl:value-of select="@ows_ID"/></ID>
						<Title><xsl:value-of select="@ows_Title"/></Title>
					</Map>					
				</xsl:for-each>
			</Maps>
			<Statuses>
				<xsl:for-each select="//Statuses/*/*/*">
					<Status>
						<ID><xsl:value-of select="@ows_ID"/></ID>
						<Title><xsl:value-of select="@ows_Title"/></Title>
					</Status>					
				</xsl:for-each>
			</Statuses>

		</xsl:variable>
		<xsl:variable name="Financials">
			<xsl:for-each select="$Benefits/Benefits/Benefit">
				<xsl:sort select="Project" order="ascending"/>
				<xsl:sort select="Date" order="ascending"/>
				<xsl:variable name="div" select="Division"/>
				<xsl:variable name="reg" select="Region"/>
				<xsl:variable name="loc" select="Location"/>
				<xsl:variable name="pro" select="ProjectID"/>
				<xsl:variable name="cat" select="Category"/>
				<xsl:variable name="subcat" select="Subcategory"/>
				<xsl:variable name="map" select="ProjectMap"/>
				<xsl:variable name="status" select="ProjectStatus"/>
				<Data>
					<groupingKey><xsl:value-of select="concat($pro,$cat,$subcat,Year)"/></groupingKey>
					<Date><xsl:value-of select="Date"/></Date>
					<Year><xsl:value-of select="Year"/></Year>
					<Division><xsl:value-of select="//Division[ID = $div]/Title"/></Division>
					<Region><xsl:value-of select="//Region[ID = $reg]/Title"/></Region>
					<Location><xsl:value-of select="//Location[ID = $loc]/Title"/></Location>
					<ProjectName><xsl:value-of select="Project"/></ProjectName>
					<Project>&lt;a href="<xsl:value-of select="ProjectURL"/>" target="_blank"&gt;<xsl:value-of select="Project"/>&lt;/a&gt;</Project>
					<ProjectID><xsl:value-of select="$pro"/></ProjectID>
					<Methodology><xsl:value-of select="//Map[ID = $map]/Title"/></Methodology>
					<Status>
						<xsl:value-of select="//Status[ID = $status]/Title"/>
						<xsl:if test="xs:string(ProjectKPIIcon) != '0' and //Status[ID = $status]/Title = 'Active'">
							<xsl:text><![CDATA[<img src="]]></xsl:text>
							<xsl:value-of select="ProjectKPIIcon"/>
							<xsl:text><![CDATA[" width="12" height="12" style="padding-left:10px;" title="]]></xsl:text>
							<xsl:value-of select="ProjectKPIValue"/>
							<xsl:text><![CDATA["/>]]></xsl:text>
						</xsl:if>
					</Status>					
					<KPI><xsl:value-of select="if (//Status[ID = $status]/Title = 'Active') then ProjectKPIValue else ''"/></KPI>

					<Category><xsl:value-of select="//Category[ID = $cat]/Title"/></Category>
					<Subcategory><xsl:value-of select="//Subcategory[ID = $subcat]/Title"/></Subcategory>
					<Target><xsl:value-of select="format-number(Target,'#')"/></Target>
					<Actual><xsl:value-of select="format-number(Actual,'#')"/></Actual>
				</Data>
			</xsl:for-each>		
		</xsl:variable>
		<xsl:variable name="FinancialsGroupedbyProCatSubcat">
			<xsl:for-each-group select="$Financials/Data" group-by="ProjectID">
				<xsl:variable name="BenefitsCutOffDate" select="min(current-group()/Date/xs:date(.)) + xs:yearMonthDuration('P1Y')"/>
					<xsl:for-each-group select="current-group()" group-by="concat(ProjectID,Year)">
						<xsl:if test="$totals = '1'">
							<Data>
								<GroupKey><xsl:value-of select="current-grouping-key()"/></GroupKey>
								<GridSortOrder><xsl:value-of select="ProjectName"/>-z</GridSortOrder>
								<Items><xsl:value-of select="count(current-group())"/></Items>
								<MinDate><xsl:value-of select="min(current-group()/Date/xs:date(.))"/></MinDate>
								<BenefitsCutOff><xsl:value-of select="$BenefitsCutOffDate"/></BenefitsCutOff>
								<MaxDate><xsl:value-of select="max(current-group()/Date/xs:date(.))"/></MaxDate>
								<Division></Division>
								<Region></Region>
								<Location></Location>
								<ProjectID><xsl:value-of select="ProjectID"/></ProjectID>
								<ProjectName><xsl:value-of select="ProjectName"/> (<xsl:value-of select="ProjectID"/>)</ProjectName>
								<Project>&lt;a href="<xsl:value-of select="ProjectURL"/>" target="_blank"&gt; <xsl:value-of select="Project"/>&lt;/a&gt;</Project>
								<Methodology><xsl:value-of select="Methodology"/></Methodology>
								<Status><xsl:value-of select="Status"/></Status>
								<KPI><xsl:value-of select="KPI"/></KPI>
								<Year><xsl:value-of select="Year"/></Year>
								<Category>All</Category>
								<Subcategory>All</Subcategory>
								<TargetSum><xsl:value-of select="format-number(sum(current-group()/Target),'#')"/></TargetSum>
								<TargetSum1Yr><xsl:value-of select="format-number(sum(current-group()[xs:date(Date) &lt; xs:date($BenefitsCutOffDate)]/Target),'#')"/></TargetSum1Yr>
								<ActualSum><xsl:value-of select="format-number(sum(current-group()/Actual),'#')"/></ActualSum>
								<ActualSum1Yr><xsl:value-of select="format-number(sum(current-group()[xs:date(Date) &lt; xs:date($BenefitsCutOffDate)]/Actual),'#')"/></ActualSum1Yr>
							</Data>				
						</xsl:if>
					<xsl:for-each-group select="current-group()" group-by="groupingKey">
						<Data>
							<GroupKey><xsl:value-of select="current-grouping-key()"/></GroupKey>
							<GridSortOrder><xsl:value-of select="ProjectName"/>-a</GridSortOrder>
							<Items><xsl:value-of select="count(current-group())"/></Items>
							<MinDate><xsl:value-of select="min(current-group()/Date/xs:date(.))"/></MinDate>
							<BenefitsCutOff><xsl:value-of select="$BenefitsCutOffDate"/></BenefitsCutOff>
							<MaxDate><xsl:value-of select="max(current-group()/Date/xs:date(.))"/></MaxDate>
							<Division><xsl:value-of select="Division"/></Division>
							<Region><xsl:value-of select="Region"/></Region>
							<Location><xsl:value-of select="Location"/></Location>
							<ProjectID><xsl:value-of select="ProjectID"/></ProjectID>
							<ProjectName><xsl:value-of select="ProjectName"/> (<xsl:value-of select="ProjectID"/>)</ProjectName>
							<Project>&lt;a href="<xsl:value-of select="ProjectURL"/>" target="_blank"&gt;<xsl:value-of select="Project"/>&lt;/a&gt;</Project>
							<Methodology><xsl:value-of select="Methodology"/></Methodology>
							<Status><xsl:value-of select="Status"/></Status>
							<KPI><xsl:value-of select="KPI"/></KPI>
							<Year><xsl:value-of select="Year"/></Year>
							<Category><xsl:value-of select="Category"/></Category>
							<Subcategory><xsl:value-of select="Subcategory"/></Subcategory>
							<TargetSum><xsl:value-of select="format-number(sum(current-group()/Target),'#')"/></TargetSum>
							<TargetSum1Yr><xsl:value-of select="format-number(sum(current-group()[xs:date(Date) &lt; xs:date($BenefitsCutOffDate)]/Target),'#')"/></TargetSum1Yr>
							<ActualSum><xsl:value-of select="format-number(sum(current-group()/Actual),'#')"/></ActualSum>
							<ActualSum1Yr><xsl:value-of select="format-number(sum(current-group()[xs:date(Date) &lt; xs:date($BenefitsCutOffDate)]/Actual),'#')"/></ActualSum1Yr>
	
						</Data>
					</xsl:for-each-group>
				</xsl:for-each-group>
			</xsl:for-each-group>
		</xsl:variable>
		<NewDataSet>
			<xsl:for-each select="$FinancialsGroupedbyProCatSubcat/Data">
				<xsl:sort select="GridSortOrder"/>
				<xsl:copy-of select="."/>			
			</xsl:for-each>
		</NewDataSet>
	</xsl:template>
</xsl:stylesheet>
