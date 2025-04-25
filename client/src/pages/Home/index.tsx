import { createContext, ReactNode, useContext, useMemo, useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ExtendHead } from '../../components/ExtendHead';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import type { ErrorBoundaryResetHandler } from '../../error/utils';
import { BannerSlider } from './BannerSlider';
import { ClientReviews } from './ClientReviews';
import { FeaturedGames } from './FeaturedGames';
import { LatestGamesOffers } from './LatestGamesOffers';
import { WorkWithUsSection } from './WorkWithUs';
import { motion, useInView } from 'framer-motion';

interface HomeContextValue {
  // Add any context values you need
}
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeInLeftVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const fadeInRightVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

const scaleUpVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  variant?: 'up' | 'left' | 'right' | 'scale';
  delay?: number;
}

const HomeContext = createContext<HomeContextValue | undefined>(undefined);

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log('Resetting home page state:', details);
};
const AnimatedSection = ({
  children,
  className = '',
  variant = 'up',
  delay = 0,
}: AnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px',
    amount: 0.3, // טריגר האנימציה כשהאלמנט 30% גלוי
  });

  const variants = {
    up: fadeInUpVariants,
    left: fadeInLeftVariants,
    right: fadeInRightVariants,
    scale: scaleUpVariants,
  }[variant];

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
export const Home = () => {
  const homeContextValue = useMemo<HomeContextValue>(() => ({}), []);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <HomeContext.Provider value={homeContextValue}>
        <ExtendHead
          title='Home'
          description='Super Fast delivery. Always 24/7 support. Large stock of any kind of games and items on all servers.'
        />

        <main>
          <AnimatedSection variant='up'>
            <BannerSlider />
          </AnimatedSection>

          <section className='content-section'>
            <AnimatedSection variant='left' delay={0.2}>
              <FeaturedGames />
            </AnimatedSection>

            <AnimatedSection variant='right' delay={0.3}>
              <LatestGamesOffers />
            </AnimatedSection>
          </section>

          <section className='relative isolate z-0 overflow-hidden'>
            <AnimatedSection variant='scale' delay={0.2}>
              <ClientReviews />
            </AnimatedSection>

            <AnimatedSection variant='up' delay={0.4}>
              <WorkWithUsSection />
            </AnimatedSection>

            {/* Decorative background element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.3 }}
              className='absolute -z-10 w-80 h-[36rem] -rotate-12 -left-36 bottom-[10%]
                        blur-xl rounded-circle bg-[radial-gradient(50.26%_50.56%_at_49.58%_49.98%,
                        rgba(241,99,52,0.15)_0%,rgba(129,55,30,0.08)_42%,
                        rgba(11,18,23,0)_100%)]'
              aria-hidden='true'
            />
          </section>
        </main>
      </HomeContext.Provider>
    </ErrorBoundary>
  );
};

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error('useHomeContext must be used within a HomeContext.Provider');
  }
  return context;
};
