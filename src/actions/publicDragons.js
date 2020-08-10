import { PUBLIC_DRAGONS } from './types.js';
import { BACKEND } from '../config';


export const fetchPublicDragons = () => async (dispatch) => {
  console.log("inside fetchPublicDragons");
  dispatch({ type: PUBLIC_DRAGONS.FETCH })

  try {
    let data = await (await fetch(`${BACKEND.ADDRESS}/dragon/public-dragons`)).json();
    console.log("data-----+++++++++  ", data);
    if (data.type === 'error') {
      dispatch({
        type: PUBLIC_DRAGONS.FETCH_ERROR,
        message: data.message
      })
    } else {
      dispatch({
        type: PUBLIC_DRAGONS.FETCH_SUCCESS,
        dragons: data.dragons
      });
    }
  } catch (error) {
    dispatch({
      type: PUBLIC_DRAGONS.FETCH_ERROR,
      message: error.message
    })
  }

}
