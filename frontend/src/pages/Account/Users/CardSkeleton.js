
import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import './CardSkeleton.css'


const CardSkeleton = () => {


    return (
        <div className='card-skeleton'>

            <div className='left-col'>
             <h1>   <Skeleton width={70} height={80} /></h1>
            </div>

            <div className='right-col'>
                <Box sx={{ width: 300 }}/>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton  animation="wave"  />
                    
            </div>

        </div>

    )
}

export default CardSkeleton;