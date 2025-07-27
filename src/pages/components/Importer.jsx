import { useState } from 'react';
import Dropzone from 'react-dropzone';

import { config } from '../../config';
import { TAB_CHOICES } from '../SideBySide';
import classes from './Importer.module.scss';

export const Importer = ({ setActiveTab, setCustomStyles, setSections }) => {
  const {
    file: {
      mime,
      type
    }
  } = config;

  const [rejectedFiles, setRejectedFiles] = useState([]);

  const handleUpload = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length !== 0) {
      setRejectedFiles(rejectedFiles);

      return;
    } else {
      setRejectedFiles([]);
    }

    if (acceptedFiles.length === 1) {
      const [file] = acceptedFiles;

      const reader = new FileReader();
      reader.onload = (e) => {
        const { customStyles, sections } = JSON.parse(e.target.result);

        setSections(sections);
        setCustomStyles(customStyles);
      };

      reader.readAsText(file);

      setActiveTab(TAB_CHOICES.EDIT);
    }
  };

  return (
    <div className={classes.importer}>
      <Dropzone
        accept={{
          [mime]: [`.${type}`],
        }}
        onDrop={handleUpload}
      >
        {({ getInputProps, getRootProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>
                Drag and drop your .resume file here, or click to select files
              </p>
            </div>
          </section>
        )}
      </Dropzone>
      {rejectedFiles.length !== 0 &&
        rejectedFiles.map(({ errors, file }) => {
          return (
            <span className={classes.error}>
              Could not process {file.name} - {errors[0].message}
            </span>
          );
        })}
    </div>
  );
};
