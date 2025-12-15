export default function ContactUs() {
  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Contact Us
        </h2>

        <form className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="input input-bordered"
          />
          <textarea
            placeholder="Your Message"
            className="textarea textarea-bordered"
          ></textarea>

          <button className="btn btn-primary w-full">
            Send Message
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Or call us at: <span className="font-semibold">+880 1234 567890</span>
        </p>
      </div>
    </section>
  );
}
