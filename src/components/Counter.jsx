import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SampleActions, { selectValue } from 'state/sample';
import 'styles/Counter.scss';

// A basic counter component connected to the redux store.
const Counter = (props) => {
  const {
    value,
    incValue,
    decValue,
  } = props;

  return (
    <div className="counter">
      <h1 className="value">{value}</h1>
      <button className="inc-button" onClick={incValue}>Increment</button>
      <button className="dec-button" onClick={decValue}>Decrement</button>
    </div>
  );
};

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  incValue: PropTypes.func.isRequired,
  decValue: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  value: selectValue(state),
});

const mapDispatchToProps = dispatch => ({
  incValue: () => dispatch(SampleActions.sampleIncrementAction()),
  decValue: () => dispatch(SampleActions.sampleDecrementAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
