import { connect } from 'react-redux';
import Lane from './Lane';
import { updateLaneRequest, deleteLaneRequest, createLaneRequest, editLane, fetchLanes } from './LaneActions';
import { createNoteRequest } from '../Note/NoteActions';

const mapStateToProps = (state, ownProps) => ({
  laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId]),
});

const mapDispatchToProps = {
  deleteLane: deleteLaneRequest,
  updateLane: updateLaneRequest,
  addNote: createNoteRequest,
  createLane: createLaneRequest,
  editLane,
  fetchLanes,
};

export default connect(mapStateToProps, mapDispatchToProps)(Lane);
