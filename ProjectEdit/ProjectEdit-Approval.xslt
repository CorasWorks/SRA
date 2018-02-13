<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:template match="/">
	<xsl:variable name="formatDate" select="'[M01]-[D01]-[Y0001]'"/>
		<script src="[SRA Root]/Resources/ProjectEdit/Approval.js"></script>
		<script src="[SRA Root]/Resources/ProjectEdit/permissions.js"></script>
		<script>
				var removeimage = '[SRA Root]/_layouts/images/DELITEM.gif';
				var editimage = '[SRA Root]/_layouts/images/editheader.png';
				var ProjectID = '<xsl:value-of select="//Projects/cw:listitems/rs:data/z:row/@ows_ID"/>';		
			</script>
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
			<div>
				<button id="ApprovalSave" class="ApprovalSave" disabled="disabled" data-id="{@ows_ID}">Save</button>
			</div>
			<br/>
			<div id="ApprovalBody">
				<div id="Year">
					<div class="CostAdd">
						<button class="ApprovalAdd">Add</button>
					</div>
					<!--			
							<div id="FinanceTip"><xsl:value-of select="//Config/cw:listitems/rs:data/z:row/@ows_FinancialsMessage" /></div>
							-->
					<table id="ApprovalTable" class="tablesorter-default">
						<thead>
							<tr>
								<th style="width:50px" class="filter-false"></th>
								<th>Approval Request</th>
								<th>Approver</th>
								<th>Due Date</th>
								<th>Approved</th>
								<th>Original Notice Sent</th>
							</tr>
						</thead>
						<tbody id="ApprovalTableBody">
							<xsl:for-each select="//Approvals/cw:listitems/rs:data/z:row">
								<tr data-id="{@ows_ID}">
									<td style="vertical-align:middle">
								      	<img data-url="" title="Remove Approval" class="PCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/DELITEM.gif"/>
										<img data-url="" class="PCEmailAlert ui-button ui-widget ui-state-default ui-corner-all" title="Alert Approver" src="[SRA Root]/_layouts/images/EMAILPST.png"/>
									<xsl:if test="not(@ows_Approved)">	
										<img data-url="" title="Edit Approval" class="ApprovalEditIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/editheader.png"/>
									</xsl:if>  	
									  	<textarea style="display:none" class="APDescription"><xsl:value-of select="@ows_Description" /></textarea>
										<input style="display:none" class="APDocument"  data-docid="{@ows_LinkedDocID}"  data-docurl="{@ows_LinkedDocURL}"  data-docname="{@ows_LinkedDocTitle}"/>			
									  </td>
									<td class="APTitle" data-value="{@ows_Title}">
								      	<xsl:value-of select="@ows_Title" />
								      </td>
									<td class="APApprover" data-value="{substring-before(@ows_Approver,';#')}">
								      	<xsl:value-of select="substring-after(@ows_Approver,';#')" />
								      </td>
									<td class="APDueDate" data-value="{format-date(xs:date(substring-before(@ows_DueDate,' ')), '[Y0001]-[M01]-[D01]')}">
										<xsl:value-of select="format-date(xs:date(substring-before(@ows_DueDate,' ')), $formatDate)"/>
								      </td>
									<td class="APApproval" data-value="">
								      	<xsl:value-of select="@ows_Approved" />
								      </td>
								      <td>
											<xsl:value-of select="format-date(xs:date(substring-before(@ows_Created,' ')), $formatDate)"/>
								      
								      </td>
								      
								</tr>
							</xsl:for-each>
						</tbody>
					</table>
					<div class="CostAdd">
						<button class="ApprovalAdd">Add</button>
					</div>
					<div style="clear:both">
					</div>
				</div>
				<br/>
				<div>
					<button class="ApprovalSave" disabled="disabled" data-id="{@ows_ID}">Save</button>
				</div>
			</div>
		</div>
		<div id="ApprovalsAdd" title="Approvals Add">
			<label for="Title">Approval Request<sup class="CWRequired">*</sup></label>
			<input type="text" class="Title" name="Title"/><br/>
			<label for="DueDate">Due Date<sup class="CWRequired">*</sup></label>
			<input class="DueDate" type="text" data-column="DueDate"></input>
			<label for="LinkedDoc">Document To Review</label>
			<br/>
			<select name="LinkedDoc" class="LinkedDoc">
				<option selected="selected" disabled="disabled">Select a Document</option>
				<option data-id="None"  data-url="None" value="None">None</option>
				<xsl:for-each select="//Documents/cw:listitems/rs:data/z:row">			
					<option data-id="{@ows_ID}"  data-url="{@ows_EncodedAbsUrl}" value="{@ows_LinkFilenameNoMenu}"><xsl:value-of select="@ows_LinkFilenameNoMenu"/></option>
				</xsl:for-each>
			</select>
			
			<br/>
			<label for="Approver">Approver<sup class="CWRequired">*</sup></label>
			<div id="peoplePickerApprover" class="peoplePickerApprover"></div><br/>			
			<label for="Description">Description</label>
			<textarea rows="10" style="width:100%" class="Description">
			</textarea>
			<br/>
			<br/>
			
			<div class="FullWidth">
			<button class="ApprovalNewAdd">Save</button>
			</div>
		</div>
		<div id="ApprovalsEdit" title="Approvals Edit">
			<label for="Title">Title<sup class="CWRequired">*</sup></label>
			<input type="text" class="Title" name="Title"/><br/>
			<label for="DueDate">Due Date<sup class="CWRequired">*</sup></label>
			<input class="DueDate" type="text" data-column="DueDate"></input>
			<label for="LinkedDoc">Document To Review</label>
			<br/>
			<select name="LinkedDoc" class="LinkedDoc">
				<option data-id="None"  data-url="None" value="None">None</option>
				<xsl:for-each select="//Documents/cw:listitems/rs:data/z:row">			
					<option data-id="{@ows_ID}"  data-url="{@ows_EncodedAbsUrl}" value="{@ows_LinkFilenameNoMenu}"><xsl:value-of select="@ows_LinkFilenameNoMenu"/></option>
				</xsl:for-each>
			</select>			
			<br/>
			<label for="Approver">Approver<sup class="CWRequired">*</sup></label>
			<div id="peoplePickerApproverEdit" class="peoplePickerApprover"></div><br/>			
			<label for="Description">Description</label>
			<textarea rows="10" style="width:100%" class="Description">
			</textarea>
			<br/>
			<br/>
			
			<div class="FullWidth">
			<button class="ApprovalEdit" CurrentID="">Save</button>
			</div>		
		</div>
		<div id="ApprovalError" title="Error">Error Missing Information</div>		
				</xsl:template>
			</xsl:stylesheet>