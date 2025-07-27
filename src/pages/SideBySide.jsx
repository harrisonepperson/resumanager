import { useEffect, useState } from 'react';

import { Navigation } from './components/Navigation';
import { Preview } from './components/Preview';
import classes from './SideBySide.module.scss';

export const TAB_CHOICES = {
  EDIT: 'edit',
  EXPORT: 'export',
  FORMAT: 'format',
  IMPORT: 'import',
};

export const SideBySide = () => {
  const [sections, setSections] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [activeTabId, setActiveTabId] = useState(TAB_CHOICES.EDIT);
  const [customStyles, setCustomStyles] = useState({
    fontSize: '10pt',
    fontUrl: 'https://fonts.google.com/specimen/Open+Sans',
    padding: '.5in',
    sectionGap: '.75rem',
  });

  useEffect(() => {
    // Use code splitting
    (async () => {
      switch (activeTabId) {
        case TAB_CHOICES.IMPORT:
          const { Importer } = await import('./components/Importer');

          setActiveTab(
            <Importer
              setActiveTab={setActiveTabId}
              setCustomStyles={setCustomStyles}
              setSections={setSections}
            />
          );
          break;
        case TAB_CHOICES.EDIT:
          const { DragEditor } = await import('./components/DragEditor');

          setActiveTab(
            <DragEditor
              sections={sections}
              setSections={setSections}
            />
          )
          break;
        case TAB_CHOICES.FORMAT:
          const { Formater } = await import('./components/Formater');

          setActiveTab(
            <Formater
              customStyles={customStyles}
              setCustomStyles={setCustomStyles}
            />
          )
          break;
        case TAB_CHOICES.EXPORT:
          const { Exporter } = await import('./components/Exporter');

          setActiveTab(
            <Exporter
              customStyles={customStyles}
              sections={sections}
            />
          )
          break;
        default:
          setActiveTab(null);
          break;
      }
    })();
  }, [activeTabId, customStyles, sections]);

  return (
    <div className={classes.host}>
      <Navigation
        activeTab={activeTabId}
        setActiveTab={setActiveTabId}
      />
      <div className={classes.left}>
        {activeTab}
      </div>
      <div className={classes.right}>
        <Preview
          customStyles={customStyles}
          sections={sections}
        />
      </div>
    </div>
  );
};
