import { useMemo } from 'react';

// import featured1 from '../../assets/images/featured-guides/image-1.png';
// import featured2 from '../../assets/images/featured-guides/image-2.png';
// import featured3 from '../../assets/images/featured-guides/image-3.png';
// import featured4 from '../../assets/images/featured-guides/image-4.png';
// import featured5 from '../../assets/images/featured-guides/image-5.png';
// import featured6 from '../../assets/images/featured-guides/image-6.png';
import { useGetGuidesQuery } from '../../redux/features/guide/guideApi';

import { FeaturedGuideCard } from './components/FeaturedGuideCard';

// export const FEATURED_GUIDES_DATA: GuideDataDb[] = [
//   {
//     _id: '0293fb39-09c3-5f28-9b35-91af8f9e244c',
//     uid: 'fury-warrior-pve-guide-61',
//     title: 'Fury warrior pve guide 61',
//     shortDescription:
//       'Welcome to the Dragonflight Fury Warrior guide, crafted exclusively for warriors seeking to unleash their fiery',
//     author: 'Nurseos',
//     publishDate: '2024-02-09T13:46:35.562Z',
//     imageUrl: featured1,
//     isFeatured: true,
//     details: `<h1>hello world</h1>
//     <div>another hello!</div>`,
//   },
//   {
//     _id: '0a51e499-2e3f-5d3f-9d57-f64917451afe',
//     uid: 'fury-warrior-pve-guide-63',
//     title: 'Fury warrior pve guide 63',
//     shortDescription:
//       'Welcome to the Dragonflight Fury Warrior guide, crafted exclusively for warriors seeking to unleash their fiery',
//     author: 'Nurseos',
//     publishDate: '19 Jun 2023',
//     imageUrl: featured2,
//     isFeatured: true,
//     details: `<h1>hello world</h1>
//     <div>another hello!</div>
//     `,
//   },
//   {
//     _id: 'addd5f2b-5a0f-5111-9c9d-912c2a9ff1a1',
//     uid: 'fury-warrior-pve-guide-97',
//     title: 'Fury warrior pve guide 97',
//     shortDescription:
//       'Welcome to the Dragonflight Fury Warrior guide, crafted exclusively for warriors seeking to unleash their fiery',
//     author: 'Nurseos',
//     publishDate: '19 Jun 2023',
//     imageUrl: featured3,
//     isFeatured: true,
//     details: `<h1>hello world</h1>
//     <div>another hello!</div>
//     `,
//   },
//   {
//     _id: 'd0135d4a-c66f-5060-bcf1-3798b0893794',
//     uid: 'fury-warrior-pve-guide-64',
//     title: 'Fury warrior pve guide 64',
//     shortDescription:
//       'Welcome to the Dragonflight Fury Warrior guide, crafted exclusively for warriors seeking to unleash their fiery',
//     author: 'Nurseos',
//     publishDate: '19 Jun 2023',
//     imageUrl: featured4,
//     isFeatured: true,
//     details: `<h1>hello world</h1>
//     <div>another hello!</div>
//     `,
//   },
//   {
//     _id: '31edec59-9394-5258-8469-d5fb1417f53c',
//     uid: 'fury-warrior-pve-guide-82',
//     title: 'Fury warrior pve guide 82',
//     shortDescription:
//       'Welcome to the Dragonflight Fury Warrior guide, crafted exclusively for warriors seeking to unleash their fiery',
//     author: 'Nurseos',
//     publishDate: '19 Jun 2023',
//     imageUrl: featured5,
//     isFeatured: true,
//     details: `<h1>hello world</h1>
//     <div>another hello!</div>
//     `,
//   },
//   {
//     _id: '88825835-28ff-5a93-903e-fdc391229357',
//     uid: 'fury-warrior-pve-guide-43',
//     title: 'Fury warrior pve guide 43',
//     shortDescription:
//       'Welcome to the Dragonflight Fury Warrior guide, crafted exclusively for warriors seeking to unleash their fiery',
//     author: 'Nurseos',
//     publishDate: '19 Jun 2023',
//     imageUrl: featured6,
//     isFeatured: true,
//     details: `<h1>hello world</h1>
//     <div>another hello!</div>
//     `,
//   },
// ];
export const FeaturedGuides = () => {
  const featuredGuidesParams = new URLSearchParams({
    isFeatured: 'true',
  });
  const { data: featuredGuidesRes } = useGetGuidesQuery(featuredGuidesParams.toString(), {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const featuredGuides = useMemo(() => featuredGuidesRes?.data || [], [featuredGuidesRes]);
  return (
    <section className='py-7 xl:py-8 bg-brand-black-100 relative isolate z-0 overflow-hidden'>
      <div className='fb-container'>
        <div className='flex flex-col  gap-9 xl:gap-[3.75rem]'>
          <h2 className='text-center font-bold font-tti-bold text-[clamp(1.5rem,4vw,2.5rem)] leading-tight capitalize text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))]  from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient'>
            Featured Guides
          </h2>
          <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8 justify-center items-center'>
            {featuredGuides?.map((guide) => <FeaturedGuideCard key={guide._id} card={guide} />)}
          </div>
        </div>
      </div>
      {/* <figure className="absolute -z-10 w-[28rem] aspect-square -right-64 bottom-40 blur-[6rem] rounded-circle bg-brand-blue-550/10" /> */}
    </section>
  );
};
