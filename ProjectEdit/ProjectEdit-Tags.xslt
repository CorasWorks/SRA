<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:template match="/">
	<xsl:variable name="formatDate" select="'[M01]-[D01]-[Y0001]'"/>
	<xsl:variable name="thisDiv"><xsl:value-of select="substring-after(tokenize(substring-after('%SiteURL%','http://'),'/')[contains(.,'div')],'div')"/><xsl:text>;#</xsl:text></xsl:variable>
	<xsl:variable name="DefaultTags">
				<xsl:for-each select="//Tags/cw:listitems/rs:data/z:row[contains(@ows_Division,$thisDiv)]">
					<xsl:copy-of select="." />			
				</xsl:for-each>
	</xsl:variable>
<!--
		<link href="[SRA Root]/Resources/paramquery/pqselect.min.css" rel="stylesheet"/>
		<script src="[SRA Root]/Resources/paramquery/pqselect.min.js"></script>
-->

		<link href="[SRA Root]/Resources/Chosen/chosen.css" rel="stylesheet"/>
		<script src="[SRA Root]/Resources/Chosen/chosen.jquery.min.js"></script>
	
		<script src="[SRA Root]/Resources/ProjectEdit/Tags.js"></script>
		<script>
				var removeimage = '[SRA Root]/_layouts/images/DELITEM.gif';
				var editimage = '[SRA Root]/_layouts/images/editheader.png';
				var ProjectID = '<xsl:value-of select="//Projects/cw:listitems/rs:data/z:row/@ows_ID"/>';		
			</script>
		<div id="TagsReload" style="display:none">
			<div id="busyLoader" style="text-align: center;">
				<h2 style="text-align:center">
					<span id="busySpinner">
					</span>
					<img src="[SRA Root]/_layouts/AppDesigner/Apps/ApplicationDesigner/Images/ProcessDesigner.gif" style="vertical-align:middle;padding:5px"/>
					<br/>Saving Changes...</h2>
			</div>
		</div>
		<div id="TagsData">
			<div>
				<button id="TagsSave" class="TagsSave" disabled="disabled" data-id="{@ows_ID}">Save</button>
			</div>
			<br/>
			<div id="TagsBody">
				<div id="Year">
					<div class="CostAdd">
						<button class="TagsAdd">Add</button>
					</div>
					<table id="TagsTable" class="tablesorter-default">
						<thead>
							<tr>
								<th style="width:50px" class="filter-false"></th>
								<th>Label</th>
								<th>Value</th>
							</tr>
						</thead>
						<tbody id="TagsTableBody">
							<xsl:variable name="Tags" select="//Projects/cw:listitems/rs:data/z:row/@ows_adhoctagging" />
							<xsl:for-each select="tokenize($Tags, ';#')">
							<!--<xsl:variable name="Tag" select="" />-->
							<xsl:if test=". !=''" >
								<xsl:variable name="Currentlabel" select="substring-before(., '##')"/>
								<xsl:variable name="IsDefault">
									<xsl:choose>
										<xsl:when test="count($DefaultTags/z:row[@ows_Title = $Currentlabel]) &gt; 0">true</xsl:when>
										<xsl:otherwise>false</xsl:otherwise>
									</xsl:choose>
								</xsl:variable>
								<xsl:variable name="DefaultType" select="$DefaultTags/z:row[@ows_Title = $Currentlabel]/@ows_FieldType" />
								<xsl:variable name="DefaultID" select="$DefaultTags/z:row[@ows_Title = $Currentlabel]/@ows_ID" />
								<tr data-id="{position()}">
									<td style="vertical-align:middle">
										<xsl:if test="$IsDefault = 'false'">
											<img data-url="" title="Remove" class="PCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/DELITEM.gif"/>									
										</xsl:if>
										<img data-isdefault="{$IsDefault}" data-defaulttype="{$DefaultType}" data-defaultid="{$DefaultID}" data-url="" title="Edit Tags" class="TagsEditIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/editheader.png"/>
										<input style="display:none" class="Label" value="{substring-before(., '##')}"/>
										<input style="display:none" class="Value" value="{substring-after(., '##')}"/>
									</td>
									<td class="Label"><xsl:value-of select="substring-before(., '##')"/></td>
									<td class="Value"><xsl:value-of select="substring-after(., '##')"/></td>
								</tr>
							</xsl:if>								
							</xsl:for-each>
						</tbody>
					</table>
					<div class="CostAdd">
						<button class="TagsAdd">Add</button>
					</div>
					<div style="clear:both">
					</div>
				</div>
				<br/>
				<div>
					<button class="TagsSave" disabled="disabled" data-id="{@ows_ID}">Save</button>
				</div>
			</div>
		</div>
		<div id="TagsAdd" title="Tags Add">
			<label for="Label">Label<sup class="CWRequired">*</sup></label>
			<input type="text" class="Label" name="Label"/><br/>
			<label for="Value">Value<sup class="CWRequired">*</sup></label>
			<input type="text" class="Value" name="Value"/><br/>
			<br/>
			<br/>
			
			<div class="FullWidth">
			<button class="TagsNewAdd">Save</button>
			</div>
		</div>
		<div id="TagsEdit" title="Tags Edit">
			<label for="Label">Label<sup class="CWRequired">*</sup></label>
			<input type="text" class="Label" name="Label"/><br/>
			<label for="Value">Value<sup class="CWRequired">*</sup></label>
			<input type="text" class="Value" name="Value"/><br/>
			<br/>
			<br/>
			
			<div class="FullWidth">
			<button class="TagsEdit" CurrentID="">Save</button>
			</div>		
		</div>
		<div id="DefaultTagsEditText" title="Tags Edit">
			<label for="Label">Label<sup class="CWRequired">*</sup></label>
			<input type="text" class="Label" name="Label" disabled="disabled"/><br/>
			<label for="Value">Value<sup class="CWRequired">*</sup></label>
			<input type="text" class="Value" name="Value"/><br/>
			<br/>
			<br/>
			
			<div class="FullWidth">
			<button class="TagsEdit" CurrentID="">Save</button>
			</div>		
		</div>
		<div id="DefaultTagsEditChoice" title="Tags Edit">
			<label for="Label">Label<sup class="CWRequired">*</sup></label>
			<input type="text" class="Label" name="Label"  disabled="disabled"/><br/>
			<label for="Value">Value<sup class="CWRequired">*</sup></label>
			<select class="Value" id="ValueChoice"></select><br/>
			<br/>
			<br/>
			
			<div class="FullWidth" style="padding-top:100px">
			<button class="TagsEdit" CurrentID="">Save</button>
			</div>		
		</div>
		<div id="DefaultTagsEditMChoice" title="Tags Edit">
			<label for="Label">Label<sup class="CWRequired">*</sup></label>
			<input type="text" class="Label" name="Label"  disabled="disabled"/><br/>
			<label for="Value">Value<sup class="CWRequired">*</sup></label>
			<select class="Value" id="ValueMChoice" multiple=""></select><br/>
			<br/>
			<br/>
			
			<div class="FullWidth"  style="padding-top:100px">
			<button class="TagsEdit" CurrentID="">Save</button>
			</div>		
		</div>
		
		<div id="TagsError" title="Error">Error - Missing Information or illegal characters. Labels can only contain letters and numbers. Values cannot contain "#", ";" or "_" characters.</div>
				
				</xsl:template>
			</xsl:stylesheet>