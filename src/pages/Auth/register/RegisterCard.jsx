import {
  StyledCard,
  StyledCardActionArea,
  StyledCardContent,
} from "../../../components/Card/StyledCard";

import { StyledHeadingTypography } from "../../../components/Typography/StyledTypography";

const RegisterCard = ({ cardItem }) => {
  return (
    <StyledCard
      className={`role-card role-card--${cardItem.name} workplace-card workplace-card--${cardItem.id}`}
      variant="default"
    >
      <StyledCardActionArea>
        <div className="role-card__content">
          <StyledCardContent sx={{ flexGrow: 1 }}>
            <svg viewBox="0 0 198 198" xmlns="http://www.w3.org/2000/svg">
              <filter id="noiseFilter">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="8.11"
                  numOctaves="1"
                  stitchTiles="stitch"
                />
              </filter>

              <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
          </StyledCardContent>
          <StyledHeadingTypography
            variant="h5"
            className="role-card__card-title"
            sx={{ lineHeight: 1 }}
          >
            {`${cardItem.name}.`}
          </StyledHeadingTypography>
        </div>
      </StyledCardActionArea>
    </StyledCard>
  );
};

export default RegisterCard;
