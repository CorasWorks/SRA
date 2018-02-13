<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:template match="/">
	<xsl:variable name="formatDate" select="'[M01]-[D01]-[Y0001]'"/>
		<div id="ApprovalReload" style="display:none">
			<div id="busyLoader" style="text-align: center;">
				<h2 style="text-align:center">
					<span id="busySpinner">
					</span>
					<img src="[SRA Root]/_layouts/AppDesigner/Apps/ApplicationDesigner/Images/ProcessDesigner.gif" style="vertical-align:middle;padding:5px"/>
					<br/>Saving Changes...</h2>
			</div>
		</div>
		<div id="ApprovalData">
			<div id="ApprovalBody">
				<div id="Year">
					<table id="ApprovalTable" class="tablesorter-default">
						<thead>
							<tr>
								<th style="width:50px" class="filter-false"></th>
								<th>Approval Request</th>
								<!--
								<th>Approver</th>
								-->
								<th>Due Date</th>
								<th>Project</th>
								<th data-value="!Yes|No">Approved</th>
							</tr>
						</thead>
						<tbody id="ApprovalTableBody">
						 <xsl:for-each select="//Approvals">
							<xsl:variable name="SiteUrl"><xsl:value-of select="@SiteUrl" /></xsl:variable>
							<xsl:variable name="SiteTitle"><xsl:value-of select="@SiteTitle" /></xsl:variable>
							<xsl:variable name="ListGuid"><xsl:value-of select="@ListGuid" /></xsl:variable>			
							<xsl:for-each select="cw:listitems/rs:data/z:row">
							<xsl:variable name="ApprovalAction">						
							   <xsl:value-of select="$SiteUrl"/><xsl:text>/_layouts/CorasWorks.Central.Administration/ActionForm.aspx?actionUrl=</xsl:text>
							   <xsl:text>[SRA Root]/Actions%20Library/ApprovalChain.cwad&amp;listItem=</xsl:text>	
						       <xsl:value-of select="$SiteUrl"/>
						       <xsl:text>/</xsl:text>
						       <xsl:value-of select="$ListGuid"/>
						       <xsl:text>/</xsl:text>
						       <xsl:value-of select="substring-after(@ows_UniqueId,';#')"/>
							</xsl:variable>
							<xsl:variable name="ApprovalView">				
							   <xsl:text>%ISiteURL%/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=GetFileContents&amp;FileUrl=[SRA Root]/Resources/MainApprovalsDisplay/ProjectApprovalSingle.htm&amp;OutputType=html</xsl:text>
							   <xsl:text>&amp;APID=</xsl:text>	
						       <xsl:value-of select="@ows_ID"/>
						       <xsl:text>&amp;ProjectURL=</xsl:text>
						       <xsl:value-of select="$SiteUrl"/>
							</xsl:variable>														
								<tr data-id="{@ows_ID}">
									<td style="vertical-align:middle">
										<img data-url="{$ApprovalView}" title="View Approval" class="ApprovalViewIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/gosearch15.png"/>									
										<xsl:if test="not(@ows_Approved)">
										<img data-url="{$ApprovalAction}" title="Edit Approval" class="ApprovalEditIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/editheader.png"/>
									  	</xsl:if>
									  </td>
									<td>
								      	<xsl:value-of select="@ows_Title" />
								      </td>
								      <!--
									<td>
								      	<xsl:value-of select="substring-after(@ows_Approver,';#')" />
								      </td>
								      -->
									<td>
										<xsl:value-of select="format-date(xs:date(substring-before(@ows_DueDate,' ')), $formatDate)"/>
								      </td>
									<td>
										<a href="{$SiteUrl}"><xsl:value-of select="$SiteTitle" /></a>
								      </td>								      
									<td>
								      	<xsl:value-of select="@ows_Approved" />
								      </td>
								</tr>
								</xsl:for-each>
							</xsl:for-each>
						</tbody>
					</table>
					<!-- pager -->
					<!--
					<div id="pagerPCApprovals" class="pagerPCApprovals">
					  <form>
					    <img src="[SRA Root]/Resources/TableSorter/pager/icons/first.png" class="first"/>
					    <img src="[SRA Root]/Resources/TableSorter/pager/icons/prev.png" class="prev"/>
					    <span class="pagedisplay"></span>
					    <img src="[SRA Root]/Resources/TableSorter/pager/icons/next.png" class="next"/>
					    <img src="[SRA Root]/Resources/TableSorter/pager/icons/last.png" class="last"/>
					    <select class="pagesize">
					      <option value="30">30</option>
					      <option value="60">60</option>
					      <option value="90">90</option>
					    </select>
					  </form>
					</div>
										    -->

				</div>
			</div>
		</div>
		
		<!--
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
			-->
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
			<!--
			<Title><xsl:value-of select="$ApprovalActionButton"/><xsl:value-of select="@ows_Title"/></Title>
			<DueDate><xsl:value-of select="format-date(xs:date(substring-before(@ows_DueDate,' ')), $formatDate)"/></DueDate>
			<LinkedDoc><xsl:value-of select="$DocLink"/></LinkedDoc>
			<Description><xsl:value-of select="@ows_Description"/></Description>
			</Item>
			-->
	</xsl:template>
</xsl:stylesheet>