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
	<script src="[SRA Root]/Resources/ProjectEdit/Resources.js"></script>
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
		            <button class="ProCostsSave" disabled="disabled" data-id="{@ows_ID}">Save</button>
		        </div>
		        <br/>
                <div id="ResourcesBody">
					<div style="float:left">
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
                
                	<div style="float:right">
						<select name="YearSelect" id="YearSelecttBox">
							<option selected="selected"></option>
							<xsl:for-each select="//ProjectCostYears/cw:listitems/rs:data/z:row">
								<option value="{@ows_Title}"><xsl:value-of select="@ows_Title"/></option>
							</xsl:for-each>
						</select>
						<button class="YearAdd">Add Year</button>
			        </div>
                <div id="FinanceTip"><xsl:value-of select="//Config/cw:listitems/rs:data/z:row/@ows_FinancialsMessage" /></div>			        
					<table id="ProCostsYear" class="tablesorter-default">
					  <thead>
					    <tr>
					     <th style="width:25px"></th>	
					      <th>Year</th>
					      <th>Expense Target</th>
					      <th>Expense Actual</th>
					      <th>Capital Target</th>
					      <th>Capital Actual</th>
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
						      	<input class="FinanceNumber" type="text" data-column="ExpenseTarget" value="{sum($ProjectCostLocal/z:row[@ows_Title=current-grouping-key()]/@ows_ExpenseTarget)}">
						      		<xsl:if test="$PCFinancialEntryType='Month'">
									<xsl:attribute name="disabled">disabled</xsl:attribute>
									</xsl:if>
						      	</input>
						      </td>
						      <td>
						      	<input class="FinanceNumber" type="text" data-column="ExpenseActual" value="{sum($ProjectCostLocal/z:row[@ows_Title=current-grouping-key()]/@ows_ExpenseActual)}">
						      		<xsl:if test="$PCFinancialEntryType='Month'">
									<xsl:attribute name="disabled">disabled</xsl:attribute>
									</xsl:if>
						      	</input>
						      </td>
						      <td>
						      	<input class="FinanceNumber" type="text" data-column="CapitalTarget" value="{sum($ProjectCostLocal/z:row[@ows_Title=current-grouping-key()]/@ows_CapitalTarget)}">
						      		<xsl:if test="$PCFinancialEntryType='Month'">
									<xsl:attribute name="disabled">disabled</xsl:attribute>
									</xsl:if>
						      	</input>
						      </td>
						      <td>
						      	<input class="FinanceNumber" type="text" data-column="CapitalActual" value="{sum($ProjectCostLocal/z:row[@ows_Title=current-grouping-key()]/@ows_CapitalActual)}">
						      		<xsl:if test="$PCFinancialEntryType='Month'">
									<xsl:attribute name="disabled">disabled</xsl:attribute>
									</xsl:if>
						      	</input>
						      </td>
						    </tr> 
		                </xsl:for-each-group>			  
					  </tbody>
					  <tbody class="tablesorter-infoOnly">
					    <tr>
					      <th align="right" colspan="2">Totals</th>
					      <th id="YearExpenseTargetTotal" class="FinanceNumber"><xsl:value-of select="sum($ProjectCostLocal/z:row/@ows_ExpenseTarget)"/></th>
					      <th id="YearExpenseActualTotal" class="FinanceNumber"><xsl:value-of select="sum($ProjectCostLocal/z:row/@ows_ExpenseActual)"/></th>
					      <th id="YearCapitalTargetTotal" class="FinanceNumber"><xsl:value-of select="sum($ProjectCostLocal/z:row/@ows_CapitalTarget)"/></th>
					      <th id="YearCapitalActualTotal" class="FinanceNumber"><xsl:value-of select="sum($ProjectCostLocal/z:row/@ows_CapitalActual)"/></th>
					    </tr>
					  </tbody>
					  
					</table>
					<br/>
					<table id="ProCostsMonth" class="tablesorter-default">
						<xsl:if test="$PCFinancialEntryType='Year'">
						<xsl:attribute name="style">display:none</xsl:attribute>
						</xsl:if>
					  <thead>
					    <tr>
					      <th>Year</th>
					      <th>Month</th>
					      <th>Expense Target</th>
					      <th>Expense Actual</th>
					      <th>Capital Target</th>
					      <th>Capital Actual</th>
					    </tr>
					  </thead>
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
					</table>	                
					<div>
			            <button class="ProCostsSave" disabled="disabled" data-id="{@ows_ID}">Save</button>
			        </div>
                </div>
    </div>            
	</xsl:template>
</xsl:stylesheet>