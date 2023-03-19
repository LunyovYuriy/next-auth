import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import classes from '@/src/layout/Layout/components/MainNavigation/scss/MainNavigation.module.scss';

function MainNavigation() {
  const { data: session } = useSession();

  const logoutHandler = () => {
    signOut();
  };

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session ? (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          ) : (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
