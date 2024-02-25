import { Helmet } from 'react-helmet-async';

import PageClientsTabs from '../sections/clients/components/tabs/PageClientsTabs';



// -----------------------------------------------------------------------

export default function TachePage() {
  return (
    <>
      <Helmet>
        <title> client </title>
      </Helmet>

      <PageClientsTabs />
    </>
  );
}
