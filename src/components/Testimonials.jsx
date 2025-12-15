import React from "react";

const Testimonials = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">
          What People Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* testimonial 1 */}
          <div className="card bg-white shadow-lg" data-aos="fade-up">
            <div className="card-body">
              <p className="italic">
                “This platform helped me find a donor within hours. Truly
                lifesaving!”
              </p>
              <h3 className="mt-4 font-bold text-red-600">— Rahim Ahmed</h3>
            </div>
          </div>

          {/* testimonial 2 */}
          <div
            className="card bg-white shadow-lg"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <div className="card-body">
              <p className="italic">
                “Donating blood has never been this easy. Highly recommended.”
              </p>
              <h3 className="mt-4 font-bold text-red-600">— Nusrat Jahan</h3>
            </div>
          </div>

          {/* testimonial 3 */}
          <div
            className="card bg-white shadow-lg"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="card-body">
              <p className="italic">
                “A great initiative for humanity. The system is smooth and
                reliable.”
              </p>
              <h3 className="mt-4 font-bold text-red-600">— Tanvir Hasan</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
