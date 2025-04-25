/* eslint-disable react/no-unescaped-entities */

import { v4 } from 'uuid';

import { selectCurrentOfferState } from '../../../redux/features/currentOffer/currentOfferSlice';
import { useAppSelector } from '../../../redux/hooks';
import { sanitizeHTML } from '../../../utils/DOMPurifier';

import '../css/dynamic-markup.css';

export const OfferDetails = () => {
  const { tags, description } = useAppSelector(selectCurrentOfferState).offer!;

  return (
    <div className='grid gap-5 xl:gap-8 max-w-full'>
      {/* tags */}
      <div className='flex flex-wrap gap-4'>
        {tags?.map((tag) => (
          <button
            key={v4()}
            type='button'
            className='capitalize inline-flex justify-center items-center bg-brand-primary-color-1/10 border border-brand-primary-color-1/50 text-brand-black-5 font-tti-medium font-medium text-[clamp(.75rem,3vw,.9375rem)] leading-none rounded-md py-4 px-6 hover:text-brand-primary-color-1 hover:border-brand-primary-color-1 transition-colors'
          >
            {tag?.label}
          </button>
        ))}
      </div>
      {/* details  */}
      <div
        data-dynamic-markup='offer-details'
        className='grid gap-0.5 font-tti-regular text-base xl:text-lg leading-none text-brand-black-20 font-normal'
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: sanitizeHTML(description || '') }}
      />
      {/* <div className="grid gap-8 font-tti-regular text-base xl:text-lg leading-none text-brand-black-20 font-normal"> */}
      {/* meta description */}
      {/* <div className="grid gap-5">
          <p className="leading-relaxed">
            Buy Dragonflight Leveling to get{' '}
            <strong className="text-brand-primary-color-1 font-normal">
              a character of the desired level
            </strong>{' '}
            quickly. WoW Experience boost is the best way to dive into the
            actual content avoiding the grinding part.
          </p>
          <p className="">
            WoW Dragonflight Leveling 1-70 boost will help you skip questing and
            searching for a suitable party for dungeon leveling.
          </p>
          <ul className="flex flex-col gap-1 list-disc list-inside pl-4">
            <li className="">
              We level characters using the most efficient ways and tactics to
              complete the order in even less than a day;
            </li>
            <li className="">
              We don&apos;t use any third-party software to decrease the
              completion time. Our pro players follow the best routes relying on
              their knowledge and skills to complete WoW Exp boost as fast as
              possible.
            </li>
          </ul>
          <p className="">
            Depending on the chosen option, you can complete Dragonflight 60-70
            leveling in several hours.
          </p>
          <p className="">
            WoW Dragonflight Leveling can be completed in 3 modes:
          </p>
          <ul className="flex flex-col gap-1 list-disc list-inside pl-4">
            <li className="">
              AFK Self-play — a much more convenient option for most players.
              You can complete 1-60 leveling in 5 hours and 60-70 leveling in 4
              hours. Also, you can turn on PvP-mode to earn even more
              experience;
            </li>
            <li className="">
              Piloted — classic mode, where you will share an account with one
              of our boosters. Remember, all the details will be discussed
              beforehand and the start time will be set according to your
              schedule;
            </li>
            <li className="">
              Remote control —{' '}
              <strong className="text-brand-primary-color-1 font-normal">
                if you don't want to share your account with our booster{' '}
              </strong>{' '}
              . We will connect to your computer and play remotely on yours
              using the Parsec app or TeamViewer. You'll need to install these
              apps in advance.
            </li>
          </ul>
        </div> */}
      {/* What you will get */}
      {/* <div className="grid gap-4">
          <h3 className="capitalize text-lg xl:text-xl text-brand-primary-color-1 ">
            What you will get
          </h3>
          <div className="h-px bg-[linear-gradient(293deg,var(--tw-gradient-stops))] to-brand-primary-color-1/30 from-brand-primary-color-1/5" />
          <ul className="flex flex-col gap-1 list-disc list-inside pl-4">
            <li className="">Desired lvl of your character;</li>
            <li className="text-brand-primary-color-1">
              Self-play, Remote control, and Piloted options;
            </li>
            <li className="">
              All gold, useful items, and resources, which your character will
              get during the leveling.
            </li>
          </ul>
        </div> */}
      {/* Additional Options */}
      {/* <div className="grid gap-4">
          <h3 className="capitalize text-lg xl:text-xl text-brand-primary-color-1 ">
            Additional Options
          </h3>
          <div className="h-px bg-[linear-gradient(293deg,var(--tw-gradient-stops))] to-brand-primary-color-1/30 from-brand-primary-color-1/5" />
          <ul className="flex flex-col gap-1 list-disc list-inside pl-4">
            <li className="">
              Mythic +17 key — weekly Mythic +17. A chance to get ilvl 428 ilvl
              gear;
            </li>
            <li className="">
              Aberrus Heroic plus Normal — get a chance to loot 415-444 ilvl
              loot from two raid runs;
            </li>
            <li className="">
              PvP Gear Farm — equip your character with Honor or Conquest PvP
              gear in each slot;
            </li>
            <li className="">
              Embers of Neltharion campaign — we'll complete the new patch 10.1
              storyline for your character;
            </li>
            <li className="">
              Dragonriding full progress — we'll collect all 64 Dragon glyphs to
              unlock all talents for your character;
            </li>
            <li className="">
              500,000 gold — we will send the gold to your account as we
              complete the main order.
            </li>
          </ul>
        </div> */}
      {/* Requirements */}
      {/* <div className="grid gap-4">
          <h3 className="capitalize text-lg xl:text-xl text-brand-primary-color-1 ">
            Requirements
          </h3>
          <div className="h-px bg-[linear-gradient(293deg,var(--tw-gradient-stops))] to-brand-primary-color-1/30 from-brand-primary-color-1/5" />
          <ul className="flex flex-col gap-1 list-disc list-inside pl-4">
            <li className="">Active WoW subscription.</li>
          </ul>
        </div> */}
      {/* How It Works */}
      {/* <div className="grid gap-4">
          <h3 className="capitalize text-lg xl:text-xl text-brand-primary-color-1 ">
            How It Works
          </h3>
          <div className="h-px bg-[linear-gradient(293deg,var(--tw-gradient-stops))] to-brand-primary-color-1/30 from-brand-primary-color-1/5" />
          <ul className="flex flex-col gap-1 list-disc list-inside pl-4">
            <li className="">
              We form a priority list based on the execution speed and time when
              the order was placed;
            </li>
            <li className="">
              We'll contact you in the live chat or via email. Ask any questions
              you have about wow leveling services;
            </li>
            <li className="">
              We’ll discuss the execution schedule beforehand and find the
              booster who fits it the best way;
            </li>
            <li className="">
              The booster will pilot your character during wow power leveling
              completion;
            </li>
            <li className="">
              Order will be completed during one session with the multiple
              dungeon runs;
            </li>
            <li className="">
              If it's your first character on account you'll get different
              storylines progress and achievements too;
            </li>
            <li className="">
              All valuable loot and gold our booster obtain during power
              leveling services wow will be yours;
            </li>
            <li className="">
              We will notify you about Dragonflight level boosting service
              completion;
            </li>
            <li className="">
              Enjoy the results! And do not forget to rate us on{' '}
              <Link
                to={ROUTER_PATH.ROOT}
                className="text-brand-primary-color-1 hover:underline"
              >
                Trustpilot
              </Link>
              .
            </li>
          </ul>
        </div> */}
      {/* </div> */}
    </div>
  );
};
