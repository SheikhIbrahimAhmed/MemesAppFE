import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

function SkeletonLoader() {
    return (
        <Grid container wrap="nowrap">
            {Array.from(new Array(3)).map((_, index) => (
                <Box key={index} sx={{ width: 320, marginRight: 0.5, my: 5 }}>
                    <Skeleton variant="rectangular" width={320} height={320} />
                    <Box sx={{ pt: 1 }}>
                        <Skeleton />
                        <Skeleton width="80%" />
                    </Box>
                </Box>
            ))}
        </Grid>
    );
}

export default function MemeSkeleton() {
    return (
        <Box sx={{ overflow: 'hidden' }}>
            <SkeletonLoader />
        </Box>
    );
}
