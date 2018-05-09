// Import Actions
import { CREATE_LANE, DELETE_LANE, UPDATE_LANE, EDIT_LANE, CREATE_LANES } from './LaneActions';
import { CREATE_NOTE, DELETE_NOTE } from '../Note/NoteActions';

// Initial State
import omit from 'lodash/omit';

const initialState = {};

export default function lanes(state = initialState, action) {
  switch (action.type) {
    case CREATE_LANE:
    case UPDATE_LANE:
      return { ...state, [action.lane.id]: action.lane };

    case EDIT_LANE: {
      return {
        data: state.data.map(lane => { return lane.id === action.id ? Object.assign({}, lane, action.post) : lane; }),
      };
    }

    case CREATE_LANES:
      return { ...action.lanes };

    case DELETE_NOTE: {
      const newLane = { ...state[action.laneId] };
      newLane.notes = newLane.notes.filter(noteId => noteId !== action.noteId);

      return { ...state, [action.laneId]: newLane };
    }

    case CREATE_NOTE: {
      const newLane = { ...state[action.laneId] };
      newLane.notes = newLane.notes.concat(action.note.id);

      return { ...state, [action.laneId]: newLane };
    }

    case DELETE_LANE: {
      return omit(state, action.laneId);
    }

    default:
      return state;
  }
}