<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:template match="/">
<font face="Calibri">	
	<div>
		<table style="width:550px;">
		  <thead>
		    <tr>
		      <th align="left" style="width:150px;padding:5px">Milestone</th>
		      <th align="left" style="width:115px;padding:5px">Target</th>
		      <th align="left" style="width:115px;padding:5px">Actual</th>
		      <th align="left" style="width:50px;padding:5px">Complete</th>
		    </tr>
		  </thead>
		  <tbody>
		  <xsl:for-each select="//Milestones/cw:listitems/rs:data/z:row">
		    <tr>
		      <td align="left"><xsl:value-of select="@ows_Title"/></td>
		      <td align="left"><xsl:if test="@ows_TargetDate"><xsl:value-of select="format-date(xs:date(substring-before(@ows_TargetDate,' ')), '[M01]-[D01]-[Y0001]')"/></xsl:if></td>
		      <td align="left"><xsl:if test="@ows_ActualDate"><xsl:value-of select="format-date(xs:date(substring-before(@ows_ActualDate,' ')), '[M01]-[D01]-[Y0001]')"/></xsl:if></td>				      
		      <td align="left">
		      	<xsl:choose>
		      		<xsl:when test="@ows_Complete = 1">
		      			Yes
		      		</xsl:when>
		      		<xsl:otherwise>
		      			No
		      		</xsl:otherwise>
		      	</xsl:choose> 
		      </td>
		    </tr>
		   </xsl:for-each>				    
		  </tbody>
		</table>
		
	</div>
</font>						
	</xsl:template>
</xsl:stylesheet>