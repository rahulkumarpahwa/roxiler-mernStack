import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useEffect } from "react";

Chart.register(CategoryScale);

const BarGraph = () => {
  const [month, setMonth] = useState("01");
  const [chartData, setChartData] = useState();

  useEffect(() => {
    fetchData();
  }, [month]);
  const fetchData = async () => {
    const response = await fetch(`http://localhost:3000/barchart/${month}`);
    const json = await response.json();
    setChartData(json);
    console.log(json);
  };

  return (
    <div className="h-[43rem] bg-[#edf6f6] flex flex-col items-center justify-center py-20">
      <div className="my-4 text-xl">
        <label htmlFor="month" className="font-bold text-3xl">
          Bar Charts Statistics -{" "}
        </label>
        <select
          className="border-2 border-[#f8df8c] rounded-lg text-center"
          name="month"
          id="month"
          value={month}
          onChange={(e) => {
            setMonth(e.target.value);
          }}
        >
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      {chartData != undefined && (
        <Bar
          data={{
            labels: chartData.priceRange.map((data) => data.year),
            datasets: [
              {
                label: "Items Sold",
                data: chartData.priceRange.map((data) => data.item),
                backgroundColor: [
                  "#7276e0",
                  "#867ad4",
                  "#9a7ec9",
                  "#9a7ec9",
                  "#af82be",
                  "#c385b2",
                  "#d789a7",
                  "#ff9190",
                ],
                // borderColor: "black",
                // borderWidth: 1,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Items Sold For Different Price Ranges in a Month",
              },
              legend: {
                display: true,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default BarGraph;
