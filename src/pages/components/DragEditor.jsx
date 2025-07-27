import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import {
  mdiDragVertical,
  mdiEye,
  mdiEyeOff,
  mdiPencil,
  mdiPlus,
  mdiTrashCan,
} from '@mdi/js';
import Icon from '@mdi/react';
import {
  Button,
  Tooltip,
} from '@mui/material';
import cx from 'classnames';
import DOMPurify from 'dompurify';
import { Marked } from 'marked';
import { useState } from 'react';

import classes from './DragEditor.module.scss';
import { InputModal } from './InputModal';

const marked = new Marked({});

const Accolade = ({
  content,
  dragOver,
  hidden,
  id,
  index,
  onDelete,
  onEdit,
  parentId,
  parentIndex,
  toggleVisibility,
}) => {
  const { setNodeRef: setDroppableRef } = useDroppable({
    data: {
      index,
      parentId,
      parentIndex,
    },
    id,
  });

  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    transform: translate,
  } = useDraggable({
    data: {
      index,
      parentId,
      parentIndex,
    },
    id,
  });

  return (
    <>
      {dragOver?.id === id && !dragOver?.after && (
        <div className={classes.preview} />
      )}
      <div
        className={cx(classes.accolade, { [classes.hidden]: hidden })}
        id={id}
        ref={(el) => {
          setDraggableRef(el);
          setDroppableRef(el);
        }}
        style={{
          transform: `translate(0, ${translate?.y || 0}px)`,
          ...(translate
            ? {
                boxShadow: `
              0 0 34px black,
              0 0 13px black
            `,
              }
            : {}),
          zIndex: translate ? 999 : 1,
        }}
      >
        <Tooltip title='Click and drag to reposition'>
          <Icon
            {...listeners}
            {...attributes}
            className={classes['drag-handle']}
            path={mdiDragVertical}
            size={1}
          />
        </Tooltip>
        <div className={classes.body}>
          {content && (
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(marked.parse(content)),
              }}
            />
          )}
        </div>
        <span className={classes.controls}>
          <Tooltip title='Edit accolade'>
            <Icon
              onClick={() => onEdit(id)}
              path={mdiPencil}
              size={0.8}
            />
          </Tooltip>
          <Tooltip title='Hide accolade from resume'>
            <Icon
              onClick={() => toggleVisibility(id)}
              path={hidden ? mdiEyeOff : mdiEye}
              size={0.8}
            />
          </Tooltip>
          <Tooltip title='Permanently Delete'>
            <Icon
              onClick={() => onDelete(id)}
              path={mdiTrashCan}
              size={0.8}
            />
          </Tooltip>
        </span>
      </div>
      {dragOver?.id === id && dragOver?.after && (
        <div className={classes.preview} />
      )}
    </>
  );
};

const Card = ({
  accolades,
  addAccolade,
  content,
  dragOver,
  hidden,
  id,
  index,
  onDelete,
  onEdit,
  shouldElevate,
  title,
  toggleVisibility,
}) => {
  const { setNodeRef: setDroppableRef } = useDroppable({
    data: {
      index,
    },
    id,
  });

  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    transform: translate,
  } = useDraggable({
    data: {
      index,
    },
    id,
  });

  return (
    <>
      {dragOver?.id === id && !dragOver?.after && (
        <div className={classes.preview} />
      )}
      <div
        className={cx(classes.card, {
          [classes.hidden]: hidden,
        })}
        id={id}
        ref={(el) => {
          setDraggableRef(el);
          setDroppableRef(el);
        }}
        style={{
          transform: `translate(0, ${translate?.y || 0}px)`,
          ...(translate
            ? {
                boxShadow: `
              0 0 34px black,
              0 0 13px black
            `,
              }
            : {}),
          zIndex: translate || shouldElevate ? 999 : 1,
        }}
      >
        <div className={classes.header}>
          <Tooltip title='Click and drag to reposition'>
            <Icon
              {...listeners}
              {...attributes}
              className={classes['drag-handle']}
              path={mdiDragVertical}
              size={1}
            />
          </Tooltip>
          <div className={classes.body}>
            {title && (
              <span>
                <b>{title}</b>
              </span>
            )}
            {content && (
              <span
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(marked.parse(content)),
                }}
              />
            )}
          </div>
          <span className={classes.controls}>
            <Tooltip title='Add Accolade'>
              <Icon
                onClick={() => addAccolade({ id })}
                path={mdiPlus}
                size={0.8}
              />
            </Tooltip>
            <Tooltip title='Edit Section'>
              <Icon
                onClick={() => onEdit({ id })}
                path={mdiPencil}
                size={0.8}
              />
            </Tooltip>
            <Tooltip title='Hide section from resume'>
              <Icon
                onClick={() => toggleVisibility({ id })}
                path={hidden ? mdiEyeOff : mdiEye}
                size={0.8}
              />
            </Tooltip>
            <Tooltip title='Permanently Delete'>
              <Icon
                onClick={() => onDelete({ id })}
                path={mdiTrashCan}
                size={0.8}
              />
            </Tooltip>
          </span>
        </div>
        {accolades && (
          <div className={classes.accolades}>
            {accolades.map(({ content, hidden = false, id: accoladeId }, i) => {
              return (
                <Accolade
                  content={content}
                  dragOver={dragOver}
                  hidden={hidden}
                  id={accoladeId}
                  index={i}
                  key={accoladeId}
                  onDelete={(accoladeId) =>
                    onDelete({
                      id: accoladeId,
                      parentId: id,
                    })
                  }
                  onEdit={(accoladeId) =>
                    onEdit({
                      id: accoladeId,
                      parentId: id,
                    })
                  }
                  parentId={id}
                  parentIndex={index}
                  toggleVisibility={(accoladeId) =>
                    toggleVisibility({
                      id: accoladeId,
                      parentId: id,
                    })
                  }
                />
              );
            })}
          </div>
        )}
      </div>
      {dragOver?.id === id && dragOver?.after && (
        <div className={classes.preview} />
      )}
    </>
  );
};

export const DragEditor = ({ sections, setSections }) => {
  const [dragOver, setDragOver] = useState(null);
  const [editModalIds, setEditModalIds] = useState(null);
  const [editorTitle, setEditorTitle] = useState('');
  const [editorValue, setEditorValue] = useState('');
  const [parentCardOfDrag, setParentCardOfDrag] = useState(null);

  const collisionDetector = ({
    active,
    droppableContainers,
    droppableRects,
    pointerCoordinates,
  }) => {
    if (!active) {
      return [];
    }

    for (const droppableContainer of droppableContainers) {
      const { id } = droppableContainer;
      const rect = droppableRects.get(id);

      if (rect && id !== active.id) {
        if (
          rect.top < pointerCoordinates.y &&
          pointerCoordinates.y < rect.top + rect.height
        ) {
          if (
            (active.data?.current?.parentId &&
              droppableContainer.data?.current?.parentId) ||
            (!active.data?.current?.parentId &&
              !droppableContainer.data?.current?.parentId)
          ) {
            return [{ data: { pointerCoordinates }, id }];
          }
        }
      }
    }
  };

  const handleDrop = () => {
    const {
      activeIndex,
      activeParentIndex = null,
      overIndex,
      overParentIndex = null,
    } = dragOver;

    if (overParentIndex && activeParentIndex) {
      setSections((current) => {
        const activeAccolade =
          current[activeParentIndex].accolades[activeIndex];

        current[activeParentIndex].accolades.splice(activeIndex, 1);
        current[overParentIndex].accolades.splice(overIndex, 0, activeAccolade);

        return [...current];
      });
    } else {
      setSections((current) => {
        const section = current[activeIndex];

        current.splice(activeIndex, 1);
        current.splice(overIndex, 0, section);

        return [...current];
      });
    }

    setDragOver(null);
    setParentCardOfDrag(null);
  };

  const handleDrag = (e) => {
    const {
      active,
      collisions: [{ data: { pointerCoordinates = null } = {} } = {}] = [],
      over,
    } = e;

    if (!over) {
      return;
    }

    const {
      data: {
        current: {
          index: activeIndex = null,
          parentId: activeParentId = null,
          parentIndex: activeParentIndex = null,
        } = {},
      } = {},
      id: activeId,
    } = active || {};
    const {
      data: {
        current: {
          index: overIndex = null,
          parentIndex: overParentIndex = null,
        } = {},
      } = {},
      id: overId,
      rect: overBb,
    } = over || {};

    const dropVertMid = overBb.rect.height / 2;
    const dragPosInDrop = pointerCoordinates?.y;
    const antiFlickerOffset = 2;

    if (!activeParentIndex && !overParentIndex) {
      // Dragging section over other sections

      if (
        activeIndex < overIndex &&
        dragPosInDrop < dropVertMid + antiFlickerOffset
      ) {
        // Dragging downwards, but not yet passed the midpoint; don't shuffle
        return;
      }

      if (
        activeIndex > overIndex &&
        dragPosInDrop > dropVertMid - antiFlickerOffset
      ) {
        // Dragging upwards, but not yet passed the midpoint; don't shuffle
        return;
      }

      setDragOver({
        activeIndex,
        after: dragPosInDrop > dropVertMid,
        id: overId,
        overIndex,
      });

      return;
    } else if (activeParentIndex && overParentIndex) {
      setParentCardOfDrag(activeParentId);
      if (activeId && overId && activeId !== overId) {
        // Dragginge accolade over other accolades

        if (activeParentIndex === overParentIndex) {
          if (
            activeIndex < overIndex &&
            dragPosInDrop < dropVertMid + antiFlickerOffset
          ) {
            // Dragging downwards, but not yet passed the midpoint; don't shuffle
            return;
          }

          if (
            activeIndex > overIndex &&
            dragPosInDrop > dropVertMid - antiFlickerOffset
          ) {
            // Dragging upwards, but not yet passed the midpoint; don't shuffle
            return;
          }
        }

        setDragOver({
          activeIndex,
          activeParentIndex,
          after: dragPosInDrop > dropVertMid,
          id: overId,
          overIndex,
          overParentIndex,
        });
      }
      return;
    }
  };

  return (
    <>
      <DndContext
        collisionDetection={(e) => collisionDetector(e)}
        onDragEnd={handleDrop}
        onDragMove={handleDrag}
      >
        <div className={classes['drag-editor']}>
          {sections
            .map((section, i) => {
              return (
                <Card
                  {...section}
                  addAccolade={({ id }) => {
                    setSections((current) => {
                      const index = current.findIndex(
                        (section) => section.id === id
                      );

                      current[index].accolades ??= [];

                      current[index].accolades.push({
                        id: crypto.randomUUID(),
                      });

                      return [...current];
                    });
                  }}
                  dragOver={dragOver}
                  index={i}
                  key={section.id}
                  onDelete={({ id, parentId }) => {
                    setSections((current) => {
                      if (!parentId) {
                        return [
                          ...current.filter(
                            ({ id: sectionId }) => id !== sectionId
                          ),
                        ];
                      } else {
                        const parentIndex = current.findIndex(
                          ({ id }) => id === parentId
                        );

                        current[parentIndex].accolades = current[
                          parentIndex
                        ].accolades?.filter(
                          ({ id: sectionId }) => id !== sectionId
                        );

                        if (current[parentIndex].accolades?.length === 0) {
                          delete current[parentIndex].accolades;
                        }

                        return [...current];
                      }
                    });
                  }}
                  onEdit={({ id, parentId }) => {
                    if (!parentId) {
                      setEditorValue(
                        sections.find(({ id: sectionId }) => sectionId === id)
                          .content
                      );
                      setEditorTitle(
                        sections.find(({ id: sectionId }) => sectionId === id)
                          .title
                      );
                    } else {
                      const parentIndex = sections.findIndex(
                        ({ id }) => id === parentId
                      );

                      setEditorTitle('');
                      setEditorValue(
                        sections[parentIndex].accolades.find(
                          ({ id: accoladeId }) => accoladeId === id
                        ).content
                      );
                    }

                    setEditModalIds({ id, parentId });
                  }}
                  shouldElevate={parentCardOfDrag === section.id}
                  toggleVisibility={({ id, parentId }) => {
                    setSections((current) => {
                      if (!parentId) {
                        return [
                          ...current.map((section) =>
                            section.id === id
                              ? { ...section, hidden: !section.hidden }
                              : section
                          ),
                        ];
                      } else {
                        const parentIndex = current.findIndex(
                          ({ id }) => id === parentId
                        );

                        current[parentIndex].accolades = current[
                          parentIndex
                        ].accolades?.map((accolade) =>
                          accolade.id === id
                            ? { ...accolade, hidden: !accolade.hidden }
                            : accolade
                        );

                        if (current[parentIndex].accolades?.length === 0) {
                          delete current[parentIndex].accolades;
                        }

                        return [...current];
                      }
                    });
                  }}
                />
              );
            })
            .filter((section) => !!section)}
          <Button
            onClick={() => {
              setSections((current) => [
                ...current,
                {
                  id: crypto.randomUUID(),
                },
              ]);
            }}
            variant='contained'
          >
            Add a Section
          </Button>
        </div>
      </DndContext>
      <InputModal
        editModalIds={editModalIds}
        editorTitle={editorTitle}
        editorValue={editorValue}
        setEditModalIds={setEditModalIds}
        setEditorTitle={setEditorTitle}
        setEditorValue={setEditorValue}
        setSections={setSections}
      />
    </>
  );
};
