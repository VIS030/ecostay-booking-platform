import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const team = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Co-founder',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80',
    bio: 'Former sustainable tourism researcher with a passion for community-led travel.',
  },
  {
    name: 'Marcus Webb',
    role: 'CTO & Co-founder',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80',
    bio: 'Tech leader building platforms that connect travelers with verified eco-stays.',
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Sustainability',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80',
    bio: 'Environmental scientist ensuring every listing meets our eco standards.',
  },
];

const stats = [
  { value: '2,000+', label: 'Eco stays' },
  { value: '45', label: 'Countries' },
  { value: '50K+', label: 'Happy travelers' },
  { value: '100%', label: 'Carbon offset' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80"
            alt="Nature landscape"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/60" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <h1 className="font-display max-w-3xl text-4xl font-bold text-white sm:text-5xl">
            Travel beautifully. Tread lightly.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-stone-200">
            EcoStay is on a mission to make sustainable travel accessible, delightful, and
            trustworthy — connecting conscious travelers with verified eco-friendly homestays worldwide.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-stone-200 bg-white py-16 dark:border-stone-800 dark:bg-stone-900">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-brand-600 dark:text-brand-400">{stat.value}</p>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-semibold text-stone-900 dark:text-stone-100">
              Our mission
            </h2>
            <p className="mt-4 leading-relaxed text-stone-600 dark:text-stone-400">
              Tourism can be a force for good — protecting ecosystems, supporting local communities,
              and creating meaningful connections between people and places. We built EcoStay because
              finding genuinely sustainable accommodations was too hard.
            </p>
            <p className="mt-4 leading-relaxed text-stone-600 dark:text-stone-400">
              Every property on our platform undergoes a rigorous verification process. We assess
              energy use, waste management, water conservation, community impact, and biodiversity
              protection — so you can book with confidence.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80"
            alt="Scenic valley"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* Sustainability */}
      <section id="sustainability" className="bg-brand-50 py-20 dark:bg-brand-950/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-semibold text-stone-900 dark:text-stone-100">
              Our sustainability commitment
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Verified listings',
                desc: 'Every host completes our eco-certification checklist before going live on the platform.',
              },
              {
                title: 'Carbon neutrality',
                desc: 'We offset 100% of booking emissions through verified reforestation and renewable energy projects.',
              },
              {
                title: 'Community first',
                desc: 'A portion of every booking supports local conservation and community development initiatives.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-6 shadow-sm dark:bg-stone-900"
              >
                <h3 className="font-semibold text-stone-900 dark:text-stone-100">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-semibold text-stone-900 dark:text-stone-100">
            Meet the team
          </h2>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Passionate travelers and technologists building the future of eco-tourism
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <img
                src={member.image}
                alt={member.name}
                className="mx-auto h-32 w-32 rounded-2xl object-cover shadow-md"
              />
              <h3 className="mt-4 font-semibold text-stone-900 dark:text-stone-100">{member.name}</h3>
              <p className="text-sm text-brand-600 dark:text-brand-400">{member.role}</p>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-stone-900 px-8 py-16 text-center dark:bg-stone-800">
          <h2 className="font-display text-3xl font-semibold text-white">Get in touch</h2>
          <p className="mx-auto mt-4 max-w-lg text-stone-400">
            Have questions about EcoStay or want to list your eco-friendly property? We&apos;d love to hear from you.
          </p>
          <p className="mt-4 text-brand-400">hello@ecostay.com</p>
          <Link to="/listings" className="mt-8 inline-block">
            <Button size="lg">Start exploring</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
