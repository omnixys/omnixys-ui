import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { Carousel } from 'antd';
import { ContactPerson } from '../../../types/person/contact.type';

const generateAvatarInitials = (name: string = '') =>
  name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'U';

// 🔑 sicheres Extrahieren der ID
const getContactKey = (id: ContactPerson['_id']): string =>
  typeof id === 'string' ? id : id?.$binary?.base64 || 'unknown-id';

export default function ContactCarousel({
  contacts,
}: {
  contacts: ContactPerson[];
}) {
  if (!contacts?.length) {
    return (
      <Typography variant="body2" sx={{ mt: 1 }}>
        Keine Kontaktpersonen hinterlegt.
      </Typography>
    );
  }

  return (
    <Carousel
      arrows
      autoplay
      autoplaySpeed={3000}
      dotPosition="bottom"
      infinite
      slidesToShow={Math.min(4, contacts.length)}
      slidesToScroll={1}
      responsive={[
        { breakpoint: 1024, settings: { slidesToShow: 4 } },
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        { breakpoint: 480, settings: { slidesToShow: 1 } },
      ]}
    >
      {contacts.map((contact) => (
        <div key={getContactKey(contact._id)}>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ borderRadius: 3, boxShadow: 3, maxWidth: 250 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: '#4E3792', color: '#fff' }}>
                    {generateAvatarInitials(
                      `${contact.firstName} ${contact.lastName}`,
                    )}
                  </Avatar>
                }
                title={
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 'bold', color: '#4E3792' }}
                  >
                    {contact.firstName} {contact.lastName}
                  </Typography>
                }
                subheader={
                  contact.relationship
                    ? `Beziehung: ${contact.relationship}`
                    : ''
                }
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  Start:{' '}
                  {contact.startDate
                    ? new Date(contact.startDate).toLocaleDateString()
                    : 'Nicht angegeben'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Ende:{' '}
                  {contact.endDate
                    ? new Date(contact.endDate).toLocaleDateString()
                    : 'Nicht angegeben'}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </div>
      ))}
    </Carousel>
  );
}
