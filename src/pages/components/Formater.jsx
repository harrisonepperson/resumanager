import { Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import classes from './Formater.module.scss';

export const Formater = ({ customStyles, setCustomStyles }) => {
  const [fontUrl, setFontUrl] = useState(customStyles.fontUrl);
  const [sectionGap, setSectionGap] = useState(
    customStyles.sectionGap.split('rem').shift()
  );
  const [padding, setPadding] = useState(
    customStyles.padding.split('in').shift()
  );
  const [fontSize, setFontSize] = useState(
    customStyles.fontSize.split('pt').shift()
  );

  useEffect(() => {
    setCustomStyles((current) => ({
      ...current,
      fontSize: `${fontSize}pt`,
      padding: `${padding}in`,
      sectionGap: `${sectionGap}rem`,
    }));
  }, [setCustomStyles, sectionGap, padding, fontSize]);

  return (
    <div className={classes.format}>
      <div>
        <Typography component='body1'>
          I can fetch a font directly from google! All I need is the url!
        </Typography>
        <TextField
          fullWidth
          label='Google font URL'
          onChange={(e) => setFontUrl(e.target.value)}
          value={fontUrl}
        />
        <Button
          onClick={() => {
            setCustomStyles((current) => ({
              ...current,
              fontUrl: fontUrl,
            }));
          }}
          variant='contained'
        >
          Fetch Font
        </Button>
      </div>
      <div>
        <Typography component='body1'>
          How big the nominal font size should be. Measured in points (a "point"
          is 1/72 of an "inch").
        </Typography>
        <TextField
          fullWidth
          label='Font Size'
          onChange={(e) => setFontSize(e.target.value)}
          value={fontSize}
        />
      </div>
      <div>
        <Typography component='body1'>
          How much space to put between sections (like your bio and your
          summary). Measured in multiples of your line height.
        </Typography>
        <TextField
          fullWidth
          label='Section Gap'
          onChange={(e) => setSectionGap(e.target.value)}
          value={sectionGap}
        />
      </div>
      <div>
        <Typography component='body1'>
          How much space to put around the boundary of the page. Measured in
          inches (an "inch" is defined as 96px, not an actual imperial inch).
        </Typography>
        <TextField
          fullWidth
          label='Padding'
          onChange={(e) => setPadding(e.target.value || 0.5)}
          value={padding}
        />
      </div>
    </div>
  );
};
