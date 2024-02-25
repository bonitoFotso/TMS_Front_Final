import { Helmet } from 'react-helmet-async';

import { TacheView } from 'src/sections/taches/view';

// ----------------------------------------------------------------------

export default function TachePage() {
  return (
    <>
      <Helmet>
        <title> Taches </title>
      </Helmet>

      <TacheView />
    </>
  );
}
