function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold mb-8">About KSW Martial Arts</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <p className="text-gray-700 mb-4">
          KSW Martial Arts was founded in 2010 with a mission to provide high-quality martial arts 
          training to students of all ages and skill levels. Our school combines traditional values 
          with modern teaching methods to create a welcoming environment for everyone.
        </p>
        <p className="text-gray-700 mb-4">
          We believe that martial arts is more than just physical training—it's a path to personal 
          growth, discipline, and self-confidence. Our experienced instructors are dedicated to 
          helping each student reach their full potential.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-bold mb-4">Our Mission</h3>
          <p className="text-gray-700">
            To empower students through martial arts training, fostering discipline, respect, 
            and personal excellence in a supportive community environment.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-bold mb-4">Our Values</h3>
          <ul className="text-gray-700 space-y-2">
            <li>• Respect for all</li>
            <li>• Continuous improvement</li>
            <li>• Community focus</li>
            <li>• Excellence in teaching</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;