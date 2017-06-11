/* eslint-disable */
import { connect } from 'react-redux';
import ViewComponent from './ViewComponent';
import { 
  dispatcher1, 
  dispatcher2, 
  dispatcher3, 
  dispatcher4 
} from '../../dispatchers/GenericDispatcher';

const mapStateToProps = (state, props) => ({
  prop1: state.some.state.value,
  prop2: state.another.value,
  prop3: state.value,
  prop4: props.passthrough
});

const mapDispatchToProps = (dispatch, props) => ({
  onDispatch1: () => dispatch(dispatcher1()),
  onDispatch2: (arg1) => dispatch(dispatcher2(arg1)),
  onDispatch3: (arg1, arg2) => dispatch(dispatcher3(arg1, arg2)),
  onDispatch4: (arg1) => dispatch(dispatcher4(arg1, props.passthrough))
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewComponent);
