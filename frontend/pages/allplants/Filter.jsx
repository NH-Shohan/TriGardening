import Link from "next/link";

const Filter = () => {
  const categories = [
    "All Plants",
    "Indoor Plants",
    "Outdoor Plants",
    "Medicinal Plants",
    "Herbs",
  ];
  const topResearchers = ["Shohan", "Shagor", "Prosit", "Sumaya", "Nahim"];
  const settings = [
    {
      name: "General Settings",
      path: "/generalSettings",
    },
    {
      name: "Security Settings",
      path: "/securitySettings",
    },
    {
      name: "Privacy Policy",
      path: "/privacyPolicy",
    },
    {
      name: "Give Feedback",
      path: "/giveFeedback",
    },
  ];

  return (
    <div className="col-span-3">
      <div className="border border-gray-light p-6 rounded-2xl">
        <p className="body-small-bold text-primary mb-2">Category</p>
        <div className="ml-1">
          {categories.map((category, index) => (
            <button
              key={index}
              className="body-small hover:text-primary hover:bg-secondary hover:font-medium w-full text-left block py-1 pl-3 rounded-md"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="border border-gray-light p-6 rounded-2xl mt-6">
        <p className="body-small-bold text-primary mb-2">Top Researchers</p>
        <div className="ml-4">
          {topResearchers.map((topResearcher, index) => (
            <p key={index} className="body-small text-left block my-2">
              {topResearcher}
            </p>
          ))}
        </div>
      </div>

      <div className="border border-gray-light p-6 rounded-2xl mt-6">
        <p className="body-small-bold text-primary mb-2">Settings</p>
        <div className="ml-1">
          {settings.map((item, index) => (
            <button
              key={index}
              className="body-small hover:text-primary hover:bg-secondary hover:font-medium w-full text-left block py-1 pl-3 rounded-md"
            >
              <Link href={item.path}>{item.name}</Link>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
