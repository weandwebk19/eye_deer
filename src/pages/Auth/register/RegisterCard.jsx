import { useState } from "react";

import {
  Paper,
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";

const RegisterCard = ({ cardItem }) => {
  return (
    <Paper elevation={6}>
      <Card className={`role-card--${cardItem.name}`}>
        <CardActionArea>
          <div className="role-card__header">
            <Typography variant="h5">{`${
              cardItem.name
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
