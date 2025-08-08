// Datei: components/profile/ProfileCompletionModal.tsx

'use client';

import getApolloClient from '@/lib/apolloClient';
import { useMutation } from '@apollo/client';
import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { UPDATE_CUSTOMER } from '../../../graphql/customer/mutation/update';
import { UPDATE_MY_PROFILE } from '../../../graphql/profile/query/profile';

const steps = [
  'Persönliche Daten',
  'Profilinformationen',
  'Social Media & Interessen',
];

export default function ProfileCompletionModal({
  open,
  onClose,
  profileData,
  userData,
}: {
  open: boolean;
  onClose: () => void;
  profileData: any;
  userData: any;
}) {
  const { data: session } = useSession();
  const client = getApolloClient(session?.access_token);

  const userId = session?.user?.id;
  const profileId = session?.user?.profileId;

  const [updatePerson] = useMutation(UPDATE_CUSTOMER, { client });

  const [updateProfile] = useMutation(UPDATE_MY_PROFILE, { client });

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    headline: '',
    location: '',
    interests: '',
    linkedIn: '',
    twitter: '',
    github: '',
    instagram: '',
  });

  useEffect(() => {
    if (userData?.getPersonById) {
      const p = userData.getPersonById;
      setFormData((prev) => ({
        ...prev,
        firstName: p.firstName,
        lastName: p.lastName,
        phoneNumber: p.phoneNumber,
      }));
    }

    if (profileData?.getProfileById) {
      const p = profileData.getProfileById;

      if (p.info?.socialLinks) {
        const linksMap = Object.fromEntries(
          p.info.socialLinks.map((l: { type: string; link: string }) => [
            l.type,
            l.link,
          ]),
        );

        setFormData((prev) => ({
          ...prev,
          linkedIn: linksMap.linkedin || '',
          twitter: linksMap.twitter || '',
          github: linksMap.github || '',
          instagram: linksMap.instagram || '',
        }));
      }

      setFormData((prev) => ({
        ...prev,
        headline: p.info?.headline || '',
        location: p.info?.location || '',
        interests: p.info?.interests || '',
      }));
    }
  }, [userData, profileData]);

  const handleNext = async () => {
    if (activeStep === 0) {
      await updatePerson({
        variables: {
          id: userId,
          input: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phoneNumber,
          },
        },
      });
    } else if (activeStep === 1 || activeStep === 2) {
      await updateProfile({
        variables: {
          id: profileId,
          input: {
            info: {
              headline: formData.headline,
              location: formData.location,
              interests: formData.interests.split(',').map((i) => i.trim()),
            },
            socialLinks: [
              { type: 'linkedin', link: formData.linkedIn },
              { type: 'twitter', link: formData.twitter },
              { type: 'github', link: formData.github },
              { type: 'instagram', link: formData.instagram },
            ].filter((l) => !!l.link),
          },
        },
      });
    }
    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
    else onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              label="Vorname"
              fullWidth
              margin="normal"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
            />
            <TextField
              label="Nachname"
              fullWidth
              margin="normal"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
            />
            <TextField
              label="Telefon"
              fullWidth
              margin="normal"
              value={formData.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
            />
          </>
        );
      case 1:
        return (
          <>
            <TextField
              label="Beruflicher Titel"
              fullWidth
              margin="normal"
              value={formData.headline}
              onChange={(e) => handleChange('headline', e.target.value)}
            />
            <TextField
              label="Ort"
              fullWidth
              margin="normal"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
            />
            <TextField
              label="Interessen"
              fullWidth
              margin="normal"
              value={formData.interests}
              onChange={(e) => handleChange('interests', e.target.value)}
            />
          </>
        );
      case 2:
        return (
          <>
            <TextField
              label="LinkedIn"
              fullWidth
              margin="normal"
              value={formData.linkedIn}
              onChange={(e) => handleChange('linkedIn', e.target.value)}
            />
            <TextField
              label="Twitter"
              fullWidth
              margin="normal"
              value={formData.twitter}
              onChange={(e) => handleChange('twitter', e.target.value)}
            />
            <TextField
              label="GitHub"
              fullWidth
              margin="normal"
              value={formData.github}
              onChange={(e) => handleChange('github', e.target.value)}
            />
            <TextField
              label="Instagram"
              fullWidth
              margin="normal"
              value={formData.instagram}
              onChange={(e) => handleChange('instagram', e.target.value)}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        Profil vervollständigen
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        {renderStepContent(activeStep)}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleNext} variant="contained">
          {activeStep === steps.length - 1 ? 'Fertigstellen' : 'Weiter'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
