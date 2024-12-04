import React, { useState, useEffect } from 'react';
import { 
 Box, 
 Typography, 
 Button, 
 Container, 
 Paper 
} from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import axios from 'axios';

const SimplifiedSpeedometer = () => {
 const [speed, setSpeed] = useState(0);
 const [maxSpeed, setMaxSpeed] = useState(0);

 useEffect(() => {
   const fetchSpeed = async () => {
     try {
       const response = await axios.get('http://localhost:5000/latest-speed');
       const currentSpeed = response.data.speed || 0;
       setSpeed(currentSpeed);
       setMaxSpeed(prev => Math.max(prev, currentSpeed));
     } catch (error) {
       console.error('Speed fetch error:', error);
     }
   };

   fetchSpeed();
   const intervalId = setInterval(fetchSpeed, 1000);

   return () => clearInterval(intervalId);
 }, []);

 const increaseSpeed = async () => {
   try {
     const newSpeed = Math.min(speed + 10, 220);
     await axios.post('http://localhost:5000/speed', { speed: newSpeed });
     setSpeed(newSpeed);
   } catch (error) {
     console.error('Speed increase error:', error);
   }
 };

 const decreaseSpeed = async () => {
   try {
     const newSpeed = Math.max(speed - 10, 0);
     await axios.post('http://localhost:5000/speed', { speed: newSpeed });
     setSpeed(newSpeed);
   } catch (error) {
     console.error('Speed decrease error:', error);
   }
 };

 return (
   <Container maxWidth="sm">
     <Box sx={{ 
       display: 'flex', 
       flexDirection: 'column', 
       alignItems: 'center', 
       mt: 4 
     }}>
       <Paper elevation={3} sx={{ 
         p: 3, 
         width: '100%', 
         textAlign: 'center' 
       }}>
         <SpeedIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
         
         <Typography 
           variant="h4" 
           color="primary" 
           sx={{ mb: 2 }}
         >
           {speed} km/h
         </Typography>

         <Typography 
           variant="subtitle1" 
           color="textSecondary" 
           sx={{ mb: 1 }}
         >
           Max Speed: {maxSpeed} km/h
         </Typography>

         <Box sx={{ 
           display: 'flex', 
           justifyContent: 'center', 
           gap: 2, 
           mt: 3 
         }}>
           <Button 
             variant="contained" 
             color="primary" 
             onClick={increaseSpeed}
             startIcon={<SpeedIcon />}
           >
             Accelerate
           </Button>
           <Button 
             variant="outlined" 
             color="primary" 
             onClick={decreaseSpeed}
             startIcon={<SpeedIcon />}
           >
             Decelerate
           </Button>
         </Box>
       </Paper>
     </Box>
   </Container>
 );
};

export default SimplifiedSpeedometer;