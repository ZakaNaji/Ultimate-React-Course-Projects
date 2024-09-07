import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";

export default function CountryList({ cities, isLoading }) {
  if (isLoading) {
    return <Spinner />;
  }
  if (!cities.length) {
    return <Message message="No cities found" />;
  }
  const countries = cities.reduce((acc, city) => {
    if (!acc.map((el) => el.country).includes(city.country)) {
      acc.push({ country: city.country, emoji: city.emoji });
    }
    return acc;
  }, []);
  return (
    <div className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </div>
  );
}
