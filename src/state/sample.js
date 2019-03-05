import { createReducer, createActions } from 'reduxsauce';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';

const INITIAL_STATE = Immutable({
  sampleValue: 0,
  sampleFlag: false,
});

const { Types, Creators } = createActions({
  sampleIncrementAction: ['incBy'],
  sampleDecrementAction: ['decBy'],
});

export const SampleTypes = Types; // SampleTypes
export default Creators; // SampleActions

// Reducers
const sampleIncrementAction = (state, { incBy = 1 }) => state.merge({
  sampleValue: (state.sampleValue + incBy),
});

const sampleDecrementAction = (state, { decBy = 1 }) => state.merge({
  sampleValue: (state.sampleValue - decBy),
});

// Relate Action Types to reducers
export const reducer = createReducer(INITIAL_STATE, {
  [SampleTypes.SAMPLE_INCREMENT_ACTION]: sampleIncrementAction,
  [SampleTypes.SAMPLE_DECREMENT_ACTION]: sampleDecrementAction,
});

// Selectors
const selectSlice = state => state.sample;

export const selectValue = createSelector(
  selectSlice,
  ({ sampleValue }) => sampleValue,
);
