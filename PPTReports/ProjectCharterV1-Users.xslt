<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:template match="/">
	<xsl:variable name="TeamMembers">
				<xsl:for-each select="//TeamMembers/cw:listitems/rs:data/z:row">
					<xsl:copy-of select="." />			
				</xsl:for-each>
	</xsl:variable>	
	
<font face="Calibri">	
	<div>
		<table style="width:600px;">
		  <thead>
		    <tr>
		      <th align="left" style="width:200px;padding:5px;color:#2F5597;">Name</th>
		      <th align="left" style="width:200px;padding:5px;color:#2F5597;">Role</th>
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
		      <td style="text-align:left;padding:5px"><xsl:value-of select="substring-after(@ows_SharePointUser, ';#')"/></td>
		      <td style="text-align:left;padding:5px"><xsl:value-of select="@ows_Role"/></td>
		    </tr>
		   </xsl:for-each>
		  <xsl:for-each select="//TeamMembers/cw:listitems/rs:data/z:row[@ows_Role != 'Team Leader']">
		  <xsl:sort select="@ows_Role" order="ascending" />
		    <tr>
		      <td style="text-align:left;padding:5px"><xsl:value-of select="substring-after(@ows_SharePointUser, ';#')"/></td>
		      <td style="text-align:left;padding:5px"><xsl:value-of select="@ows_Role"/></td>
		    </tr>
		   </xsl:for-each> 	
		  --> 				    
		  </tbody>
		</table>
	</div>
</font>						
	</xsl:template>
</xsl:stylesheet>