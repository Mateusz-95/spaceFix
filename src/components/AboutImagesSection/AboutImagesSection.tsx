import React from 'react';

const AboutImagesSection = () => {
  return (
    <section className="flex gap-4 m-10">
      <div className="flex-1 flex items-center">
        <img
          alt="unplash-image-1"
          src="../../../public/images/aboutUnplash1.png"
          className="h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex-1 flex items-center">
        <img
          alt="unplash-image-2"
          src="../../../public/images/aboutUnplash2.png"
          className="h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex-1 flex items-center">
        <img
          alt="unplash-image-3"
          src="../../../public/images/aboutUnplash3.png"
          className="h-full object-cover rounded-lg"
        />
      </div>
    </section>
  );
};

export default AboutImagesSection;
