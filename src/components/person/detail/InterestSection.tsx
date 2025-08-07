import {
  Business,
  CorporateFare,
  Home,
  Savings,
  School,
  TravelExplore,
  VerifiedUser,
} from '@mui/icons-material';
import { Chip, Grid, Typography } from '@mui/material';
import { JSX } from 'react';
import type { Interest } from '../../../types/person/enums';

const interestsMapping: Record<
  Interest,
  {
    label: string;
    icon: JSX.Element;
    color: 'success' | 'warning' | 'error' | 'info' | 'primary' | 'secondary';
  }
> = {
  INVESTMENTS: { label: 'Investitionen', icon: <Savings />, color: 'success' },
  SAVING_AND_FINANCE: {
    label: 'Sparen & Finanzen',
    icon: <CorporateFare />,
    color: 'warning',
  },
  CREDIT_AND_DEBT: {
    label: 'Kredit & Schulden',
    icon: <Business />,
    color: 'error',
  },
  BANK_PRODUCTS_AND_SERVICES: {
    label: 'Bankprodukte',
    icon: <CorporateFare />,
    color: 'info',
  },
  FINANCIAL_EDUCATION_AND_COUNSELING: {
    label: 'Finanzbildung',
    icon: <School />,
    color: 'primary',
  },
  REAL_ESTATE: { label: 'Immobilien', icon: <Home />, color: 'success' },
  INSURANCE: {
    label: 'Versicherungen',
    icon: <VerifiedUser />,
    color: 'secondary',
  },
  SUSTAINABLE_FINANCE: {
    label: 'Nachhaltige Finanzen',
    icon: <TravelExplore />,
    color: 'info',
  },
  TECHNOLOGY_AND_INNOVATION: {
    label: 'Technologie & Innovation',
    icon: <TravelExplore />,
    color: 'warning',
  },
  TRAVEL: { label: 'Reisen', icon: <TravelExplore />, color: 'success' },
};

export default function InterestSection({
  interests,
}: {
  interests: Interest[];
}) {
  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4E3792' }}>
        Interessen
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {interests?.length > 0 ? (
          interests.map((interest) => (
            <Grid key={interest}>
              <Chip
                label={interestsMapping[interest].label}
                icon={interestsMapping[interest].icon}
                color={interestsMapping[interest].color}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Keine Interessen hinterlegt.
          </Typography>
        )}
      </Grid>
    </>
  );
}
