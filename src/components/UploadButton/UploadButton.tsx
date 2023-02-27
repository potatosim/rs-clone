import { Box, Button, FormLabel, styled, TextField } from '@mui/material';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { uploadBytes, ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { ButtonTranslationKeys, TranslationNameSpaces } from 'enum/Translations';
import { useTranslation } from 'react-i18next';

const CustomButton = styled(Button)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CustomWrapper = styled(Box)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
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
  children?: React.ReactElement;
}

const UploadButton = ({ getFileUrl, children }: UploadButtonProps) => {
  const { storage } = useContext(FirebaseContext);

  const [lastFileName, setLastFileName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState('');

  const { t: translate } = useTranslation(TranslationNameSpaces.Buttons);

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

  if (children) {
    return (
      <CustomWrapper>
        <UploadLabel>
          <TextField
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files![0])}
            sx={{ display: 'none' }}
          />
          {children}
        </UploadLabel>
      </CustomWrapper>
    );
  }

  return (
    <CustomButton color="secondary" variant="contained" startIcon={<UploadIcon />}>
      {translate(ButtonTranslationKeys.Upload)}
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
