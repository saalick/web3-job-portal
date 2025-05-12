
import React from "react";
import { Link } from "react-router-dom";

const CompaniesSection = () => {
  const companies = [
    {
      name: "Ethereum Foundation",
      logo: "https://ethereum.org/static/a110735dade3f354a46fc2446cd52476/f3a29/eth-home-icon.webp"
    },
    {
      name: "Chainlink",
      logo: "https://cryptologos.cc/logos/chainlink-link-logo.png"
    },
    {
      name: "Polygon",
      logo: "https://cryptologos.cc/logos/polygon-matic-logo.png"
    },
    {
      name: "OpenSea",
      logo: "https://storage.googleapis.com/opensea-static/Logomark/OpenSea-Full-Logo%20(dark).png"
    },
    {
      name: "Solana",
      logo: "https://cryptologos.cc/logos/solana-sol-logo.png"
    },
    {
      name: "Aave",
      logo: "https://cryptologos.cc/logos/aave-aave-logo.png"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Companies Hiring</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join industry leaders and innovative startups in the Web3 space
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
          {companies.map((company, index) => (
            <Link 
              key={index} 
              to="/companies" 
              className="flex items-center justify-center p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <img 
                src={company.logo} 
                alt={`${company.name} logo`} 
                className="h-12 object-contain" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placeholder.svg';
                }}
              />
            </Link>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/companies" className="text-web3-primary hover:text-web3-dark font-semibold">
            View All Companies
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
