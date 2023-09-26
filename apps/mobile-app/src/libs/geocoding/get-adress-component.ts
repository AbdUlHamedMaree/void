export const getAddressComponent = (
  response: Geocoder.GeocoderResponse,
  type: 'country' | 'locality' | 'sublocality' | 'neighborhood' | 'street_number',
  defaultValue = 'UNKNOWN'
) => {
  let country: string = '';

  for (const result of response.results) {
    for (const component of result.address_components) {
      if (component.types.includes(type)) {
        country = component.long_name;
        break;
      }
    }
    if (country) break;
  }

  return country || defaultValue;
};
