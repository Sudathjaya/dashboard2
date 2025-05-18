import React, { useEffect, useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/navigation';
import Jsonpack from 'jsonpack';
import { Box, Button, Typography } from '@mui/material';
import AddPrivateNote from './AddPrivateNote';
import { SingleVital } from './SingleVital';
import Image from 'next/image';
import { TEXTS } from '@/public/const';
import { useSession } from 'next-auth/react';
import { getTeamData } from '@/services/dashboardService';
import { getTeamDashboard } from '@/services/userService';
import Chart from '@/components/ui/Chart';
import { useAuth } from '@/context/AuthContext';

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
  },
  box: {
    display: "flex",
    width: "30%",
    alignItems: "center",
  },
  boxButton: {
    display: "flex",
    alignItems: "center",
  },
  header: {
    width: "80%",
    borderRadius: "1rem 1rem 0rem 0rem",
    marginTop: "1.6rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  tab: {
    width: "80%",
    marginTop: "1rem",
  },
  breadcrumbs: {
    fontFamily: "'Poppins', sans-serif",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "1.25rem",
    lineHeight: "1.87rem",
    color: "#777a7b",
  },
  inside: {
    width: "95.69%",
    marginTop: "2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inside2: {
    width: "95.69%",
    marginTop: "4rem",
    // border: "1px solid green",
  },
  item2: {
    width: "20%",
  },
  item3: {
    width: "80%",
  },
  item4: {
    // width: "50%",
  },
  searchButton: {
    width: "6.25rem",
    border: "2px solid #23AFC4",
    borderRadius: "0.3rem",
    height: "2rem",
    background: "white",
    margin: "5px",
    color: "#23AFC4",
    textAlign: "center",
    fontSize: "0.87rem",
    fontFamily: "'Poppins', sans-serif",
    fontStyle: "normal",
    fontWeight: 500,
    cursor: "pointer",
  },
  takeNotesButton: {
    width: "6.25rem",
    border: "none",
    borderRadius: "0.3rem",
    height: "2rem",
    background: "#23AFC4",
    margin: "5px",
    color: "white",
    textAlign: "center",
    fontSize: "0.87rem",
    fontFamily: "'Poppins', sans-serif",
    fontStyle: "normal",
    fontWeight: 500,
    cursor: "pointer",
  },
  tdText: {
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "1.375rem",
    color: "rgba(0, 0, 0, 0.85)",
    margin: 0,
  },
  container2: {
    width: "80%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  container3: {
    width: "80%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: "0rem 0rem 1rem 1rem",
  },
  headerText: {
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "1.27rem",
    lineHeight: "1.87rem",
    color: "rgba(0, 0, 0, 0.85)",
  },
  divText: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "1.06rem",
    lineHeight: "1.62rem",
    color: "#88909b",
  },
  box2: {
    width: "200px",
    maxWidth: "200px",
    // border: "1px solid #f7b500",
    // marginTop: "1.78rem",
  },
  box3: {
    display: "flex",
    alignItems: "center",
    marginTop: "1rem",
  },
  number: {
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "1.31rem",
    lineHeight: "2rem",
    color: "#f7b500",
    padding: "0px 8px",
  },
  number2: {
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "1.31rem",
    lineHeight: "2rem",
    color: "rgba(0, 0, 0, 0.85)",
    padding: "0px 8px",
  },
  boxNew: {
    // display: "flex",
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '32px 40px'
  },
  tittleText: {
    textAlign: "right",
    marginTop: "0.5rem",
    marginBottom: "1.5rem",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "0.81rem",
    lineHeight: "1.25rem",
    color: "rgba(0, 0, 0, 0.5)",
  },
};

type VitalData = Record<string, any[]>;

export default function ViewUser() {
  const router = useRouter();
  const [members, setMembers] = useState<any>({});
  const [users, setUser] = useState<any[]>([]);
  const [fData, setFData] = useState<VitalData>({});
  const [fromDate, setFromDate] = useState('');
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const { selectedUser } = useAuth();

  const direct = () => router.push('/dashboard');

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    router.push('/dashboard');
  };

  const loadData = async () => {
    if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
      const { data } = await getTeamDashboard(session.user.accessToken);
      setMembers(data.data);
      const userIds = data.data.map((u: any) => u.user_id);
      setUser(userIds);
      getData(userIds);
    }
  };

  const getData = async (userIds: number[]) => {
    if (userIds.length === 0) return;

    const payload = {
      only_updates: fromDate !== '',
      user_ids: userIds,
      ...(fromDate && { from_time: fromDate }),
    };

    if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
      const { data } = await getTeamData(session.user.accessToken, payload);
      const json = Jsonpack.unpack(data.data);
      setFData(json);

      const results = Object.entries(json)
        .map(([_, val]: any) => {
          if (val.length) {
            const last = val[val.length - 1];
            return last?.reading_time ? new Date(last.reading_time) : null;
          }
          return null;
        })
        .filter((d): d is Date => d !== null);

      if (results.length) {
        const dateVal = payload.only_updates
          ? new Date(Math.min(...results.map((d) => d.getTime())))
          : new Date(Math.max(...results.map((d) => d.getTime())));
        setFromDate(dateVal.toString());
      }
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      if (users.length > 0) {
        getData(users);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [users]);

  if (Object.keys(fData).length === 0) {
    return <Typography>Please wait...</Typography>;
  }

  const breadcrumbs = [
    <Typography key="dashboard" onClick={handleClick} sx={styles.breadcrumbs}>
      Dashboard
    </Typography>,
    <Typography key="name" sx={styles.breadcrumbs}>
      {selectedUser?.first_name || 'User'} {selectedUser?.last_name || ''}
    </Typography>,
  ];

  return (
    <Box>
      <AddPrivateNote setOpen={setOpen} open={open} players_id={selectedUser?.user_id} />

      <Box sx={styles.container}>
        <Box sx={styles.tab}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Box>
      </Box>

      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Box sx={styles.inside}>
            <Box sx={styles.box}>
              <Box sx={styles.item2}>
                <Avatar
                  alt="Profile"
                  src={selectedUser?.avatar_url || '/images/images.jpg'}
                  sx={{ width: 46, height: 46 }}
                />
              </Box>
              <Box sx={styles.item3}>
                <Typography sx={styles.tdText}>
                  {selectedUser?.first_name}&nbsp;{selectedUser?.last_name}
                </Typography>
              </Box>
            </Box>
            <Box sx={styles.item4}>
              <Button
                variant="outlined"
                onClick={direct}
                sx={styles.searchButton}
              >
                Back
              </Button>
  
              <Button
                fullWidth
                size="large"
                style={{
                  fontSize: '0.8rem',
                  lineHeight: '1rem',
                  fontFamily: 'Poppins',
                  fontWeight: 300,
                  fontStyle: 'normal',
                  width: 120,
                  height: 32,
                  backgroundColor: '#0F9BB0',
                  color: 'white',
                  textTransform: 'none',
                }}
                startIcon={
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Image
                      src="/images/svg/editIcon_TakeNote.svg"
                      alt="Take Note Icon"
                      width={20}
                      height={20}
                    />
                  </Box>
                }
                onClick={() => setOpen(true)}
              >
                Take notes
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Health */ }
  <Box sx={styles.container}>
    <Box sx={styles.container2}>
      <Box sx={styles.inside2}>
        <Typography sx={[styles.tdText , {marginBottom: '20px'}]}>Health</Typography>
        <Box sx={styles.boxNew}>
          <SingleVital fData={fData} item={selectedUser} Icon="/images/svg/Path.svg" title="Oxygen" subTitle="SPO₂" field="spo2" />
          <SingleVital fData={fData} item={selectedUser} Icon="/images/svg/heart.svg" title="Pulse Rate" subTitle="bpm" field="heart_rate" />
          <SingleVital fData={fData} item={selectedUser} Icon="/images/svg/Vo2.svg" title="SPO₂ Variability" subTitle="mL/s" field="spv" />
          <SingleVital fData={fData} item={selectedUser} Icon="/images/svg/perfusion.svg" title="Perfusion Index" subTitle="%" field="pi" />
          <SingleVital fData={fData} item={selectedUser} Icon="/images/svg/HRV.svg" title="PRV" subTitle="ms" field="hrv" />
        </Box>
        <Box sx={styles.boxNew}>
          <SingleVital fData={fData} item={selectedUser} Icon="/images/svg/hrr.svg" title="PRR" subTitle="%" field="hrr" />
        </Box>
      </Box>
    </Box>
  </Box>

  {/* Environment */ }
  <Box sx={styles.container}>
    <Box sx={styles.container2}>
      <Box sx={styles.inside2}>
        <Typography sx={[styles.tdText , {marginBottom: '20px'}]}>Environment</Typography>
        <Box sx={styles.boxNew}>
          <SingleVital fData={fData} item={selectedUser} Icon="/images/svg/temprature.svg" title="Temperature" subTitle="°F" field="temp" />
          <SingleVital fData={fData} item={selectedUser} Icon="/images/svg/Path3.svg" title="Altitude" subTitle="feet" field="altitude" />
          <SingleVital fData={fData} item={selectedUser} Icon="/images/svg/Path4.svg" title="Air Quality Index" subTitle="moderate" field="air_quality" />
          <SingleVital fData={fData} item={selectedUser} Icon="/images/svg/path5.svg" title="Humidity" subTitle="%" field="humidity" />
          <SingleVital fData={fData} item={selectedUser} Icon="/images/svg/path6.svg" title="Barometric Pressure" subTitle="in. HG" field="biometric_pressure" />
        </Box>
      </Box>
    </Box>
  </Box>

  {/* Live Reading */ }
  <Box sx={styles.container}>
    <Box sx={styles.container3}>
      <Box sx={styles.inside2}>
        <Typography sx={[styles.tdText , {marginBottom: '20px'}]}>Live Reading</Typography>
        <Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Box style={{ borderBottom: '3px solid #A6CEE3', width: '1.5rem', marginRight: '5px' }}></Box>
          <Typography sx={styles.tittleText}>SpO2 (%)</Typography>
          <Box style={{ borderBottom: '3px dashed #1F78B4', width: '1.5rem', marginRight: '5px', marginLeft: '2rem' }}></Box>
          <Typography sx={styles.tittleText}>Pulse Rate (bpm)</Typography>
        </Box>
        <Chart fData={fData?.[String(selectedUser?.user_id)] || []} height={200} />
      </Box>
    </Box>
  </Box>
</Box>
  );
}
