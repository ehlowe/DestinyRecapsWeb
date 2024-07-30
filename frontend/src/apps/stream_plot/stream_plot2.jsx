import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import plotData from './plot_data.json';  // Adjust this path as needed

const DataDrivenVisualization = () => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (svgRef.current && dimensions.width > 0 && dimensions.height > 0) {
      const svg = d3.select(svgRef.current);
      const { background_color, bar_height_setting, circle_size_multiplier, circle_size_offset } = plotData.plot_parameters;
      
      const plotting_width = 10;
      const plotting_height = 10;

      svg.selectAll("*").remove();

      svg.attr("viewBox", `0 0 ${plotting_width} ${plotting_height}`)
         .style("background-color", `#${background_color.toString(16)}`);

      const scaleX = d3.scaleLinear().domain([0, 1]).range([0, plotting_width]);
      const scaleY = d3.scaleLinear().domain([0, 1]).range([0, plotting_height]);

      // Create a tooltip div
      const tooltip = d3.select(containerRef.current)
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "1px solid #ddd")
        .style("padding", "10px")
        .style("border-radius", "5px");

      // Draw segments (bar) with interactivity
      svg.selectAll(".segment")
        .data(plotData.segments)
        .enter()
        .append("rect")
        .attr("class", "segment")
        .attr("x", d => scaleX(d.x - d.width/2))
        .attr("y", scaleY(0.8))
        .attr("width", d => scaleX(d.width))
        .attr("height", scaleY(bar_height_setting))
        .attr("fill", d => d.color)
        .on("mouseover", function(event, d) {
          d3.select(this).attr("opacity", 0.7);
          tooltip.transition()
            .duration(200)
            .style("opacity", .9);
          tooltip.html(`Category: ${d.category}<br/>Width: ${d.width}`)
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
          d3.select(this).attr("opacity", 1);
          tooltip.transition()
            .duration(500)
            .style("opacity", 0);
        });

      const validAbstractions = Object.entries(plotData.abstractions)
        .filter(([key, value]) => value != null && value.x != null && value.y != null && value.size != null)
        .map(([key, value]) => ({ key, ...value }));

      // Draw lines connecting abstractions to segments
      svg.selectAll(".connection-line")
        .data(plotData.segments)
        .enter()
        .filter(d => d.category !== 'non categorized')
        .append("line")
        .attr("class", "connection-line")
        .attr("x1", d => scaleX(d.x))
        .attr("y1", scaleY(0.802))
        .attr("x2", d => scaleX(plotData.abstractions[d.category].x))
        .attr("y2", d => scaleY(plotData.abstractions[d.category].y))
        .attr("stroke", d => d.color)
        .attr("stroke-width", d => scaleY(0.12*d.width+0.0006));

      // Draw abstractions (ellipses) with interactivity
      const abstractionGroups = svg.selectAll(".abstraction")
        .data(validAbstractions)
        .enter()
        .append("g")
        .attr("class", "abstraction")
        .attr("transform", d => `translate(${scaleX(d.x)}, ${scaleY(d.y)})`)
        .on("mouseover", function(event, d) {
          d3.select(this).select("ellipse").attr("opacity", 0.7);
          tooltip.transition()
            .duration(200)
            .style("opacity", .9);
          tooltip.html(`Abstraction: ${d.key}<br/>Size: ${d.size}`)
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
          d3.select(this).select("ellipse").attr("opacity", 1);
          tooltip.transition()
            .duration(500)
            .style("opacity", 0);
        });

      abstractionGroups.append("ellipse")
        .attr("rx", d => scaleX(0.02+d.size/1.8))
        .attr("ry", d => scaleY(0.02+d.size/2))
        .attr("fill", d => d.color);

      // Text wrapping function
      function wrapText(selection, widthFunc) {
        selection.each(function(d) {
          const text = d3.select(this);
          const words = text.text().split(/\s+/);
          const lineHeight = 1.1; // ems
          const width = widthFunc(d);
          
          let line = [];
          let lineNumber = 0;
          const tspan = text.text(null).append("tspan").attr("x", 0).attr("y", 0);

          for (let word of words) {
            line.push(word);
            tspan.text(line.join(" "));
            const lineWidth = tspan.node().getComputedTextLength();

            if (lineWidth > width && line.length > 1) {
              line.pop();
              tspan.text(line.join(" "));
              line = [word];
              lineNumber++;
              text.append("tspan")
                  .attr("x", 0)
                  .attr("y", 0)
                  .attr("dy", `${lineNumber * lineHeight}em`)
                  .text(word)
                  .style("font-weight", "bold");
            }
          }

          const textHeight = (lineNumber + 1) * lineHeight;
          text.selectAll("tspan")
            .attr("y", `-${textHeight/2.8}em`)
            .attr("x", 0)
            .style("font-weight", "bold");
        });
      }

      // Apply text to abstractions
      abstractionGroups.append("text")
        .text(d => d.key)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("font-size", d => `${scaleY(d.size * 0.17)}px`)
        .call(wrapText, d => scaleX(d.size * 2 * (circle_size_multiplier + circle_size_offset)));

      console.log("Visualization rendered");
    }
  }, [dimensions]);
  

  return (
    <div ref={containerRef} style={{
      backgroundColor: 'transparent',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '100%',
      height: '100%',
      margin: '0 auto',
      position: 'relative'
    }}>
      <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default DataDrivenVisualization;