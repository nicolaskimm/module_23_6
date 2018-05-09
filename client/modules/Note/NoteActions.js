import callApi from '../../util/apiCaller';
import uuid from 'uuid';

// Export Constants
export const CREATE_NOTE = 'CREATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const UDPATE_NOTE = 'UDPATE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const CREATE_NOTES = 'CREATE_NOTES';

// Export Actions
export function createNote(note, laneId) {
  return {
    type: CREATE_NOTE,
    laneId,
    note: {
      id: uuid(),
      task: 'new note',
      ...note,
    },
  };
}

export function createNoteRequest(note, laneId) {
  return (dispatch) => {
    return callApi('notes', 'post', { note, laneId }).then(noteResp => {
      dispatch(createNote(noteResp, laneId));
    });
  };
}

export function createNotes(notesData) {
  return {
    type: CREATE_NOTES,
    notes: notesData,
  };
}

export function deleteNote(noteId, laneId) {
  return {
    type: DELETE_NOTE,
    noteId,
    laneId,
  };
}

export function deleteNoteRequest(noteId, laneId) {
  return (dispatch) => {
    return callApi(`notes/${noteId}`, 'delete', { laneId }).then(() => {
      dispatch(deleteNote(noteId, laneId));
    });
  };
}

export function updateNote(note) {
  return {
    type: UDPATE_NOTE,
    note,
  };
}

export function updateNoteRequest(note, noteId) {
  return (dispatch) => {
    return callApi(`notes/${noteId}`, 'put', note).then(() => {
      dispatch(updateNote(note));
    });
  };
}

export function editNote(noteId) {
  return {
    type: EDIT_NOTE,
    noteId,
  };
}
