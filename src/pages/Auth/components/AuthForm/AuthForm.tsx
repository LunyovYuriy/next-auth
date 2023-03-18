import classes from '@/src/pages/Auth/components/AuthForm/scss/AuthForm.module.scss';
import useAuthForm from '@/src/pages/Auth/components/AuthForm/hooks/useAuthForm';
import useAuthMode from '@/src/pages/Auth/components/AuthForm/hooks/useAuthMode';

function AuthForm() {
  const { authMode, headerText, submitText, switcherText, switchAuthMode } =
    useAuthMode();
  const { email, password, isLoading, setEmail, setPassword, handleSubmit } =
    useAuthForm();

  return (
    <section className={classes.auth}>
      <h1>{headerText}</h1>
      <form onSubmit={(event) => handleSubmit(event, authMode)}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className={classes.actions}>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : submitText}
          </button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthMode}
          >
            {switcherText}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
