
import React from "react";
import { Link } from "react-router-dom";

const CompaniesSection = () => {
  const companies = [
    {
      name: "Ethereum",
      logo: "https://1000logos.net/wp-content/uploads/2023/01/Ethereum-logo.png"
    },
    {
      name: "Chainlink",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Chainlink_logo_blue.svg/1280px-Chainlink_logo_blue.svg.png"
    },
    {
      name: "OpenSea",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/OpenSea_logo.svg/1200px-OpenSea_logo.svg.png"
    },
    {
      name: "Solana",
      logo: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
    },
    {
      name: "Binance",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/640px-Binance_Logo.svg.png"
    },
    {
      name: "Tron",
      logo: "https://images.seeklogo.com/logo-png/39/2/tron-foundation-logo-png_seeklogo-394183.png"
    },
    {
      name: "OKX",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Logo-OKX.png"
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
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 items-center">
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
                  console.log(`Failed to load ${company.name} logo`);
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
