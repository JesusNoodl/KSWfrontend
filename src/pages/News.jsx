function News() {
  return (
    <div className="bg-[#2e2e2e] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-white mb-4">Latest News</h1>
          <div className="w-24 h-1 bg-[#ff6d00] mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Here is a list of our latest news aticles</p>
        </div>
      </div>
    </div>
  );
}

export default News;