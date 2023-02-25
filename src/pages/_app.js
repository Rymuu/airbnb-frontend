import '../styles/styles.scss';
import '../styles/globals.css';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import { WishlistContextProvider } from '../context/WishlistContext';
import { UserContextProvider } from '../context/UserContext';
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      {
        router && router.asPath.startsWith('/admin') ? (
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        ) : (
          <UserContextProvider>
            <WishlistContextProvider>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </WishlistContextProvider>
          </UserContextProvider>
        )
      }
    </>
  )
}

export default MyApp