import { useState, useEffect } from "react";
import { Checkbox, styled } from "@mui/material";

const CustomColorCheckbox = styled(Checkbox)({
  color: "#23AFC4",
  "&.Mui-checked": {
    color: "#23AFC4",
  },
});

interface Props {
  members: string[];
  item: { user_id: string };
  setUserValue: React.Dispatch<React.SetStateAction<string[]>>;
  setCheckedSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function RenderCheckBox({
  members,
  item,
  setUserValue,
  setCheckedSelected,
}: Props) {
  const { user_id } = item;
  const [checked, setChecked] = useState(members.includes(user_id));

  useEffect(() => {
    setChecked(members.includes(user_id));
  }, [members, user_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);

    setUserValue((prev) =>
      isChecked ? [...prev, user_id] : prev.filter((id) => id !== user_id),
    );
    setCheckedSelected([user_id]);
  };

  return (
    <CustomColorCheckbox
      checked={checked}
      sx={{ transform: "scale(0.7)" }}
      onChange={handleChange}
    />
  );
}
