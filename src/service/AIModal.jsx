import { GoogleGenerativeAI } from "@google/generative-ai";

  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  
   export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location : las vegas, for 3 Days for couple with a cheap budget, give me Hotels options list with HotelName, Hotel address, Price, Hotel image url, geo coordinates, ticket Pricing, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"trip\": {\n    \"location\": \"Las Vegas, Nevada\",\n    \"duration\": \"3 Days\",\n    \"travelers\": \"Couple\",\n    \"budget\": \"Cheap\",\n    \"hotels\": [\n      {\n        \"name\": \"The D Las Vegas\",\n        \"address\": \"301 Fremont Street, Las Vegas, NV 89101\",\n        \"price\": \"from $40/night\",\n        \"image_url\": \"https://www.thed.com/sites/default/files/images/hero-images/the-d-las-vegas-hotel-casino-hero.jpg\",\n        \"geo_coordinates\": \"36.1699, -115.1424\"\n      },\n      {\n        \"name\": \"Circus Circus Hotel & Casino\",\n        \"address\": \"2880 Las Vegas Blvd S, Las Vegas, NV 89109\",\n        \"price\": \"from $30/night\",\n        \"image_url\": \"https://www.circuscircus.com/content/dam/mgmresorts/circus-circus-hotel-casino/hero-images/desktop-hero-image.jpg\",\n        \"geo_coordinates\": \"36.1135, -115.1723\"\n      },\n      {\n        \"name\": \"Golden Nugget Hotel & Casino\",\n        \"address\": \"129 E Fremont St, Las Vegas, NV 89101\",\n        \"price\": \"from $50/night\",\n        \"image_url\": \"https://www.goldennugget.com/content/dam/gnl/common/golden-nugget-hotel-casino-las-vegas-home-hero-image.jpg\",\n        \"geo_coordinates\": \"36.1698, -115.1423\"\n      },\n      {\n        \"name\": \"Main Street Station Casino, Brewery & Hotel\",\n        \"address\": \"1100 E Fremont St, Las Vegas, NV 89101\",\n        \"price\": \"from $35/night\",\n        \"image_url\": \"https://www.mainstreetstationcasino.com/content/dam/main-street-station-casino/hero-images/hero-image.jpg\",\n        \"geo_coordinates\": \"36.1706, -115.1372\"\n      }\n    ],\n    \"itinerary\": [\n      {\n        \"day\": \"Day 1\",\n        \"activities\": [\n          {\n            \"time\": \"Morning (9:00 AM - 12:00 PM)\",\n            \"activity\": \"Explore Fremont Street Experience\",\n            \"description\": \"Walk the pedestrian-friendly Fremont Street, enjoy the vibrant atmosphere, see the light show, and check out the street performers.\"\n          },\n          {\n            \"time\": \"Afternoon (12:00 PM - 4:00 PM)\",\n            \"activity\": \"Lunch at a local diner or food court\",\n            \"description\": \"Enjoy affordable and delicious food at one of the many options on Fremont Street.\"\n          },\n          {\n            \"time\": \"Afternoon (4:00 PM - 7:00 PM)\",\n            \"activity\": \"Visit the Neon Museum\",\n            \"description\": \"Experience a fascinating collection of historic neon signs from Las Vegas's past. (Tickets: $20 per person)\"\n          },\n          {\n            \"time\": \"Evening (7:00 PM - 10:00 PM)\",\n            \"activity\": \"Dinner at a cheap buffet\",\n            \"description\": \"Enjoy a delicious and affordable buffet at one of the many casinos on Fremont Street.\"\n          }\n        ]\n      },\n      {\n        \"day\": \"Day 2\",\n        \"activities\": [\n          {\n            \"time\": \"Morning (9:00 AM - 12:00 PM)\",\n            \"activity\": \"Free walking tour of the Strip\",\n            \"description\": \"Join a free walking tour to learn about the history and highlights of the Las Vegas Strip.\"\n          },\n          {\n            \"time\": \"Afternoon (12:00 PM - 4:00 PM)\",\n            \"activity\": \"Visit the Bellagio Conservatory & Botanical Garden\",\n            \"description\": \"Admire the beautiful and ever-changing floral displays at the Bellagio.\"\n          },\n          {\n            \"time\": \"Afternoon (4:00 PM - 7:00 PM)\",\n            \"activity\": \"Explore the Venetian and The Palazzo\",\n            \"description\": \"Enjoy the luxurious atmosphere, browse the shops, and admire the architecture.\"\n          },\n          {\n            \"time\": \"Evening (7:00 PM - 10:00 PM)\",\n            \"activity\": \"Dinner at a casual restaurant on the Strip\",\n            \"description\": \"Enjoy a nice meal at a more affordable restaurant on the Strip.\"\n          }\n        ]\n      },\n      {\n        \"day\": \"Day 3\",\n        \"activities\": [\n          {\n            \"time\": \"Morning (9:00 AM - 12:00 PM)\",\n            \"activity\": \"Visit the LINQ Promenade\",\n            \"description\": \"Enjoy shopping, dining, and entertainment at the LINQ Promenade. Take a ride on the High Roller Observation Wheel for stunning views (Tickets: $35 per person).\"\n          },\n          {\n            \"time\": \"Afternoon (12:00 PM - 4:00 PM)\",\n            \"activity\": \"Explore the Strip's free attractions\",\n            \"description\": \"Visit the Fountains of Bellagio, the Mirage Volcano, or the Sirens of TI.\"\n          },\n          {\n            \"time\": \"Afternoon (4:00 PM - 7:00 PM)\",\n            \"activity\": \"Enjoy a happy hour at a casino bar\",\n            \"description\": \"Take advantage of happy hour specials at a casino bar on the Strip.\"\n          },\n          {\n            \"time\": \"Evening (7:00 PM - 10:00 PM)\",\n            \"activity\": \"See a free show on the Strip\",\n            \"description\": \"Enjoy a free show at one of the many casinos on the Strip, like the Bellagio Fountains or the Mirage Volcano.\"\n          }\n        ]\n      }\n    ]\n  }\n}\n```\n\n**Notes:**\n\n* **Hotel Prices:**  The prices listed are estimates and can vary depending on the season and availability. \n* **Ticket Prices:** The ticket prices provided are also estimates and can vary. Check official websites for the latest prices.\n* **Food and Drinks:** You can find plenty of affordable dining options in Las Vegas. Look for happy hour specials, food courts, and local restaurants.\n* **Transportation:** Use public transportation (the RTC bus system) or ride-sharing services like Uber or Lyft to save on transportation costs.\n* **Free Attractions:**  Take advantage of the numerous free attractions available in Las Vegas, including the Bellagio Conservatory, the Fountains of Bellagio, and the Mirage Volcano.\n* **Adjust Activities:**  Feel free to adjust the itinerary to suit your interests and preferences.\n"},
          ],
        },
      ],
    });
