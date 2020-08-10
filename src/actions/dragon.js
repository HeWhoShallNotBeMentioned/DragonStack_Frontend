import { DRAGON } from './types.js';
import { BACKEND } from '../config'

export const fetchDragon = async (dispatch) => {
  dispatch({ type: DRAGON.FETCH })
  try {
    let data = await (await fetch(`${BACKEND.ADDRESS}/dragon/new`, { credentials: 'include' })).json();
    if (data.type === 'error') {
      dispatch({
        type: DRAGON.FETCH_ERROR,
        message: data.message
      })
    } else {
      dispatch({
        type: DRAGON.FETCH_SUCCESS,
        dragon: data.dragon
      });
    }

  } catch (error) {
    dispatch({
      type: DRAGON.FETCH_ERROR,
      message: error.message
    })
  }
}
