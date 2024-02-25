import { Helmet } from 'react-helmet-async';

import { CliensDetailView } from 'src/sections/clients/view';



// -----------------------------------------------------------------------

export default function TacheDetailPage() {
    return (
        <>
            <Helmet>
                <title> client Details </title>
            </Helmet>

            <CliensDetailView />
        </>
    );
}
