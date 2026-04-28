BREED_IDENTIFICATION_PROMPT = """
Identify the Indian Cattle (Cow) or Buffalo breed in the image(s).

TARGET BREEDS (Cattle): Gir, Sahiwal, Red Sindhi, Tharparkar, Kankrej.
TARGET BREEDS (Buffalo): Murrah, Mehsana, Jaffrabadi, Surti, Pandharpuri.

RULES:
1. If the animal is NOT a cow or buffalo (e.g., dog, cat, person, object), set 'breed' to 'Unknown'.
2. If it is a cow/buffalo but not one of the target breeds, pick the closest matching target breed.
3. All images are of the same animal.
4. Return ONLY a valid JSON object:
{
  "breed": "string (The breed name)",
  "confidence": 0-100,
  "confidenceLevel": "High/Good/Medium/Low",
  "topPredictions": [{"breed": "name", "score": 0-100}],
  "notes": "Brief explanation of identification features",
  "bodyTraits": {
    "coatColor": "string",
    "humpSize": "string",
    "dewlap": "string",
    "bodySize": "string",
    "hornShape": "string"
  }
}
"""
