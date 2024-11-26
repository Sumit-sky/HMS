import React from "react";

export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-8 w-full text-left">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="text-sm mb-4 text-gray-600">Effective Date: 26/11/2024</p>
      <p className="text-sm mb-8 text-gray-600">Last Updated: 26/11/2024</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          1. Information We Collect
        </h2>
        <p className="mb-4">
          At StayPedia, we collect information to provide and improve our
          services. The types of information we collect include:
        </p>
        <ul className="list-disc pl-5">
          <li className="mb-2">
            <strong>Personal Information:</strong> Name, email address, phone
            number, payment details, and booking preferences.
          </li>
          <li className="mb-2">
            <strong>Automatically Collected Information:</strong> IP address,
            browser type, device details, and website usage data.
          </li>
          <li className="mb-2">
            <strong>Sensitive Information:</strong> Dietary preferences or
            accessibility needs (provided voluntarily).
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc pl-5">
          <li className="mb-2">
            To confirm reservations and process payments.
          </li>
          <li className="mb-2">
            To respond to inquiries, complaints, and feedback.
          </li>
          <li className="mb-2">
            To send promotions, special offers, and newsletters (with your
            consent).
          </li>
          <li className="mb-2">
            To comply with legal obligations and ensure security.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          3. Sharing Your Information
        </h2>
        <p className="mb-4">
          We may share your information in limited circumstances:
        </p>
        <ul className="list-disc pl-5">
          <li className="mb-2">
            <strong>Service Providers:</strong> Trusted partners for payment
            processing and customer support.
          </li>
          <li className="mb-2">
            <strong>Legal Obligations:</strong> When required by law or during
            investigations.
          </li>
          <li className="mb-2">
            <strong>Business Transfers:</strong> In case of mergers,
            acquisitions, or sale of assets.
          </li>
          <li className="mb-2">
            <strong>Consent:</strong> Only with your explicit permission.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          4. Cookies and Tracking Technologies
        </h2>
        <p className="mb-4">
          StayPedia uses cookies to enhance your browsing experience:
        </p>
        <ul className="list-disc pl-5">
          <li className="mb-2">
            <strong>Essential Cookies:</strong> Necessary for booking
            functionality.
          </li>
          <li className="mb-2">
            <strong>Analytical Cookies:</strong> To analyze website performance.
          </li>
          <li className="mb-2">
            <strong>Marketing Cookies:</strong> To deliver personalized
            promotions.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
        <p className="mb-4">
          We implement strong security measures to protect your data, including
          encryption, regular system updates, and access controls. However, no
          online transmission is completely secure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
        <p className="mb-4">
          You have rights over your personal data, including:
        </p>
        <ul className="list-disc pl-5">
          <li className="mb-2">Access to your personal data.</li>
          <li className="mb-2">Correction of inaccuracies.</li>
          <li className="mb-2">Request deletion where applicable.</li>
          <li className="mb-2">Opting out of marketing communications.</li>
        </ul>
        <p>
          To exercise these rights, contact us at{" "}
          <a
            href="mailto:privacy@staypedia.com"
            className="text-blue-500 underline"
          >
            privacy@staypedia.com
          </a>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          7. Retention of Information
        </h2>
        <p>
          We retain your data as long as necessary to provide services and
          comply with legal requirements. After the retention period, your data
          is securely deleted or anonymized.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Third-Party Links</h2>
        <p>
          Our website may contain links to external websites. StayPedia is not
          responsible for their privacy practices or content. Review their
          policies before sharing your information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Children’s Privacy</h2>
        <p>
          StayPedia does not knowingly collect information from children under
          16. If you believe we have inadvertently collected such data, contact
          us immediately, and we will delete it.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          10. Changes to This Privacy Policy
        </h2>
        <p>
          StayPedia reserves the right to update this policy to reflect changes
          in practices or legal requirements. Updates will be posted with the
          "Last Updated" date.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
        <p>For questions or concerns, contact us at:</p>
        <p>
          <strong>StayPedia</strong> <br />
          Email:{" "}
          <a
            href="mailto:privacy@staypedia.com"
            className="text-blue-500 underline"
          >
            privacy@staypedia.com
          </a>{" "}
          <br />
        </p>
      </section>
      <section className="mb-8" id="CancelPolicy">
        <h2 className="text-2xl font-semibold mb-4">12. Cancellation Policy</h2>
        <p>
          StayPedia maintains a strict cancellation policy:{" "}
          <strong>
            we do not provide any refunds for cancellations, regardless of the
            reason
          </strong>
          . Guests are encouraged to carefully review their booking details
          before confirming reservations. For further clarification or
          assistance, please contact us at{" "}
          <a
            href="mailto:reservations@staypedia.com"
            className="text-blue-500 underline"
          >
            reservations@staypedia.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
