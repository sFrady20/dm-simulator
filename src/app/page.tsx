import { EditorContactFields } from "@/components/editor/contact";
import { EditorMessagesFields } from "@/components/editor/messages";
import { EditorPreview } from "@/components/editor/preview";
import { EditorProvider } from "@/components/editor/provider";
import { EditorScreenshot } from "@/components/editor/screenshot";
import { EditorSystemFields } from "@/components/editor/system";
import { Page } from "@/components/ui/page";
import { Section, SectionContainer } from "@/components/ui/section";
import Link from "next/link";
import Logo from "./logo.png";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Footer = () => {
  return (
    <>
      <EditorScreenshot />
      <div className="text-xs text-center text-muted-foreground">
        <div>
          Made by{" "}
          <Link
            href="https://x.com/slowjamsteve"
            className="text-primary underline hover:no-underline"
            target="_blank"
          >
            <i className="">@slowjamsteve</i>
          </Link>
          {` on `}
          <Link
            href="https://x.com/slowjamsteve"
            className="hover:text-primary"
            target="_blank"
          >
            <i className="icon-[simple-icons--x]" />
          </Link>
          {` and `}
          <Link
            href="https://bsky.app/profile/slowjamsteve.bsky.social"
            className="hover:text-primary"
            target="_blank"
          >
            <i className="icon-[simple-icons--bluesky]" />
          </Link>
        </div>
        <Link
          href="https://stevenfrady.com"
          className="text-primary underline hover:no-underline"
          target="_blank"
        >
          stevenfrady.com
        </Link>
      </div>
    </>
  );
};

export default function Home() {
  return (
    <EditorProvider>
      <Page>
        <Section>
          <SectionContainer>
            <div className="flex flex-col items-center md:flex-row md:items-stretch gap-8">
              <div className="text-left flex-1 max-w-[420px] flex flex-col justify-center">
                <div className="sticky top-8 flex flex-col items-center gap-4">
                  <div className="rounded-[20px] bg-[#0a84ff] text-[white] p-3 self-start relative">
                    Text Message Simulator
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={cn("absolute -left-[5px] -bottom-[5px]")}
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.797852 19.5H0.999564C11.493 19.5 19.9996 10.9934 19.9996 0.5H4.99989V3.5C4.99989 9.0858 4.99989 11.8787 4.21426 14.1239C3.49455 16.1807 2.31583 18.0127 0.797852 19.5Z"
                        fill={"#0a84ff"}
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-6 bg-foreground/5 p-6 rounded-xl border">
                    <EditorContactFields />
                    <EditorSystemFields />
                    <EditorMessagesFields />

                    <div className="hidden md:flex flex-col gap-4">
                      <Footer />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center rounded-xl">
                <EditorPreview />
              </div>

              <div className="md:hidden text-left flex-1 max-w-[420px] md:max-w-[260px] flex flex-col items-stretch justify-start">
                <div className="sticky top-8 flex flex-col gap-4">
                  <Footer />
                </div>
              </div>
            </div>
          </SectionContainer>
        </Section>
      </Page>
    </EditorProvider>
  );
}
