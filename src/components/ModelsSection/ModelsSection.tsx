import React from 'react';

interface ModelsSectionProps {
  headerContent: string;
  models: { name: string; slug: string }[];
  prefix?: string;
}
const ModelsSection: React.FC<ModelsSectionProps> = ({ headerContent, models, prefix = '' }) => {
  return (
    <section>
      <h2 className="text-center text-3xl font-bold m-5">{headerContent}</h2>
      <div className="md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 relative group">
        {models.map((model, index) => (
          <div
            key={index}
            className="p-4 bg-gray-200 rounded-md transition-transform duration-300 transform hover:scale-105 hover:bg-gray-300 "
          >
            <a href={model.slug} className="text-center mt-2 font-bold">
              {model.name}
            </a>
          </div>
        ))}
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-8 mt-8">Nie znalazłeś swojego modelu?</h3>
        <a href="tel:+48730889759">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
            Zadzwoń, chętnie pomożemy: +48 730 889 759
          </button>
        </a>
      </div>
    </section>
  );
};

export default ModelsSection;
