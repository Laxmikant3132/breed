from typing import Dict, Any

BREED_DATABASE: Dict[str, Any] = {
    "Gir": {
        "category": "Cattle",
        "price": "₹72k-185k",
        "milkYield": "12-18 L/day",
        "state": "Gujarat",
        "advantages": ["Heat tolerant", "High fat (4.5%)", "Disease resistant"],
        "disadvantages": ["Slow milking", "Late maturity"],
        "similarBreeds": ["Sahiwal", "Red Sindhi"],
        "visual_rules": "Reddish coat, convex forehead, long drooping ears, large dewlap, strong hump."
    },
    "Red Sindhi": {
        "category": "Cattle",
        "price": "₹50k-120k",
        "milkYield": "8-10 L/day",
        "state": "Karnataka/AP",
        "advantages": ["Hardy", "Heat tolerant", "Adaptable"],
        "disadvantages": ["Moderate milk yield"],
        "similarBreeds": ["Sahiwal", "Gir"],
        "visual_rules": "Deep dark red, compact body, medium ears, smaller hump."
    },
    "Sahiwal": {
        "category": "Cattle",
        "price": "₹60k-150k",
        "milkYield": "8-12 L/day",
        "state": "Punjab/Haryana",
        "advantages": ["Heat tolerant", "Tick resistant", "Calm temperament"],
        "disadvantages": ["Requires good fodder", "Average fat %"],
        "similarBreeds": ["Gir", "Red Sindhi"],
        "visual_rules": "Moderate brown/reddish brown, loose skin, medium ears, dairy frame."
    },
    "Tharparkar": {
        "category": "Cattle",
        "price": "₹55k-130k",
        "milkYield": "8-12 L/day",
        "state": "Rajasthan",
        "advantages": ["Drought resistant", "Hardy", "Low maintenance"],
        "disadvantages": ["Nervous temperament"],
        "similarBreeds": ["Kankrej", "Sahiwal"],
        "visual_rules": "White or light grey coat, hardy frame, efficient for desert regions."
    },
    "Kankrej": {
        "category": "Cattle",
        "price": "₹65k-160k",
        "milkYield": "10-15 L/day",
        "state": "Gujarat",
        "advantages": ["Excellent heat tolerance", "Powerful draft animal"],
        "disadvantages": ["Large horns require care"],
        "similarBreeds": ["Tharparkar", "Gir"],
        "visual_rules": "Silver grey, lyre-shaped horns, muscular body, 'Sawai Chal' walk."
    },
    "Murrah": {
        "category": "Buffalo",
        "price": "₹80k-200k",
        "milkYield": "10-16 L/day (6.5% fat)",
        "state": "Haryana/Punjab",
        "advantages": ["High milk fat", "Calm", "World-renowned"],
        "disadvantages": ["Requires cooling in peak summer"],
        "similarBreeds": ["Mehsana", "Jaffrabadi"],
        "visual_rules": "Jet black, tightly curled horns, compact dairy body."
    },
    "Pandharpuri": {
        "category": "Buffalo",
        "price": "₹50k-120k",
        "milkYield": "6-9 L/day",
        "state": "Maharashtra",
        "advantages": ["Hardy", "Low maintenance", "Fast breeder"],
        "disadvantages": ["Lower milk production"],
        "similarBreeds": ["Surti", "Mehsana"],
        "visual_rules": "Black coat, very long backward horns, tall body frame."
    },
    "Jaffrabadi": {
        "category": "Buffalo",
        "price": "₹90k-220k",
        "milkYield": "8-14 L/day",
        "state": "Gujarat",
        "advantages": ["Heavy body", "Good for meat & milk", "Massive horns"],
        "disadvantages": ["Requires huge amount of feed"],
        "similarBreeds": ["Murrah", "Surti"],
        "visual_rules": "Massive heavy body, broad forehead, drooping horns."
    },
    "Surti": {
        "category": "Buffalo",
        "price": "₹60k-140k",
        "milkYield": "6-10 L/day",
        "state": "Gujarat",
        "advantages": ["Efficient feed converter", "Compact size"],
        "disadvantages": ["Lower absolute milk yield"],
        "similarBreeds": ["Mehsana", "Pandharpuri"],
        "visual_rules": "Greyish or rusty dark tone, sickle-shaped horns."
    },
    "Mehsana": {
        "category": "Buffalo",
        "price": "₹70k-170k",
        "milkYield": "8-12 L/day",
        "state": "Gujarat",
        "advantages": ["Good lactation length", "Regular breeder"],
        "disadvantages": ["Mixed traits (Murrah-Surti cross)"],
        "similarBreeds": ["Murrah", "Surti"],
        "visual_rules": "Mixed black/grey coat, moderately curved horns."
    },
    "German Shepherd": {
        "category": "Dog",
        "price": "₹15k-50k",
        "milkYield": "N/A",
        "state": "Germany",
        "advantages": ["Loyal", "Intelligent", "Protective"],
        "disadvantages": ["Requires training", "High shedding"],
        "similarBreeds": ["Belgian Malinois", "Husky"],
        "visual_rules": "Erect ears, wolf-like body, tan and black coat."
    }
}
