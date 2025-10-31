function Team() {
  const team = [
    {
      name: "SBN Richard Calver",
      rank: "4th Dan Black Belt",
      image: "🥋"
    },
    {
      name: "KSN Katie Calver",
      rank: "2nd Dan Black Belt",
      image: "🥊"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Meet Our Team</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {team.map((member, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition">
            <div className="text-6xl mb-4">{member.image}</div>
            <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
            <p className="text-blue-600 font-semibold mb-2">{member.rank}</p>
            <p className="text-gray-600">{member.specialty}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
