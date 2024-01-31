import React from 'react';

const AboutImagesSection = () => {
  return (
    <section className="flex gap-4 m-10">
      <div className="flex-1 flex items-center">
        <img alt="unplash-image-1" src="/images/aboutUnplash1.png" className="h-full object-cover rounded-lg" />
      </div>
      <div className="flex-1 flex items-center">
        <img alt="unplash-image-2" src="/images/aboutUnplash2.png" className="h-full object-cover rounded-lg" />
      </div>
      <div className="flex-1 flex items-center">
        <img alt="unplash-image-3" src="/images/aboutUnplash3.png" className="h-full object-cover rounded-lg" />
      </div>
    </section>
  );
};

export default AboutImagesSection;
