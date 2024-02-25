import PropTypes from 'prop-types';
import  { lazy, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import { useAuth } from 'src/context/AuthContext';

//  -----------------------|| AUTH GUARD ||-----------------------//
export const LoginPage = lazy(() => import('src/pages/login'));

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }) => {
  const user = localStorage.getItem('user');
  // console.log(user.email);
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  useEffect(() => {
    // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Si l'utilisateur est authentifié, affiche les enfants (composants/route protégée)
  return isAuthenticated ? children : null;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;