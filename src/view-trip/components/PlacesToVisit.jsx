import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  const itinerary = trip?.tripData?.itinerary;

  // Convert itinerary object to an array of [day, details] pairs
  const itineraryArray = itinerary
    ? Object.entries(itinerary).sort(([a], [b]) => {
        // Extract the number from the day (e.g., 'day1' -> 1)
        const dayA = parseInt(a.replace('day', ''));
        const dayB = parseInt(b.replace('day', ''));
        return dayA - dayB;
      })
    : [];

  return (
    <div>
      <h2 className='font-bold text-lg mt-6'>Places to Visit</h2>

      <div>
        {itineraryArray.map(([day, details], index) => (
          <div key={index} className='mt-2'>
            
            {/* Display day title */}
            <h2 className='font-medium text-lg mt-[12px]'>{day.replace('day', 'Day ')} Plan</h2>

            <div className='grid md:grid-cols-2 gap-5'>
            {/* Iterate over places in the plan */}
            {details?.plan?.map((place, index) => (
              <div key={index} >
                <h2 className='font-medium text-sm text-orange-600'>{place.time}</h2>
                <PlaceCardItem place = {place} />
              </div>
            ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
