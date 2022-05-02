import type { FC } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DetailHeader from 'components/Header/DetailHeader';
import MainHeader from 'components/Header/MainHeader';
import useConnect from './connect';
import { Container, Content, Title } from './styles';
import type { Props } from './types';

const TermsAndConditions: FC<Props> = () => {
  const { handleGoBack } = useConnect();
  const { top: safeTop } = useSafeAreaInsets();
  return (
    <Container safeTop={safeTop}>
      <DetailHeader onPressBack={handleGoBack} />
      <MainHeader title="Terms & Conditions" />
      <Title>END USER LICENSE AGREEMENT</Title>
      <Content>
        {' '}
        Chair Tracker is licensed to You (End-User) by Chair Tracker, located at
        Spain ("Licensor"), for use only under the terms of this License
        Agreement.
      </Content>
      <Content>
        {' '}
        By downloading the Licensed Application from Apple's software
        distribution platform ("App Store") and Google's software distribution
        platform ("Play Store"), and any update thereto (as permitted by this
        License Agreement), You indicate that You agree to be bound by all of
        the terms and conditions of this License Agreement, and that You accept
        this License Agreement. App Store and Play Store are referred to in this
        License Agreement as “Services.”
      </Content>
      <Content>
        {' '}
        The parties of this License Agreement acknowledge that the Services are
        not a Party to this License Agreement and are not bound by any
        provisions or obligations with regard to the Licensed Application, such
        as warranty, liability, maintenance and support thereof. Chair Tracker,
        not the Services, is solely responsible for the Licensed Application and
        the content thereof.
      </Content>
      <Content>
        {' '}
        This License Agreement may not provide for usage rules for the Licensed
        Application that are in conflict with the latest Apple Media Services
        Terms and Conditions and Google Play Terms of Service ("Usage Rules").
        Chair Tracker acknowledges that it had the opportunity to review the
        Usage Rules and this License Agreement is not conflicting with them.
      </Content>
      <Content>
        {' '}
        Chair Tracker when purchased or downloaded through the Services, is
        licensed to You for use only under the terms of this License Agreement.
        The Licensor reserves all rights not expressly granted to You. Chair
        Tracker is to be used on devices that operate with Apple's operating
        systems ("iOS" and "Mac OS") or Google's operating system ("Android").
      </Content>
      <Title>1. THE APPLICATION</Title>
      <Content>
        {' '}
        Chair Tracker ("Licensed Application") is a piece of software created to
        facilitate the tracking of working sitting hours — and customized for
        iOS and Android mobile devices ("Devices"). It is used to track of
        working sitting hours via mobile app and a device.
      </Content>
      <Content>
        {' '}
        The Licensed Application is not tailored to comply with
        industry-specific regulations (Health Insurance Portability and
        Accountability Act (HIPAA), Federal Information Security Management Act
        (FISMA), etc.), so if your interactions would be subjected to such laws,
        you may not use this Licensed Application. You may not use the Licensed
        Application in a way that would violate the Gramm-Leach-Bliley Act
        (GLBA).
      </Content>
      <Title>2. SCOPE OF LICENSE</Title>
      <Content>
        {' '}
        2.1 You are given a non-transferable, non-exclusive, non-sublicensable
        license to install and use the Licensed Application on any Devices that
        You (End-User) own or control and as permitted by the Usage Rules, with
        the exception that such Licensed Application may be accessed and used by
        other accounts associated with You (End-User, The Purchaser) via Family
        Sharing or volume purchasing.
      </Content>
      <Content>
        {' '}
        2.2 This license will also govern any updates of the Licensed
        Application provided by Licensor that replace, repair, and/or supplement
        the first Licensed Application, unless a separate license is provided
        for such update, in which case the terms of that new license will
        govern.
      </Content>
      <Content>
        {' '}
        2.3 You may not share or make the Licensed Application available to
        third parties (unless to the degree allowed by the Usage Rules, and with
        Chair Tracker's prior written consent), sell, rent, lend, lease or
        otherwise redistribute the Licensed Application.
      </Content>
      <Content>
        {' '}
        2.4 You may not reverse engineer, translate, disassemble, integrate,
        decompile, remove, modify, combine, create derivative works or updates
        of, adapt, or attempt to derive the source code of the Licensed
        Application, or any part thereof (except with Chair Tracker's prior
        written consent).
      </Content>
      <Content>
        {' '}
        2.5 You may not copy (excluding when expressly authorized by this
        license and the Usage Rules) or alter the Licensed Application or
        portions thereof. You may create and store copies only on devices that
        You own or control for backup keeping under the terms of this license,
        the Usage Rules, and any other terms and conditions that apply to the
        device or software used. You may not remove any intellectual property
        notices. You acknowledge that no unauthorized third parties may gain
        access to these copies at any time. If you sell your Devices to a third
        party, you must remove the Licensed Application from the Devices before
        doing so.
      </Content>
      <Content>
        {' '}
        2.6 Violations of the obligations mentioned above, as well as the
        attempt of such infringement, may be subject to prosecution and damages.
      </Content>
      <Content>
        {' '}
        2.7 Licensor reserves the right to modify the terms and conditions of
        licensing.
      </Content>
      <Content>
        {' '}
        2.8 Nothing in this license should be interpreted to restrict
        third-party terms. When using the Licensed Application, You must ensure
        that You comply with applicable third-party terms and conditions.
      </Content>
      <Title>3. TECHNICAL REQUIREMENTS</Title>
      <Content>
        {' '}
        3.1 The Licensed Application requires a firmware version 1.0.0 or
        higher. Licensor recommends using the latest version of the firmware.
      </Content>
      <Content>
        {' '}
        3.2 Licensor attempts to keep the Licensed Application updated so that
        it complies with modified/new versions of the firmware and new hardware.
        You are not granted rights to claim such an update.
      </Content>
      <Content>
        {' '}
        3.3 You acknowledge that it is Your responsibility to confirm and
        determine that the app end-user device on which You intend to use the
        Licensed Application satisfies the technical specifications mentioned
        above.
      </Content>
      <Content>
        {' '}
        3.4 Licensor reserves the right to modify the technical specifications
        as it sees appropriate at any time.
      </Content>
      <Title>4. MAINTENANCE AND SUPPORT</Title>
      <Content>
        {' '}
        4.1 The Licensor is solely responsible for providing any maintenance and
        support services for this Licensed Application. You can reach the
        Licensor at the email address listed in the App Store or Play Store
        Overview for this Licensed Application.
      </Content>
      <Content>
        {' '}
        4.2 Chair Tracker and the End-User acknowledge that the Services have no
        obligation whatsoever to furnish any maintenance and support services
        with respect to the Licensed Application.
      </Content>
      <Title>5. USER-GENERATED CONTRIBUTIONS</Title>
      <Content>
        {' '}
        The Licensed Application does not offer users to submit or post content.
        We may provide you with the opportunity to create, submit, post,
        display, transmit, perform, publish, distribute, or broadcast content
        and materials to us or in the Licensed Application, including but not
        limited to text, writings, video, audio, photographs, graphics,
        comments, suggestions, or personal information or other material
        (collectively, "Contributions"). Contributions may be viewable by other
        users of the Licensed Application and through third-party websites or
        applications. As such, any Contributions you transmit may be treated in
        accordance with the Licensed Application Privacy Policy. When you create
        or make available any Contributions, you thereby represent and warrant
        that:
      </Content>
      <Content>
        {' '}
        1. The creation, distribution, transmission, public display, or
        performance, and the accessing, downloading, or copying of your
        Contributions do not and will not infringe the proprietary rights,
        including but not limited to the copyright, patent, trademark, trade
        secret, or moral rights of any third party. 2. You are the creator and
        owner of or have the necessary licenses, rights, consents, releases, and
        permissions to use and to authorize us, the Licensed Application, and
        other users of the Licensed Application to use your Contributions in any
        manner contemplated by the Licensed Application and this License
        Agreement. 3. You have the written consent, release, and/or permission
        of each and every identifiable individual person in your Contributions
        to use the name or likeness or each and every such identifiable
        individual person to enable inclusion and use of your Contributions in
        any manner contemplated by the Licensed Application and this License
        Agreement. 4. Your Contributions are not false, inaccurate, or
        misleading. 5. Your Contributions are not unsolicited or unauthorized
        advertising, promotional materials, pyramid schemes, chain letters,
        spam, mass mailings, or other forms of solicitation. 6. Your
        Contributions are not obscene, lewd, lascivious, filthy, violent,
        harassing, libelous, slanderous, or otherwise objectionable (as
        determined by us). 7. Your Contributions do not ridicule, mock,
        disparage, intimidate, or abuse anyone. 8. Your Contributions are not
        used to harass or threaten (in the legal sense of those terms) any other
        person and to promote violence against a specific person or class of
        people. 9. Your Contributions do not violate any applicable law,
        regulation, or rule. 10. Your Contributions do not violate the privacy
        or publicity rights of any third party. 11. Your Contributions do not
        violate any applicable law concerning child pornography, or otherwise
        intended to protect the health or well-being of minors. 12. Your
        Contributions do not include any offensive comments that are connected
        to race, national origin, gender, sexual preference, or physical
        handicap. 13. Your Contributions do not otherwise violate, or link to
        material that violates, any provision of this License Agreement, or any
        applicable law or regulation. Any use of the Licensed Application in
        violation of the foregoing violates this License Agreement and may
        result in, among other things, termination or suspension of your rights
        to use the Licensed Application.
      </Content>
      <Title>6. CONTRIBUTION LICENSE</Title>
      <Content>
        {' '}
        You agree that we may access, store, process, and use any information
        and personal data that you provide following the terms of the Privacy
        Policy and your choices (including settings).
      </Content>
      <Content>
        {' '}
        By submitting suggestions of other feedback regarding the Licensed
        Application, you agree that we can use and share such feedback for any
        purpose without compensation to you.
      </Content>
      <Content>
        {' '}
        We do not assert any ownership over your Contributions. You retain full
        ownership of all of your Contributions and any intellectual property
        rights or other proprietary rights associated with your Contributions.
        We are not liable for any statements or representations in your
        Contributions provided by you in any area in the Licensed Application.
        You are solely responsible for your Contributions to the Licensed
        Application and you expressly agree to exonerate us from any and all
        responsibility and to refrain from any legal action against us regarding
        your Contributions.
      </Content>
      <Title>7. LIABILITY</Title>
      <Content>
        {' '}
        7.1 Licensor takes no accountability or responsibility for any damages
        caused due to a breach of duties according to Section 2 of this License
        Agreement. To avoid data loss, You are required to make use of backup
        functions of the Licensed Application to the extent allowed by
        applicable third-party terms and conditions of use. You are aware that
        in case of alterations or manipulations of the Licensed Application, You
        will not have access to the Licensed Application.
      </Content>
      <Title>8. WARRANTY</Title>
      <Content>
        {' '}
        8.1 Licensor warrants that the Licensed Application is free of spyware,
        trojan horses, viruses, or any other malware at the time of Your
        download. Licensor warrants that the Licensed Application works as
        described in the user documentation.
      </Content>
      <Content>
        {' '}
        8.2 No warranty is provided for the Licensed Application that is not
        executable on the device, that has been unauthorizedly modified, handled
        inappropriately or culpably, combined or installed with inappropriate
        hardware or software, used with inappropriate accessories, regardless if
        by Yourself or by third parties, or if there are any other reasons
        outside of Chair Tracker's sphere of influence that affect the
        executability of the Licensed Application.
      </Content>
      <Content>
        {' '}
        8.3 You are required to inspect the Licensed Application immediately
        after installing it and notify Chair Tracker about issues discovered
        without delay by email provided in Product Claims. The defect report
        will be taken into consideration and further investigated if it has been
        emailed within a period of 90 days after discovery.{' '}
      </Content>
      <Content>
        {' '}
        8.4 If we confirm that the Licensed Application is defective, Chair
        Tracker reserves a choice to remedy the situation either by means of
        solving the defect or substitute delivery.
      </Content>
      <Content>
        {' '}
        8.5 In the event of any failure of the Licensed Application to conform
        to any applicable warranty, You may notify the Services Store Operator,
        and Your Licensed Application purchase price will be refunded to You. To
        the maximum extent permitted by applicable law, the Services Store
        Operator will have no other warranty obligation whatsoever with respect
        to the Licensed Application, and any other losses, claims, damages,
        liabilities, expenses, and costs attributable to any negligence to
        adhere to any warranty.
      </Content>
      <Content>
        {' '}
        8.6 If the user is an entrepreneur, any claim based on faults expires
        after a statutory period of limitation amounting to twelve (12) months
        after the Licensed Application was made available to the user. The
        statutory periods of limitation given by law apply for users who are
        consumers.
      </Content>
      <Title>9. PRODUCT CLAIMS</Title>
      <Content>
        {' '}
        Chair Tracker and the End-User acknowledge that Chair Tracker, and not
        the Services, is responsible for addressing any claims of the End-User
        or any third party relating to the Licensed Application or the
        End-User’s possession and/or use of that Licensed Application,
        including, but not limited to:
      </Content>
      <Content> (i) product liability claims;</Content>
      <Content>
        {' '}
        (ii) any claim that the Licensed Application fails to conform to any
        applicable legal or regulatory requirement;
      </Content>
      <Content>
        {' '}
        (iii) claims arising under consumer protection, privacy, or similar
        legislation, including in connection with Your Licensed Application’s
        use of the HealthKit and HomeKit.
      </Content>
      <Title>10. LEGAL COMPLIANCE</Title>
      <Content>
        {' '}
        You represent and warrant that You are not located in a country that is
        subject to a US Government embargo, or that has been designated by the
        US Government as a "terrorist supporting" country; and that You are not
        listed on any US Government list of prohibited or restricted parties.
      </Content>
      <Title>11. CONTACT INFORMATION</Title>
      <Content>
        {' '}
        For general inquiries, complaints, questions or claims concerning the
        Licensed Application, please contact: ChairTracker, Spain,
        chair@tracker.com
      </Content>
      <Title>12. TERMINATION</Title>
      <Content>
        {' '}
        The license is valid until terminated by Chair Tracker or by You. Your
        rights under this license will terminate automatically and without
        notice from Chair Tracker if You fail to adhere to any term(s) of this
        license. Upon License termination, You shall stop all use of the
        Licensed Application, and destroy all copies, full or partial, of the
        Licensed Application.
      </Content>
      <Title>13. THIRD-PARTY TERMS OF AGREEMENTS AND BENEFICIARY</Title>
      <Content>
        {' '}
        Chair Tracker represents and warrants that Chair Tracker will comply
        with applicable third-party terms of agreement when using Licensed
        Application.
      </Content>
      <Content>
        {' '}
        In Accordance with Section 9 of the "Instructions for Minimum Terms of
        Developer's End-User License Agreement," both Apple and Google and their
        subsidiaries shall be third-party beneficiaries of this End User License
        Agreement and — upon Your acceptance of the terms and conditions of this
        License Agreement, both Apple and Google will have the right (and will
        be deemed to have accepted the right) to enforce this End User License
        Agreement against You as a third-party beneficiary thereof.
      </Content>
      <Title>14. INTELLECTUAL PROPERTY RIGHTS</Title>
      <Content>
        {' '}
        Chair Tracker and the End-User acknowledge that, in the event of any
        third-party claim that the Licensed Application or the End-User's
        possession and use of that Licensed Application infringes on the third
        party's intellectual property rights, Chair Tracker, and not the
        Services, will be solely responsible for the investigation, defense,
        settlement, and discharge or any such intellectual property infringement
        claims.
      </Content>
      <Title>15. APPLICABLE LAW</Title>
      <Content>
        {' '}
        This License Agreement is governed by the laws of Spain excluding its
        conflicts of law rules.
      </Content>
      <Title>16. MISCELLANEOUS</Title>
      <Content>
        {' '}
        16.1 If any of the terms of this agreement should be or become invalid,
        the validity of the remaining provisions shall not be affected. Invalid
        terms will be replaced by valid ones formulated in a way that will
        achieve the primary purpose.
      </Content>
    </Container>
  );
};

export default TermsAndConditions;
