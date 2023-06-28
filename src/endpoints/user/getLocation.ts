import axios from '../../config/axios';
import { type CustomQuery } from '../../types/useQuery';

interface LocationData {
  country: string;
  countryName: string;
  region: string;
  city: string;
}

export default function getLocation(): CustomQuery<LocationData> {
  return {
    queryKey: ['location'],
    queryFn: async () => {
      const { data } = await axios.get<LocationData>('/user/location');
      return data;
    },
  };
}
