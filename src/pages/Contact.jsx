function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea 
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="How can we help you?"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Visit Us</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-gray-700">Address</h3>
              <p className="text-gray-600">123 Martial Arts Way<br/>Manchester, M1 1AA</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-700">Phone</h3>
              <p className="text-gray-600">0161 123 4567</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-700">Email</h3>
              <p className="text-gray-600">info@kswmartialarts.com</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-700">Hours</h3>
              <p className="text-gray-600">
                Monday - Friday: 6:00 PM - 9:00 PM<br/>
                Saturday: 10:00 AM - 2:00 PM<br/>
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
