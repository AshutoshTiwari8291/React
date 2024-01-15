import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LogoutComponent from './LogoutComponent';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import ListTodosComponent from './ListTodosComponent';
import ErrorComponent from './ErrorComponent';
import WelcomeComponent from './WelcomeComponent';
import LoginComponent from './LoginComponent';
import TodoComponent from './TodoCompoent';
import AuthProvider, { useAuth } from '../security/AuthContext';
import './TodoApp.css';

function AuthenticatedRoute({ children }) {
    const authContext = useAuth();

    if (authContext.isAuthenticated) {
        return children
    } else {
        return <Navigate to="/" />
    }
}

export default function TodoApp() {
    return (
        <div>
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path='/' element={<LoginComponent />}></Route>
                        <Route path='/login' element={<LoginComponent />}></Route>
                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent />
                            </AuthenticatedRoute>
                        }></Route>
                        <Route path='/todos' element={
                            <AuthenticatedRoute>
                                <ListTodosComponent />
                            </AuthenticatedRoute>
                        }></Route>
                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent />
                            </AuthenticatedRoute>
                        }></Route>
                        <Route path='/todos/:id' element={
                            <AuthenticatedRoute>
                                <TodoComponent />
                            </AuthenticatedRoute>
                        }></Route>
                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent />
                            </AuthenticatedRoute>
                        }></Route>
                        <Route path='*' element={<ErrorComponent />}></Route>
                    </Routes>
                    <FooterComponent />
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}
