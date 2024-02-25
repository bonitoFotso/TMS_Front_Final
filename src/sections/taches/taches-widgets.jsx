import Grid from '@mui/material/Unstable_Grid2';

import TacheWidgets from "src/components/widgets/TacheWidgets";

// import Grid from '@mui/material/Unstable_Grid2';

export default function TachesWidgetsGrid() {
    return (
        <Grid container spacing={3}>
            <TacheWidgets
                title="taches"
                total={5500}
                color="success"
            />
        </Grid>
    )
}
