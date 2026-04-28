export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
}

export interface BreedInfo {
  id: string;
  name: string;
  scientificName?: string;
  type: 'Cattle' | 'Buffalo';
  price?: string;
  milkProduction: string;
  region: string;
  strengths: string[];
  useCases: string[];
  description: string;
  image: string;
  advantages: string[];
  disadvantages: string[];
}

export interface AnalysisResult {
  id: string;
  imageUrl: string;
  breedId: string;
  breedName: string;
  confidence: number;
  priceEstimate: {
    min: number;
    max: number;
    currency: string;
  };
  predictedDiseases: {
    name: string;
    probability: number;
    description: string;
  }[];
  timestamp: string;
}

export interface Report {
  id: string;
  userId: string;
  imageUrl: string;
  breedName: string;
  confidence: number;
  timestamp: string;
}
