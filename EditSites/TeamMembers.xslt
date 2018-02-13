<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:template match="/">	
	<xsl:variable name="formatDate" select="'[M01]-[D01]-[Y0001]'"/>
		<!--
		<script src="[SRA Root]/Resources/ProjectEdit/permissions.js"></script>
		//Site/cw:listitems/rs:data/z:row
		-->
		<script>
				var SRARoot= '[SRA Root]';
				var removeimage = '[SRA Root]/_layouts/images/DELITEM.gif';
				var GroupID = '<xsl:value-of select="//Site/cw:listitems/rs:data/z:row/@ows_UserGroupID"/>';	
			</script>
		<div id="TeamMembersReload" style="display:none">
			<div id="busyLoader" style="text-align: center;">
				<h2 style="text-align:center">
					<span id="busySpinner">
					</span>
					<img src="[SRA Root]/_layouts/AppDesigner/Apps/ApplicationDesigner/Images/ProcessDesigner.gif" style="vertical-align:middle;padding:5px"/>
					<br/>Saving Changes...</h2>
			</div>
		</div>
		<div id="TeamMembersData">
			<div>
				<button class="TeamMembersSave" disabled="disabled" data-id="{@ows_ID}">Save</button>
			</div>
			<br/>
			<div id="TeamMembersBody">
				<div id="Year">
					<div class="CostAdd">
						<button class="TeamMembersAdd">Add</button>
					</div>
					<table id="TeamMembersTable" class="tablesorter-default">
						<thead>
							<tr>
								<th style="width:50px" class="filter-false"></th>
								<th style="text-align:left">Name</th>
								<th style="text-align:left">Email</th>
								<th style="text-align:left">LoginName</th>
							</tr>
						</thead>
						<tbody id="TeamMembersTableBody">
						<!--
							<xsl:for-each-group select="$TeamMembers/z:row" group-by="@ows_SharePointUser">
							<xsl:variable name="User" select="current-grouping-key()" />
								<tr data-id="{substring-before(@ows_SharePointUser,';#')}">
									<td style="vertical-align:middle">
								      	<img data-url="" title="Remove Team Member" class="TeamMembersDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/DELITEM.gif"/>
										<img data-url="" title="Edit Team Member" class="TeamMembersEditIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/editheader.png"/>
									</td>
									<td class="TMName" data-value="{substring-before(@ows_SharePointUser,';#')}">
								      	<xsl:value-of select="substring-after(@ows_SharePointUser,';#')" />
								     </td>
								</tr>
							</xsl:for-each-group>
							-->
						</tbody>
					</table>
					<div class="CostAdd">
						<button class="TeamMembersAdd">Add</button>
					</div>
					<div style="clear:both">
					</div>
				</div>
				<br/>
				<div>
					<button class="TeamMembersSave" disabled="disabled" data-id="{@ows_ID}">Save</button>
				</div>
			</div>
		</div>
		
		<div id="TeamMembersAdd" title="User Add">
			<label for="User">User<sup class="CWRequired">*</sup></label>
			<div id="peoplePickerTeamMembers" class="peoplePickerTeamMembers"></div><br/>			
			<br/>
			
			<div class="FullWidth">
			<button class="TeamMembersNewAdd">Save</button>
			</div>
		</div>		
		<div id="TeamMembersError" title="Error">Error Missing Information</div>
		<script src="[SRA Root]/Resources/EditSites/TeamMembers.js"></script>
	</xsl:template>
</xsl:stylesheet>
