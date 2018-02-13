<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs">
	<xsl:template match="/">
		<xsl:variable name="MultiDelimiter"><![CDATA[^\d+;#|;#\d+;#|;#]]></xsl:variable>
		<xsl:variable name="thisYear"><xsl:value-of select="substring-before('%TodayRfc%','-')"/></xsl:variable>
		<xsl:variable name="Benefits">
			<Benefits>
			<xsl:for-each select="NewDataSet/Projects/*/*/*">
				<xsl:variable name="project">
					<Project projectTitle="{@ows_Title}" projectID="{@ows_ID}" projectURL="{@ows_URL}" projectStatus="{@ows_ProjectStatusID}" projectMap="{@ows_MapID}"/>
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
							<Target><xsl:value-of select="if($this[8]) then $this[8] else 0"/></Target>
							<Actual><xsl:value-of select="if($this[8]) then $this[9] else 0"/></Actual>
							<Project><xsl:value-of select="$project/Project/@projectTitle"/></Project>
							<ProjectID><xsl:value-of select="$project/Project/@projectID"/></ProjectID>
							<ProjectURL><xsl:value-of select="$project/Project/@projectURL"/></ProjectURL>
							<ProjectStatus><xsl:value-of select="$project/Project/@projectStatus"/></ProjectStatus>
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
					<Project>&lt;a href="<xsl:value-of select="ProjectURL"/>" target="_blank"&gt;<xsl:value-of select="Project"/>&lt;/a&gt;</Project>
					<Methodology><xsl:value-of select="//Map[ID = $map]/Title"/></Methodology>
					<Status><xsl:value-of select="//Status[ID = $status]/Title"/></Status>
					<Category><xsl:value-of select="//Category[ID = $cat]/Title"/></Category>
					<Subcategory><xsl:value-of select="//Subcategory[ID = $subcat]/Title"/></Subcategory>
					<Target><xsl:value-of select="format-number(Target,'#')"/></Target>
					<Actual><xsl:value-of select="format-number(Actual,'#')"/></Actual>
				</Data>
			</xsl:for-each>		
		</xsl:variable>
		<NewDataSet>
			<xsl:copy-of select="$Financials"/>
		</NewDataSet>
	</xsl:template>
</xsl:stylesheet>
