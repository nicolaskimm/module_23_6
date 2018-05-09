import { connect } from 'react-redux';
import Notes from './Notes';
import { deleteNoteRequest, editNote, updateNoteRequest, createNoteRequest } from './NoteActions';

const mapDispatchToProps = {
  createNote: createNoteRequest,
  deleteNote: deleteNoteRequest,
  udpateNote: updateNoteRequest,
  editNote,
};

export default connect(null, mapDispatchToProps)(Notes);
