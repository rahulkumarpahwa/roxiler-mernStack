import { useState, useEffect } from "react";

const TransactionTable = () => {
  const [data, setData] = useState();
  const [month, setMonth] = useState("03");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, [month,search]);
  const fetchData = async () => {
    const response = await fetch(
      `http://localhost:3000/alltransactions/${month}?page=12&search=${search}`
    );
    const json = await response.json();
    setData(json);
    // console.log(json);
  };

  return (
    <div className=" bg-purple-400 flex justify-center items-center flex-col">
      <div className="rounded-full bg-white w-40 h-40 text-center py-12 text-xl font-bold my-4">
        Transaction Dashboard
      </div>

      <div className="flex items-center justify-center gap-80 my-4">
        <input
          type="text"
          placeholder="Search Transaction"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="text-center rounded-lg border-2 border-[#f8df8c] text-black w-[20rem]"
        />
        <div className="">
          <select
            className="border-2 border-[#f8df8c] rounded-lg text-center w-[10rem]"
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
      </div>

      <div className="my-8 mx-4 p-4 text-neutral-200  font-semibold">
        <table>
          <thead>
            <tr>
              <th className="border-2 p-2">ID</th>
              <th className="border-2 p-2">Title</th>
              <th className="border-2 p-2">Description</th>
              <th className="border-2 p-2">Price</th>
              <th className="border-2 p-2">Category</th>
              <th className="border-2 p-2">Sold</th>
              <th className="border-2 p-2">Image</th>
            </tr>
          </thead>
          <tbody>
            {data != undefined &&
              data.allProducts.length != 0 &&
              data.allProducts.map((item) => (
                <tr key={item._id}>
                  <td className="border-2 p-2">{item.id}</td>
                  <td className="border-2 p-2">{item.title}</td>
                  <td className="border-2 p-2">{item.description}</td>
                  <td className="border-2 p-2">₹{item.price.toFixed(2)}</td>
                  <td className="border-2 p-2">{item.category}</td>
                  <td className="border-2 p-2">{item.sold ? "✅" : "❌"}</td>
                  <td className="border-2 p-2">
                    {" "}
                    <div className="w-20">
                      <img src={item.image} className="rounded-lg w-full" alt="" />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
