import { useEffect, useState } from "react";

const Statistics = () => {
  const [data, setData] = useState();
  const [month, setMonth] = useState("01");

  useEffect(() => {
    fetchData();
  }, [month]);
  const fetchData = async () => {
    const response = await fetch(`http://localhost:3000/statistics/${month}`);
    const json = await response.json();
    setData(json);
    // console.log(json);
  };

  return (
    <div className="flex items-center justify-center flex-col bg-cyan-300 h-[30rem] text-xl ">
      <div className="">
        <label htmlFor="month" className="font-bold text-3xl">
          Statistics -{" "}
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

      <div className="grid grid-cols-2 gap-1 max-w-[400px] my-4 p-4 rounded-xl bg-[#f8df8c]">
        <div className="text-left">
          <div>Total Sale </div>
          <div>Total Sold Items </div>
          <div>Total Not Sold Items </div>
        </div>
        <div className="text-center">
          <div> ₹ {data?.totalAmount} </div>
          <div> {data?.soldItems}</div>
          <div> {data?.notSoldItems}</div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
