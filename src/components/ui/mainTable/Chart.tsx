import moment from "moment";
import { PlotChartDataSet, PlotChartRecord } from "@/types/interfaces";
import { LineChart, Line, Tooltip, ResponsiveContainer, XAxis } from "recharts";

const plotChart = (data: PlotChartRecord[]): PlotChartDataSet[] => {
  const numberOfMinutes = 1;
  const dateNow = new Date();
  dateNow.setMinutes(dateNow.getMinutes() - numberOfMinutes);
  const dataSet: PlotChartDataSet[] = [];

  for (let index = 0; index < numberOfMinutes * 60; index++) {
    dateNow.setUTCSeconds(dateNow.getUTCSeconds() + 1);
    const timeString = moment(dateNow).format("YYYY-MM-DD HH:mm:ss");

    const record = data.find((e) => e.reading_time === timeString);

    const singleRecord = {
      spo2: record?.spo2 || 0,
      Heart_Rate: record?.heart_rate || 0,
      name: record?.spo2 || 0,
    };

    dataSet.push({
      spo2: singleRecord.spo2,
      Heart_Rate: singleRecord.Heart_Rate,
      name: timeString.substring(timeString.length - 9),
      time: timeString,
    });
  }

  return dataSet;
};

interface ChartProps {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  vitals: any[];
  height: number;
}

const Chart = ({ vitals, height }: ChartProps) => {
  const chartData = plotChart(vitals);

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
        <XAxis dataKey="name" display={"none"} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
