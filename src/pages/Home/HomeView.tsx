import classes from '@/src/pages/Home/scss/HomeView.module.scss';

function HomeView() {
  // Show Link to Login page if NOT auth

  return (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
    </section>
  );
}

export default HomeView;
