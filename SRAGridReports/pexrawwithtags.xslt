<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs">
	<xsl:output method="html"/>
	<xsl:template match="/">
		<xsl:variable name="MultiDelimiter"><![CDATA[^\d+;#|;#\d+;#|;#]]></xsl:variable>
		<xsl:variable name="thisYear"><xsl:value-of select="substring-before('%TodayRfc%','-')"/></xsl:variable>
		<xsl:variable name="Tags">
			<xsl:variable name="Keys">
				<!--
				<xsl:for-each select="NewDataSet/Projects/*/*/*[@ows_BenefitsFull]/@ows_adhoctagging">
				-->
				<xsl:for-each select="NewDataSet/Projects/*/*/*/@ows_adhoctagging">
					<xsl:for-each-group select="tokenize(.,';#')[. != '']" group-by=".">
						<Key>
							<xsl:value-of select="concat('_',replace(tokenize(.,'##')[1],' ','_'))"/>
						</Key>			
					</xsl:for-each-group>
				</xsl:for-each>					
			</xsl:variable>
			<xsl:for-each-group select="$Keys" group-by="Key">
				<xsl:sort select="current-grouping-key()"/>
				<Tag><xsl:value-of select="current-grouping-key()"/></Tag>
			</xsl:for-each-group>
		</xsl:variable>
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
					<ProjectTags>
						<xsl:for-each select="tokenize(@ows_adhoctagging,';#')[. != '']">
							<xsl:element name="{concat('_',replace(tokenize(.,'##')[1],' ','_'))}">
								<xsl:value-of select="tokenize(.,'##')[2]"/>
							</xsl:element>			
						</xsl:for-each>
					
					</ProjectTags>
				</xsl:variable>
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
						<ProjectKPIValue><xsl:value-of select="$project/Project/@projectKPIValue"/></ProjectKPIValue>								
						<ProjectKPIIcon><xsl:value-of select="$project/Project/@projectKPIIcon"/></ProjectKPIIcon>
						<ProjectMap><xsl:value-of select="$project/Project/@projectMap"/></ProjectMap>
						<ProjectTags>
							<xsl:for-each select="$Tags/Tag">
								<xsl:variable name="thisTag" select="."/>
								<xsl:element name="{.}">
									<xsl:value-of select="$project/ProjectTags/*[name(.) = $thisTag]"/>
								</xsl:element>
							</xsl:for-each>
						</ProjectTags>
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
					<Region><xsl:value-of select="//Region[ID = $reg]/Title"/></Region>
					<Location><xsl:value-of select="//Location[ID = $loc]/Title"/></Location>
					<ProjectID><xsl:value-of select="ProjectID"/></ProjectID>
					<Project><xsl:value-of select="Project"/></Project>
					<Methodology><xsl:value-of select="//Map[ID = $map]/Title"/></Methodology>
					<Status>
						<xsl:value-of select="//Status[ID = $status]/Title"/>
					</Status>					
					<KPI><xsl:value-of select="if (//Status[ID = $status]/Title = 'Active') then ProjectKPIValue else ''"/></KPI>
					<Category><xsl:value-of select="//Category[ID = $cat]/Title"/></Category>
					<Subcategory><xsl:value-of select="//Subcategory[ID = $subcat]/Title"/></Subcategory>
					
					<xsl:for-each select="ProjectTags/*">
						<xsl:copy-of select="."/>
					</xsl:for-each>
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
					<ProjectTags>
						<xsl:for-each select="tokenize(@ows_adhoctagging,';#')[. != '']">
							<xsl:element name="{concat('_',replace(tokenize(.,'##')[1],' ','_'))}">
								<xsl:value-of select="tokenize(.,'##')[2]"/>
							</xsl:element>			
						</xsl:for-each>
					
					</ProjectTags>
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

					
					<Data>
						<Date><xsl:value-of select="$thisProjectDate"/></Date>
						<Year><xsl:value-of select="tokenize($thisProjectDate,'-')[1]"/></Year>
						<Division><xsl:value-of select="$Benefits/Divisions/Division[ID = $div]/Title"/></Division>
						<Region><xsl:value-of select="$Benefits/Divisions-Regions/Region[ID = $reg]/Title"/></Region>
						<Location><xsl:value-of select="$Benefits/Locations/Location[ID = $loc]/Title"/></Location>										
						<ProjectID><xsl:value-of select="$pro"/></ProjectID>
						<Project><xsl:value-of select="$project/Project/@projectTitle"/></Project>
						<Methodology><xsl:value-of select="$Benefits/Maps/Map[ID = $map]/Title"/></Methodology>
						<Status><xsl:value-of select="$Benefits/Statuses/Status[ID = $status]/Title"/></Status>					
						<KPI><xsl:value-of select="if ($Benefits/Statuses/Status[ID = $status]/Title = 'Active') then $project/Project/@projectKPIValue else ''"/></KPI>
						<Category><xsl:value-of select="$Benefits/Categories/Category[ID = $cat]/PExTitle"/></Category>
						<Subcategory><xsl:value-of select="$Benefits/Subcategories/Subcategory[ID = $subcat]/Title"/></Subcategory>
						<xsl:for-each select="$Tags/Tag">
							<xsl:variable name="thisTag" select="."/>
							<xsl:element name="{.}">
								<xsl:value-of select="$project/ProjectTags/*[name(.) = $thisTag]"/>
							</xsl:element>
						</xsl:for-each>
						<Target><xsl:value-of select="format-number(0,'#')"/></Target>
						<Actual><xsl:value-of select="format-number(0,'#')"/></Actual>
					</Data>
				</xsl:if>

							
			<xsl:for-each select="tokenize(@ows_BenefitsFull,$MultiDelimiter)[. != '']">
				<xsl:variable name="this" select="tokenize(.,'##')"/>
				<xsl:variable name="div" select="$this[3]"/>
				<xsl:variable name="reg" select="$this[4]"/>
				<xsl:variable name="loc" select="$this[5]"/>
				<xsl:variable name="pro" select="$project/Project/@projectTitle"/>
				<xsl:variable name="cat" select="$this[6]"/>
				<xsl:variable name="subcat" select="$this[7]"/>
				<xsl:variable name="map" select="$project/Project/@projectMap"/>
				<xsl:variable name="status" select="$project/Project/@projectStatus"/>
			
				<Data>		
				
					<Date><xsl:value-of select="concat($this[2],'-',format-number(xs:double($this[1]),'00'),'-01')"/></Date>
					<Year><xsl:value-of select="$this[2]"/></Year>
					<Division><xsl:value-of select="$Benefits/Divisions/Division[ID = $div]/Title"/></Division>
					<Region><xsl:value-of select="$Benefits/Divisions-Regions/Region[ID = $reg]/Title"/></Region>
					<Location><xsl:value-of select="$Benefits/Locations/Location[ID = $loc]/Title"/></Location>
					<ProjectID><xsl:value-of select="$project/Project/@projectID"/></ProjectID>
					<Project><xsl:value-of select="$project/Project/@projectTitle"/></Project>
					<Methodology><xsl:value-of select="$Benefits/Maps/Map[ID = $map]/Title"/></Methodology>
					<Status><xsl:value-of select="$Benefits/Statuses/Status[ID = $status]/Title"/></Status>
					<KPI><xsl:value-of select="if ($Benefits/Statuses/Status[ID = $status]/Title = 'Active') then $project/Project/@projectKPIValue else ''"/></KPI>
					<Category><xsl:value-of select="$Benefits/Categories/Category[ID = $cat]/Title"/></Category>
					<Subcategory><xsl:value-of select="$Benefits/Subcategories/Subcategory[ID = $subcat]/Title"/></Subcategory>
					<xsl:for-each select="$Tags/Tag">
						<xsl:variable name="thisTag" select="."/>
						<xsl:element name="{.}">
							<xsl:value-of select="$project/ProjectTags/*[name(.) = $thisTag]"/>
						</xsl:element>
					</xsl:for-each>
					<Target><xsl:value-of select="if($this[8]) then $this[8] else 0"/></Target>
					<Actual><xsl:value-of select="if($this[9]) then $this[9] else 0"/></Actual>	
					
				</Data>
			</xsl:for-each>	
			
		</xsl:for-each>
					
		</xsl:variable>
	
		<div>
			<div style="border-bottom:1px gray solid;">
				<h2 style="font-family:Arial">All Cost Savings - Raw Data with Custom Project Tags</h2>
			</div>
			<div style="overflow:auto; padding-top:5px;">
				<input id="tableExport" style="padding:5px; border-radius:3px; float:right;" type="button" value="Download Data" title="Will save data in a comma separated values (CSV) format"></input>
			</div>
			
			<table id="pexRawWithTags">
				<thead>
				    <tr>
				      <td class="pager" colspan="{count($Financials/Data[1]/*)}">
				        <img src="[SRA Root]/Resources/TableSorter/pager/icons/first.png" class="first"/>
				        <img src="[SRA Root]/Resources/TableSorter/pager/icons/prev.png" class="prev"/>
				        <span class="pagedisplay"></span> <!-- this can be any element, including an input -->
				        <img src="[SRA Root]/Resources/TableSorter/pager/icons/next.png" class="next"/>
				        <img src="[SRA Root]/Resources/TableSorter/pager/icons/last.png" class="last"/>
				      </td>
				    </tr>
					<tr>
						<xsl:for-each select="$Financials/Data[1]/*">
							<th element="{name(.)}"><xsl:value-of select="replace(name(.),'_',' ')"/></th>
						</xsl:for-each>
					</tr>
				</thead>
				<tbody>
					<xsl:for-each select="$Financials/Data">
						<tr>
							<xsl:for-each select="*">
									<td element="{name(.)}"><xsl:value-of select="."/></td>				
							</xsl:for-each>
						</tr>
					</xsl:for-each>
				</tbody>
				<tfoot>
				    <tr>
				      <td class="pager" colspan="{count($Financials/Data[1]/*)}">
				        <img src="[SRA Root]/Resources/TableSorter/pager/icons/first.png" class="first"/>
				        <img src="[SRA Root]/Resources/TableSorter/pager/icons/prev.png" class="prev"/>
				        <span class="pagedisplay"></span> <!-- this can be any element, including an input -->
				        <img src="[SRA Root]/Resources/TableSorter/pager/icons/next.png" class="next"/>
				        <img src="[SRA Root]/Resources/TableSorter/pager/icons/last.png" class="last"/>
				      </td>
				    </tr>					
				</tfoot>
			</table>
			<div style="overflow:auto;">
				<input id="tableExport" style="padding:5px; border-radius:3px; float:right;" type="button" value="Download Data" title="Will save data in a comma separated values (CSV) format"></input>
			</div>
		</div>
	</xsl:template>
</xsl:stylesheet>
