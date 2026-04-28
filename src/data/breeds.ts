import type { BreedInfo } from '../types';

export const breeds: BreedInfo[] = [
  {
    id: '1',
    name: 'Gir Cattle',
    type: 'Cattle',
    price: '₹72k-185k',
    milkProduction: '1500 - 2500 kg/lactation',
    region: 'Gujarat (Saurashtra)',
    strengths: ['Heat Tolerance', 'Disease Resistance', 'High Milk Fat'],
    useCases: ['Commercial Dairy', 'Breeding', 'Drought Power'],
    description: 'Famous for its tolerance to tropical diseases and high heat. Gir cattle are one of the principal Zebu breeds originating in India. It has been used locally in the improvement of other breeds.',
    image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    advantages: ['Excellent heat tolerance', 'Highly resistant to diseases and parasites', 'Long productive life'],
    disadvantages: ['Late maturity', 'Short lactation period compared to exotic breeds']
  },
  {
    id: '2',
    name: 'Murrah Buffalo',
    type: 'Buffalo',
    price: '₹80k-200k',
    milkProduction: '2000 - 3000 kg/lactation',
    region: 'Haryana & Punjab',
    strengths: ['High Fat Content', 'Adaptability', 'Draft Power'],
    useCases: ['Premium Milk Production', 'Ghee Manufacturing'],
    description: 'The most popular buffalo breed in India for dairy. Murrah buffaloes are world-famous for their high milk production and fat content. They are easily identified by their tightly curled horns.',
    image: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    advantages: ['Highest milk fat content', 'Docile temperament', 'Highly adaptable to different climates'],
    disadvantages: ['Requires high-quality feed', 'Sensitive to extreme heat']
  },
  {
    id: '3',
    name: 'Sahiwal Cattle',
    type: 'Cattle',
    price: '₹60k-150k',
    milkProduction: '2000 - 3000 kg/lactation',
    region: 'Punjab & Rajasthan',
    strengths: ['High Milk Yield', 'Ticks Resistance', 'Longevity'],
    useCases: ['Large Scale Dairy', 'Household Milk'],
    description: 'One of the best dairy breeds in India. Sahiwal is considered one of the best zebu milch breeds. It is relatively tick-resistant, heat-tolerant and noted for its high resistance to parasites.',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    advantages: ['High milk yield among indigenous breeds', 'Tick and parasite resistant', 'Excellent mothering ability'],
    disadvantages: ['Requires intensive management for peak yield']
  },
  {
    id: '4',
    name: 'Red Sindhi',
    type: 'Cattle',
    price: '₹50k-120k',
    milkProduction: '1700 - 2200 kg/lactation',
    region: 'Sindh (orig.), across India',
    strengths: ['Hardiness', 'Drought Resistance', 'Consistent Yield'],
    useCases: ['Drought Farming', 'Dairy'],
    description: 'Very hardy and adaptable to different climatic conditions. Red Sindhi are red in color, ranging from deep reddish brown to a yellowish red.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    advantages: ['Highly adaptable to various environments', 'Consistent milk producer', 'Good for both milk and work'],
    disadvantages: ['Smaller frame size']
  },
  {
    id: '5',
    name: 'Jaffrabadi Buffalo',
    type: 'Buffalo',
    price: '₹90k-220k',
    milkProduction: '1800 - 2500 kg/lactation',
    region: 'Gujarat (Saurashtra)',
    strengths: ['Heavy Body', 'High Fat %', 'Heat Tolerance'],
    useCases: ['Industrial Dairy', 'Ghee'],
    description: 'Known for being one of the largest buffalo breeds. Jaffrabadi buffaloes are massive animals with heavy bones and a large forehead.',
    image: 'https://images.unsplash.com/photo-1545063914-a1e6ed1642de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    advantages: ['Massive body size', 'High fat percentage in milk', 'Strong and powerful'],
    disadvantages: ['Large appetite', 'Slower maturity']
  },
  {
    id: '6',
    name: 'Tharparkar',
    type: 'Cattle',
    price: '₹55k-130k',
    milkProduction: '1800 - 2200 kg/lactation',
    region: 'Rajasthan (Thar Desert)',
    strengths: ['Arid Survival', 'Low Maintenance', 'Dual Purpose'],
    useCases: ['Desert Farming', 'Low Input Dairy'],
    description: 'Excellent dual-purpose breed for arid regions. Tharparkar cattle are medium-sized and are known for their white or light grey coat.',
    image: 'https://images.unsplash.com/photo-1527153351910-4ff6505d03ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    advantages: ['Unsurpassed ability to survive in desert conditions', 'Excellent dual-purpose animal', 'Low maintenance requirements'],
    disadvantages: ['Moderate milk yield compared to intensive dairy breeds']
  }
];
