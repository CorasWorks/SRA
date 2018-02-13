<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs">
	<xsl:template match="/">
		<xsl:variable name="MultiDelimiter"><![CDATA[^\d+;#|;#\d+;#|;#]]></xsl:variable>
		<xsl:variable name="thisYear"><xsl:value-of select="substring-before('%TodayRfc%','-')"/></xsl:variable>
		<xsl:variable name="thisDiv" select="substring-after(tokenize(substring-after('%SiteURL%','http://'),'/')[contains(.,'div')],'div')"/>
		<xsl:variable name="KPIs">
			<xsl:for-each select="NewDataSet/KPIs/*/*/*">
				<KPI id="{@ows_ID}" title="{@ows_Title}" code="{@ows_Code}" image="{@ows_Image}"/>
			</xsl:for-each>
		</xsl:variable>	
		<xsl:variable name="Benefits">
		<!--
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
							<HomeDivision><xsl:value-of select="substring-after(tokenize(substring-after($project/Project/@projectURL,'http://'),'/')[contains(.,'div')],'div')"/></HomeDivision>														
					</Benefit>
				</xsl:for-each>		
			</xsl:for-each>
			</Benefits>
			-->
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
		<!--
		<xsl:variable name="Financials">
			<xsl:for-each select="$Benefits/Benefits/Benefit">
				<xsl:sort select="Project" order="ascending"/>
				<xsl:sort select="Date" order="ascending"/>
				<xsl:variable name="div" select="Division"/>
				<xsl:variable name="homeDiv" select="HomeDivision"/>
				<xsl:variable name="reg" select="Region"/>
				<xsl:variable name="loc" select="Location"/>
				<xsl:variable name="pro" select="Project"/>
				<xsl:variable name="cat" select="Category"/>
				<xsl:variable name="subcat" select="Subcategory"/>
				<xsl:variable name="map" select="ProjectMap"/>
				<xsl:variable name="status" select="ProjectStatus"/>
				<Data>
					<Date><xsl:value-of select="Date"/></Date>
					<Year><xsl:value-of select="Year"/></Year>
					<Division><xsl:value-of select="//Division[ID = $div]/Title"/></Division>
					<HomeDivision><xsl:value-of select="//Division[ID = $homeDiv]/Title"/></HomeDivision>
					<Region><xsl:value-of select="//Region[ID = $reg]/Title"/></Region>
					<Location><xsl:value-of select="//Location[ID = $loc]/Title"/></Location>
					<ProjectID><xsl:value-of select="ProjectID"/></ProjectID>
					<Project>&lt;a href="<xsl:value-of select="ProjectURL"/>" target="_blank"&gt;<xsl:value-of select="Project"/>&lt;/a&gt;</Project>
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
		-->
		<xsl:variable name="Financials">
			<xsl:for-each select="NewDataSet/Projects/*/*/*">
			
				<xsl:variable name="project">
					<xsl:variable name="thisKPI" select="@ows_ProjectStatusKPI"/>
					<xsl:variable name="thisKPIIcon" select="substring-before($KPIs/KPI[@id = $thisKPI]/@image,',')"/>
					<xsl:variable name="thisKPIIconTitle" select="$KPIs/KPI[@id = $thisKPI]/@title"/>								
					<Project projectTitle="{@ows_Title}" projectID="{@ows_ID}" projectURL="{@ows_URL}" projectStatus="{@ows_ProjectStatusID}" projectKPIValue="{$thisKPIIconTitle}" projectKPIIcon="{$thisKPIIcon}" projectMap="{@ows_MapID}"/>
				</xsl:variable>				
				<xsl:variable name="thisProjectDate" select="if(@ows_TeamLaunchTarget) then substring-before(@ows_TeamLaunchTarget,'T') else substring-before(@ows_Created,'T')"/>



				
				<xsl:if test="not(@ows_BenefitsFull) or @ows_BenefitsFull = ''">
					<xsl:variable name="div" select="substring-after(tokenize(substring-after($project/Project/@projectURL,'http://'),'/')[contains(.,'div')],'div')"/>
					<xsl:variable name="reg" select="substring-after(tokenize(substring-after($project/Project/@projectURL,'http://'),'/')[contains(.,'Reg')],'Reg')"/>
					<xsl:variable name="loc" select="substring-after(tokenize(substring-after($project/Project/@projectURL,'http://'),'/')[contains(.,'Loc')],'Loc')"/>
					<xsl:variable name="pro" select="$project/Project/@projectID"/>
					<xsl:variable name="cat" select="//Categories/*/*/*[1]/@ows_ID"/>
					<xsl:variable name="subcat"></xsl:variable>
					<xsl:variable name="map" select="$project/Project/@projectMap"/>
					<xsl:variable name="status" select="$project/Project/@projectStatus"/>
					<xsl:variable name="homeDiv" select="substring-after(tokenize(substring-after($project/Project/@projectURL,'http://'),'/')[contains(.,'div')],'div')"/>

					
					<Data>
						<HomeDivision><xsl:value-of select="$Benefits/Divisions/Division[ID = $homeDiv]/Title"/></HomeDivision>
						<Date><xsl:value-of select="$thisProjectDate"/></Date>
						<Year><xsl:value-of select="tokenize($thisProjectDate,'-')[1]"/></Year>
						<Division><xsl:value-of select="$Benefits/Divisions/Division[ID = $div]/Title"/></Division>
						<Region><xsl:value-of select="$Benefits/Divisions-Regions/Region[ID = $reg]/Title"/></Region>
						<Location><xsl:value-of select="$Benefits/Locations/Location[ID = $loc]/Title"/></Location>					
						<ProjectName><xsl:value-of select="$project/Project/@projectTitle"/></ProjectName>
						<Project>&lt;a href="<xsl:value-of select="$project/Project/@projectURL"/>" target="_blank"&gt;<xsl:value-of select="$project/Project/@projectTitle"/>&lt;/a&gt;</Project>
						<ProjectID><xsl:value-of select="$pro"/></ProjectID>
						<Methodology><xsl:value-of select="$Benefits/Maps/Map[ID = $map]/Title"/></Methodology>
						<Status>
							<xsl:value-of select="//Statuses/*/*/*[@ows_ID = $project/Project/@projectStatus]/@ows_Title"/>
							<xsl:if test="xs:string($project/Project/@projectKPIIcon) != '0' and //Statuses/*/*/*[@ows_ID = $project/Project/@projectStatus]/@ows_Title = 'Active'">
								<xsl:text><![CDATA[<img src="]]></xsl:text>
								<xsl:value-of select="$project/Project/@projectKPIIcon"/>
								<xsl:text><![CDATA[" width="12" height="12" style="padding-left:10px;" title="]]></xsl:text>
								<xsl:value-of select="$project/Project/@projectKPIValue"/>
								<xsl:text><![CDATA["/>]]></xsl:text>
							</xsl:if>
						</Status>					
						<KPI><xsl:value-of select="if (//Statuses/*/*/*[@ows_ID = $project/Project/@projectStatus]/@ows_Title = 'Active') then $project/Project/@projectKPIValue else ''"/></KPI>
						<Category><xsl:value-of select="//Categories/*/*/*[@ows_ID = $cat]/@ows_Title"/></Category>
						<Subcategory><xsl:value-of select="//Subcategorys/*/*/*[@ows_ID = $subcat]/@ows_Title"/></Subcategory>
						<Target><xsl:value-of select="format-number(0,'#')"/></Target>
						<Actual><xsl:value-of select="format-number(0,'#')"/></Actual>
					</Data>
				</xsl:if>

				<xsl:for-each select="tokenize(@ows_BenefitsFull,$MultiDelimiter)[. != '']">
					<xsl:variable name="this" select="tokenize(.,'##')"/>
					<xsl:variable name="div" select="$this[3]"/>
					<xsl:variable name="reg" select="$this[4]"/>
					<xsl:variable name="loc" select="$this[5]"/>
					<xsl:variable name="pro" select="$project/Project/@projectID"/>
					<xsl:variable name="cat" select="$this[6]"/>
					<xsl:variable name="subcat" select="$this[7]"/>
					<xsl:variable name="map" select="$project/Project/@projectMap"/>
					<xsl:variable name="status" select="$project/Project/@projectStatus"/>
					<xsl:variable name="homeDiv" select="substring-after(tokenize(substring-after($project/Project/@projectURL,'http://'),'/')[contains(.,'div')],'div')"/>

				
					<Data value="{.}">							
							<HomeDivision><xsl:value-of select="$Benefits/Divisions/Division[ID = $homeDiv]/Title"/></HomeDivision>
							<Date><xsl:value-of select="concat($this[2],'-',format-number(xs:double($this[1]),'00'),'-01')"/></Date>
							<Year><xsl:value-of select="$this[2]"/></Year>
							<Division><xsl:value-of select="$Benefits/Divisions/Division[ID = $div]/Title"/></Division>
							<Region><xsl:value-of select="$Benefits/Divisions-Regions/Region[ID = $reg]/Title"/></Region>
							<Location><xsl:value-of select="$Benefits/Locations/Location[ID = $loc]/Title"/></Location>					
							<ProjectName><xsl:value-of select="$project/Project/@projectTitle"/></ProjectName>
							<Project>&lt;a href="<xsl:value-of select="$project/Project/@projectURL"/>" target="_blank"&gt;<xsl:value-of select="$project/Project/@projectTitle"/>&lt;/a&gt;</Project>
							<ProjectID><xsl:value-of select="$pro"/></ProjectID>
							<Methodology><xsl:value-of select="$Benefits/Maps/Map[ID = $map]/Title"/></Methodology>
							<Status>
								<xsl:value-of select="$Benefits/Statuses/Status[ID = $status]/Title"/>
								<xsl:if test="xs:string($project/Project/@projectKPIIcon) != '0' and $Benefits/Statuses/Status[ID = $status]/Title = 'Active'">
									<xsl:text><![CDATA[<img src="]]></xsl:text>
									<xsl:value-of select="$project/Project/@projectKPIIcon"/>
									<xsl:text><![CDATA[" width="12" height="12" style="padding-left:10px;" title="]]></xsl:text>
									<xsl:value-of select="$project/Project/@projectKPIValue"/>
									<xsl:text><![CDATA["/>]]></xsl:text>
								</xsl:if>
							</Status>					
							<KPI><xsl:value-of select="if ($Benefits/Statuses/Status[ID = $status]/Title = 'Active') then $project/Project/@projectKPIValue else ''"/></KPI>
							<Category><xsl:value-of select="$Benefits/Categories/Category[ID = $cat]/Title"/></Category>
							<Subcategory><xsl:value-of select="$Benefits/Subcategories/Subcategory[ID = $subcat]/Title"/></Subcategory>
							<Target><xsl:value-of select="if($this[8]) then $this[8] else 0"/></Target>
							<Actual><xsl:value-of select="if($this[9]) then $this[9] else 0"/></Actual>	
					</Data>
				</xsl:for-each>			
			</xsl:for-each>	
		</xsl:variable>
		
		<NewDataSet>
			<xsl:copy-of select="$Financials"/>
		</NewDataSet>
	</xsl:template>
</xsl:stylesheet>
