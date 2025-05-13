import moment from "moment";
import {
  LineChart,
  Line,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function plotChart(user1: any, user2: any) {
  const dataSet = [];
  let dateNow = new Date();
  dateNow.setMinutes(dateNow.getMinutes() - 5); // getting the 5 minutes before time

  for (let index = 0; index < 300; index++) {
    dateNow.setUTCSeconds(dateNow.getUTCSeconds() + 1);
    const timeString = moment(dateNow).format("YYYY-MM-DD HH:mm:ss");

    // Check data available for this TIMESTAMP
    const record1 = user1?.find((e: { reading_time: string; }) => e.reading_time === timeString);
    const record2 = user2?.find((e: { reading_time: string; }) => e.reading_time === timeString);

    const singleRecord = {
      user1: 0,
      user2: 0,
      time: timeString,
    };

    if (record1) {
      singleRecord.user1 = record1.spo2;
    }
    if (record2) {
      singleRecord.user2 = record2.spo2;
    }
    dataSet.push(singleRecord);
  }
  return dataSet;
}

function plotChart2(user1: any[], user2: any[], user3: any[]) {
  console.log('--user1--', user1);
  
  const dataSet = [];
  let dateNow = new Date();
  dateNow.setMinutes(dateNow.getMinutes() - 5); // getting the 5 minutes before time

  for (let index = 0; index < 300; index++) {
    dateNow.setUTCSeconds(dateNow.getUTCSeconds() + 1);
    const timeString = moment(dateNow).format("YYYY-MM-DD HH:mm:ss");
    // Check data available for this TIMESTAMP
    const record1 = user1?.find((e) => e.reading_time === timeString);
    const record2 = user2?.find((e) => e.reading_time === timeString);
    const record3 = user3?.find((e) => e.reading_time === timeString);

    const singleRecord = {
      user1: 0,
      user2: 0,
      user3: 0,
      time: timeString,
    };

    if (record1) {
      singleRecord.user1 = record1.spo2;
    }
    if (record2) {
      singleRecord.user2 = record2.spo2;
    }
    if (record3) {
      singleRecord.user3 = record3.spo2;
    }
    dataSet.push(singleRecord);
  }
  return dataSet;
}

export default function Chart2(props: { userValue: any; fData: any; }) {

  
  let chart: any[] | undefined = [];
  const userValue = props.userValue;
  const fData = props.fData;

  if (userValue?.length === 2) {
    const userData = [];
    for (let user of userValue) {
      userData.push(fData[String(user.user_id)]);
    }
    chart = plotChart(userData[0], userData[1]);
  } else if (userValue?.length === 3) {
    const userData = [];
    for (let user of userValue) {
      userData.push(fData[String(user.user_id)]);
    }
    chart = plotChart2(userData[0], userData[1], userData[2]);
  }

  const user1 = userValue[0].first_name + " " + userValue[0].last_name;
  const user2 = userValue[1].first_name + " " + userValue[1].last_name;
  const user3 = userValue[2]?.first_name + " " + userValue[2]?.last_name;
  return (
    <ResponsiveContainer width="100%" height="100%" aspect={3}>
      <LineChart
        width={500}
        height={100}
        data={chart}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="user1"
          stroke="#9CD897"
          activeDot={{ r: 8 }}
          dot={false}
          name={user1}
        />
        <Line
          type="monotone"
          dataKey="user2"
          stroke="#E892BB"
          dot={false}
          name={user2}
        />
        {userValue?.length === 3 && (
          <Line
            type="monotone"
            dataKey="user3"
            stroke="#42DFF4"
            dot={false}
            name={user3}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}
