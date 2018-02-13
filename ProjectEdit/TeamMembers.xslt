<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:template match="/">
	<xsl:variable name="TeamMembers">
				<xsl:for-each select="//TeamMembers/cw:listitems/rs:data/z:row">
					<xsl:copy-of select="." />			
				</xsl:for-each>
	</xsl:variable>
	<xsl:variable name="Divisions">
				<xsl:for-each select="//Division/cw:listitems/rs:data/z:row">
					<xsl:copy-of select="." />			
				</xsl:for-each>
	</xsl:variable>	
	<xsl:variable name="ProjectSite">%ProjectSite%</xsl:variable>
	<xsl:variable name="formatDate" select="'[M01]-[D01]-[Y0001]'"/>
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
				<button id="TeamMembersSave" class="TeamMembersSave" disabled="disabled" data-id="{@ows_ID}">Save</button>
			</div>
			<br/>
			<div id="TeamMembersBody">
				<div id="Year">
					<div class="CostAdd">
						<button class="TeamMembersAdd">Add</button>
					</div>
					<!--			
							<div id="FinanceTip"><xsl:value-of select="//Config/cw:listitems/rs:data/z:row/@ows_FinancialsMessage" /></div>
							-->
					<table id="TeamMembersTable" class="tablesorter-default">
						<thead>
							<tr>
								<th style="width:50px" class="filter-false"></th>
								<th style="text-align:left">Name</th>
								<th style="text-align:left">Role</th>
								<th style="text-align:left">Editor</th>
								<th style="text-align:left">Division</th>
							</tr>
						</thead>
						<tbody id="TeamMembersTableBody">
							<xsl:for-each-group select="$TeamMembers/z:row" group-by="@ows_SharePointUser">
							<xsl:variable name="User" select="current-grouping-key()" />
								<tr data-id="{substring-before(@ows_SharePointUser,';#')}">
									<xsl:if test="not(@ows_Title)">
										<xsl:attribute name="datachanged">Yes</xsl:attribute>
									</xsl:if>
									<td style="vertical-align:middle">
								      	<img data-url="" title="Remove Team Member" class="TeamMembersDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/DELITEM.gif"/>
										<img data-url="" title="Edit Team Member" class="TeamMembersEditIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/editheader.png"/>
									</td>
									<td class="TMName" data-value="{substring-before(@ows_SharePointUser,';#')}">
								      	<xsl:value-of select="substring-after(@ows_SharePointUser,';#')" />
								     </td>
									<td class="Roles">
										<xsl:for-each select="$TeamMembers/z:row[@ows_SharePointUser=$User]">
											<xsl:value-of select="@ows_Role"/>
											<xsl:if test="position() != last()">
												<xsl:text>, </xsl:text>
											</xsl:if>
										</xsl:for-each>
										<xsl:for-each select="$TeamMembers/z:row[@ows_SharePointUser=$User]">
										<input class="role" style="display:none" data-id="{@ows_ID}" data-value="{@ows_Role}"/>
										</xsl:for-each>
								    </td>
									<td class="Editor">
										<xsl:choose>
											<xsl:when test="count($TeamMembers/z:row[@ows_SharePointUser=$User and @ows_Role='Team Leader'])&gt;0">
												<img style="padding:3px; margin-right:3px;" src="[SRA Root]/_layouts/images/cbchecked.gif" title="Set as Editor" class="EditorTeamLeader ui-button-disabled ui-state-disabled ui-button ui-widget ui-state-default ui-corner-all"/>																								
											</xsl:when>
											<xsl:when test="count($TeamMembers/z:row[@ows_SharePointUser=$User and @ows_Role='Team Leader'])=0 and count($TeamMembers/z:row[@ows_SharePointUser=$User and @ows_Editor0=1])&gt;0">
												<img style="padding:3px; margin-right:3px;" src="[SRA Root]/_layouts/images/cbchecked.gif" title="Set as Editor" class="EditorChecked ui-button ui-widget ui-state-default ui-corner-all"/>												
											</xsl:when>											
											<xsl:otherwise>
												<img style="padding:3px; margin-right:3px;" src="[SRA Root]/_layouts/images/cbunchecked.gif" title="Set as Editor" class="EditorUnchecked ui-button ui-widget ui-state-default ui-corner-all"/>
											</xsl:otherwise>
										</xsl:choose>										
								    </td>
								    
								    <xsl:variable name="Division">
																    
								    </xsl:variable>
									<td class="Division">
										<xsl:choose>
											<xsl:when test="@ows_Title">	
												<xsl:variable name="DivisionID" select="@ows_Title" />											
												<xsl:value-of select="$Divisions/z:row[@ows_ID=$DivisionID]/@ows_Title" />
												<input class="Division" style="display:none" value="{$DivisionID}"/>
											</xsl:when>
											<xsl:otherwise>
												<xsl:for-each select="$Divisions/z:row">
														<xsl:variable name="DivisionURLCHECK">
															<xsl:value-of select="substring-after($ProjectSite, @ows_URL)" />
														</xsl:variable>
														<xsl:if test="contains($ProjectSite, @ows_URL) and starts-with($DivisionURLCHECK, '/')">
														<!--<xsl:if test="contains($ProjectSite, @ows_URL)">
														<xsl:if test="$ProjectSite = @ows_URL">
														-->
														
															<xsl:value-of select="@ows_Title" />
															<input class="Division" style="display:none" value="{@ows_ID}"/>
														</xsl:if>
												</xsl:for-each>									
											</xsl:otherwise>
										</xsl:choose>										
								    </td>								    
								</tr>
							</xsl:for-each-group>
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
		
		<div id="TeamMembersAdd" title="Team Member Add">
			<label for="User">User<sup class="CWRequired">*</sup></label>
			<div style="padding-left:20px">
			<div id="peoplePickerTeamMembers" class="peoplePickerTeamMembers"></div>
			</div>
			<br/>
			<label for="DivisionSelect">Division<sup class="CWRequired">*</sup></label>			
			<br/>
			<div style="padding-left:20px">
			<select name="DivisionSelect" class="DivisionSelectBox">
				<xsl:for-each select="//Division/cw:listitems/rs:data/z:row">
					<option value="{@ows_ID}" data-id="{@ows_ID}">
						<xsl:if test="contains($ProjectSite, @ows_URL)">
							<xsl:attribute name="selected">selected</xsl:attribute>
						</xsl:if>
						<xsl:value-of select="@ows_Title"/>
					</option>
				</xsl:for-each>
			</select>
			</div>
			<br/>
			<label for="Roles">Roles<sup class="CWRequired">*</sup></label>
			<br/>
			<xsl:for-each select="//ProjectRoles/cw:listitems/rs:data/z:row">
				<div style="padding-left:20px">	
				<input type="checkbox" class="Roles"  data-id="New" data-value="{@ows_Title}" id="{@ows_Title}"/><label for="{@ows_Title}" style="width:80%"><xsl:value-of select="@ows_Title"/></label>
				</div>			
			</xsl:for-each>
			<br/>
			<br/>
			
			<div class="FullWidth">
			<button class="TeamMembersNewAdd">Save</button>
			</div>
		</div>
		<div id="TeamMembersEdit" title="Approvals Edit">
			<label for="User">User</label>
			<br/>
			<div style="padding-left:20px" id="EditUserName"></div>
			<!--
			<div id="peoplePickerApproverEdit" class="peoplePickerApprover"></div><br/>	
			-->	
			<label for="DivisionSelect">Division<sup class="CWRequired">*</sup></label>
			<br/>
			<div style="padding-left:20px">
			<select name="DivisionSelect" class="DivisionSelectBox">
				<xsl:for-each select="//Division/cw:listitems/rs:data/z:row">
					<option value="{@ows_ID}" data-id="{@ows_ID}"><xsl:value-of select="@ows_Title"/></option>
				</xsl:for-each>
			</select>
			</div>
			<br/>
			<label for="Roles">Roles<sup class="CWRequired">*</sup></label>
			<br/>
			<xsl:for-each select="//ProjectRoles/cw:listitems/rs:data/z:row">
				<div style="padding-left:20px">	
				<input type="checkbox" class="Roles"  dataid="New" datavalue="{@ows_Title}" id="{@ows_Title}"/><label for="{@ows_Title}" style="width:80%"><xsl:value-of select="@ows_Title"/></label>
				</div>			
			</xsl:for-each>
			<br/>
			<br/>			
			<div class="FullWidth">
			<button class="TeamMembersEdit" CurrentID="">Save</button>
			</div>		
		</div>
		
		<div id="TeamMembersError" title="Error">Error Missing Information</div>
		<div id="TeamMembersDup" title="Duplicate User">Error one or more of the users that you are trying to add is already a team member.</div>
		<div id="TeamMembersNoLeader" title="Duplicate User">Error there must be at least 1 Team Leader.</div>
		<script src="[SRA Root]/Resources/ProjectEdit/TeamMembers.js"></script>
		<script src="[SRA Root]/Resources/ProjectEdit/permissions.js"></script>
		<script>
				var removeimage = '[SRA Root]/_layouts/images/DELITEM.gif';
				var editimage = '[SRA Root]/_layouts/images/editheader.png';
				var ProjectID = '<xsl:value-of select="//Projects/cw:listitems/rs:data/z:row/@ows_ID"/>';
				var cbchecked = '[SRA Root]/_layouts/images/cbchecked.gif';
				var cbunchecked = '[SRA Root]/_layouts/images/cbunchecked.gif';		
			</script>
			
				</xsl:template>
			</xsl:stylesheet>