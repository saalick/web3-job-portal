
import React from "react";
import { Link } from "react-router-dom";

const CompaniesSection = () => {
  const companies = [
    {
      name: "Ethereum Foundation",
      logo: "https://ethereum.org/static/4f10d2777b2d14759feb01c65b2765f7/13c43/eth-diamond-purple-white.png"
    },
    {
      name: "Chainlink",
      logo: "https://assets-global.website-files.com/5f6b7190899f41fb70882d08/5f760a499b56c47b8fa74fbb_chainlink-logo.svg"
    },
    {
      name: "Polygon",
      logo: "https://polygon.technology/_nuxt/image/a7642c.svg"
    },
    {
      name: "OpenSea",
      logo: "https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.svg"
    },
    {
      name: "Solana",
      logo: "https://solana.com/_next/static/media/solanaLogo.74d35f7a.svg"
    },
    {
      name: "Aave",
      logo: "https://aave.com/aavelogo.svg"
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
