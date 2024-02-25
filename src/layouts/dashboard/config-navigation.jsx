// import { useAuth } from 'src/context/AuthContext';

import SvgColor from 'src/components/svg-color';

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const generateNavConfig = (isHelpdesk) => {
  const commonItems = [
    {
      title: 'dashboard',
      path: '/',
      icon: icon('ic_analytics'),
    },
    {
      title: 'taches',
      path: '/taches-list',
      icon: icon('tasks'),
    },
    {
      title: 'login',
      path: '/login',
      icon: icon('ic_lock'),
    },
  ];

  const helpdeskItems = [

   // {
   //   title: 'user',
   //   path: '/user',
   //   icon: icon('ic_user'),
   // },
    {
      title: 'dashboard',
      path: '/',
      icon: icon('ic_analytics'),
    },
    {
      title: 'clients',
      path: '/clients',
      icon: icon('users'),
    },
    {
      title: 'agences',
      path: '/agences',
      icon: icon('users'),
    },
    {
      title: 'appelants',
      path: '/appelants',
      icon: icon('users'),
    },
    {
      title: 'techniciens',
      path: '/techniciens',
      icon: icon('settings'),
    },
    {
      title: 'product',
      path: '/products',
      icon: icon('ic_cart'),
    },

    {
      title: 'taches',
      path: '/taches',
      icon: icon('tasks'),
    },

  ];

  return isHelpdesk ? helpdeskItems : commonItems;
};



const IsLogComponent = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return user?.helpdesk === true || false;
};
// console.log(IsLogComponent());

const navConfig = generateNavConfig(IsLogComponent());


export default navConfig;
