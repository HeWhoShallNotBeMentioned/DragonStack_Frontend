import { GENERATION } from './types.js';
import { BACKEND } from '../config'


export const fetchGeneration = async (dispatch) => {
  dispatch({ type: GENERATION.FETCH })
  try {
    let data = await (await fetch(`${BACKEND.ADDRESS}/generation`)).json();
    if (data.type === 'error') {
      dispatch({
        type: GENERATION.FETCH_ERROR,
        message: data.message
      })
    } else {
      return dispatch({
        type: GENERATION.FETCH_SUCCESS,
        generation: data.generation
      });
    }

  } catch (error) {
    dispatch({
      type: GENERATION.FETCH_ERROR,
      message: error.message
    })
  }
}
