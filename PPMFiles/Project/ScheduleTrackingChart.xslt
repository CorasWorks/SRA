<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" xmlns:ms="urn:schemas-microsoft-com:xslt" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" exclude-result-prefixes="rs z cw ms">
	<xsl:template match="/">
		<xsl:choose>
			<xsl:when test="//NewDataSet/Tasks/cw:listitems/rs:data/@ItemCount = 0">
				<anygantt>
					<settings>
						<title align="Center" angle="0" position="Top">
							<text>No task data to display</text>
							<font_style><font size="12" /></font_style>
						</title>
						<animation enabled="True" />
						<context_menu about_anygantt="false" />
						<background enabled="false" />
					</settings>
					<project_chart>
						<tasks>
							<task id="1" actual_start="2001-01-01" name="Not a task" parent="" />
						</tasks>
					</project_chart>
				</anygantt>
			</xsl:when>
			<xsl:otherwise>
				<anychart>
					<settings>
						<title align="Center" angle="0" position="Top">
							<text>Project Tracking Gantt Display</text>
							<font_style><font size="12" /></font_style>
						</title>
						<animation enabled="True"/>
						<context_menu about_anychart="false"/>
						<navigation enabled="true" position="top">
							<buttons>
							</buttons>
						</navigation>
		  			</settings>
					<project_chart>
						<tasks>
							<xsl:for-each select="//NewDataSet/Tasks/cw:listitems/rs:data/z:row">
								<task name="{@ows_Title}" >
									<xsl:attribute name="parent">
										<xsl:choose>
											<xsl:when test="substring(@ows_ParentId, 1, 1) != '-'">
												<xsl:value-of select="substring-before(@ows_ParentId, '.')" />
											</xsl:when>
										</xsl:choose>
					  				</xsl:attribute>
									<xsl:attribute name="id"><xsl:value-of select="@ows_ID"/></xsl:attribute>
									<xsl:attribute name="progress">
										<xsl:choose>
											<xsl:when test="string(number(@ows_PercentComplete))='NaN'">
												<xsl:text>0</xsl:text> 
											</xsl:when>
											<xsl:otherwise>
												<xsl:value-of select="format-number(@ows_PercentComplete * 100,'#####0.##')" />
											</xsl:otherwise>
										</xsl:choose>
					  				</xsl:attribute>
					  				<xsl:choose>
					  					<xsl:when test="@ows_Milestone = 0"> <!-- Not a milestone -->
											<xsl:if test="@ows_StartDate != ''">
												<xsl:attribute name="baseline_start">
									  					<xsl:value-of select="@ows_StartDate"/>
									  				</xsl:attribute>
											</xsl:if>
											<xsl:if test="@ows_DueDate != ''">
												<xsl:attribute name="baseline_end">
									  					<xsl:value-of select="@ows_DueDate"/>
									  				</xsl:attribute>
											</xsl:if>
											<xsl:if test="@ows_ActualStart != '' and @ows_ActualFinish != ''">
												<xsl:if test="@ows_ActualStart != ''">
													<xsl:attribute name="actual_start">
										  					<xsl:value-of select="@ows_ActualStart"/>
										  				</xsl:attribute>
												</xsl:if>
												<xsl:if test="@ows_ActualFinish != ''">
													<xsl:attribute name="actual_end">
										  					<xsl:value-of select="@ows_ActualFinish"/>
										  				</xsl:attribute>
												</xsl:if>
											</xsl:if>
					  					</xsl:when>
					  					<xsl:when test="@ows_Milestone = 1"> <!-- Is a milestone, only set Start Date -->
											<xsl:if test="@ows_StartDate != ''">
												<xsl:attribute name="baseline_start">
									  					<xsl:value-of select="@ows_StartDate"/>
									  				</xsl:attribute>
											</xsl:if>
					  					</xsl:when> 
					  				</xsl:choose> 
									<attributes>
							        	<attribute name="Title">
							        		<xsl:value-of select="@ows_Title" />
							        	</attribute>
							        	<attribute name="Work">
							        		<xsl:value-of select="@ows_Work" />
							        	</attribute>
							        	<attribute name="StartDate">
							        		<xsl:value-of select="@ows_StartDate" />
							        	</attribute>
							        	<attribute name="DueDate">
							        		<xsl:value-of select="@ows_DueDate" />
							        	</attribute>
							        	<attribute name="ActualWork">
							        		<xsl:value-of select="@ows_ActualWork" />
							        	</attribute>
							        	<attribute name="ActualStart">
							        		<xsl:value-of select="@ows_ActualStart" />
							        	</attribute>
							        	<attribute name="ActualFinish">
							        		<xsl:value-of select="@ows_ActualFinish" />
							        	</attribute>
							        	<attribute name="AssignedTo">
							        		<xsl:value-of select="@ows_AssignedTo" />
							        	</attribute>
							        	<attribute name="PercentComplete">
							        		<xsl:value-of select="@ows_PercentComplete" />
							        	</attribute>
							        	<attribute name="WBS">
							        		<xsl:value-of select="@ows_WBS" />
							        	</attribute>
							        	<attribute name="ID">
							        		<xsl:value-of select="@ows_ID" />
							        	</attribute>
							        </attributes>
								</task>
							</xsl:for-each>
						</tasks>
						<connectors>
							<xsl:for-each select="//NewDataSet/Tasks/cw:listitems/rs:data/z:row[@ows_PredecessorID != '']">
								<xsl:call-template name="buildConnector">
									<xsl:with-param name="toID" select="@ows_ID" />
									<xsl:with-param name="fromID" select="@ows_PredecessorID" />
								</xsl:call-template>
							</xsl:for-each>
						</connectors>
					</project_chart>
				</anychart>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="buildConnector">
		<xsl:param name="toID" />
		<xsl:param name="fromID" />
		<xsl:choose>
			<xsl:when test="contains($fromID, ',')">
				<connector type="FinishStart" >
					<xsl:attribute name="to">
						<xsl:value-of select="$toID" />
					</xsl:attribute>
					<xsl:attribute name="from">
						<xsl:value-of select="substring-before($fromID, ',')" />
					</xsl:attribute>
				</connector>
				<xsl:call-template name="buildConnector">
					<xsl:with-param name="toID" select="$toID" />
					<xsl:with-param name="fromID" select="substring-after($fromID, ',')" />
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<connector type="FinishStart" >
					<xsl:attribute name="to">
						<xsl:value-of select="$toID" />
					</xsl:attribute>
					<xsl:attribute name="from">
						<xsl:value-of select="$fromID" />
					</xsl:attribute>
				</connector>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>