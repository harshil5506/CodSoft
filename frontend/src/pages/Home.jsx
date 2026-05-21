import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    url: "/shop?category=Apparel",
    image: "/images/apparel/allen_a-1.jpeg",
    label: "Apparel",
    kicker: "Training layers",
  },
  {
    url: "/shop?category=Supplements",
    image: "/images/supplements/muscleblaze_s-1.jpg",
    label: "Supplements",
    kicker: "Fuel and recovery",
  },
  {
    url: "/shop?category=Equipment",
    image: "/images/equipment/powermax_e-1.jpeg",
    label: "Equipment",
    kicker: "Home gym power",
  },
  {
    url: "/shop?category=Accessories",
    image: "/images/accessories/nikebag_a-1.jpeg",
    label: "Accessories",
    kicker: "Grip and support",
  },
];

const stats = [
  ["24/7", "Built for grind"],
  ["4", "Core categories"],
  ["100%", "Performance focus"],
];

const Home = () => {
  const rootRef = useRef(null);
  const heroImageRef = useRef(null);
  const heroContentRef = useRef(null);
  const categoryRefs = useRef([]);
  const stripRef = useRef(null);
  const signatureRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      const heroItems = heroContentRef.current?.querySelectorAll("[data-hero]");

      gsap.set(heroItems, { autoAlpha: 0, y: 34 });
      gsap.set("[data-float-tag]", { autoAlpha: 0, y: 18, scale: 0.94 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(
          heroImageRef.current,
          { scale: 1.12, autoAlpha: 0.72 },
          { scale: 1, autoAlpha: 1, duration: 1.4 },
        )
        .to(heroItems, { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.12 }, 0.18)
        .to(
          "[data-float-tag]",
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.12 },
          0.62,
        );

      gsap.to(heroImageRef.current, {
        yPercent: 9,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      categoryRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 58, rotateX: 8 },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 84%",
            },
          },
        );
      });

      gsap.to(stripRef.current, {
        xPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: stripRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        signatureRef.current,
        { autoAlpha: 0, y: 44 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: signatureRef.current,
            start: "top 82%",
          },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.04,
      y: -2,
      transition: { type: "spring", stiffness: 340, damping: 18 },
    },
    tap: { scale: 0.97 },
  };

  return (
    <div ref={rootRef} className="flex flex-col min-h-screen overflow-hidden">
      <section className="relative min-h-[86svh] md:min-h-[92vh] flex items-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/65 via-background/76 to-background z-10" />
          <img
            ref={heroImageRef}
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
            alt="Athlete training in a gym"
            className="h-full w-full object-cover opacity-60 grayscale"
          />
        </div>

        <div className="container-custom relative z-20 py-16 sm:py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)] gap-8 lg:gap-12 items-end">
            <div ref={heroContentRef} className="max-w-4xl">
              <motion.span
                data-hero
                className="inline-flex items-center border border-foreground/20 bg-background/70 px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest backdrop-blur"
              >
                New season performance essentials
              </motion.span>

              <h1
                data-hero
                className="mt-5 sm:mt-6 text-[clamp(3rem,16vw,8.5rem)] font-display font-bold uppercase leading-[0.86] tracking-tight"
              >
                Defy
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/75 to-muted-foreground">
                  Limits
                </span>
              </h1>

              <p
                data-hero
                className="mt-5 sm:mt-7 max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed"
              >
                Premium fitness apparel, equipment, and supplements engineered
                for athletes who train hard and move with intent.
              </p>

              <div
                data-hero
                className="mt-7 sm:mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <motion.div variants={buttonVariants} initial="initial" whileHover="hover" whileTap="tap">
                  <Link
                    to="/shop"
                    className="btn btn-primary w-full sm:w-auto uppercase font-bold tracking-widest"
                  >
                    Shop Collection
                  </Link>
                </motion.div>
                <motion.div variants={buttonVariants} initial="initial" whileHover="hover" whileTap="tap">
                  <Link
                    to="/categories"
                    className="btn btn-outline w-full sm:w-auto uppercase font-bold tracking-widest"
                  >
                    Explore Gear
                  </Link>
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-3">
              {stats.map(([value, label]) => (
                <motion.div
                  data-float-tag
                  key={label}
                  whileHover={{ y: -4 }}
                  className="border border-border bg-background/75 p-3 sm:p-4 backdrop-blur rounded-lg"
                >
                  <span className="block text-lg sm:text-2xl md:text-3xl font-display font-bold leading-none">
                    {value}
                  </span>
                  <span className="mt-1 block text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground font-bold">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-foreground text-background overflow-hidden border-y border-foreground">
        <div
          ref={stripRef}
          className="flex w-max items-center gap-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-display font-bold uppercase tracking-widest"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index} className="whitespace-nowrap">
              Train harder / recover smarter / move cleaner
            </span>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-card">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true, amount: 0.4 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-10 md:mb-12 gap-4"
          >
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-muted-foreground">
                Shop by mission
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter">
                Explore
              </h2>
            </div>
            <motion.div whileHover={{ x: 4 }}>
              <Link
                to="/categories"
                className="text-xs sm:text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors"
              >
                View All Categories
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.label}
                ref={(element) => {
                  categoryRefs.current[index] = element;
                }}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
                <Link
                  to={category.url}
                  className="group relative block h-[240px] sm:h-[300px] md:h-[340px] xl:h-[360px] overflow-hidden bg-muted rounded-lg border border-border"
                >
                  <motion.img
                    src={category.image}
                    alt={category.label}
                    className="absolute inset-0 w-full h-full object-cover grayscale transition-[filter,transform] duration-500 group-hover:grayscale-0"
                    whileHover={{ scale: 1.035 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
                  <div className="absolute inset-x-0 bottom-0 z-10 flex min-h-[45%] flex-col justify-end p-4 sm:p-5 md:p-6 text-white">
                    <span className="mb-2 text-[10px] sm:text-xs uppercase tracking-widest font-bold text-white/75">
                      {category.kicker}
                    </span>
                    <div className="flex items-end justify-between gap-3">
                      <h3 className="min-w-0 text-2xl sm:text-3xl xl:text-2xl 2xl:text-3xl font-display font-bold uppercase tracking-tighter leading-none">
                        {category.label}
                      </h3>
                      <span className="shrink-0 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/80 transition-transform group-hover:translate-x-1">
                        View
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 border-y border-border overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(90deg,#000_1px,transparent_1px),linear-gradient(#000_1px,transparent_1px)] bg-[size:48px_48px]" />
        <motion.div
          ref={signatureRef}
          className="container-custom relative grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-8 md:gap-12 items-center"
        >
          <div className="order-2 lg:order-1">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-muted-foreground">
              Signature collection
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter">
              Clean gear. Serious output.
            </h2>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Minimal silhouettes, durable training tools, and daily essentials
              built for repeat work without distraction.
            </p>
            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="mt-7 sm:mt-8"
            >
              <Link
                to="/shop?collection=signature"
                className="btn btn-primary uppercase font-bold tracking-widest"
              >
                View Lookbook
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="order-1 lg:order-2 relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted"
            whileHover={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
          >
            <img
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop"
              alt="Fitness equipment prepared for training"
              className="h-full w-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
