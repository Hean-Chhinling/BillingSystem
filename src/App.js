import { Routes, Route} from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/firebase';
import Calculation from './components/Calculation';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import Dashboard from './Auth/Dashboard';
import { useState, useEffect } from 'react';



const App = () => {

    const [user] = useAuthState(auth);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        // Clean up function
        return () => {
            setMenuOpen(false);
        };
    }, []);


      return (
            <div className='text-2xl bg-green-200'>
                <Header isAuthenticated={user && user.emailVerified} setMenuOpen={setMenuOpen}/>
                    <Routes>
                        <Route index element={<Home isAuthenticated={user && user.emailVerified} menuOpen={menuOpen} />} />
                        <Route path="/calculation" element={<Calculation />} />
                        <Route path="/about" element={<About /> } />
                        <Route path="/login" element={<SignIn /> } />
                        <Route path="/signup" element={<SignUp isAuthenticated={user && user.emailVerified}/> } />
                        <Route path="/dashboard" element={<Dashboard/> }/>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    
                <Footer />
            </div>
          
      );
};

export default App;
