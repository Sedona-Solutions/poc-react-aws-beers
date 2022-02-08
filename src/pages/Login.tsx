import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useAuthentication} from "../hooks/authentication-hook";


const Login = () => {
  const {login} = useAuthentication();
  const navigate = useNavigate();
  const {register, handleSubmit, formState: {errors}} = useForm();
  const onLogin = async (loginForm) => {
    try {
      await login(loginForm.username, loginForm.password)
      navigate('/beers');
    } catch (e) {
      console.error('Unable to login : ', e);
    }
  }

  return (<>
    <form onSubmit={handleSubmit(onLogin)}>
      <div>
        <input {...register("username", {required: true})} />
        {errors.username && <span>This field is required</span>}
      </div>
      <div>
        <input {...register("password", {required: true})} />
        {errors.password && <span>This field is required</span>}
      </div>
      <button type="submit">Se connecter</button>
    </form>
  </>);
}

export default Login;