
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CompaniesSection = () => {
  const companies = [
    {
      name: "Ethereum",
      logo: "https://1000logos.net/wp-content/uploads/2023/01/Ethereum-logo.png"
    },
    {
      name: "Chainlink",
      logo: "https://s2.coinmarketcap.com/static/img/coins/200x200/1975.png"
    },
    {
      name: "OpenSea",
      logo: "https://storage.googleapis.com/opensea-static/Logos/OpenSea-Full-Logo%20(dark).png"
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-web3-primary to-web3-secondary bg-clip-text text-transparent mb-4">
            Top Companies Hiring
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join industry leaders and innovative startups in the Web3 space
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {companies.map((company, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link 
                to="/companies" 
                className="group flex items-center justify-center p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-24"
              >
                <div className="h-full flex items-center justify-center overflow-hidden">
                  <img 
                    src={company.logo} 
                    alt={`${company.name} logo`} 
                    className="h-12 object-contain group-hover:scale-110 transition-transform duration-300" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                      target.onerror = null; // Prevent infinite loop if fallback also fails
                      console.log(`Failed to load ${company.name} logo`);
                    }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-10 text-center">
          <Link 
            to="/companies" 
            className="inline-flex items-center justify-center text-web3-primary hover:text-web3-dark font-semibold transition-colors duration-300 group"
          >
            <span>View All Companies</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
