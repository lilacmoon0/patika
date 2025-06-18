import { useSelector } from "react-redux";

const situationColors = {
  Confirmed: "#3498db",
  Deaths: "#e74c3c",
  Recovered: "#27ae60",
  Active: "#f9ca24",
};

export const Cards = () => {
  const covidGlobalData = useSelector((state) => state.covid.covidGlobalData);
  const covidData = useSelector((state) => state.covid.covidData);
  const selectedCountry = useSelector((state) => state.covid.selectedCountry);

  const cards = [
    {
      key: "confirmed",
      title: "Confirmed Cases",
      value: selectedCountry ? covidData.confirmed : covidGlobalData.confirmed,
      color: situationColors.Confirmed,
    },
    {
      key: "deaths",
      title: "Deaths",
      value: selectedCountry ? covidData.deaths : covidGlobalData.deaths,
      color: situationColors.Deaths,
    },
    {
      key: "recovered",
      title: "Recovered",
      value: selectedCountry ? covidData.recovered : covidGlobalData.recovered,
      color: situationColors.Recovered,
    },
    {
      key: "active",
      title: "Active Cases",
      value: selectedCountry ? covidData.active : covidGlobalData.active,
      color: situationColors.Active,
    },
  ];

  const lastUpdate = selectedCountry
    ? covidData.last_update
    : covidGlobalData.last_update;

  return (
    <div className="cards-container">
      {cards.map((card) => (
        <div
          key={card.key}
          className="card"
          style={{
            borderTop: `6px solid ${card.color}`,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            background: "#fff",
            borderRadius: "14px",
            padding: "24px 18px",
            margin: "0 12px",
            minWidth: "180px",
            flex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2
            style={{ color: card.color, marginBottom: 8, fontSize: "1.2rem" }}
          >
            {card.title}
          </h2>
          <p style={{ fontSize: "2rem", fontWeight: "bold", margin: 0 }}>
            {card.value?.toLocaleString() ?? "-"}
          </p>
          <p style={{ fontSize: "0.95rem", color: "#888", marginTop: 10 }}>
            Last Update: <br />
            <span style={{ color: "#222" }}>{lastUpdate ?? "-"}</span>
          </p>
        </div>
      ))}
    </div>
  );
};
