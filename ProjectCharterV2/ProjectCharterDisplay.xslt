<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:template match="/">
	<xsl:variable name="CurrentDay">%TodayRfc%</xsl:variable>
	<xsl:variable name="Print">%Print%</xsl:variable>
	<xsl:variable name="formatDate" select="'[M01]-[D01]-[Y0001]'"/>
	<!--
	<xsl:variable name="BaseEdit">%SiteURL%/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=GetFileContents&amp;FileUrl=[SRA Root]/Resources/ProjectEdit/ProjectEdit.htm&amp;OutputType=html&amp;LoadedTab=</xsl:variable>
	-->	
	<xsl:variable name="BaseEdit">[SRA Root]/Resources/ProjectEdit/ProjectEdit.aspx?ProjectSite=%ISiteURL%&amp;LoadedTab=</xsl:variable>
	<xsl:variable name="CharterSubEdit">&amp;CharterLoad=</xsl:variable>
	<xsl:variable name="TeamMembers">
				<xsl:for-each select="//TeamMembers/cw:listitems/rs:data/z:row">
					<xsl:copy-of select="." />			
				</xsl:for-each>
	</xsl:variable>	
	<xsl:variable name="AllowEdit">
		<xsl:choose>
			<xsl:when test="count(//EditCharter/cw:listitems/rs:data/z:row) &gt; 0" >True</xsl:when>
			<xsl:otherwise>False</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	<xsl:if test="count(//Projects/cw:listitems/rs:data/z:row)=0">
	    <h2 style="text-align:center">
	        <br/>
	        Project Record Not Found. Please Contact Admin.
	    </h2>
	</xsl:if>
	<xsl:for-each select="//Projects/cw:listitems/rs:data/z:row">		
	<div id="PCDisplayRoot">
		<!--
		<div id="PCInfo">
				<p class="PCName1"><xsl:value-of select="@ows_Title"/></p>
				<p class="PCName2">
				<span class="PCHeader">Project Leader: </span>
				<xsl:for-each select="//TeamMembers/cw:listitems/rs:data/z:row[@ows_Role = 'Team Leader']">
			        	<xsl:if test="position() &gt; 1">
				            <xsl:text>, </xsl:text>
				        </xsl:if>
			            <xsl:value-of select="substring-after(@ows_SharePointUser, ';#')"/>
			    </xsl:for-each>
			    <xsl:if test="$Print = 'true'">
					<span class="PCHeader"><xsl:text> Status as of </xsl:text></span><xsl:value-of select="format-dateTime($CurrentDay, '[M01]-[D01]-[Y0001]')"/>			    
			    </xsl:if>
				</p>
				<p class="PCName3">
				<span class="PCHeader">Division:  </span><xsl:value-of select="@ows_Division"/>
				<span class="PCHeader"> Region:  </span><xsl:value-of select="@ows_Region"/>
				<span class="PCHeader"> Location:  </span><xsl:value-of select="@ows_Location"/>
				</p>
				<p class="PCName4"><span class="PCHeader">Methodology: </span><xsl:value-of select="@ows_Methodology"/></p>
		</div>

		<div id="PCInfo">
				<p class="PCName3">
				<span class="PCHeader">Division:  </span><xsl:value-of select="@ows_Division"/>
				<span class="PCHeader"> Region:  </span><xsl:value-of select="@ows_Region"/>
				<span class="PCHeader"> Location:  </span><xsl:value-of select="@ows_Location"/>
				<span class="PCHeader"> Methodology: </span><xsl:value-of select="@ows_Methodology"/>
				</p>
		</div>
		-->		
		<div id="PCProject" class="SectionBase">
				<h2>
				<xsl:if test="$AllowEdit = 'True'">
					<img data-url="{$BaseEdit}0" title="Edit Project" class="CharterEditIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/editheader.png"/>
				</xsl:if>
				Project:</h2>		
			<table style="width:100%">					
				<tr>
					<td style="width:15%" class="PCLabel">Division: </td>
					<td style="width:40%"><xsl:value-of select="@ows_Division"/></td>
					<td style="width:15%" class="PCLabel">Project Security: </td>
					<td style="width:30%"><xsl:value-of select="@ows_ProjectSecurity"/></td>
				</tr>
				<tr>
					<td style="width:15%" class="PCLabel">Region: </td>
					<td style="width:40%"><xsl:value-of select="@ows_Region"/></td>
					<td style="width:15%" class="PCLabel">Category: </td>
					<td style="width:30%"><xsl:value-of select="@ows_Category"/></td>
				</tr>
				<tr>
					<td style="width:15%" class="PCLabel">Location: </td>
					<td style="width:30%"><xsl:value-of select="@ows_Location"/></td>				
					<td style="width:15%" class="PCLabel">Methodology: </td>
					<td style="width:40%"><xsl:value-of select="@ows_Methodology"/></td>
				</tr>				
			</table>
		</div>
		<br/>

		
		<div id="PCProblem" class="SectionBase">
				<h2>
				<xsl:if test="$AllowEdit = 'True'">
					<img data-url="{$BaseEdit}1{$CharterSubEdit}0" title="Edit Problem Statement" class="CharterEditIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/editheader.png"/>
				</xsl:if>
				Problem Statement:</h2>
				<p>
				<xsl:choose>
				      <xsl:when test="@ows_CharterProblemStatement">
				      <xsl:value-of select="@ows_CharterProblemStatement"/>
				      </xsl:when>
				      <xsl:otherwise>Not Defined</xsl:otherwise>
			      </xsl:choose>
				</p>
		</div>
		<br/>
		<div id="PCGoal" class="SectionBase">
				<h2>
				<xsl:if test="$AllowEdit = 'True'">
					<img data-url="{$BaseEdit}1{$CharterSubEdit}1" title="Edit Goal Statement" class="CharterEditIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/editheader.png"/>
				</xsl:if>
				Goal Statement:</h2>
				<p>
				<xsl:choose>
				      <xsl:when test="@ows_CharterGoalStatement">
				      	<xsl:value-of select="@ows_CharterGoalStatement"/>
				      </xsl:when>
				      <xsl:otherwise>Not Defined</xsl:otherwise>
			      </xsl:choose>
				</p>
		</div>
		<br/>
		<div id="PCMulti1">
			<div id="PCMulti2">				
				<div id="PCResources" class="SectionBase">
						<h2>
						<xsl:if test="$AllowEdit = 'True'">
							<img data-url="{$BaseEdit}2" title="Edit Project Costs" class="CharterEditIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/editheader.png"/>
						</xsl:if>
						Project Costs:</h2>
						<table id="ProResources" class="">
						  <thead>
						    <tr>
						      <th></th>	
						      <th>Targeted</th>
						      <th>Actual</th>
						    </tr>
						  </thead>
						  <tbody>
						    <tr>
						      <th>Expense</th>
						      <td>
						      <xsl:choose>
							      <xsl:when test="@ows_ResourcesExpenseTargeted">
							      	<xsl:value-of select="format-number(@ows_ResourcesExpenseTargeted, '$###,###')"/>
							      </xsl:when>
							      <xsl:otherwise>$0</xsl:otherwise>
						      </xsl:choose>
						      
						      </td>
						      <td>
						      <xsl:choose>
							      <xsl:when test="@ows_ResourcesExpenseActual">
							      	<xsl:value-of select="format-number(@ows_ResourcesExpenseActual, '$###,###')"/>
							      </xsl:when>
							      <xsl:otherwise>$0</xsl:otherwise>
						      </xsl:choose>
						      </td>
						    </tr>				    
						    <tr>
						      <th>Capital</th>
						      <td>
						      <xsl:choose>
							      <xsl:when test="@ows_ResourcesCapitalTargeted">
							      	<xsl:value-of select="format-number(@ows_ResourcesCapitalTargeted, '$###,###')"/>
							      </xsl:when>
							      <xsl:otherwise>$0</xsl:otherwise>
						      </xsl:choose>
						      </td>
						      <td>
						      <xsl:choose>
							      <xsl:when test="@ows_ResourcesCapitalActual">
							      	<xsl:value-of select="format-number(@ows_ResourcesCapitalActual, '$###,###')"/>
							      </xsl:when>
							      <xsl:otherwise>$0</xsl:otherwise>
						      </xsl:choose>
						      </td>
						    </tr>	
						  </tbody>
						</table>
				</div>
				<br/>
				<div id="PCFinancial" class="SectionBase">
						<h2>
						<xsl:if test="$AllowEdit = 'True'">
							<img data-url="{$BaseEdit}3" title="Edit Project Benefits" class="CharterEditIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/editheader.png"/>
						</xsl:if>
						Project Benefits:</h2>
						<table id="ProFinancial" class="">
						  <thead>
						    <tr>
						      <th>Targeted</th>
						      <th>Actual</th>
						    </tr>
						  </thead>
						  <tbody>
						    <tr>
						      <td>
							      <xsl:choose>
								      <xsl:when test="@ows_BenefitsTarget ">
								      	<xsl:value-of select="format-number(@ows_BenefitsTarget, '$###,###')"/>
								      </xsl:when>
								      <xsl:otherwise>$0</xsl:otherwise>
							      </xsl:choose>
								</td>
						      	<td>
							      <xsl:choose>
								      <xsl:when test="@ows_BenefitsActual ">
								      	<xsl:value-of select="format-number(@ows_BenefitsActual, '$###,###')"/>
								      </xsl:when>
								      <xsl:otherwise>$0</xsl:otherwise>
							      </xsl:choose>
								</td>
						    </tr>						    				    				  
						  <!--
						    <tr>
						      <th>COM</th>
						      <td>
							      <xsl:choose>
								      <xsl:when test="@ows_FinancialGoalsCOM">
								      	<xsl:value-of select="format-number(@ows_FinancialGoalsCOM, '$###,###')"/>
								      </xsl:when>
								      <xsl:otherwise>$0</xsl:otherwise>
							      </xsl:choose>
								</td>
						      <td>
							      <xsl:choose>
								      <xsl:when test="@ows_FinancialGoalsCOMActual">
								      	<xsl:value-of select="format-number(@ows_FinancialGoalsCOMActual, '$###,###')"/>
								      </xsl:when>
								      <xsl:otherwise>$0</xsl:otherwise>
							      </xsl:choose>
								</td>
						    </tr>				    
						    <tr>
						      <th>Cash</th>
						      <td>
						      <xsl:choose>
							      <xsl:when test="@ows_FinancialGoalsCash">
							      	<xsl:value-of select="format-number(@ows_FinancialGoalsCash, '$###,###')"/>
							      </xsl:when>
							      <xsl:otherwise>$0</xsl:otherwise>
						      </xsl:choose>
						      </td>
						      <td>
						      <xsl:choose>
							      <xsl:when test="@ows_FinancialGoalsCashActual">
							      	<xsl:value-of select="format-number(@ows_FinancialGoalsCashActual, '$###,###')"/>
							      </xsl:when>
							      <xsl:otherwise>$0</xsl:otherwise>
						      </xsl:choose>
						      </td>
						    </tr>	
						    <tr>
						      <th>Avoidance</th>
						      <td>
						      <xsl:choose>
							      <xsl:when test="@ows_FinancialGoalsAvoidance">
							      	<xsl:value-of select="format-number(@ows_FinancialGoalsAvoidance, '$###,###')"/>
							      </xsl:when>
							      <xsl:otherwise>$0</xsl:otherwise>
						      </xsl:choose>
						      </td>
						      <td>
						      <xsl:choose>
							      <xsl:when test="@ows_FinancialGoalsAvoidanceActual">
							      	<xsl:value-of select="format-number(@ows_FinancialGoalsAvoidanceActual, '$###,###')"/>
							      </xsl:when>
							      <xsl:otherwise>$0</xsl:otherwise>
						      </xsl:choose>
						      </td>
						    </tr>
						    -->
						  </tbody>
						</table>
				</div>
				<br/>
				<div id="PCContacts" class="SectionBase">
						<h2>
						<img title="Email Team" src="[SRA Root]/_layouts/images/EMAILPST.png" class="ui-button ui-widget ui-state-default ui-corner-all" onclick="LaunchEmailAction('%ISiteURL%/_layouts/CorasWorks.Central.Administration/ActionForm.aspx?actionUrl=[SRA Root]/Actions%20Library/TeamMemberEmail.cwad','Team Member Email','%SiteURL%')"/>
					<xsl:if test="$AllowEdit = 'True'">
						<img data-url="{$BaseEdit}5" title="Edit Project Team Members" class="CharterEditIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/editheader.png"/>					
					</xsl:if>							
						 Project Team Members:</h2>
						<table id="ProContacts" class="tablesorter-default">
						  <thead>
						    <tr>
						      <th class="columnHeaderCenter">Name</th>
						      <th class="columnHeaderCenter">Role</th>
						    </tr>
						  </thead>
						  <tbody>
						  <xsl:for-each-group select="$TeamMembers/z:row" group-by="@ows_SharePointUser">
						  	<xsl:variable name="User" select="current-grouping-key()" />
						    <tr>
						      <td><xsl:value-of select="substring-after(@ows_SharePointUser, ';#')"/></td>
						      <td>
								<xsl:for-each select="$TeamMembers/z:row[@ows_SharePointUser=$User]">
									<xsl:value-of select="@ows_Role"/>
									<xsl:if test="position() != last()">
										<xsl:text>, </xsl:text>
									</xsl:if>
								</xsl:for-each>
						      
						      </td>
						    </tr>						  
						  </xsl:for-each-group>
						  <!--
						  <xsl:for-each select="//TeamMembers/cw:listitems/rs:data/z:row[@ows_Role = 'Team Leader']">
						    <tr>
						      <td><xsl:value-of select="substring-after(@ows_SharePointUser, ';#')"/></td>
						      <td><xsl:value-of select="@ows_Role"/></td>
						    </tr>
						   </xsl:for-each>
						  <xsl:for-each select="//TeamMembers/cw:listitems/rs:data/z:row[@ows_Role != 'Team Leader']">
						  <xsl:sort select="@ows_Role" order="ascending" />
						    <tr>
						      <td><xsl:value-of select="substring-after(@ows_SharePointUser, ';#')"/></td>
						      <td><xsl:value-of select="@ows_Role"/></td>
						    </tr>
						   </xsl:for-each>
						   --> 					    
						  </tbody>
						</table>
						<!-- pager -->
						<div id="PCContactsPager" class="pagerPCContacts">
						  <form>
						    <img src="[SRA Root]/Resources/TableSorter/pager/icons/first.png" class="first"/>
						    <img src="[SRA Root]/Resources/TableSorter/pager/icons/prev.png" class="prev"/>
						    <span class="pagedisplay"></span> <!-- this can be any element, including an input -->
						    <img src="[SRA Root]/Resources/TableSorter/pager/icons/next.png" class="next"/>
						    <img src="[SRA Root]/Resources/TableSorter/pager/icons/last.png" class="last"/>
						    <!--
						    <select class="pagesize">
						      <option value="6">6</option>
						      <option value="12">12</option>
						      <option value="24">24</option>
						    </select>
						    -->
						  </form>
						</div>
				</div>
<br/>
				<div id="PCMethodology" class="SectionBase">
					<h2>
					<!--
						<xsl:if test="$AllowEdit = 'True'">
							<img data-url="{$BaseEdit}3" title="Edit Problem Statement" class="CharterEditIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/editheader.png"/>
						</xsl:if>
					-->
					<xsl:choose>
					<xsl:when test="$AllowEdit = 'True'">
						<img data-url="%SiteURL%/AppPages/mapdialog.aspx" title="Edit Project Methodology Map" class="Hiddenpage ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/editheader.png"/>
					</xsl:when>	
					<xsl:otherwise>
						<img data-url="%SiteURL%/AppPages/mapdialog.aspx" title="View Project Methodology Map" class="Hiddenpage ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/ICASCX.gif"/>					
					</xsl:otherwise>
					</xsl:choose>						
					Project Map:</h2>
					<table id="MethodologyTable" class="tablesorter-default">
					  <thead>
					    <tr>
					      <th>Tool</th>
					      <th>Completed On</th>
					    </tr>
					  </thead>
					  <tbody>
					  <xsl:for-each select="//Map/cw:listitems/rs:data/z:row">
							<xsl:variable name="toolID"><xsl:value-of select="@ows_ToolID"/></xsl:variable>
							<tr>
								<td title="{//Tools/*/*/*[@ows_ID = $toolID]/@ows_Purpose}">
				           		<xsl:value-of select="//Tools/*/*/*[@ows_ID = $toolID]/@ows_Title" />
				            	</td>
								<td>
				            	<xsl:value-of select="format-date(xs:date(substring-before(@ows_Modified,' ')), '[M01]-[D01]-[Y0001]')" />
				            	</td>
							</tr>
					   </xsl:for-each>				    
					  </tbody>
					</table>
					<!--<table id="MethodologyTable" class="tablesorter-default">
					  <thead>
					    <tr>
					      <th>Name</th>
					      <th>Added</th>
					      <th>Modified</th>
					    </tr>
					  </thead>
					  <tbody>
					  <xsl:for-each select="//Methodology/cw:listitems/rs:data/z:row">
							<tr>
								<td>--><!--<a onclick="ForceDocDL('%SiteURL%','{@ows_EncodedAbsUrl}')">--><!--<a href="{@ows_EncodedAbsUrl}">
				            	<xsl:value-of select="@ows_LinkFilename" /></a>
				            	</td>
								<td>
				            	<xsl:value-of select="format-date(xs:date(substring-before(@ows_Created,' ')), '[M01]-[D01]-[Y0001]')" />
				            	</td>
								<td>
				            	<xsl:value-of select="format-date(xs:date(substring-before(@ows_Modified,' ')), '[M01]-[D01]-[Y0001]')" />
				            	</td>
							</tr>
					   </xsl:for-each>				    
					  </tbody>
					</table>-->					
					<!-- pager -->
					<div id="PCMethodologyPager" class="pagerPCMethodology">
					  <form>
					    <img src="[SRA Root]/Resources/TableSorter/pager/icons/first.png" class="first"/>
					    <img src="[SRA Root]/Resources/TableSorter/pager/icons/prev.png" class="prev"/>
					    <span class="pagedisplay"></span> <!-- this can be any element, including an input -->
					    <img src="[SRA Root]/Resources/TableSorter/pager/icons/next.png" class="next"/>
					    <img src="[SRA Root]/Resources/TableSorter/pager/icons/last.png" class="last"/>
					    <!--
					    <select class="pagesize">
					      <option value="6">6</option>
					      <option value="12">12</option>
					      <option value="24">24</option>
					    </select>
					    -->
					  </form>
					</div>

				</div>
			</div>
			
			<div id="PCMulti3">	
				<xsl:if test="@ows_ExternalLink">
				<div id="PCDocuments" class="SectionBase">
							<h2>External Project Library:</h2>
							<p>
							<a href="{@ows_ExternalLink}" target="_blank"><xsl:value-of select="@ows_ExternalLink"/></a>
							</p>
				</div>
				<br/>
				</xsl:if>
				<div id="PCDocuments" class="SectionBase">
							<h2>
							<xsl:if test="count(//MeInTeamMembers/cw:listitems/rs:data/z:row) &gt; 0">
							<img title="Upload Document" src="[SRA Root]/_layouts/images/uploaddoc.png" width="16px" height="16px" class="ui-button ui-widget ui-state-default ui-corner-all" onclick="LaunchUploadDocument('%ISiteURL%/_layouts/CorasWorks.Central.Administration/ActionForm.aspx?actionUrl=[SRA Root]/Actions%20Library/UploadDocument.cwad')"/>
							<img data-url="%SiteURL%/AppPages/ProjectDocumentsdialog.aspx" title="Open Project Library" class="Hiddenpage ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/FOLDER.GIF"/>
							<img title="Open with Explorer" src="[SRA Root]/_layouts/images/OPEN.gif" width="16px" height="16px" class="ui-button ui-widget ui-state-default ui-corner-all" onclick="NavigateHttpFolder('%ISiteURL%/Documents','blank');"/>
							</xsl:if>
							<!--
							<span class="ms-cui-img-16by16 ms-cui-img-cont-float"><img style="left: -187px; top: -55px;" alt="Open with Explorer" class="Hiddenpage ui-button ui-widget ui-state-default ui-corner-all" src="/_layouts/15/1033/images/formatmap16x16.png?rev=23"/></span>
							-->
							Project Library:</h2>
							<div id="DocLoader" style="text-align: center; display:none">
							    <h2 style="text-align:center">
							        <span id="DocbusySpinner"></span>
							        <img src="[SRA Root]/_layouts/AppDesigner/Apps/ApplicationDesigner/Images/ProcessDesigner.gif" style="vertical-align:middle;padding:5px"/>
							        <br/>
							        Loading Documents...
							    </h2>
							</div>
							<div id="PCDocumentsShell">
								<div id="PCDocumentsWrap">
									<table id="ProDocuments" class="tablesorter-default">
									  <thead>
									    <tr>
									      <th>Name</th>
									      <th>Added</th>
									      <th>Modified</th>
									    </tr>
									  </thead>
									  <tbody>
									  <xsl:if test="count(//MeInTeamMembers/cw:listitems/rs:data/z:row) &gt; 0">
									  <xsl:for-each select="//Documents/cw:listitems/rs:data/z:row">
											<tr>
												<td><!--<a onclick="ForceDocDL('%SiteURL%','{@ows_EncodedAbsUrl}')">--><a href="{@ows_EncodedAbsUrl}">
								            	<xsl:value-of select="@ows_LinkFilename" /></a>
								            	</td>
												<td>
								            	<xsl:value-of select="format-date(xs:date(substring-before(@ows_Created,' ')), '[M01]-[D01]-[Y0001]')" />
								            	</td>
												<td>
								            	<xsl:value-of select="format-date(xs:date(substring-before(@ows_Modified,' ')), '[M01]-[D01]-[Y0001]')" />
								            	</td>
											</tr>
									   </xsl:for-each>
									   </xsl:if>				    
									  </tbody>
									</table>
								<!-- pager -->
								<div id="PCDocumentsPager" class="pagerPCDocuments">
								  <form>
								    <img src="[SRA Root]/Resources/TableSorter/pager/icons/first.png" class="first"/>
								    <img src="[SRA Root]/Resources/TableSorter/pager/icons/prev.png" class="prev"/>
								    <span class="pagedisplay"></span> <!-- this can be any element, including an input -->
								    <img src="[SRA Root]/Resources/TableSorter/pager/icons/next.png" class="next"/>
								    <img src="[SRA Root]/Resources/TableSorter/pager/icons/last.png" class="last"/>
								    <!--
								    <select class="pagesize">
								      <option value="6">6</option>
								      <option value="12">12</option>
								      <option value="24">24</option>
								    </select>
								    -->
								  </form>
								</div>
							</div>
						</div>
							
				</div>
				<br/>
				<div id="PCMilestones" class="SectionBase">
					<h2>
						<xsl:if test="$AllowEdit = 'True'">
							<img data-url="{$BaseEdit}6" title="Edit Project Tollgates/Milestones" class="CharterEditIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/editheader.png"/>
						</xsl:if>						
					Project Tollgates/Milestones:</h2>
					<table id="ProMilestones" class="tablesorter-default">
					  <thead>
					    <tr>
					      <th>Milestone</th>
					      <th>Target Date</th>
					      <th>Actual Date</th>
					      <th>Complete</th>
					    </tr>
					  </thead>
					  <tbody>
					  <xsl:for-each select="//Milestones/cw:listitems/rs:data/z:row">
					    <tr>
					      <td><xsl:value-of select="@ows_Title"/></td>
					      <td><xsl:if test="@ows_TargetDate"><xsl:value-of select="format-date(xs:date(substring-before(@ows_TargetDate,' ')), '[M01]-[D01]-[Y0001]')"/></xsl:if></td>
					      <td><xsl:if test="@ows_ActualDate"><xsl:value-of select="format-date(xs:date(substring-before(@ows_ActualDate,' ')), '[M01]-[D01]-[Y0001]')"/></xsl:if></td>				      
					      <td>
					      	<xsl:choose>
					      		<xsl:when test="@ows_Complete = 1">
					      			<img style="padding:3px; margin-right:3px;" src="../_layouts/images/cbchecked.gif"/>
					      		</xsl:when>
					      		<xsl:otherwise>
					      			<img style="padding:3px; margin-right:3px;" src="../_layouts/images/cbunchecked.gif"/>
					      		</xsl:otherwise>
					      	</xsl:choose> 
					      </td>
					    </tr>
					   </xsl:for-each>				    
					  </tbody>
					</table>
				</div>
				<br/>
				<div id="PCApprovals" class="SectionBase">
					<h2>
					<!--
						<xsl:if test="$AllowEdit = 'True'">
							<img data-url="{$BaseEdit}3" title="Edit Problem Statement" class="CharterEditIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/editheader.png"/>
						</xsl:if>
					-->
					<img data-url="%SiteURL%/AppPages/Approvalsdialog.aspx" title="My Approval Needed" class="Hiddenpage ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/ITOBJECT.PNG"/>
					<xsl:if test="$AllowEdit = 'True'">
						<img data-url="{$BaseEdit}4" title="Edit Project Approvals" class="CharterEditIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/editheader.png"/>
					</xsl:if>
												
					Project Approvals:</h2>
					<table id="ApprovalTable" class="tablesorter-default">
						<thead>
							<tr>
								<th style="width:5px"></th>
								<th>Approval Request</th>
								<th>Approver</th>
								<th>Due Date</th>
								<th>Date Completed</th>
								<th>Approved</th>
								<th>Original Notice Sent</th>
							</tr>
						</thead>
						<tbody id="ApprovalTableBody">
							<xsl:for-each select="//Approvals/cw:listitems/rs:data/z:row">
								<xsl:variable name="ApprovalView">				
								   <xsl:text>%ISiteURL%/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=GetFileContents&amp;FileUrl=[SRA Root]/Resources/MainApprovalsDisplay/ProjectApprovalSingle.htm&amp;OutputType=html</xsl:text>
								   <xsl:text>&amp;APID=</xsl:text>	
							       <xsl:value-of select="@ows_ID"/>
							       <xsl:text>&amp;ProjectURL=%ISiteURL%</xsl:text>
								</xsl:variable>	
								<tr data-id="{@ows_ID}">
									<td style="vertical-align:middle">
										<img data-url="{$ApprovalView}" title="View Approval" class="ApprovalViewIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/gosearch15.png"/>									
									  </td>
							
									<td>
								      	<xsl:value-of select="@ows_Title" />
								      </td>
									<td>
								      	<xsl:value-of select="substring-after(@ows_Approver,';#')" />
								      </td>
									<td>
										<xsl:value-of select="format-date(xs:date(substring-before(@ows_DueDate,' ')), '[M01]-[D01]-[Y0001]')"/>
								      </td>
									<td>
										<xsl:value-of select="format-date(xs:date(substring-before(@ows_Modified,' ')), '[M01]-[D01]-[Y0001]')"/>
								      </td>								      
									<td>
								      	<xsl:value-of select="@ows_Approved" />
								      </td>
								      <td>
											<xsl:value-of select="format-date(xs:date(substring-before(@ows_Created,' ')), $formatDate)"/>
								      
								      </td>
								</tr>
							</xsl:for-each>
						</tbody>
					</table>
					<!-- pager -->
					<div id="PCApprovalsPager" class="pagerPCApprovals">
					  <form>
					    <img src="[SRA Root]/Resources/TableSorter/pager/icons/first.png" class="first"/>
					    <img src="[SRA Root]/Resources/TableSorter/pager/icons/prev.png" class="prev"/>
					    <span class="pagedisplay"></span> <!-- this can be any element, including an input -->
					    <img src="[SRA Root]/Resources/TableSorter/pager/icons/next.png" class="next"/>
					    <img src="[SRA Root]/Resources/TableSorter/pager/icons/last.png" class="last"/>
					    <!--
					    <select class="pagesize">
					      <option value="6">6</option>
					      <option value="12">12</option>
					      <option value="24">24</option>
					    </select>
					    -->
					  </form>
					</div>

				</div>
				
		</div>			
	</div>
<!--	
		<br/>
		<div id="PCMilestones">
				<h2>Goal Statement:</h2>
				<p><xsl:value-of select="@ows_CharterGoalStatement"/></p>
		</div>
-->
  	</div>
  	</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>