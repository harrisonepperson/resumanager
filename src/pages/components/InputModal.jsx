import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import MDEditor from '@uiw/react-md-editor';

import classes from './InputModal.module.scss';

export const InputModal = ({
  editModalIds,
  editorTitle,
  editorValue,
  setEditModalIds,
  setEditorTitle,
  setEditorValue,
  setSections,
}) => {
  return (
    <Dialog
      classes={{
        root: classes.modal,
      }}
      fullWidth={true}
      maxWidth='xl'
      onClose={() => setEditModalIds(null)}
      open={editModalIds}
    >
      <DialogTitle>Edit Entry</DialogTitle>
      <DialogContent classes={{ root: classes.content }}>
        {!editModalIds?.parentId && (
          <TextField
            fullWidth
            label='Section Title'
            onChange={(e) => setEditorTitle(e.target.value)}
            value={editorTitle}
          />
        )}
        <div data-color-mode='light'>
          <MDEditor
            height={600}
            onChange={setEditorValue}
            value={editorValue}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          color='error'
          onClick={() => {
            setEditorTitle('');
            setEditorValue('');
            setEditModalIds(null);
          }}
          variant='contained'
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            setSections((current) => {
              const { id, parentId } = editModalIds;

              if (!parentId) {
                return [
                  ...current.map((section) =>
                    section.id === id
                      ? {
                          ...section,
                          content: editorValue || undefined,
                          title: editorTitle || undefined,
                        }
                      : section
                  ),
                ];
              } else {
                const parentIndex = current.findIndex(
                  ({ id }) => id === parentId
                );

                current[parentIndex].accolades = current[
                  parentIndex
                ].accolades.map((accolade) =>
                  accolade.id === id
                    ? { ...accolade, content: editorValue }
                    : accolade
                );

                return [...current];
              }
            });

            setEditorTitle('');
            setEditorValue('');
            setEditModalIds(null);
          }}
          variant='contained'
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
