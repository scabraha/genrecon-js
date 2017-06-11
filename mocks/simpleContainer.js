/* eslint-disable */
import { connect } from 'react-redux';
import ViewComponent from './ViewComponent';

const mapStateToProps = state => ({
  prop1: state.some.value,
  prop2: state.some.other.value,
  prop3: state.value,
});

export default connect(mapStateToProps)(ViewComponent);
