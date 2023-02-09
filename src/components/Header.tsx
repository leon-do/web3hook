import { NextSeo } from "next-seo";

export default function Header() {
  return (
    <NextSeo
      title="Web3Hook"
      description="No Code Web3 Automation"
      canonical="https://web3hook.com/"
      openGraph={{
        url: "https://web3hook.com/",
        title: "Web3Hook",
        description: "No Code Web3 Automation",
        images: [
          {
            url: "https://user-images.githubusercontent.com/19412160/217910263-b6de8144-e22a-470b-9dfb-69faadb40651.png",
            width: 500,
            height: 500,
            alt: "Web3Hook",
          },
        ],
        siteName: "Web3Hook",
      }}
      twitter={{
        handle: "@web3hook",
        site: "@web3hook",
        cardType: "summary_large_image",
      }}
    />
  );
}
