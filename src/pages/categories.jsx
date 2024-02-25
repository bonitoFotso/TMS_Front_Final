import { Helmet } from 'react-helmet-async';

import { CategoriesViews } from 'src/sections/categories/view';

// ----------------------------------------------------------------------

export default function CategoriePage() {
  return (
    <>
      <Helmet>
        <title> Taches </title>
      </Helmet>

      <CategoriesViews />
    </>
  );
}
