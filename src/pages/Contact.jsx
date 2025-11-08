function Contact() {
  return (
    <div className="bg-[#2e2e2e] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-white mb-4">Contact Us</h1>
          <div className="w-24 h-1 bg-[#ff6d00] mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">We'd love to hear from you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 border-2 border-[#3d3d3d]">
            <h2 className="text-3xl font-black mb-6 text-white">Get In Touch</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6d00] focus:border-transparent text-white placeholder-gray-500 transition"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6d00] focus:border-transparent text-white placeholder-gray-500 transition"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Phone Number</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6d00] focus:border-transparent text-white placeholder-gray-500 transition"
                  placeholder="07123456789"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Message</label>
                <textarea 
                  rows="5"
                  className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6d00] focus:border-transparent text-white placeholder-gray-500 transition resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-[#ff6d00] to-[#e66200] text-white py-4 rounded-xl hover:from-[#e66200] hover:to-[#ff6d00] hover:scale-105 transition-all duration-300 font-bold text-lg shadow-2xl"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 border-2 border-[#3d3d3d]">
            <h2 className="text-3xl font-black mb-6 text-white">Visit Us</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-[#ff6d00] pl-4">
                <h3 className="font-bold text-[#ff6d00] text-lg mb-2">Address</h3>
                <p className="text-gray-300 text-lg">
                  Unit 3A<br/>
                  3 Hempton Road<br/>
                  Fakenham<br/>
                  NR21 7LA
                </p>
              </div>

              <div className="border-l-4 border-[#ff6d00] pl-4">
                <h3 className="font-bold text-[#ff6d00] text-lg mb-2">Phone</h3>
                <p className="text-gray-300 text-lg">+44 7510 069519</p>
              </div>

              <div className="border-l-4 border-[#ff6d00] pl-4">
                <h3 className="font-bold text-[#ff6d00] text-lg mb-2">Email</h3>
                <p className="text-gray-300 text-lg">info@fakenhamma.com</p>
              </div>

              <div className="border-l-4 border-[#ff6d00] pl-4">
                <h3 className="font-bold text-[#ff6d00] text-lg mb-2">Training Days</h3>
                <p className="text-gray-300 text-lg">
                  Mondays<br/>
                  Tuesdays<br/>
                  Thursdays<br/>
                  Fridays<br/>
                  Sundays
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps Section */}
        <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 border-2 border-[#3d3d3d]">
          <h2 className="text-3xl font-black mb-6 text-white text-center">Find Us</h2>
          <div className="w-full h-[450px] rounded-xl overflow-hidden border-2 border-[#ff6d00]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7112.980941512454!2d0.843544212962091!3d52.82678971335359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d77900f6203aad%3A0xcd32542352a58b51!2s3%20Hempton%20Rd%2C%20Fakenham%20NR21%207LA%2C%20UK!5e1!3m2!1sen!2sno!4v1762624014665!5m2!1sen!2sno" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Fakenham Martial Arts Location"
            />
          </div>
          <p className="text-gray-400 text-center mt-4">
            <span className="text-[#ff6d00] font-semibold">📍 Unit 3A, 3 Hempton Road, Fakenham, NR21 7LA</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;