
import React from "react";
import { Link } from "react-router-dom";

const CompaniesSection = () => {
  const companies = [
    {
      name: "Ethereum Foundation",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029"
    },
    {
      name: "Chainlink",
      logo: "https://cryptologos.cc/logos/chainlink-link-logo.svg?v=029"
    },
    {
      name: "Polygon",
      logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=029"
    },
    {
      name: "OpenSea",
      logo: "https://opensea.io/static/images/logos/opensea.svg"
    },
    {
      name: "Solana",
      logo: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=029"
    },
    {
      name: "Aave",
      logo: "https://cryptologos.cc/logos/aave-aave-logo.svg?v=029"
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
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placeholder.svg';
                  target.onerror = null; // Prevent infinite loop if fallback also fails
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
