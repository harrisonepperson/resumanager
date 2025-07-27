import {
  mdiFileDocumentEdit,
  mdiFileExport,
  mdiFileImport,
  mdiFormatFont,
  mdiGit,
} from '@mdi/js';
import Icon from '@mdi/react';
import { Tooltip } from '@mui/material';
import cx from 'classnames';

import { TAB_CHOICES } from '../SideBySide';
import classes from './Navigation.module.scss';

export const Navigation = ({
  activeTab,
  setActiveTab
}) => {
  return (
    <div className={classes.nav}>
        <Tooltip
          placement='right'
          title='Import'
        >
          <Icon
            className={cx({
              [classes.active]: activeTab === TAB_CHOICES.IMPORT,
            })}
            onClick={() => setActiveTab(TAB_CHOICES.IMPORT)}
            path={mdiFileImport}
            size={1}
          />
        </Tooltip>
        <Tooltip
          placement='right'
          title='Editor'
        >
          <Icon
            className={cx({ [classes.active]: activeTab === TAB_CHOICES.EDIT })}
            onClick={() => setActiveTab(TAB_CHOICES.EDIT)}
            path={mdiFileDocumentEdit}
            size={1}
          />
        </Tooltip>
        <Tooltip
          placement='right'
          title='Format'
        >
          <Icon
            className={cx({
              [classes.active]: activeTab === TAB_CHOICES.FORMAT,
            })}
            onClick={() => setActiveTab(TAB_CHOICES.FORMAT)}
            path={mdiFormatFont}
            size={1}
          />
        </Tooltip>
        <Tooltip
          placement='right'
          title='Export'
        >
          <Icon
            className={cx({
              [classes.active]: activeTab === TAB_CHOICES.EXPORT,
            })}
            onClick={() => setActiveTab(TAB_CHOICES.EXPORT)}
            path={mdiFileExport}
            size={1}
          />
        </Tooltip>
        <span className={classes.spacer} />
        <Tooltip
          placement='right'
          title='View Source'
        >
          <Icon
            onClick={() =>
              window
                .open(
                  'https://github.com/harrisonepperson/resumanager',
                  '_blank'
                )
                .focus()
            }
            path={mdiGit}
            size={1}
          />
        </Tooltip>
      </div>
  );
}