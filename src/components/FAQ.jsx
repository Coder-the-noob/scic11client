import React from "react";

const FAQ = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10" data-aos="fade-up">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <div
            className="collapse collapse-arrow bg-base-200"
            data-aos="fade-up"
          >
            <input type="checkbox" />
            <div className="collapse-title font-medium">
              Who can donate blood?
            </div>
            <div className="collapse-content">
              <p>
                Any healthy person aged 18–60 can donate blood following medical
                guidelines.
              </p>
            </div>
          </div>

          <div
            className="collapse collapse-arrow bg-base-200"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <input type="checkbox" />
            <div className="collapse-title font-medium">
              How often can I donate blood?
            </div>
            <div className="collapse-content">
              <p>
                A person can donate blood every 3–4 months depending on health
                condition.
              </p>
            </div>
          </div>

          <div
            className="collapse collapse-arrow bg-base-200"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <input type="checkbox" />
            <div className="collapse-title font-medium">
              Is blood donation safe?
            </div>
            <div className="collapse-content">
              <p>
                Yes, blood donation is completely safe when done through
                certified organizations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
