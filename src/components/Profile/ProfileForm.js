import { useRef, useContext } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';
import { ProfileFormKey } from './ProfileFormKey';

const ProfileForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext)
  const changePassRef = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = changePassRef.current.value;

    fetch(
      ProfileFormKey,{
    method: 'POST',
    body: JSON.stringify({
      idToken: authCtx.token,
      password: enteredNewPassword,
      returnSecureToken: false
    }),
    headers: {
      'Content-Type': 'Application/json'
    }
  }).then(res => {
    //Assuming this will always succeed.
    history.replace('/');
  })
  }


  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={changePassRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
