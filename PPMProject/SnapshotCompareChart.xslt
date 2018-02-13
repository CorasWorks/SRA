<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:msxsl="urn:schemas-microsoft-com:xslt"
>
	<xsl:output omit-xml-declaration="yes" />

	<xsl:template match="/">
		<anychart>
			<settings>
				<animation enabled="True"/>
				<context_menu about_anychart="false"/>
				<title align="Center" angle="0" position="Top">
					<text>Snapshot</text>
					<font_style><font size="12" /></font_style>
				</title>
				<navigation enabled="true" position="top">
					<buttons>
					</buttons>
				</navigation>
  			</settings>
			<project_chart>
				<tasks>
					<xsl:for-each select="//Data/items/item">
						<task name="{Title}" >
							<xsl:attribute name="parent">
								<xsl:if test="ParentId != '' and substring(ParentId, 1, 1) != '-'"><xsl:value-of select="ParentId"/></xsl:if>
			  				</xsl:attribute>
							<xsl:attribute name="id"><xsl:value-of select="ID"/></xsl:attribute>
							<xsl:attribute name="progress">
			  					<xsl:value-of select="PercComplete * 100"/>
			  				</xsl:attribute>
			  				<xsl:choose>
			  					<xsl:when test="Milestone = 'False'">
									<xsl:if test="EstStart != ''">
										<xsl:variable name="estStartMonth">
											<xsl:if test="string-length(substring-before(EstStart, '/')) = '1'">0</xsl:if>
											<xsl:value-of select="substring-before(EstStart, '/')" />
										</xsl:variable>
										<xsl:variable name="estStartDay">
											<xsl:if test="string-length(substring-before(substring-after(EstStart, '/'), '/')) = '1'">0</xsl:if>
											<xsl:value-of select="substring-before(substring-after(EstStart, '/'), '/')" />
										</xsl:variable>
										<xsl:variable name="estStartYear">
											<xsl:value-of select="substring-before(substring-after(substring-after(EstStart, '/'), '/'), ' ')" />
										</xsl:variable>
										<xsl:variable name="estStartTime">
											<xsl:if test="string-length(substring-before(substring-after(EstStart, ' '), ' ')) = 7">
												<xsl:text>0</xsl:text> 
											</xsl:if>
											<xsl:value-of select="translate(substring-before(substring-after(EstStart, ' '), ' '), ':', '.')" />
										</xsl:variable>
										<xsl:variable name="estStartTimeHourAdjust">
											<xsl:choose>
												<xsl:when test="substring-after(substring-after(EstStart, ' '), ' ') = 'AM'">
													<xsl:text>0</xsl:text>
												</xsl:when>  
												<xsl:otherwise>
													<xsl:text>12</xsl:text>
												</xsl:otherwise> 
											</xsl:choose>
										</xsl:variable>
										<xsl:variable name="estStart" select="concat($estStartYear, '.', $estStartMonth, '.', $estStartDay, ' ', substring-before($estStartTime, '.') + $estStartTimeHourAdjust, '.' , substring-after($estStartTime, '.'))" />
										<xsl:attribute name="baseline_start">
						  					<xsl:value-of select="$estStart"/>
						  				</xsl:attribute>
									</xsl:if>
									<xsl:if test="EstFinish != ''">
										<xsl:variable name="estFinishMonth">
											<xsl:if test="string-length(substring-before(EstFinish, '/')) = '1'">0</xsl:if>
											<xsl:value-of select="substring-before(EstFinish, '/')" />
										</xsl:variable>
										<xsl:variable name="estFinishDay">
											<xsl:if test="string-length(substring-before(substring-after(EstFinish, '/'), '/')) = '1'">0</xsl:if>
											<xsl:value-of select="substring-before(substring-after(EstFinish, '/'), '/')" />
										</xsl:variable>
										<xsl:variable name="estFinishYear">
											<xsl:value-of select="substring-before(substring-after(substring-after(EstFinish, '/'), '/'), ' ')" />
										</xsl:variable>
										<xsl:variable name="estFinishTime">
											<xsl:if test="string-length(substring-before(substring-after(EstFinish, ' '), ' ')) = 7">
												<xsl:text>0</xsl:text> 
											</xsl:if>
											<xsl:value-of select="translate(substring-before(substring-after(EstFinish, ' '), ' '), ':', '.')" />
										</xsl:variable>

										<xsl:variable name="estFinishTimeHourAdjust">
											<xsl:choose>
												<xsl:when test="substring-after(substring-after(EstFinish, ' '), ' ') = 'AM'">
													<xsl:text>0</xsl:text>
												</xsl:when>  
												<xsl:otherwise>
													<xsl:text>12</xsl:text>
												</xsl:otherwise> 
											</xsl:choose>
										</xsl:variable>
										<xsl:variable name="estFinish" select="concat($estFinishYear, '.', $estFinishMonth, '.', $estFinishDay, ' ', substring-before($estFinishTime, '.') + $estFinishTimeHourAdjust, '.' , substring-after($estFinishTime, '.'))" />

										<xsl:attribute name="baseline_end">
						  					<xsl:value-of select="$estFinish"/>
						  				</xsl:attribute>
									</xsl:if>
			  					</xsl:when>
			  					<xsl:when test="Milestone = 'True'">
									<xsl:if test="EstStart != ''">
										<xsl:variable name="estStartMonth">
											<xsl:if test="string-length(substring-before(EstStart, '/')) = '1'">0</xsl:if>
											<xsl:value-of select="substring-before(EstStart, '/')" />
										</xsl:variable>
										<xsl:variable name="estStartDay">
											<xsl:if test="string-length(substring-before(substring-after(EstStart, '/'), '/')) = '1'">0</xsl:if>
											<xsl:value-of select="substring-before(substring-after(EstStart, '/'), '/')" />
										</xsl:variable>
										<xsl:variable name="estStartYear">
											<xsl:value-of select="substring-before(substring-after(substring-after(EstStart, '/'), '/'), ' ')" />
										</xsl:variable>
										<xsl:variable name="estStart" select="concat($estStartYear, '.', $estStartMonth, '.', $estStartDay)" />
										<xsl:attribute name="baseline_start">
						  					<xsl:value-of select="$estStart"/>
						  				</xsl:attribute>
									</xsl:if>
			  					</xsl:when>
			  				</xsl:choose> 
							<attributes>
					        	<attribute name="Title">
					        		<xsl:value-of select="Title" />
					        	</attribute>
					        	<attribute name="EstEffort">
					        		<xsl:value-of select="EstEffort" />
					        	</attribute>
					        	<attribute name="EstStart">
					        		<xsl:value-of select="EstStart" />
					        	</attribute>
					        	<attribute name="EstFinish">
					        		<xsl:value-of select="EstFinish" />
					        	</attribute>
					        	<attribute name="ActEffort">
					        		<xsl:value-of select="ActEffort" />
					        	</attribute>
					        	<attribute name="ActStart">
					        		<xsl:value-of select="ActStart" />
					        	</attribute>
					        	<attribute name="ActFinish">
					        		<xsl:value-of select="ActFinish" />
					        	</attribute>
					        	<attribute name="AssignedTo">
					        		<xsl:value-of select="AssignedTo" />
					        	</attribute>
					        	<attribute name="ProjectPhase">
					        		<xsl:value-of select="ProjectPhase" />
					        	</attribute>
					        	<attribute name="PERComplete">
					        		<xsl:value-of select="PercComplete" />
					        	</attribute>
					        	<attribute name="WBS">
					        		<xsl:value-of select="WBS" />
					        	</attribute>
					        	<attribute name="ListID">
					        		<xsl:value-of select="ListID" />
					        	</attribute>
					        </attributes>
						</task>
					</xsl:for-each>
				</tasks>
				<connectors>
					<xsl:for-each select="//Data/items/item[PredecessorId != '']">
						<xsl:variable name="connectorToID" select="ID" />
						<xsl:variable name="predValues">
							<xsl:call-template name="makeLemonade">
								<xsl:with-param name="baseElementParam">
									<xsl:value-of select="PredecessorId" /> 
								</xsl:with-param>
								<xsl:with-param name="delimiterStringParam"><xsl:text>,</xsl:text></xsl:with-param>
								<xsl:with-param name="iterationCountParam"><xsl:text>1</xsl:text></xsl:with-param>
							</xsl:call-template>
						</xsl:variable>
						<xsl:variable name="predecessors" select="$predValues" />
						<xsl:for-each select="$predecessors/values">
							<connector type="FinishStart" >
								<xsl:attribute name="from">
				  					<xsl:value-of select="." />
				  				</xsl:attribute>
								<xsl:attribute name="to">
				  					<xsl:value-of select="$connectorToID" />
				  				</xsl:attribute>
							</connector>
						</xsl:for-each>

						
					</xsl:for-each>
				</connectors>
			</project_chart>
		</anychart>
	</xsl:template>
	<xsl:template name="makeLemonade"> <!-- Take a single element and turn it into repeating elements, based on a delimiter -->
		<xsl:param name="baseElementParam" />
		<xsl:param name="delimiterStringParam" />
		<xsl:param name="iterationCountParam" /> <!-- Must be set to 1 on first call -->

		<xsl:variable name="baseElement" select="normalize-space($baseElementParam)" />
		<xsl:variable name="delimiterString" select="$delimiterStringParam" />
		<xsl:variable name="iterationCount">
			<xsl:choose>
				<xsl:when test="string(number($iterationCountParam))='NaN'">
					<xsl:text>1</xsl:text>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="$iterationCountParam" />
				</xsl:otherwise> 
			</xsl:choose> 
		</xsl:variable> 
		
		<xsl:choose>
			<xsl:when test="contains($baseElement, $delimiterString)"> <!-- There is an delimiter value in the base element string -->
				<xsl:choose>
					<xsl:when test="starts-with($baseElement, $delimiterString)" > <!-- If the delimiter is at the beginning, all we can do is strip it off and go again -->
						<xsl:call-template name="makeLemonade">
							<xsl:with-param name="baseElementParam">
								<xsl:value-of select="substring-after($baseElement, $delimiterString)" /> 
							</xsl:with-param>
							<xsl:with-param name="delimiterStringParam" select="$delimiterString" />
							<xsl:with-param name="iterationCountParam" select="$iterationCount + 1" />
						</xsl:call-template>
					</xsl:when>
					<xsl:otherwise>
						<values>
							<xsl:value-of select="substring-before($baseElement, $delimiterString)" />
						</values>
						<xsl:call-template name="makeLemonade">
							<xsl:with-param name="baseElementParam">
								<xsl:value-of select="substring-after($baseElement, $delimiterString)" /> 
							</xsl:with-param>
							<xsl:with-param name="delimiterStringParam" select="$delimiterString" />
							<xsl:with-param name="iterationCountParam" select="$iterationCount + 1" />
						</xsl:call-template>
					</xsl:otherwise> 
				</xsl:choose>
			</xsl:when>
			<xsl:otherwise>
				<values>
					<xsl:value-of select="$baseElement" />
				</values>
			</xsl:otherwise> 
		</xsl:choose>			
	</xsl:template>
</xsl:stylesheet>