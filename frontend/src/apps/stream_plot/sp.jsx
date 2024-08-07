import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
// import plotData from './plot_data.json';  // Adjust this path as needed

const DataDrivenVisualization = ({plotData}) => {
    console.log(plotData);
    const svgRef = useRef(null);
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [tooltipContent, setTooltipContent] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
    const updateDimensions = useCallback(() => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    }, []);
  
    useEffect(() => {
      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }, [updateDimensions]);

    useEffect(() => {
        if (svgRef.current && dimensions.width > 0 && dimensions.height > 0) {
            const svg = d3.select(svgRef.current);
            const { background_color, bar_height_setting, circle_size_multiplier, circle_size_offset } = plotData.plot_parameters;
            
            const plotting_width = 10;
            const plotting_height = 10;
            const bar_height = 0.85;
            const meta_x = 0.5;
            const meta_y = 0.3;
        
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
                .attr("y", scaleY(bar_height))
                .attr("width", d => scaleX(d.width))
                .attr("height", scaleY(bar_height_setting))
                .attr("fill", d => d.color)
                .on("mouseover", function(event, d) {
                    d3.select(this).attr("opacity", 0.7);
                    var [x, y] = d3.pointer(event, containerRef.current);
                    setTooltipContent(`<strong>Category: ${d.category}</strong>
                    <br/>
                    ${d.recap}
                    <br/>
                    <strong>CLICK BAR TO GO TO TIMESTAMP:</strong> ${d.href} `);
                    console.log(d.href);
                    // get width of the tooltip
                    const tooltipWidth = document.querySelector('.tooltip').width;

                    x=x-tooltipWidth/2;
                    y=y+10;

                    setTooltipPosition({ x , y });
                })
                .on("mouseout", function(d) {
                    d3.select(this).attr("opacity", 1);
                    setTooltipContent('');
                })
                .on("click", function(event, d) {
                    //open the d.href link
                    console.log("HREF: ", d.href);
                    window.open(d.href, '_blank');
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
                .attr("y1", scaleY(bar_height+0.002))
                .attr("x2", d => scaleX(plotData.abstractions[d.category].x))
                .attr("y2", d => scaleY(plotData.abstractions[d.category].y))
                .attr("stroke", d => d.color)
                .attr("stroke-width", d => scaleY(0.12*d.width+0.0006));

            // Draw lines to meta
            svg.selectAll(".connection-line2")
                .data(validAbstractions)
                .enter()
                .append("line")
                .attr("class", "connection-line")
                // .attr("class", "line")
                .attr("x1", d => scaleX(d.x))
                .attr("y1", d => scaleY(d.y))
                .attr("x2", scaleX(meta_x))
                .attr("y2", scaleY(meta_y))
                .attr("stroke", d => d.color)
                .attr("stroke-width", d => scaleY(0.0025+d.width/10));


            // draw line going up from meta
            svg.append("line")
                .attr("x1", scaleX(meta_x))
                .attr("y1", scaleY(meta_y))
                .attr("x2", scaleX(meta_x))
                .attr("y2", scaleY(0.0))
                .attr("stroke", "white")
                .attr("stroke-width", scaleY(0.01));

            // make meta circle and line going up from it
            svg.append("circle")
                .attr("cx", scaleX(meta_x))
                .attr("cy", scaleY(meta_y))
                .attr("r", scaleX(0.02))
                .attr("fill", "white");

            // Draw abstractions (ellipses) with interactivity
            const abstractionGroups = svg.selectAll(".abstraction")
                .data(validAbstractions)
                .enter()
                .append("g")
                .attr("class", "abstraction")
                .attr("transform", d => `translate(${scaleX(d.x)}, ${scaleY(d.y)})`)
                .on("mouseover", function(event, d) {
                    // d3.select(this).select("ellipse").attr("opacity", 0.7);
                    // const [x, y] = d3.pointer(event, containerRef.current);

                    // set the x, y to be the middle of the circle
                    d3.select(this).select("ellipse").attr("opacity", 0.7);
                    // const x = scaleX(d.x*dimensions.width);
                    // const y = scaleY(d.y*dimensions.height);
                    console.log(dimensions.height);
                    // const [x, y] = d3.pointer(event, containerRef.current);
                    
                    const x = dimensions.width*d.x;
                    const y = dimensions.height*d.y;



                    // setTooltipContent(`${d.recap}<br/>Width: ${d.width.toFixed(2)}`);
                    // setTooltipContent(`${d.recap}<br/>Width: ${0.1}`);
                    setTooltipContent(`${d.recap}`);

                    setTooltipPosition({ x, y });
                })
                .on("mouseout", function(d) {
                    d3.select(this).select("ellipse").attr("opacity", 1);
                    setTooltipContent('');
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
        <div>
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
            {tooltipContent && (
              <div
                style={{
                  position: 'absolute',
                  left: `${tooltipPosition.x}px`,
                  top: `${tooltipPosition.y}px`,
                  backgroundColor: 'white',
                  border: '1px solid #ddd',
                  padding: '10px',
                  borderRadius: '5px',
                  pointerEvents: 'none',
                  zIndex: 1000,
                }}
                dangerouslySetInnerHTML={{ __html: tooltipContent }}
              />
            )}
          </div>
        </div>
      );
    };
    
    export default DataDrivenVisualization;