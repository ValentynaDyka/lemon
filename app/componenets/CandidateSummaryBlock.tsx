import { Box, Typography, Chip, Stack, Container } from '@mui/material';
import { CandidateSummary } from '../types/candidate';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import Grid from '@mui/material/Grid2';

interface Props {
  data: CandidateSummary;
}

const CandidateSummaryBlock: React.FC<Props> = ({ data }) => {
  return (
    <Box sx={{ padding: 2, maxWidth: "960px"  }}>
        <Stack direction={{ xs: 'column', sm: 'row' }}
        sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
            <GradientHighlightedText/>
      <Stack direction={ 'row'} gap={1}
      fontWeight={400} 
      fontSize={'14px'} color={'#00000061'}
        sx={{
            alignItems: "center",
          }}>
      <InfoOutlinedIcon />
      <Typography variant="subtitle1" > Relevant skills are highlighted</Typography>
      </Stack>    
      </Stack>

      <Typography variant="body1" sx={{ marginY: 4 }}>
        {data.summary}
      </Typography>
<Box sx={{ marginBottom: 4 }}>
      <Typography variant="h3" fontWeight={600} fontSize={'22px'} sx={{ marginY: 2 }}>Main technologies</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {data.mainSkills.map((skill, index) => (
          <Chip key={index} 
          label={
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" >
                {skill.name}
              </Typography>
              <Typography variant="body2">
                {skill.years || 'N/A'}
              </Typography>
            </Box>
          }
          sx={{
              background: skill.relevant ? "#832CE014" : "white",
              borderRadius: "0px",
              border: skill.relevant ? "1px dashed #9B56E6" : "1px dashed #9E9E9E",
              color:   skill.relevant ? "#9B56E6" : "inherit",
              padding: "4px",
              height: "auto",
              '& .MuiChip-label': {
                display: 'block',
                whiteSpace: 'pre-line',
                textAlign: 'center', 
                lineHeight: 1.5, 
                
              },
          }}
          />
        ))}
      </Box>
      </Box>

      <Box sx={{ marginBottom: 4 }}>
      <Typography  variant="h3" fontWeight={600} fontSize={'22px'}  sx={{ marginY: 2 }}>Additional skills</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {data.additionalSkills.map((skill, index) => (   
          <Chip key={index} label={skill.name} 
          sx={{
            background: skill.relevant ? "#832CE014" : "white",
            borderRadius: "0px",
            border: skill.relevant ? "1px dashed #9B56E6" : "1px dashed #9E9E9E",
            color:   skill.relevant ? '#9B56E6' : 'inherit',
        }} />
        ))}
      </Box>
</Box>

<Box sx={{ marginBottom: 4 }}>
      <Typography  variant="h3" fontWeight={600} fontSize={'22px'}  sx={{ marginY: 2 }}>Rewards and achievements</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {data.achievements.map((achievement, index) => (
          <Chip key={index} label={achievement} 
          icon={<StarOutlinedIcon
            sx={{
                backgroundColor: "#4FC3F7",
                fontSize: "18px",
                padding: "2px",
                borderRadius: "100%" ,
                fill:  'white' ,
            }}  
            />}
          sx={{
            background: "#29B6F614",
            borderRadius: "0px",
            border: "1px dashed #0288D1" ,
            color:  '#0288D1' ,
        }} />
        ))}
      </Box>
      </Box>


      <Grid container spacing={2} >
            <Grid size={4}>
            <Typography  variant="h3" fontWeight={600} fontSize={'22px'}  sx={{ marginY: 2 }}>
            Availability
                </Typography>
                <Typography variant="body1"
                sx={{
                textTransform: "uppercase",
                }}>
        {data.availability}, {data.involvement}
      </Typography>
            </Grid>
            <Grid size={4}>
            <Typography  variant="h3" fontWeight={600} fontSize={'22px'}  sx={{ marginY: 2 }}>
            Ready to start
                </Typography>
                <Typography variant="body1"
                 sx={{
                textTransform: "uppercase",
                }}>
        {data.readyToStart}
      </Typography>
            </Grid>
            <Grid size={4}>
            <Typography  variant="h3" fontWeight={600} fontSize={'22px'}  sx={{ marginY: 2 }}>
            Direct hire
                </Typography>
                <Typography variant="body1"
                    sx={{
                    textTransform: "uppercase",
                    }}>
        {data.directHirePossible}
      </Typography>
            </Grid>

         </Grid>

    </Box>
  );
};

export default CandidateSummaryBlock;



const GradientHighlightedText: React.FC = () => {
    return (
      <Box>
        <Typography
          variant="h2"
          fontWeight={600} fontSize={'32px'}
          sx={{
            display: 'inline-block',
            background: 'linear-gradient(transparent 60%, #e4ff59 60%)',
            padding: '2px 0',
          }}
        >
          Summary
        </Typography>
      </Box>
    );
  };