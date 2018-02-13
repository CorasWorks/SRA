<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:template match="/">
	<xsl:variable name="ProjectBenefits">
				<xsl:for-each select="//ProjectBenefits/cw:listitems/rs:data/z:row">
					<xsl:copy-of select="." />			
				</xsl:for-each>
	</xsl:variable>
	<xsl:variable name="Divisions">
				<xsl:for-each select="//Division/cw:listitems/rs:data/z:row">
					<xsl:copy-of select="." />			
				</xsl:for-each>
	</xsl:variable>
	<xsl:variable name="Locations">
				<xsl:for-each select="//Location/cw:listitems/rs:data/z:row">
					<xsl:copy-of select="." />			
				</xsl:for-each>
	</xsl:variable>
	<xsl:variable name="Regions">
				<xsl:for-each select="//Region/cw:listitems/rs:data/z:row">
					<xsl:copy-of select="." />			
				</xsl:for-each>
	</xsl:variable>
	<xsl:variable name="FinancialCategories">
				<xsl:for-each select="//FinancialCategories/cw:listitems/rs:data/z:row">
					<xsl:copy-of select="." />			
				</xsl:for-each>
	</xsl:variable>
	<xsl:variable name="Subcategories">
				<xsl:for-each select="//Subcategories/cw:listitems/rs:data/z:row">
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
	<script src="[SRA Root]/Resources/ProjectEdit/Benefits2.js"></script>
	<div id="BenefitsReload" style="display:none">
		<div id="busyLoader" style="text-align: center;">
			<h2 style="text-align:center">
			<span id="busySpinner"></span>
			<img src="[SRA Root]/_layouts/AppDesigner/Apps/ApplicationDesigner/Images/ProcessDesigner.gif" style="vertical-align:middle;padding:5px"/>
			<br/>Saving Changes...</h2>
		</div>
	</div>
	<div style="display:none" id="DivisionSelectDummy">						
		<select name="DivisionSelect" class="DivisionSelectBox">
			<option selected="selected" disabled="disabled"></option>
			<xsl:for-each select="//Division/cw:listitems/rs:data/z:row">
				<option value="{@ows_Title}" data-id="{@ows_ID}"><xsl:value-of select="@ows_Title"/></option>
			</xsl:for-each>
		</select>
	</div>
	<div style="display:none" id="RegionSelectDummy">
		<select name="RegionSelect" class="RegionSelectBox" disabled="disabled">
			<option selected="selected" disabled="disabled"></option>
		</select>
	</div>
	<div style="display:none" id="LocationSelectDummy">
		<select name="LocationSelect" class="LocationSelectBox" disabled="disabled">
			<option selected="selected" disabled="disabled"></option>
		</select>	
	</div>	
	<!--
	<div style="display:none" id="FinancialCategoriesSelectDummy">
		<select name="FinancialCategoriesSelect" class="FinancialCategoriesSelectBox">
			<option selected="selected" disabled="disabled"></option>
			<xsl:for-each select="//FinancialCategories/cw:listitems/rs:data/z:row">
				<option value="{@ows_Title}" data-id="{@ows_ID}"><xsl:value-of select="@ows_Title"/></option>
			</xsl:for-each>
		</select>	
	</div>
	-->
	<div style="display:none" id="FinancialCategoriesSelectDummy">
		<select name="FinancialCategoriesSelect" class="FinancialCategoriesSelectBox" disabled="disabled">
			<option selected="selected" disabled="disabled"></option>
		</select>	
	</div>	
		
	<div style="display:none" id="FinancialSubcategoriesSelectDummy">
		<select name="FinancialSubcategoriesSelect" class="FinancialSubcategoriesSelectBox" disabled="disabled">
			<option selected="selected" disabled="disabled"></option>
		</select>
	</div>	
	<div style="display:none" id="YearSelectDummy">
		<select name="YearSelect" class="YearSelect">
			<option selected="selected" disabled="disabled"></option>
			<xsl:for-each select="//ProjectCostYears/cw:listitems/rs:data/z:row">
				<option value="{@ows_Title}"><xsl:value-of select="@ows_Title"/></option>
			</xsl:for-each>
		</select>
	</div>	
	<div style="display:none" id="MonthSelectDummy">
		<select name="MonthSelect" class="MonthSelect">				
			<option selected="selected" disabled="disabled"></option>
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
	<div style="display:none" id="YearDoneDummy">
		<button class="YearDone" disabled="disabled">Confirm Selection</button>
	</div>			
	<div id="BenefitsData">
				<div style="float:left">
		            <button id="BenefitsSave" class="BenefitsSave" disabled="disabled" data-id="{@ows_ID}">Save</button>
		        </div>
				<div style="float:right">
		            <button id="BenefitsHelp" class="BenefitsHelp" data-url="http://ppm.corning.com/spsites/sra/AppPages/docandvideo.aspx?GUID=01c137fb-2c48-4bce-d80a-4e0360b2ecdd-220">Help</button>
		        </div>
		        <div style="clear:both"></div>
                <br/>
	     <div id="BenefitsBody">
            <div id="TabbedBenefitsForm">
	            <ul>
	                <li><a href="#Year">By Year</a></li>
	                <li><a href="#Month">By Month</a></li>
	            </ul>	    
              	                
				<div id="Year">
	            	<div class="CostAdd">
						<button class="YearAdd">Add</button>
			        </div>			
					<div id="FinanceTip"><xsl:value-of select="//Config/cw:listitems/rs:data/z:row/@ows_FinancialsMessage" /></div>		
					<table id="BenefitsYear" class="tablesorter-default">
					  <thead>
					    <tr>
					     <th style="width:25px" class="filter-false"></th>	
					      <th style="width:8%">Year</th>
					      <th style="width:14%">Division</th>
					      <th style="width:14%">Region</th>	
					      <th style="width:14%">Location</th>		
					      <th style="width:15%">Category</th>
					      <th style="width:15%">Subcategory</th>
					      <th style="width:8%">Target</th>
					      <th style="width:8%">Actual</th>
					    </tr>
					  </thead>
					  <tbody id="BenefitsYearBody">
						<xsl:for-each-group select="$ProjectBenefits/z:row" group-by="@ows_Title">
						<xsl:variable name="Year" select="current-grouping-key()" />
							<xsl:for-each-group select="$ProjectBenefits/z:row[@ows_Title = $Year]" group-by="@ows_DivisionID">
							  <xsl:variable name="DivCurrentID"	 select="current-grouping-key()" />
							  <xsl:variable name="Division" select="$Divisions/z:row[@ows_ID=$DivCurrentID]/@ows_Title" />							
								<xsl:for-each-group select="$ProjectBenefits/z:row[@ows_Title=$Year and @ows_DivisionID=$DivCurrentID]" group-by="@ows_RegionID">
								<xsl:variable name="RegCurrentID" select="current-grouping-key()" />
								<xsl:variable name="Region" select="$Regions/z:row[@ows_ID=$RegCurrentID]/@ows_Region" />		
									<xsl:for-each-group select="$ProjectBenefits/z:row[@ows_Title=$Year and @ows_DivisionID=$DivCurrentID and @ows_RegionID=$RegCurrentID]" group-by="@ows_LocationID">								
									<xsl:variable name="LocationCurrentID" select="current-grouping-key()" />
									<xsl:variable name="Location" select="$Locations/z:row[@ows_ID=$LocationCurrentID]/@ows_Title" />
										<xsl:for-each-group select="$ProjectBenefits/z:row[@ows_Title=$Year and @ows_DivisionID=$DivCurrentID and @ows_RegionID=$RegCurrentID and @ows_LocationID=$LocationCurrentID  and not(@ows_FinancialSubcategory)]" group-by="@ows_FinancialCategoryID">								
										<xsl:variable name="FinancialCategoryID" select="current-grouping-key()" />
										<xsl:variable name="FinancialCategory" select="$FinancialCategories/z:row[@ows_ID=$FinancialCategoryID]/@ows_Title" />
						                <tr data-id="New">
									      <td style="vertical-align:middle">
									      	<img data-url="" title="Remove Year" class="PCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/DELITEM.gif"/>
										  </td>					    
									      <td>
									      	<input type="text" class="FinanceNumber" data-column="Year" value="{$Year}" disabled="disabled" />
									      </td>					    				    
									      <td>
									      	<input type="text" data-id="{$DivCurrentID}" title="{$Division}" data-column="Division" value="{$Division}" disabled="disabled" />
									      </td>					    
									      <td>
									      	<input type="text" data-id="{$RegCurrentID}" title="{$Region}" data-column="Region" value="{$Region}" disabled="disabled" />
									      </td>					    
									      <td>
									      	<input type="text" data-id="{$LocationCurrentID}" title="{$Location}" data-column="Location" value="{$Location}" disabled="disabled" />
									      </td>	
									      <td>
									      	<input type="text" data-id="{$FinancialCategoryID}" title="{$FinancialCategory}" data-column="FinancialCategory" value="{$FinancialCategory}" disabled="disabled" />
									      </td>	
									      <td>
									      	<input type="text" data-column="FinancialSubcategory" value="" disabled="disabled" />
									      </td>	
									      <td>
									      	<input type="text" class="FinanceNumber" data-column="Target" value="{format-number(sum($ProjectBenefits/z:row[@ows_Title=$Year and @ows_DivisionID=$DivCurrentID and @ows_RegionID=$RegCurrentID and @ows_LocationID=$LocationCurrentID and @ows_FinancialCategory=$FinancialCategory and not(@ows_FinancialSubcategory)]/@ows_Target), '#')}">
									      	</input>
									      </td>
									      <td>
									      	<input type="text" class="FinanceNumber" data-column="Actual" value="{format-number(sum($ProjectBenefits/z:row[@ows_Title=$Year and @ows_DivisionID=$DivCurrentID and @ows_RegionID=$RegCurrentID and @ows_LocationID=$LocationCurrentID and @ows_FinancialCategory=$FinancialCategory and not(@ows_FinancialSubcategory)]/@ows_Actual), '#')}">
									      	</input>
									      </td>
									    </tr>
									    </xsl:for-each-group>
										<xsl:for-each-group select="$ProjectBenefits/z:row[@ows_Title=$Year and @ows_DivisionID=$DivCurrentID and @ows_RegionID=$RegCurrentID and @ows_LocationID=$LocationCurrentID and @ows_FinancialCategoryID]" group-by="@ows_FinancialCategoryID">								
										<xsl:variable name="FinancialCategoryID" select="current-grouping-key()" />
										<xsl:variable name="FinancialCategory" select="$FinancialCategories/z:row[@ows_ID=$FinancialCategoryID]/@ows_Title" />
											<xsl:for-each-group select="$ProjectBenefits/z:row[@ows_Title=$Year and @ows_DivisionID=$DivCurrentID and @ows_RegionID=$RegCurrentID and @ows_LocationID=$LocationCurrentID and @ows_FinancialCategoryID=$FinancialCategoryID and @ows_FinancialSubcategoryID]" group-by="@ows_FinancialSubcategoryID">								
											<xsl:variable name="FinancialSubcategoryID" select="current-grouping-key()" />
											<xsl:variable name="FinancialSubcategory" select="$Subcategories/z:row[@ows_ID=$FinancialSubcategoryID]/@ows_Title" />
							                <tr data-id="New">
										      <td style="vertical-align:middle">
										      	<img data-url="" title="Remove Year" class="PCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/DELITEM.gif"/>
											  </td>					    
										      <td>
										      	<input type="text" class="FinanceNumber" title="{$Year}" data-column="Year" value="{$Year}" disabled="disabled" />
										      </td>					    				    
										      <td>
										      	<input type="text" data-id="{$DivCurrentID}" title="{$Division}" data-column="Division" value="{$Division}" disabled="disabled" />
										      </td>					    
										      <td>
										      	<input type="text" data-id="{$RegCurrentID}" title="{$Region}" data-column="Region" value="{$Region}" disabled="disabled" />
										      </td>					    
										      <td>
										      	<input type="text" data-id="{$LocationCurrentID}" title="{$Location}" data-column="Location" value="{$Location}" disabled="disabled" />
										      </td>	
										      <td>
										      	<input type="text" data-id="{$FinancialCategoryID}" title="{$FinancialCategory}" data-column="FinancialCategory" value="{$FinancialCategory}" disabled="disabled" />
										      </td>	
										      <td>
										      	<input type="text" data-id="{$FinancialSubcategoryID}" title="{$FinancialSubcategory}" data-column="FinancialSubcategory" value="{$FinancialSubcategory}" disabled="disabled" />
										      </td>	
										      <td>
										      	<input type="text" class="FinanceNumber" data-column="Target" value="{format-number(sum($ProjectBenefits/z:row[@ows_Title=$Year and @ows_Division=$Division and @ows_Region=$Region and @ows_Location=$Location and @ows_FinancialCategory=$FinancialCategory and @ows_FinancialSubcategory=$FinancialSubcategory]/@ows_Target), '#')}">
										      	</input>
										      </td>
										      <td>
										      	<input type="text" class="FinanceNumber" data-column="Actual" value="{format-number(sum($ProjectBenefits/z:row[@ows_Title=$Year and @ows_Division=$Division and @ows_Region=$Region and @ows_Location=$Location and @ows_FinancialCategory=$FinancialCategory and @ows_FinancialSubcategory=$FinancialSubcategory]/@ows_Actual), '#')}">
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
					      <th class="YearTargetTotal FinanceNumber"><xsl:value-of select="format-number(sum($ProjectBenefits/z:row/@ows_Target), '#')"/></th>
					      <th class="YearActualTotal FinanceNumber"><xsl:value-of select="format-number(sum($ProjectBenefits/z:row/@ows_Actual), '#')"/></th>
					    </tr>
					  </tbody>			  
					</table>
	            	<div class="CostAdd">
						<button class="YearAdd">Add</button>
			        </div>
					<div style="clear:both"></div> 		
				</div>
				<div id="Month">
	            	<div class="CostAdd">
						<button class="MonthAdd">Add</button>
			        </div>                   	        
					<div id="FinanceTip"><xsl:value-of select="//Config/cw:listitems/rs:data/z:row/@ows_FinancialsMessage" /></div>	
					<table id="BenefitsMonth" class="tablesorter-default">
					  <thead>
					    <tr>
					     <th style="width:25px" class="filter-false"></th>	
					      <th style="width:8%">Year</th>
					      <th style="width:3%">Month</th>
					      <th style="width:13%">Division</th>
					      <th style="width:13%">Region</th>	
					      <th style="width:13%">Location</th>		
					      <th style="width:15%">Category</th>
					      <th style="width:15%">Subcategory</th>
					      <th style="width:8%">Target</th>
					      <th style="width:8%">Actual</th>
					    </tr>
					  </thead>
					  <tbody class="tablesorter-infoOnly">
					    <tr>
					      <th colspan="8" align="right">Totals</th>
					      <th class="YearTargetTotal FinanceNumber"><xsl:value-of select="format-number(sum($ProjectBenefits/z:row/@ows_Target), '#')"/></th>
					      <th class="YearActualTotal FinanceNumber"><xsl:value-of select="format-number(sum($ProjectBenefits/z:row/@ows_Actual), '#')"/></th>
					    </tr>
					  </tbody>					  
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
						  <xsl:variable name="DivCurrentID"	 select="@ows_DivisionID" />
						  <xsl:variable name="DivCurrentName" select="//Division/cw:listitems/rs:data/z:row[@ows_ID=$DivCurrentID]/@ows_Title" />					    				    
						  <xsl:variable name="RegCurrentID"	 select="@ows_RegionID" />
						  <xsl:variable name="RegCurrentName" select="//Region/cw:listitems/rs:data/z:row[@ows_ID=$RegCurrentID]/@ows_Region" />					    				    
						  <xsl:variable name="LocCurrentID"	 select="@ows_LocationID" />
						  <xsl:variable name="LocCurrentName" select="//Location/cw:listitems/rs:data/z:row[@ows_ID=$LocCurrentID]/@ows_Title" />
						  <xsl:variable name="FinancialCategoryCurrentID" select="@ows_FinancialCategoryID" />
						  <xsl:variable name="FinancialCategoryCurrentName" select="//FinancialCategories/cw:listitems/rs:data/z:row[@ows_ID=$FinancialCategoryCurrentID]/@ows_Title" />					    				    
						  <xsl:variable name="FinancialSubcategoryID" select="@ows_FinancialSubcategoryID" />
						  <xsl:variable name="FinancialSubcategoryCurrentName" select="//Subcategories/cw:listitems/rs:data/z:row[@ows_ID=$FinancialSubcategoryID]/@ows_Title" />
					      <td>
					      	<input type="text" class="FinanceNumber" title="{@ows_Title}" data-column="Year" value="{@ows_Title}" disabled="disabled" />
					      </td>
					      <td>
					      	<input type="text" class="FinanceNumber" title="{@ows_Month}" data-column="Month" value="{@ows_Month}" disabled="disabled" />
					      </td>						      					    
					      <td>
					      	<input type="text" title="{$DivCurrentName}" data-id="{@ows_DivisionID}" data-column="Division" value="{$DivCurrentName}" disabled="disabled" />
					      </td>
					      <td>
					      	<input type="text" title="{$RegCurrentName}" data-id="{@ows_RegionID}" data-column="Region" value="{$RegCurrentName}" disabled="disabled" />
					      </td>						      					    
					      <td>
					      	<input type="text" title="{$LocCurrentName}" data-id="{@ows_LocationID}" data-column="Location" value="{$LocCurrentName}" disabled="disabled" />
					      </td>
					      <td>
					      	<input type="text"  title="{$FinancialCategoryCurrentName}" data-id="{$FinancialCategoryCurrentID}" data-column="FinancialCategory" value="{$FinancialCategoryCurrentName}" disabled="disabled" />
					      </td>
					      <td>
					      	<input type="text" title="{$FinancialSubcategoryCurrentName}" data-id="{$FinancialSubcategoryID}" data-column="FinancialSubcategory" value="{$FinancialSubcategoryCurrentName}" disabled="disabled" />
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
					  <tbody class="tablesorter-infoOnly">
					    <tr>
					      <th colspan="8" align="right">Totals</th>
					      <th class="YearTargetTotal FinanceNumber"><xsl:value-of select="format-number(sum($ProjectBenefits/z:row/@ows_Target), '#')"/></th>
					      <th class="YearActualTotal FinanceNumber"><xsl:value-of select="format-number(sum($ProjectBenefits/z:row/@ows_Actual), '#')"/></th>
					    </tr>
					  </tbody>					  
					</table>
	            	<div class="CostAdd">
						<button class="MonthAdd">Add</button>
			        </div>
			       <div style="clear:both"></div> 					
				</div>
				</div>
				<br/>		                
					<div>
			            <button class="BenefitsSave" disabled="disabled" data-id="{@ows_ID}">Save</button>
			        </div>
                </div>
    </div>            
	</xsl:template>
</xsl:stylesheet>