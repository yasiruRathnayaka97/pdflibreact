import React from 'react';



const Search = React.lazy(() => import('./views/Search'));
const Upload = React.lazy(() => import('./views/Upload/Upload'));
const History = React.lazy(() => import('./views/History/History'));
const Profile = React.lazy(() => import('./views/Profile/Profile'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },

  { path: '/search', name: 'Search', component: Search },
  { path: '/upload', name: 'Upload', component: Upload },
  { path: '/history', name: 'History', component: History },
  { path: '/profile', name: 'Profile', component: Profile },
];

export default routes;
