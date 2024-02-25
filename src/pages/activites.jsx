import { Helmet } from 'react-helmet-async';

import { ActivitesViews } from 'src/sections/activites/view';

// ----------------------------------------------------------------------

export default function ActivitesPage() {
  return (
    <>
      <Helmet>
        <title> Taches </title>
      </Helmet>

      <ActivitesViews />
    </>
  );
}
