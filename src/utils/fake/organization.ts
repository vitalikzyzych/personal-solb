import { IOrganization, IOrganizationProject } from "@/store/organization";

const popularCountries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Australia",
  "Japan",
  "China",
  "India",
  "Brazil",
  "Mexico",
  "Russia",
  "South Korea",
  "South Africa",
  "Netherlands",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Switzerland",
  "Austria",
  "Belgium",
  "Ireland",
  "New Zealand",
  "Portugal",
  "Argentina",
  "Chile",
  "Colombia",
  "Thailand",
  "Vietnam",
  "Indonesia",
  "Malaysia",
  "Philippines",
  "Singapore",
  "United Arab Emirates",
  "Saudi Arabia",
  "Turkey",
  "Egypt",
  "Nigeria",
];

export const generateOrganizations = (count: number): IOrganization[] => {
  const organizations: IOrganization[] = [];

  for (let i = 0; i < count; i++) {
    const randomCountry =
      popularCountries[Math.floor(Math.random() * popularCountries.length)];
    const randomName = `Organization ${i + 1}`;
    const randomId = crypto.randomUUID(); // Use crypto for unique ID generation

    organizations.push({
      id: randomId,
      name: randomName,
      location: randomCountry,
    });
  }

  return organizations;
};

export const generateOrganizationProject = (
  count: number
): IOrganizationProject[] => {
  const organizations: IOrganizationProject[] = [];

  for (let i = 0; i < count; i++) {
    const randomCountry =
      popularCountries[Math.floor(Math.random() * popularCountries.length)];
    const randomName = `Project ${i + 1}`;
    const randomId = crypto.randomUUID(); // Use crypto for unique ID generation

    organizations.push({
      id: randomId,
      name: randomName,
      location: popularCountries[1],
    });
  }

  return organizations;
};
