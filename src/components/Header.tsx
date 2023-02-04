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
            url: "https://user-images.githubusercontent.com/19412160/216763313-d578238d-e21c-4e01-a403-f058245e84bb.png",
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
