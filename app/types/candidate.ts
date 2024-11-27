export interface Skill {
    name: string;
    years?: string;
    relevant: boolean;
  }
  
  export interface CandidateSummary {
    name: string;
    summary: string;
    mainSkills: Skill[];
    additionalSkills: Skill[];
    achievements: string[];
    availability: string;
    involvement: string;
    readyToStart: string;
    directHirePossible: string;
  }
  