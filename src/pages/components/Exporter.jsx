import { Button, Typography } from '@mui/material';

import { config } from '../../config';
import classes from './Exporter.module.scss';

export const Exporter = ({ customStyles, sections }) => {
  const {
    file: {
      mime,
      type,
      version
    }
  } = config;

  return (
    <div className={classes.export}>
      <Typography component='p'>
        To save your resume print this page and disable scaling, headers, and
        footers. You can also print to a PDF using your browser or Operating
        Systems print dialog.
      </Typography>
      <Typography component='p'>
        To save your resume config for later revision export it now.
      </Typography>
      <Button
        fullWidth={false}
        onClick={() => {
          const mime_type = mime;

          var blob = new Blob(
            [
              JSON.stringify(
                /* eslint-disable perfectionist/sort-objects */
                {
                  version,
                  customStyles,
                  sections,
                },
                /* eslint-enable perfectionist/sort-objects */
                null,
                0
              ),
            ],
            { type: mime_type }
          );

          var exportStub = document.createElement('a');
          exportStub.download = `reusable_template.${type}`;
          exportStub.href = window.URL.createObjectURL(blob);
          exportStub.onclick = function (e) {
            var that = this;
            setTimeout(function () {
              window.URL.revokeObjectURL(that.href);
            }, 1500);
          };

          exportStub.click();
          exportStub.remove();
        }}
        variant='contained'
      >
        Export Resume Config
      </Button>
    </div>
  );
};
