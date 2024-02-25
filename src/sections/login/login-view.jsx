/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { useAuth } from 'src/hooks/useAuth';

import API_URL from 'src/config';
import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import EmailField from 'src/components/form/EmailField';
import PasswordField from 'src/components/form/passwd/PasswordField';



// ----------------------------------------------------------------------

export default function LoginView() {
  const { login } = useAuth();

  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    router.push('/dashboard');
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validation d'e-mail
    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    }

    // Validation du mot de passe
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    try {
      // Validation du formulaire
      if (!validateForm()) {
        // Si la validation échoue, retourner ou effectuer des actions appropriées
        return;
      }

      // Envoyer la requête de connexion
      const response = await axios.post(`${API_URL}/login/`, {
        email,
        password,
      });

      // Vérifier si la réponse contient des erreurs
      if (response.data.errors) {
        // Gérer les erreurs renvoyées par le serveur
        console.error('Server errors:', response.data.errors);
        // Vous pouvez également mettre à jour le state pour afficher des messages d'erreur à l'utilisateur
        return;
      }
      // Stocker les données utilisateur dans le stockage local (localStorage ou sessionStorage)
      // localStorage.setItem('user',    JSON.stringify(response.data.user));
      // localStorage.setItem('token',   JSON.stringify(response.data.token.access));
      // localStorage.setItem('refresh', JSON.stringify(response.data.token.refresh));
      login(
        response.data.user,
        response.data.token.access,
        response.data.token.refresh,
      )

      // Stocker le token JWT dans les en-têtes des requêtes Axios pour les requêtes ultérieures
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.token.access}`;

      // Rediriger ou effectuer d'autres actions après la connexion réussie
      router.push('/');
    } catch (error) {
      console.error('Error during login:', error);
      
    }
  };


  const renderForm = (
    <>
      <Stack spacing={3}>
      <EmailField
          name="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />

        <PasswordField
          name="password"
          label="Password"
          value={password}
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          helperText={errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleLogin}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to Servitel</Typography>

          

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
