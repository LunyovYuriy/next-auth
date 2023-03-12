import MainNavigation from '@/src/layout/Layout/components/MainNavigation/MainNavigation';
import ILayout from '@/src/layout/Layout/interfaces/ILayout';

function Layout({ children }: ILayout) {
  return (
    <>
      <MainNavigation />
      <main>{children}</main>
    </>
  );
}

export default Layout;
