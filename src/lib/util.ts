import { DOMAIN } from "../../public/const";

interface User {
  user_id: string;
}

interface LastElement {
  spo2?: number;
  signal_quality?: boolean;
}

interface GetSpo2Value {
  value: string;
  type: string;
}

const COLORS = {
  gray: "#808080",
  red: "#E51414",
  yellow: "#F7B500",
  green: "#56E4D7",
};

const decodeJWT = (token: string): Record<string, unknown> | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    /* eslint-disable no-console */
    console.error("JWT Decoding Error:", error);
    return null;
  }
};

const getTimeZone = (): string => {
  const offset = new Date().getTimezoneOffset();
  const o = Math.abs(offset);
  return (
    (offset < 0 ? "+" : "-") +
    ("00" + Math.floor(o / 60)).slice(-2) +
    ":" +
    ("00" + (o % 60)).slice(-2)
  );
};

const getDefaultHeaders = (
  token: string | null = null,
): Record<string, string> => {
  const headers: Record<string, string> = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    domain: DOMAIN,
    timezone: getTimeZone(),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const getDefaultHeaders2 = (
  token: string | null = null,
): Record<string, string> => {
  const headers: Record<string, string> = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "multipart/form-data",
    domain: DOMAIN,
    timezone: getTimeZone(),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};
interface LoadColorCodeProps {
  value: string | number;
  type: string;
}

// const loadColorCode = ({
//   value,
//   type,
// }: LoadColorCodeProps): React.CSSProperties => {
//   const baseStyle = {
//     fontFamily: "Poppins",
//     fontStyle: "normal",
//     fontWeight: 600,
//     fontSize: "1.18rem",
//     lineHeight: "1.5px",
//     marginRight: "5px",
//   };

//   if (value === "--" || type === "bad") {
//     return { ...baseStyle, color: COLORS.gray };
//   }

//   if (typeof value === "number") {
//     if (value < 90) {
//       return { ...baseStyle, color: COLORS.red };
//     }
//     if (value <= 94) {
//       return { ...baseStyle, color: COLORS.yellow };
//     }
//     if (value > 94) {
//       return { ...baseStyle, color: COLORS.green };
//     }
//   }

//   return { ...baseStyle, color: COLORS.gray };
// };

// const getSpo2Value = (
//   fData: Record<string, LastElement[]>,
//   item: User,
// ): GetSpo2Value => {
//   let data: GetSpo2Value = {
//     value: "--",
//     type: "bad",
//   };

//   const userData = fData[String(item.user_id)];

//   if (userData && userData.length > 0) {
//     const lastElement = userData[userData.length - 1];
//     if (lastElement.spo2 && lastElement.signal_quality) {
//       data = { value: lastElement.spo2.toString(), type: "ok" };
//     } else if (
//       !lastElement.signal_quality &&
//       lastElement.spo2 &&
//       lastElement.spo2 > 80
//     ) {
//       data = { value: lastElement.spo2.toString(), type: "bad" };
//     }
//   }

//   return data;
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getLastActiveTime = (fData: any, item: any) => {
  if (Object.keys(fData).length === 0) {
    return "--";
  }
  if (!item?.user_id) {
    return "--";
  }
  if (fData[String(item?.user_id)]) {
    const time =
      fData[String(item?.user_id)][fData[String(item?.user_id)]?.length - 1]
        ?.reading_time;
    if (time === undefined) {
      return "--";
    } else {
      return `${time}`;
    }
  } else {
    return "--";
  }
};
const loadColorCode = (data: { value: any; type: any; }) => {
  let spo2 = data.value;
  let signal_quality = data.type;
  
  //         If the spo2 < 90 #E51414
  //  If the spo2 between 90 and 94 #F7B500
  //  If the spo2 greater than 94 #56E4D7
  // If the device signals are bad, it’s #808080
  if (!spo2 || spo2 === "--" || signal_quality ==="bad") {
      return {
          color: "#808080"
      }
  }

  if (spo2 < 90) {
      return ({
          color: "#E51414"
      })
  } else if (spo2 <= 94) {
      return ({
          color: "#F7B500"
      })
  } else if (spo2 > 94) {

      return ({
          color: "#56E4D7"
      })
  } else {
      return ({
          color: "#808080"
      })
  }
}

const getSpo2Value = (fData: Record<string, any[]>,item: { user_id: any; })=>{
  let data = {
      value:'',
      type:''
  }
  
  if(fData[String(item?.user_id)]){
      

      let lastElement = fData[String(item?.user_id)][
                  fData[String(item?.user_id)]?.length - 1
                ];
                if(lastElement?.spo2 && lastElement?.signal_quality){
                  // return lastElement.spo2;
                  data.value = lastElement.spo2;
                  data.type = 'ok'
                }else if (!lastElement?.signal_quality && lastElement?.spo2 && lastElement?.spo2 > 80 ){
                  // return lastElement.spo2;
                  data.value = lastElement.spo2;
                  data.type = 'bad'
                }
                else{
                  data.value = '--';
                  data.type = 'bad'
                }
                return data;
  }else{
      return {
          value:'--',
          type:'bad'
      }
  }
//     return fData[String(item?.user_id)][
//         fData[String(item?.user_id)]?.length - 1
//       ]?.spo2
//         ? fData[String(item?.user_id)][
//             fData[String(item?.user_id)]?.length - 1
//           ]?.spo2
//         : "-"
}

export {
  decodeJWT,
  getTimeZone,
  getDefaultHeaders,
  getDefaultHeaders2,
  getSpo2Value,
  loadColorCode,
  getLastActiveTime,
};
