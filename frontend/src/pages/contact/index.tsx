import "./index.scss";

export function Contact() {
  return (
    <div className="page contact">
      <h1>📱 Contact Us</h1>
      <p>
        We appreciate any feedback or questions you might have. Please feel free
        to get in touch with us through the following channels:
      </p>
      <p>
        Email: <a href="mailto:hello@prompt-mkt.com">hello@prompt-mkt.com</a>
      </p>
      <p>
        If you are unable to sign up as a seller from your country or have any
        questions about payment methods, we apologize for the inconvenience. At
        prompt-mkt, we use Stripe as our payments provider and for sending
        payouts to our sellers. Unfortunately, Stripe is not yet supported in
        some countries. If you are unable to see your country, this might be the
        reason. However, we are constantly working on a solution to enable
        everyone to sell on prompt-mkt. We expect this to be live by March 2023.
        To stay updated on our progress, check out our{" "}
        <a href="https://twitter.com/promptmkt">Twitter page</a>. You can also
        enter your country on this <a href="#">page</a> to receive notifications
        when Stripe becomes available in your region.
      </p>
      <p>
        Thank you for choosing prompt-mkt. We look forward to hearing from you!
      </p>
    </div>
  );
}
