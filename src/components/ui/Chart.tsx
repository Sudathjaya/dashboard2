import { LineChart, Line, Tooltip, ResponsiveContainer, XAxis } from "recharts";
import moment from "moment";

function plotChart(data: any[]) {
  const numberOfMinutes = 1;
  let dateNow = new Date(); // getting current time
  dateNow.setMinutes(dateNow.getMinutes() - numberOfMinutes); // getting the n minutes before time
  const dataSet = [];

  for (let index = 0; index < numberOfMinutes * 60; index++) {
    // fill 300 elements
    dateNow.setUTCSeconds(dateNow.getUTCSeconds() + 1);
    const timeString = moment(dateNow).format("YYYY-MM-DD HH:mm:ss");

    // Check data available for this TIMESTAMP
    const record = data?.find((e) => e?.reading_time === timeString);

    const singleRecord = {
      name: 0,
      spo2: 0,
      Heart_Rate: 0,
    };

    if (record) {
      singleRecord.spo2 = record.spo2;
      singleRecord.Heart_Rate = record.heart_rate;
      singleRecord.name = record.spo2;
    }

    dataSet.push({
      spo2: singleRecord.spo2,
      Heart_Rate: singleRecord.Heart_Rate,
      name: timeString.substring(timeString.length - 9),
      time: timeString,
    });
  }
  return dataSet;
}

export default function Chart(props: { fData: any; height: any; }) {
  const data = props.fData;
  const height = props.height;
  const chartData = plotChart(data);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData} style={{ cursor: "pointer" }}>
        <Line
          stroke="#A6CEE3"
          activeDot={{ r: 8 }}
          type="monotone"
          dataKey="spo2"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="Heart_Rate"
          dot={false}
          stroke="#1F78B4"
          strokeDasharray="5 5"
          />
        <Tooltip />
        <XAxis dataKey="name" display={"none"}/>
      </LineChart>
    </ResponsiveContainer>
  );
}
