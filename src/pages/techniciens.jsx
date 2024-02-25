import { Helmet } from 'react-helmet-async';

import { TechniciensView } from 'src/sections/techniciens/view';

// -----------------------------------------------------------------------

export default function TechniciensPage() {
  return (
    <>
      <Helmet>
        <title> techniciens </title>
      </Helmet>

      <TechniciensView />
    </>
  );
}
