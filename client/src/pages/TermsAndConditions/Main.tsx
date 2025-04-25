/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import { v4 as uuidv4 } from 'uuid';

import { TermsOfServiceList, TOSListType } from './components/TermsOfServiceList';

export const INTRODUCTION_DATA: TOSListType = {
  start: 0,
  title: `Introduction`,
  items: [
    {
      content: `This Terms and Conditions Agreement (hereinafter referred to as the "Agreement" “Terms”) is of paramount importance. Please exercise diligence in reading and comprehending this Agreement in its entirety. If you disagree with any of the provisions articulated herein, you are ineligible to proceed with your registration, utilize any services offered by the current resource located at https://fullboosts.com (hereinafter referred to as 'Fullboosts,' 'The Platform,' or 'The Website'), or partake in the buying, selling, or exchanging of goods facilitated through the operational functionalities of this trading Platform.`,
      itemType: 'none',
    },
    {
      content: `This Agreement establishes and governs the relationship between You (referred to as 'the User') in your capacity as either a Seller or a Buyer (collectively referred to as 'Parties,' or individually as 'the Party'), and Fullboosts. The Agreement expounds upon the key terms and conditions, obligations, and rights that govern each Party concerning transactions, the use of tools, applications, and any other services provided by Fullboosts. Both Parties possess the right to view the Platform as the guarantor and reserve the prerogative to invoke arbitration to resolve any disputes that may arise.`,
      itemType: 'none',
    },
  ],
};
export const DEFINITIONS_LIST: TOSListType = {
  start: 1,
  title: 'Definitions',
  subtitle: 'The following definitions are germane to both this Agreement and the Privacy Policy:',
  items: [
    {
      name: `User:`,
      isBold: true,
      content: `The term "User" designates an individual who engages with the instruments, applications, and other services offered by the Fullboosts Platform. Users are accorded the privilege to procure desired Seller Services and Goods, operate their Fullboosts Profile, manage the funds transferred to their Profile (with the option to return these funds to the originating bank requisites), and seek Fullboosts' impartial intervention in the event of disputes.`,
    },
    {
      name: `Seller:`,
      isBold: true,
      content: `The Seller, also referred to as the 'Currency supplier' or 'Booster,' denotes a User who has successfully undergone the supplementary registration process, furnished additional sign-up information, and been granted the authority to post Offers, vend Seller Services and Goods on the Platform, while retaining the entitlement to seek Fullboosts' impartial assistance in the event of a dispute.`,
    },
    {
      name: `Buyer:`,
      isBold: true,
      content: `The term "Buyer" pertains to a User of the Platform who is vested with the authority to:`,
      items: [
        {
          content: `Procure Seller Services and Goods.`,
          itemType: 'bullet',
        },
        {
          content: `Employ the Fullboosts Profile.`,
          itemType: 'bullet',
        },
        {
          content: `Administer the funds transferred to their Profile (with the option to revert these funds to the bank requisites from which the payment was initiated).`,
          itemType: 'bullet',
        },
      ],
    },

    {
      name: `Fullboosts Profile:`,
      isBold: true,
      content: `The "Fullboosts Profile," also referred to as 'Profile,' constitutes a personalized account duly registered by the User on the Fullboosts Platform.`,
    },
    {
      name: `Gaming Account:`,
      isBold: true,
      content: `A "Gaming Account" signifies an account registered by the User on third-party platforms expressly designed for the purpose of engaging in online video games.`,
    },
    {
      name: `Seller Service:`,
      isBold: true,
      content: `The "Seller Service" denotes an act or performance proffered by a Seller to a Buyer, aimed at imparting knowledge and/or skills within the gaming domain, as well as beneficial attributes that enhance the Gaming Account.`,
    },
    {
      name: `Fullboosts Service:`,
      isBold: true,
      content: `The "Fullboosts Service" encompasses any intermediary service provided by Fullboosts to Users. This service spectrum encompasses hosting and maintaining the Fullboosts Platform, ensuring the availability of tools for Sellers to publish and offer their Seller Services and Goods, facilitating the formation of transactions between Sellers and Buyers, and extending assistance to Users in resolving any disputes that may arise in connection with these transactions.`,
    },
    {
      name: `Goods:`,
      isBold: true,
      content: `"Goods" signifies valuable virtual components inherent in a game, which a Buyer can acquire through the Platform.`,
    },
    {
      name: `Seller:`,
      isBold: true,
      content: `Fullboosts Wallet: The "Fullboosts Wallet," also referred to as 'Wallet,' is an electronic account established on the Platform for financial transactions between the Seller and the Buyer, pertaining to the acquisition/sale of Seller Services and Goods under this Agreement.`,
    },
    {
      name: `Commission:`,
      isBold: true,
      content: `"Commission" signifies a fee remitted to Fullboosts for the provision of trading infrastructure, tools, intermediary services, and financial transaction security.`,
    },
    {
      name: `Fullboosts Arbitration:`,
      isBold: true,
      content: `"Fullboosts Arbitration" designates an autonomous and impartial intermediary party designated to adjudicate disputes that may arise between Users.`,
    },
    {
      name: `Subscription:`,
      isBold: true,
      content: `"Subscription" alludes to a bundle of privileges conferred by Fullboosts, obtainable by the User in exchange for the periodic deduction of a specified monetary sum, either on a monthly or weekly basis.`,
    },
    {
      name: `Verified Seller Status:`,
      isBold: true,
      content: `The "Status of a verified Seller" bestows upon the Seller a designated status that authorizes them to initiate personalized Offers to Buyers via the Fullboosts Chat. Additionally, this status provides Sellers with the privilege of expediting fund withdrawals.`,
    },
    {
      name: `Fullboosts Chat:`,
      isBold: true,
      content: `The "Fullboosts Chat" constitutes an integral component of the Fullboosts Platform, developed for the express purpose of facilitating communication between Sellers, Buyers, and Fullboosts.`,
    },
    {
      name: `Deal:`,
      isBold: true,
      content: `A "Deal" signifies a contract established on the Fullboosts Platform between a Seller and a Buyer pertaining to the sale-purchase of Seller Services and Goods.`,
    },
    {
      name: `Offer:`,
      isBold: true,
      content: `An "Offer" constitutes a proposal extended by a Seller to initiate a Deal with a Buyer. Each Offer includes an English-language description of the product (also referred to as 'item description'), specifies delivery time, and, where relevant, delineates supplementary conditions established by the Seller.`,
    },
    {
      name: `Order:`,
      isBold: true,
      content: `An "Order" signifies the Buyer's intent to procure Seller Services or Goods, predicated on the terms stipulated in one of the Offers accessible on the Platform.`,
    },
    {
      name: `Payment Method:`,
      isBold: true,
      content: `The "Payment Method" encompasses a valid credit card issued by a bank endorsed by Fullboosts, as well as an Accentpay, GooglePay, or ApplePay account, or any other payment method deemed acceptable by Fullboosts, at its sole discretion, from time to time.`,
    },

    {
      name: `Sanctions:`,
      isBold: true,
      content: `"Sanctions" pertains to punitive measures that may be imposed upon one or both Parties. These measures may encompass:`,
      items: [
        {
          content: `The reduction of the Buyer's or the Seller's rating.`,
          itemType: 'bullet',
        },
        {
          content: `The imposition of fines.`,
          itemType: 'bullet',
        },
        {
          content: `The temporary or permanent suspension of the Profile.`,
          itemType: 'bullet',
        },
      ],
    },
  ],
};

export const PROFILE_AND_USER_PERSONAL_DATA: TOSListType = {
  start: 2,
  prefix: `Article`,
  title: `FullBoosts Profile and User's Personal Data`,
  items: [
    {
      name: `Profile Registration and Acceptance of Terms`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `In order to gain unrestricted access to the comprehensive range of Fullboosts Services, a prospective User is obligated to complete the registration process and establish a Fullboosts Profile. By engaging with the Fullboosts Platform and affirmatively clicking the 'Sign Up' button as prompted on the Platform, a User expressly and unequivocally agrees to be legally bound by all governing agreements that collectively constitute Fullboosts' comprehensive Terms of Service. These agreements encompass, without limitation, this Agreement and the Privacy Policy. In the event that a User encounters any difficulty in comprehending or, for any reason, fails to concur with the Terms of Service, they are categorically instructed not to proceed with the acceptance of this Agreement by signing up. Consequently, they shall abstain from visiting the Fullboosts Website, utilizing the Platform, or accessing any other Services tendered by Fullboosts.`,
        },
        {
          content: `It is imperative to underscore that a User's initiation of the registration process constitutes a solemn acceptance of the contractual obligations outlined herein.`,
        },
      ],
    },
    {
      name: `Profile Approval`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `The registration of a User's Profile is subject to the explicit approval of Fullboosts. Fullboosts, as the platform operator, retains the inherent prerogative to exercise discretion in either accepting or rejecting a Profile registration, contingent upon lawful and legitimate grounds.`,
        },
      ],
    },
    {
      name: `User Categorization`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `Users who have successfully completed the registration process on the Fullboosts Platform and have thereby been granted access to the complete suite of features and functionalities are denominated as 'Users.'`,
        },
        {
          content: `Individuals who, for various reasons, have abstained from registering a Profile on the Fullboosts Platform but engage with the platform's content are denominated as 'Site Visitors.'`,
        },
      ],
    },
    {
      name: `Seller Status Acquisition`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `To attain the status of a Seller and thereby gain the privilege of offering Seller Services and Goods on the Fullboosts Platform.`,
        },
        {
          content: `In the application, the User shall provide their designated nickname, email address, date of birth, and append a verifiable copy of their passport or government-issued identification document. This application shall also include the submission of pertinent details regarding the Seller Services and Goods that the User intends to sell.`,
        },
        {
          content: `Upon meticulous review and approval by Fullboosts, the User shall be accorded the esteemed Status of a Seller, conferring upon them the authority to initiate Seller transactions on the Platform.`,
        },
      ],
    },
    {
      name: `Collection of Personal Information`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `In the course of its operations, Fullboosts may, in accordance with applicable legal and regulatory requirements, procure Personal Information from Users. Such information may encompass, but is not limited to, the User's date of birth or taxpayer identification number.`,
        },
        {
          content: `The collection of this Personal Information may serve the legitimate purposes of identity verification or statutory compliance, including tax filings. In furtherance of these objectives, Fullboosts reserves the right to request additional documents to substantiate the veracity and accuracy of the information provided by the User. Such documents may include, inter alia, a copy of the User's government-issued identification.`,
        },
        {
          content: `Upon meticulous review and approval by Fullboosts, the User shall be accorded the esteemed Status of a Seller, conferring upon them the authority to initiate Seller transactions on the Platform.`,
        },
      ],
    },
  ],
};
export const RELATIONSHIP_BETWEEN_THE_PARTIES_DATA: TOSListType = {
  start: 3,
  prefix: `Article`,
  title: `Relationship Between the Parties and FullBoosts. Parties’ Responsibility`,
  items: [
    {
      name: `Platform for Transaction Facilitation`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `FullBoosts provides a digital Platform that facilitates Users in identifying each other, entering into contractual agreements, and conducting financial transactions through the FullBoosts Wallet.`,
        },
      ],
    },
    {
      name: `Transactional Capabilities`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `Users, through the utilization of the FullBoosts Platform, possess the capacity to engage in the sale, purchase, or exchange of Seller Services and Goods.`,
        },
      ],
    },
    {
      name: `FullBoosts' Intermediary Role`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `It is essential to clarify that FullBoosts neither possesses nor offers Seller Services and Goods, nor does it engage in their sale. FullBoosts serves solely as an intermediary entity that facilitates Users in their transactional endeavors by ensuring the security and safeguarding of funds deposited within the FullBoosts Wallet. In the event of a dispute, the FullBoosts Arbitration undertakes the responsibility of expeditiously facilitating resolution, in compliance with prevailing laws and the provisions of this Agreement.`,
        },
        {
          content: `Individuals who, for various reasons, have abstained from registering a Profile on the Fullboosts Platform but engage with the platform's content are denominated as 'Site Visitors.'`,
        },
      ],
    },
    {
      name: `User Acknowledgment and Responsibilities`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `By consenting to this Agreement, Users explicitly acknowledge and affirm the following:`,
          items: [
            {
              content: `(a) FullBoosts assumes no responsibility for verifying the accuracy or legality of any Seller Services, a responsibility that rests solely with the Sellers.`,
              itemType: 'none',
            },
            {
              content: `(b) FullBoosts bears no responsibility for the initiation, execution, or completion of contractual agreements between Users.`,
              itemType: 'none',
            },
            {
              content: `(c) FullBoosts refrains from making any representations or guarantees concerning the actions of any particular User.`,
              itemType: 'none',
            },
          ],
        },
      ],
    },
    {
      name: `User Responsibilities`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `Users, by virtue of their engagement with the FullBoosts Platform, assume sole responsibility for:`,
          items: [
            {
              content: `(a) Assessing the suitability of proposed transactions, Buyers, or Sellers.`,
              itemType: 'none',
            },
            {
              content: `(b) Conducting due diligence regarding the identity and information of other Users.`,
              itemType: 'none',
            },
            {
              content: `(c) Determining the terms and conditions of any proposed transaction and deciding whether to proceed.`,
              itemType: 'none',
            },
            {
              content: `(d) Engaging in negotiations, agreement formation, and the fulfillment of the stipulated terms and conditions of transactions. It is imperative to emphasize that all transactions occurring between Users are executed directly between the Users themselves, with FullBoosts operating as a non-participating third party.`,
              itemType: 'none',
            },
          ],
        },
      ],
    },
    {
      name: `Limited Liability`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `FullBoosts expressly disclaims any liability or responsibility for the safety and security of the Buyer's Gaming Account or any personal data shared directly with Sellers or third parties. Furthermore, FullBoosts disclaims any liability for:`,
          items: [
            {
              content: `(a) Viruses, malicious software, or harmful programs that may infiltrate User devices due to network misuse.`,
              itemType: 'none',
            },
            {
              content: `(b) Content hosted on the FullBoosts Platform or the Seller Services promoted therein.`,
              itemType: 'none',
            },
            {
              content: `(c) Actions undertaken by Users in relation to Platform usage, including damages resulting from access data loss or disclosure, operational delays, and interruptions that may occur directly or indirectly due to reasons beyond FullBoosts' reasonable control.`,
              itemType: 'none',
            },
            {
              content: `(d) The quality and functionality of software, web browsers, operating systems, and hardware manufactured and supplied by third parties.`,
              itemType: 'none',
            },
          ],
        },
      ],
    },
    {
      name: `Seller Responsibilities`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `Sellers are afforded the privilege of providing comprehensive and accurate information in their item descriptions. It is imperative to note that all information furnished on the FullBoosts Platform carries legal significance and is subject to the provisions of this Agreement. In the event of a Seller's violation of any provisions outlined herein or their failure to adhere to agreed-upon conditions as discussed in the FullBoosts chat, arbitrators hold the authority to impose the following penalties:`,
          items: [
            {
              content: `Reduction of the Seller's rating.`,
              itemType: 'bullet',
            },
            {
              content: `Imposition of fines.`,
              itemType: 'bullet',
            },
          ],
        },
      ],
    },
    {
      name: `Intellectual Property Compliance`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `By accepting this Agreement, Sellers explicitly warrant that the sale of Seller Services or Goods does not infringe upon the rights of third parties, including but not limited to copyrighted materials, trademarks, brand names, and trade information. Sellers affirm that they possess all requisite permissions from the owners of copyrighted materials. Additionally, Sellers confirm their legal entitlement to trade, distribute, and offer Seller Services and Goods related to third-party rights, without any violation of such rights.`,
        },
      ],
    },
    {
      name: `Seller Service Accuracy`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `Sellers assume sole responsibility for the accuracy of the information provided in item descriptions, adherence to delivery timelines, and the fulfillment of any specified bonus conditions within their offers.`,
        },
      ],
    },
    {
      name: `No Accountability for Game Administration Measures`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `Neither FullBoosts nor the Seller assumes responsibility for any punitive measures or sanctions that may be imposed on a User's profile by game administrators during or following a transaction.`,
        },
      ],
    },
    {
      name: `Modification of Agreement`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `Subject to the conditions delineated herein, FullBoosts reserves the unilateral right to modify, amend, or alter this Agreement and the Privacy Policy as necessitated. Such modifications shall be affected by the posting of a revised version on the Platform. FullBoosts shall provide reasonable advance notice of any such modifications by posting the updated Terms of Service on the Platform and delivering notice on the Platform or via email. Users are responsible for regularly reviewing the Platform to remain apprised of any amendments.`,
        },
      ],
    },
    {
      name: `Content Editing and Deletion`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `FullBoosts retains the authority to delete or edit any content published on the Website, including materials deemed to violate existing laws, infringe upon third-party rights, or are considered inappropriate in the sole discretion of FullBoosts.`,
        },
      ],
    },
    {
      name: `Prohibition of Gaming Account Sharing`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `FullBoosts explicitly prohibits the sharing or sale of Gaming Accounts to third parties on its Platform.`,
        },
      ],
    },
    {
      name: `Customer Support`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `FullBoosts extends the opportunity to Users to access customer support services through the FullBoosts Chat feature on the Website, accessible by clicking the "Chat with us" button. In cases of necessity, Users may also contact FullBoosts via email at support@fullboosts.com to communicate with the Customer Service team.`,
        },
      ],
    },
  ],
};
export const INTERACTION_BETWEEN_THE_PARTIES_DATA: TOSListType = {
  start: 4,
  prefix: `Article`,
  title: `Interaction Between the Parties During The Process Of Making Deals`,
  items: [
    {
      name: `User Etiquette`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `The Users, both Buyers and Sellers, are unequivocally obligated to conduct themselves with utmost politeness and respect when engaging with each other and when interacting with official representatives of FullBoosts.`,
        },
      ],
    },
    {
      name: `Seller Service and Goods Delivery`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `The Seller, in compliance with the stipulated terms and conditions of the Deal, is responsible for delivering the Seller Services and/or Goods to the Buyer exclusively through the FullBoosts Platform.`,
        },
      ],
    },

    {
      name: `Stages of Interaction`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `The interaction between the Buyer and the Seller throughout the Deal formation and fulfillment process comprises four distinct stages:`,
          items: [
            {
              content: `"Placed"`,
              itemType: 'bullet',
            },
            {
              content: `"In progress"`,
              itemType: 'bullet',
            },
            {
              content: `"Confirmation"`,
              itemType: 'bullet',
            },
            {
              content: `"Completed"`,
              itemType: 'bullet',
            },
          ],
        },
      ],
    },
    {
      name: `"Placed" Stage`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `The "Placed" stage is the phase during which the Parties negotiate and finalize the conditions of the Seller Services and/or Goods as delineated in the Deal, thereby formalizing the Deal. During this stage, the Buyer and the Seller engage on the Platform according to the following provisions:`,
          items: [
            {
              content: `The Buyer initiates an Order in response to an available Seller Offer on the Platform.`,
            },
            {
              content: `The Buyer's Order encompasses the selection of preferred execution options outlined in the Seller's Offer, which may influence the base Offer price contingent upon the selected options. The Platform computes the Order's price and completion timeframe based on the chosen execution options within the Seller's Offer.`,
            },
            {
              content: `To place the Order, the Buyer is obligated to make an upfront payment from their FullBoosts Wallet, in an amount specified by the Platform. The specified amount is calculated with regard to the selected preferred execution options from the Seller's Offer. Upon making this advance payment for the Seller Services or Goods indicated in the Order, the Buyer unequivocally affirms their complete and unconditional consent to receive the Seller Services and Goods in accordance with the Order's terms.`,
            },
            {
              content: `Once the Order is placed, the Seller reviews the Order and either accepts or rejects the Order's conditions. In the event of the Seller's acceptance of the Order conditions, the Deal is deemed officially established under the same conditions, and the "In progress" stage commences.`,
            },
            {
              content: `The Buyer reserves the right to cancel the Order at any point during the 'Placed' stage. In such instances, the advance payment made for Order placement is refunded to the Buyer's FullBoosts Wallet.`,
            },
          ],
        },
      ],
    },
    {
      name: `"In progress" Stage`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `The "In progress" stage involves the Seller initiating the fulfillment of the Deal within the predetermined or agreed timeframe established during communication with the Buyer. The Seller must adhere to all conditions outlined in the Deal. In cases where there is a violation of this Agreement or the terms and conditions stipulated in the Deal, the aggrieved Party possesses the prerogative to request a partial refund through the FullBoosts Arbitration Process, as elucidated in Section 8 of this Agreement.`,
        },
        {
          content: `Users maintain the right to cancel their Deal, which subsequently results in a full or partial refund to their Wallet. Specific scenarios under which a User has the right to cancel their Deal are elucidated below.`,
        },
      ],
    },
    {
      name: `"Confirmation" Stage`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `During the "Confirmation" stage, upon successful fulfillment of the Deal and the receipt of Seller Services and/or Goods by the Buyer in adherence to all Deal conditions, the Seller is responsible for affirming the delivery of the Seller Service and/or Goods on the Platform by uploading corroborative evidence, typically in the form of screenshots accessible via the "My Sales" page.`,
        },
        {
          content: `Subsequent to the Seller's upload of screenshots confirming delivery, the Buyer acknowledges the Seller's Services rendered and/or Goods delivered by selecting the "Confirm delivery" button. This action signifies the Buyer's conclusive acceptance of the Seller's performance of obligations within the Deal. Once this acknowledgment transpires, the Deal is officially categorized as 'Completed.'`,
        },
        {
          content: `Alternatively, the Buyer retains the option to decline confirmation of the Deal, thereby initiating an appeal to the FullBoosts Arbitration for the purpose of Deal cancellation and/or refund.`,
        },
        {
          content: `In the event that the Buyer neither accepts the fulfillment of the Deal nor rejects the Deal Confirmation, and a period of 72 hours elapses from the Seller's screenshot upload on the "My Sales" page, the Buyer's silence is construed as a definitive acceptance of the Seller's fulfillment of Deal obligations.`,
        },
      ],
    },
    {
      name: `"Completed" Stage`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `In the "Completed" stage, the Seller duly receives the stipulated funds for the completed Deal within their Seller’s FullBoosts Wallet.`,
        },
      ],
    },
    {
      name: `Additional Actions`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `Throughout all aforementioned stages of interaction between the Buyer and the Seller, both the Seller and the Buyer possess the authority to undertake the following supplementary actions:`,
          items: [
            {
              content: `Utilize the FullBoosts Chat to communicate with the counterparty by clicking the "Go to intercom" button.`,
              itemType: 'bullet',
            },
            {
              content: `Resort to the FullBoosts Arbitration, as delineated in Section 8 of this Agreement, in cases where disputes emerge between the Seller and the Buyer by clicking the "I need help" button.`,
              itemType: 'bullet',
            },
          ],
        },
      ],
    },
    {
      name: `Refund Provisions`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `The specific scenarios in which Users are entitled to request a refund, in addition to other refund-related provisions, are meticulously outlined in FullBoosts' Refund Policy.`,
        },
      ],
    },
    {
      name: `Interface Guidance`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `For a comprehensive understanding of the user interface governing interactions between Sellers and Buyers on the Platform, please consult our Help Centre – Knowledge Base.`,
        },
      ],
    },
  ],
};
export const TRANSACTION_BETWEEN_THE_PARTIES_DATA: TOSListType = {
  start: 5,
  prefix: `Article`,
  title: `Transactions Between The Parties Using The FullBoosts Wallet`,
  items: [
    {
      name: `Establishment of FullBoosts Wallet`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `Upon the consummation of a Deal, when a Seller, for the first time, utilizes the Platform to receive payment from the Buyer, FullBoosts shall institute and manage a FullBoosts Wallet specifically designated for the Seller. This Wallet is designed to facilitate payment reception, refunds to Buyers, and disbursements to FullBoosts.`,
        },
      ],
    },
    {
      name: `FullBoosts Wallet for Buyers`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `Subsequent to the commencement of a Deal, when a Buyer makes an initial payment to a Seller, FullBoosts shall create and oversee a FullBoosts Wallet intended for the Buyer's use. This Wallet shall safeguard funds allocated to the Buyer, which can subsequently be employed for making payments, receiving refunds related to Deals, and settling obligations to FullBoosts.`,
        },
      ],
    },
    {
      name: `Escrow Agent Authorization`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `The FullBoosts Wallet has been devised to cater to the requisites of Users. By assenting to these terms, Users expressly authorize FullBoosts to function as their escrow agent. This designation empowers FullBoosts to hold funds and adhere to the instructions related to said funds within the Wallet. FullBoosts, in its capacity as an escrow agent, assumes responsibility for the securekeeping of Wallet-held funds and is bound to uphold the integrity of Profile-associated data through the utilization of secure server storage. FullBoosts' role as a guarantor encompasses the period commencing with the transfer of funds to a User's FullBoosts Wallet and concluding upon their subsequent disbursement. In the event of technical incidents, including unauthorized access to a User's FullBoosts Wallet, funds contained therein shall be restituted to the User upon satisfactory demonstration that said incidents did not arise from the User's own actions.`,
        },
      ],
    },
    {
      name: `Payment Exchange`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `The Seller, in consideration for virtual funds held within the virtual balance of the FullBoosts Wallet, effectuates the transfer of ownership of Goods or the provision of Seller Services to the Buyer.`,
        },
      ],
    },
    {
      name: `Fund Safeguarding`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `Until the entirety of the Deal is executed, the Buyer's funds remain securely ensconced within the confines of the FullBoosts Wallet. These funds shall only be relinquished to the Seller upon mutual verification of the fulfillment of all stipulated conditions by both Parties.`,
        },
      ],
    },
    {
      name: `FullBoosts as Guarantor`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `FullBoosts serves as the guarantor for any transactions conducted through the utilization of the FullBoosts Wallet. This incumbency imposes upon FullBoosts the duty of preserving the security of FullBoosts Wallets, encompassing the protection of Profile-linked data, archived upon secure servers. FullBoosts' role as a guarantor is in effect from the moment funds are transferred to the User's FullBoosts Wallet, persisting until such funds are subsequently disbursed. In instances of technical anomalies, including unauthorized access to a User's FullBoosts Wallet, funds resident therein shall be restituted to the User contingent upon the presentation of substantiated evidence affirming that said anomalies did not result from the actions of the User.`,
        },
      ],
    },
    {
      name: `Duration of Fund Retention`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `Sellers are authorized to retain funds within their FullBoosts Wallet for a reasonable duration, not exceeding ninety (90) days.`,
        },
      ],
    },
    {
      name: `Fund Withdrawal`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `Upon the elapse of the aforementioned 90-day period, Sellers shall be obliged to effectuate the withdrawal of available funds through the various means afforded by the FullBoosts Platform. This withdrawal may include bank transfers executed via the payment system integrated into the FullBoosts Platform. Sellers, however, retain the prerogative to initiate a one-time withdrawal of funds from their FullBoosts Wallet at any juncture preceding the culmination of the 90-day period.`,
        },
      ],
    },
    {
      name: `Buyer Fund Sufficiency`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `Buyers are mandated to ensure that their FullBoosts Wallet maintains an adequate balance of virtual funds to duly discharge the consideration for Seller Services or Goods transacted via the FullBoosts Platform.`,
        },
      ],
    },
    {
      name: `Fund Transfers`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `Within their FullBoosts Profile, Users retain the capacity to transfer funds into their FullBoosts Wallet. Additionally, Users may employ these funds during the acquisition of Seller Services or Goods, at which point the corresponding sum shall be automatically debited from their Wallet balance, accompanied by the corresponding charge.`,
        },
      ],
    },
    {
      name: `Purpose of Fund Transfer`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `In the act of transferring funds, Users acknowledge that they are not procuring a specific Seller Service or Good; rather, they are facilitating the transfer of funds into the virtual Wallet balance. These funds are earmarked for disbursement in conjunction with the acquisition of Seller Services or Goods.`,
        },
      ],
    },
  ],
};
export const TAXES_AND_COMMISSIONS_DATA: TOSListType = {
  start: 6,
  prefix: `Article`,
  title: `Taxes and Commissions`,
  items: [
    {
      name: `Platform Commission`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `Upon the culmination of a Deal, FullBoosts shall effectuate a Commission deduction from the Seller's proceeds. The Commission serves as compensation for the utilization of the Platform, encompassing the promotion of Seller Services. The Commission rate levied by FullBoosts may fluctuate, with an upper limit of 16% of the transferred sum. Nevertheless, in instances involving Seller Services related to the trade, acquisition, or exchange of in-game currency, the Commission rate shall be affixed at 12%. The precise magnitude of the Commission is contingent upon the Seller's mean daily sales, including any seasonal sales orchestrated by FullBoosts upon the Platform. Sellers shall be apprised of forthcoming seasonal sales via the Website.`,
        },
      ],
    },
    {
      name: `Commission Payment Obligation`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `Sellers shall be obligated to remit the Commission concurrent with the transfer of funds into their FullBoosts Profile.`,
        },
      ],
    },
    {
      name: `Commission for Fund Withdrawals`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `In the event of a Seller's solicitation for the withdrawal of funds from their Wallet to their individual bank account, FullBoosts shall undertake the computation and application of the Commission as mandated by the payment system. The Commission rate may fluctuate, reaching an upper limit of 5% of the sum earmarked for transfer. The actual Commission rate is contingent upon the chosen withdrawal method and is delineated as follows:`,
          items: [
            {
              content: `VISA, Mastercard (Debit cards) (3%)`,
              itemType: 'bullet',
            },
            {
              content: `WMZ (0%)`,
              itemType: 'bullet',
            },
            {
              content: `Paypal (5%)`,
              itemType: 'bullet',
            },
            {
              content: `USDT, USDC, BTC (5%)`,
              itemType: 'bullet',
            },
            {
              content: `SEPA Transfer (1.2%)`,
              itemType: 'bullet',
            },
            {
              content: `SWIFT (2%)`,
              itemType: 'bullet',
            },
          ],
        },
      ],
    },
    {
      name: `Taxation Considerations`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `FullBoosts does not engage in the direct collection of taxes, except in cases where it is legally compelled to do so. However, consistent with prevailing legal statutes, FullBoosts may find itself under the obligation to collect specific taxes or levies, such as income tax or Value Added Tax (VAT). The requisites and rates for tax collection may undergo variations contingent upon alterations in the User's legal jurisdiction.`,
        },
      ],
    },
  ],
};

export const NON_CIRCUMVENTION_DATA: TOSListType = {
  start: 7,
  prefix: `Article`,
  title: `Non-Circumvention`,
  items: [
    {
      name: `Prohibition on Circumvention`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `Users are expressly prohibited from actively seeking, providing, or endeavoring to acquire contact information of fellow Users outside the confines of the Platform, including but not limited to personal contact details. Notwithstanding, a singular exception shall be extended to the realm of gaming-related data, encompassing usernames or server information employed for in-game communication purposes.`,
        },
      ],
    },
    {
      name: `Exclusive Platform Communication`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `The FullBoosts Platform shall stand as the solitary and exclusive conduit through which Users may engage in communications with one another.`,
        },
      ],
    },
    {
      name: `Confidentiality Obligation`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `Users solemnly undertake not to divulge any particulars that might facilitate direct contact through any mode of communication apart from the officially designated Website.`,
        },
      ],
    },
    {
      name: `Payment Method Adherence`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `Users pledge not to circumvent the Payment Methods furnished on the Platform.`,
        },
      ],
    },
    {
      name: `Consequences of Circumvention Attempts`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `Any concerted effort aimed at circumventing the Payment Methods, including but not limited to making payments for Seller Services and Goods listed on the Website without availing the Platform's intermediation, shall be met with the suspension of both Parties' FullBoosts Profiles.`,
        },
      ],
    },
  ],
};

export const DISPUTE_RESOLUTION_DATA: TOSListType = {
  start: 8,
  prefix: `Article`,
  title: `Dispute Resolution through FullBoosts Arbitration`,
  items: [
    {
      name: `Role of FullBoosts Arbitration`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `FullBoosts Arbitration shall function as an impartial intermediary and guarantor in the resolution of disputes arising between the Parties (Users). It is committed to rendering equitable and unbiased judgments.`,
        },
      ],
    },
    {
      name: `Initiation of Complaints`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `In cases of Agreement rule violations or discrepancies arising from transaction negotiations between Users, such as the acquisition of Seller Services or Goods on the Platform, each Party possesses the right to submit a formal complaint through the provided online form, directed to FullBoosts Arbitration. In these instances, FullBoosts Arbitration undertakes a meticulous examination of the dispute, taking into account assertions from both Parties and rendering determinations based on factual evidence presented.`,
        },
      ],
    },
    {
      name: `Buyer's Profile Suspension`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `FullBoosts reserves the prerogative to suspend the Buyer's FullBoosts Profile should the Buyer persistently and repetitively lodge complaints with FullBoosts Arbitration, alleging minor deficiencies in procured Seller Services or Goods more frequently than following every fourth transaction on the Platform. Such actions by the Buyer shall be construed as an endeavor to exploit FullBoosts Arbitration for personal advantage, rather than a genuine assertion of consumer rights. This encompasses the pursuit of substantial recompense, including reimbursements for the cost of Seller Services or Goods, while retaining possession of the procured Seller Services or Goods.`,
        },
      ],
    },
    {
      name: `Consequences of Profile Suspension`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `FullBoosts shall not be held accountable for any repercussions ensuing from the suspension of the Buyer's FullBoosts Profile or the annulment of reimbursements for the cost of Seller Services or Goods, as stipulated in paragraph 8.3 above. In such situations, FullBoosts is also entitled to rescind any reimbursements for the cost of Seller Services or Goods.`,
        },
      ],
    },
    {
      name: `Imposition of Sanctions`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `In instances of Agreement rule violations, contravention of negotiated terms, or the exceeding of stipulated deadlines, FullBoosts Arbitration possesses the authority to impose sanctions, as elucidated in Section 9 of this Agreement, upon the Party conclusively proven to have breached the aforementioned conditions.`,
        },
      ],
    },
  ],
};
export const POLICY_ON_SANCTIONS_AND_FINES_DATA: TOSListType = {
  start: 9,
  prefix: `Article`,
  title: `Policy on Sanctions and Fines`,
  items: [
    {
      name: `Grounds for Sanctions`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `FullBoosts Arbitration operates as an impartial intermediary and guarantor in the resolution of disputes among the Parties (Users). It diligently endeavors to render equitable and impartial judgments.`,
        },
        {
          content: `Sanctions may be imposed for the following reasons:`,
          itemType: 'none',
          items: [
            {
              content: `1.	User's violation of any terms and conditions of this Agreement or any other provisions of the Terms of Service.`,
              itemType: 'none',
            },
            {
              content: `2.	User's direct targeting, abuse, or insults towards other Users of the Platform.`,
              itemType: 'none',
            },
            {
              content: `3.	User's provision of false or misleading information to FullBoosts and/or other Users.`,
              itemType: 'none',
            },
            {
              content: `4.	User's actions that may result in legal liability for FullBoosts, other Users, or third parties; actions contrary to the interests of the Platform or the User community; involvement in illicit or illegal activities.`,
              itemType: 'none',
            },
            {
              content: `5.	When FullBoosts is legally obligated to do so by law, legal process, or law enforcement.`,
              itemType: 'none',
            },
          ],
        },
      ],
    },
    {
      name: `Complaint Submission and Investigation`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `In the event of a violation of the Agreement rules or the terms negotiated during transaction discussions between Users, such as the acquisition of Seller Services or Goods on the Platform, either Party retains the right to submit a formal complaint using the online form directed to FullBoosts Arbitration. In such instances, FullBoosts Arbitration shall conduct a comprehensive investigation of the dispute, taking into consideration claims from both Parties and arriving at determinations based on factual evidence provided.`,
        },
        {
          content: `Sanctions may include:`,
          itemType: 'none',
          items: [
            {
              content: `1.	Reduction in seller rating.`,
              itemType: 'none',
            },
            {
              content: `2.	Withdrawal of funds from the Seller's FullBoosts Wallet.`,
              itemType: 'none',
            },
            {
              content: `3.	Full or partial refund of funds to the Buyer's FullBoosts Wallet.`,
              itemType: 'none',
            },
            {
              content: `4.	Removal of the Seller's current offers from the Platform.`,
              itemType: 'none',
            },
            {
              content: `5.	Removal of the Seller's status.`,
              itemType: 'none',
            },
          ],
        },
      ],
    },
    {
      name: `Buyer's Profile Suspension`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `FullBoosts reserves the authority to suspend the Buyer's FullBoosts Profile if the Buyer consistently and repeatedly files claims with FullBoosts Arbitration, alleging minor defects in purchased Seller Services or Goods more frequently than after every fourth transaction on the Platform. Such actions by the Buyer shall be construed as an attempt to exploit FullBoosts Arbitration for personal gain, rather than a genuine assertion of consumer rights. This includes seeking material compensation, such as refunds for the cost of Seller Services or Goods, while retaining possession of the procured Seller Services or Goods.`,
        },
      ],
    },
    {
      name: `Consequences of Profile Suspension`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `FullBoosts shall not be held responsible for any repercussions arising from the suspension of the Buyer's FullBoosts Profile or the annulment of reimbursements for the cost of Seller Services or Goods, as stipulated in paragraph 8.3 above. In such situations, FullBoosts is also entitled to rescind any reimbursements for the cost of Seller Services or Goods.`,
        },
      ],
    },
    {
      name: `Imposition of Sanctions`,
      content: ``,
      isBold: true,
      items: [
        {
          content: `In instances of Agreement rule violations, breach of negotiated terms, or the exceeding of stipulated deadlines, FullBoosts Arbitration possesses the authority to impose sanctions, as elucidated in Section 9 of this Agreement, upon the Party conclusively proven to have breached the aforementioned conditions.`,
        },
      ],
    },
  ],
};
export const INTELLECTUAL_PROPERTY_RIGHTS_DATA: TOSListType = {
  start: 10,
  prefix: `Article`,
  title: `Intellectual Property Rights`,
  items: [
    {
      content: `All content, materials, and intellectual property displayed on the Fullboosts Platform, including but not limited to text, graphics, logos, images, videos, software, and trademarks, are the exclusive property of Fullboosts or its licensors and are protected by intellectual property laws.`,
    },
    {
      content: `Users agree not to reproduce, modify, distribute, or publicly display any of the intellectual property found on the Fullboosts Platform without prior written consent from Fullboosts. Any unauthorized use of intellectual property may result in legal action.`,
    },
  ],
};
export const TERMINATION_OF_AGREEMENT_DATA: TOSListType = {
  start: 11,
  prefix: `Article`,
  title: `Termination of Agreement`,
  items: [
    {
      content: `Either Party may terminate this Agreement at any time by providing written notice to the other Party.`,
    },
    {
      content: `Fullboosts reserves the right to suspend or terminate a User's access to the Fullboosts Platform for violations of this Agreement, fraudulent activities, or other reasons deemed necessary by Fullboosts.`,
    },
    {
      content: `Upon termination, Users must cease all use of the Fullboosts Platform, and any outstanding transactions or obligations shall remain in effect as per the terms of this Agreement.`,
    },
  ],
};
export const FORCE_MAJEURE_DATA: TOSListType = {
  start: 12,
  prefix: `Article`,
  title: `Force Majeure`,
  items: [
    {
      content: `Fullboosts shall not be liable for any failure or delay in performing its obligations under this Agreement if such failure or delay is caused by circumstances beyond its reasonable control, including but not limited to acts of nature, war, terrorism, government regulations, labor disputes, or technical failures.`,
    },
    {
      content: `In the event of a force majeure event, Fullboosts will make reasonable efforts to resume its obligations under this Agreement as soon as practicable. However, Fullboosts shall not be held responsible for any losses or damages incurred by Users due to such events.`,
    },
  ],
};
export const GOVERNING_LAW_AND_JURISDICTION_DATA: TOSListType = {
  start: 13,
  prefix: `Article`,
  title: `Governing Law and Jurisdiction`,
  items: [
    {
      content: `This Agreement shall be governed by and construed in accordance with the laws where the company is registered without regard to its conflict of law principles.`,
    },
    {
      content: `Any disputes arising out of or in connection with this Agreement, including disputes regarding its formation, validity, or termination, shall be subject to the exclusive jurisdiction of the courts located within [Jurisdiction]. Users consent to the personal jurisdiction of such courts and waive any objection to venue in those courts.`,
    },
  ],
};
export const CONFIDENTIALITY_DATA: TOSListType = {
  start: 14,
  prefix: `Article`,
  title: `Confidentiality`,
  items: [
    {
      content: `Both Parties agree to treat any non-public information obtained from the other Party as confidential and shall not disclose, use, or reproduce such information for any purpose other than the performance of this Agreement, except as required by law.`,
    },
    {
      content: `This confidentiality obligation shall survive the termination or expiration of this Agreement and shall continue for a period of 2 years from the date of such termination or expiration.`,
    },
    {
      content: `Notwithstanding the above, Fullboosts may collect, use, and disclose User data in accordance with its Privacy Policy.`,
    },
  ],
};
export const CONTACT_INFORMATION_DATA: TOSListType = {
  start: 15,
  prefix: `Article`,
  title: `Contact Information`,
  items: [
    {
      content: `For any inquiries, concerns, or support related to the services provided by FullBoosts, please do not hesitate to contact us. We are committed to assisting you promptly and efficiently.`,
    },
    {
      content: `Our Registered Office Address: Kermia Building, 3rd Floor, Office 304, Diagorou 4, 1097, Nicosia, Cyprus.`,
    },
    {
      content: `For customer support inquiries, you may reach out to our dedicated Customer Support Team via email at:`,
      items: [
        {
          content: `Customer Support Email: support@fullboosts.com`,
          itemType: 'bullet',
        },
      ],
    },
    {
      content: `For all business-related inquiries, partnership proposals, or collaborations, we welcome you to contact our Business Development Team at:`,
      items: [
        {
          content: `Business Inquiries Email: business@fullboosts.com`,
          itemType: 'bullet',
        },
      ],
    },
    {
      content: `We are committed to providing you with a seamless and efficient experience when engaging with FullBoosts. Your feedback and inquiries are invaluable to us, and we look forward to assisting you in any way we can.`,
    },
  ],
};

export const Main = () => {
  const TERMS_OF_SERVICE_LISTS: TOSListType[] = [
    INTRODUCTION_DATA,
    DEFINITIONS_LIST,
    PROFILE_AND_USER_PERSONAL_DATA,
    RELATIONSHIP_BETWEEN_THE_PARTIES_DATA,
    INTERACTION_BETWEEN_THE_PARTIES_DATA,
    TRANSACTION_BETWEEN_THE_PARTIES_DATA,
    TAXES_AND_COMMISSIONS_DATA,
    NON_CIRCUMVENTION_DATA,
    DISPUTE_RESOLUTION_DATA,
    POLICY_ON_SANCTIONS_AND_FINES_DATA,
    INTELLECTUAL_PROPERTY_RIGHTS_DATA,
    TERMINATION_OF_AGREEMENT_DATA,
    FORCE_MAJEURE_DATA,
    GOVERNING_LAW_AND_JURISDICTION_DATA,
    CONFIDENTIALITY_DATA,
    CONTACT_INFORMATION_DATA,
  ];

  return (
    <main className='fb-container grid gap-10 xl:gap-16'>
      {/* <GradientFadePrimaryHr /> */}
      {TERMS_OF_SERVICE_LISTS?.map((list) => <TermsOfServiceList key={uuidv4()} payload={list} />)}
    </main>
  );
};
