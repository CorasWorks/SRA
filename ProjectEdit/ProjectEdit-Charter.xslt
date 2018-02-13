<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:variable name="MaxChars"><xsl:value-of select="format-number(NewDataSet/Config/*/*/*/@ows_MultiLineFieldLength,'###')"/></xsl:variable>
	<xsl:template match="/">
	<script src="[SRA Root]/Resources/ProjectEdit/Charter.js"></script>
	<script>
	var MaxLength = <xsl:value-of select="$MaxChars"/>;
	</script>
	<div>
	<!--
					<h2>Project Charter</h2>
                	<p>Here is where you would Edit the Project Charter</p>
                	-->
					<div id="CharterReload" style="display:none">
						<div id="busyLoader" style="text-align: center;">
							<h2 style="text-align:center">
							<span id="busySpinner"></span>
							<img src="[SRA Root]/_layouts/AppDesigner/Apps/ApplicationDesigner/Images/ProcessDesigner.gif" style="vertical-align:middle;padding:5px"/>
							<br/>Saving Changes...</h2>
						</div>
					</div>
                	
                	<div id="CharterBody">                	
                	<xsl:for-each select="//Projects/cw:listitems/rs:data/z:row">
			        <div id="CharterButtons">
			            <button id="CharterSave" data-id="{@ows_ID}" disabled="disabled">Save</button>
			        </div>
			        <br/>
			        <div id="TabbedCharterForm">
			            <ul>
			                <li><a href="#PCProblem">Problem Statement</a></li>
			                <li><a href="#PCGoal">Goal Statement</a></li>
			                <li><a href="#PCBusinessCase">Business Case</a></li>                
			                <li><a href="#PCScopeIncludes">Scope Includes</a></li>
			                <li><a href="#PCScopeExcludes">Scope Excludes</a></li>
			            </ul>
        				<div id="PCProblem">
								<h3>Problem Statement:</h3>
								<textarea id="ProblemStatement" rows="10" style="width:100%" class="ProjectTextArea">
									<xsl:value-of select="@ows_CharterProblemStatement"/>
								</textarea>
								<div class="textareaChars"><span class="charCountDisplay"><xsl:value-of select="string-length(@ows_CharterProblemStatement)"/></span> of <xsl:value-of select="$MaxChars"/> chars</div>
						</div>
						<div id="PCGoal">
								<h3>Goal Statement:</h3>
								<textarea id="GoalStatement" rows="10" style="width:100%" class="ProjectTextArea">
									<xsl:value-of select="@ows_CharterGoalStatement"/>
								</textarea>	
								<div class="textareaChars"><span class="charCountDisplay"><xsl:value-of select="string-length(@ows_CharterGoalStatement)"/></span> of <xsl:value-of select="$MaxChars"/> chars</div>						      
						</div>
						<div id="PCBusinessCase">
								<h3>Business Case:</h3>
								<textarea id="CharterBusinessCase" rows="10" style="width:100%" class="ProjectTextArea">
									<xsl:value-of select="@ows_CharterBusinessCase"/>
								</textarea>
								<div class="textareaChars"><span class="charCountDisplay"><xsl:value-of select="string-length(@ows_CharterBusinessCase)"/></span> of <xsl:value-of select="$MaxChars"/> chars</div>							      
						</div>          
						<div id="PCScopeIncludes">
								<h3>Scope Includes:</h3>
								<textarea id="CharterScopeIncludes" rows="10" style="width:100%" class="ProjectTextArea">
									<xsl:value-of select="@ows_CharterScopeIncludes"/>
								</textarea>
								<div class="textareaChars"><span class="charCountDisplay"><xsl:value-of select="string-length(@ows_CharterScopeIncludes)"/></span> of <xsl:value-of select="$MaxChars"/> chars</div>							      
						</div>
						<div id="PCScopeExcludes">
								<h3>Scope Excludes:</h3>
								<textarea id="CharterScopeExcludes" rows="10" style="width:100%" class="ProjectTextArea">
									<xsl:value-of select="@ows_CharterScopeExcludes"/>
								</textarea>
								<div class="textareaChars"><span class="charCountDisplay"><xsl:value-of select="string-length(@ows_CharterScopeExcludes)"/></span> of <xsl:value-of select="$MaxChars"/> chars</div>							      
						</div>	       
			        </div>			        	                			
				</xsl:for-each>			                	
                </div>
    </div>            	
	</xsl:template>
</xsl:stylesheet>