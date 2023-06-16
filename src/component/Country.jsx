import Image from "./Image";
import Heading from "./Heading";

const Conutry = (props) => {
  const {
    name,
    area,
    capital,
    currencies,
    coatOfArms,
    flags,
    population,
    region,
  } = props?.selectedCountry;

  const currencyArr = Object.entries(currencies);

  return (
    <div className="country-container">
      <div className="image-Container">
        <Image image={coatOfArms?.png} />
        <Image image={flags?.png} />
      </div>

      <div className="details">
        <h1>Country Name : {name?.common}</h1>
        <Heading name="Capital" heading={capital} />
        <Heading name="Area" heading={area} />
        <Heading name="Population" heading={population} />
        <Heading name="Region" heading={region} />
        <p>
          currencies :{currencyArr[0][1].symbol} {currencyArr[0][1].name}
        </p>
      </div>
    </div>
  );
};

export default Conutry;
