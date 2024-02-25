import { Helmet } from 'react-helmet-async';

import TechnicienTacheView from 'src/sections/technicienTaches/view/TechnicienTachesView';

// ----------------------------------------------------------------------

export default function TachesListPage() {
  return (
    <>
      <Helmet>
        <title> Taches </title>
      </Helmet>

      <TechnicienTacheView />
    </>
  );
}
