import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { getSpo2Value, loadColorCode } from '@/lib/util';

interface SingleVitalProps {
  fData: Record<string, any[]>;
  item: any;
  Icon: any;
  title: string;
  subTitle?: string;
  field: string;
}

export function SingleVital({
  fData,
  item,
  Icon,
  title,
  subTitle,
  field,
}: SingleVitalProps) {
  const lastUserData = fData[String(item.user_id)]?.at(-1);

  const value = title === 'Oxygen'
    ? getSpo2Value(fData, item).value
    : lastUserData?.[field] ?? '-';

  const colorStyle: React.CSSProperties =
    title === 'Oxygen' ? loadColorCode(getSpo2Value(fData, item)) : {};

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '12px',
        paddingBottom: '20px',
      }}
    >

      <Typography
        fontWeight={600}
        fontSize="14px"
        color="#6E6E6E"
        sx={{ mb: '15px' }}
      >
        {title}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '15px'}} >
        <Image src={Icon} alt={title} width={24} height={24} />
        <Typography
          fontSize="16px"
          fontWeight={500}
          style={colorStyle}
        >
          {value}
        </Typography>
        {subTitle && (
          <Typography
            fontSize="14px"
            fontWeight={400}
            color="#8C8C8C"
          >
            {subTitle}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
