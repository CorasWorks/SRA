<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:template match="/">
	<xsl:variable name="ProjectCostLocal">
				<xsl:for-each select="//ProjectCostLocal/cw:listitems/rs:data/z:row">
					<xsl:copy-of select="." />			
				</xsl:for-each>
	</xsl:variable>
	<xsl:variable name="PCFinancialEntryType">
		<xsl:choose>
			<xsl:when test="//Projects/cw:listitems/rs:data/z:row/@ows_PCFinancialEntryType='Year'">Year</xsl:when>
			<xsl:when test="//Projects/cw:listitems/rs:data/z:row/@ows_PCFinancialEntryType='Month'">Month</xsl:when>
			<xsl:otherwise>Year</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	<script>
		var removeimage = '[SRA Root]/_layouts/images/DELITEM.gif';
		var ProjectID = '<xsl:value-of select="//Projects/cw:listitems/rs:data/z:row/@ows_ID"/>';
		var ProjectEntryType = '<xsl:value-of select="$PCFinancialEntryType"/>';

	</script>
	<script src="[SRA Root]/Resources/ProjectEdit/Resources2.js"></script>
	<div style="display:none" id="YearSelectDummy">
		<select name="YearSelect" class="YearSelect">
			<option selected="selected" disabled="disabled"></option>
			<xsl:for-each select="//ProjectCostYears/cw:listitems/rs:data/z:row">
				<option value="{@ows_Title}"><xsl:value-of select="@ows_Title"/></option>
			</xsl:for-each>
		</select>
    </div>
	<div style="display:none" id="MonthYearSelectDummy">
		<select name="MonthYearSelect" class="MonthYearSelect">
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
	
	<div id="ResourcesReload" style="display:none">
		<div id="busyLoader" style="text-align: center;">
			<h2 style="text-align:center">
			<span id="busySpinner"></span>
			<img src="[SRA Root]/_layouts/AppDesigner/Apps/ApplicationDesigner/Images/ProcessDesigner.gif" style="vertical-align:middle;padding:5px"/>
			<br/>Saving Changes...</h2>
		</div>
	</div>
	<div id="ResourcesData">
                <!--
                <h2>Project Costs</h2>
                <p>Here is where you would Edit the Project Costs</p>
                -->
				<div>
		            <button id="ProCostsSave" class="ProCostsSave" disabled="disabled" data-id="{@ows_ID}">Save</button>
		        </div>
		        <br/>        
                <div id="ResourcesBody">
			        <div id="TabbedCostsForm">
			            <ul>
			                <li><a href="#Year">By Year</a></li>
			                <li><a href="#Month">By Month</a></li>
			            </ul>	
		<div id="Year">               	
            	<div class="CostAdd">
					<button class="YearAdd">Add</button>
		        </div>
                <div id="FinanceTip"><xsl:value-of select="//Config/cw:listitems/rs:data/z:row/@ows_FinancialsMessage" /></div>			        
					<table id="ProCostsYear" class="tablesorter-default">
					  <thead>
					    <tr>
					     <th style="width:25px"></th>	
					      <th style="width:10%">Year</th>
					      <th style="width:22%">Expense Target</th>
					      <th style="width:22%">Expense Actual</th>
					      <th style="width:22%">Capital Target</th>
					      <th style="width:22%">Capital Actual</th>
					    </tr>
					  </thead>
					  <tbody id="ProCostsYearBody">
						<xsl:for-each-group select="$ProjectCostLocal/z:row" group-by="@ows_Title">	              
			                <tr data-id="New" data-column="ExpenseTarget">
						      <td style="vertical-align:middle">
						      	<img data-url="" title="Remove Year" class="PCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/DELITEM.gif"/>
							  </td>					    
						      <td>
						      	<input class="FinanceNumber" type="text" data-column="Year" value="{current-grouping-key()}" disabled="disabled" />
						      </td>					    
						      <td>
						      	<input class="FinanceNumber" type="text" data-column="ExpenseTarget" value="{format-number(sum($ProjectCostLocal/z:row[@ows_Title=current-grouping-key()]/@ows_ExpenseTarget), '#')}">
						      	</input>
						      </td>
						      <td>
						      	<input class="FinanceNumber" type="text" data-column="ExpenseActual" value="{format-number(sum($ProjectCostLocal/z:row[@ows_Title=current-grouping-key()]/@ows_ExpenseActual), '#')}">
						      	</input>
						      </td>
						      <td>
						      	<input class="FinanceNumber" type="text" data-column="CapitalTarget" value="{format-number(sum($ProjectCostLocal/z:row[@ows_Title=current-grouping-key()]/@ows_CapitalTarget), '#')}">
						      	</input>
						      </td>
						      <td>
						      	<input class="FinanceNumber" type="text" data-column="CapitalActual" value="{format-number(sum($ProjectCostLocal/z:row[@ows_Title=current-grouping-key()]/@ows_CapitalActual), '#')}">
						      	</input>
						      </td>
						    </tr> 
		                </xsl:for-each-group>			  
					  </tbody>
					  <tbody class="tablesorter-infoOnly">
					    <tr>
					      <th align="right" colspan="2">Totals</th>
					      <th class="YearExpenseTargetTotal FinanceNumber"><xsl:value-of select="format-number(sum($ProjectCostLocal/z:row/@ows_ExpenseTarget), '#')"/></th>
					      <th class="YearExpenseActualTotal FinanceNumber"><xsl:value-of select="format-number(sum($ProjectCostLocal/z:row/@ows_ExpenseActual), '#')"/></th>
					      <th class="YearCapitalTargetTotal FinanceNumber"><xsl:value-of select="format-number(sum($ProjectCostLocal/z:row/@ows_CapitalTarget), '#')"/></th>
					      <th class="YearCapitalActualTotal FinanceNumber"><xsl:value-of select="format-number(sum($ProjectCostLocal/z:row/@ows_CapitalActual), '#')"/></th>
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
					<table id="ProCostsMonth" class="tablesorter-default">
					  <thead>
					    <tr>
					      <th style="width:25px"></th>
					      <th style="width:9%">Year</th>
					      <th style="width:5%">Month</th>
					      <th style="width:21%">Expense Target</th>
					      <th style="width:21%">Expense Actual</th>
					      <th style="width:21%">Capital Target</th>
					      <th style="width:21%">Capital Actual</th>
					    </tr>
					  </thead>
					  <tbody class="tablesorter-infoOnly">
					    <tr>
					      <th align="right" colspan="3">Totals</th>
					      <th class="YearExpenseTargetTotal FinanceNumber"><xsl:value-of select="format-number(sum($ProjectCostLocal/z:row/@ows_ExpenseTarget), '#')"/></th>
					      <th class="YearExpenseActualTotal FinanceNumber"><xsl:value-of select="format-number(sum($ProjectCostLocal/z:row/@ows_ExpenseActual), '#')"/></th>
					      <th class="YearCapitalTargetTotal FinanceNumber"><xsl:value-of select="format-number(sum($ProjectCostLocal/z:row/@ows_CapitalTarget), '#')"/></th>
					      <th class="YearCapitalActualTotal FinanceNumber"><xsl:value-of select="format-number(sum($ProjectCostLocal/z:row/@ows_CapitalActual), '#')"/></th>
					    </tr>
					  </tbody>
					  
					  <tbody id="ProCostsMonthBody">
					  <xsl:for-each select="//ProjectCostLocal/cw:listitems/rs:data/z:row">
					  	<xsl:variable name="ExpenseTarget">
					  		<xsl:choose>
					  			<xsl:when test="@ows_ExpenseTarget"><xsl:value-of select="format-number(@ows_ExpenseTarget, '#')" /></xsl:when>
					  			<xsl:otherwise>0</xsl:otherwise>
					  		</xsl:choose>
					  	</xsl:variable>
					  	<xsl:variable name="ExpenseActual">
					  		<xsl:choose>
					  			<xsl:when test="@ows_ExpenseActual"><xsl:value-of select="format-number(@ows_ExpenseActual, '#')" /></xsl:when>
					  			<xsl:otherwise>0</xsl:otherwise>
					  		</xsl:choose>
					  	</xsl:variable>
					  	<xsl:variable name="CapitalTarget">
					  		<xsl:choose>
					  			<xsl:when test="@ows_CapitalTarget"><xsl:value-of select="format-number(@ows_CapitalTarget, '#')" /></xsl:when>
					  			<xsl:otherwise>0</xsl:otherwise>
					  		</xsl:choose>
					  	</xsl:variable>
					  	<xsl:variable name="CapitalActual">
					  		<xsl:choose>
					  			<xsl:when test="@ows_CapitalActual"><xsl:value-of select="format-number(@ows_CapitalActual, '#')" /></xsl:when>
					  			<xsl:otherwise>0</xsl:otherwise>
					  		</xsl:choose>
					  	</xsl:variable>
					    <tr data-id="New" data-column="ExpenseTarget">				    
					      <td style="vertical-align:middle">
					      	<img data-url="" title="Remove Month" class="MonthPCDeleteIcon ui-button ui-widget ui-state-default ui-corner-all" src="[SRA Root]/_layouts/images/DELITEM.gif"/>
						  </td>					    
					      <td>
					      	<input class="FinanceNumber" type="text" data-column="Year" value="{@ows_Title}" disabled="disabled" />
					      </td>
					      <td>
					      	<input class="FinanceNumber" type="text" data-column="Month" value="{@ows_Month}" disabled="disabled" />
					      </td>						      					    
					      <td>
					      	<input class="FinanceNumber" type="text" data-column="ExpenseTarget" value="{$ExpenseTarget}" />
					      </td>
					      <td>
					      	<input class="FinanceNumber" type="text" data-column="ExpenseActual" value="{$ExpenseActual}" />
					      </td>
					      <td>
					      	<input class="FinanceNumber" type="text" data-column="CapitalTarget" value="{$CapitalTarget}" />
					      </td>
					      <td>
					      	<input class="FinanceNumber" type="text" data-column="CapitalActual" value="{$CapitalActual}" />
					      </td>
					    </tr> 
					    </xsl:for-each>				  
					  </tbody>
					  <tbody class="tablesorter-infoOnly">
					    <tr>
					      <th align="right" colspan="3">Totals</th>
					      <th class="YearExpenseTargetTotal FinanceNumber"><xsl:value-of select="format-number(sum($ProjectCostLocal/z:row/@ows_ExpenseTarget), '#')"/></th>
					      <th class="YearExpenseActualTotal FinanceNumber"><xsl:value-of select="format-number(sum($ProjectCostLocal/z:row/@ows_ExpenseActual), '#')"/></th>
					      <th class="YearCapitalTargetTotal FinanceNumber"><xsl:value-of select="format-number(sum($ProjectCostLocal/z:row/@ows_CapitalTarget), '#')"/></th>
					      <th class="YearCapitalActualTotal FinanceNumber"><xsl:value-of select="format-number(sum($ProjectCostLocal/z:row/@ows_CapitalActual), '#')"/></th>
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
			            <button class="ProCostsSave" disabled="disabled" data-id="{@ows_ID}">Save</button>
			        </div>
			    <div id="bottomfocus"></div>   
            </div>
    </div>            
	</xsl:template>
</xsl:stylesheet>