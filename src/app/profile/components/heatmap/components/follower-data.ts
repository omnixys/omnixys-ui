import type { FollowerLocation } from '../CityHeatmap';

export const internationalFollowers: (FollowerLocation & {
  countryCode: string;
})[] = [
  { city: 'Berlin', lat: 52.52, lng: 13.405, count: 100, countryCode: 'DEU' },
  {
    city: 'Stuttgart',
    lat: 48.7758,
    lng: 9.1829,
    count: 25,
    countryCode: 'DEU',
  },
  {
    city: 'Karlsruhe',
    lat: 49.0069,
    lng: 8.4037,
    count: 15,
    countryCode: 'DEU',
  },
  { city: 'Paris', lat: 48.8566, lng: 2.3522, count: 80, countryCode: 'FRA' },
  {
    city: 'New York',
    lat: 40.7128,
    lng: -74.006,
    count: 60,
    countryCode: 'USA',
  },
  { city: 'Tokyo', lat: 35.6895, lng: 139.6917, count: 40, countryCode: 'JPN' },
  { city: 'London', lat: 51.5074, lng: -0.1278, count: 20, countryCode: 'GBR' },
  {
    city: 'Barcelona',
    lat: 41.3851,
    lng: 2.1734,
    count: 10,
    countryCode: 'ESP',
  },
  {
    city: 'Toronto',
    lat: 43.6532,
    lng: -79.3832,
    count: 5,
    countryCode: 'CAN',
  },
  {
    city: 'Bangkok',
    lat: 13.7563,
    lng: 100.5018,
    count: 2,
    countryCode: 'THA',
  },
  {
    city: 'Kapstadt',
    lat: -33.9249,
    lng: 18.4241,
    count: 1,
    countryCode: 'ZAF',
  },
  {
    city: 'São Paulo',
    lat: -23.5505,
    lng: -46.6333,
    count: 12,
    countryCode: 'BRA',
  }, // South America
  {
    city: 'Sydney',
    lat: -33.8688,
    lng: 151.2093,
    count: 7,
    countryCode: 'AUS',
  },
  {
    city: 'McMurdo Station',
    lat: -77.8419,
    lng: 166.6863,
    count: 1,
    countryCode: 'ATA',
  },
];
