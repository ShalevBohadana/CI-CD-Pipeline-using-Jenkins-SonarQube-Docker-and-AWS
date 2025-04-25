/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import { v4 as uuidv4 } from 'uuid';

import {
  TermsOfServiceList,
  TOSListType,
} from '../TermsAndConditions/components/TermsOfServiceList';

export const INTRODUCTION_DATA: TOSListType = {
  start: 0,
  title: 'Introduction',

  items: [
    {
      name: 'A. Overview This Privacy Policy ("Policy")',
      isBold: true,
      itemType: 'none',
      content: `is established to regulate the acquisition, processing, and safeguarding of personal information by Fullboosts ("we," "us," or "our") in strict accordance with the pertinent data protection laws and regulations. This Policy underscores our unwavering commitment to safeguarding your privacy and expounds upon our procedures for managing and utilizing your personal information when you engage with our website, avail our services, or interact with us in any capacity.`,
    },
    {
      name: 'B. Scope This Policy',
      isBold: true,
      itemType: 'none',
      content: `extends to all individuals who access or employ our website, services, or engage with us, including but not limited to customers, visitors, and users ("you" or "your"). By accessing or utilizing our website and services, you explicitly consent to the provisions outlined in this Policy. If you do not concur with the terms of this Policy, we kindly request that you refrain from using our website or services.`,
    },
    {
      name: `C. Acknowledgment of Privacy Policy`,
      isBold: true,
      itemType: 'none',
      content: `Your continuous use of our website or services signifies your unequivocal acceptance of this Policy. We reserve the prerogative to periodically revise this Policy to accommodate changes in our operational procedures, legal obligations, or regulatory requirements. We encourage you to periodically peruse this Policy to remain informed about the methods by which we collect, utilize, and safeguard your personal information.`,
    },
    {
      name: `D. Amendments to the Privacy Policy`,
      isBold: true,
      itemType: 'none',
      content: `We retain the authority to amend or modify this Policy at our discretion. Any modifications shall take effect immediately upon the publication of the revised Policy on our website, with the "Last Updated" date denoting the most recent revision. Your sustained utilization of our website or services subsequent to such alterations constitutes your endorsement of the updated Policy. In the event of substantial alterations to the Policy, we shall notify you in accordance with the dictates of applicable legal statutes.`,
    },
  ],
};
export const DATA_COLLECTION_DATA: TOSListType = {
  start: 1,
  prefix: 'Article',
  title: 'Data Collection',
  items: [
    {
      content: `Personal Data Definition of Personal Data `,
      description: `In conformity with relevant data protection legislation and regulations, "Personal Data" denotes any information capable of directly or indirectly identifying an individual. This definition encompasses, but is not limited to, names, contact particulars, financial records, government-issued identification numbers, and online identifiers.
Categories of Personal Data We may gather various categories of Personal Data, including:
`,
      items: [
        {
          content: `Identifiers: `,
          description: `This category encompasses details such as names, addresses, electronic mail addresses, telephone numbers, and user identifiers. `,
        },
        {
          content: `Financial Data: `,
          description: `This category comprises particulars like payment card numbers, banking information, and transaction histories, which may be requisite for payment processing and authentication. `,
        },
        {
          content: `Government-Issued Identification Numbers: `,
          description: `On certain occasions, we may procure government-issued identification numbers, such as social security numbers, for identity authentication purposes, and in accordance with applicable legal mandates. `,
        },
        {
          content: `Online Identifiers: `,
          description: `This category encompasses IP addresses, device identifiers, and other online tracing data that may be automatically collected when you access our Services.`,
        },
      ],
    },
    {
      content: `Non-Personal Data Methods of Data Collection We also acquire Non-Personal Data, which does not directly disclose the identity of individuals. `,
      description: `Non-Personal Data may encompass aggregated, de-identified information, as well as statistical data concerning the utilization of our Services. This information aids us in improving our Services and user experience.`,
      items: [],
    },
    {
      content: `During the "In progress" stage, the Seller delivers the Seller Services and/or Goods in accordance with the agreed terms and conditions of the Deal established during the 'Placed' stage. During the "In progress" stage, the Buyer and the Seller interact on the Platform based on the following provisions: 
        `,
      items: [
        {
          content: `The Seller is obligated to commence work on fulfilling the Deal within the specified timeframe, either predetermined or agreed upon during communication with the Buyer, while adhering to all the conditions of the Deal. In the event of a violation of this Agreement or the terms and conditions of the agreed Deal, the injured Party may request a partial refund through the FullBoosts Arbitration Process outlined in Section 8 of this Agreement. 
          `,
        },
        {
          content: `Users have the right to cancel their Deal. Upon cancellation, the User will receive a full or partial refund to their Wallet. The situations in which a User has the right to cancel their Deal are specified below.`,
        },
      ],
    },
  ],
};

export const COOKIES_AND_TRACKING_TECHNOLOGIES_DATA: TOSListType = {
  start: 0,
  title: `Cookies and Tracking Technologies`,
  subtitle: `We utilize cookies and tracking technologies for the collection of Non-Personal Data. `,
  items: [
    {
      itemType: 'none',
      content: `
    Cookies are diminutive text files that are placed on your device when you access our website. These cookies facilitate the identification of your device and the compilation of data regarding your engagements with our Services. You maintain the ability to oversee your cookie preferences through the settings in your web browser.
    `,
    },
  ],
};
export const THIRD_PARTY_ORIGINS_DATA: TOSListType = {
  start: 0,
  title: `Third-Party Origins `,
  subtitle: `We may obtain Non-Personal Data from external sources, including analytics service providers and advertising networks. This information aids us in scrutinizing trends, gauging the efficacy of our marketing initiatives, and enhancing our Services.`,
  items: [],
};
export const HOW_WE_USE_YOUR_INFORMATION_DATA: TOSListType = {
  start: 2,
  prefix: 'Article',
  title: 'How We Use Your Information',
  items: [
    {
      name: 'Purpose of Information Collection',
      isBold: true,
      content: ``,
      description: `We collect and process your information for specific purposes, including but not limited to:`,
      items: [
        {
          isBold: true,
          name: `Service Provision: `,
          content: `To provide, maintain, and improve our Services, ensuring a seamless user experience, and fulfilling our contractual obligations.`,
        },
        {
          isBold: true,
          name: `User Authentication: `,
          content: `To verify your identity, prevent fraudulent activities, and maintain the security of your account.`,
        },
        {
          isBold: true,
          name: `Customer Support: `,
          content: `To address your inquiries, resolve issues, and provide customer assistance.`,
        },
        {
          isBold: true,
          name: `Communication: `,
          content: `To communicate with you about our Services, updates, changes to our policies, and respond to your requests.`,
        },
        {
          isBold: true,
          name: `Marketing and Personalization: `,
          content: `To tailor our marketing efforts and content to your preferences, with your consent, and to send promotional materials related to our Services.`,
        },
        {
          isBold: true,
          name: `Compliance: `,
          content: `To comply with legal obligations, regulations, and enforce our Terms of Service and policies.`,
        },
        {
          isBold: true,
          name: `Research and Analytics: `,
          content: `To conduct research, analysis, and gather insights to enhance our Services and user experience.`,
        },
        {
          isBold: true,
          name: `Protection: `,
          content: `To protect our rights, safety, and interests, as well as those of our users and third parties.`,
        },
      ],
    },
    {
      name: 'Legal Bases for Processing',
      isBold: true,
      content: ``,
      description: `We process your information relying on various legal bases, including:`,
      items: [
        {
          isBold: true,
          name: `Contractual Necessity:`,
          content: `Processing is necessary for the performance of a contract to which you are a party or to take pre-contractual steps at your request.`,
        },
        {
          isBold: true,
          name: `Consent:`,
          content: `Processing is based on your explicit consent, which you may withdraw at any time.`,
        },
        {
          isBold: true,
          name: `Legal Obligations:`,
          content: `Processing is necessary to comply with our legal obligations.`,
        },
        {
          isBold: true,
          name: `Legitimate Interests:`,
          content: `Processing is based on our legitimate interests, such as providing a secure and efficient service, marketing our products, and protecting our legal rights.`,
        },
      ],
    },
    {
      name: 'Marketing and Communications',
      isBold: true,
      content: ``,
      description: `With your consent, we may use your Personal Information to send you marketing and promotional communications. You have the right to opt-out of receiving such communications at any time by following the instructions provided in our communications or by contacting us directly.
`,
      items: [],
    },
    {
      name: 'Data Retention',
      isBold: true,
      content: ``,
      description: `We retain your information only for as long as necessary to fulfill the purposes for which it was collected, including legal, accounting, or reporting requirements. When your information is no longer needed, we will securely dispose of it or render it anonymous.
`,
      items: [],
    },
  ],
};
export const HOW_WE_SHARE_YOUR_INFORMATION_DATA: TOSListType = {
  start: 3,
  prefix: 'Article',
  title: 'How We Share Your Information',
  items: [
    {
      name: `Third-Party Service Providers`,
      isBold: true,
      content: ``,
      description: `We may share your information with trusted third-party service providers to facilitate and enhance our Services. These providers include, but are not limited to, payment processors, cloud hosting services, customer support platforms, analytics providers, and marketing partners. These entities assist us in offering and improving our Services, and they are contractually bound to maintain the confidentiality and security of your information.
      `,
      items: [],
    },
    {
      name: `Legal Requirements`,
      isBold: true,
      content: ``,
      description: `We may disclose your information when required by applicable laws, regulations, legal processes, or governmental requests. This includes responding to subpoenas, court orders, or law enforcement agencies, as well as protecting against fraud or imminent harm to our interests, rights, safety, or that of our users or the public.`,
      items: [],
    },
    {
      name: `Business Transfers`,
      isBold: true,
      content: ``,
      description: `In the event of a merger, acquisition, sale, or other transfer of all or a portion of our assets, your information may be transferred to the acquiring entity. We will notify you of such a transfer and any material changes to the use of your information as a result of the transaction.`,
      items: [],
    },
    {
      name: `Aggregated and Anonymized Data`,
      isBold: true,
      content: ``,
      description: `We may share aggregated and anonymized data that does not identify you personally for various purposes, including analytics, research, marketing, or to improve our Services. Such data is stripped of personally identifiable information and cannot be used to identify you.`,
      items: [],
    },
    {
      name: `Your Consent`,
      isBold: true,
      content: ``,
      description: `We will only share your information with third parties for purposes not outlined in this Privacy Policy when we have obtained your explicit consent to do so. You have the right to withdraw your consent at any time, but this will not affect the lawfulness of any processing that occurred prior to the withdrawal.`,
      items: [],
    },
  ],
};
export const YOUR_RIGHTS_AND_CHOICES_DATA: TOSListType = {
  start: 4,
  prefix: 'Article',
  title: `Your Rights and Choices`,
  items: [
    {
      name: `Access and Correction`,
      isBold: true,
      content: ``,
      description: `You have the right to access and update your Personal Information held by us. If you believe that any of the information, we hold is inaccurate, incomplete, or outdated, you may request corrections or updates. We will respond to your request within a reasonable timeframe and, where applicable, make the necessary amendments, unless there are legitimate reasons to deny such requests.
      `,
      items: [],
    },
    {
      name: `Data Portability`,
      isBold: true,
      content: ``,
      description: `Subject to applicable laws, you have the right to receive the Personal Information you provided to us in a structured, commonly used, and machine-readable format, and you may have the right to transmit that information to another entity without hindrance from us. This right applies where our processing of your information is based on your consent or the performance of a contract and is carried out by automated means.`,
      items: [],
    },
    {
      name: `Deletion of Personal Information`,
      isBold: true,
      content: ``,
      description: `You have the right to request the deletion of your Personal Information under certain circumstances, including when the information is no longer necessary for the purposes for which it was collected, or you withdraw your consent (where applicable). We will assess your request and inform you whether we can comply. Please note that we may retain certain information as required by law or for legitimate business purposes.`,
      items: [],
    },
    {
      name: `Marketing Communications Opt-Out`,
      isBold: true,
      content: ``,
      description: `You have the option to opt out of receiving marketing communications from us at any time. You can do so by following the opt-out instructions provided in the marketing communications or by contacting us directly. We will promptly honor your request to opt out of marketing messages. However, we may still send you non-marketing communications related to our Services, such as service announcements or administrative messages.`,
      items: [],
    },
    {
      name: `Cookies and Tracking Technologies`,
      isBold: true,
      content: ``,
      description: `You can manage your cookie preferences and opt-out of certain tracking technologies by adjusting your browser settings or using third-party opt-out tools. Please note that disabling cookies or tracking technologies may affect your experience on our platform, and some features may not function properly.`,
      items: [],
    },
  ],
};
export const SECURITY_MEASURES_DATA: TOSListType = {
  start: 5,
  prefix: 'Article',
  title: `Security`,
  items: [
    {
      name: `Security Measures`,
      isBold: true,
      content: ``,
      description: `We take the security of your Personal Information seriously and have implemented appropriate technical and organizational measures to protect it. These measures are designed to prevent unauthorized access, disclosure, alteration, or destruction of your information. Our security measures include, but are not limited to:
      `,
      items: [
        {
          content: `Regular security assessments and audits of our systems and processes.`,
          itemType: 'bullet',
        },
        {
          content: `Secure storage of data in encrypted formats.`,
          itemType: 'bullet',
        },
        {
          content: `Access controls and restrictions to limit access to Personal Information to only those who need it for legitimate purposes.`,
          itemType: 'bullet',
        },
        {
          content: `Ongoing employee training on data protection and security best practices.`,
          itemType: 'bullet',
        },
        {
          content: `Compliance with industry standards and regulations`,
          itemType: 'bullet',
        },
        {
          content: `Despite our best efforts, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee the absolute security of your Personal Information. You play an important role in protecting your information by keeping your account credentials confidential and notifying us immediately of any suspicious activity related to your account.`,
          itemType: 'none',
        },
      ],
    },
    {
      name: `Data Breach Notification`,
      isBold: true,
      content: ``,
      description: `In the event of a data breach that results in the unauthorized access or disclosure of your Personal Information, we will comply with applicable data protection laws and regulations. If we determine that a breach is likely to result in a high risk to your rights and freedoms, we will promptly notify you of the breach, as well as the relevant supervisory authorities, in accordance with legal requirements.`,
      items: [
        {
          content: `Our notification will include:`,
          itemType: 'none',
        },
        {
          content: `A description of the nature of the breach.`,
          itemType: 'bullet',
        },
        {
          content: `The categories of data involved.`,
          itemType: 'bullet',
        },
        {
          content: `Contact information for our Data Protection Officer or another point of contact.`,
          itemType: 'bullet',
        },
        {
          content: `A description of the likely consequences of the breach.`,
          itemType: 'bullet',
        },
        {
          content: `The measures we have taken or plan to take to address the breach and mitigate its effects.`,
          itemType: 'bullet',
        },
        {
          content: `We will take all necessary steps to investigate the breach, mitigate its impact, and prevent similar incidents in the future. We may also provide you with recommendations on how to protect yourself in the wake of a breach.`,
          itemType: 'none',
        },
      ],
    },
  ],
};
export const PRIVACY_CONCERNING_MINORS_DATA: TOSListType = {
  start: 6,
  prefix: 'Article',
  title: `Privacy Concerning Minors`,
  items: [
    {
      content: `Age Limitations Our services are not designed for individuals below the age of 16 years ("Minimum Age"). We do not intentionally gather or process Personal Data from individuals who fall below the Minimum Age. If you are below the Minimum Age, we kindly request that you abstain from utilizing our services and refrain from disclosing any Personal Data to us. In the event that we discover unintentional acquisition of Personal Data from individuals below the Minimum Age, we will undertake immediate measures to expeditiously erase such information.`,
      items: [],
    },
    {
      content: `Parental Authority If you are a parent or legal guardian and suspect that your child has furnished us with Personal Data without your authorization, please make prompt contact with us. We will initiate procedures to authenticate your identity as the parent or legal guardian, and once verification is established, we will expeditiously proceed to eliminate the information submitted by the minor.`,
      items: [],
    },
  ],
};
export const INTERNATIONAL_USERS_DATA: TOSListType = {
  start: 7,
  prefix: 'Article',
  title: `International Users`,
  items: [
    {
      name: `Cross-Border Data Transfer`,
      isBold: true,
      content: ``,
      description: `Our services are offered worldwide, and your Personal Information may be transferred to and processed in countries other than the one in which you reside. These countries may have data protection laws that are different from those in your home country. By using our services, you consent to the transfer of your information to countries outside of your own, including those with different data protection laws, as described in this Privacy Policy.
`,
      items: [],
    },
    {
      name: `Legal Frameworks`,
      isBold: true,
      content: ``,
      description: `When we transfer your Personal Information internationally, we will ensure that the transfer is conducted in compliance with applicable data protection laws. This may include relying on legal mechanisms such as Standard Contractual Clauses or ensuring that the receiving entity has implemented appropriate safeguards for the protection of your data.
`,
      items: [],
    },
  ],
};
export const THIRD_PARTY_LINKS_DATA: TOSListType = {
  start: 8,
  prefix: 'Article',
  title: `Third-Party Links`,
  items: [
    {
      name: `External Websites`,
      isBold: true,
      content: ``,
      description: `Our services may contain links to external websites or third-party services that are not operated or controlled by us. This Privacy Policy applies solely to the information collected by our services. We are not responsible for the privacy practices or content of these external websites and services. We encourage you to read the privacy policies of any external websites you visit.`,
      items: [],
    },
    {
      name: `Social media and Widgets`,
      isBold: true,
      content: ``,
      description: `Our services may include social media features, such as the Facebook "Like" button and widgets, such as the "Share" button or interactive mini-programs that run on our site. These features may collect your IP address and other information, set cookies to enable their proper functioning, and may be hosted by a third party or directly on our services. Your interactions with these features are governed by the privacy policy of the company providing them.`,
      items: [],
    },
  ],
};
export const CALIFORNIA_PRIVACY_RIGHTS_DATA: TOSListType = {
  start: 9,
  prefix: 'Article',
  title: `California Privacy Rights`,
  items: [
    {
      name: `California Consumer Privacy Act (CCPA)`,
      isBold: true,
      content: ``,
      description: `If you are a California resident, you may have specific rights under the California Consumer Privacy Act (CCPA) regarding your Personal Information. These rights include the right to know what Personal Information we have collected about you, the right to request deletion of your Personal Information, and the right to opt-out of the sale of your Personal Information, if applicable.`,
      items: [],
    },
    {
      name: `Your CCPA Rights`,
      isBold: true,
      content: ``,
      description: `As a California resident, you have the following rights under the CCPA:`,
      items: [
        {
          name: `The Right to Know: `,
          itemType: 'bullet',
          isBold: true,
          content: `You have the right to request that we disclose certain information to you about our collection and use of your Personal Information over the past 12 months. This includes the categories of Personal Information we have collected, the sources of the information, the purposes for which we have used it, and the categories of third parties with whom we have shared it.`,
        },
        {
          name: `The Right to Delete:`,
          itemType: 'bullet',
          isBold: true,
          content: `You have the right to request the deletion of your Personal Information that we have collected from you, subject to certain exceptions.`,
        },
        {
          name: `The Right to Opt-Out: `,
          itemType: 'bullet',
          isBold: true,
          content: `If we sell your Personal Information (which we do not currently do), you have the right to opt-out of such sales.`,
        },
      ],
    },
    {
      name: `Exercising Your Rights`,
      isBold: true,
      content: ``,
      description: `To exercise your CCPA rights, please contact us using the methods described in Article 11. We will verify your request using the information provided by you to ensure the security of your Personal Information. You may also designate an authorized agent to make a request on your behalf, but we will require the agent to provide proof of their authorization and verify their own identity.`,
      items: [],
    },
  ],
};
export const EUROPEAN_UNION_USERS_DATA: TOSListType = {
  start: 10,
  prefix: 'Article',
  title: `European Union Users`,
  items: [
    {
      name: `General Data Protection Regulation (GDPR)`,
      isBold: true,
      content: ``,
      description: `If you are a resident of the European Union (EU) or the European Economic Area (EEA), you may have certain rights under the General Data Protection Regulation (GDPR) regarding your Personal Information. These rights include the right to access, rectify, or erase your Personal Information, the right to data portability, and the right to object to the processing of your Personal Information.`,
      items: [],
    },
    {
      name: `Your GDPR Rights`,
      isBold: true,
      content: ``,
      description: `As an EU or EEA resident, you have the following rights under the GDPR:`,
      items: [
        {
          name: `The Right to Access: `,
          itemType: 'bullet',
          isBold: true,
          content: `You have the right to access the Personal Information we hold about you.`,
        },
        {
          name: `The Right to Rectify: `,
          itemType: 'bullet',
          isBold: true,
          content: `You have the right to request the correction of inaccurate Personal Information.`,
        },
        {
          name: `The Right to Erasure: `,
          itemType: 'bullet',
          isBold: true,
          content: `You have the right to request the deletion of your Personal Information.`,
        },
        {
          name: `The Right to Data Portability: `,
          itemType: 'bullet',
          isBold: true,
          content: `You have the right to receive your Personal Information in a structured, commonly used, and machine-readable format.`,
        },
        {
          name: `The Right to Object: `,
          itemType: 'bullet',
          isBold: true,
          content: `You have the right to object to the processing of your Personal Information, including for marketing purposes.`,
        },
      ],
    },
    {
      name: `Exercising Your Rights`,
      isBold: true,
      content: ``,
      description: `To exercise your GDPR rights, please contact us using the methods described in Article 11. We will respond to your request without undue delay and in accordance with applicable data protection laws.`,
      items: [],
    },
  ],
};
export const CONTACT_US_DATA: TOSListType = {
  start: 11,
  prefix: 'Article',
  title: `Contact Us`,
  items: [
    {
      name: `Contact Information`,
      isBold: true,
      content: ``,
      description: `For any inquiries, concerns, or support related to the services provided by FullBoosts, please do not hesitate to contact us. We are committed to assisting you promptly and efficiently.`,
      items: [
        {
          content: `Our Registered Office Address: Kermia Building, 3rd Floor, Office 304, Diagorou 4, 1097, Nicosia, Cyprus.`,
          itemType: 'none',
        },
        {
          content: `For customer support inquiries, you may reach out to our dedicated Customer Support Team via email at:`,
          itemType: 'none',
          items: [
            {
              content: `Customer Support Email: support@FullBoosts.com`,
              itemType: 'bullet',
            },
          ],
        },
        {
          content: `For all business-related inquiries, partnership proposals, or collaborations, we welcome you to contact our Business Development Team at:`,
          itemType: 'none',
          items: [
            {
              content: `Business Inquiries Email: business@FullBoosts.com`,
              itemType: 'bullet',
            },
          ],
        },
        {
          content: `We are committed to providing you with a seamless and efficient experience when engaging with FullBoosts. Your feedback and inquiries are invaluable to us, and we look forward to assisting you in any way we can.`,
          itemType: 'none',
        },
      ],
    },
    {
      name: `Your GDPR Rights`,
      isBold: true,
      content: ``,
      description: `As an EU or EEA resident, you have the following rights under the GDPR:`,
      items: [
        {
          name: `The Right to Access: `,
          itemType: 'bullet',
          isBold: true,
          content: `You have the right to access the Personal Information we hold about you.`,
        },
        {
          name: `The Right to Rectify: `,
          itemType: 'bullet',
          isBold: true,
          content: `You have the right to request the correction of inaccurate Personal Information.`,
        },
        {
          name: `The Right to Erasure: `,
          itemType: 'bullet',
          isBold: true,
          content: `You have the right to request the deletion of your Personal Information.`,
        },
        {
          name: `The Right to Data Portability: `,
          itemType: 'bullet',
          isBold: true,
          content: `You have the right to receive your Personal Information in a structured, commonly used, and machine-readable format.`,
        },
        {
          name: `The Right to Object: `,
          itemType: 'bullet',
          isBold: true,
          content: `You have the right to object to the processing of your Personal Information, including for marketing purposes.`,
        },
      ],
    },
    {
      name: `Exercising Your Rights`,
      isBold: true,
      content: ``,
      description: `To exercise your GDPR rights, please contact us using the methods described in Article 11. We will respond to your request without undue delay and in accordance with applicable data protection laws.`,
      items: [],
    },
  ],
};
export const CHANGES_TO_THIS_PRIVACY_POLICY_DATA: TOSListType = {
  start: 12,
  prefix: 'Article',
  title: `Changes to This Privacy Policy`,
  items: [
    {
      name: `Notification of Changes`,
      isBold: true,
      content: ``,
      description: `We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will post the updated Privacy Policy on this page and indicate the effective date at the beginning of the Privacy Policy.`,
      items: [],
    },
  ],
};
export const Main = () => {
  const TERMS_OF_SERVICE_LISTS: TOSListType[] = [
    INTRODUCTION_DATA,
    DATA_COLLECTION_DATA,
    COOKIES_AND_TRACKING_TECHNOLOGIES_DATA,
    THIRD_PARTY_ORIGINS_DATA,
    HOW_WE_USE_YOUR_INFORMATION_DATA,
    HOW_WE_SHARE_YOUR_INFORMATION_DATA,
    YOUR_RIGHTS_AND_CHOICES_DATA,
    SECURITY_MEASURES_DATA,
    PRIVACY_CONCERNING_MINORS_DATA,
    INTERNATIONAL_USERS_DATA,
    THIRD_PARTY_LINKS_DATA,
    CALIFORNIA_PRIVACY_RIGHTS_DATA,
    EUROPEAN_UNION_USERS_DATA,
    CONTACT_US_DATA,
    CHANGES_TO_THIS_PRIVACY_POLICY_DATA,
  ];

  return (
    <main>
      <div className='fb-container grid gap-10 xl:gap-16'>
        {/* <GradientFadePrimaryHr /> */}
        {TERMS_OF_SERVICE_LISTS?.map((list) => (
          <TermsOfServiceList key={uuidv4()} payload={list} />
        ))}
      </div>
    </main>
  );
};
