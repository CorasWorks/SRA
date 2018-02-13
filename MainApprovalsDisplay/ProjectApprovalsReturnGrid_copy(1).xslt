<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="xml" omit-xml-declaration="yes"/>
	<xsl:template match="/">
<NewDataSet>	
	<xsl:variable name="formatDate" select="'[M01]-[D01]-[Y0001]'"/>
		<xsl:for-each select="//Approvals/NewDataSet/Approvals/cw:listitems/rs:data/z:row">
		<Item>
			<xsl:variable name="ApprovalAction">						
			   <xsl:text>LaunchProjectApproval('%ISiteURL%/_layouts/CorasWorks.Central.Administration/ActionForm.aspx?actionUrl=</xsl:text>
			   <xsl:text>[SRA Root]/Actions%20Library/CompleteApproval.cwad&amp;listItem=</xsl:text>	
		       <xsl:value-of select="//Approvals/@SiteUrl"/>
		       <xsl:text>/</xsl:text>
		       <xsl:value-of select="//Approvals/@ListGuid"/>
		       <xsl:text>/</xsl:text>
		       <xsl:value-of select="substring-after(@ows_UniqueId,';#')"/>
		       <xsl:text>')</xsl:text>
			</xsl:variable>
			<xsl:variable name="DocOrigin"><xsl:value-of select="//Approvals/@SiteUrl"/></xsl:variable>
			<xsl:variable name="ApprovalActionButton">
				<xsl:text>&lt;img title=&quot;Enter Approval&quot; src=&quot;../_layouts/images/editheader.png&quot; class=&quot;ui-button ui-widget ui-state-default ui-corner-all&quot; onclick=&quot;</xsl:text>
				<xsl:value-of select="$ApprovalAction"/><xsl:text>/&gt;</xsl:text>					
			</xsl:variable>

			<xsl:variable name="DocLink">
				<xsl:text>&lt;a onclick="ForceDocDL('</xsl:text>
				<xsl:value-of select="$DocOrigin"/>
				<xsl:text>','</xsl:text>
				<xsl:value-of select="@ows_LinkedDocURL"/>
				<xsl:text>')"&gt;</xsl:text>
				<xsl:value-of select="@ows_LinkedDocTitle"/>
				<xsl:text>&lt;/a&gt;</xsl:text>
			</xsl:variable>
					<!--
			<div id="PCDisplayRoot">
				<div class="SectionBase">
						<h2>
						<img onclick="{$ApprovalAction}" title="Complete Approval" class="CharterEditIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/editheader.png"/>
						<xsl:value-of select="@ows_Title"/></h2>
						<p>
						<label for="DueDate">Due Date: </label><xsl:value-of select="format-date(xs:date(substring-before(@ows_DueDate,' ')), $formatDate)"/>
						</p>
						<xsl:if test="@ows_LinkedDocID">
							<p>
							<label for="Doc">Document: </label><a onclick="ForceDocDL('{$DocOrigin}','{@ows_LinkedDocURL}')"><xsl:value-of select="@ows_LinkedDocTitle"/></a>
							</p>						
						</xsl:if>
						
						<p>
						<label for="Description">Description</label>
						<br/>
						<xsl:value-of select="@ows_Description"/>
						</p>
				</div>
				<br/>
			</div>
			-->
			<!-- Title will be the View? -->
			<Title><xsl:value-of select="$ApprovalActionButton"/><xsl:value-of select="@ows_Title"/></Title>
			<DueDate><xsl:value-of select="format-date(xs:date(substring-before(@ows_DueDate,' ')), $formatDate)"/></DueDate>
			<LinkedDoc><xsl:value-of select="$DocLink"/></LinkedDoc>
			<Description><xsl:value-of select="@ows_Description"/></Description>
			</Item>
		  	</xsl:for-each>
</NewDataSet>		  	
	</xsl:template>
</xsl:stylesheet>