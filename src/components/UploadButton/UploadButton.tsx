import { Button, FormLabel, styled, TextField } from '@mui/material';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { uploadBytes, ref, getDownloadURL, deleteObject } from 'firebase/storage';

const CustomButton = styled(Button)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadLabel = styled(FormLabel)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
  color: inherit;
`;

interface UploadButtonProps {
  getFileUrl: (fileUrl: string) => void;
}

const UploadButton = ({ getFileUrl }: UploadButtonProps) => {
  const { storage } = useContext(FirebaseContext);

  const [lastFileName, setLastFileName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState('');

  const handleUploadFile = async () => {
    if (file) {
      if (lastFileName) {
        await deleteObject(ref(storage, lastFileName));
      }
      const fileName = file.name + '_' + Date.now().toString();

      await uploadBytes(ref(storage, fileName), file);

      const url = await getDownloadURL(ref(storage, fileName));

      setLastFileName(fileName);
      setFileUrl(url);
    }
  };

  useEffect(() => {
    handleUploadFile();
  }, [file]);

  useEffect(() => {
    if (fileUrl) {
      getFileUrl(fileUrl);
    }
  }, [fileUrl]);

  return (
    <CustomButton variant="contained" startIcon={<UploadIcon />}>
      Upload
      <UploadLabel>
        <TextField
          type="file"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files![0])}
          sx={{ display: 'none' }}
        />
      </UploadLabel>
    </CustomButton>
  );
};

export default UploadButton;
