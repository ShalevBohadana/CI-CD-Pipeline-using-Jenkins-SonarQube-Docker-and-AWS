// import { v4 } from 'uuid';

// import { CurrencySymbol } from '../../../components/ui/CurrencySymbol';
// import { Money } from '../../../components/ui/Money';
// import { selectSelectedRegion } from '../../../redux/features/cart/cartSlice';
// import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
// import { TDynamicFilterCommonPropsNested } from '../../CreateOffer/Main';

// import { OfferFilterInputBox } from './OfferFilterInputBox';

// type Props = {
//   payload: TDynamicFilterCommonPropsNested;
// };
// export const DynamicFilterOption = ({ payload }: Props) => {
//   const dispatch = useAppDispatch();
//   const selectedRegion = useAppSelector(selectSelectedRegion);

//   const { name, fee, children } = payload;

//   return (
//     <div className="flex flex-col gap-4 p-4 bg-brand-primary-color-1/[.04] rounded-[.25rem] select-none">
//       <h3 className="capitalize text-base leading-none font-medium font-oxanium text-brand-black-10">
//         {name}
//       </h3>
//       <div className="flex flex-col gap-2">
//         {children?.map((child) => {
//           const itemFee = child?.children?.find(
//             (item) => item?.name === selectedRegion
//           )?.fee;

//           return (
//             <div key={v4()} className="flex flex-wrap gap-3 py-1">
//               <OfferFilterInputBox
//                 label={isRegion ? child?.name?.toUpperCase() : child?.name}
//               >
//                 <input
//                   type="checkbox"
//                   value={isRegion ? child?.name : child?.fee}
//                   defaultChecked={
//                     isRegion && child?.name?.toLowerCase() === selectedRegion
//                   }
//                   className="appearance-none sr-only peer"
//                   name={name?.toLowerCase()}
//                   onChange={(ev) => {
//                     if (isRegion) {
//                       setSelectedRegion!(ev.target.value?.toLowerCase());
//                     }
//                   }}
//                   // {...register('region')}
//                 />

//                 {isRegion ? null : (
//                   <span className="text-sm leading-none font-normal text-brand-black-20 font-oxanium order-last ml-auto shrink-0">
//                     +<CurrencySymbol />
//                     <Money value={itemFee || 0} />
//                   </span>
//                 )}
//               </OfferFilterInputBox>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };
