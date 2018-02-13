<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:xs="http://www.w3.org/2001/XMLSchema"
	xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/"
	xmlns:rs="urn:schemas-microsoft-com:rowset"
	xmlns:z="#RowsetSchema"
	exclude-result-prefixes="xs cw rs z">
  <xsl:output method="html" encoding="utf-8"/>
	<xsl:template match="/">
		<NewDataSet>
			<Sites>
				<xsl:for-each select="//Divisions/*/*/*">
					<Site id="D{@ows_ID}" parent="#" text="{@ows_Title}" icon="/_layouts/images/stsicon.gif">
						<li_attr title="{@ows_Title}"/>
						<a_attr href="{@ows_URL}"/>
						<!--<state opened="true"/>-->
					</Site>
				</xsl:for-each>			
				<xsl:for-each select="//Regions/*/*/*">
					<Site id="R{@ows_ID}" parent="D{@ows_ParentID}" text="{@ows_RegionSortValue}" icon="/_layouts/images/stsicon.gif">
						<li_attr title="{@ows_RegionSortValue}"/>
						<a_attr href="{@ows_URL}"/>
					</Site>
				</xsl:for-each>		
				<xsl:for-each select="//Locations/*/*/*">
					<Site id="L{@ows_ID}" parent="R{@ows_ParentID}" text="{@ows_Title}" icon="/_layouts/images/stsicon.gif">
						<li_attr title="{@ows_Title}"/>
						<a_attr href="{@ows_URL}"/>
					</Site>
				</xsl:for-each>
				<xsl:for-each select="//Projects/*/*/*">
					<Site id="P{@ows_ID}" parent="L{@ows_ParentID}" text="{@ows_Title} - {@ows_ID}" icon="/_layouts/images/stsicon.gif">
						<li_attr title="{@ows_Title} - {@ows_ID}"/>
						<a_attr href="{@ows_URL}"/>
					</Site>
				</xsl:for-each>			
		</Sites>
		<!--
			<Projects>
				<Sites>
					<Site id="1-1" parent="#" text="Project Center" icon="/_layouts/images/pplpkrorg.png">
						<li_attr title=""/>
						<a_attr href="[MIDS Project Center]"/>
					</Site>
					<xsl:for-each select="Projects/*/*/*">
						<Site id="{@ows_ID}" parent="1-1" text="{@ows_Title}" icon="/_layouts/images/stsicon.gif">
							<li_attr title="{@ows_Title}"/>
							<a_attr href="{@ows_SiteURL}"/>
						</Site>
					</xsl:for-each>
				</Sites>		
			</Projects>
			<Dashboards>
				<Sites>
					<Site id="0" parent="#" text="MIDS Home" icon="/_layouts/images/pplpkrorg.png">
						<li_attr title=""/>
						<a_attr href="[MIDS Home]"/>
					</Site>
					<xsl:for-each select="Dashboards/*/*/*">
						<Site id="{@ows_ID}" parent="{if(@ows_OrgType = 'Center') then '0' else substring-before(@ows_ParentOrg,';#')}" text="{@ows_OrgType} - {if(@ows_LongName) then @ows_LongName else @ows_ShortName}" icon="/_layouts/images/stsicon.gif">
							<li_attr title="{@ows_OrgType} - {if(@ows_LongName) then @ows_LongName else @ows_ShortName}"/>
							<a_attr href="{@ows_SiteURL}"/>
						</Site>
					</xsl:for-each>
					<xsl:for-each-group select="Portfolios/*/*/*" group-by="substring-before(@ows_Dashboard,';#')">
						<Site id="group{current-grouping-key()}" parent="{current-grouping-key()}" text="Groupings" icon="/_layouts/images/stsicon.gif">
							<li_attr title="Groupings"/>
						</Site>
							<xsl:variable name="groupingSet" select="current-group()"/>
							<xsl:for-each-group select="current-group()" group-by="@ows_ParentWeb">
								<xsl:for-each select="current-group()">
								<Site id="groupPort{@ows_ID}" parent="group{if(not(contains(@ows_ParentWeb,'port_'))) then substring-before(@ows_Dashboard,';#') else concat('Port',$groupingSet[current-grouping-key() = @ows_SiteURL]/@ows_ID)}" text="Grouping - {@ows_Title}" icon="/_layouts/images/stsicon.gif">
									<li_attr title="Grouping - {@ows_Title}"/>
									<a_attr href="{@ows_SiteURL}"/>
								</Site>
								</xsl:for-each>
							</xsl:for-each-group>
						
					</xsl:for-each-group>
				</Sites>
			</Dashboards>	
		-->	
		</NewDataSet>	
	</xsl:template>
</xsl:stylesheet>