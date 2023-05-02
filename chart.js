
{
   const data = [
    { type: "Murder", count: 43, total: 19384 },
    { type: "Suicide", count: 54, total: 24292 },
    { type: "Other", count: 2, total: 935 }
  ];
  
  const width = 800;
  const height = 400;
  const radius = Math.min(width, height) / 2;
  // const colors = d3.scaleOrdinal(d3.schemeCategory10);
  // Define colors for each type
  const newcolors = ["#FF0800", "#8B0000", "#674846"];

  // // Create the tooltip
  // const tip = d3.tip()
  //   .attr("class", "d3-tip")
  //   .offset([-10, 0])
  //   .html(function(d) {
  //     return `<strong>${d.data.type}:</strong> ${d.data.total}`;
  //   });

  // // Call the tooltip
  // svg.call(tip);

  // Create ordinal scale to map types to colors
  const colorScale = d3.scaleOrdinal()
      .domain(data.map(d => d.type))
      .range(newcolors);
  
  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  
  const g = svg.append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);
  
  const arc = d3.arc()
    .innerRadius(radius / 2)
    .outerRadius(radius);
  
  const pie = d3.pie()
    .sort(null)
    .value(d => d.count);
  
  const path = g.selectAll("path")
    .data(pie(data))
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", d => colorScale(d.data.type))
    // .on("mouseover", tip.show) // Show tooltip on mouseover
    // .on("mouseout", tip.hide); // Hide tooltip on mouseout
  
  const legend = g.selectAll(".legend")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", (d, i) => `translate(-100, ${i * 25 - 50})`)
    .attr("fill", d => colorScale(d.type));
  
  legend.append("rect")
    .attr("x", -300)
    .attr("y", -5)
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", d => colorScale(d.type));
  
  legend.append("text")
    .attr("x", -270)
    .attr("y", 10)
    .text(d => `${d.type} (${d.count}%)`)
    .style("font-family", "Mulish");





}
