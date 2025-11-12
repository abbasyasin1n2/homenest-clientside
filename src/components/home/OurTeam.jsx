import { Card, CardContent } from '@/components/ui/card';

const OurTeam = () => {
  const teamMembers = [
    {
      name: 'Mark Taylor',
      role: 'Co-ordinator',
      image: '/staticassets/ourteam-member1.jpg',
    },
    {
      name: 'Melugin Roy',
      role: 'Construction',
      image: '/staticassets/ourteam-member2.jpg',
    },
    {
      name: 'David Hardson',
      role: 'CEO, Central Radio',
      image: '/staticassets/ourteam-member3.jpg',
    },
    {
      name: 'Sinthiya Doe',
      role: 'SR',
      image: '/staticassets/ourteam-member4.png',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Team</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            HomeNest dynamic team provided trustful services for all rent and sell related peoples in the city.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl bg-white"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <div className="h-72 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                </div>

                <div className="px-6 pb-6 -mt-10 relative">
                  <div className="bg-white rounded-2xl px-4 py-5 text-center shadow-lg">
                    <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold mb-3">
                      {member.role}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-sm text-gray-500">
                      Delivering trusted real estate services across Bangladesh
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;

