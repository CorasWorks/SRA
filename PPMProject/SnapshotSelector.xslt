<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:msxsl="urn:schemas-microsoft-com:xslt" 
	xmlns:date="http://exslt.org/dates-and-times"
	xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/"
	xmlns:rs="urn:schemas-microsoft-com:rowset"
	xmlns:z="#RowsetSchema"
	exclude-result-prefixes="msxsl date cw rs z">
	<xsl:output method="html" omit-xml-declaration="yes"/>
	<xsl:template match="/">
		<table>
			<tr>
				<td>
					Compare
				</td>
				<td>
					<select id="snapshot1" name="snapshot1">
						<option value="*" selected="selected">Current</option>
						<xsl:for-each select="//NewDataSet/ScheduleSnapshots/cw:listitems/rs:data/z:row">
							<option>
								<xsl:attribute name="value">
									<xsl:value-of select="substring-after(@ows_FileLeafRef, ';#')" />
								</xsl:attribute>
								<xsl:value-of select="@ows_Modified" /> (<xsl:value-of select="substring-after(@ows_Editor, ';#')" />)
							</option>
						</xsl:for-each>
					</select>
				</td>
				<td rowspan="2">
					<input type="button" value="Go" onclick="refreshChart();"  />
				</td>
			</tr>
			<tr>
				<td>
					To
				</td>
				<td>
					<select id="snapshot2" name="snapshot2">
						<option value="*" selected="selected">Current</option>
						<xsl:for-each select="//NewDataSet/ScheduleSnapshots/cw:listitems/rs:data/z:row">
							<option>
								<xsl:attribute name="value">
									<xsl:value-of select="substring-after(@ows_FileLeafRef, ';#')" />
								</xsl:attribute>
								<xsl:value-of select="@ows_Modified" /> (<xsl:value-of select="substring-after(@ows_Editor, ';#')" />)
							</option>
						</xsl:for-each>
					</select>
				</td>
			</tr>
		</table>
	</xsl:template>
</xsl:stylesheet>
