import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function AboutPage() {
  return (
    <>
      <section className="relative h-[420px]">
        <img src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=1600&q=85" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-12 md:px-10">
          <h1 className="max-w-xl text-4xl font-bold text-white md:text-5xl">About EcoStay</h1>
          <p className="mt-3 max-w-lg text-lg text-white/90">The trusted platform for booking verified eco-friendly homestays worldwide.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 py-16 md:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-[#222222]">Our story</h2>
            <p className="mt-4 leading-7 text-[#717171]">
              EcoStay connects travelers with sustainable homestays — from alpine chalets to beach bungalows.
              Every listing is verified for eco practices so you can book with confidence.
            </p>
            <p className="mt-4 leading-7 text-[#717171]">
              We offset 100% of booking emissions and support local conservation projects in every region we operate.
            </p>
          </div>
          <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=85" alt="" className="rounded-xl object-cover shadow-lg" />
        </div>
      </section>

      <section id="sustainability" className="bg-[#f7f7f7] py-16">
        <div className="mx-auto max-w-[1120px] px-6 md:px-10">
          <h2 className="text-2xl font-semibold text-[#222222]">Why travelers choose us</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { title: 'Verified listings', desc: 'Every property passes our sustainability checklist.' },
              { title: 'Best price guarantee', desc: 'Find a lower price? We match it on select stays.' },
              { title: '24/7 support', desc: 'Real humans ready to help before and during your trip.' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-[#dddddd] bg-white p-6">
                <h3 className="font-semibold text-[#222222]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#717171]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-[1120px] px-6 py-16 md:px-10">
        <div className="rounded-xl bg-[#222222] px-8 py-14 text-center text-white">
          <h2 className="text-2xl font-semibold">Questions? We&apos;re here to help.</h2>
          <p className="mt-2 text-white/70">hello@ecostay.com</p>
          <Link to="/listings" className="mt-6 inline-block">
            <Button variant="primary">Browse stays</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
