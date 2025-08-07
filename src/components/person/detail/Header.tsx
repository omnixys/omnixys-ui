import { Avatar, Box, Typography } from '@mui/material';

interface HeaderProps {
  customer: {
    firstName: string;
    lastName: string;
    username: string;
  };
}

const generateAvatarInitials = (name: string = '') =>
  name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'U';

export default function Header({ customer }: HeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 4,
        p: 3,
        borderRadius: 2,
        background: 'linear-gradient(135deg, #6A4BBC 0%, #4E3792 100%)',
        color: '#fff',
      }}
    >
      <Avatar
        sx={{
          width: 80,
          height: 80,
          bgcolor: '#fff',
          color: '#4E3792',
          mr: 3,
          fontSize: '2rem',
        }}
      >
        {generateAvatarInitials(`${customer.firstName} ${customer.lastName}`)}
      </Avatar>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {customer.firstName} {customer.lastName}
        </Typography>
        <Typography variant="subtitle1">{customer.username}</Typography>
      </Box>
    </Box>
  );
}
