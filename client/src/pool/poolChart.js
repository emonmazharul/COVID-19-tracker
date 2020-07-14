import React, { useEffect, useRef, useContext } from "react";
import Chart from "chart.js";
import { Grid } from "semantic-ui-react";
import { PoolContext } from "./context";

function PoolChart() {
  const chartRef = useRef();
  const { poolOptions: chartData, totalVote } = useContext(
    PoolContext
  ).poolData;
  useEffect(() => {
    const labels = chartData.map((option) => option.optionName);
    const vote = chartData.map((option) => option.vote);
    const ctx = chartRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "doughnut",
      legend: "Online Pool App",
      data: {
        labels,
        datasets: [
          {
            label: "Pool App",
            data: vote,
            backgroundColor: [
              "#FFBE0B",
              "#FB5607",
              "#FF006E",
              "#8338EC",
              "#3A86FF",
              "#2E1E0F",
            ],
            weight: 4,
            borderWidth: 0.4,
          },
        ],
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      },
      options: {
        tooltips: {
          callbacks: {
            label(tooltipItem, data) {
              const optionName = data.labels[tooltipItem.index];
              const vote = data.datasets[0].data[tooltipItem.index];
              return `${optionName}-${vote} vote${vote > 0 ? "s" : ""}`;
            },
          },
        },
        legend: {
          display: false,
        },
      },
    });
    return () => chart.destroy();
  }, [chartData, totalVote]);
  return (
    <Grid style={{ marginTop: "1em", display: totalVote === 0 ? "none" : "" }}>
      <Grid.Row>
        <Grid.Column mobile={16} tablet={12} computer={8}>
          <canvas ref={chartRef} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default PoolChart;
