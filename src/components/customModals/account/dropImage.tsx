import type React from "react";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { uploadImage } from "@/services/notificationService";
import { useSession } from "next-auth/react";
import { TEXTS } from "@/public/const";
import { Box } from "@mui/material";

// Define props type with TypeScript
interface DropFileInputProps {
  onFileChange: (filePath: string | null) => void;
}

const DropFileInput = ({ onFileChange }: DropFileInputProps) => {
  const { data: session, status } = useSession();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [fileList, setFileList] = useState<string | null>(null);

  const onDragEnter = () => wrapperRef.current?.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current?.classList.remove("dragover");
  const onDrop = () => wrapperRef.current?.classList.remove("dragover");

  const onFileDrop = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      const image = files[0];
      const formData = new FormData();
      formData.append("image", image);

      try {
        const { data } = await uploadImage(session.user.accessToken, formData);
        setFileList(data?.imagePath);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  useEffect(() => {
    onFileChange(fileList);
  }, [fileList]);

  return (
    <Box
      ref={wrapperRef}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      sx={{
        position: "relative",
        width: "30px",
        height: "30px",
        border: "2px dashed var(--border-color)",
        borderRadius: "20px",
        marginLeft: "80px",
        marginTop: "-20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--input-bg)",
        "& input": {
          opacity: 0,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          cursor: "pointer",
        },
        "&.dragover": {
          opacity: 0.6,
        },
      }}
    >
      <Image
        src="/images/svg/Vector_Edit.svg"
        alt="Vector_Edit"
        width={16}
        height={16}
      />
      <input
        type="file"
        accept="image/*"
        onChange={onFileDrop}
        aria-label="Upload image"
      />
    </Box>
  );
};

export default DropFileInput;
