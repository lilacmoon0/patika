const data = require("../../assets/data.json");

const resolvers = {
  Query: {
    countries: () => data.countries,
    country: (parent, args) => {
      return data.countries.find((country) => country.code === args.code);
    },
    continents: () => data.continents,
    continent: (parent, args) => {
      return data.continents.find((continent) => continent.code === args.code);
    },
    languages: () => data.languages,
    language: (parent, args) => {
      return data.languages.find((language) => language.code === args.code);
    },
  },

  Country: {
    continent: (parent) => {
      return data.continents.find(
        (continent) => continent.code === parent.continent_id
      );
    },
    languages: (parent) => {
      return parent.language_ids
        .map((id) => data.languages.find((language) => language.code === id))
        .filter(Boolean);
    },
  },

  Continent: {
    countries: (parent) => {
      return data.countries.filter(
        (country) => country.continent_id === parent.code
      );
    },
  },
};

module.exports = resolvers;
