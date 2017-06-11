/* eslint-disable */
import { connect } from 'react-redux';
import ViewComponent from './ViewComponent';

const mapStateToProps = state => ({
  prop1: state.some.state.value,
  prop2: state.another.value,
  prop3: state.value,
});

export default connect(mapStateToProps)(ViewComponent);
