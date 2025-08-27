import "./flow-attorney-card.js";

export default {
  title: "Components/Attorney Card",
  component: "flow-attorney-card",
  parameters: {
    docs: {
      description: {
        component:
          "A flip card component for displaying attorney information with a front side showing basic details and a back side with detailed biography, education, and credentials.",
      },
    },
  },
  argTypes: {
    name: {
      control: "text",
      description: "Attorney name",
    },
    email: {
      control: "text",
      description: "Attorney email address",
    },
    image: {
      control: "text",
      description: "Attorney profile image URL",
    },
    imageAlt: {
      control: "text",
      description: "Alt text for attorney image",
    },
    imageClass: {
      control: "text",
      description: "Additional CSS class for image positioning",
    },
    specialties: {
      control: "object",
      description: "Array of attorney specialties",
    },
    education: {
      control: "object",
      description: "Array of education items",
    },
    memberships: {
      control: "object",
      description: "Array of professional memberships",
    },
    admissions: {
      control: "object",
      description: "Array of bar admissions",
    },
    biography: {
      control: "text",
      description: "Attorney biography text",
    },
  },
};

const Template = (args) => {
  const card = document.createElement("flow-attorney-card");
  Object.keys(args).forEach((key) => {
    card[key] = args[key];
  });
  return card;
};

export const RoxieHarper = Template.bind({});
RoxieHarper.args = {
  name: "Roxie Harper",
  email: "roxie@harpercats.law",
  image: "./images/roxie_cat.jpeg",
  imageAlt: "Roxie Harper Profile",
  imageClass: "roxie",
  specialties: [
    "Corporate Law",
    "Personal Injury",
    "Family Law",
    "Estate Plans",
    "Guardianships",
    "Litigation",
    "Collections",
  ],
  education: [
    "J.D., Harvard Law School, magna cum laude (2018)",
    "B.A., Political Science, Yale University, summa cum laude (2015)",
    "Certificate in Corporate Finance, Wharton School (2019)",
  ],
  memberships: [
    "American Bar Association",
    "State Bar of California",
    "Los Angeles County Bar Association",
    "American Association for Justice",
    "National Association of Criminal Defense Lawyers",
  ],
  admissions: [
    "California State Bar (2018)",
    "U.S. District Court, Central District of California (2019)",
    "U.S. Court of Appeals, Ninth Circuit (2020)",
  ],
  biography:
    "Roxie Harper is a dedicated attorney with over 6 years of experience in corporate law and personal injury cases. She has successfully represented clients in complex litigation matters, securing millions in settlements and verdicts. Roxie is known for her meticulous attention to detail and aggressive advocacy for her clients. When not practicing law, she enjoys hiking with her rescue cats and volunteering at local animal shelters.",
};

export const ShadowHarper = Template.bind({});
ShadowHarper.args = {
  name: "Shadow Harper",
  email: "shadow@harpercats.law",
  image: "./images/shadow_cat.jpeg",
  imageAlt: "Shadow Harper Profile",
  imageClass: "shadow",
  specialties: [
    "Elder Law",
    "Business Law",
    "Real Estate",
    "Conservatorships",
    "Guardianships",
    "Litigation",
    "Collections",
  ],
  education: [
    "J.D., Stanford Law School, Order of the Coif (2015)",
    "LL.M., Tax Law, New York University (2016)",
    "B.S., Business Administration, UC Berkeley, Phi Beta Kappa (2012)",
  ],
  memberships: [
    "American Bar Association",
    "National Academy of Elder Law Attorneys",
    "California Association of Business Trial Lawyers",
    "Real Property Section of the State Bar",
    "Estate Planning Council of Los Angeles",
  ],
  admissions: [
    "California State Bar (2015)",
    "Nevada State Bar (2017)",
    "U.S. District Court, Northern District of California (2016)",
    "U.S. Tax Court (2017)",
  ],
  biography:
    "Shadow Harper specializes in elder law and estate planning with over 8 years of experience protecting seniors and their families. She has helped hundreds of families navigate complex Medicaid planning, guardianship proceedings, and estate administration. Shadow is particularly passionate about advocating for vulnerable adults and has been recognized by the National Academy of Elder Law Attorneys for her outstanding service. She frequently speaks at continuing education seminars and community workshops.",
};

export const MinimalCard = Template.bind({});
MinimalCard.args = {
  name: "John Doe",
  email: "john.doe@example.com",
  image: "https://via.placeholder.com/144x144/2563eb/ffffff?text=JD",
  imageAlt: "John Doe Profile",
  specialties: ["Corporate Law", "Litigation"],
  education: ["J.D., Local Law School (2020)"],
  memberships: ["State Bar Association"],
  admissions: ["State Bar (2020)"],
  biography: "A brief biography of the attorney.",
};

export const InteractiveDemo = () => {
  const container = document.createElement("div");
  container.style.cssText = `
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  `;

  const roxieCard = Template(RoxieHarper.args);
  const shadowCard = Template(ShadowHarper.args);

  // Add event listeners for demonstration (development only)
  if (typeof import.meta !== "undefined" && import.meta.env?.DEV) {
    roxieCard.addEventListener("card-flip", (e) => {
      console.log("Roxie card flipped:", e.detail);
    });

    shadowCard.addEventListener("card-flip", (e) => {
      console.log("Shadow card flipped:", e.detail);
    });

    roxieCard.addEventListener("specialty-click", (e) => {
      console.log("Specialty clicked on Roxie card:", e.detail);
    });

    shadowCard.addEventListener("specialty-click", (e) => {
      console.log("Specialty clicked on Shadow card:", e.detail);
    });
  }

  container.appendChild(roxieCard);
  container.appendChild(shadowCard);

  return container;
};

InteractiveDemo.parameters = {
  docs: {
    description: {
      story:
        "Interactive demonstration showing two attorney cards side by side with event logging. Click the cards to flip them, or click specialty tags to trigger navigation events.",
    },
  },
};
