export const SelectTravelList = [
    {
        id:1,
        title:'Just Me',
        desc:'A sole traveles in exploration',
        icon:'✈️',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two traveles in tandem',
        icon:'🥂',
        people:'2 People'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adv',
        icon:'🏠',
        people:'3 to 5 People'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekers',
        icon:'⛵',
        people:'5 to 10 People'
    }
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💵'
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰'
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:'💸'
    }
]

export const AI_PROMPT = 'Generate a travel plan for the location: {location}, for {totalDays} days for {traveler} with a {budget} budget. Provide a list of hotel options that includes the hotel name, hotel address, price, and geo coordinates. Ensure that the hotel image URLs feature high-quality, appealing images of the hotels, along with their ratings and descriptions. Additionally, suggest an itinerary for each location that includes the place name, place details, and place image URLs that showcase high-quality, attractive images of the tourist spots. Include the geo coordinates, ticket pricing, time, ratings, and time to travel each of the locations. Organize the itinerary by each day for {totalDays}, highlighting the best times to visit each place. Give the result only in valid JSON format.'