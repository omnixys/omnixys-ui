// app/users/page.tsx (oder entsprechender Pfad)
import type { User } from "./columns";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Box, Paper, Typography } from "@mui/material";

const getData = async (): Promise<User[]> => {
  return [
    { id: "728ed521", avatar: "/shop3/admin/users/1.png",  status: "active",   fullName: "John Doe",           email: "johndoe@gmail.com" },
    { id: "728ed522", avatar: "/shop3/admin/users/2.png",  status: "active",   fullName: "Jane Doe",           email: "janedoe@gmail.com" },
    { id: "728ed523", avatar: "/shop3/admin/users/3.png",  status: "inactive", fullName: "Mike Galloway",      email: "mikegalloway@gmail.com" },
    { id: "728ed524", avatar: "/shop3/admin/users/4.png",  status: "inactive", fullName: "Minerva Robinson",   email: "minerbarobinson@gmail.com" },
    { id: "728ed525", avatar: "/shop3/admin/users/5.png",  status: "active",   fullName: "Mable Clayton",      email: "mableclayton@gmail.com" },
    { id: "728ed526", avatar: "/shop3/admin/users/6.png",  status: "active",   fullName: "Nathan McDaniel",    email: "nathanmcdaniel@gmail.com" },
    { id: "728ed527", avatar: "/shop3/admin/users/7.png",  status: "active",   fullName: "Myrtie Lamb",        email: "myrtielamb@gmail.com" },
    { id: "728ed528", avatar: "/shop3/admin/users/8.png",  status: "active",   fullName: "Leona Bryant",       email: "leonabryant@gmail.com" },
    { id: "728ed529", avatar: "/shop3/admin/users/9.png",  status: "inactive", fullName: "Aaron Willis",       email: "aaronwillis@gmail.com" },
    { id: "728ed52a", avatar: "/shop3/admin/users/10.png", status: "active",   fullName: "Joel Keller",        email: "joelkeller@gmail.com" },
    { id: "728ed52b", avatar: "/shop3/admin/users/11.png", status: "active",   fullName: "Daniel Ellis",       email: "danielellis@gmail.com" },
    { id: "728ed52c", avatar: "/shop3/admin/users/12.png", status: "active",   fullName: "Gordon Kennedy",     email: "gordonkennedy@gmail.com" },
    { id: "728ed52d", avatar: "/shop3/admin/users/13.png", status: "inactive", fullName: "Emily Hoffman",      email: "emilyhoffman@gmail.com" },
    { id: "728ed52e", avatar: "/shop3/admin/users/14.png", status: "active",   fullName: "Jeffery Garrett",    email: "jefferygarrett@gmail.com" },
    { id: "728ed52f", avatar: "/shop3/admin/users/15.png", status: "active",   fullName: "Ralph Baker",        email: "ralphbaker@gmail.com" },
    { id: "728ed52g", avatar: "/shop3/admin/users/16.png", status: "inactive", fullName: "Seth Fields",        email: "sethfields@gmail.com" },
    { id: "728ed52h", avatar: "/shop3/admin/users/17.png", status: "active",   fullName: "Julia Webb",         email: "juliawebb@gmail.com" },
    { id: "728ed52i", avatar: "/shop3/admin/users/18.png", status: "active",   fullName: "Gary Banks",         email: "garybanks@gmail.com" },
    { id: "728ed52j", avatar: "/shop3/admin/users/19.png", status: "inactive", fullName: "Flora Chambers",     email: "florachambers@gmail.com" },
    { id: "728ed52k", avatar: "/shop3/admin/users/20.png", status: "active",   fullName: "Steve Hanson",       email: "stevehanson@gmail.com" },
    { id: "728ed52l", avatar: "/shop3/admin/users/21.png", status: "active",   fullName: "Lola Robinson",      email: "lolarobinson@gmail.com" },
    { id: "728ed52m", avatar: "/shop3/admin/users/22.png", status: "active",   fullName: "Ethel Waters",       email: "ethelwaters@gmail.com" },
    { id: "728ed52n", avatar: "/shop3/admin/users/23.png", status: "inactive", fullName: "Grace Edwards",      email: "graceedwards@gmail.com" },
    { id: "728ed52o", avatar: "/shop3/admin/users/24.png", status: "active",   fullName: "Sallie Wong",        email: "salliewong@gmail.com" },
    { id: "728ed52p", avatar: "/shop3/admin/users/25.png", status: "active",   fullName: "Bryan Gutierrez",    email: "bryangutierrez@gmail.com" },
    { id: "728ed52q", avatar: "/shop3/admin/users/26.png", status: "active",   fullName: "Erik Rice",          email: "erikrice@gmail.com" },
    { id: "728ed52r", avatar: "/shop3/admin/users/27.png", status: "active",   fullName: "Jordan Atkins",      email: "jordanatkins@gmail.com" },
    { id: "728ed52s", avatar: "/shop3/admin/users/28.png", status: "inactive", fullName: "Bill Brewer",        email: "billbrewer@gmail.com" },
    { id: "728ed52t", avatar: "/shop3/admin/users/29.png", status: "active",   fullName: "Edwin Morris",       email: "edwinmorris@gmail.com" },
    { id: "728ed52u", avatar: "/shop3/admin/users/30.png", status: "active",   fullName: "Harold Becker",      email: "haroldbecker@gmail.com" },
    { id: "728ed52v", avatar: "/shop3/admin/users/31.png", status: "active",   fullName: "Hannah Rodriguez",   email: "hannahrodriguez@gmail.com" },
    { id: "728ed52w", avatar: "/shop3/admin/users/32.png", status: "active",   fullName: "Zachary Beck",       email: "zacharybeck@gmail.com" },
    { id: "728ed52x", avatar: "/shop3/admin/users/33.png", status: "inactive", fullName: "Frances Potter",     email: "francespotter@gmail.com" },
    { id: "728ed52y", avatar: "/shop3/admin/users/34.png", status: "active",   fullName: "Raymond Murray",     email: "raymondmurray@gmail.com" },
    { id: "728ed52z", avatar: "/shop3/admin/users/35.png", status: "active",   fullName: "Adam Sherman",       email: "adamsherman@gmail.com" },
    { id: "728ed521f",avatar: "/shop3/admin/users/36.png", status: "active",   fullName: "Anne Cruz",          email: "annecruz@gmail.com" },
  ];
};

export default async function UsersPage() {
  const data = await getData();

  return (
    <Box sx={{ width: "100%" }}>
      <Paper variant="outlined" sx={{ mb: 3, px: 2, py: 1.5, borderRadius: 2, bgcolor: "background.paper" }}>
        <Typography variant="h6" fontWeight={600}>
          All Users
        </Typography>
      </Paper>

      <DataTable columns={columns} data={data} />
    </Box>
  );
}
