
import React from "react";
import { Search, Briefcase, Check } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      id: 1,
      icon: <Search className="w-8 h-8 text-web3-primary" />,
      title: "Search Jobs",
      description: "Browse through hundreds of Web3 job openings from top blockchain companies and startups."
    },
    {
      id: 2,
      icon: <Briefcase className="w-8 h-8 text-web3-primary" />,
      title: "Apply with Ease",
      description: "Create your profile once and apply to multiple jobs with just a few clicks."
    },
    {
      id: 3,
      icon: <Check className="w-8 h-8 text-web3-primary" />,
      title: "Get Hired",
      description: "Connect with Web3 employers and start your journey in the blockchain ecosystem."
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Finding your next Web3 opportunity is simple with our streamlined process
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center">
              <div className="bg-web3-primary/10 rounded-full p-5 mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
