import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { useSelector } from "react-redux";

const situationColors = {
  Confirmed: "#3498db",
  Deaths: "#e74c3c",
  Recovered: "#27ae60",
  Active: "#f9ca24",
};

export const Chart = () => {
  const covidData = useSelector((state) => state.covid.covidData);
  const covidGlobalData = useSelector((state) => state.covid.covidGlobalData);
  const selectedCountry = useSelector((state) => state.covid.selectedCountry);

  const data = [
    {
      situation: "Confirmed",
      value: selectedCountry ? covidData.confirmed : covidGlobalData.confirmed,
    },
    {
      situation: "Deaths",
      value: selectedCountry ? covidData.deaths : covidGlobalData.deaths,
    },
    {
      situation: "Recovered",
      value: selectedCountry ? covidData.recovered : covidGlobalData.recovered,
    },
    {
      situation: "Active",
      value: selectedCountry ? covidData.active : covidGlobalData.active,
    },
  ];

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "32px",
        width: 600,
        margin: "0 auto",
      }}
    >
      <h3
        style={{
          color: "#3498db",
          textAlign: "center",
          marginBottom: "18px",
          fontSize: "1.6rem",
        }}
      >
        {selectedCountry ? `COVID-19 in ${selectedCountry}` : "Global COVID-19"}
      </h3>
      <ResponsiveContainer width={540} height={340}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="situation" stroke="#888" tick={{ fontSize: 18 }} />
          <YAxis
            stroke="#222"
            tick={{ fontSize: 16, fill: "#222" }}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              background: "#f4f4f4",
              borderRadius: "10px",
              border: "1px solid #ddd",
            }}
            labelStyle={{ color: "#3498db", fontSize: 16 }}
            itemStyle={{ color: "#e74c3c", fontSize: 16 }}
            formatter={(value) => value?.toLocaleString()}
          />
          <Legend wrapperStyle={{ fontSize: 16 }} />
          <Bar dataKey="value" radius={[12, 12, 0, 0]} barSize={70}>
            {data.map((entry) => (
              <Cell
                key={entry.situation}
                fill={situationColors[entry.situation]}
              />
            ))}
            <LabelList
              dataKey="value"
              position="top"
              formatter={(value) => value?.toLocaleString()}
              fontSize={18}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
