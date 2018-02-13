<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:template match="/">
	<xsl:variable name="formatDate" select="'[M01]-[D01]-[Y0001]'"/>
	<xsl:choose>
		<xsl:when test="count(//Approvals/cw:listitems/rs:data/z:row) &gt; 0"> 
			<xsl:for-each select="//Approvals/cw:listitems/rs:data/z:row">
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
					
			<div id="PCDisplayRoot">
				<div class="SectionBase">
						<h2>
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
						<p>
						<label for="DueDate">Created By: </label><xsl:value-of select="substring-after(@ows_Author,';#')"/>
						</p>
						<p>
						<label for="DueDate">Created: </label><xsl:value-of select="format-date(xs:date(substring-before(@ows_Created,' ')), $formatDate)"/>
						</p>
						<p>
						<label for="DueDate">Approver: </label><xsl:value-of select="substring-after(@ows_Approver,';#')"/>
						</p>												
						<p>
						<label for="DueDate">Date Completed: </label><xsl:value-of select="format-date(xs:date(substring-before(@ows_Modified,' ')), $formatDate)"/>
						</p>
						<p>
						<label for="DueDate">Approved: </label><xsl:value-of select="@ows_Approved"/>
						</p>
						<p>
						<label for="Description">Review Comments:</label>
						<br/>
						<xsl:value-of select="@ows_ReviewComments" disable-output-escaping="yes"/>
						</p>
						<p>
						<label for="Description">Review Attachments:</label>
						<br/>
						<xsl:if test="@ows_Attachments != '0'">
							<xsl:for-each select="tokenize(@ows_Attachments, ';#')">
						        <xsl:if test="current()!=''">
						        	<a onclick="ForceDocDL('{$DocOrigin}','{current()}')">
									<xsl:for-each select="tokenize(current(), '/')">
								        <xsl:if test="position() = last()">
								        	<xsl:copy-of select="current()"/>
								        </xsl:if>
								    </xsl:for-each>
						        	</a>
						        	<br/>
						        </xsl:if>
						    </xsl:for-each>
					    </xsl:if>
						</p>
						
				</div>
				<br/>
			</div>
		  	</xsl:for-each>
		</xsl:when>
		<xsl:otherwise>
			<div id="PCDisplayRoot">
				<div id="NoItems">
				<h2>No Current Items to Review</h2>
				</div>
			
			</div>
		</xsl:otherwise>
	</xsl:choose>
	</xsl:template>
</xsl:stylesheet>