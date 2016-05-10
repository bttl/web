//var Dispatcher = require('flux').Dispatcher;
//import Dispatcher from './dispatcher';
import { Dispatcher } from 'flux';

class AppDispatcher extends Dispatcher {
  constructor() {
    // register
    // dispatch
    super();
  }

  /**
   * A bridge function between the views and the dispatcher, marking the action as a view action.
   * @param  {string} actionType
   * @param  {object} payload The data coming from the view.
   */
  client(actionType, payload) {
    payload.actionType = actionType;
    payload.source = 'VIEW_ACTION';
    this.dispatch(payload);
  }

  /**
   * A bridge function between the views and the dispatcher, marking the action as a server action.
   * @param  {string} actionType
   * @param  {object} payload The data coming from the view.
   */
  server(actionType, payload){
    payload.actionType = actionType;
    payload.source = 'SERVER_ACTION';
    this.dispatch(payload);
  }
}

// singleton
export default AppDispatcher;
