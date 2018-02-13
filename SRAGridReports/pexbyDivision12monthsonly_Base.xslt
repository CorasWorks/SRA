<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:op="http://www.w3.org/2001/12/xquery-operators" exclude-result-prefixes="xs op">
	<xsl:template match="/">
		<xsl:variable name="MultiDelimiter"><![CDATA[^\d+;#|;#\d+;#|;#]]></xsl:variable>
		<xsl:variable name="formatDate" select="'[MNn]-[Y0001]'"/>	
		<xsl:variable name="thisYear"><xsl:value-of select="substring-before('%TodayRfc%','-')"/></xsl:variable>
		<xsl:variable name="thisDiv" select="substring-after(tokenize(substring-after('%PortfolioURL%','http://'),'/')[contains(.,'div')],'div')"/>		
		<xsl:variable name="Benefits">
			<Benefits>
			<xsl:for-each select="NewDataSet/Projects/*/*/*">
				<xsl:variable name="project">
					<Project projectTitle="{@ows_Title}" projectID="{@ows_ID}" projectURL="{@ows_URL}" projectStatus="{@ows_ProjectStatusID}" projectMap="{@ows_MapID}"/>
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
							<Target><xsl:value-of select="$this[8]"/></Target>
							<Actual><xsl:value-of select="$this[9]"/></Actual>
							<Project><xsl:value-of select="$project/Project/@projectTitle"/></Project>
							<ProjectID><xsl:value-of select="$project/Project/@projectID"/></ProjectID>
							<ProjectURL><xsl:value-of select="$project/Project/@projectURL"/></ProjectURL>
							<ProjectStatus><xsl:value-of select="$project/Project/@projectStatus"/></ProjectStatus>
							<ProjectMap><xsl:value-of select="$project/Project/@projectMap"/></ProjectMap>							
							<HomeDivision><xsl:value-of select="substring-after(tokenize(substring-after($project/Project/@projectURL,'http://'),'/')[contains(.,'div')],'div')"/></HomeDivision>
					</Benefit>
				</xsl:for-each>
				<!--<xsl:if test="@ows_BenefitsFull">
					<Benefit value="null">
						<Date>1970-01-01</Date>
						<Month></Month>
						<Year></Year>
						<Division><xsl:value-of select="substring-after(tokenize(substring-after($project/Project/@projectURL,'http://'),'/')[contains(.,'div')],'div')"/></Division>
						<Region></Region>
						<Location></Location>
						<Category></Category>
						<Subcategory></Subcategory>
						<Target>0</Target>
						<Actual>0</Actual>
						<Project><xsl:value-of select="$project/Project/@projectTitle"/></Project>
						<ProjectID><xsl:value-of select="$project/Project/@projectID"/></ProjectID>
						<ProjectURL><xsl:value-of select="$project/Project/@projectURL"/></ProjectURL>
						<ProjectStatus><xsl:value-of select="$project/Project/@projectStatus"/></ProjectStatus>
						<ProjectMap><xsl:value-of select="$project/Project/@projectMap"/></ProjectMap>							
						<HomeDivision><xsl:value-of select="substring-after(tokenize(substring-after($project/Project/@projectURL,'http://'),'/')[contains(.,'div')],'div')"/></HomeDivision>
					</Benefit>
				</xsl:if>-->
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
						<PExID><xsl:value-of select="if(@ows_PExReportGroup) then substring-before(@ows_PExReportGroup,';#') else @ows_ID"/></PExID>
						<PExTitle><xsl:value-of select="if(@ows_PExReportGroup) then upper-case(replace(substring-after(@ows_PExReportGroup,';#'),' ','')) else upper-case(replace(@ows_Title,' ',''))"/></PExTitle>
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
				<xsl:variable name="homeDiv" select="HomeDivision"/>
				<xsl:variable name="reg" select="Region"/>
				<xsl:variable name="loc" select="Location"/>
				<xsl:variable name="pro" select="ProjectID"/>
				<xsl:variable name="cat" select="Category"/>
				<xsl:variable name="subcat" select="Subcategory"/>
				<xsl:variable name="map" select="ProjectMap"/>
				<xsl:variable name="status" select="ProjectStatus"/>
				<Data>
					<groupingKey><xsl:value-of select="concat($div,$pro,Year,$cat)"/></groupingKey>
					<Date><xsl:value-of select="Date"/></Date>
					<Year><xsl:value-of select="Year"/></Year>
					<Division id="{$div}"><xsl:value-of select="//Division[ID = $div]/Title"/></Division>
					<HomeDivision id="{$homeDiv}"><xsl:value-of select="//Division[ID = $homeDiv]/Title"/></HomeDivision>
					<Region><xsl:value-of select="//Region[ID = $reg]/Title"/></Region>
					<Location><xsl:value-of select="//Location[ID = $loc]/Title"/></Location>
					<ProjectName><xsl:value-of select="Project"/></ProjectName>
					<Project>&lt;a href="<xsl:value-of select="ProjectURL"/>" target="_blank"&gt;<xsl:value-of select="Project"/>&lt;/a&gt;</Project>
					<ProjectID><xsl:value-of select="$pro"/></ProjectID>
					<Methodology><xsl:value-of select="//Map[ID = $map]/Title"/></Methodology>
					<Status><xsl:value-of select="//Status[ID = $status]/Title"/></Status>
					<Category><xsl:value-of select="//Category[ID = $cat]/PExTitle"/></Category>
					<CategoryID><xsl:value-of select="//Category[ID = $cat]/PExID"/></CategoryID>
					<Subcategory><xsl:value-of select="//Subcategory[ID = $subcat]/Title"/></Subcategory>
					<Target><xsl:value-of select="format-number(Target,'#')"/></Target>
					<Actual><xsl:value-of select="format-number(Actual,'#')"/></Actual>
				</Data>
			</xsl:for-each>		
		</xsl:variable>
		<xsl:variable name="FinancialsGroupedbyProject">
			<xsl:for-each-group select="$Financials/Data" group-by="ProjectID">
				<xsl:variable name="BenefitsCutOffDate" select="min(current-group()/Date/xs:date(.)) + xs:yearMonthDuration('P1Y')"/>				
				<xsl:for-each-group select="current-group()" group-by="groupingKey">
					<Data>
						<GroupKey><xsl:value-of select="current-grouping-key()"/></GroupKey>
						<Items><xsl:value-of select="count(current-group())"/></Items>
						<MinDate><xsl:value-of select="min(current-group()/Date/xs:date(.))"/></MinDate>
						<BenefitsCutOff><xsl:value-of select="$BenefitsCutOffDate"/></BenefitsCutOff>
						<MaxDate><xsl:value-of select="max(current-group()/Date/xs:date(.))"/></MaxDate>
						<TargetSum><xsl:value-of select="sum(current-group()/Target)"/></TargetSum>
						<TargetSum1Yr><xsl:value-of select="sum(current-group()[xs:date(Date) &lt; xs:date($BenefitsCutOffDate)]/Target)"/></TargetSum1Yr>
						<ActualSum><xsl:value-of select="sum(current-group()/Actual)"/></ActualSum>
						<ActualSum1Yr><xsl:value-of select="sum(current-group()[xs:date(Date) &lt; xs:date($BenefitsCutOffDate)]/Actual)"/></ActualSum1Yr>
						<Division id="{Division/@id}" title="{Division}">&lt;a href="[SRA Root]/div<xsl:value-of select="Division/@id"/>" target="_blank"&gt;<xsl:value-of select="Division"/>&lt;/a&gt;</Division>
						<HomeDivision id="{HomeDivision/@id}"><xsl:value-of select="HomeDivision"/></HomeDivision>
						<Region><xsl:value-of select="Region"/></Region>
						<Location><xsl:value-of select="Location"/></Location>
						<ProjectName><xsl:value-of select="ProjectName"/></ProjectName>
						<Project><xsl:value-of select="Project"/></Project>
						<ProjectID><xsl:value-of select="ProjectID"/></ProjectID>
						<Methodology><xsl:value-of select="Methodology"/></Methodology>
						<Category><xsl:value-of select="Category"/></Category>
						<CategoryID><xsl:value-of select="CategoryID"/></CategoryID>
						<Status><xsl:value-of select="Status"/></Status>
						<Year><xsl:value-of select="Year"/></Year>
					</Data>
				</xsl:for-each-group>
			</xsl:for-each-group>
		</xsl:variable>			
		<xsl:variable name="FinancialsGroupedbyDivision">
			<xsl:choose>
				<xsl:when test="$thisDiv != ''">
						<Data>
							<GridSort>z-GRAND TOTAL</GridSort>			
							<Division>GRAND TOTAL</Division>
							<HomeDivision><xsl:value-of select="HomeDivision"/></HomeDivision>
							<Region></Region>
							<Location></Location>
							<Project></Project>
							<YearGroup><xsl:value-of select="min($FinancialsGroupedbyProject/Data[Division/@id = $thisDiv]/Year)"/>-<xsl:value-of select="max($FinancialsGroupedbyProject/Data[Division/@id = $thisDiv]/Year)"/></YearGroup>
							<Year><xsl:value-of select="min($FinancialsGroupedbyProject/Data[Division/@id = $thisDiv]/Year)"/>-<xsl:value-of select="max($FinancialsGroupedbyProject/Data[Division/@id = $thisDiv]/Year)"/></Year>
							<ActiveProjects>-</ActiveProjects>
							<CompletedProjects>-</CompletedProjects>
							<ActiveProjectsSplit>-</ActiveProjectsSplit>
							<CompletedProjectsSplit>-</CompletedProjectsSplit>
							<TargetSum><xsl:value-of select="sum($FinancialsGroupedbyProject/Data[Division/@id = $thisDiv]/TargetSum1Yr)"/></TargetSum>
							<ActualSum><xsl:value-of select="sum($FinancialsGroupedbyProject/Data[Division/@id = $thisDiv]/ActualSum1Yr)"/></ActualSum>
							<TotalSum><xsl:value-of select="sum($FinancialsGroupedbyProject/Data[Division/@id = $thisDiv]/TargetSum1Yr) + sum($FinancialsGroupedbyProject/Data[Division/@id = $thisDiv]/ActualSum1Yr)"/></TotalSum>
							<xsl:for-each-group select="$Benefits/Categories/Category" group-by="PExTitle">
								<xsl:variable name="ReportID" select="PExID"/>
								<xsl:element name="{concat(replace(current-grouping-key(),' ',''),'Target')}">
									<xsl:value-of select="format-number(sum(if('%CurrentYear%' = '1') then $FinancialsGroupedbyProject/Data[Division/@id = $thisDiv and CategoryID = $ReportID  and Year = $thisYear]/TargetSum1Yr else $FinancialsGroupedbyProject/Data[Division/@id = $thisDiv and CategoryID = $ReportID]/TargetSum1Yr),'#')"/>
								</xsl:element>
								<xsl:element name="{concat(replace(current-grouping-key(),' ',''),'Actual')}">
									<xsl:value-of select="format-number(sum(if('%CurrentYear%' = '1') then $FinancialsGroupedbyProject/Data[Division/@id = $thisDiv and CategoryID = $ReportID  and Year = $thisYear]/ActualSum1Yr else $FinancialsGroupedbyProject/Data[Division/@id = $thisDiv and CategoryID = $ReportID]/ActualSum1Yr),'#')"/>
								</xsl:element>
							</xsl:for-each-group>				
						</Data>
						<xsl:for-each-group select="$FinancialsGroupedbyProject/Data[Division/@id = $thisDiv]" group-by="Year">
							<Data>
								<GridSort>b-All</GridSort>			
								<Division>All</Division>
								<HomeDivision><xsl:value-of select="HomeDivision"/></HomeDivision>
								<Region></Region>
								<Location></Location>
								<Project></Project>
								<YearGroup>- <xsl:value-of select="Year"/></YearGroup>
								<Year><xsl:value-of select="Year"/></Year>
								<ActiveProjects>-</ActiveProjects>
								<CompletedProjects>-</CompletedProjects>
								<ActiveProjectsSplit>-</ActiveProjectsSplit>
								<CompletedProjectsSplit>-</CompletedProjectsSplit>
								<TargetSum><xsl:value-of select="format-number(sum(current-group()/TargetSum1Yr),'#')"/></TargetSum>
								<ActualSum><xsl:value-of select="format-number(sum(current-group()/ActualSum1Yr),'#')"/></ActualSum>
								<TotalSum><xsl:value-of select="format-number(sum(current-group()/TargetSum1Yr) + sum(current-group()/ActualSum1Yr),'#')"/></TotalSum>
								<!-- Benefit Categories - Actuals & Targets -->
								<xsl:variable name="currentGroupCategories">
									<xsl:for-each-group select="current-group()" group-by="Category">
										<Category id="{CategoryID}">
											<Target>
												<xsl:value-of select="if(sum(current-group()/TargetSum1Yr) &gt; 0) then format-number(sum(current-group()/TargetSum1Yr),'#') else '0'"/>
											</Target>
											<Actual>
												<xsl:value-of select="if(sum(current-group()/ActualSum1Yr) &gt; 0) then format-number(sum(current-group()/ActualSum1Yr),'#') else '0'"/>
											</Actual>
										</Category>
									</xsl:for-each-group>													
								</xsl:variable>
								<xsl:for-each-group select="$Benefits/Categories/Category" group-by="PExTitle">
									<xsl:variable name="ReportID" select="PExID"/>
									<xsl:element name="{concat(replace(current-grouping-key(),' ',''),'Target')}">
										<xsl:value-of select="if($currentGroupCategories/Category[@id = $ReportID]/Target) then $currentGroupCategories/Category[@id = $ReportID]/Target else '0'"/>
									</xsl:element>
									<xsl:element name="{concat(replace(current-grouping-key(),' ',''),'Actual')}">
										<xsl:value-of select="if($currentGroupCategories/Category[@id = $ReportID]/Actual) then $currentGroupCategories/Category[@id = $ReportID]/Actual else '0'"/>
									</xsl:element>
								</xsl:for-each-group>
				
							</Data>				
						<xsl:for-each-group select="current-group()" group-by="Division">
							<Data>
								<GridSort>a-<xsl:value-of select="Division/@title"/></GridSort>			
								<Division><xsl:value-of select="Division"/></Division>
								<HomeDivision><xsl:value-of select="HomeDivision"/></HomeDivision>
								<Region></Region>
								<Location></Location>
								<Project></Project>
								<YearGroup>- <xsl:value-of select="Year"/></YearGroup>
								<Year><xsl:value-of select="Year"/></Year>
								<ActiveProjects><xsl:value-of select="format-number(count(distinct-values(current-group()[(Status = 'Proposed' or Status = 'Active') and Division/@id = HomeDivision/@id]/ProjectID)),'#')"/></ActiveProjects>
								<CompletedProjects><xsl:value-of select="format-number(count(distinct-values(current-group()[(Status = 'Complete' or Status = 'Closed') and Division/@id = HomeDivision/@id]/ProjectID)),'#')"/></CompletedProjects>
								<ActiveProjectsSplit><xsl:value-of select="format-number(count(distinct-values(current-group()[(Status = 'Proposed' or Status = 'Active') and Division/@id != HomeDivision/@id]/ProjectID)),'#')"/></ActiveProjectsSplit>
								<CompletedProjectsSplit><xsl:value-of select="format-number(count(distinct-values(current-group()[(Status = 'Complete' or Status = 'Closed') and Division/@id != HomeDivision/@id]/ProjectID)),'#')"/></CompletedProjectsSplit>
								<TargetSum><xsl:value-of select="format-number(sum(current-group()/TargetSum1Yr),'#')"/></TargetSum>
								<ActualSum><xsl:value-of select="format-number(sum(current-group()/ActualSum1Yr),'#')"/></ActualSum>
								<TotalSum><xsl:value-of select="format-number(sum(current-group()/TargetSum1Yr) + sum(current-group()/ActualSum1Yr),'#')"/></TotalSum>
								<!-- Benefit Categories - Actuals & Targets -->
								<xsl:variable name="currentGroupCategories">
									<xsl:for-each-group select="current-group()" group-by="Category">
										<Category id="{CategoryID}">
											<Target>
												<xsl:value-of select="if(sum(current-group()/TargetSum1Yr) &gt; 0) then format-number(sum(current-group()/TargetSum1Yr),'#') else '0'"/>
											</Target>
											<Actual>
												<xsl:value-of select="if(sum(current-group()/ActualSum1Yr) &gt; 0) then format-number(sum(current-group()/ActualSum1Yr),'#') else '0'"/>
											</Actual>
										</Category>
									</xsl:for-each-group>													
								</xsl:variable>
								<xsl:for-each-group select="$Benefits/Categories/Category" group-by="PExTitle">
									<xsl:variable name="ReportID" select="PExID"/>
									<xsl:element name="{concat(replace(current-grouping-key(),' ',''),'Target')}">
										<xsl:value-of select="if($currentGroupCategories/Category[@id = $ReportID]/Target) then $currentGroupCategories/Category[@id = $ReportID]/Target else '0'"/>
									</xsl:element>
									<xsl:element name="{concat(replace(current-grouping-key(),' ',''),'Actual')}">
										<xsl:value-of select="if($currentGroupCategories/Category[@id = $ReportID]/Actual) then $currentGroupCategories/Category[@id = $ReportID]/Actual else '0'"/>
									</xsl:element>
								</xsl:for-each-group>						
							</Data>	
						</xsl:for-each-group>
					</xsl:for-each-group>								
				</xsl:when>
				<xsl:otherwise>
					<Data>
						<GridSort>z-GRAND TOTAL</GridSort>			
						<Division>GRAND TOTAL</Division>
						<HomeDivision><xsl:value-of select="HomeDivision"/></HomeDivision>
						<Region></Region>
						<Location></Location>
						<Project></Project>
						<YearGroup><xsl:value-of select="min($FinancialsGroupedbyProject/Data/Year)"/>-<xsl:value-of select="max($FinancialsGroupedbyProject/Data/Year)"/></YearGroup>
						<Year><xsl:value-of select="min($FinancialsGroupedbyProject/Data/Year)"/>-<xsl:value-of select="max($FinancialsGroupedbyProject/Data/Year)"/></Year>
						<ActiveProjects>-</ActiveProjects>
						<CompletedProjects>-</CompletedProjects>
						<ActiveProjectsSplit>-</ActiveProjectsSplit>
						<CompletedProjectsSplit>-</CompletedProjectsSplit>
						<TargetSum><xsl:value-of select="sum($FinancialsGroupedbyProject/Data/TargetSum1Yr)"/></TargetSum>
						<ActualSum><xsl:value-of select="sum($FinancialsGroupedbyProject/Data/ActualSum1Yr)"/></ActualSum>
						<TotalSum><xsl:value-of select="sum($FinancialsGroupedbyProject/Data/TargetSum1Yr) + sum($FinancialsGroupedbyProject/Data/ActualSum1Yr)"/></TotalSum>
						<xsl:for-each-group select="$Benefits/Categories/Category" group-by="PExTitle">
							<xsl:variable name="ReportID" select="PExID"/>
							<xsl:element name="{concat(replace(current-grouping-key(),' ',''),'Target')}">
								<xsl:value-of select="format-number(sum(if('%CurrentYear%' = '1') then $FinancialsGroupedbyProject/Data[CategoryID = $ReportID  and Year = $thisYear]/TargetSum1Yr else $FinancialsGroupedbyProject/Data[CategoryID = $ReportID]/TargetSum1Yr),'#')"/>
							</xsl:element>
							<xsl:element name="{concat(replace(current-grouping-key(),' ',''),'Actual')}">
								<xsl:value-of select="format-number(sum(if('%CurrentYear%' = '1') then $FinancialsGroupedbyProject/Data[CategoryID = $ReportID  and Year = $thisYear]/ActualSum1Yr else $FinancialsGroupedbyProject/Data[CategoryID = $ReportID]/ActualSum1Yr),'#')"/>
							</xsl:element>
						</xsl:for-each-group>				
					</Data>
					<xsl:for-each-group select="$FinancialsGroupedbyProject/Data" group-by="Year">
						<Data>
							<GridSort>b-All</GridSort>			
							<Division>All</Division>
							<HomeDivision><xsl:value-of select="HomeDivision"/></HomeDivision>
							<Region></Region>
							<Location></Location>
							<Project></Project>
							<YearGroup>- <xsl:value-of select="Year"/></YearGroup>
							<Year><xsl:value-of select="Year"/></Year>
							<ActiveProjects>-</ActiveProjects>
							<CompletedProjects>-</CompletedProjects>
							<ActiveProjectsSplit>-</ActiveProjectsSplit>
							<CompletedProjectsSplit>-</CompletedProjectsSplit>								
							<TargetSum><xsl:value-of select="format-number(sum(current-group()/TargetSum1Yr),'#')"/></TargetSum>
							<ActualSum><xsl:value-of select="format-number(sum(current-group()/ActualSum1Yr),'#')"/></ActualSum>
							<TotalSum><xsl:value-of select="format-number(sum(current-group()/TargetSum1Yr) + sum(current-group()/ActualSum1Yr),'#')"/></TotalSum>
							<!-- Benefit Categories - Actuals & Targets -->
							<xsl:variable name="currentGroupCategories">
								<xsl:for-each-group select="current-group()" group-by="Category">
									<Category id="{CategoryID}">
										<Target>
											<xsl:value-of select="if(sum(current-group()/TargetSum1Yr) &gt; 0) then format-number(sum(current-group()/TargetSum1Yr),'#') else '0'"/>
										</Target>
										<Actual>
											<xsl:value-of select="if(sum(current-group()/ActualSum1Yr) &gt; 0) then format-number(sum(current-group()/ActualSum1Yr),'#') else '0'"/>
										</Actual>
									</Category>
								</xsl:for-each-group>													
							</xsl:variable>
							<xsl:for-each-group select="$Benefits/Categories/Category" group-by="PExTitle">
								<xsl:variable name="ReportID" select="PExID"/>
								<xsl:element name="{concat(replace(current-grouping-key(),' ',''),'Target')}">
									<xsl:value-of select="if($currentGroupCategories/Category[@id = $ReportID]/Target) then $currentGroupCategories/Category[@id = $ReportID]/Target else '0'"/>
								</xsl:element>
								<xsl:element name="{concat(replace(current-grouping-key(),' ',''),'Actual')}">
									<xsl:value-of select="if($currentGroupCategories/Category[@id = $ReportID]/Actual) then $currentGroupCategories/Category[@id = $ReportID]/Actual else '0'"/>
								</xsl:element>
							</xsl:for-each-group>
						</Data>				
						<xsl:for-each-group select="current-group()" group-by="Division">
							<Data>
								<GridSort>a-<xsl:value-of select="Division/@title"/></GridSort>			
								<Division><xsl:value-of select="Division"/></Division>
								<HomeDivision><xsl:value-of select="HomeDivision"/></HomeDivision>
								<Region></Region>
								<Location></Location>
								<Project></Project>
								<YearGroup>- <xsl:value-of select="Year"/></YearGroup>
								<Year><xsl:value-of select="Year"/></Year>
								<ActiveProjects><xsl:value-of select="format-number(count(distinct-values(current-group()[(Status = 'Proposed' or Status = 'Active') and Division/@id = HomeDivision/@id]/ProjectID)),'#')"/></ActiveProjects>
								<CompletedProjects><xsl:value-of select="format-number(count(distinct-values(current-group()[(Status = 'Complete' or Status = 'Closed') and Division/@id = HomeDivision/@id]/ProjectID)),'#')"/></CompletedProjects>
								<ActiveProjectsSplit><xsl:value-of select="format-number(count(distinct-values(current-group()[Division/@id != HomeDivision/@id and (Status = 'Proposed' or Status = 'Active')]/ProjectID)),'#')"/></ActiveProjectsSplit>
								<CompletedProjectsSplit><xsl:value-of select="format-number(count(distinct-values(current-group()[Division/@id != HomeDivision/@id and (Status = 'Complete' or Status = 'Closed')]/ProjectID)),'#')"/></CompletedProjectsSplit>
								<TargetSum><xsl:value-of select="format-number(sum(current-group()/TargetSum1Yr),'#')"/></TargetSum>
								<ActualSum><xsl:value-of select="format-number(sum(current-group()/ActualSum1Yr),'#')"/></ActualSum>
								<TotalSum><xsl:value-of select="format-number(sum(current-group()/TargetSum1Yr) + sum(current-group()/ActualSum1Yr),'#')"/></TotalSum>
								<!-- Benefit Categories - Actuals & Targets -->
								<xsl:variable name="currentGroupCategories">
									<xsl:for-each-group select="current-group()" group-by="Category">
										<Category id="{CategoryID}">
											<Target>
												<xsl:value-of select="if(sum(current-group()/TargetSum1Yr) &gt; 0) then format-number(sum(current-group()/TargetSum1Yr),'#') else '0'"/>
											</Target>
											<Actual>
												<xsl:value-of select="if(sum(current-group()/ActualSum1Yr) &gt; 0) then format-number(sum(current-group()/ActualSum1Yr),'#') else '0'"/>
											</Actual>
										</Category>
									</xsl:for-each-group>													
								</xsl:variable>
								<xsl:for-each-group select="$Benefits/Categories/Category" group-by="PExTitle">
									<xsl:variable name="ReportID" select="PExID"/>
									<xsl:element name="{concat(replace(current-grouping-key(),' ',''),'Target')}">
										<xsl:value-of select="if($currentGroupCategories/Category[@id = $ReportID]/Target) then $currentGroupCategories/Category[@id = $ReportID]/Target else '0'"/>
									</xsl:element>
									<xsl:element name="{concat(replace(current-grouping-key(),' ',''),'Actual')}">
										<xsl:value-of select="if($currentGroupCategories/Category[@id = $ReportID]/Actual) then $currentGroupCategories/Category[@id = $ReportID]/Actual else '0'"/>
									</xsl:element>
								</xsl:for-each-group>					
							</Data>	
						</xsl:for-each-group>
					</xsl:for-each-group>									
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<NewDataSet>
			<xsl:for-each select="if('%CurrentYear%' = '1') then $FinancialsGroupedbyDivision/Data[(contains(Year,$thisYear) and not(contains(Division,'All'))) or Division = 'GRAND TOTAL'] else $FinancialsGroupedbyDivision/Data">
				<xsl:sort select="GridSort"/>
				<xsl:copy-of select="."/>
			</xsl:for-each>
		</NewDataSet>
	</xsl:template>
</xsl:stylesheet>
