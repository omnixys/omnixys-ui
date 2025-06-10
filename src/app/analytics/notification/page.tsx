// app/analytics/notification/page.tsx

"use client";

import { useQuery } from "@apollo/client";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Button,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import DownloadIcon from "@mui/icons-material/Download";
import { useSession } from "next-auth/react";
import getApolloClient from "../../../lib/apolloClient";
import { NotificationTemplateType } from "../../../types/notification/template.type";
import { GET_NOTIFICATION_TEMPLATES } from "../../../graphql/notification/query/templates";

export default function NotificationAnalyticsPage() {
  const { data: session } = useSession();
  const client = getApolloClient(session?.access_token);
  const { data, loading } = useQuery(GET_NOTIFICATION_TEMPLATES, { client });
  const templates: NotificationTemplateType[] = data?.getAllTemplates || [];
  const theme = useTheme();

  const handleExport = () => {
    window.open("/export/notifications/templates.xlsx", "_blank");
  };

  return (
    <Box p={4} bgcolor={theme.palette.background.default}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          color={theme.palette.primary.main}
        >
          Benachrichtigungen
        </Typography>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleExport}
        >
          Exportieren
        </Button>
      </Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {templates.map((template) => (
            <Grid sx={{ xs: 12, md: 6, lg: 4 }} key={template.id}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color={theme.palette.text.primary}
                    >
                      {template.subject}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Typ: {template.type} — Format:{" "}
                      {template.isHtml ? "HTML" : "Text"}
                    </Typography>
                    <Box mt={2}>
                      <Chip
                        label={`Platzhalter: ${template.placeholders.length}`}
                        color="secondary"
                      />
                      <Chip label={`Name: ${template.name}`} sx={{ ml: 1 }} />
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

// ("use client");

// import { useQuery } from "@apollo/client";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Chip,
//   CircularProgress,
//   Button,
//   useTheme,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import DownloadIcon from "@mui/icons-material/Download";
// import { useSession } from "next-auth/react";
// import getApolloClient from "../../../lib/apolloClient";
// import { GET_NOTIFICATION_TEMPLATES } from "../../../graphql/notification/query/templates";
// import { NotificationTemplateType } from "../../../types/notification/template.type";

// export default function NotificationAnalyticsPage() {
//   const { data: session } = useSession();
//   const client = getApolloClient(session?.access_token);
//   const { data, loading } = useQuery(GET_NOTIFICATION_TEMPLATES, { client });
//   const templates: NotificationTemplateType[] =
//     data?.notificationTemplates || [];
//   const theme = useTheme();

//   const handleExport = () => {
//     window.open("/export/notifications/templates.xlsx", "_blank");
//   };

//   return (
//     <Box p={4} bgcolor={theme.palette.background.default}>
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Typography
//           variant="h4"
//           fontWeight="bold"
//           gutterBottom
//           color={theme.palette.primary.main}
//         >
//           Benachrichtigungen
//         </Typography>
//         <Button
//           variant="contained"
//           startIcon={<DownloadIcon />}
//           onClick={handleExport}
//         >
//           Exportieren
//         </Button>
//       </Box>
//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <Grid container spacing={3}>
//           {templates.map((template) => (
//             <Grid sx={{ xs: 12, md: 6, lg: 4 }} key={template.id}>
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
//                   <CardContent>
//                     <Typography
//                       variant="h6"
//                       fontWeight="bold"
//                       color={theme.palette.text.primary}
//                     >
//                       {template.subject}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Kategorie: {template.category} — Sprache:{" "}
//                       {template.language}
//                     </Typography>
//                     <Box mt={2}>
//                       <Chip
//                         label={`Platzhalter: ${template.placeholderCount}`}
//                         color="secondary"
//                       />
//                       <Chip
//                         label={`Status: ${template.active ? "Aktiv" : "Inaktiv"}`}
//                         sx={{ ml: 1 }}
//                         color={template.active ? "success" : "default"}
//                       />
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// }
