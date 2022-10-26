import { useState } from "react";

import {
  Paper,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";

const RegisterCard = ({ role }) => {
  const [userRole, setUserRole] = useState(role);

  return (
    <Paper elevation={6}>
      <Card
        sx={{ maxWidth: 200 }}
        className={`role-card--${role === 0 ? "teacher" : "student"}`}
      >
        <CardActionArea>
          <div className="role-card__header">
            <Typography variant="h5">{`${
              role === 0 ? "teacher" : "student"
            }`}</Typography>
          </div>
          <div className="role-card__content">
            <CardContent>
              Nửa chỗ này có hình!
              <br /> Đợi xíu đang design...
            </CardContent>
          </div>
        </CardActionArea>
      </Card>
    </Paper>
  );
};

export default RegisterCard;
