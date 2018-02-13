<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:template match="/">
	<xsl:variable name="ProjectBenefits">
				<xsl:for-each select="//ProjectBenefits/cw:listitems/rs:data/z:row">
					<xsl:copy-of select="." />			
				</xsl:for-each>
	</xsl:variable>
	<xsl:variable name="PCFinancialEntryType">
		<xsl:choose>
			<xsl:when test="//Projects/cw:listitems/rs:data/z:row/@ows_BenefitsFinancialEntryType='Year'">Year</xsl:when>
			<xsl:when test="//Projects/cw:listitems/rs:data/z:row/@ows_BenefitsFinancialEntryType='Month'">Month</xsl:when>
			<xsl:otherwise>Year</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	<script>
		var removeimage = '[SRA Root]/_layouts/images/DELITEM.gif';
		var ProjectID = '<xsl:value-of select="//Projects/cw:listitems/rs:data/z:row/@ows_ID"/>';
		var ProjectEntryType = '<xsl:value-of select="$PCFinancialEntryType"/>';

	</script>
	<script src="[SRA Root]/Resources/ProjectEdit/Benefits.js"></script>
	<div id="BenefitsReload" style="display:none">
		<div id="busyLoader" style="text-align: center;">
			<h2 style="text-align:center">
			<span id="busySpinner"></span>
			<img src="[SRA Root]/_layouts/AppDesigner/Apps/ApplicationDesigner/Images/ProcessDesigner.gif" style="vertical-align:middle;padding:5px"/>
			<br/>Saving Changes...</h2>
		</div>
	</div>
	<div id="BenefitsData">
                
                <!--
                <h2>Project Benefits</h2>
                <p>Here is where you would Edit the Project Benefits</p>
                		            <button class="BenefitsSave" disabled="disabled" data-id="{@ows_ID}">Save<img class="CW-img-button" src="[SRA Root]/_layouts/images/kpinormal-0.gif"/></button>

                -->
				<div>
		            <button class="BenefitsSave" disabled="disabled" data-id="{@ows_ID}">Save</button>
		        </div>
                <br/>
            	<div id="AddBenefit">
					<h3>Add Benefit</h3>
                	<div>
                		<div>
                			<xsl:if test="$PCFinancialEntryType='Year'">
                			<xsl:attribute name="style">display:none</xsl:attribute>
							</xsl:if>	
	                		Add Type
							<select name="AddTypeSelect" id="AddTypeSelectBox">
								<option selected="selected" value="Year">Year</option>
								<option value="Month">Month</option>
							</select>								
						</div>
						<div>						
                		Division
						<select name="DivisionSelect" id="DivisionSelectBox">
							<option selected="selected" disabled="disabled">Select a Division</option>
							<xsl:for-each select="//Division/cw:listitems/rs:data/z:row">
								<option value="{@ows_Title}" data-id="{@ows_ID}"><xsl:value-of select="@ows_Title"/></option>
							</xsl:for-each>
						</select>
                		Region
						<select name="RegionSelect" id="RegionSelectBox" disabled="disabled">
							<option selected="selected" disabled="disabled">Select a Region</option>
						</select>
                		Location
						<select name="LocationSelect" id="LocationSelectBox" disabled="disabled">
							<option selected="selected" disabled="disabled">Select a Location</option>
						</select>
						</div>
						<div>
                		Financial Categories
						<select name="FinancialCategoriesSelect" id="FinancialCategoriesSelectBox">
							<option selected="selected" disabled="disabled">Select a Financial Category</option>
							<xsl:for-each select="//FinancialCategories/cw:listitems/rs:data/z:row">
								<option value="{@ows_Title}" data-id="{@ows_ID}"><xsl:value-of select="@ows_Title"/></option>
							</xsl:for-each>
						</select>
                		Financial Subcategories
						<select name="FinancialSubcategoriesSelect" id="FinancialSubcategoriesSelectBox" disabled="disabled">
							<option selected="selected" disabled="disabled">Select a Financial Subcategory</option>
						</select>
						</div>
						<div style="float:left">						
						Year            	
						<select name="YearSelect" id="YearSelectBox">
							<option selected="selected" disabled="disabled">Select a Year</option>
							<xsl:for-each select="//ProjectCostYears/cw:listitems/rs:data/z:row">
								<option value="{@ows_Title}"><xsl:value-of select="@ows_Title"/></option>
							</xsl:for-each>
						</select>
                		Month
						<select name="MonthAddSelect" id="MonthAddSelectBox" disabled="disabled">				
							<option selected="selected" disabled="disabled">Select a Month</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="12">12</option>
						</select>					
						</div>
						<div style="float:right; vertical-align:bottom">
						<button class="YearAdd">Add</button>
						</div>
			        </div>
		        </div>
				<br/>                	                
                <div id="BenefitsBody">
					<div>
						<select name="PCFinancialEntryTypeSelect" id="PCFinancialEntryTypeSelecttBox">
							<xsl:choose>
							<xsl:when test="$PCFinancialEntryType='Year'">
								<option value="Month">By Month</option>
								<option value="Year" selected="selected">By Year</option>
							</xsl:when>
							<xsl:when test="$PCFinancialEntryType='Month'">
								<option value="Month" selected="selected">By Month</option>
								<option value="Year">By Year</option>							
							</xsl:when>
							<xsl:otherwise>
								<option value="Month">By Month</option>
								<option value="Year" selected="selected">By Year</option>														
							</xsl:otherwise>
							</xsl:choose>
						</select>
						<button class="PCFinancialEntryType">Change Entry Type</button>
			        </div>
                <div id="FinanceTip"><xsl:value-of select="//Config/cw:listitems/rs:data/z:row/@ows_FinancialsMessage" /></div>			        
					<table id="BenefitsYear" class="tablesorter-default">
					  <thead>
					    <tr>
					     <th style="width:25px" class="filter-false"></th>	
					      <th>Year</th>
					      <th>Division</th>
					      <th>Region</th>	
					      <th>Location</th>		
					      <th>Category</th>
					      <th>Subcategory</th>
					      <th>Target</th>
					      <th>Actual</th>
					    </tr>
					  </thead>
					  <tbody id="BenefitsYearBody">
						<xsl:for-each-group select="$ProjectBenefits/z:row" group-by="@ows_Title">
						<xsl:variable name="Year" select="current-grouping-key()" />
							<xsl:for-each-group select="$ProjectBenefits/z:row[@ows_Title = $Year]" group-by="@ows_Division">
							<xsl:variable name="Division" select="current-grouping-key()" />
								<xsl:for-each-group select="$ProjectBenefits/z:row[@ows_Title=$Year and @ows_Division=$Division]" group-by="@ows_Region">
								<xsl:variable name="Region" select="current-grouping-key()" />	
									<xsl:for-each-group select="$ProjectBenefits/z:row[@ows_Title=$Year and @ows_Division=$Division and @ows_Region=$Region]" group-by="@ows_Location">								
									<xsl:variable name="Location" select="current-grouping-key()" />
										<xsl:for-each-group select="$ProjectBenefits/z:row[@ows_Title=$Year and @ows_Division=$Division and @ows_Region=$Region and @ows_Location=$Location  and not(@ows_FinancialSubcategory)]" group-by="@ows_FinancialCategory">								
										<xsl:variable name="FinancialCategory" select="current-grouping-key()" />
											<!--
											<xsl:for-each-group select="$ProjectBenefits/z:row[@ows_Title=$Year and @ows_Division=$Division and @ows_Region=$Region and @ows_Location=$Location]" group-by="@ows_FinancialSubcategory">								
											<xsl:variable name="FinancialSubcategory" select="current-grouping-key()" />
											-->
						                <tr data-id="New">
									      <td style="vertical-align:middle">
									      	<img data-url="" title="Remove Year" class="PCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/DELITEM.gif"/>
										  </td>					    
									      <td>
									      	<input type="text" class="FinanceNumber" data-column="Year" value="{$Year}" disabled="disabled" />
									      </td>					    				    
									      <td>
									      	<input type="text" title="{$Division}" data-column="Division" value="{$Division}" disabled="disabled" />
									      </td>					    
									      <td>
									      	<input type="text" title="{$Region}" data-column="Region" value="{$Region}" disabled="disabled" />
									      </td>					    
									      <td>
									      	<input type="text" title="{$Location}" data-column="Location" value="{$Location}" disabled="disabled" />
									      </td>	
									      <td>
									      	<input type="text" title="{$FinancialCategory}" data-column="FinancialCategory" value="{$FinancialCategory}" disabled="disabled" />
									      </td>	
									      <td>
									      	<input type="text" data-column="FinancialSubcategory" value="" disabled="disabled" />
									      </td>	
									      <td>
									      	<input type="text" class="FinanceNumber" data-column="Target" value="{sum($ProjectBenefits/z:row[@ows_Title=$Year and @ows_Division=$Division and @ows_Region=$Region and @ows_Location=$Location and @ows_FinancialCategory=$FinancialCategory and not(@ows_FinancialSubcategory)]/@ows_Target)}">
									      		<xsl:if test="$PCFinancialEntryType='Month'">
												<xsl:attribute name="disabled">disabled</xsl:attribute>
												</xsl:if>
									      	</input>
									      </td>
									      <td>
									      	<input type="text" class="FinanceNumber" data-column="Actual" value="{sum($ProjectBenefits/z:row[@ows_Title=$Year and @ows_Division=$Division and @ows_Region=$Region and @ows_Location=$Location and @ows_FinancialCategory=$FinancialCategory and not(@ows_FinancialSubcategory)]/@ows_Actual)}">
									      		<xsl:if test="$PCFinancialEntryType='Month'">
												<xsl:attribute name="disabled">disabled</xsl:attribute>
												</xsl:if>
									      	</input>
									      </td>
									    </tr>
									    </xsl:for-each-group>
									    
										<xsl:for-each-group select="$ProjectBenefits/z:row[@ows_Title=$Year and @ows_Division=$Division and @ows_Region=$Region and @ows_Location=$Location  and @ows_FinancialSubcategory]" group-by="@ows_FinancialCategory">								
										<xsl:variable name="FinancialCategory" select="current-grouping-key()" />
											<xsl:for-each-group select="$ProjectBenefits/z:row[@ows_Title=$Year and @ows_Division=$Division and @ows_Region=$Region and @ows_Location=$Location and @ows_FinancialCategory=$FinancialCategory and @ows_FinancialSubcategory]" group-by="@ows_FinancialSubcategory">								
											<xsl:variable name="FinancialSubcategory" select="current-grouping-key()" />
							                <tr data-id="New">
										      <td style="vertical-align:middle">
										      	<img data-url="" title="Remove Year" class="PCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/DELITEM.gif"/>
											  </td>					    
										      <td>
										      	<input type="text" class="FinanceNumber" title="{$Year}" data-column="Year" value="{$Year}" disabled="disabled" />
										      </td>					    				    
										      <td>
										      	<input type="text" title="{$Division}" data-column="Division" value="{$Division}" disabled="disabled" />
										      </td>					    
										      <td>
										      	<input type="text" title="{$Region}" data-column="Region" value="{$Region}" disabled="disabled" />
										      </td>					    
										      <td>
										      	<input type="text" title="{$Location}" data-column="Location" value="{$Location}" disabled="disabled" />
										      </td>	
										      <td>
										      	<input type="text" title="{$FinancialCategory}" data-column="FinancialCategory" value="{$FinancialCategory}" disabled="disabled" />
										      </td>	
										      <td>
										      	<input type="text" title="{$FinancialSubcategory}" data-column="FinancialSubcategory" value="{$FinancialSubcategory}" disabled="disabled" />
										      </td>	
										      <td>
										      	<input type="text" class="FinanceNumber" data-column="Target" value="{sum($ProjectBenefits/z:row[@ows_Title=$Year and @ows_Division=$Division and @ows_Region=$Region and @ows_Location=$Location and @ows_FinancialCategory=$FinancialCategory and @ows_FinancialSubcategory=$FinancialSubcategory]/@ows_Target)}">
										      		<xsl:if test="$PCFinancialEntryType='Month'">
													<xsl:attribute name="disabled">disabled</xsl:attribute>
													</xsl:if>
										      	</input>
										      </td>
										      <td>
										      	<input type="text" class="FinanceNumber" data-column="Actual" value="{sum($ProjectBenefits/z:row[@ows_Title=$Year and @ows_Division=$Division and @ows_Region=$Region and @ows_Location=$Location and @ows_FinancialCategory=$FinancialCategory and @ows_FinancialSubcategory=$FinancialSubcategory]/@ows_Actual)}">
										      		<xsl:if test="$PCFinancialEntryType='Month'">
													<xsl:attribute name="disabled">disabled</xsl:attribute>
													</xsl:if>
										      	</input>
										      </td>
										    </tr>
										    </xsl:for-each-group>
									    </xsl:for-each-group>
									    
									</xsl:for-each-group>
								</xsl:for-each-group>
							</xsl:for-each-group> 
		                </xsl:for-each-group>			  
					  </tbody>
					  
					  <tbody class="tablesorter-infoOnly">
					    <tr>
					      <th colspan="7" align="right">Totals</th>
					      <th id="YearTargetTotal" class="FinanceNumber"><xsl:value-of select="sum($ProjectBenefits/z:row/@ows_Target)"/></th>
					      <th id="YearActualTotal" class="FinanceNumber"><xsl:value-of select="sum($ProjectBenefits/z:row/@ows_Actual)"/></th>
					    </tr>
					  </tbody>
					  <!--
					  -->				  
					</table>
					<br/>
					<table id="BenefitsMonth" class="tablesorter-default">
						<xsl:if test="$PCFinancialEntryType='Year'">
						<xsl:attribute name="style">display:none</xsl:attribute>
						</xsl:if>
					  <thead>
					    <tr>
					    <th style="width:25px" class="filter-false"></th>		
					      <th>Year</th>
					      <th>Month</th>
					      <th>Division</th>
					      <th>Region</th>	
					      <th>Location</th>		
					      <th>Category</th>
					      <th>Subcategory</th>
					      <th>Target</th>
					      <th>Actual</th>
					    </tr>
					  </thead>
					  <tbody id="BenefitsMonthBody">
					  <xsl:for-each select="//ProjectBenefits/cw:listitems/rs:data/z:row">
					  	<xsl:variable name="Target">
					  		<xsl:choose>
					  			<xsl:when test="@ows_Target"><xsl:value-of select="format-number(@ows_Target, '#')" /></xsl:when>
					  			<xsl:otherwise>0</xsl:otherwise>
					  		</xsl:choose>
					  	</xsl:variable>
					  	<xsl:variable name="Actual">
					  		<xsl:choose>
					  			<xsl:when test="@ows_Actual"><xsl:value-of select="format-number(@ows_Actual, '#')" /></xsl:when>
					  			<xsl:otherwise>0</xsl:otherwise>
					  		</xsl:choose>
					  	</xsl:variable>
					    <tr data-id="New">
					      <td style="vertical-align:middle">
					      	<img data-url="" title="Remove Month" class="MonthPCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/DELITEM.gif"/>
						  </td>						    				    
					      <td>
					      	<input type="text" class="FinanceNumber" title="{@ows_Title}" data-column="Year" value="{@ows_Title}" disabled="disabled" />
					      </td>
					      <td>
					      	<input type="text" class="FinanceNumber" title="{@ows_Month}" data-column="Month" value="{@ows_Month}" disabled="disabled" />
					      </td>						      					    
					      <td>
					      	<input type="text" title="{@ows_Division}" data-id="{@ows_DivisionID}" data-column="Division" value="{@ows_Division}" disabled="disabled" />
					      </td>
					      <td>
					      	<input type="text" title="{@ows_Region}" data-id="{@ows_RegionID}" data-column="Region" value="{@ows_Region}" disabled="disabled" />
					      </td>						      					    
					      <td>
					      	<input type="text" title="{@ows_Location}" data-id="{@ows_LocationID}" data-column="Location" value="{@ows_Location}" disabled="disabled" />
					      </td>
					      <td>
					      	<input type="text"  title="{@ows_FinancialCategory}" data-column="FinancialCategory" value="{@ows_FinancialCategory}" disabled="disabled" />
					      </td>
					      <td>
					      	<input type="text" title="{@ows_FinancialSubcategory}" data-column="FinancialSubcategory" value="{@ows_FinancialSubcategory}" disabled="disabled" />
					      </td>					      						      					    
					      <td>
					      	<input type="text" class="FinanceNumber" title="{$Target}" data-column="Target" value="{$Target}" />
					      </td>
					      <td>
					      	<input type="text" class="FinanceNumber" title="{$Actual}" data-column="Actual" value="{$Actual}" />
					      </td>
					    </tr> 
					    </xsl:for-each>				  
					  </tbody>
					</table>	                
					<div>
			            <button class="BenefitsSave" disabled="disabled" data-id="{@ows_ID}">Save</button>
			        </div>
                </div>
    </div>            
	</xsl:template>
</xsl:stylesheet>